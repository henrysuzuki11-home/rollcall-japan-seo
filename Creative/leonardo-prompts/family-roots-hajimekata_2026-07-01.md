# 生成プロンプト：family-roots-hajimekata（家族のルーツのやさしい始め方）

対象記事：家族のルーツを調べるときのやさしい始め方（公開済み・heroは生成後に配置）
保存先：`public/images/articles/family-roots-hajimekata.webp`（WebP・16:9・1200×675目安に最適化）
トーン：やさしい／落ち着き／ノスタルジック／説教くさくしない。**可読文字を写さない**（AIは文字描画が苦手なため、書類・写真の文字は主役にしない）。

---

## 推奨プロンプトA（古いアルバムと手元・文字は写さない）
Warm, nostalgic still life on a wooden table in soft afternoon light: an old family photo album (opened to blank-looking aged pages with no readable text), a few faded monochrome photographs face-down or blurred, a magnifying glass, a cup of tea. Gentle, reflective mood about family roots and memory. Muted warm palette, photographic, shallow depth of field, no people, no readable text or letters. --ar 16:9

Negative / 避ける要素：readable text, handwriting, printed letters, captions, names, watermark, logo, gibberish characters, faces in sharp focus.

## 推奨プロンプトB（世代をつなぐ手・抽象的）
Two pairs of hands — one older, one younger — gently holding a small stack of old photographs together over a warm wooden table, soft window light. Sense of passing family memories across generations. The photos are blurred / seen from the back so no text or faces are legible. Calm, heartfelt, reassuring. Warm muted tones, photographic. --ar 16:9

Negative / 避ける要素：legible photos, readable text, letters, watermark, gibberish, harsh lighting.

## 推奨プロンプトC（絵画調・穏やかな家系のイメージ）
A soft painterly illustration of a quiet Japanese home scene suggesting family history: an old wooden chest, a vase, warm light through a window, faint silhouettes of framed photos on a shelf with no readable text. Gentle, timeless, warm palette. Illustration style consistent with a calm family-care brand. --ar 16:9

Negative / 避ける要素：text, letters, readable frames, watermark, gibberish, busy composition.

---

## 運用メモ
- 手動生成（Leonardo/Canva）→ `public/images/articles/family-roots-hajimekata.webp` を保存（WebP・16:9）。
- 保存後、記事 `src/content/articles/family-roots-hajimekata.md` の frontmatter に
  `heroImage: "/images/articles/family-roots-hajimekata.webp"` を author 行の直後に追加。
- `Creative/image-mapping/article_image_mapping_template.csv` の該当行 status を pending → used に更新。
