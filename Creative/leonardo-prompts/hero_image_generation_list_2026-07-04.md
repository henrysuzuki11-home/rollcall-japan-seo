# hero画像 生成リスト（全33枚）— 2026-07-04

対象：hero未設定の公開記事 33本（全49本中。設定済み16本は末尾に記載）。
運用：Leonardo / Canva で**手動生成**（API不使用）→ 元画像を `Creative/source-images/hero-batch1/` に「**slug名.jpg/png**」で保存 → Claude Codeに「配置して」と依頼（WebP最適化1200×675＋frontmatter追記まで自動）。

## 共通ルール（全プロンプトに適用）
- **スタイル接尾辞（毎回プロンプト末尾に付ける）**:
  `warm soft light, muted natural palette, japanese home atmosphere, photographic, shallow depth of field, 16:9 --ar 16:9`
- **共通ネガティブ**:
  `readable text, letters, captions, watermark, logo, gibberish characters, scary mood, dark horror lighting, close-up distorted hands, close-up distorted face, crypto coins, charts`
- 文字（手書き・印刷・画面内テキスト）は写さない／恐怖・悲嘆の演出禁止／実在ロゴ禁止／人物は顔のアップを避け後ろ姿・手元・遠景に

---

## 優先度【高】10枚（新戦略記事＋SEO主力）

| # | 保存名（slug） | 記事 | プロンプト（＋共通接尾辞） | alt案 |
|---|---|---|---|---|
| 1 | family-information-security-basics | はじめてのセキュリティ講座 | A tidy home desk with a smartphone showing a soft abstract shield glow, family photo frames nearby, plant, morning light, reassuring not technical | 家族の写真とスマホを安心して管理するイメージ |
| 2 | line-family-important-info-sharing | LINEで重要情報を送って大丈夫？ | Conceptual split scene: casual phone chat bubbles on one side, a neatly organized drawer with folders on the other, connected by a wooden table, no text | 日常の連絡と大切な情報の置き場所を分けるイメージ |
| 3 | smartphone-lost-family-preparation | スマホをなくした時の備え | Calm flat-lay on wood: smartphone face down, spare house key, small closed notebook, family photo at edge, orderly and reassuring | スマホと備えの小物を落ち着いて整理するイメージ |
| 4 | inheritance-important-info-young-people | 相続を自分ごとにする | A young adult at a bright desk calmly organizing one simple folder and a phone, coffee, plant, hopeful morning light, seen from behind | 若い人が自分の情報を整理する明るいイメージ |
| 5 | when-to-share-important-family-information | 重要情報はいつ共有するべきか | Three soft glowing paper envelopes placed along a gentle wooden path at increasing distance, warm abstract, calm, not funeral-like | 情報を渡すタイミングを表すやさしい抽象イメージ |
| 6 | parent-child-emergency-information-sharing | 親と子、どちらにも必要な情報共有 | Two warm home windows at dusk—an older house and a small apartment—connected by a soft thread of light across the sky, gentle, hopeful | 離れて暮らす親子がゆるやかにつながるイメージ |
| 7 | anpi-kakunin-app-towa | 安否確認アプリとは（SEOハブ） | Elderly hand gently tapping a large simple button on a smartphone at a kitchen table, tea cup, morning light, easy and friendly (no readable UI text) | ワンタップで無事を伝えるシンプルな操作のイメージ |
| 8 | mimamori-app-erabikata | 見守りアプリの選び方（人気記事） | A smartphone and a handwritten-style blank checklist card on a warm table, five wooden checkmark tokens beside, comparison mood without text | アプリ選びのチェックポイントを表すイメージ |
| 9 | muryou-anpi-kakunin-app | 無料の安否確認サービス | A cheerful minimal scene: smartphone, small piggy bank, and a cup of tea on a bright table, light and approachable, no coins scattered | 費用をかけずに始める見守りのイメージ |
| 10 | sarigenai-anpi-kakunin | さりげない安否確認 | A phone on a sunny windowsill showing a single soft heart/stamp-like glow (abstract, no text), curtain breeze, subtle and tender | さりげなく気持ちが届く連絡のイメージ |

## 優先度【中】12枚（アプリ活用・高齢者見守り・防災主要）

| # | 保存名 | 記事 | プロンプト | alt案 |
|---|---|---|---|---|
| 11 | rollcall-dekirukoto | Roll Callでできること | Parent and adult child each holding phones in their own warm homes, gentle light thread between, both relaxed, backs to camera | 毎日のチェックインで安心を共有するイメージ |
| 12 | rollcall-tsukaikata-guide | Roll Call使い方ガイド | Over-shoulder view of hands holding a phone with a single big friendly button glow (no text), guidance mood, bright living room | アプリをかんたんに使い始めるイメージ |
| 13 | mimamori-app-osusume-hikaku-2026 | アプリ・サービス比較 | Neat top-down arrangement of a phone, a small home sensor, and a teacup on wood, balanced layout suggesting comparison, no brands | アプリとサービスを見比べるイメージ |
| 14 | mimamori-app-service-chigai | アプリとサービスの違い | Two gentle paths on a wooden table: a smartphone on one side, a small device/sensor on the other, soft fork-in-road feel | アプリ型とサービス型の違いを表すイメージ |
| 15 | mimamori-camera-erabu-mae-ni | 見守りカメラを選ぶ前に | A small indoor camera on a shelf beside family photos and a plant, warm non-surveillance mood, cozy living room bokeh | 暮らしになじむ見守りカメラのイメージ |
| 16 | kourei-tsukaiyasui-app | 高齢の親でも使いやすいアプリ | Close of weathered hands comfortably holding a phone with large simple glowing button (no text), grandchild hand nearby helping, warm | 高齢の親がやさしく使えるスマホのイメージ |
| 17 | mimamori-service-erabikata | 見守りサービスの選び方 | A kettle pot, a small sensor light and a phone arranged on a kitchen counter, homely, suggesting daily-life monitoring options | 生活の中の見守りサービスのイメージ |
| 18 | kourei-hitorigurashi-taisaku | 高齢者の一人暮らし対策 | A cozy single armchair by a bright window with a shawl and tea, phone on side table, peaceful independent living, hopeful | 一人暮らしの親の穏やかな暮らしのイメージ |
| 19 | ninchisho-oya-mimamori | 認知症の親の見守り | Adult child gently placing a hand over parent's hand on a table with tea, soft supportive mood, faces not in focus | 親にそっと寄り添う家族のイメージ |
| 20 | enkyori-kaigo-kokorogamae | 遠距離介護の心構え | A train window view at dusk with a phone in hand showing soft light (no text), a thoughtful journey home, warm and calm | 離れた実家へ向かう道のりのイメージ |
| 21 | bousai-goods-oya-checklist | 実家の防災グッズチェックリスト | Tidy emergency supplies (water bottles, flashlight, radio, first-aid pouch) neatly in an open box on tatami, organized and calm, daylight | 実家に備える防災グッズのイメージ |
| 22 | jishin-bousai-checklist | 地震に備えるチェックリスト | A secured bookshelf strap, flashlight and water bottles by a home entrance, preparedness without fear, bright daylight | 日常の中の地震への備えのイメージ |

## 優先度【低】11枚（子ども見守り・家族連絡系）

| # | 保存名 | 記事 | プロンプト | alt案 |
|---|---|---|---|---|
| 23 | bousai-kazoku-kaigi | 防災家族会議 | Family gathered around a kitchen table with a simple blank map and flashlight, discussing calmly, seen from above, no text | 家族で備えを話し合うイメージ |
| 24 | hitorigurashi-bousai-taisaku | 一人暮らしの防災 | A compact emergency kit beside a studio apartment entrance with sneakers, small and manageable, morning light | 一人暮らしのコンパクトな備えのイメージ |
| 25 | kodomo-bouhan-taisaku | 子どもの防犯対策 | A small yellow safety bell/charm on a child's backpack by the door, morning departure light, protective but cheerful | 通学かばんの防犯グッズのイメージ |
| 26 | kodomo-smartphone-rule | 子どものスマホルール | Parent and child hands together over a phone at a living table, agreement mood, warm afternoon, no screen text | 親子でスマホの約束を決めるイメージ |
| 27 | kodomo-kitaku-kakunin | 子どもの帰宅確認 | A child's shoes just placed at the genkan with a phone glowing softly on the shelf (no text), relieved homecoming light | 帰宅の知らせが届く玄関のイメージ |
| 28 | kodomo-toukou-mimamori | 登下校の見守り | Children walking to school on a safe sunny street seen from behind, randoseru backpacks, gentle guardian mood | 登下校を見守るあたたかい通学路のイメージ |
| 29 | shougakusei-rusuban-rule | 小学生の留守番ルール | A cozy living room with a note-free memo board, house key on a hook, snack on table, safe solo afternoon, bright | 安心して留守番できる部屋のイメージ |
| 30 | kazoku-group-renraku | 家族グループ連絡 | Three phones of different generations on one table, soft speech-bubble glows (abstract, no text), unity and ease | 家族グループでゆるくつながるイメージ |
| 31 | kyoudou-houkago-mimamori | 共働きの放課後見守り | After-school scene: child's desk with homework and a juice, parent's phone glowing gently in office foreground bokeh | 離れていても放課後を見守るイメージ |
| 32 | oyakoukou-tooku-kizukai | 遠くからの親孝行 | A small care package box with fruit and a handwritten-style blank card being taped shut, sending love by post, warm | 遠くの親へ届ける小さな気づかいのイメージ |
| 33 | tanshin-funin-kazoku-tsunagari | 単身赴任のつながり | A business hotel desk at night with a phone in video-call glow (abstract, no text) and family photo, warm not lonely | 単身赴任先から家族とつながるイメージ |

---

## 参考：hero設定済み（16本・生成不要）
distant-parent / teiden-renraku / jikka-bousai-juden / smartphone-oya-renraku / ame-jikka / oya-jinsei-10questions / jikka-memories-smartphone / family-record / family-tree-start / family-photo-seiri / omoide-mimamori / family-roots-hajimekata / oya-moshimo-joho-kyoyu / family-table-washoku-morning(レシピ) / grilled-mackerel-teishoku(レシピ) / grilled-fish-home-breakfast(レシピ)
＋汎用ストック: sns-generic-hero / family-record-card

## 生成後の流れ
1. 生成画像を `Creative/source-images/hero-batch1/<slug>.jpg`（またはpng）で保存
2. Claude Codeに「hero-batch1を配置して」と依頼 → WebP最適化（1200×675・16:9クロップ・〜150KB）→ `public/images/articles/` 配置 → 各記事frontmatterに `heroImage` 追記 → ビルド検証まで実施
3. 全部一度でなくてOK。**優先度【高】10枚だけでも効果大**（新カテゴリ記事＋SEO主力のOGP/カード改善）
