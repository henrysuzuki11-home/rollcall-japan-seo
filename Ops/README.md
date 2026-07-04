# Ops — 運用スクリプト・設定メモ

## google-apps-script/（gitignore対象・ローカルのみ）

`campaign_code_addon.gs` — **本番稼働中の完成版GAS**のリポジトリ控え。
フォーム受付（early_adopter / investor_inquiry）＋自動返信3種＋キャンペーンコード配布を含む。
**共通キャンペーンコードの値を含むため、gitに含めない**（.gitignoreで除外済み。コード値はGASファイル内の `CAMPAIGN_CODE` を参照）。

### 基本設定
- Spreadsheet ID: `1po0o63L0m92gZ7JJfkPmybfVov2eQVo8Lf4gV9CFoh0`
- 通知・返信先: `ir@iq121.com`（**fromは使わない**。エイリアス未設定で失敗し得るため `replyTo` のみ。no-reply不使用）
- Team name: `IQ121 Japan Team`
- サイト: `https://www.oyamimamori.jp/`／コード申請ページ: `/iq121-japan/campaign-code/`
- ロゴ: `https://www.oyamimamori.jp/images/iq121-logo.png`（HTMLメール上部・width=180）
- App Store: `https://apps.apple.com/jp/app/iq121-legacy-planner-storage/id6476048879`
- Google Play: `https://play.google.com/store/apps/details?id=com.iq.iq121&hl=ja`

### シート構成（4シート・役割を混ぜない）
| シート | 役割 |
|---|---|
| EarlyAdopter | 先行案内登録者全体（campaign-code経由も含め全登録を記録） |
| InvestorInquiry | 投資家・法人・事業提携問い合わせ |
| CampaignCodeRequests | コード申請者のみ（emailでupsert）: timestamp / name_or_nickname / email / interest_theme / lives_apart_from_parent / source_page / campaign_code / request_status(requested→sent/resent/error) / requested_at / sent_at / resent_at / notes |
| CampaignCodeLogs | 送信履歴（追記のみ）: timestamp / email / name_or_nickname / campaign_code / source_page / status / notes |

## 自動返信仕様（3種）

| 対象 | メール | 件名 | キャンペーンコード表示 |
|---|---|---|---|
| キャンペーンコード申請者（/campaign-code/ または wants_campaign_code=true） | コードメール**のみ**（先行案内メールは**重複送信しない**） | 【IQ121 Japan】キャンペーンコードのご案内 | **このメールのみに表示** |
| 通常の先行案内登録者（/early-adopter/） | 受付完了メール（コード申請ページへのリンクあり） | 【IQ121 Japan】先行案内登録を受け付けました | 出さない |
| 投資家・法人問い合わせ（InvestorInquiry保存後） | 受付完了メール（投資勧誘・募集・条件提示に見えない文面） | 【IQ121 Japan】お問い合わせを受け付けました | 出さない |

- コードメール: ロゴ／コード太字28px／「アプリ内でキャンペーンコードの入力が必要な場合は、上記コードをご入力ください。」／iPhone・Android別リンク／plainBody併記
- メール送信失敗でも**フォーム保存は失敗扱いにしない**（console.errorでログ、コード送信エラーは request_status=error + notes + 管理者通知）

## GAS更新時の手順

1. Apps Scriptに貼り付け → 保存
2. テスト実行（すべて成功を確認）:
   `debugWriteOnly` → `debugMailOnly` → `testCampaignCodeSend` → `testCampaignCodeDoPostLike` → `testEarlyAdopterAutoReply` → `testInvestorAutoReply` → `testEarlyAdopterDoPostLike` → `testInvestorDoPostLike`
   （テストメール宛先: henrysuzuki11@gmail.com）
3. **必ず**「デプロイ」→「**デプロイを管理**」→ 既存Webアプリの**鉛筆アイコン**→ バージョン「**新しいバージョン**」→「デプロイ」

### ⚠ 重要注意
**Apps Scriptエディタ上のテスト関数は最新の保存済みコードを実行するが、本番フォームはWebアプリとしてデプロイ済みのバージョンを実行する。保存だけでは本番に反映されない。**
「新しいデプロイ」を作るとURLが変わるため、必ず既存Webアプリの編集で新バージョンにする（Web App URLを維持）。

## 本番確認チェックリスト

**/iq121-japan/campaign-code/ から送信:**
- [ ] EarlyAdopter に入る
- [ ] CampaignCodeRequests に sent または resent
- [ ] CampaignCodeLogs に sent または resent
- [ ] キャンペーンコードメールが届く
- [ ] 先行案内登録メールは**重複して届かない**

**/iq121-japan/early-adopter/ から送信:**
- [ ] EarlyAdopter に入る
- [ ] CampaignCodeRequests / Logs には入らない
- [ ] 先行案内登録メールが届く

**/iq121-japan/investor/ から送信:**
- [ ] InvestorInquiry に入る
- [ ] 投資家・法人問い合わせ受付メールが届く

## Apps Script 実行ログの確認手順

本番フォームから送信しても Requests/Logs に入らない場合:
1. Apps Script左メニュー →「**実行数 / Executions**」
2. 本番送信時刻に **doPost が実行されているか**・エラーが出ていないかを確認

代表的なエラー: `ReferenceError`／`Sheet not found`／`Authorization is required`／`Cannot read properties of null`
実行ログに doPost が出ていない場合: 本番フォームが違うGAS URLを叩いている／本番フロントが古い／fetch自体が失敗している可能性が高い。

## 本番切り分け（EarlyAdopterシートで判定）

該当行の F〜J 列: F consent_prerelease_info / G consent_privacy_policy / H consent_campaign_terms / I wants_campaign_code / J source_page
理想（campaign-code経由）: F〜I = true、J = /iq121-japan/campaign-code/

- EarlyAdopterに入らない → フォーム送信失敗 or GAS URL相違
- I が false/空 → 本番フロントが古い（要デプロイ）
- 全true・J正しいのに Requests/Logs に入らない → **GAS再デプロイ漏れ** or 実行エラー（実行数を確認）
- Requests に error 行 → notes列を確認

### 保険ロジック（実装済み）
- `isCampaignCodeRequest_`: wants_campaign_code が欠落しても **source_page に /iq121-japan/campaign-code が含まれれば申請扱い**
- `isTruthy_`: true / 'true' / 'on' / 1 / '1' / 'yes' を許容
- ScriptLock で同時送信の競合を防止

## 不変条件
- フロントは `Content-Type: text/plain;charset=utf-8` ＋ `JSON.stringify`（**application/json 禁止**）
- キャンペーンコードの値はコードメールとGASファイル内のみ（サイト・src・public・dist・console・他メール・**このREADME含む追跡ファイル**に出さない）
- /app・/iq121-japan/early-adopter/・/investor/・/campaign-code/ に広告・アフィリエイトを入れない
