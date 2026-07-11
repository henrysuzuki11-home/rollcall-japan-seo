# hero画像 生成リスト（季節・家族イベントクラスタ 8記事）— 2026-07-11

対象：新規8記事（お盆・帰省・贈り物・旅行・アウトドア・ゴルフ・防災）。hero未設定のため、生成後 `Creative/source-images/hero-batch1/<slug>.jpg` で保存 → Claude Codeに一言（WebP化＋配置＋frontmatter追記まで自動）。

## 共通ルール
- スタイル接尾辞（末尾に付ける）:
  `warm soft light, muted natural palette, japanese family atmosphere, calm and heartwarming, photographic, shallow depth of field, 16:9 --ar 16:9`
- 共通ネガティブ:
  `readable text, letters, captions, watermark, logo, gibberish characters, scary mood, price tags, sale signs, brand logos, distorted hands, distorted face`
- トーン方針：**旅行や買い物が主役ではなく、親と過ごす時間・会話・思い出が主役**。豪華な観光地やショッピングの華やかさではなく、「家族が一緒に過ごす穏やかな時間」を中心に。人物は顔がはっきり写らない構図（手元・後ろ姿・遠景）で温かく。ブランドや商品名が写り込まないこと。

## 生成リスト（8枚）

| # | 保存名（.jpg） | 記事テーマ | プロンプト（＋共通接尾辞） | alt案 |
|---|---|---|---|---|
| 1 | obon-homecoming-parent-checklist | お盆の帰省で親を確認 | An adult child and an elderly parent sharing tea at a low table in a tatami room during summer, gentle conversation, faces soft/out of focus, obon season warmth | お盆の帰省で親とお茶を囲む場面 |
| 2 | homecoming-family-talk | 帰省での家族の会話 | Two generations looking at an old photo album together on a sofa, relaxed and warm, hands and album in focus, faces out of frame | アルバムを一緒に見ながら話す家族 |
| 3 | ochugen-parent-gift | お中元・季節の贈り物 | A neatly wrapped traditional Japanese gift box (furoshiki-style, no brand) on a wooden table beside a phone, warm daylight, thoughtful | 机に置かれた季節の贈り物と電話 |
| 4 | parent-onsen-trip-memory | 親と行く温泉旅行 | An elderly parent and adult child walking slowly along a quiet onsen town street in yukata, back view, relaxed pace, warm evening light | 温泉街をゆっくり歩く親子の後ろ姿 |
| 5 | family-outdoor-memory | 三世代のアウトドア | A three-generation family enjoying a relaxed day-camp/barbecue in a park, grandparent, parent and child, gentle candid distance, no faces in close-up | 公園で三世代が過ごすデイキャンプ |
| 6 | parent-golf-memory | 親子ゴルフ | An elderly parent and adult child walking a green golf course together with a cart, back view, calm sunny day, sharing the round | ゴルフコースを一緒に回る親子の後ろ姿 |
| 7 | homecoming-disaster-supplies | 帰省ついでの実家防災 | Neatly arranged home emergency supplies (water bottles, flashlight, small bag) on a shelf in a Japanese home, tidy and calm, no brand labels | 実家に整えた防災グッズ |
| 8 | practical-gifts-for-parents | 親への実用的な贈り物 | A simple wrapped everyday gift and a warm cup of tea on a wooden table near a window, thoughtful and homey, no brand logos | 窓辺に置かれた実用的な贈り物 |

生成必要枚数：**8枚**。優先：1・7（お盆本命）→ 残り。
※ 生成が難しければ既存の落ち着いた実写を流用してもよい。トーンは「親との時間・会話・思い出」を最優先。
