# 親みまもり研究所 — API-first SEO 運用基盤

GA4 Data API・Google Search Console API・PageSpeed Insights API を使って、
SEOデータの取得 → 分析 → 改善案 → 記事下書き までを半自動化する土台です。

- 対象サイト: https://www.oyamimamori.jp/
- **本番記事の公開・修正は必ず人間確認後**。スクリプトと AI は `SEO/` 配下にしか書き込みません（`src/`/`public/` は触りません）。
- 認証情報・APIキーは **Git管理しません**（`.gitignore` 済み）。

---

## 1. 初回セットアップ手順

```bash
cd "/Users/hidemichisuzuki/Desktop/IQ121 claude project"
python3 -m venv .venv
source .venv/bin/activate
pip install -r SEO/scripts/requirements.txt
cp SEO/config/seo_api_config.example.json SEO/config/seo_api_config.json
```

> 本リポジトリには記入済みの `SEO/config/seo_api_config.json` も同梱しています。
> 値を確認し、`pagespeed_api_key` と `credentials_path` だけ自分の環境に合わせてください。

`SEO/config/seo_api_config.json` で確認・入力する値:

| キー | 値 |
|---|---|
| `ga4_property_id` | `542398101`（**APIレポートはこれを使う**） |
| `ga4_measurement_id` | `G-X4JJ4KQQG6`（**タグ用ID。APIには使わない**） |
| `ga_account_id` | `398576929`（**APIレポートには使わない**・参考値） |
| `gsc_site_url` | `https://www.oyamimamori.jp/` |
| `credentials_path` | `SEO/config/google_credentials.json` |
| `pagespeed_api_key` | `REPLACE_WITH_PAGESPEED_API_KEY` → 実際のキーに |

---

## 2. Google Cloud で有効化するAPI

Google Cloud Console（APIとサービス → ライブラリ）で次を有効化:

- **Google Analytics Data API**（GA4 レポート）
- **Google Search Console API**（検索パフォーマンス・サイトマップ・URL Inspection）
- **PageSpeed Insights API**（速度・SEO・アクセシビリティ）

> URL Inspection は Google Search Console API に含まれます（個別APIではありません）。
> **Google Indexing API は有効化しません**（理由は最後のセクション）。

### 認証（サービスアカウント推奨）
1. Google Cloud でサービスアカウントを作成し、JSONキーをダウンロード。
2. その JSON を `SEO/config/google_credentials.json` に置く（**Gitに入れない**）。
3. サービスアカウントのメール（`xxx@xxx.iam.gserviceaccount.com`）を:
   - **GA4**: 管理 → プロパティのアクセス管理 → 「閲覧者」で追加。
   - **Search Console**: 設定 → ユーザーと権限 → 「フル」または「制限付き」で追加。

---

## 3. GA4 Property ID の確認方法

GA4 → 管理（歯車）→ プロパティ設定 → 「プロパティ ID」（数字9桁）= `542398101`。
※ `G-` で始まるのは Measurement ID（タグ用）で、API では使いません。

## 4. Search Console プロパティURLの確認方法

Search Console → プロパティ選択。URLプレフィックス型なら表記（例 `https://www.oyamimamori.jp/`）を
`gsc_site_url` に**完全一致**で入れます（`https`・`www`・末尾スラッシュまで一致）。
ドメインプロパティ型の場合は `sc-domain:oyamimamori.jp` 形式になります。

## 5. credentials JSON の置き場所

```
SEO/config/google_credentials.json   ← ここ（.gitignoreで保護済み）
```

## 6. PageSpeed API キーの設定

Google Cloud → 認証情報 → 「APIキー」を作成 → `pagespeed_api_key` に設定。
未設定（`REPLACE_WITH_PAGESPEED_API_KEY`）の場合、スクリプトはクラッシュせず
「APIキー未設定」と表示してスキップします。

## 7. 秘密情報を守る（.gitignore）

`.gitignore` に以下を登録済み。**絶対にコミットしない**:

```
SEO/config/google_credentials.json
SEO/config/*.secret.json
SEO/config/credentials.json
SEO/config/token.json
.env
.env.local
*.secret.json
```

---

## 8. ローカル実行方法

```bash
cd "/Users/hidemichisuzuki/Desktop/IQ121 claude project"
source .venv/bin/activate
python SEO/scripts/run_all_seo_api.py
```

実行順: GA4 → GSC → PageSpeed → URL Inspection → Sitemap送信 → 改善候補抽出 → 週次レポート。
1つ失敗しても他は継続します。生成物:

```
SEO/data/raw/        ga4_*.csv / gsc_*.csv / pagespeed_*.csv / url_inspection_*.csv / sitemap_status_*.csv
SEO/data/processed/  seo_opportunities_*.csv
SEO/reports/         seo_opportunities_*.md / weekly_seo_report_*.md
```

個別実行も可能（例: `python SEO/scripts/fetch_gsc_api.py`）。

---

## 9. Claude Code コマンドの使い方

| コマンド | 役割 |
|---|---|
| `/seo-api-setup` | 必要なAPI・認証・ID・キーのチェックリスト表示 |
| `/seo-api-run` | `run_all_seo_api.py` を実行し、エラーを切り分け |
| `/seo-api-report` | 最新の週次レポートを表示し、次の5手に要約 |
| `/seo-api-opportunities` | 改善候補CSVから、伸ばす記事・title改善・新規案を提示 |
| `/seo-draft-from-api` | APIデータから新規記事を**3本だけ** `SEO/drafts/` に下書き |

サブエージェント（`.claude/agents/`）:
`seo-data-analyst` / `seo-editor` / `article-writer` / `internal-linker` /
`technical-seo-auditor` / `seo-publisher-reviewer`。
（分析・監査・レビュー系は read-only。記事の本番反映は人間が行う。）

---

## 10. GitHub Actions 化の手順

ワークフロー: `.github/workflows/seo-api-weekly.yml`

1. 初期状態は **手動実行のみ**（`workflow_dispatch`）。`schedule:` はコメントアウト済み。
2. GitHub の **Settings → Secrets and variables → Actions** で次を登録:
   - `GOOGLE_CREDENTIALS_JSON`（サービスアカウントJSONの中身そのもの）
   - `PAGESPEED_API_KEY`
   - `GA4_PROPERTY_ID`（`542398101`）
   - `GSC_SITE_URL`（`https://www.oyamimamori.jp/`）
3. Actions タブから手動実行 → 成功を確認。
4. 問題なければ `schedule:` のコメントを外して週次自動化。

> ワークフローは `SEO/data` と `SEO/reports` を**アーティファクトとして出力するだけ**で、
> リポジトリへの commit や本番記事の変更は行いません。

---

## 11. よくあるエラー

| 表示 | 原因 | 対処 |
|---|---|---|
| `CREDENTIALS_MISSING` | 認証JSONが無い | `SEO/config/google_credentials.json` を配置 |
| `PERMISSION_DENIED` | サービスアカウント未追加 | GA4/GSC にアクセス権を付与 |
| `API_NOT_ENABLED` | API無効 | Google Cloud で該当APIを有効化 |
| `BAD_PROPERTY_ID` | Property ID違い | `ga4_property_id=542398101` を確認 |
| GSC `NOT_FOUND` | プロパティURL不一致 | `gsc_site_url` を Search Console 表記に完全一致 |
| PageSpeed「キー未設定」 | キー未入力 | `pagespeed_api_key` を設定 |
| `QUOTA_EXCEEDED` | クォータ超過 | 時間をおいて再実行 |
| データ0件 | 計測開始直後/期間にデータ無し | 期間を延ばす・数日待つ |

---

## 12. Indexing API を通常記事に使わない理由

Google **Indexing API は、求人情報（JobPosting）やライブ配信（BroadcastEvent）など
特定の構造化データを持つページ専用**です。通常のブログ・記事URLの登録に使うのは
Google のガイドライン違反であり、スパム扱い・ペナルティの恐れがあります。

通常記事のインデックスは:
- **サイトマップ送信**（`submit_sitemap_api.py`）
- **URL Inspection API での状態確認**（`fetch_url_inspection_api.py`／申請ではなく確認のみ）
- 良質なコンテンツと内部リンク

で進めます。本基盤は Indexing API を一切使いません。
