#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Fetch Google Search Console search-analytics for 親みまもり研究所.

Uses gsc_site_url. Outputs (to SEO/data/raw/):
  gsc_queries_YYYY-MM-DD.csv        by query
  gsc_pages_YYYY-MM-DD.csv          by page
  gsc_page_queries_YYYY-MM-DD.csv   by page + query

Read-only. Categorised errors: property URL mismatch / permission / API not
enabled / no data.
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
    creds = C.load_credentials(cfg)
    return build("searchconsole", "v1", credentials=creds, cache_discovery=False)


def _query(service, site, start, end, dims):
    body = {"startDate": start, "endDate": end, "dimensions": dims,
            "rowLimit": 25000, "dataState": "final"}
    resp = service.searchanalytics().query(siteUrl=site, body=body).execute()
    rows = []
    for r in resp.get("rows", []):
        rec = {dims[i]: v for i, v in enumerate(r.get("keys", []))}
        rec.update({"clicks": r.get("clicks", 0), "impressions": r.get("impressions", 0),
                    "ctr": round(r.get("ctr", 0), 4), "position": round(r.get("position", 0), 2)})
        rows.append(rec)
    return rows


def main():
    cfg = C.load_config()
    site = cfg.get("gsc_site_url", "").strip()
    if not site:
        raise C.SeoError("GSC_URL_MISSING", "gsc_site_url が未設定です。")
    start, end = C.date_range(int(cfg.get("date_range_days", 28)))
    C.log(f"GSC {site} / {start} 〜 {end}")
    service = _service(cfg)
    date = C.today_str()
    metrics = ["clicks", "impressions", "ctr", "position"]
    try:
        q = _query(service, site, start, end, ["query"])
        C.write_csv(C.output_path(cfg, f"gsc_queries_{date}.csv"), ["query"] + metrics, q)
        p = _query(service, site, start, end, ["page"])
        C.write_csv(C.output_path(cfg, f"gsc_pages_{date}.csv"), ["page"] + metrics, p)
        pq = _query(service, site, start, end, ["page", "query"])
        C.write_csv(C.output_path(cfg, f"gsc_page_queries_{date}.csv"),
                    ["page", "query"] + metrics, pq)
        C.log(f"queries:{len(q)} pages:{len(p)} page_queries:{len(pq)}")
        if not q and not p:
            C.log("⚠ データ0件（プロパティ未確認 / 計測開始直後 / 期間にデータ無し の可能性）。")
    except C.SeoError:
        raise
    except Exception as e:
        cat = C.classify_google_api_error(e)
        hint = {
            "PERMISSION_DENIED": "サービスアカウントを Search Console のユーザーに追加（プロパティの所有者/フルユーザー）してください。",
            "NOT_FOUND": "gsc_site_url が Search Console のプロパティ表記と一致しているか確認してください（https://www.oyamimamori.jp/ のように末尾スラッシュ・wwwまで一致）。",
            "API_NOT_ENABLED": "Google Cloud で『Google Search Console API』を有効化してください。",
        }.get(cat, "")
        raise C.SeoError(cat, f"GSC API 呼び出しに失敗: {e}", hint)


if __name__ == "__main__":
    try:
        main()
        print("✅ GSC 取得完了")
    except Exception as e:
        C.print_error(e)
        sys.exit(1)
