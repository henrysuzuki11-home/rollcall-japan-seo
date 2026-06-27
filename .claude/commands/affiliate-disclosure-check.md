---
description: Check affiliate drafts for clear 広告/PR/アフィリエイト disclosure
---

`Affiliate/` 配下の記事案・紹介文（および関連する `SEO/drafts/`）を読み、広告/PR/アフィリエイト表記が明確かを確認してください。`affiliate-disclosure-reviewer` サブエージェント推奨。

1. 対象ファイルを読み、`Affiliate/disclosures/disclosure_templates.md` と照合。
2. 確認:
   - 記事冒頭に開示文があるか
   - アフィリエイトリンク付近に表記があるか
   - ステマ／誤認を招く表現がないか
3. 判定（OK / 要修正）と、要修正箇所・直し方を一覧化。
4. 出力: `Affiliate/reports/affiliate_disclosure_check_YYYY-MM-DD.md`

注意: 確認・提案のみ。本番記事は変更しない。src/・public/ は触らない。git commit はしない。
