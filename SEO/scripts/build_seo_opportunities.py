#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Combine the latest GA4 / GSC / PageSpeed / URL-Inspection CSVs into a list
of concrete SEO improvement opportunities.

Outputs:
  SEO/data/processed/seo_opportunities_YYYY-MM-DD.csv
  SEO/reports/seo_opportunities_YYYY-MM-DD.md

Read-only analysis. Never edits production articles. Runs cleanly even when
some inputs are missing (it just reports what it can).
"""
import sys, os, csv, glob, re
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import _common as C

RAW = os.path.join(C.ROOT, "SEO", "data", "raw")
PROC = os.path.join(C.ROOT, "SEO", "data", "processed")
REPORTS = os.path.join(C.ROOT, "SEO", "reports")


def latest(prefix):
    files = sorted(glob.glob(os.path.join(RAW, f"{prefix}_*.csv")))
    return files[-1] if files else None


def read(prefix):
    f = latest(prefix)
    if not f:
        return []
    with open(f, encoding="utf-8") as fh:
        return list(csv.DictReader(fh))


def num(v, d=0.0):
    try:
        return float(v)
    except (TypeError, ValueError):
        return d


def main():
    date = C.today_str()
    gsc_q = read("gsc_queries")
    gsc_p = read("gsc_pages")
    pspeed = read("pagespeed")
    funnel = read("ga4_app_funnel")
    inspection = read("url_inspection")

    opps = []  # {type, target, metric, value, suggestion, priority}

    def add(t, target, metric, value, suggestion, prio="medium"):
        opps.append({"type": t, "target": target, "metric": metric,
                     "value": value, "suggestion": suggestion, "priority": prio})

    # 1) high impressions / low CTR queries
    for r in gsc_q:
        imp, ctr, pos = num(r.get("impressions")), num(r.get("ctr")), num(r.get("position"))
        if imp >= 50 and ctr < 0.02:
            add("low_ctr_query", r.get("query", ""), "impressions/ctr",
                f"{int(imp)}imp / CTR {ctr:.1%}",
                "タイトル・ディスクリプションに検索意図とベネフィットを入れCTR改善", "high")
        # 2) rank 11-30
        if 11 <= pos <= 30 and imp >= 20:
            add("rank_11_30", r.get("query", ""), "position",
                f"{pos:.1f}位 / {int(imp)}imp",
                "見出し追加・内容の網羅性UP・内部リンクで1ページ目を狙う", "high")
        # 3) rank 4-10 (title tweak)
        elif 4 <= pos <= 10 and imp >= 20:
            add("rank_4_10_title", r.get("query", ""), "position",
                f"{pos:.1f}位 / {int(imp)}imp",
                "タイトル前方にKW・数字・年号を入れ上位3を狙う", "medium")

    # 4) pages with impressions but few clicks
    for r in gsc_p:
        imp, clk = num(r.get("impressions")), num(r.get("clicks"))
        if imp >= 50 and clk <= 1:
            add("page_low_click", r.get("page", ""), "impressions/clicks",
                f"{int(imp)}imp / {int(clk)}click",
                "ページのタイトル/導入/構成を見直し、検索意図に合わせる", "high")

    # 5) /app funnel weakness
    click_total = sum(num(r.get("value")) for r in funnel
                      if r.get("kind") == "app_event")
    appview_total = sum(num(r.get("value")) for r in funnel
                        if r.get("kind") == "app_pageview")
    if funnel:
        if appview_total > 0 and click_total == 0:
            add("app_cta_weak", "/app/", "clicks",
                f"app view {int(appview_total)} / store click 0",
                "/app のストアボタンを上部にも配置・文言を強化", "high")
        if click_total and click_total < 5:
            add("app_store_click_low", "store buttons", "app_store/google_play_click",
                f"合計 {int(click_total)} クリック",
                "記事下CTAの露出を増やし、/app 内のボタンを大きく", "medium")

    # 6) PageSpeed low SEO/perf
    for r in pspeed:
        if r.get("error"):
            continue
        seo = num(r.get("seo_score"))
        perf = num(r.get("performance_score"))
        if seo and seo < 90:
            add("pagespeed_seo_low", f"{r.get('url')} ({r.get('strategy')})", "seo_score",
                str(int(seo)), "メタ・alt・リンクテキスト等のLighthouse SEO項目を修正", "medium")
        if perf and perf < 70:
            add("pagespeed_perf_low", f"{r.get('url')} ({r.get('strategy')})", "performance",
                str(int(perf)), "画像最適化・不要JS削減・LCP改善", "low")

    # 7) indexing anomalies
    for r in inspection:
        verdict = (r.get("verdict") or "").upper()
        if verdict and verdict != "PASS":
            add("index_issue", r.get("url", ""), "coverage",
                f"{r.get('coverageState','')}", "canonical/robots/被リンクを確認", "high")

    # 8) heuristic content suggestions from top queries
    top_q = sorted(gsc_q, key=lambda r: num(r.get("impressions")), reverse=True)[:10]
    for r in top_q:
        q = r.get("query", "")
        if q:
            add("faq_candidate", q, "impressions", str(int(num(r.get("impressions")))),
                f"「{q}」のFAQ（Q&A）を該当記事に追加し強調スニペット狙い", "low")
            add("internal_link_candidate", q, "-", "-",
                f"「{q}」に関連する既存記事から該当ページへ内部リンクを追加", "low")
            add("new_article_theme", q, "-", "-",
                f"「{q}」の検索意図に特化した新規記事を検討", "low")

    os.makedirs(PROC, exist_ok=True)
    os.makedirs(REPORTS, exist_ok=True)
    csv_path = os.path.join(PROC, f"seo_opportunities_{date}.csv")
    C.write_csv(csv_path, ["type", "target", "metric", "value", "suggestion", "priority"], opps)

    # Markdown grouped by type
    md = [f"# SEO改善候補 — {date}\n",
          f"親みまもり研究所 / 自動抽出（GA4・GSC・PageSpeed・URL Inspection）\n",
          f"- 抽出件数: {len(opps)}\n"]
    if not opps:
        md.append("> まだ十分なAPIデータがありません。`run_all_seo_api.py` で取得後に再実行してください。\n")
    by_type = {}
    for o in opps:
        by_type.setdefault(o["type"], []).append(o)
    LABEL = {
        "low_ctr_query": "表示は多いがCTRが低いクエリ", "rank_11_30": "11〜30位（1ページ目を狙える）",
        "rank_4_10_title": "4〜10位（タイトル改善で上位化）", "page_low_click": "表示はあるがクリックが少ないページ",
        "app_cta_weak": "/app 導線が弱い", "app_store_click_low": "ストアクリックが少ない",
        "pagespeed_seo_low": "PageSpeed SEOスコアが低い", "pagespeed_perf_low": "表示速度が低い",
        "index_issue": "インデックス/カバレッジ要確認", "faq_candidate": "FAQ追加候補",
        "internal_link_candidate": "内部リンク追加候補", "new_article_theme": "新規記事テーマ候補",
    }
    for t, items in by_type.items():
        md.append(f"## {LABEL.get(t, t)}（{len(items)}）\n")
        for o in items[:25]:
            md.append(f"- **{o['target']}** — {o['value']}　→ {o['suggestion']}（優先度: {o['priority']}）")
        md.append("")
    with open(os.path.join(REPORTS, f"seo_opportunities_{date}.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(md))
    C.log(f"opportunities: {len(opps)} → {csv_path}")


if __name__ == "__main__":
    try:
        main()
        print("✅ 改善候補の抽出 完了")
    except Exception as e:
        C.print_error(e)
        sys.exit(1)
