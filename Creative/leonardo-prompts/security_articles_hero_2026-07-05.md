# 生成プロンプト：セキュリティ記事3本のhero画像（2026-07-05公開分）

対象：本日追加したfamily-securityカテゴリの3記事。**heroImageは未設定で公開可能**（カード・記事とも画像なしで正常表示）。生成後にfrontmatterへ追記してください。
共通トーン：やさしい／落ち着き／怖がらせない（危機感を煽る赤・ドクロ・ハッカー風フードは禁止）。**可読文字を写さない**。WebP・16:9・1200×675目安。

---

## 1. kazoku-password-kanri（家族のためのパスワード管理入門）
保存先：`public/images/articles/kazoku-password-kanri.webp`

**プロンプトA（ノートと鍵・穏やかな静物）**
Calm still life on a warm wooden desk: a small closed notebook with a tiny brass key resting on it, a smartphone lying nearby, soft morning window light, cozy home atmosphere. Concept of gently keeping family passwords safe. Muted warm palette, photographic, shallow depth of field, no people, no readable text. --ar 16:9

**プロンプトB（親子の手とスマホ）**
An adult child's hands gently helping an elderly parent's hands set up a smartphone at a kitchen table, warm supportive mood, faces not visible, soft natural light. Concept of family helping with digital security. Warm muted tones, photographic. No readable screen text. --ar 16:9

Negative共通：readable text, letters, passwords visible, skull, hacker hoodie, red warning colors, watermark, gibberish.

## 2. oya-phishing-taisaku（親を狙う詐欺メッセージ・フィッシング対策）
保存先：`public/images/articles/oya-phishing-taisaku.webp`

**プロンプトA（迷って家族に見せる・安心側から描く）**
An elderly person at a bright kitchen table holding a smartphone with a slightly puzzled but calm expression, face partially turned away, while showing the screen toward someone across the table (only the other person's hand visible). Concept: "ask family before you tap". Screen content blurred/not readable. Warm reassuring light, photographic. --ar 16:9

**プロンプトB（スマホと湯のみ・立ち止まる静物）**
A smartphone placed face-down on a wooden table next to a cup of green tea and reading glasses, soft afternoon light, peaceful Japanese home. Concept of pausing before reacting to a suspicious message. Calm muted palette, photographic, no people, no readable text. --ar 16:9

Negative共通：scary hacker imagery, skull, dark hoodie, red alarm color, readable text, watermark.

## 3. kazoku-shashin-sns-anzen（家族の写真をSNSに載せる前に）
保存先：`public/images/articles/kazoku-shashin-sns-anzen.webp`

**プロンプトA（投稿前にひと呼吸）**
A parent's hands holding a smartphone above a family dining table, about to take or share a photo of food, thumb hovering thoughtfully over the (blurred, unreadable) screen, warm home light, children's presence only suggested in soft background blur. Concept of thinking before posting family photos. Photographic, warm muted tones, no readable text, no clear faces. --ar 16:9

**プロンプトB（後ろ姿の子どもと公園・特定できない構図）**
A small child seen from behind walking in a sunny park, softly blurred background with no signage or readable landmarks, gentle bokeh. Concept of sharing family moments without revealing identity or location. Warm, tender, photographic. --ar 16:9

Negative共通：faces in focus, school uniforms with emblems, signage, station names, readable text, watermark.

---

## 運用メモ
- 生成（Leonardo/Canva手動）→ 上記パスにWebPで保存
- 各記事frontmatterの `author:` 行の直後に `heroImage: "/images/articles/<slug>.webp"` を追記
- `Creative/image-mapping/` の管理表を使っている場合は status を更新
