# 記事hero画像設計 — 親みまもり研究所

記事ページのタイトル周りに置く大きめ画像と、frontmatter運用。

## サイズ
- hero（記事上部）: **1200×630**（OGP兼用可）または 1080×720 横長
- カード用: **800×600**
- 形式: WebP（軽量・CLS対策で幅高さ指定）

## トーン（style-guideに準拠）
- 実家・古い写真・アルバム・スマホ・親子の距離・やさしい光。
- 日本の家庭らしい雰囲気。高齢者施設/医療/介護感を出さない。暗くしすぎない。広告っぽくしない。
- 文字は画像内に入れない。人物は後ろ姿・手元中心でも可。
- 写真風／やわらかいイラスト風／上品な絵画調 の3系統から記事に合わせて選ぶ。

## frontmatter運用（人間確認後に反映）
```
image: "/images/articles/family-record-hero.webp"     # OGP/hero兼用
heroImage: "/images/articles/family-record-hero.webp"  # カード表示用（同一でも可）
```
- 未設定の記事は現行の `og-image.png`/テキストカードにフォールバック（デグレしない）。
- 保存先：`public/images/articles/`（人間が画像選定後に配置）。

## フロー
1. `Creative/leonardo-prompts/*` のプロンプトで Leonardo/Canva 生成（手動）。
2. 生成物から人間が選定 → `public/images/articles/<slug>.webp` に保存。
3. 記事frontmatterに `image`/`heroImage` を追記（人間確認・別作業）。

## 禁止
- Amazon/A8等の商品画像をhero/カードに流用。
- 参考サイトの画像複製。
