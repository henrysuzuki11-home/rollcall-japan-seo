#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Submit sitemaps to Google Search Console (Sitemaps.submit) and read back
their status. Targets the `sitemaps` list in the config.

This submits SITEMAPS only. It does NOT use the Indexing API (which is for
JobPosting/BroadcastEvent, not normal articles).

Output: SEO/data/raw/sitemap_status_YYYY-MM-DD.csv
"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import _common as C


def _service(cfg):
    try:
        from googleapiclient.discovery import build
    except ImportError:
        raise C.SeoError("DEPS_MISSING", "google-api-python-client が未インストールです。",
                         "pip install -r SEO/scripts/requirements.txt")
    return build("searchconsole", "v1", credentials=C.load_credentials(cfg), cache_discovery=False)


def main():
    cfg = C.load_config()
    site = cfg.get("gsc_site_url", "").strip()
    sitemaps = cfg.get("sitemaps", [])
    service = _service(cfg)
    date = C.today_str()
    rows = []
    for sm in sitemaps:
        C.log(f"Submitting sitemap: {sm}")
        submitted_ok, err = True, ""
        try:
            service.sitemaps().submit(siteUrl=site, feedpath=sm).execute()
        except Exception as e:
            submitted_ok = False
            cat = C.classify_google_api_error(e)
            err = f"{cat}: {str(e)[:140]}"
            C.log(f"  ⚠ 送信失敗: {err}")
        status = {}
        try:
            status = service.sitemaps().get(siteUrl=site, feedpath=sm).execute()
        except Exception:
            pass
        rows.append({
            "sitemap": sm,
            "submitted": "true" if submitted_ok else "false",
            "lastSubmitted": status.get("lastSubmitted", ""),
            "isPending": status.get("isPending", ""),
            "isSitemapsIndex": status.get("isSitemapsIndex", ""),
            "warnings": status.get("warnings", ""),
            "errors": status.get("errors", ""),
            "error_detail": err,
        })

    fields = ["sitemap", "submitted", "lastSubmitted", "isPending",
              "isSitemapsIndex", "warnings", "errors", "error_detail"]
    C.write_csv(C.output_path(cfg, f"sitemap_status_{date}.csv"), fields, rows)
    C.log(f"sitemaps processed: {len(rows)}")


if __name__ == "__main__":
    try:
        main()
        print("✅ Sitemap 送信/状態確認 完了")
    except Exception as e:
        C.print_error(e)
        sys.exit(1)
