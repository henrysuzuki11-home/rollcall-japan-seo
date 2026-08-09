# Phase 1 実装レポート — 2026-08-09

> 90_DAY_MONETIZATION_PLAN_20260809.md の Phase 1 最優先6施策を実装。分析ではなく実装だが、**git commit / push / deploy はしていない**。既存記事の削除・URL変更・canonical変更・デザイン改変なし。

## 1. 変更したファイル

**新規（3記事）**
- `src/content/articles/mimamori-camera-hikaku.mdx`（見守りカメラ比較）
- `src/content/articles/bousai-set-hikaku.mdx`（防災セット比較）
- `src/content/articles/family-trust-cost-flow.md`（家族信託の費用と流れ／money page）

**更新（記事7・データ1）**
- `src/content/articles/mimamori-app-osusume-hikaku-2026.md`（pillar強化）
- `src/content/articles/oya-phishing-taisaku.md`（強化）
- `src/content/articles/mimamori-service-erabikata.md`（pillarへ内部リンク追加）
- `src/content/articles/mimamori-camera-erabu-mae-ni.md`（新カメラ比較へ内部リンク）
- `src/content/articles/bousai-goods-oya-checklist.md`（新防災比較へ内部リンク）
- `src/content/articles/dementia-asset-management-family-trust.mdx`（家族信託費用へ内部リンク）
- `src/data/valueCommerceAds.ts`（VC yahoo-shopping の placementArticles に新2記事slugを追加。既存設定は不変）

**成果物**
- `SEO/PHASE1_IMPLEMENTATION_REPORT_20260809.md`（本ファイル）

## 2. 新規記事

| slug | タイトル | カテゴリ | 収益導線 | IQ121導線 |
|---|---|---|---|---|
| mimamori-camera-hikaku | 高齢の親向け見守りカメラの選び方とタイプ別比較【2026】 | app-guide | Amazon検索リンク×2＋Yahoo(VC承認済) | Roll Call(/app)・pillar |
| bousai-set-hikaku | 高齢の親・実家向け防災セットの選び方と中身の比較【2026】 | disaster | Amazon検索リンク×2＋Yahoo(VC承認済) | ― |
| family-trust-cost-flow | 家族信託の費用と手続きの流れ｜相談前に知っておきたい基礎 | important-info | **広告なし**（ASP未提携。専門家相談導線のみ） | ― |

- Amazon導線は**タグ付き検索リンク**（`?tag=oyamimamori-22`）。**特定ASINの捏造・虚偽レビューはしていない**。本文は「選び方・タイプ別・仕様比較」中心で「使ってみた／愛用」等の体験表現なし。
- 楽天は**未導入のため記載せず**（フェイクリンクを作らない）。導入時に追加可能。
- 家族信託記事は YMYL のため**断定を避け**、全体を「一般情報＋専門家（司法書士・弁護士・税理士）へ相談」の構造に。**おやとこ（提携解除ended）は表示していない**（dist検査 0件）。

## 3. リライト内容

**mimamori-app-osusume-hikaku-2026（pillar）**
- title/descを「見守りアプリ おすすめ」に即答する形へ最適化、`updatedDate: 2026-08-09`
- 追加節：「無料と有料、どちらを選ぶ？」（比較表）／「目的別・見守りアプリのおすすめの選び分け」
- FAQ 3→5問（「おすすめはどれ？」「無料/有料の使い分け」を追加、frontmatter＋本文同期）
- Roll Callを「無料で始める選択肢」として自然に維持
- 本文大幅加筆（表・比較含む・空白除き約9,000字規模）

**oya-phishing-taisaku（34位前後）**
- 追加節：「家族ができる設定サポート」（迷惑メッセージフィルタ・迷惑電話対策・公式ストア限定・OS更新・家族の関与＝被害時の初動は既存節「もし押してしまったら」を維持）
- FAQ +1（「家族としてまず何を設定？」frontmatter＋本文同期）→ 計5問
- family-security関連への内部リンク強化（smartphone-lost / kazoku-shashin-sns-anzen / kazoku-password-kanri）
- 相談窓口（消費者ホットライン188・警察相談#9110）は既存記載を維持。統計・被害件数の新規追加はしていない（一次情報未確認のため）

## 4. 内部リンク変更

- **見守りアプリpillar集約**：5記事（erabikata / service-chigai / service-erabikata / muryou-anpi / anpi-kakunin-app-towa）→ pillar。今回 service-erabikata に新規追加、他4は既存リンクを確認。pillar→各記事の下向きリンクも維持。各記事は**統合・削除していない**（検索意図は分離のまま）。
- **カメラ比較**：mimamori-camera-erabu-mae-ni → mimamori-camera-hikaku（新規）。逆方向も新記事内に設定。
- **防災比較**：bousai-goods-oya-checklist → bousai-set-hikaku（新規）。新記事から parents-house-disaster-supplies-checklist / bousai-goods / emergency-food 等へ。
- **家族信託**：dementia-asset ⇄ family-trust-cost-flow を双方向に設定。
- dist検査：新3記事への被リンク camera=6 / bousai=3 / family-trust=4。参照先はすべて実在（リンク切れ0）。

## 5. affiliate変更

- 新設Amazonリンクに既存スキーマの `data-affiliate-network / -ad-id / -advertiser / -placement / -link-type / data-article-slug` を付与＝**既存 affiliate_click 計測を踏襲**（新イベント名の乱造なし）。`rel="sponsored nofollow noopener"`・`target="_blank"`・PR/広告表記あり。
- YahooはVC承認済み `yahoo-shopping` を `AffiliateInlineAd`（データ駆動・計測内蔵）で表示。placementArticlesに新2slug追加。paused/ended案件（日本旅行・おやとこ）は非表示のまま。
- 家族信託記事は該当ASP未提携のため**広告リンクなし**（空枠・PRのみ残存なし）。
- 既存の A8/VC/Amazon 広告は無変更。

## 6. 計測確認

- `affiliate_click` リスナ（BaseLayout）健在、新記事にも出力を確認。
- `app_store_click` / `google_play_click` / `iq121_*_click` / `app_page_cta_click` は無変更で維持。
- 新記事のRoll Call導線（/app）・pillarのRoll Call紹介は既存CTA方式を踏襲。
- 独自イベント名は追加していない。

## 7. build結果

- `npm run build`（`PUBLIC_ENABLE_VALUECOMMERCE_ADS=true`）**成功・119ページ**（+3記事）。エラーなし。
- title重複0 / description重複0 / canonical新3記事OK / FAQ・Article・BreadcrumbList JSON-LD 新3記事すべて出力。
- 禁止表現（No.1・必ず節税・絶対に安全・唯一の解決・使ってみた・愛用）：**0件**。
- IQ121WF：dist **0件**。`PUBLIC_ENABLE_VALUECOMMERCE_ADS` 文字列：dist 0件。
- ビルドキャッシュ（`node_modules/.astro`）を削除してからビルド（停止広告の焼き付き防止）。

## 8. 未解決事項

1. **本番未反映**：全変更は未コミット。デプロイしないと効果は出ない。
2. **家族信託ASPが未提携**：family-trust-cost-flow は現在広告なし。相続・家族信託系のリード案件（無料相談）をA8等で提携できれば money page として収益化可能（要ASP探索・承認）。
3. **楽天アフィリエイト未導入**：Amazon/Yahooのみ。楽天を使うなら楽天アフィリのID設定と設計が必要。
4. **Amazonは検索リンク方式**：特定商品のSiteStripe個別リンク（既存3記事の方式）に差し替える場合は、オーナーがSiteStripeで生成した実リンクが必要（捏造不可）。
5. **家族信託記事のhero画像**：seizenseiri-family-info.webp を流用。専用画像は未生成。
6. **効果測定**：GSC/GA4での順位・affiliate_click・outboundは公開後に測定（現時点は未計測）。

## 9. デプロイ前チェックリスト

- [ ] `npm run build` が成功する（確認済：119ページ）
- [ ] 新3記事が `/articles/<slug>/` で表示される（確認済）
- [ ] title/description 重複なし（確認済：0）
- [ ] canonical・Article/Breadcrumb/FAQ JSON-LD 正常（確認済）
- [ ] アフィリンクに `rel="sponsored nofollow noopener"` と PR表記（確認済）
- [ ] おやとこ（ended）・日本旅行（paused）が表示されていない（確認済：0）
- [ ] 内部リンク切れなし（確認済）
- [ ] IQ121WF・env値が dist に出ていない（確認済：0）
- [ ] 実ブラウザでモバイル表示・広告カードのレイアウト崩れがないか（**手動確認推奨**）
- [ ] GA4 DebugView で新記事の `affiliate_click` が発火するか（**公開後に手動確認**）
- [ ] Amazon検索リンクの遷移先が意図どおりか（**手動確認推奨**）
