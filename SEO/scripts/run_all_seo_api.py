#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Run the full SEO API pipeline in order. If one step fails, keep going so the
rest still produce what they can. Prints a categorised summary at the end.

Order:
  1 fetch_ga4_api  2 fetch_gsc_api  3 fetch_pagespeed_api
  4 fetch_url_inspection_api  5 submit_sitemap_api
  6 build_seo_opportunities  7 build_weekly_seo_report

Read-only / analysis only. Never edits production articles. No git actions.
"""
import sys, os, subprocess
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import _common as C

HERE = os.path.dirname(os.path.abspath(__file__))
STEPS = [
    ("GA4 Data API", "fetch_ga4_api.py"),
    ("Search Console API", "fetch_gsc_api.py"),
    ("PageSpeed Insights API", "fetch_pagespeed_api.py"),
    ("URL Inspection API (状態確認)", "fetch_url_inspection_api.py"),
    ("Sitemap submit", "submit_sitemap_api.py"),
    ("改善候補の抽出", "build_seo_opportunities.py"),
    ("週次レポート生成", "build_weekly_seo_report.py"),
]


def preflight():
    print("── 事前チェック ──")
    try:
        cfg = C.load_config()
    except Exception as e:
        C.print_error(e)
        return None
    print(f"  config: OK (ga4_property_id={cfg.get('ga4_property_id')})")
    cred = C.resolve_path(cfg.get("credentials_path", ""))
    if not os.path.exists(cred):
        print(f"  ⚠ credentials が未配置: {cred}")
        print("    → GA4 / Search Console / URL Inspection / Sitemap はスキップされます。")
    else:
        print(f"  credentials: OK ({cred})")
    if cfg.get("pagespeed_api_key") in ("", "REPLACE_WITH_PAGESPEED_API_KEY"):
        print("  ⚠ PageSpeed API キー未設定 → PageSpeed はスキップされます。")
    return cfg


def main():
    cfg = preflight()
    print()
    results = []
    for label, script in STEPS:
        print(f"▶ {label}  ({script})")
        try:
            proc = subprocess.run([sys.executable, os.path.join(HERE, script)],
                                  capture_output=True, text=True, timeout=900)
            sys.stdout.write(proc.stdout)
            if proc.returncode == 0:
                results.append((label, "OK"))
            else:
                sys.stderr.write(proc.stderr)
                results.append((label, "FAILED"))
        except subprocess.TimeoutExpired:
            results.append((label, "TIMEOUT"))
        except Exception as e:
            print(f"  起動失敗: {e}")
            results.append((label, "ERROR"))
        print()

    print("══ 実行サマリー ══")
    for label, status in results:
        mark = "✅" if status == "OK" else "⚠️"
        print(f"  {mark} {label}: {status}")
    failed = [l for l, s in results if s != "OK"]
    if failed:
        print("\nヒント（失敗カテゴリの確認）:")
        print("  - credentials なし → SEO/config/google_credentials.json を配置")
        print("  - GA4 Property ID 未設定 → seo_api_config.json の ga4_property_id=542398101")
        print("  - Search Console 権限なし → サービスアカウントをプロパティのユーザーに追加")
        print("  - PageSpeed API key なし → seo_api_config.json の pagespeed_api_key を設定")
        print("  - API 未有効化 → Google Cloud で各 API を有効化（READMEのAPI一覧参照）")
        print("  - quota 超過 → 時間をおいて再実行")
    print("\n※ 本番記事は変更していません。生成物は SEO/data, SEO/reports のみです。")


if __name__ == "__main__":
    main()
