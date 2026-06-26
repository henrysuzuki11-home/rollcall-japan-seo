---
description: Draft 3 new articles (to SEO/drafts only) from the latest API data
---

APIデータをもとに、新規記事の下書きを**3本だけ**作成してください。

1. `SEO/data/processed/seo_opportunities_*.csv` と `SEO/reports/weekly_seo_report_*.md`（最新）を読み、
   検索意図が明確で勝てそうなテーマを3つ選ぶ（new_article_theme / rank_11_30 などを優先）。
2. `SEO/drafts/article_template.md` をベースに、`article-writer` サブエージェントで3本の下書きを書く。
3. 保存先は必ず `SEO/drafts/`（ファイル名は `draft_YYYY-MM-DD_<slug>.md`）。
   **`src/content/articles/` には絶対に保存しない。**
4. 各下書きに: frontmatter（title/description/category/tags/pubDate/author）、読者の悩み、本文構成、FAQ、内部リンク案、/app CTA、注意書き。
5. 仕上げに `seo-publisher-reviewer` で簡易レビューし、公開可否の所見を添える。

注意:
- 本番公開はしない（人間が `SEO/drafts/` を確認後に手動で移す）。
- 医療・介護の断定をしない。宣伝臭くしない。`git commit` はしない。
