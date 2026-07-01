# 画像 半自動生成ワークフロー（手動運用）— 親みまもり研究所

**API自動化しない。** Claude Codeはプロンプトのみ作成、生成は人間がツールで行う。

## フロー
1. **プロンプト作成**（Claude Code）：`Creative/leonardo-prompts/` `Creative/canva-prompts/` に記事別プロンプト。
2. **生成**（人間・手動）：Leonardo AI / Canva Magic Media / Ideogram に英語プロンプトをコピペ。1080×720 か 1200×630（カードは800×600）。
3. **選定**（人間）：スタイルガイド適合（実家/やさしい光・文字なし・医療介護感なし）を確認して1枚選ぶ。
4. **保存**：`public/images/articles/<slug>-hero.webp`（命名規則は下記）。WebP化（squooshやCanva書き出し）。
5. **記事反映**（人間・別作業）：frontmatter に `image` / `heroImage` を追記。
6. **確認**：`npm run build` → 本番URLで表示・CLS。

## 命名規則
- hero: `<slug>-hero.webp`（例 `family-record-hero.webp`）
- カード用に別画像を使う場合: `<slug>-card.webp`
- 保存先: `public/images/articles/`

## マッピング管理
- `Creative/image-mapping/article_image_mapping_template.csv` に「記事slug ↔ 使用画像 ↔ 生成ツール ↔ ステータス」を記録。

## 禁止
- Leonardo AI **API を呼ぶ／APIキーを扱う**。
- Amazon/A8 の商品画像を hero/カードに流用。
- 生成前に本番へ空パスを入れる（未生成はfrontmatterに入れない＝フォールバック表示）。
