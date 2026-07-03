# Ops — 運用スクリプト・設定メモ

## google-apps-script/（gitignore対象・ローカルのみ）

`campaign_code_addon.gs` — Early Adopter登録者へのキャンペーンコード自動送信アドオン。
**共通キャンペーンコードの値を含むため、gitに含めない**（.gitignoreで除外済み）。

### 概要
- 対象: `type === 'early_adopter'` かつ `wants_campaign_code === true` の送信のみ
- 条件: email あり／honeypot（website）空／必須同意3つ true
- 動作: 共通コードをメール送信し、`CampaignCodeLogs` タブに記録
  （列: timestamp / email / name_or_nickname / campaign_code / source_page / status / notes）
- 重複登録: 同じメールには同じコードを**再送**（status=resent）。送らない運用にしたい場合はコード内コメント参照
- 失敗時: 登録処理は失敗させず、ログに status=error で記録

### 導入手順（人間の作業）
1. 既存のApps Scriptプロジェクトに `campaign_code_addon.gs` の内容を新規ファイルとして追加
2. 既存 doPost の early_adopter 書き込み成功後に `maybeSendCampaignCode_(data);` を1行追加
3. 新バージョンとして再デプロイ
4. テスト: wants_campaign_code=true でフォーム送信 → メール受信・CampaignCodeLogs 記録を確認

### 送信元について
- メールはApps Script実行アカウントから送信される
- `ir@iq121.com` から送るには、実行アカウントのGmail/Workspaceで ir@iq121.com が**送信エイリアス**として設定されている必要がある
- エイリアス未設定の場合、コードは自動で `replyTo: ir@iq121.com` にフォールバックする

### 禁止事項（サイト側）
- キャンペーンコードを画面・public配下・記事本文・SNS文言に出さない（メール送信のみ）
