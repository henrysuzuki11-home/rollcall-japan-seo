# 親みまもり研究所 現状SSOT

> 目的：本ドキュメントをChatGPTに渡し、今後のSEO・アフィリエイト・収益化・コンテンツ戦略を設計するための「現状把握」資料。
> 調査日：2026-08-05 時点。実際のコード・設定・ファイル構成・SEO API実測に基づく（推測箇所は「不明」と明記）。
> サイト：https://www.oyamimamori.jp

---

## 1. サイト概要

| 項目 | 内容 |
|---|---|
| サイト名 | 親みまもり研究所 |
| ドメイン | www.oyamimamori.jp（独自ドメイン・CNAME設定あり） |
| 主目的 | 「離れて暮らす親の見守り・安否確認・防災・終活・家族の情報整理」の悩みに答えるSEOメディア。最終的にアプリ（Roll Call / IQ121）への送客と、関連アフィリエイトによる収益化 |
| 想定ターゲット | 30〜60代の子世代。高齢の親（実家・一人暮らし）を持ち、見守り・終活・相続・防災・帰省・贈り物などを検討している層 |
| ブランド構造 | 「親みまもり研究所」＝メディア。「IQ121 Japan」＝プロダクト事業。両者は同一運営 |
| CMS | なし（Gitベース・静的サイト） |
| 記事総数 | **92本**（Markdown 88 / MDX 4） |
| 公開ページ総数 | 115ページ |

**主要カテゴリー（10・記事数）**
| slug | 名称 | 記事数 |
|---|---|---|
| important-info | 重要情報の共有 | 17 |
| family-communication | 離れて暮らす家族 | 17 |
| disaster | 防災と緊急連絡 | 10 |
| family-record | 家族の記録 | 10 |
| app-guide | 見守りアプリ活用 | 10 |
| oya-recipe | 親のレシピ・家族の食卓 | 7 |
| family-security | 家族のセキュリティ | 6 |
| elderly-care | 高齢者の見守り | 6 |
| safety-check | 安否確認 | 5 |
| oyako-anshin | 親子の安心確認 | 4 |

---

## 2. 技術構成

| 項目 | 内容 |
|---|---|
| フレームワーク | **Astro**（依存：`astro`, `@astrojs/mdx`, `@astrojs/rss`, `@astrojs/sitemap`） |
| レンダリング | **SSG（完全静的生成）**。`output` 指定なし＝静的。CSR/SSRなし |
| コンテンツ管理 | Astro Content Collections（`src/content/articles/*.md` / `.mdx`）。Zodスキーマで型定義 |
| ホスティング | **GitHub Pages**（GitHub Actions `deploy.yml` で `npm run build` → `dist/` を Pages へデプロイ） |
| ビルド出力先 | `dist/` |
| 環境変数 | `PUBLIC_ENABLE_VALUECOMMERCE_ADS`（本番ビルドで `true`）。※値・秘匿情報は非公開 |
| 主要ディレクトリ | `src/pages`（ルート）, `src/content/articles`（記事）, `src/components`（30+）, `src/data`（広告データ）, `src/layouts`, `public`（画像・robots・CNAME）, `SEO/`（API計測・週次レポート）, `Ops/`（運用メモ）, `SNS/`（X投稿素材）, `video-agent/`（別プロジェクト・ショート動画生成） |

**主要ページ**：`/`, `/articles/`, `/articles/[slug]`, `/categories/`, `/categories/[category]`, `/app`, `/iq121-japan/`（+ early-adopter / campaign-code / investor）, `/about`, `/contact`, `/privacy`, `/terms`, `/disclaimer`, `/404`, `/rss.xml`

**主要コンポーネント（抜粋）**：ArticleCard, RelatedArticles, PopularArticles, Breadcrumbs, ArticleSidebar, ArticleSearch, AppCta, IQ121AppCTA, DownloadButtons, StructuredData, BaseHead, ContactForm, EarlyAdopterForm, 各種アフィリエイト（AffiliateInlineAd, ValueCommerceAd/Grid, A8SeasonalAffiliateCard/Grid, AffiliateServiceCard/Grid/Sidebar, AffiliateProductBlock, SeasonalArticleAdBlock, AffiliateDisclosure）, 広告枠（AdSlot, DisplayAd, SidebarAd）

---

## 3. ページ・記事構成

- **URL構造**：`/articles/<slug>`（フラット・カテゴリをURLに含めない）。カテゴリは `/categories/<slug>`
- **内部リンク**：本文中の手動リンク＋`RelatedArticles`（同カテゴリ自動）＋`PopularArticles`。パンくず（Breadcrumbs）全記事あり
- **CTA配置**：記事下に `AppCta`（Roll Call）/ `IQ121AppCTA`（記事カテゴリで出し分け）。アフィリエイト記事は広告カードを本文中〜記事下に配置
- **フォーム導線**：`/contact`（問い合わせ）、`/iq121-japan/early-adopter`（先行案内）、`/iq121-japan/campaign-code`（コード申請）、`/iq121-japan/investor`（投資家/事業）。送信先は Google Apps Script（`GOOGLE_APPS_SCRIPT_URL`）

**本文ボリューム**：本文平均 約3,399字（Markdown記号込み・空白除く）。最長は家族信託記事（本文1万字超・比較表/チェックリスト含む）。多くは実テキスト1,000〜2,500字規模で、**「網羅性のある長文記事」は一部にとどまる**。

**収益化導線のある記事：33本**（下記5参照）。**IQ121/app/Roll Call 言及：23本**。**FAQ構造化データ設定：27本**。

> 全92記事の個別メタデータ（URL/タイトル/カテゴリ/日付/文字数/キーワード）は `src/content/articles/*` のfrontmatterから機械抽出可能。本SSOTでは代表集計を記載。

---

## 4. SEO現状

| 項目 | 状態 | 備考 |
|---|---|---|
| title | ✅ 全ページ出力・**重複0** | |
| meta description | ✅ 全ページ出力・**重複0** | |
| canonical | ✅ 全ページ出力 | |
| robots.txt | ✅ `User-agent:* / Allow:/` ＋ Sitemap宣言。**Googlebot-Newsブロックなし** | |
| XML sitemap | ✅ `sitemap-index.xml` + `sitemap-0.xml`（**115 URL**）@astrojs/sitemap自動生成 | |
| OGP | ✅ og:title/description/image/type等 出力 | デフォルト画像 `og-default.svg` / `og-image.png` / `og-app.png` |
| Twitter Card | ✅ 出力あり | |
| JSON-LD | ✅ WebSite / Organization / Article(92) / BreadcrumbList(92) / FAQPage(27) | **NewsArticleは不使用（意図的）** |
| noindex | ✅ **404のみ**（事故なし） | |
| hreflang | なし | 単一言語（ja）のため不要 |
| 画像alt | ✅ hero 92記事に alt（装飾は空alt） | |
| heading構造 | ✅ H1一意＋H2/H3構造 | |
| Core Web Vitals | 良好見込み。**外部広告script 0件**（AdMax停止済）。hero画像 webp・平均62KB・width/height明示 | PageSpeed実測：大きな問題なし |
| Google News sitemap | **未実装（意図的）**。時事ニュース記事が存在しないため | |

**GSC実測（直近28日 / 2026-08-05）**
- impressions **235** / clicks **21** / CTR **8.94%** / 平均掲載順位 **15.0**（4週で25→15位に改善）
- 主要クエリ：`iq121` 5.9位(7imp/0click)、`iq121とは` 8.6位(5imp/0click)、`親 フィッシング` 35.9位(11imp)、`親 スマホ スパム 危険` 29.8位(4imp)、`見守り おすすめアプリ` 86位(15imp)、`親 認知症 財産管理` 20位(1imp)
- **課題**：クリックの大半（21中20）がトップページ。**個別記事の検索クリックがほぼ発生していない**。指名検索（iq121）は上位表示だがクリック0＝スニペット未最適化（別途 `/iq121-japan/` のtitle/H1改善を実施済み・未デプロイの可能性）

---

## 5. アフィリエイト現状

| ASP/広告 | 状態 | 詳細 |
|---|---|---|
| **A8.net** | **導入済み** | データ：整理系5件（`affiliateServices.ts`）＋季節・ギフト・旅行23件（`a8SeasonalAffiliateServices.ts`）＋サービス系1件（`a8ServiceAds.ts`）。うち家族信託「おやとこ」は**提携解除でended**（コード削除済） |
| **ValueCommerce** | **導入済み** | データ：11件（`valueCommerceAds.ts`）。**本番ビルドでのみ表示**（環境変数ゲート）。うち**日本旅行(nta-travel)はpaused**（広告主システム都合・2026-07-22停止） |
| **Amazonアソシエイト** | **一部導入** | タグ `oyamimamori-22`。**本文直リンクは3記事のみ**（jikka-mobile-battery-bichiku / mimamori-camera-erabu-mae-ni / bousai-goods-oya-checklist）。`affiliateProducts.ts` にサンプル6件あるが**frontmatter経由の使用は0記事**＝ほぼ未活用 |
| **Yahoo!ショッピング** | 導入済み（**VC経由**） | ValueCommerceの `yahoo-shopping` として季節記事に配置 |
| **楽天アフィリエイト** | **未確認（未導入）** | コード上に楽天の痕跡なし |
| **もしもアフィリエイト** | **未確認（未導入）** | |
| **Google AdSense** | **未導入** | `ADSENSE_CLIENT_ID` 空。AdSlotコンポーネントは空なら非表示 |
| **忍者AdMax** | **停止済み** | タグ空・dist出力0件（2026-07-18停止） |
| その他 | — | affiliate_click計測は実装済み |

**収益化リンクが存在する記事（33本）**
実家整理・遺品整理系（A8整理）：antiques-parents-house, before-dispose-parents-house, care-home-house-cleanup, doll-ihin-seiri, hina-doll-cleanup, ihinseiri-family-check, jikka-jimai-first-steps, keep-or-dispose-parents-house, large-furniture-cleanup, parents-house-checklist, remote-parents-house-cleanup, seizenseiri-family-info
防災系（A8/Amazon/VC）：bousai-goods-oya-checklist, hitorigurashi-bousai-taisaku, homecoming-disaster-supplies, jikka-mobile-battery-bichiku, jishin-bousai-checklist, parents-house-disaster-supplies-checklist, parents-house-emergency-food
帰省・ギフト・旅行系（A8季節/VC）：family-outdoor-memory, furusato-tax-with-parents, homecoming-family-talk, homecoming-gift-for-parents, homecoming-local-food-family, obon-homecoming-parent-checklist, ochugen-parent-gift, oseibo-parent-gift, parent-golf-memory, parent-onsen-trip-memory, parent-overseas-trip-communication, practical-gifts-for-parents, wagashi-homecoming-family-time
見守り用品：mimamori-camera-erabu-mae-ni

**運用ルール（既存）**：1記事の主広告は原則1件（`article_after_checklist` 等で位置統一）。VC+A8合算で最大4カード。広告コードは記事直書きせずデータ化。PR表記必須・`rel="nofollow sponsored noopener"`・空枠非表示。

---

## 6. IQ121導線

**現在の主要導線（実装ベース）**
```
Google検索
  └→ 記事（/articles/<slug>）
       ├→ 関連記事（RelatedArticles・同カテゴリ）
       ├→ アフィリエイト広告（A8/VC/Amazon）→ 外部ECへ送客
       ├→ 記事下CTA
       │    ├→ Roll Call（/app）… 毎日の安否確認アプリ（iOS/Android）
       │    └→ IQ121AppCTA（重要情報/レシピ系記事）
       └→ /iq121-japan/（事業案内）
             ├→ /app（Roll Call）
             ├→ /iq121-japan/early-adopter（先行案内登録）
             ├→ /iq121-japan/campaign-code（コード申請）
             └→ /iq121-japan/investor（投資家・事業）
```

- **IQ121リンク箇所**：グローバルナビ（IQ121 Japan / アプリを見る）、記事下CTA（IQ121AppCTA・23記事が言及）、`/app`ページ、`/iq121-japan/`配下4ページ
- **ブランド関係**：親みまもり研究所＝メディア（集客）、IQ121 Japan＝プロダクト。Roll Call（公開中の安否確認アプリ）とIQ121（家族の記録・重要情報整理／今後拡張）を提供
- **CTA文言例**：「無料で見守りを始める」「App Store/Google Playで無料ダウンロード」「先行案内登録」。/app には追従型ダウンロードバーを実装済み
- **課題**：/app PVはあるがストアクリック0が継続。トップ→記事→/appの転換が弱い

---

## 7. アクセス解析・イベント

| ツール | 状態 |
|---|---|
| Google Analytics 4 | **導入済み**（`G-X4JJ4KQQG6`。gtag.js） |
| Google Search Console | **連携済み**（SEO API `SEO/scripts/` でGSC/GA4/PageSpeedを定期取得） |
| Google Tag Manager | **未導入** |
| Microsoft Clarity | **未導入** |
| Meta Pixel | **未導入** |
| Pinterest Tag | **未導入** |

**GA4カスタムイベント（コード上で確認）**
- `app_page_cta_click` / `app_store_click` / `google_play_click`（アプリ導線）
- `iq121_ios_click` / `iq121_android_click` / `iq121_early_adopter_click` / `iq121_campaign_code_click`（IQ121導線）
- `affiliate_click`（アフィリクリック計測。パラメータ：affiliate_network / affiliate_ad_id / advertiser_name / article_slug / placement / link_type / page_path）
- 委譲リスナ方式（`[data-ga]` / `[data-affiliate-network]`）。内部リンクは計測対象外・PII送信なし・二重送信防止あり

---

## 8. SNS

- **サイト内にSNSリンクなし**（Footer/Headerに X/Instagram/Pinterest/Facebook/YouTube/note いずれの導線も未設置）
- 別途 `SNS/` フォルダに **X（@oyamimamori_jp）** の投稿素材・戦略あり（サイトとは非連携）。フォロワー約24・投稿約140（2026-07時点の別調査）
- **Pinterest適性**：hero画像は **1200×675（16:9・横長）**。Pinterestは **2:3縦長（1000×1500推奨）** が有利なため、**現状の画像はPinterest流入には不向き**。OG画像（og-image.png等）は存在するがPinterest専用縦型は未整備

---

## 9. 技術的課題

| 項目 | 状態 |
|---|---|
| 重複title / description | **なし（0件）** |
| canonical不整合 | なし（全ページ出力） |
| sitemap漏れ | なし（115 URL＝ページ数と一致） |
| noindex事故 | なし（404のみ） |
| 外部広告script | **0件**（AdMax停止済・CWV良好） |
| 画像サイズ過大 | なし（hero webp平均62KB） |
| モバイル表示 | レスポンシブ実装・広告も横スクロール抑制 |
| broken link | **未確認**（機械クロール未実施。本文リンクは実在slugのみ使用を目視確認） |
| orphan page | なし見込み（全記事が一覧＋カテゴリ＋sitemapから到達可能） |
| JS/CSSエラー | **未確認**（実ブラウザ検証未実施） |
| ビルド安定性 | 通常数秒だが、環境依存でまれにビルドがI/O遅延でハングする事象を確認（`node_modules/.astro` キャッシュ削除時に顕著） |
| セキュリティ | 静的サイトで攻撃面小。フォームはGAS送信。秘匿情報（キャンペーンコード等）は公開ビルドに出力しない設計 |

---

## 10. コンテンツ課題

1. **記事は本数（92）はあるが個別の検索流入が弱い** — クリックの95%がトップページ。多くの記事が2ページ目以降で滞留
2. **記事の網羅性・文字数にばらつき** — 一部は1,000〜1,500字規模で、上位競合（介護/終活メディア）に対し情報量不足の記事がある
3. **収益化記事のクラスタが薄い** — 家族信託1本・相続1本・認知症2本など、単価の高いテーマの記事層が薄い
4. **Amazonアソシエイトがほぼ未活用** — タグはあるが3記事のみ。商品比較・レビュー型記事が不足
5. **見守りアプリ比較系のカニバリ懸念** — app-guide 10本の中で「見守りアプリ比較/おすすめ」が複数
6. **指名検索（iq121）の受け皿が弱い** — 上位表示なのにクリック0

---

## 11. 収益化機会

**強み**
- 「親・実家・見守り・終活・防災・帰省」という**購買/リード意図の強いテーマ群**を既にカバー
- A8/VCの提携が広く、広告基盤・計測（affiliate_click）・PR表記・空枠対策が整備済み
- 「広告が消えても記事が成立する」構造（広告依存が低い）＝E-E-A-T・ポリシー面で健全

**弱み**
- 流入が小さい（月間表示235）ため成果が確率的に発生しない
- Amazon/楽天の**物販アフィリが未活用**、高単価リード案件（保険・相続・介護・家族信託）の記事層が薄い

**収益化しやすい既存カテゴリー**：実家整理・遺品整理（A8・成果型）／防災（物販）／帰省・ギフト（VC・季節）
**購入につながりやすい既存記事**：bousai-goods-oya-checklist, jikka-jimai-first-steps, 各ギフト記事, mimamori-camera-erabu-mae-ni

**追加すべきカテゴリー/記事タイプ**
- **Amazon/楽天向け**：見守りカメラ・GPS・防災セット・シニアスマホ・介護用品の**比較/レビュー記事**（現状ほぼ空白）
- **ASP案件向け**：介護施設紹介、老人ホーム検索、相続相談、遺品整理業者比較、保険見直し
- **高単価リード向け**：家族信託（クラスタ拡充）、成年後見、相続手続き、生前整理業者、シニア向け保険
- **IQ121送客記事**：重要情報の整理・家族の記録・エンディングノート系（既存資産と親和性が高い）

---

## 12. P0/P1/P2

### P0（今すぐ・数日）
| 施策 | 内容 | 期待効果 | 工数 | 収益影響 |
|---|---|---|---|---|
| 指名検索の受け皿改善 | `/iq121-japan/` のtitle/H1/descを「IQ121とは」に即答する形へ（実施済・**要デプロイ**） | 5〜8位表示のクリック0→転換 | 小 | 中（アプリ送客） |
| 未反映変更のデプロイ | フィッシング強化・家族信託被リンク・iq121最適化など複数の未コミット変更を反映 | 実施済み施策の効果発現 | 小 | 中 |
| /app CTAクリック0の是正 | 追従CTA導入済みだが効果未発現。文言・配置の再検証 | アプリDL増 | 小〜中 | 中 |

### P1（30日以内）
| 施策 | 内容 | 期待効果 | 工数 | 収益影響 |
|---|---|---|---|---|
| 高単価クラスタ拡充 | 家族信託・成年後見・相続・生前整理業者の記事を各2〜3本追加＋相互リンク | 高単価リード獲得 | 中 | 高 |
| Amazon/楽天 物販記事 | 見守りカメラ/GPS/防災/シニアスマホの比較記事を5〜10本、`affiliateProducts` を実運用 | 物販収益の基盤 | 中 | 中〜高 |
| フィッシング/防犯クラスタ | 「親 フィッシング/スマホ防犯」（改善で35位まで上昇）を1ページ目へ。関連記事追加 | 検索流入増 | 小〜中 | 低〜中 |
| 短い記事の加筆 | 1,500字未満の記事を検索意図に沿って2,500字＋へ増補、FAQ追加 | 順位・滞在向上 | 中 | 中 |

### P2（3か月以内）
| 施策 | 内容 | 期待効果 | 工数 | 収益影響 |
|---|---|---|---|---|
| Pinterest流入 | 縦型2:3画像（1000×1500）を主要記事に整備＋Pinterest運用 | 新規流入チャネル | 中 | 中 |
| 見守り比較のカニバリ整理 | app-guideの比較記事を正規化・内部リンク集約 | 順位集約 | 中 | 中 |
| ASP案件の拡張 | 介護/相続/保険系ASPの新規提携と記事化 | 収益源の多様化 | 中〜大 | 高 |
| 計測強化 | GTM/Clarity導入でヒートマップ・回遊分析 | CRO改善の土台 | 中 | 中 |

---

## 13. ChatGPTに伝えるべき重要事項

1. **技術**：Astro製の**静的サイト（SSG）**＋GitHub Pages。CMSなし。記事はMarkdown/MDXのContent Collections。SEO実装（title/desc/canonical/OGP/JSON-LD/sitemap/robots）は**技術的には既に高品質**（重複0・構造化データ完備）。
2. **規模**：**92記事・10カテゴリ**。テーマは「離れて暮らす親の見守り・安否確認・防災・終活・実家整理・帰省・贈り物・家族の情報整理」。
3. **最大の課題はSEO技術ではなく“集客と収益化の規模”**：月間表示235・クリック21で、**流入の95%がトップページ**。個別記事が検索クリックを取れていない。まず**流入を増やす**ことが全ての律速。
4. **アフィリエイト**：A8・ValueCommerceは導入済み・基盤も整備済み。**Amazon/楽天の物販と高単価リード（家族信託・相続・介護・保険）は未開拓**＝最大の収益伸びしろ。
5. **成果は現状ゼロ**（累計クリック30未満で「判断保留」フェーズ）。広告最適化より**記事の検索順位を上げる**ことが先。
6. **IQ121（自社アプリ）への送客**が事業上の重要導線。指名検索「iq121」は上位表示だがクリック0＝受け皿改善の余地大。
7. **健全性**：広告依存が低く（広告が消えても記事が成立）、断定・誇大表現を避けるポリシー、PR表記・空枠対策・計測が整備済み。**ポリシー安全性は高い**。
8. **SNS/Pinterest**：サイトからのSNS導線なし。Pinterest向け縦型画像は未整備＝新規流入チャネルの余地。
9. **やってはいけない**：秘匿のキャンペーンコード（社内管理）を公開HTMLに出さない／NewsArticle schemaを付けない（ニュースメディアではない）／広告主との「提携」表現を使わない／統計・No.1を根拠なく載せない。
10. **次の一手（優先）**：①未反映変更のデプロイ ②高単価クラスタ（家族信託/相続/介護）とAmazon物販記事の拡充 ③指名検索と/app導線のCVR改善。

---

*本SSOTは調査・分析のみ。サイト本体（記事・データ・設定）への変更は行っていない。数値はSEO API実測（2026-08-05）とコード静的解析に基づく。未検証項目は「未確認」と明記した。*
