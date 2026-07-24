# 親みまもり研究所 SEO Report — 2026-07-24

> 内部管理用。数値は実測・実ファイル確認に基づく。取得できないものは「未確認」と明記。

---

## 1. Executive Summary

### 現在のSEO状態
- 公開記事：**92本**（全ページ116）。XMLサイトマップ収録 **115 URL**。
- 直近のSearch Console実測（2026-07-17取得）：表示375 / クリック72 / CTR19.2% / 平均掲載順位25.4位。
  ※本レポート作成時点で新規のGSC取得は行っていないため、これ以降の推移は**未確認**。
- テクニカルSEOは良好（canonical欠落0・title重複0・description欠落0・Article/Breadcrumb JSON-LD 92/92）。

### 今回の広告停止がSEOへ与える影響
- **ネガティブ影響はほぼ無いと判断**。理由：
  - 削除したのは広告ブロックのみで、**記事URL・title・H1・canonical・slugは一切変更していない**。
  - 家族信託記事は本文の解説量が広告に依存しておらず、広告削除後も構成（比較表・チェックリスト・FAQ・免責）が完結している。
  - 日本旅行は記事下グリッド内の1枠にすぎず、本文に固有CTA・キャンペーン記述が無かったため本文修正が不要だった。
- **ポジティブ要素**：家族信託記事から広告が消えたことで本文/広告比率が改善。AdMax停止（2026-07-18）と合わせ、記事の外部広告scriptは**dist内0件**になり、レイアウトシフト要因と表示ブロッキング要素が減少。

### 削除せず維持した記事
- `/articles/dementia-asset-management-family-trust/`（家族信託・一般解説として維持）
- `/articles/obon-homecoming-parent-checklist/`、`/articles/parent-onsen-trip-memory/`、`/articles/homecoming-family-talk/`（旅行・帰省記事、広告枠のみ縮小）

### 修正した重要ページ
| URL | 修正内容 |
|---|---|
| /articles/dementia-asset-management-family-trust/ | 広告ブロック・広告開示・広告CTA・import除去。中立的な締め文へ差し替え |
| 旅行3記事 | 本文修正なし（データ層で日本旅行枠のみ除外） |

### 最優先改善事項
1. **未インデックス2記事の解消**（Critical）— 下記7章参照
2. **家族信託・相続・認知症クラスタの薄さ**（High）— 家族信託1本・相続1本・認知症2本のみ
3. **/app CTAのクリック0継続**（High）— 実装済み・効果測定待ち

---

## 2. Technical SEO

| 項目 | 判定 | 根拠 |
|---|---|---|
| robots.txt | **PASS** | `public/robots.txt`：`User-agent: * / Allow: /` ＋ Sitemap宣言。Googlebot-Newsのブロックなし |
| XML sitemap | **PASS** | `dist/sitemap-index.xml` / `dist/sitemap-0.xml`（115 URL）。@astrojs/sitemapで自動生成 |
| Google News sitemap | **NOT CHECKED（未実装・意図的）** | 実装なし。理由は6章参照 |
| canonical | **PASS** | 記事92/92でcanonical出力、欠落0 |
| title | **PASS** | 全記事出力・重複0 |
| meta description | **PASS** | 欠落0 |
| H1 | **PASS** | ArticleLayoutで`<h1>`一意出力 |
| OGP | **PASS** | BaseHeadでog:title/description/image/type出力 |
| Article structured data | **PASS** | 92/92 |
| Breadcrumb structured data | **PASS** | 92/92 |
| FAQ structured data | **PASS** | 27記事（frontmatter `faq` 設定分のみ。全記事に付けるべきものではない） |
| noindex | **PASS** | `dist/404.html` のみ（意図どおり） |
| redirects | **NOT CHECKED** | リダイレクト設定なし。今回URL変更もないため不要 |
| broken links | **WARNING** | 記事内リンクは実在slugのみ使用と目視確認済みだが、全リンクの機械的クロール検証は**未実施** |
| orphan pages | **PASS** | 全記事が `/articles/` 一覧＋カテゴリ＋サイトマップから到達可能 |
| 404 | **PASS** | `dist/404.html` 存在・noindex |
| duplicate title | **PASS** | 0件 |
| duplicate description | **PASS** | 0件（機械チェック済み） |
| image alt | **PASS** | hero画像92/92でalt属性あり（装飾のため`alt=""`＝適切） |
| mobile usability | **PASS** | レスポンシブCSS。広告カードも横スクロールを出さない設計 |
| Core Web Vitals影響要素 | **PASS（改善）** | 外部広告script **dist内0件**（AdMax停止済み）。PageSpeed直近取得では大きな問題検出なし |
| 外部広告script | **PASS** | `adm.shinobi.jp` 0件。アフィリエイトは静的`<a>+<img>`のみ（document.write不使用） |
| layout shift | **PASS** | バナーに width/height 明示。300×250を拡大しない |
| lazy loading | **PASS** | 広告・hero以外の画像に`loading="lazy"` |
| JavaScript error | **NOT CHECKED** | 実ブラウザでのコンソール検証は未実施 |

---

## 3. Content SEO（テーマ別）

| テーマ | 記事数 | 主要URL | 検索意図 | 重複/カニバリ | 不足 | 内部リンク | 広告依存度 | 優先度 |
|---|---|---|---|---|---|---|---|---|
| 親の終活 | 4 | /articles/seizenseiri-family-info/ 他 | 情報収集 | なし | 手順・費用の実務記事 | 良好 | 低 | Medium |
| 親の見守り | 15 | /articles/hanarete-kurasu-oya-mimamori/ 他 | 比較・選び方 | **要注意**（見守りアプリ/サービス比較が複数） | — | 良好 | 低 | High |
| 認知症 | 2 | /articles/ninchisho-oya-mimamori/ | 症状・対応 | なし | 初期対応・受診の実務 | 普通 | **なし** | High |
| 家族信託 | 1 | /articles/dementia-asset-management-family-trust/ | 制度理解 | なし | 費用・手続きの流れ | 良好（5本へ発リンク） | **なし（今回0化）** | High |
| 成年後見 | 0（家族信託記事内で比較） | 同上 | 制度比較 | — | 単独記事 | — | なし | Medium |
| 相続 | 1 | /articles/inheritance-important-info-young-people/ | 準備 | なし | 手続き一覧 | 普通 | なし | High |
| 防災 | 7 | /articles/parents-house-disaster-supplies-checklist/ 他 | 準備・購入 | なし | — | 良好 | 中（VC 1枠） | Medium |
| 親への贈り物 | 4 | /articles/ochugen-parent-gift/ 他 | 購入 | 軽微 | — | 良好 | 中〜高 | Medium |
| 家族の食事 | 9 | /articles/family-recipe-photo-record/ 他 | 記録・レシピ | なし | — | 良好 | 低 | Low |
| 旅行 | 7 | /articles/parent-onsen-trip-memory/ 他 | 計画 | なし | — | 良好 | 中（**日本旅行停止で1枠減**） | Medium |
| エンディングノート | 終活クラスタに包含 | — | 書き方 | — | 単独記事 | — | なし | Medium |

---

## 4. 家族信託記事の評価（/articles/dementia-asset-management-family-trust/）

| 観点 | 評価 |
|---|---|
| 広告削除後も独自価値があるか | **あり**。制度比較表・2種のチェックリスト・6問FAQ・免責を自前で保持。広告文に依存した箇所は無かった |
| 法的表現が中立か | **中立**。「必ず凍結される」等の断定なし。「〜場合があります」で統一。FAQで俗説（口座は必ず凍結される）を明確に否定 |
| 成年後見・任意後見・遺言との比較 | **あり**（4制度×6項目の表）。成年後見を否定せず「役割が異なり併用もある」と明記 |
| 未確認の統計・No.1表記 | **なし**（0件確認）。「5人に1人」「1,000万人」等は不掲載 |
| 専門家相談の免責 | **あり**（導入直後＋締めの2箇所） |
| 内部リンク先 | 重要情報共有 / 生前整理 / 認知症サイン / 親子の情報共有 / 相続（実在5本） |
| 今後狙える検索クエリ | 親 認知症 資産管理／認知症 口座凍結／家族信託 メリット デメリット／家族信託 成年後見 違い／親 家族信託 |
| 広告なしでも維持する理由 | 検索需要が明確で、E-E-A-Tを損なう記述が無く、サイトの本線（親の情報整理・もしもの備え）と一致。広告収益が理由の記事ではない |

**判定：維持（noindex不要・削除不要）**

---

## 5. 旅行記事の評価

| 観点 | 評価 |
|---|---|
| 日本旅行広告削除後の状態 | 記事下グリッドから1枠が消えるのみ。**空枠・PRのみ残存なし**（実測：各記事VCカード1〜2件が正常表示） |
| 古いキャンペーン情報 | **なし**。本文に日本旅行固有の料金・キャンペーン・商品説明は元々不掲載（frontmatterのID指定のみ） |
| 広告依存記事の有無 | **なし**。3記事とも本文は「親と過ごす時間・会話・思い出」が主題で、広告が無くても成立 |
| 一般旅行記事として残せるか | **可能**（削除・noindex不要） |
| 高齢の親との旅行という独自性 | あり。「移動を短く」「体力に合わせた宿選び」など一般旅行メディアと差別化 |
| 内部リンク改善案 | 実在記事のみで以下が可能：親の薬・持病 →/articles/parents-house-emergency-food/、緊急連絡 →/articles/kazoku-group-renraku/、体調確認 →/articles/oya-anpi-kakunin-mainichi/。**今回は未実施**（広告停止対応と切り分けるため） |

**判定：3記事とも維持（削除・noindex検討の対象外）**

---

## 6. Google News適合状況

| 確認項目 | 状況 |
|---|---|
| News sitemap | **未実装**（意図的） |
| publication name / language | 未設定（News sitemap未実装のため） |
| 記事公開日 / 更新日 | Article JSON-LDに datePublished / dateModified 出力済み |
| 著者 | 「親みまもり研究所 編集部」を全記事に設定 |
| 編集責任・会社情報 | /about/ あり |
| 問い合わせ | /contact/ あり |
| プライバシーポリシー | /privacy/ あり |
| 広告開示 | 広告掲載記事にPR表記＋開示文。広告のない記事には表示しない（今回の家族信託記事で実施） |
| 記事URLの永続性 | 維持（今回URL変更なし） |
| 記事本文と広告の比率 | 良好。記事あたり主広告1件が基本。外部広告script 0件 |
| ニュース記事と一般コラムの区別 | **当サイトに時事ニュース記事は存在しない**（全てエバーグリーンの解説記事） |
| Article / NewsArticle schema | Article を使用。**NewsArticleは使用しない**（不正確な構造化データを避けるため） |
| 画像サイズ | hero 1200×675（16:9） |
| Googlebot-Newsのブロック | **ブロックなし**（robots.txtは全許可） |

### News sitemapを実装しない理由（記録）
1. Google Newsは2019年12月以降**申請不要**で、Publisher Centerは掲載申請の場ではない。登録しても掲載は保証されない。
2. Google Newsが対象とするのは**時事性のあるニュース記事**。当サイトは全てエバーグリーンのハウツー/解説記事であり、該当しない。
3. News sitemapは**直近48時間の記事**が対象。当サイトの更新頻度・記事性質では常に空か古い記事のみとなり、Search Consoleにエラーを出すだけ。
4. ハウツー記事に `NewsArticle` schema を付けるのは**不正確な構造化データ**でガイドライン違反リスク。
5. 今回の広告停止対応を理由に、家族信託記事・旅行記事をNews sitemapへ追加することは**しない**（指示どおり）。

→ **形だけのNews sitemapは作成しない。** 露出拡大は Google Discover 向け最適化（大きめOGP画像・E-E-A-T強化）のほうが当サイトに適合する。

---

## 7. 優先順位

### Critical
| 対象URL | 問題 | 推奨対応 | 期待効果 | 難易度 | 今回実施 | 未実施理由 |
|---|---|---|---|---|---|---|
| /articles/parents-house-disaster-supplies-checklist/<br>/articles/furusato-tax-with-parents/ | **未インデックス**（2026-07-19 URL Inspection実測：Discovered - currently not indexed） | 既にインデックス済み記事から内部リンク追加（7/19実施済み）。**未コミットのため本番未反映** | 検索流入の発生 | 低 | 対応済（未デプロイ） | デプロイは指示待ち |

### High
| 対象URL | 問題 | 推奨対応 | 期待効果 | 難易度 | 今回実施 | 未実施理由 |
|---|---|---|---|---|---|---|
| /articles/kourei-oya-communication/ | 76位。7/15改善が**7/3以降未クロール**で未反映 | トップからの導線追加（7/19実施済み・未デプロイ） | 再クロール→順位改善 | 低 | 対応済（未デプロイ） | 同上 |
| /app/ | PV75・ストアクリック0が継続 | 追従CTA実装済み。効果測定 | DL増 | 済 | 測定待ち | 28日窓に改修後の日が少ない |
| 家族信託/相続/認知症クラスタ | 記事が1〜2本と薄く、内部リンクの相互補完が弱い | 「成年後見の基本」「相続手続きの流れ」等を追加 | クラスタ強化 | 中 | 未実施 | 今回は広告停止対応に限定 |

### Medium
| 対象 | 問題 | 推奨対応 | 今回実施 |
|---|---|---|---|
| 見守り系15記事 | 比較記事の重複（カニバリ懸念） | 正規記事を決め内部リンクを集約 | 未実施（要分析） |
| 旅行3記事 | 日本旅行枠が消え広告1〜2件に減 | 自動差し替えはせず、関連性を確認してから検討 | 未実施（方針どおり） |

### Low
| 対象 | 問題 | 推奨対応 | 今回実施 |
|---|---|---|---|
| 全記事 | broken linkの機械検証未実施 | リンクチェッカー導入 | 未実施 |
| 全記事 | JSエラーの実機確認未実施 | ブラウザ検証 | 未実施 |

---

## 8. 今回の変更一覧

| 区分 | 内容 |
|---|---|
| おやとこ広告停止 | `src/data/a8ServiceAds.ts`：クリックURL・画像URL・計測ピクセルURL・programId・広告主名・表示文を**ソースから完全削除**。`isActive:false` / `approvalStatus:'ended'` / `endedAt:'2026-07-23'` / `reason:'advertiser_terminated'` を設定。型に `'paused'` と `endedAt` / `reason` を追加 |
| 日本旅行広告停止 | `src/data/valueCommerceAds.ts`：`VC_STATUS_OVERRIDES` を新設し `nta-travel` を `paused`（since 2026-07-22 / reason advertiser_system_pause）。型に `'paused'` を追加。**pid・URL・掲載記事設定は再開のため保持** |
| 修正記事 | `/articles/dementia-asset-management-family-trust/`：広告ブロック・広告開示・広告CTA・component import を除去し、中立的な締め文へ差し替え。**title/H1/canonical/slug/description は変更なし** |
| 削除した広告コード | おやとこのクリックURL・画像URL・計測ピクセル（src/dist ともに0件を実測確認） |
| SEOメタデータ修正 | **なし**（広告主名はもともとtitle/H1/description/OGP/JSON-LDに含まれていなかったため修正不要） |
| 内部リンク修正 | 家族信託記事の末尾は既存の関連記事5本を維持（実在確認済み）。旅行記事は本文変更なし |
| サイトマップ修正 | 変更不要。URL削除・変更がないため115 URLを維持 |
| Google News sitemap修正 | 未実装のまま（理由は6章）。今回の停止対応を理由とした追加は行わない |
| build結果 | `npm run build` **成功（116ページ）**。エラーなし |

### 実測検査結果
- おやとこ固有文字列（`s00000025525001` / `4B65SJ+4G5MIA+5GYA+5YZ75` / `260627923269` / `s00000025525001003000`）：**src=0 / dist=0**
- 日本旅行 pid `892656908`：**dist=0**
- 他のVC広告は生存（じゃらん892656918=3件、Yahoo892656912=5件、ふるさと本舗892656917=1件ほか）
- 防災グッズA8広告（`4B65SJ+22F7EA+5HQC+5YZ75`）：4記事で生存（誤削除なし）
- 空枠・PRのみ残存：**0件**
- `IQ121WF`：**src/public/dist すべて0件**
- 外部広告script（adm.shinobi.jp）：**0件**

> ※ Search Console / GA4 の最新データは本作業では再取得していないため、広告停止後の順位・流入変化は**未確認**。次回レポートで測定する。
