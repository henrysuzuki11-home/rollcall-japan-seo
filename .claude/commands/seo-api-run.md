---
description: Run the full SEO API pipeline and triage any errors
allowed-tools: Bash(python3:*), Read, Grep, Glob
---

親みまもり研究所のSEOデータ取得パイプラインを実行してください。

1. プロジェクトルート `/Users/hidemichisuzuki/Desktop/IQ121 claude project` で次を実行:
   ```
   python3 SEO/scripts/run_all_seo_api.py
   ```
   （`.venv` がある場合は有効化してから）
2. 実行サマリーを読み、失敗ステップがあれば原因を切り分けて報告:
   - credentials なし / GA4 Property ID 未設定 / Search Console 権限なし
   - PageSpeed API key なし / API 未有効化 / quota 超過 / データなし
3. 生成された `SEO/data/raw/` `SEO/data/processed/` `SEO/reports/` のファイル名を一覧で示す。
4. 次にやるべきことを1〜2行で提案。

注意: 本番記事（`src/`/`public/`）は変更しない。`git commit` はしない。
