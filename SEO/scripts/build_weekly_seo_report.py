#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Build a weekly SEO report (Markdown) from the latest API CSVs.

Output: SEO/reports/weekly_seo_report_YYYY-MM-DD.md
Read-only. Runs cleanly even with partial/empty data.
"""
import sys, os, csv, glob
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import _common as C

RAW = os.path.join(C.ROOT, "SEO", "data", "raw")
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

    total_clicks = sum(num(r.get("clicks")) for r in gsc_p)
    total_imp = sum(num(r.get("impressions")) for r in gsc_p)
    avg_ctr = (total_clicks / total_imp) if total_imp else 0
    positions = [num(r.get("position")) for r in gsc_p if num(r.get("position"))]
    avg_pos = sum(positions) / len(positions) if positions else 0

    top_q = sorted(gsc_q, key=lambda r: num(r.get("clicks")), reverse=True)[:10]
    improve_q = [r for r in gsc_q if 11 <= num(r.get("position")) <= 30 and num(r.get("impressions")) >= 20]
    improve_q = sorted(improve_q, key=lambda r: num(r.get("impressions")), reverse=True)[:10]
    top_p = sorted(gsc_p, key=lambda r: num(r.get("clicks")), reverse=True)[:8]
    weak_p = [r for r in gsc_p if num(r.get("impressions")) >= 50 and num(r.get("clicks")) <= 1][:8]

    app_events = {r.get("name"): int(num(r.get("value"))) for r in funnel if r.get("kind") == "app_event"}
    app_views = sum(num(r.get("value")) for r in funnel if r.get("kind") == "app_pageview")

    has_data = bool(gsc_p or gsc_q)
    L = []
    L.append(f"# 週次SEOレポート — {date}")
    L.append("親みまもり研究所 / https://www.oyamimamori.jp/\n")
    if not has_data:
        L.append("> ⚠ Search Console / GA4 のデータがまだありません。`python SEO/scripts/run_all_seo_api.py` で取得後に再生成してください。本レポートはテンプレートとして出力しています。\n")

    L.append("## 1. 全体サマリー（直近28日 / GSC）")
    L.append(f"- 検索表示回数（impressions）: **{int(total_imp):,}**")
    L.append(f"- クリック数（clicks）: **{int(total_clicks):,}**")
    L.append(f"- 平均CTR: **{avg_ctr:.2%}**")
    L.append(f"- 平均掲載順位: **{avg_pos:.1f}**\n")

    L.append("## 2. 伸びているクエリ（クリック上位）")
    if top_q:
        for r in top_q:
            L.append(f"- {r.get('query','')} — {int(num(r.get('clicks')))}click / {int(num(r.get('impressions')))}imp / {num(r.get('position')):.1f}位")
    else:
        L.append("- （データなし）")
    L.append("")

    L.append("## 3. 改善すべきクエリ（11〜30位 × 表示多い）")
    if improve_q:
        for r in improve_q:
            L.append(f"- {r.get('query','')} — {num(r.get('position')):.1f}位 / {int(num(r.get('impressions')))}imp → 内容拡充＋内部リンク")
    else:
        L.append("- （データなし）")
    L.append("")

    L.append("## 4. 伸びているページ")
    for r in (top_p or []):
        L.append(f"- {r.get('page','')} — {int(num(r.get('clicks')))}click / {int(num(r.get('impressions')))}imp")
    if not top_p:
        L.append("- （データなし）")
    L.append("")

    L.append("## 5. 改善すべきページ（表示多いがクリック少）")
    for r in (weak_p or []):
        L.append(f"- {r.get('page','')} — {int(num(r.get('impressions')))}imp / {int(num(r.get('clicks')))}click")
    if not weak_p:
        L.append("- （データなし）")
    L.append("")

    L.append("## 6. /app 導線の状況")
    L.append(f"- /app ページビュー: {int(app_views)}")
    L.append(f"- app_page_cta_click: {app_events.get('app_page_cta_click', 0)}")
    L.append(f"- app_store_click: {app_events.get('app_store_click', 0)}")
    L.append(f"- google_play_click: {app_events.get('google_play_click', 0)}")
    if app_views and not app_events:
        L.append("- ⚠ ページは見られているがクリックが発生していません。CTAの位置・文言を見直し。")
    L.append("")

    L.append("## 7. PageSpeed 改善点")
    issues = [r for r in pspeed if not r.get("error") and (num(r.get("seo_score")) < 90 or num(r.get("performance_score")) < 70)]
    for r in issues[:10]:
        L.append(f"- {r.get('url')} ({r.get('strategy')}) — SEO {r.get('seo_score')} / Perf {r.get('performance_score')} / LCP {r.get('largest_contentful_paint')}")
    if not issues:
        L.append("- 大きな問題は検出されませんでした（またはデータなし）。")
    L.append("")

    L.append("## 8. 今週作るべき記事案（10本）")
    seeds = [r.get("query", "") for r in (improve_q + top_q) if r.get("query")]
    seen, ideas = set(), []
    for q in seeds:
        if q not in seen:
            seen.add(q); ideas.append(q)
    fallback = [
        "離れて暮らす親の見守り 始め方", "親 安否確認 アプリ 比較", "一人暮らし 親 心配 対処",
        "親 毎日電話 しんどい", "実家 連絡 頻度 目安", "高齢の親 見守り 無料",
        "親 スマホ 苦手 連絡方法", "災害時 family 安否確認 方法", "見守り 監視 違い",
        "親孝行 遠距離 できること",
    ]
    for q in (ideas + fallback):
        if len(ideas) >= 10:
            break
        if q not in ideas:
            ideas.append(q)
    for i, q in enumerate(ideas[:10], 1):
        L.append(f"{i}. {q} に答える記事")
    L.append("")

    L.append("## 9. 今週改善すべき既存記事（5本）")
    targets = (weak_p or [])[:5] or [{"page": p.get("page", "")} for p in top_p[:5]]
    if targets:
        for r in targets:
            L.append(f"- {r.get('page','')} — タイトル/導入/内部リンク/CTAを見直し")
    else:
        L.append("- （データ取得後に自動で埋まります）")
    L.append("")

    L.append("## 10. 注意点")
    L.append("- 本番記事の公開・修正は必ず人間確認後に行う（このレポートは提案のみ）。")
    L.append("- 数値が0/欠損のときは、API有効化・権限・プロパティURLを README に従って確認。")
    L.append("- 通常記事に Google Indexing API は使わない（規約違反のため）。")

    os.makedirs(REPORTS, exist_ok=True)
    out = os.path.join(REPORTS, f"weekly_seo_report_{date}.md")
    with open(out, "w", encoding="utf-8") as f:
        f.write("\n".join(L))
    C.log(f"weekly report → {out}")


if __name__ == "__main__":
    try:
        main()
        print("✅ 週次レポート 生成完了")
    except Exception as e:
        C.print_error(e)
        sys.exit(1)
