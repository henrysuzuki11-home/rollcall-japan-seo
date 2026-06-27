---
description: Draft 3 affiliate-friendly articles into SEO/drafts (not published)
---

アフィリエイト向きの記事を**3本だけ** `SEO/drafts/` に下書きしてください。本番公開はしません。`affiliate-content-planner` →（仕上げに）`affiliate-disclosure-reviewer`・`affiliate-safety-reviewer` を使うとよいです。

下書き候補（この3本）:
1. 離れて暮らす親のために用意したい防災グッズチェックリスト
2. 実家に置いておきたいモバイルバッテリーと充電まわりの備え
3. 見守りカメラを選ぶ前に家族で決めておきたいこと

各記事に含める:
- `SEO/drafts/article_template.md` ベースの frontmatter（title/description/category/tags/slug/pubDate/draft: true）
- **記事冒頭に開示文**（`Affiliate/disclosures/disclosure_templates.md` の「記事冒頭用」）
- 共感→実用→「備えの選択肢」。比較軸で中立に。商品名は誇張しない。
- アフィリエイトリンクは **`REPLACE_WITH_AFFILIATE_URL`** プレースホルダ＋リンク近くに表記
- /app（Roll Call）CTAを1つ残す
- FAQ・内部リンク案

注意:
- 保存先は `SEO/drafts/` のみ。`src/content/articles/` には入れない。
- 不安を煽らない・医療断定をしない・保証表現を使わない。
- 実アフィリエイトIDやsecretは入れない。src/・public/ は触らない。git commit はしない。
