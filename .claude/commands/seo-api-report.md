---
description: kanex.co.jp の週次SEOレポートを表示し、次の改善トップ5を提示（問い合わせ獲得・リフォーム重点）
---

対象は **https://kanex.co.jp/（株式会社カネックス）のみ**。
**親みまもり研究所（oyamimamori.jp）・安否確認アプリのデータは対象外**。完全に切り離す。
IQ121/oyamimamori 側の `SEO/`（このプロジェクト直下の SEO/）は参照しないこと。

## 読むファイル（すべて Kanex 専用・絶対パス）
- 週次レポート: `/Users/hidemichisuzuki/Desktop/Kanex/Web/SEO/reports/weekly_seo_report_*.md`（最新日付）
- 改善候補: `/Users/hidemichisuzuki/Desktop/Kanex/Web/SEO/data/processed/seo_opportunities_*.csv`（最新）
- 記事棚卸し（補助・あれば）: `/Users/hidemichisuzuki/Desktop/Kanex/Web/SEO/reports/blog_listing_report_*.md`

## 手順
1. 上記の**最新Kanexレポート**を読む。
2. 主要数値（impressions / clicks / CTR / 平均順位）と、**問い合わせ導線**
   （contact.html 閲覧・phone_click・cta_click）を3〜5行で要約。
   ※ **/app 導線は使わない**（Kanexにアプリはない）。KPIは「問い合わせ獲得」。
3. レポートと opportunities CSV から、**今週やるべき改善トップ5**を優先度順に提示
   （各: 対象・打ち手・期待効果）。
   - 事業の主軸＝リフォーム／外壁塗装／屋根塗装／小規模解体／物置撤去／工場・倉庫補修 の**問い合わせ獲得**。
   - 重点キーワード例: 蒲郡市 リフォーム／蒲郡市 外壁塗装／蒲郡市 屋根塗装／蒲郡市 小規模解体／
     蒲郡市 物置撤去／蒲郡市 雨漏り／三河 リフォーム／豊橋市 外壁塗装／岡崎市 リフォーム。
4. Kanexの週次レポートが無い/データが空の場合は、**Kanexのパイプライン実行**を案内:
   ```
   cd "/Users/hidemichisuzuki/Desktop/Kanex/Web"
   source .venv/bin/activate
   python SEO/scripts/run_all_seo_api.py
   ```
   （GSC/GA4 の認証情報の設定が前提。手順は `/Users/hidemichisuzuki/Desktop/Kanex/Web/SEO/README_SEO.md`）
   実データが未取得のうちは、補助として blog_listing_report（記事棚卸し）を要約してよい。

## 注意
- 親みまもり研究所・安否確認の指標は**一切混ぜない**。
- 広告収益より**問い合わせ獲得**を優先した提案にする。
- 提案のみ。本番（kanex-site1）の反映は人間確認後に GitHub Desktop で push。
- 実績・価格・保証など事実確認できない内容は提案しない。
