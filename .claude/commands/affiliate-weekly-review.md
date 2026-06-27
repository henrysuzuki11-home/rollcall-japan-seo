---
description: Review which articles to strengthen for affiliate revenue (uses GA4/GSC)
---

`Affiliate/links` と GA4/GSCデータを見て、どの記事から収益化導線を強化すべきかを提案してください。`affiliate-strategist`＋`seo-data-analyst` を使うとよいです。

1. 読む: `Affiliate/links/affiliate_link_table.csv`（あれば）、`SEO/reports/weekly_seo_report_*.md`・`SEO/data/processed/seo_opportunities_*.csv`（最新）。
2. 分析:
   - 検索流入が出ている／伸びている記事のうち、相性の良いカテゴリを扱えるもの
   - すでにアフィリエイト導線がある記事の状況（開示・リンク切れ・last_checked）
   - /app 導線と競合していないか（主導線を邪魔していないか）
3. 提案: 「強化すべき記事」「追加すべき比較軸/リンク」「開示の見直し」を優先度つきで。
4. 出力: `Affiliate/reports/affiliate_weekly_review_YYYY-MM-DD.md`

注意:
- 第一導線は /app（Roll Call）。アフィリエイトはこれを邪魔しない範囲で。
- 提案のみ。本番記事は変更しない。src/・public/ は触らない。git commit はしない。
