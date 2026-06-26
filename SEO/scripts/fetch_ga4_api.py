#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Fetch GA4 (Google Analytics Data API) reports for 親みまもり研究所.

Uses ga4_property_id (542398101) — NOT the Measurement ID and NOT the Account ID.
Outputs (to SEO/data/raw/):
  ga4_pages_YYYY-MM-DD.csv       pagePath x pageTitle x date
  ga4_events_YYYY-MM-DD.csv      eventName x date
  ga4_app_funnel_YYYY-MM-DD.csv  /app/ views + app_* click events

Read-only. Categorised errors: credentials / property id / API not enabled /
permission / no data.
"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import _common as C


def _client(cfg):
    try:
        from google.analytics.data_v1beta import BetaAnalyticsDataClient
    except ImportError:
        raise C.SeoError("DEPS_MISSING", "google-analytics-data が未インストールです。",
                         "pip install -r SEO/scripts/requirements.txt")
    creds = C.load_credentials(cfg)
    return BetaAnalyticsDataClient(credentials=creds)


def _run_report(client, prop, dims, mets, start, end, dim_filter=None):
    from google.analytics.data_v1beta.types import (
        RunReportRequest, DateRange, Dimension, Metric)
    req = RunReportRequest(
        property=f"properties/{prop}",
        date_ranges=[DateRange(start_date=start, end_date=end)],
        dimensions=[Dimension(name=d) for d in dims],
        metrics=[Metric(name=m) for m in mets],
        limit=100000,
    )
    if dim_filter is not None:
        req.dimension_filter = dim_filter
    resp = client.run_report(req)
    rows = []
    for r in resp.rows:
        rec = {}
        for i, d in enumerate(dims):
            rec[d] = r.dimension_values[i].value
        for i, m in enumerate(mets):
            rec[m] = r.metric_values[i].value
        rows.append(rec)
    return rows


def main():
    cfg = C.load_config()
    prop = str(cfg.get("ga4_property_id", "")).strip()
    if not prop or prop in ("000000000", ""):
        raise C.SeoError("GA4_PROPERTY_MISSING", "ga4_property_id が未設定です。",
                         "seo_api_config.json の ga4_property_id に 542398101 を設定してください。")
    start, end = C.date_range(int(cfg.get("date_range_days", 28)))
    C.log(f"GA4 property {prop} / {start} 〜 {end}")
    client = _client(cfg)
    date = C.today_str()
    METS = ["activeUsers", "screenPageViews", "sessions", "eventCount", "averageSessionDuration"]

    try:
        # 1) Pages
        pages = _run_report(client, prop, ["date", "pagePath", "pageTitle"], METS, start, end)
        C.write_csv(C.output_path(cfg, f"ga4_pages_{date}.csv"),
                    ["date", "pagePath", "pageTitle"] + METS, pages)
        C.log(f"pages: {len(pages)} rows")

        # 2) Events
        events = _run_report(client, prop, ["date", "eventName"],
                             ["eventCount", "activeUsers"], start, end)
        C.write_csv(C.output_path(cfg, f"ga4_events_{date}.csv"),
                    ["date", "eventName", "eventCount", "activeUsers"], events)
        C.log(f"events: {len(events)} rows")

        # 3) /app/ funnel: /app/ pageviews + tracked click events
        from google.analytics.data_v1beta.types import (
            Filter, FilterExpression, FilterExpressionList)
        app_views = _run_report(
            client, prop, ["date", "pagePath"], METS, start, end,
            dim_filter=FilterExpression(filter=Filter(
                field_name="pagePath",
                string_filter=Filter.StringFilter(
                    match_type=Filter.StringFilter.MatchType.CONTAINS, value="/app"))))
        click_events = ["app_store_click", "google_play_click", "app_page_cta_click"]
        app_events = _run_report(
            client, prop, ["date", "eventName"], ["eventCount"], start, end,
            dim_filter=FilterExpression(filter=Filter(
                field_name="eventName",
                in_list_filter=Filter.InListFilter(values=click_events))))
        funnel = []
        for r in app_views:
            funnel.append({"date": r["date"], "kind": "app_pageview",
                           "name": r["pagePath"], "value": r.get("screenPageViews", "0")})
        for r in app_events:
            funnel.append({"date": r["date"], "kind": "app_event",
                           "name": r["eventName"], "value": r.get("eventCount", "0")})
        C.write_csv(C.output_path(cfg, f"ga4_app_funnel_{date}.csv"),
                    ["date", "kind", "name", "value"], funnel)
        C.log(f"app funnel: {len(funnel)} rows (events found: {len(app_events)})")
        if not pages and not events:
            C.log("⚠ データが0件でした（期間が浅い/計測開始直後の可能性）。")

    except C.SeoError:
        raise
    except Exception as e:
        cat = C.classify_google_api_error(e)
        raise C.SeoError(cat, f"GA4 API 呼び出しに失敗: {e}",
                         {"PERMISSION_DENIED": "サービスアカウントを GA4 プロパティの閲覧者に追加してください。",
                          "API_NOT_ENABLED": "Google Cloud で『Google Analytics Data API』を有効化してください。",
                          "QUOTA_EXCEEDED": "GA4 API クォータ超過。時間をおいて再実行してください。"}.get(cat, ""))


if __name__ == "__main__":
    try:
        main()
        print("✅ GA4 取得完了")
    except Exception as e:
        C.print_error(e)
        sys.exit(1)
