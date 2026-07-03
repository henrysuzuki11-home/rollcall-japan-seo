# 画像生成計画 — 2026-07-03

運用：Leonardo/Canvaで手動生成（API自動化しない）→ WebP最適化（16:9・1200×675・〜150KB）→ `public/images/articles/` へ。
共通の避ける表現：恐怖的な災害描写／悲しみ・死の強調／AIっぽい顔・手のアップ／実在企業ロゴ／Ethereumの仮想通貨・投機イメージ（コイン・チャート禁止）／怖いセキュリティ演出（南京錠だらけ・ハッカー等）。
トーン：家族・スマホ・書類・光・整理された画面・安心感。日本の家庭の自然な雰囲気。

| image_id | 使用予定slug | 場所 | テーマ | プロンプト要旨（英語で生成） | alt案 | 優先 |
|---|---|---|---|---|---|---|
| img-sec-basics | family-information-security-basics | hero | 家族情報を守る | Warm home desk, smartphone with soft abstract shield glow, family photos nearby, no text, photographic, 16:9 | 家族の写真とスマホを安心して管理するイメージ | 高 |
| img-line-share | line-family-important-info-sharing | hero | 日常連絡と重要情報の分離 | Two paths visual: casual chat on phone vs. organized folder/drawer, soft light, no logos, no text | 日常の連絡と大切な情報の置き場所を分けるイメージ | 高 |
| img-phone-lost | smartphone-lost-family-preparation | hero | スマホ紛失の備え | Calm tabletop: phone, spare key, small notebook closed, house keys with tag, warm light, reassuring, no text | スマホと備えの小物を落ち着いて整理するイメージ | 高 |
| img-inherit-young | inheritance-important-info-young-people | hero | 相続の自分ごと化（若年） | Young adult at bright desk organizing simple folder + phone, plant, morning light, hopeful mood, no text | 若い人が自分の情報を整理する明るいイメージ | 高 |
| img-oyako-check | parent-child-emergency-information-sharing | hero | 親子双方の安心確認 | Split warm scene: parent home & young adult apartment connected by soft light thread, abstract, gentle | 離れて暮らす親子がゆるやかにつながるイメージ | 高 |
| img-share-timing | when-to-share-important-family-information | hero | 共有タイミング3段階 | Three soft envelopes/lanterns at different distances on a calm timeline, warm abstract, no text, not funeral-like | 情報を渡すタイミングを表すやさしい抽象イメージ | 中 |
| img-encrypt-abstract | セキュリティ系記事body共用 | body | 暗号化保管の抽象 | Soft glowing layered box / frosted glass container holding family photos, warm abstract, no padlock cliché | 暗号化された保管をやわらかく表す抽象イメージ | 中 |
| img-mfa | family-information-security-basics | body | 多要素認証 | Phone showing simple 6-digit code UI (generic), second device nearby, clean flat style, no brand | 認証アプリでのもう一段階の確認を表すイメージ | 中 |
| img-tamper-proof | /iq121-japan/ OGP・記事body | body | 改ざん検知・真正性 | Chain of soft glowing paper seals / hanko stamps on documents, abstract trust, NOT crypto coins | 記録の信頼性・改ざん検知を表す抽象イメージ | 中 |
| img-private-design | セキュリティ系body | body | 運営者も見られない設計 | Closed translucent box only the family key opens, staff silhouette politely apart, gentle, no text | 本人だけが開けられる保管を表すイメージ | 中 |
| img-personal-ai | /iq121-japan/ | body | Personal AIの未来感 | Soft ambient light companion beside family table, subtle, warm, not robot-like | 家族の暮らしにそっと寄り添う未来のイメージ | 低 |
| img-ea-cta | Early Adopter CTA用 | CTA/OGP | 先行登録 | Sunrise over calm home interior, invitation mood, no text | 新しい始まりを感じさせる朝のイメージ | 低 |
| img-app-page | /app | body | アプリ紹介 | Hands holding phone with simple check-in UI (generic), warm home bg | ワンタップの安否共有を表すイメージ | 低 |
| img-cat-thumbs | カテゴリ一覧（10種） | card | カテゴリ別サムネ | Minimal icon-style illustrations per category, unified palette (#2f6f5e系) | 各カテゴリの内容を表すシンプルなイラスト | 低 |
| img-disaster-contact | 災害連絡系 | body | 災害時の家族連絡 | Family checking phones calmly at kitchen table, candle light, prepared not scared | 落ち着いて連絡を取り合う家族のイメージ | 中 |
| img-photo-organize | family-photo-seiri差替候補 | body | 写真動画整理 | Photo prints + phone + laptop neatly arranged, sorting into albums, bright | 家族写真を整理するイメージ | 低 |
| img-recipe-grandma | 親のレシピ系body | body | 祖母・母の味の記録 | Elder hands + younger hands cooking together at stove, steam, warm (hands mostly out of close focus) | 親子で台所に立ち味を受け継ぐイメージ | 中 |

生成が必要な画像数：**17テーマ**（カテゴリサムネ10種を1テーマと数える）
優先順位：高5（セキュリティ/重要情報系hero）→ 中7 → 低5
※ レシピ系heroは実写（public/images/recipes/）を使うため生成不要。
