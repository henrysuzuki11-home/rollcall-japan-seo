# アフィリエイト実績ベースライン

計測日：
2026年7月15日

## 現状

| ASP・レポート | 表示 | クリック | 成果 | 報酬 |
|---|---:|---:|---:|---:|
| 簡易レポート | 209 | 10 | 0 | 0円 |
| ValueCommerce | 17 | 8 | 0 | 0円 |
| その他紹介料レポート | 未確認 | 2 | 0 | 0円 |

（ValueCommerce内訳：7/1〜15。7/11=表示9・クリック4、7/13=表示8・クリック4）

## 注意

- レポート間で計測定義が異なるため単純合算しない
- 管理者の動作確認クリックが含まれている可能性がある
- 少数データのためCVRを断定しない
- まず記事別・広告別・掲載位置別のクリック計測を整える
- 公開ページへこれらの数値を表示しない（この文書は管理用）

## 初期評価基準

- 30クリック未満：判断保留
- 30〜99クリック：記事と広告の関連性を確認
- 100クリック以上・成果0：導線・広告主・検索意図・リンク先を再評価
- クリック率が低い場合：広告数ではなく導入文と記事意図を改善
- クリック率が高く成果0の場合：広告リンク先との期待値不一致を確認

これは内部運用の目安であり、成果を保証する数値ではありません。

---

## 計測設計（2026-07-15 実装）

### GA4 イベント
- イベント名：`affiliate_click`
- パラメータ：`affiliate_network` / `affiliate_ad_id` / `advertiser_name` / `article_slug` / `placement` / `link_type` / `page_path`
- 実装：`src/layouts/BaseLayout.astro` の委譲リスナ（`[data-affiliate-network]` を持つリンクのみ）。内部リンクは対象外。個人情報は送らない。同一リンクの二重送信を800ms間抑止。リンク遷移は妨げない。
- 広告要素：`src/components/AffiliateInlineAd.astro`（`data-affiliate-network` / `-ad-id` / `-advertiser` / `-placement` / `-link-type` / `data-article-slug`）

### 計測対象記事（主要広告を各1件のみ）

| 記事slug | ASP | ad_id | advertiser_name | placement |
|---|---|---|---|---|
| parents-house-disaster-supplies-checklist | valuecommerce | yahoo-shopping | Yahoo!ショッピング | article_after_checklist |
| furusato-tax-with-parents | valuecommerce | furusato-honpo | ふるさと本舗 | article_after_checklist |
| homecoming-local-food-family | a8 | fukuya-mentaiko | ふくや | article_after_checklist |

### 配置ルール（記事間で統一）
- 本文の55〜70%付近、チェックリスト／選び方の直後
- `placement = article_after_checklist`
- FAQより前に配置（FAQ・まとめは広告の後）
- 記事末尾に同じ広告を再掲載しない
- 各記事の主要アフィリエイト広告は1件のみ（合計3〜4件に増やさない）

### 母数が集まるまでの運用
- 十分なクリック母数（目安30〜100）が集まるまで、広告の早急な差し替えをしない
- クリックだけを目的にした煽り表現を使わない
- ValueCommerceは汎用バナーのため、独自商品リンク・MyLinkを推測生成しない
- ASPのURL・計測パラメータは変更しない

## 公開後の確認項目

### 動作確認（公開直後）
- [ ] GA4で `affiliate_click` が届いているか（DebugView）
- [ ] `article_slug` が正しいか（3記事それぞれ）
- [ ] `affiliate_ad_id` が正しいか（yahoo-shopping / furusato-honpo / fukuya-mentaiko）
- [ ] ValueCommerce・A8の管理画面にクリックが反映されるか
- [ ] 自分のテストクリックと一般ユーザーのクリックを混同しない（IP/日時で切り分け）
- [ ] 広告ブロッカー利用時に空白枠が残らない（表示不可時はカードごと非表示）

### 指標（7日後・14日後・30日後）
- 記事PV
- 広告表示数
- affiliate_click（記事別・広告別・placement別）
- 記事別CTR
- 広告別CTR
- 成果件数
- 成果金額
- 承認件数
- 否認件数

広告数を増やす判断は、これらの数字を確認してから行う。
