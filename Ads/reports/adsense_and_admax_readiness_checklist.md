# 広告導入 準備チェックリスト（AdSense / 忍者AdMax）— 2026-06-30

## ads.txt（未完・要対応）
- [ ] **忍者AdMaxの ads.txt 全文をもらう**（`adm.shinobi.jp,230541,DIRECT` と `google.com,...` `yahoo.com,...` を含む長いリスト）
- [ ] `public/ads.txt` に **1行1レコード・装飾なし・全角/空行なし** で保存
- [ ] `adm.shinobi.jp,230541,DIRECT` の存在／google・yahoo行の維持／総行数／壊れCSVを検証
- [ ] `npm run build` → `dist/ads.txt` に出力される
- [ ] 公開後 `https://www.oyamimamori.jp/ads.txt` で確認

> 現状：**未作成**（実リスト未受領）。ad **タグ**（efc7…/0937…）は受領済みで記事中/記事下に実装済みだが、ads.txt無しだと認証されず配信制限のおそれ。

## 忍者AdMax 広告タグ
- [x] 記事下タグ（0937…）実装（`DisplayAd.astro`）
- [x] 記事中タグ（efc7…）実装（rehype・最初のh2直後）
- [x] 本番のみ表示（`import.meta.env.PROD`）／CLS対策（min-height）
- [ ] ads.txt設置後に実配信を確認

## AdSense（将来・任意）
- [ ] `ADSENSE_CLIENT_ID`（`ca-pub-...`）設定（空のあいだは非出力）
- [ ] AdSense審査用の固定ページ（privacy/terms/contact/disclaimer/about）＝**設置済み**
- 忍者AdMaxとAdSenseの併用は方針を決めてから（まずはAdMax）。

## 禁止（全体）
オーバーレイ/ポップアップ/追従/全画面/通知風。/appページ・Early Adopter LPへの広告。
