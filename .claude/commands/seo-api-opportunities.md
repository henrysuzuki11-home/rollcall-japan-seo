---
description: Read the latest SEO opportunities CSV and turn it into actions
---

最新の改善候補データを読み、伸ばすべき記事・改善すべきtitle・新規記事案に整理してください。

1. `SEO/data/processed/seo_opportunities_*.csv`（最新日付）を読む。
2. タイプ別に整理して提示:
   - **伸ばすべき既存記事**（rank_11_30 / rank_4_10_title / page_low_click）
   - **title/description 改善候補**（low_ctr_query 中心。具体的なタイトル案も添える）
   - **内部リンク追加候補 / FAQ追加候補**
   - **新規記事テーマ候補**（検索意図つき）
   - **/app 導線・PageSpeed の要改善**
3. 上位の打ち手を優先度つきで10件以内に要約。
4. 必要なら `seo-editor` サブエージェントに編集計画づくりを引き継ぐことを提案。

注意: 本番記事は変更しない。下書きを作る場合は `/seo-draft-from-api` を使い `SEO/drafts/` に保存。
