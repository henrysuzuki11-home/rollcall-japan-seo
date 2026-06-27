# Affiliate — 親みまもり研究所 アフィリエイト運用基盤

親みまもり研究所の信頼感を保ちながら、X・SEO記事・/app導線と連動して収益化を進めるための設計・下書き・管理表・開示ルールをまとめたフォルダです。
**本番記事の公開・修正は人間確認後**。スクリプトやAIは `Affiliate/` と `SEO/drafts/` にしか書き込みません（`src/`/`public/` は触りません）。

## 基本方針（最優先）
- 第一導線は **Roll Call /app（無料アプリDL）**。アフィリエイトはこれを邪魔しない。
- アフィリエイトは**記事内で自然に**。トップ・/app・Xの主導線には被せない。
- すべての該当コンテンツに **広告/PR/アフィリエイト開示**（`disclosures/disclosure_templates.md`）。
- **X に直接アフィリエイトリンクを連投しない**。共感投稿主軸→必要時に記事へ誘導。
- 不安を煽らない／医療・健康効果の断定をしない／怪しい健康食品・過度な防犯商材・根拠不明商品は扱わない。
- 見守りは監視ではなく**安心の確認**。見守りカメラ・GPSは「本人の同意」を必ず明記。
- **実アフィリエイトIDやsecret・ログイン情報は保存しない**（管理表はプレースホルダ運用）。

## フォルダ構成
```
Affiliate/
├── README.md
├── strategy/        方針（affiliate_strategy_initial.md ほか）
├── programs/        ASP/プログラムのメモ置き場
├── products/        カテゴリ方針・商品マップ（category_policy / product_map）
├── content-plans/   記事アイデア・記事案
├── disclosures/     開示テンプレート（disclosure_templates.md）
├── reports/         開示チェック・週次レビュー
└── links/           リンク管理表（example.csv / 実体は .csv）
```

## サブエージェント（`.claude/agents/`）
- `affiliate-strategist` — 方針設計（/app優先の競合回避）
- `affiliate-product-researcher` — カテゴリ・比較軸の整理（誇張・医療断定なし）
- `affiliate-content-planner` — 記事案づくり（SEO/Xと連携）
- `affiliate-disclosure-reviewer` — 開示表記の確認（read-only）
- `affiliate-link-manager` — リンク管理表（secret保存しない）
- `affiliate-safety-reviewer` — 不安煽り・医療断定・売り込み・ブランド毀損の検出/修正

## スラッシュコマンド（`.claude/commands/`）
| コマンド | 役割 | 出力 |
|---|---|---|
| `/affiliate-strategy` | 方針作成 | `Affiliate/strategy/affiliate_strategy_YYYY-MM-DD.md` |
| `/affiliate-content-plan` | 記事案20本 | `Affiliate/content-plans/affiliate_article_plan_YYYY-MM-DD.md` |
| `/affiliate-product-map` | カテゴリ別商品マップ(CSV) | `Affiliate/products/affiliate_product_map_YYYY-MM-DD.csv` |
| `/affiliate-disclosure-check` | 開示チェック | `Affiliate/reports/affiliate_disclosure_check_YYYY-MM-DD.md` |
| `/affiliate-draft-articles` | 下書き3本 | `SEO/drafts/`（本番公開しない） |
| `/affiliate-link-table` | リンク管理表 | `Affiliate/links/affiliate_link_table.csv` |
| `/affiliate-weekly-review` | 収益化導線レビュー | `Affiliate/reports/affiliate_weekly_review_YYYY-MM-DD.md` |

## はじめ方
1. `/affiliate-strategy` で方針を確定 → 2. `/affiliate-product-map` で比較軸 → 3. `/affiliate-content-plan` で記事案 →
4. `/affiliate-draft-articles` で `SEO/drafts/` に3本 → 5. `/affiliate-disclosure-check` ＋ safety-reviewer →
6. 人間が確認・実リンク付与・公開判断。

## やらないこと
- `src/`・`public/` の変更、本番記事の公開、実IDの勝手な挿入、secret保存、`git commit`。
