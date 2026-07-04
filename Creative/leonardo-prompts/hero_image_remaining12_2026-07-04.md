# hero画像 残り12枚 生成リスト — 2026-07-04

対象：hero未設定の残り12記事（全49本中37本は設定済み）。
保存先：`Creative/source-images/hero-batch1/` に「**slug名.jpg**」で保存 → Claude Codeに「入れた」と一言（QC→WebP→配置→検証まで自動）。

## 共通ルール
- **スタイル接尾辞（毎回プロンプト末尾に付ける）**:
  `warm soft light, muted natural palette, japanese home atmosphere, photographic, shallow depth of field, 16:9 --ar 16:9`
- **共通ネガティブ**:
  `readable text, letters, captions, watermark, logo, gibberish characters, scary mood, dark horror lighting, close-up distorted hands, close-up distorted face, crypto coins, charts`

## 生成リスト（12枚）

| # | 保存名（.jpg） | 記事 | プロンプト（＋共通接尾辞） | alt案 |
|---|---|---|---|---|
| 1 | rollcall-dekirukoto | Roll Callでできること | Parent and adult child each holding phones in their own warm homes, gentle light thread between the two scenes, both relaxed, backs to camera | 毎日のチェックインで安心を共有するイメージ |
| 2 | rollcall-tsukaikata-guide | Roll Call使い方ガイド | Over-shoulder view of hands holding a phone with a single big friendly glowing button (no text on screen), guidance mood, bright living room | アプリをかんたんに使い始めるイメージ |
| 3 | mimamori-app-osusume-hikaku-2026 | アプリ・サービス比較 | Neat top-down arrangement of a smartphone, a small home sensor device, and a teacup on wood, balanced layout suggesting comparison, no brands | アプリとサービスを見比べるイメージ |
| 4 | mimamori-app-service-chigai | アプリとサービスの違い | Two gentle paths on a wooden table: a smartphone on one side, a small sensor device on the other, soft fork-in-the-road feeling | アプリ型とサービス型の違いを表すイメージ |
| 5 | mimamori-camera-erabu-mae-ni | 見守りカメラを選ぶ前に | A small indoor camera on a shelf beside family photo frames and a plant, warm non-surveillance mood, cozy living room bokeh | 暮らしになじむ見守りカメラのイメージ |
| 6 | kourei-tsukaiyasui-app | 高齢の親でも使いやすいアプリ | Weathered elderly hands comfortably holding a phone with one large simple glowing button (no text), a younger hand gently helping nearby, warm kitchen light | 高齢の親がやさしく使えるスマホのイメージ |
| 7 | mimamori-service-erabikata | 見守りサービスの選び方 | A kettle pot, a small sensor night-light and a smartphone arranged on a kitchen counter, homely, suggesting daily-life monitoring options | 生活の中の見守りサービスのイメージ |
| 8 | kourei-hitorigurashi-taisaku | 高齢者の一人暮らし対策 | A cozy single armchair by a bright window with a knitted shawl and tea, phone on the side table, peaceful independent living, hopeful | 一人暮らしの親の穏やかな暮らしのイメージ |
| 9 | ninchisho-oya-mimamori | 認知症の親の見守り | Adult child gently placing a hand over an elderly parent's hand on a table with tea cups, soft supportive mood, faces out of focus | 親にそっと寄り添う家族のイメージ |
| 10 | enkyori-kaigo-kokorogamae | 遠距離介護の心構え | A train window view at dusk countryside with a phone held in hand showing a soft glow (no text), a thoughtful journey to the family home, calm | 離れた実家へ向かう道のりのイメージ |
| 11 | bousai-goods-oya-checklist | 実家の防災グッズチェックリスト | Tidy emergency supplies — water bottles, flashlight, small radio, first-aid pouch — neatly arranged in an open box on tatami, organized and calm, daylight | 実家に備える防災グッズのイメージ |
| 12 | jishin-bousai-checklist | 地震に備えるチェックリスト | A secured bookshelf with furniture strap, flashlight and water bottles near a home entrance, preparedness without fear, bright daylight | 日常の中の地震への備えのイメージ |

## 生成後の流れ
1. 12枚を `Creative/source-images/hero-batch1/<slug>.jpg` で保存（名前が多少ずれてもOK、こちらで補正）
2. Claude Codeに一言 → WebP最適化（1200×675）→ 配置 → frontmatter追記 → ビルド検証まで自動
3. これで**全49記事のhero完備**になります
