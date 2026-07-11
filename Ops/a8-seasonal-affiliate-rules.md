# A8 季節・帰省・ギフト・旅行アフィリエイト 管理ルール

最終更新：2026-07-11

データ：`src/data/a8SeasonalAffiliateServices.ts`（22件）
表示：`SeasonalArticleAdBlock` →`A8SeasonalAffiliateGrid` →`A8SeasonalAffiliateCard`
共通：`rel="nofollow sponsored noopener"` + `target="_blank"`（コンポーネント側で統一。A8元コードが `nofollow` のみでも `sponsored noopener` を付与）／各カードに **PR** 表記／成果計測ピクセル出力。

## 全体ルール

- 記事ごとの表示上限：**gift系 最大4枚 / travel系 最大3枚**。全記事には出さない。
- **eSIM は海外旅行・海外通信記事だけ**に表示。
- 低優先度（`ministop-online` / `ocean-princess-canned-gift` / `oooh-overseas-custom-trip` / `airtrip-overseas` / `jtrip-domestic`）は**必要時のみ**。
- SEOタイトル/H1/H2で**商標名・サービス名・会社名・商品名を狙わない**。公式サイトと誤認させない。
- 料金・在庫・配送・予約条件・キャンペーン・成果対象条件は**公式サイト確認**と明記。
- 人物画像NG／商品画像NG／画像加工NGの案件は A8提供バナー（imageUrl）のみ使用し、加工しない。
- **広告掲載URL提出が必要な案件**（下記★）は、公開後に掲載URLをA8管理画面から提出する。

### 広告掲載URL提出が必要な案件（★）
- `kogetsu-wagashi`（鼓月）
- `yamamotoyama-tea-nori`（山本山）
- `japan-global-esim`（JAPAN&GLOBAL eSIM）
- `tora-esim`（TORA eSIM）

→ 掲載記事URL（例）：
- 鼓月・山本山：`/articles/ochugen-parent-gift/`, `/articles/practical-gifts-for-parents/`, `/articles/homecoming-family-talk/`, `/articles/obon-homecoming-parent-checklist/`, `/articles/homecoming-disaster-supplies/`
- eSIM 2件：`/articles/parent-overseas-trip-communication/`

---

## 案件一覧（22件）

凡例：用途 / 成果条件 / 否認条件 / リスティングNG / 画像NG / URL提出 / 表示記事 / 非表示記事 / 優先度 / 備考

### 1. kogetsu-wagashi（鼓月オンラインストア）★
- programId: s00000021453001 ／ 購入10% ／ EPC 13.54 ／ 承認 88.09%
- 用途：お中元・お歳暮・お供え・帰省土産・手土産・親への贈り物
- 成果：購入 ／ 否認：—
- リスティングNG：社名・商品名・類似KW
- 画像：制限記載なし（提供バナー使用）
- URL提出：**必要**
- 表示：ochugen-parent-gift / homecoming-family-talk / obon-homecoming-parent-checklist ／ 非表示：旅行・防災中心記事
- 優先度：high
- 備考：広告表示必須

### 2. quattro-ebi-cheese（クアトロえびチーズ）
- programId: s00000019189002 ／ 新規購入1500円 ／ EPC 12.04 ／ 承認 100%
- 用途：帰省土産・お中元・お歳暮・母の日・父の日・手土産・家族で集まる時
- 成果：広告主**新規のみ** ／ 否認：既存顧客。複数個購入でも成果一律
- リスティングNG：社名・商標・「チーズえびせん」
- URL提出：不要
- 表示：homecoming-family-talk / ochugen-parent-gift / obon(補助) ／ 非表示：旅行記事
- 優先度：high
- 備考：広告表示必須

### 3. ocean-princess-canned-gift（オーシャンプリンセス）
- programId: s00000018008001 ／ 購入5% ／ EPC 0.11 ／ 承認 100%
- 用途：お中元・お歳暮・食品ギフト・防災備蓄・実家への手土産
- 成果：購入 ／ 否認：**カタログ請求フォームからの購入**
- リスティングNG：モンマルシェ・オーシャンプリンセス・野菜をMotto!!・ツナ
- URL提出：不要
- 表示：homecoming-disaster-supplies / practical-gifts-for-parents(補助) ／ 非表示：旅行記事
- 優先度：low（防災備蓄記事で補助的に）
- 備考：EPC低・出しすぎない

### 4. ministop-online（ミニストップオンライン）
- programId: s00000027162001 ／ 購入2% ／ EPC 0.95 ／ 承認 96.87%
- 用途：帰省時の食卓・家族で集まる時の軽食・孫との食事・季節商品
- 成果：購入 ／ 否認：**LINE経由注文**
- 画像NG：サイト内**人物画像NG**
- URL提出：不要
- 表示：現状なし（必要時のみ）／ 非表示：全記事デフォルト非表示
- 優先度：low
- 備考：**728x90横長バナー**（`isWideBanner`で縮小表示）。trackingPixel URLは元コード通りか要確認

### 5. yamamotoyama-tea-nori（山本山）★
- programId: s00000025951001 ／ 購入10% ／ EPC 5.64 ／ 承認 91.66%
- 用途：お中元・お歳暮・親への贈り物・実家への手土産・敬老の日・落ち着いた食ギフト
- 成果：購入 ／ 否認：**LINE経由購入**
- リスティングNG：社名・サービス名・表記ゆれ ／ 画像NG：**人物画像NG**
- URL提出：**必要**
- 表示：practical-gifts-for-parents / obon / homecoming-family-talk / ochugen / homecoming-disaster-supplies(補助) ／ 非表示：—
- 優先度：high
- 備考：広告表示必須

### 6. shimanohito-seafood-gift（島の人）
- programId: s00000022624001 ／ 購入7.5% ／ EPC 1.3 ／ 承認 40.81%
- 用途：お歳暮・お中元・海鮮ギフト・おせち・家族で集まる食事
- 成果：購入 ／ 否認：—
- リスティングNG：島の人・礼文島
- URL提出：不要
- 表示：ギフト記事（必要時）／ 非表示：旅行・防災記事
- 優先度：medium
- 備考：予約商品は発送まで日数がかかる場合あり（承認率低め）

### 7. yonezawagyu-gift（米沢牛）
- programId: s00000009859002 ／ 購入10% ／ EPC 4.29 ／ 承認 88.23%
- 用途：親への食ギフト・家族で集まる食事・お中元・お歳暮・敬老の日
- 成果：購入 ／ 否認：—
- リスティングNG：記載なし（社名・商標は避ける）
- URL提出：不要
- 表示：ギフト記事（必要時）／ 非表示：旅行記事
- 優先度：high
- 備考：商品情報・配送条件は公式サイト確認

### 8. gelabo-gelato（GELABO）
- programId: s00000023513001 ／ 購入10% ／ EPC 0.77 ／ 承認 100%
- 用途：夏ギフト・孫と祖父母・家族で集まる日・スイーツギフト
- 成果：購入 ／ 否認：—
- リスティングNG：商標・社名・サイト名・商品名・人物名・表記ゆれ
- URL提出：不要
- 表示：夏ギフト記事（必要時）／ 非表示：旅行・防災記事
- 優先度：medium

### 9. shaddy-gift（シャディギフトモール）
- programId: s00000020428001 ／ 購入5% ／ EPC 0.93 ／ 承認 64.7%
- 用途：お中元・お歳暮・内祝い・香典返し・親族への贈り物
- 成果：購入 ／ 否認：**代金引換払い注文など一部**
- リスティングNG：商標KW
- URL提出：不要
- 表示：practical-gifts-for-parents ／ 非表示：旅行記事
- 優先度：medium

### 10. mameil-macaron（MAMEIL）
- programId: s00000023513002 ／ 購入15% ／ EPC 0.99 ／ 承認 97.5%
- 用途：手土産・高級スイーツギフト・母の日・家族で集まる日
- 成果：購入 ／ 否認：—
- リスティングNG：商標・社名・サイト名・商品名・人物名・表記ゆれ
- URL提出：不要
- 表示：ギフト記事（必要時）／ 非表示：旅行記事
- 優先度：medium

### 11. true-towel（TRUE TOWEL）
- programId: s00000020579001 ／ 購入10% ／ EPC 3.34 ／ 承認 100%
- 用途：親への実用ギフト・内祝い・敬老の日・日用品ギフト
- 成果：購入 ／ 否認：—
- リスティングNG：商標・社名
- URL提出：不要
- 表示：practical-gifts-for-parents ／ 非表示：旅行・防災記事
- 優先度：high

### 12. shimamoto-mentaiko（島本 明太子）
- programId: s00000013581001 ／ 購入8% ／ EPC 11.96 ／ 承認 96.96%
- 用途：お中元・お歳暮・実家への手土産・食品ギフト
- 成果：購入 ／ 否認：—
- リスティングNG：しまもと・島本等 社名・商標
- URL提出：不要
- 表示：ochugen-parent-gift / homecoming-family-talk(補助) / obon(補助)／ 非表示：旅行記事
- 優先度：high

### 13. jtrip-domestic（J-TRIP）
- programId: s00000018767001 ／ 成約1000円 ／ EPC 0.17 ／ 承認 36%
- 用途：親との国内旅行・帰省旅行・沖縄・北海道
- 成果：成約 ／ 否認：**飛行機を利用しないプラン**
- 画像NG：**芸能人画像の商品リンク使用NG** ／ リスティングNG：商標KW
- URL提出：不要
- 表示：旅行記事（必要時のみ）／ 非表示：ギフト・防災記事
- 優先度：low（承認率低）

### 14. oooh-overseas-custom-trip（Oooh）
- programId: s00000026491001 ／ チャット開始750円 ／ EPC 0.19 ／ 承認 100%
- 用途：海外家族旅行・親との特別な旅・旅行相談
- 成果：**旅行会社アサイン後のチャット開始** ／ 否認：—
- リスティングNG：商標・商品名関連ワード
- URL提出：不要
- 表示：parent-overseas-trip-communication(補助・上限内優先度低)／ 非表示：国内・ギフト記事
- 優先度：low

### 15. saily-esim（Saily）
- programId: s00000026058001 ／ 新規購入10% ／ EPC — ／ 承認 100%
- 用途：海外旅行・親との海外旅行・旅行中の連絡手段・eSIM
- 成果：新規購入 ／ 否認：**アプリ経由NG・1世帯2回以上NG**
- リスティングNG：あり（全般）
- URL提出：不要
- 表示：**海外旅行・海外通信記事のみ**（parent-overseas-trip-communication）／ 非表示：国内記事・ギフト記事
- 優先度：medium
- 備考：記事作成ボーナスは条件が厳しいため無理に狙わない。trackingPixel URLは元コード通りか要確認

### 16. airtrip-domestic-tour（エアトリ国内ツアー）
- programId: s00000001343015 ／ 予約2000円 ／ EPC 1.76 ／ 承認 41.17%
- 用途：親との国内旅行・沖縄・北海道・家族旅行
- 成果：予約（**国内ツアーJAL利用のみ**）／ 否認：**アプリ経由NG**
- リスティングNG：ブランドKW
- URL提出：不要
- 表示：parent-onsen-trip-memory ／ 非表示：ギフト・防災記事
- 優先度：medium

### 17. best-one-cruise（ベストワンクルーズ）
- programId: s00000013465001 ／ 成約2000円 ／ EPC 3.52 ／ 承認 46.37%
- 用途：夫婦旅行・シニア旅行・親との特別な旅行・家族の記念旅行
- 成果：成約 ／ 否認：**10万円以下予約NG・添乗員/航空券付ツアー・チャータークルーズNG**
- 集客NG：**ネガティブ記事での集客禁止** ／ リスティングNG：商標KW
- URL提出：不要
- 表示：parent-onsen-trip-memory(補助)／ 非表示：ギフト・防災記事
- 優先度：medium

### 18. airtrip-overseas（エアトリ海外）
- programId: s00000013798001 ／ 海外ホテル1%・海外航空券2% ／ EPC 0.03 ／ 承認 76.92%
- 用途：海外旅行・海外航空券・海外ホテル
- 成果：海外ホテル/航空券 ／ 否認：**国内領域・海外ツアー等 成果対象外あり**
- 画像NG：**広告素材以外の画像使用禁止** ／ リスティングNG：あり
- URL提出：不要
- 表示：海外旅行記事（必要時のみ）／ 非表示：国内・ギフト記事
- 優先度：low
- 備考：**728x90横長バナー**（縮小表示）

### 19. needs-tour-domestic（ニーズツアー）
- programId: s00000001343014 ／ 購入1000円・JAL利用2000円 ／ EPC 2.64 ／ 承認 54.16%
- 用途：親との国内旅行・沖縄・北海道・帰省旅行
- 成果：購入 ／ 否認：**アプリ経由NG・実在しないクーポン表現NG・期限切れ情報の掲載放置NG**
- リスティングNG：ブランドKW
- URL提出：不要
- 表示：obon-homecoming-parent-checklist / parent-onsen-trip-memory ／ 非表示：ギフト・防災記事
- 優先度：high

### 20. japan-global-esim（JAPAN&GLOBAL eSIM）★
- programId: s00000025659001 ／ 購入15% ／ EPC 0.72 ／ 承認 100%
- 用途：海外旅行・親との海外旅行・旅行中の連絡手段・eSIM
- 成果：購入 ／ 否認：—
- リスティングNG：商標・社名・表記ゆれKW
- URL提出：**必要**
- 表示：**parent-overseas-trip-communication のみ**（主）／ 非表示：国内・ギフト記事
- 優先度：medium
- 備考：広告表示必須

### 21. tora-esim（TORA eSIM）★
- programId: s00000026367001 ／ 購入15% ／ EPC 0.08 ／ 承認 100%
- 用途：海外旅行・親との海外旅行・旅行中の連絡手段・eSIM
- 成果：購入 ／ 否認：—
- 画像NG：**人物画像NG** ／ リスティングNG：社名・サービス名・表記ゆれKW
- URL提出：**必要**
- 表示：**parent-overseas-trip-communication のみ**（主）／ 非表示：国内・ギフト記事
- 優先度：medium
- 備考：広告表示必須

### 22. maikai-hawaii-tours（Maikai Hawaii Tours）
- programId: s00000023946003 ／ ツアー催行10% ／ EPC — ／ 承認 —
- 用途：ハワイ旅行・親との海外旅行・家族旅行・現地ツアー
- 成果：ツアー催行 ／ 否認：**無料見積り/問い合わせからの申込NG・催行不可による払い戻しNG**
- リスティングNG：マイカイ・Maikai・Maikai Hawaii Tours 等 商標・商品名関連
- URL提出：不要
- 表示：parent-overseas-trip-communication(補助・上限内優先度低)／ 非表示：国内・ギフト記事
- 優先度：medium

---

## 記事別 配置サマリー（現状）

| 記事 | kind | 表示広告（優先順・上限内） | 上限 |
|---|---|---|---|
| /articles/ochugen-parent-gift/ | gift | kogetsu-wagashi, quattro-ebi-cheese, yamamotoyama-tea-nori, shimamoto-mentaiko | 4 |
| /articles/practical-gifts-for-parents/ | gift | yamamotoyama-tea-nori, true-towel, shaddy-gift, ocean-princess-canned-gift | 4 |
| /articles/homecoming-family-talk/ | gift | quattro-ebi-cheese, kogetsu-wagashi, yamamotoyama-tea-nori | 3 |
| /articles/obon-homecoming-parent-checklist/ | travel | needs-tour-domestic, kogetsu-wagashi, yamamotoyama-tea-nori | 3 |
| /articles/homecoming-disaster-supplies/ | gift | ocean-princess-canned-gift, yamamotoyama-tea-nori | 2 |
| /articles/parent-onsen-trip-memory/ | travel | needs-tour-domestic, airtrip-domestic-tour, best-one-cruise | 3 |
| /articles/parent-overseas-trip-communication/ | esim | japan-global-esim, tora-esim, saily-esim (+maikai/oooh上限外) | 3 |
| /articles/parent-golf-memory/ | — | 広告なし（A8代替なし） | — |
| /articles/family-outdoor-memory/ | — | 広告なし（A8代替なし） | — |

※ ValueCommerce広告は審査中のため全記事で非表示（`src/data/valueCommerceAds.ts` の `VC_GLOBAL_ACTIVE=false`）。データは保持。

## 追加記事案（未作成・候補）
1. `/articles/homecoming-gift-for-parents/`（帰省の手土産）
2. `/articles/oseibo-parent-gift/`（お歳暮で親に贈るなら）
3. `/articles/parents-house-emergency-food/`（親の家の保存食・防災備蓄）
4. `/articles/wagashi-homecoming-family-time/`（和菓子を持って実家に帰る日）

（`/articles/parent-overseas-trip-communication/` は本対応で作成済み）
