---
description: Show the API-first SEO setup checklist (APIs, credentials, IDs, keys)
---

親みまもり研究所のSEO API連携セットアップ状況を確認し、チェックリストを表示してください。

1. `SEO/config/seo_api_config.json` を読み、次を確認:
   - `ga4_property_id` が `542398101` か
   - `ga4_measurement_id` が `G-X4JJ4KQQG6` か（※これはタグ用。APIには使わない）
   - `gsc_site_url` が `https://www.oyamimamori.jp/` か
   - `credentials_path` の指すファイルが存在するか
   - `pagespeed_api_key` が `REPLACE_WITH_PAGESPEED_API_KEY` のままでないか
2. 次のチェックリストを「未/済」で提示:
   - [ ] Google Cloud で有効化: Google Analytics Data API / Google Search Console API / PageSpeed Insights API（URL Inspection は Search Console API に含む）
   - [ ] サービスアカウント作成、JSONを `SEO/config/google_credentials.json` に配置（Git管理しない）
   - [ ] そのサービスアカウントを GA4 プロパティの「閲覧者」に追加
   - [ ] そのサービスアカウントを Search Console プロパティの「ユーザー」に追加
   - [ ] PageSpeed API キーを発行し config に設定
   - [ ] `pip install -r SEO/scripts/requirements.txt`（.venv 推奨）
3. 秘密情報が `.gitignore` で保護されているか（`SEO/config/google_credentials.json` 等）を確認して報告。
4. まだ揃っていない項目があれば、READMEの該当手順（`SEO/README_API_FIRST.md`）を案内。

ファイルは変更しないこと（確認と表示のみ）。
