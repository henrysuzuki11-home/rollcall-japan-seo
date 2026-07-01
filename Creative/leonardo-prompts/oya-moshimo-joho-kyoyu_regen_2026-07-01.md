# 再生成プロンプト：oya-moshimo-joho-kyoyu（手書き文字の崩れ対策）

対象記事（予定）：離れて暮らす親の「もしも」に備えて共有しておきたい情報
現行画像の問題：メモ用紙の手書き文字がAI崩れ（判読不能の英字）で写り込み、信頼性重視のブランドに不向き。
方針：**読める文字（手書き・印刷とも）を画面に写さない構図**にする。AIは可読テキストの描画が苦手なため、テキストを主役から外すのが最も確実な対策。

保存先：`public/images/articles/oya-moshimo-joho-kyoyu.webp`（WebP・16:9・1200×675目安に最適化して差し替え）
トーン：やさしい／落ち着き／不安を煽らない（DeathTech的でも生活寄りの穏やかさ）。文字なし・絵画調寄りでも可。

---

## 推奨プロンプト案A（俯瞰・小物のみ・文字を写さない）
A calm, softly lit Japanese home desk seen from above, warm afternoon light. On the wooden desk: a closed dark notebook, a fountain pen resting beside it, a smartphone face-down, a small potted plant, a ceramic cup. No visible text, no writing, no labels, no signage anywhere in the frame. Cozy, trustworthy, reassuring mood. Muted natural palette (warm wood, soft green, cream). Photographic, shallow depth of field, no people. --ar 16:9

Negative / 避ける要素：text, handwriting, letters, words, captions, watermark, logo, gibberish characters, paper with writing, checklist, labels.

## 推奨プロンプト案B（手元・書く仕草だが紙面は写さない）
Close-up of an adult's hands gently holding a closed notebook and a pen at a warm wooden table, soft window light, a smartphone nearby. The notebook is closed so no pages or text are visible. Calm, caring, organized feeling. Warm muted tones. Photographic, shallow depth of field. --ar 16:9

Negative / 避ける要素：open pages, visible writing, printed text, letters, numbers, labels, watermark, gibberish.

## 推奨プロンプト案C（象徴的・書類の“場所”を穏やかに示す）
A tidy drawer or shelf at home with a plain folder and a small key on a wooden surface, warm soft lighting, no text on the folder, no labels. Sense of "important things kept safely and shared with family." Reassuring, not anxious. Photographic, muted natural palette. --ar 16:9

Negative / 避ける要素：text, labels, documents with writing, faces, gibberish, watermark.

---

## 運用メモ
- 生成後、`public/images/articles/oya-moshimo-joho-kyoyu.webp` を上書き（WebP・16:9）。
- 記事「離れて暮らす親の『もしも』に備えて共有しておきたい情報」を公開する際に heroImage として配置。
- 画像は API 自動化ではなく、Leonardo / Canva で手動生成 → 保存の半自動運用（既存方針どおり）。
- 差し替え後、`Creative/image-mapping/article_image_mapping_template.csv` の該当行 status を needs_regen → held/used に更新。
