# Ops — 運用スクリプト・設定メモ

## google-apps-script/（gitignore対象・ローカルのみ）

`campaign_code_addon.gs` — 先行案内登録（Early Adopter）者へのキャンペーンコード自動送信アドオン（最終仕様）。
**共通キャンペーンコードの値を含むため、gitに含めない**（.gitignoreで除外済み）。コードはサイト上・記事・SNS・publicファイルに出さず、**メール内でのみ**案内する。

### シート構成（4シート・役割を混ぜない）
| シート | 役割 |
|---|---|
| EarlyAdopter | 先行案内登録者**全体**の管理（既存のまま） |
| InvestorInquiry | 投資家・法人・事業提携問い合わせ（既存のまま。コード配布と混ぜない） |
| CampaignCodeRequests | **コード案内を希望した人だけ**（emailでupsert・重複行を増やさない） |
| CampaignCodeLogs | 実際のメール送信履歴（追記のみ） |

- CampaignCodeRequests 列: timestamp / name_or_nickname / email / interest_theme / lives_apart_from_parent / source_page / campaign_code / request_status / requested_at / sent_at / resent_at / notes
  - request_status: requested → sent / resent / error
- CampaignCodeLogs 列: timestamp / email / name_or_nickname / campaign_code / source_page / status / notes

### サイト側の2入口（2026-07-03〜）
- `/iq121-japan/early-adopter/`（先行案内登録）→ **wants_campaign_code=false 固定**。EarlyAdopterシートのみに記録。Requests/Logsには入らない・メール送信なし
- `/iq121-japan/campaign-code/`（キャンペーンコード申請）→ **wants_campaign_code=true 固定**（チェックボックスなし）。EarlyAdopter＋CampaignCodeRequests（upsert）＋CampaignCodeLogs＋コードメール送信
- どちらも同じGASエンドポイント・同じ `type: early_adopter`。区別は wants_campaign_code と source_page（location.pathname）で行う

### 動作
1. `type=early_adopter` かつ `wants_campaign_code` が true/'true'/'on' のときだけ発動（希望者のみ）
2. 条件: email あり／honeypot（website）空／必須同意3つ true
3. CampaignCodeRequests に upsert（既存emailは既存行を更新）
4. HTMLメール送信（下記仕様）→ 成功: status=sent（既送信者への再登録は resent・同じコードを再送）／失敗: status=error＋notesにエラー内容
5. CampaignCodeLogs に履歴を追記

### メール仕様（sendCampaignCodeEmail_）
- 件名: 【IQ121 Japan】キャンペーンコードのご案内
- HTMLメール上部にロゴ: `https://www.oyamimamori.jp/images/iq121-logo.png`（width=180指定・SVG不使用）
- キャンペーンコードは**太字・28px・中央寄せボックス**で表示
- **iPhone（App Store）/ Androidスマートフォン（Google Play）でリンクを分離**
- 「アプリ内でキャンペーンコードの入力が必要な場合は、上記コードをご入力ください。」を本文に含む
- plainBody 併記（HTML非対応環境向け）
- 送信元: 実行アカウントに `ir@iq121.com` のエイリアスがあれば from 指定、なければ **replyTo: ir@iq121.com** に自動フォールバック

### 導入手順（人間の作業）
1. Apps Scriptプロジェクトに `campaign_code_addon.gs` を新規ファイルとして追加
2. 既存 doPost の early_adopter 書き込み成功後に `handleCampaignCodeRequest_(data);` を1行追加
3. 新バージョンとして再デプロイ
4. テスト: wants_campaign_code=true で送信 → HTMLメール受信（ロゴ・太字コード・OS別リンク）／CampaignCodeRequests upsert／CampaignCodeLogs 追記を確認
   ※ ロゴが表示されるのは本番デプロイ後（`/images/iq121-logo.png` が公開されてから）

### 不変条件
- フロントの送信は `Content-Type: text/plain;charset=utf-8` ＋ `JSON.stringify`（application/json 禁止）— 変更しない
- 既存の early_adopter / investor_inquiry 処理を壊さない

---

## ⚠ 本番反映手順（再デプロイ）— 最重要

**Apps Scriptエディタ上のテスト関数は「最新の保存済みコード」を実行するが、本番フォーム（doPost）は「Webアプリとしてデプロイ済みのバージョン」を実行する。そのため、コードを保存しただけでは本番に反映されない。**
GAS単体テストが成功するのに本番フォームで CampaignCodeRequests / CampaignCodeLogs に入らない場合、最も多い原因はこの**再デプロイ漏れ**。

手順:
1. Apps Scriptでコードを保存
2. `debugWriteOnly` を実行（シート書き込み単体）
3. `debugMailOnly` を実行（メール送信単体）
4. `testCampaignCodeSend` を実行
5. `testCampaignCodeDoPostLike` を実行（doPost相当のpayloadで通し確認）
6. すべて成功したら、**必ず**以下を行う:
   - 「デプロイ」→「**デプロイを管理**」
   - 既存Webアプリの**鉛筆アイコン**
   - バージョン:「**新しいバージョン**」を選択
   - 「デプロイ」

注意: 「新しいデプロイ」を作るとURLが変わってしまう。**既存Webアプリを編集して新バージョンにする**（既存のWeb App URLを維持する）。

## Apps Script 実行ログの確認手順

本番フォームから送信しても Requests/Logs に入らない場合:
1. Apps Script左メニュー →「**実行数 / Executions**」
2. 本番フォーム送信時刻に **doPost が実行されているか** を確認
3. エラーが出ていないかを確認

代表的なエラー:
- `ReferenceError: maybeSendCampaignCode_ is not defined`（doPostの呼び出し名とファイル内の関数名の不一致）
- `ReferenceError: jsonResponse is not defined`
- `CampaignCodeRequests or CampaignCodeLogs sheet not found`
- `Authorization is required`（再認可が必要）
- `Cannot read properties of null`

実行ログに本番送信時刻の doPost が**出ていない**場合: 本番フォームが違うGAS URLを叩いている／本番フロントが古い／fetch自体が失敗している、のいずれかの可能性が高い。

## 本番切り分け手順（Sheetで判定）

本番 `/iq121-japan/campaign-code/` から送信後、EarlyAdopter シートの該当行を確認:

| 列 | 項目 | 理想値 |
|---|---|---|
| F | consent_prerelease_info | true |
| G | consent_privacy_policy | true |
| H | consent_campaign_terms | true |
| I | wants_campaign_code | **true** |
| J | source_page | /iq121-japan/campaign-code/ |

判定:
- **EarlyAdopterに入らない** → フォーム送信自体が失敗、またはGAS URLが違う
- **入るが I が false/空** → 本番フロントが古い（デプロイ前）、またはcampaign-codeモードが効いていない
- **F/G/H/I=true・J=campaign-code なのに Requests/Logs に入らない** → フロントはOK。**本番GASの再デプロイ漏れ**、またはGAS実行エラー（実行数を確認）
- **CampaignCodeRequests に error 行が入る** → notes列のエラー内容を確認

### 保険ロジック（campaign_code_addon.gs に実装済み）
- `maybeSendCampaignCode_` は、`wants_campaign_code` が欠落していても **source_page が /iq121-japan/campaign-code/ ならコード申請として扱う**
- isTruthy_ は true / 'true' / 'on' / 1 / '1' / 'yes' を許容
- 旧名 `handleCampaignCodeRequest_` の互換エイリアスあり（どちらの呼び出し名でも動く）
- ScriptLock で同時送信の競合を防止
