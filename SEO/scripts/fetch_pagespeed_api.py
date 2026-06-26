#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Fetch PageSpeed Insights (Lighthouse) scores for target_urls.

mobile + desktop. Output: SEO/data/raw/pagespeed_YYYY-MM-DD.csv
If pagespeed_api_key is still REPLACE_WITH_PAGESPEED_API_KEY, prints a clear
"API key not set" message (not a crash) and exits cleanly.
Read-only REST call via requests.
"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import _common as C

ENDPOINT = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"
# PSI v5 API category enum values must be UPPERCASE (PERFORMANCE, ACCESSIBILITY,
# BEST_PRACTICES, SEO). The lowercase/hyphenated form is the Lighthouse *result*
# key (used when reading the response), NOT a valid request value → caused 400.
API_CATEGORIES = ["PERFORMANCE", "ACCESSIBILITY", "BEST_PRACTICES", "SEO"]


def _metric(audits, key):
    a = audits.get(key, {})
    return a.get("numericValue", "")


def _error_body(resp):
    """Extract a readable reason from a PSI error response."""
    try:
        j = resp.json()
        err = j.get("error", {})
        msg = err.get("message", "")
        details = err.get("errors", [{}])
        reason = details[0].get("reason", "") if details else ""
        return f"{msg} ({reason})".strip() or resp.text[:300]
    except Exception:
        return resp.text[:300]


def main():
    cfg = C.load_config()
    key = cfg.get("pagespeed_api_key", "")
    if not key or key == "REPLACE_WITH_PAGESPEED_API_KEY":
        print("⚠ PageSpeed API キー未設定: seo_api_config.json の pagespeed_api_key を設定してください。")
        print("  （Google Cloud で API キーを発行し『PageSpeed Insights API』を有効化）")
        print("  → このステップはスキップします（他の処理は継続できます）。")
        return
    # Heuristic: Google API keys look like "AIza..." (39 chars). Warn early if
    # the configured value clearly isn't one (e.g. a token from another service).
    if not key.startswith("AIza"):
        print("⚠ pagespeed_api_key が Google APIキーの形式（AIza...）に見えません。")
        print("  PageSpeed Insights 用のAPIキーを Google Cloud で発行し、設定し直してください。")
        print("  → このまま試行しますが、400『API key not valid』になる可能性があります。")

    try:
        import requests
    except ImportError:
        raise C.SeoError("DEPS_MISSING", "requests が未インストールです。",
                         "pip install -r SEO/scripts/requirements.txt")

    urls = cfg.get("target_urls", [])
    date = C.today_str()
    rows = []
    for url in urls:
        for strategy in ("mobile", "desktop"):
            C.log(f"PageSpeed {strategy}: {url}")
            try:
                # Single params object → requests handles URL-encoding (incl. the
                # `url` value) and repeats `category` for the list. No manual "?".
                params = [
                    ("url", url),
                    ("strategy", strategy),
                    ("key", key),
                ] + [("category", c) for c in API_CATEGORIES]
                resp = requests.get(ENDPOINT, params=params, timeout=120)
                if resp.status_code != 200:
                    reason = _error_body(resp)
                    C.log(f"  ⚠ HTTP {resp.status_code}: {reason}")
                    rows.append({"url": url, "strategy": strategy,
                                 "error": f"HTTP {resp.status_code}: {reason}"})
                    continue
                data = resp.json()
                lh = data.get("lighthouseResult", {})
                cat = lh.get("categories", {})
                aud = lh.get("audits", {})
                rows.append({
                    "url": url, "strategy": strategy, "error": "",
                    "performance_score": round((cat.get("performance", {}).get("score") or 0) * 100),
                    "accessibility_score": round((cat.get("accessibility", {}).get("score") or 0) * 100),
                    "best_practices_score": round((cat.get("best-practices", {}).get("score") or 0) * 100),
                    "seo_score": round((cat.get("seo", {}).get("score") or 0) * 100),
                    "first_contentful_paint": _metric(aud, "first-contentful-paint"),
                    "largest_contentful_paint": _metric(aud, "largest-contentful-paint"),
                    "cumulative_layout_shift": _metric(aud, "cumulative-layout-shift"),
                    "total_blocking_time": _metric(aud, "total-blocking-time"),
                    "speed_index": _metric(aud, "speed-index"),
                })
            except Exception as e:
                rows.append({"url": url, "strategy": strategy, "error": str(e)[:160]})

    fields = ["url", "strategy", "performance_score", "accessibility_score",
              "best_practices_score", "seo_score", "first_contentful_paint",
              "largest_contentful_paint", "cumulative_layout_shift",
              "total_blocking_time", "speed_index", "error"]
    C.write_csv(C.output_path(cfg, f"pagespeed_{date}.csv"), fields, rows)
    C.log(f"pagespeed rows: {len(rows)}")


if __name__ == "__main__":
    try:
        main()
        print("✅ PageSpeed 完了")
    except Exception as e:
        C.print_error(e)
        sys.exit(1)
