#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Check index/coverage status for target_urls via the Search Console
URL Inspection API. STATUS CHECK ONLY — this never requests indexing.

Output: SEO/data/raw/url_inspection_YYYY-MM-DD.csv
Fields: url, coverageState, indexingState, robotsTxtState, googleCanonical,
        userCanonical, pageFetchState, lastCrawlTime, verdict, error
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
    urls = cfg.get("target_urls", [])
    service = _service(cfg)
    date = C.today_str()
    rows = []
    for url in urls:
        C.log(f"URL Inspection: {url}")
        try:
            resp = service.urlInspection().index().inspect(
                body={"inspectionUrl": url, "siteUrl": site}).execute()
            r = resp.get("inspectionResult", {})
            idx = r.get("indexStatusResult", {})
            rows.append({
                "url": url,
                "verdict": idx.get("verdict", ""),
                "coverageState": idx.get("coverageState", ""),
                "indexingState": idx.get("indexingState", ""),
                "robotsTxtState": idx.get("robotsTxtState", ""),
                "googleCanonical": idx.get("googleCanonical", ""),
                "userCanonical": idx.get("userCanonical", ""),
                "pageFetchState": idx.get("pageFetchState", ""),
                "lastCrawlTime": idx.get("lastCrawlTime", ""),
                "error": "",
            })
        except Exception as e:
            cat = C.classify_google_api_error(e)
            rows.append({"url": url, "verdict": "", "coverageState": "", "indexingState": "",
                         "robotsTxtState": "", "googleCanonical": "", "userCanonical": "",
                         "pageFetchState": "", "lastCrawlTime": "", "error": f"{cat}: {str(e)[:140]}"})

    fields = ["url", "verdict", "coverageState", "indexingState", "robotsTxtState",
              "googleCanonical", "userCanonical", "pageFetchState", "lastCrawlTime", "error"]
    C.write_csv(C.output_path(cfg, f"url_inspection_{date}.csv"), fields, rows)
    C.log(f"inspected: {len(rows)} urls (これはインデックス申請ではなく状態確認のみ)")


if __name__ == "__main__":
    try:
        main()
        print("✅ URL Inspection（状態確認のみ）完了")
    except Exception as e:
        C.print_error(e)
        sys.exit(1)
