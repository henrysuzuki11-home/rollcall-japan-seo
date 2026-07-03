# エージェント作業フロー — 2026-07-03

実行順：編集長 → SEO → （レシピ/セキュリティ記事・画像は並行） → Affiliate Research → Affiliate Compliance → Claude Code実装 → QA → SNS転用

## 編集長エージェント（seo-editor 相当）
- サイト全体方針（主役=IQ121、広告サイト化させない）
- 記事優先順位の決定（article_cluster_plan.md を正とする）
- カテゴリ設計・IQ121導線の管理
- アフィリエイト導線が強すぎないかの最終判断（1記事2〜4点・繊細記事は0も可）

## SEOエージェント（seo-data-analyst / seo-editor）
- GA4/GSCデータからキーワード設計・タイトル案
- 記事クラスター（ハブ&スポーク）と内部リンク指示
- 検索意図ごとの記事配置（情報収集/比較/行動）

## 画像エージェント（canva-visual-planner）
- image_generation_plan.md の維持（必要画像リスト・プロンプト・alt・OGP）
- 実写（recipes/）と生成画像の使い分け：食卓=実写、抽象概念=生成
- 禁止：恐怖演出・仮想通貨イメージ・AI顔崩れ・実在ロゴ

## レシピ記事エージェント（article-writer）
- recipe_article_expansion_plan.md の順に執筆（SEO/drafts → 人間確認 → 公開）
- 必ず「家族の記録・会話・安心確認・IQ121共有」へ接続。料理ブログ化禁止
- 分量記載時は再現メモの但し書きを必須

## セキュリティ記事エージェント（article-writer + 検収強化）
- 対象：家族向けセキュリティ講座・重要情報共有・スマホ紛失・MFA/AES-256/Ethereum改ざん検知・運営者も直接見られない設計
- 表現規則：保証表現禁止（絶対安全/100%/漏洩しない/完全に守る）。「設計です」「目指しています」を使う
- Ethereumは「記録の信頼性を高める技術」とし、個人情報をチェーンに保存すると誤読させない

## Affiliate Research Agent（affiliate-product-researcher）
- amazon_candidate_products.md / a8_candidate_programs.md の候補整理（カテゴリ別）
- 記事ごとの自然な商材提案（article_affiliate_mapping.md へ）
- A8は unchecked/applied/approved/rejected/published を必ず区別
- 価格・在庫・レビュー点数は固定表示しない方針を守る

## Affiliate Compliance Agent（affiliate-disclosure-reviewer / affiliate-safety-reviewer）
- 開示表記（PR/広告）の有無確認（affiliate_disclosure_policy.md 準拠）
- 薬機法・医療効果・法律/税務/金融助言に見える表現の検出
- 災害・相続・高齢者記事での不安煽り導線の検出
- IQ121 CTAとアフィリエイトCTAの競合チェック（カニバリ防止ルール準拠）

## Claude Code実装エージェント
- Astro実装・画像配置・記事追加・検索/関連記事/CTA反映
- **status=approved/published のみ実装**（candidateは getDisplayableProducts が自動排除）
- npm run build 確認・**git commitしない**

## QAエージェント（technical-seo-auditor + 表現チェック）
- build成功・内部リンク切れ0・canonical/OGP=oyamimamori.jp
- 禁止表現グレップ（保証表現・投資勧誘・社名・恐怖訴求）
- アフィリエイト表記確認・rel属性確認
- /app・/iq121-japan/early-adopter・/iq121-japan/investor に広告/AF が無いこと

## SNS転用エージェント（x-buzz-strategist / honne-post-writer）
- sns_repurpose_plan.md に従い、X/Instagram用に記事を転用
- 商品売り込み禁止・記事導線優先・キャンペーンコードをSNSに書かない
