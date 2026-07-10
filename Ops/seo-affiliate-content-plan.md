# SEOアフィリエイト 記事計画（20本）— 2026-07-08

前提：**既存12記事は実装済み**（`src/content/articles/`・category `important-info`・`affiliateServices` frontmatterで広告カードを制御）。本計画は既存12＋**追加8本＝20本**の設計。

## 1. 記事群のクラスタ分類

| クラスタ | 記事 | ピラー（ハブ） |
|---|---|---|
| **人形整理** | doll-ihin-seiri／hina-doll-cleanup／antiques-parents-house／＋新規2 | `doll-ihin-seiri` |
| **実家整理** | parents-house-checklist／before-dispose-parents-house／keep-or-dispose-parents-house／jikka-jimai-first-steps／＋新規2 | `jikka-jimai-first-steps` |
| **遺品整理** | ihinseiri-family-check／＋新規1 | `ihinseiri-family-check` |
| **施設・遠方** | care-home-house-cleanup／remote-parents-house-cleanup／＋新規1 | `remote-parents-house-cleanup` |
| **情報整理（本線）** | seizenseiri-family-info／＋新規2 | `seizenseiri-family-info` |
| **大型家具** | large-furniture-cleanup／＋新規1 | `large-furniture-cleanup` |

---

## 2. 既存12記事の主要キーワードと広告カード（実装済み）

| slug | 主要KW | 広告カード | クラスタ |
|---|---|---|---|
| doll-ihin-seiri | 実家 人形 どうする／日本人形 捨てづらい | COYASH | 人形 |
| hina-doll-cleanup | 雛人形 処分できない／供養 買取 | COYASH | 人形 |
| antiques-parents-house | 実家 骨董品 捨てる前に | COYASH | 人形 |
| parents-house-checklist | 親の家 片付け チェックリスト | COYASH＋110番 | 実家 |
| before-dispose-parents-house | 実家 片付け 捨ててはいけないもの | COYASH＋110番 | 実家 |
| keep-or-dispose-parents-house | 捨てていい物 残す物 見分け方 | COYASH＋110番 | 実家 |
| jikka-jimai-first-steps | 実家じまい 最初にやること | 110番＋life-reset＋不用品 | 実家 |
| ihinseiri-family-check | 遺品整理 家族だけ | 110番＋life-reset | 遺品 |
| care-home-house-cleanup | 親 施設入居 実家整理 | life-reset＋110番 | 施設 |
| remote-parents-house-cleanup | 遠方 実家 片付け | 110番＋life-reset | 遠方 |
| seizenseiri-family-info | 生前整理 家族に残す情報 | 110番＋life-reset | 情報 |
| large-furniture-cleanup | 実家 大型家具 処分 | 不用品回収 | 大型 |

---

## 3. カニバリ分析と対策

| リスク | 対象 | 対策 |
|---|---|---|
| **high** | `parents-house-checklist` ／ `before-dispose-parents-house` ／ `keep-or-dispose-parents-house` の3本が「捨てる前の確認」で重複 | **役割を明確に分離**：<br>①checklist＝*片付け前に確認する物の一覧*（ピラー的リスト）<br>②before-dispose＝*捨てる直前の最終確認*（分野別リスト）<br>③keep-or-dispose＝*判断基準（3つの箱）*<br>③のtitleを「見分け方」に寄せ済み。①→②→③の順で内部リンクを一方向に流す |
| **medium** | `doll-ihin-seiri`（人形全般）／ `hina-doll-cleanup`（雛人形） | ①をハブ、②を雛人形specificのspokeに。②から①へ「人形全般はこちら」、①から②へ「雛人形はこちら」 |
| **medium** | `seizenseiri-family-info` ／ 既存 `when-to-share-important-family-information`・`inheritance-important-info-young-people` | 前者＝*生前整理の文脈で残す情報*、後者＝*共有タイミングの設計*。相互リンクで住み分け済み |
| **low** | `care-home-house-cleanup` ／ `remote-parents-house-cleanup` | 状況が異なるため問題なし。相互リンク |
| **low** | `jikka-jimai-first-steps` ／ `parents-house-checklist` | 手順 vs チェックリスト。前者から後者へ「まずここから」 |

### タイトル微修正の提案（任意・現状でも可）
- `before-dispose-parents-house`：現「親の家の片付けで捨てる前に確認したい物」→ 提案「**実家の片付けで捨ててはいけないもの｜捨てる前の最終確認リスト**」（KW「捨ててはいけないもの」を明示、①との差別化）
- `keep-or-dispose-parents-house`：現行のまま（「見分け方」で差別化済み）
- 他10本は修正不要

---

## 4. 追加8記事（→計20本）

| # | slug | タイトル案（商標なし） | 主要KW | 広告カード | 優先 |
|---|---|---|---|---|---|
| 13 | `ningyo-kuyou-vs-baitori` | 人形供養と買取、どちらを選ぶ？手放し方の考え方 | 人形 供養 買取 どちら | COYASH | **高** |
| 14 | `parents-house-documents` | 親の家の書類整理｜捨てていい書類・残す書類の見分け方 | 親の家 書類 整理 | 110番 | **高** |
| 15 | `ihinseiri-trouble-kyoudai` | 遺品整理で兄弟間のトラブルを防ぐには｜話し合いの進め方 | 遺品整理 トラブル 家族 | 110番＋life-reset | **高** |
| 16 | `gogatsu-doll-cleanup` | 五月人形を処分できない時の選択肢｜供養・譲渡・保管 | 五月人形 処分 迷う | COYASH | 中 |
| 17 | `akiya-jikka-kataduke` | 実家が空き家になる前に｜片付けと管理で考えること | 親の家 空き家 片付け | 110番＋life-reset | 中 |
| 18 | `seizenseiri-kirikuchi` | 生前整理の話、親にどう切り出す？やさしい伝え方 | 生前整理 親に切り出す | 110番（補助1枚） | 中 |
| 19 | `taikyo-mae-kataduke` | 退去前・引き渡し前の実家の片付けで困ること | 退去前 実家 片付け | 不用品回収 | 中 |
| 20 | `jikka-photo-album-seiri` | 実家の写真・アルバムを整理する順番 | 親の家 写真 整理 | **広告なし**（情報整理導線） | 中 |

すべて `category: important-info`（#20 は `family-record` も可）。

---

## 5. 優先記事トップ10（着手順）
1. `parents-house-checklist`（実装済・強化のみ）
2. `jikka-jimai-first-steps`（実装済・強化のみ）
3. `doll-ihin-seiri`（実装済）
4. **`ningyo-kuyou-vs-baitori`**（新規・COYASH収益性高）
5. **`parents-house-documents`**（新規・検索意図明確）
6. **`ihinseiri-trouble-kyoudai`**（新規・悩みが強い）
7. `before-dispose-parents-house`（title微修正）
8. `ihinseiri-family-check`（実装済）
9. `remote-parents-house-cleanup`（実装済）
10. `care-home-house-cleanup`（実装済）

---

## 6. 内部リンク設計（ハブ&スポーク）

```
[jikka-jimai-first-steps]（実家整理ピラー）
  ├→ parents-house-checklist ─→ before-dispose ─→ keep-or-dispose
  ├→ parents-house-documents（新）
  ├→ large-furniture-cleanup ─→ taikyo-mae-kataduke（新）
  └→ seizenseiri-family-info（情報整理へ）

[doll-ihin-seiri]（人形ピラー）
  ├→ hina-doll-cleanup
  ├→ gogatsu-doll-cleanup（新）
  ├→ ningyo-kuyou-vs-baitori（新）
  └→ antiques-parents-house

[ihinseiri-family-check]（遺品整理ピラー）
  ├→ ihinseiri-trouble-kyoudai（新）
  └→ before-dispose-parents-house

[remote-parents-house-cleanup]（施設・遠方ピラー）
  ├→ care-home-house-cleanup
  └→ akiya-jikka-kataduke（新）

[seizenseiri-family-info]（情報整理ピラー・本線接続）
  ├→ seizenseiri-kirikuchi（新）
  ├→ jikka-photo-album-seiri（新）
  ├→ when-to-share-important-family-information（既存本線）
  └→ oya-moshimo-joho-kyoyu（既存本線）
```

ルール：各記事から**関連2〜3本**。ピラーへは必ず1本戻す。情報整理ピラーには全クラスタから1本ずつ流す（本線接続）。

---

## 7. 広告カード配置ルール（実装済みの仕組み）

frontmatter `affiliateServices: [...]` で制御。`AffiliateServiceGrid` が記事下に描画、`AffiliateSidebar`（PCのみ・important-infoのみ）に整理系4件。

| 案件 | 表示する記事 | 上限 |
|---|---|---|
| COYASH（人形・骨董） | 人形／骨董／捨てづらい物／実家に残った物 | 1〜2枚 |
| 遺品整理110番 | 遺品整理／生前整理／実家整理／施設入居／遠方実家 | 1〜2枚 |
| ライフリセット | 遺品整理／施設入居後／遠方実家／生前整理（**補助**） | 1枚 |
| 不用品回収 | **大型家具・家電・運び出し困難な記事のみ** | 1枚 |

**禁止**：全記事への不用品回収の掲載／1記事3枚超／繊細な記事（トラブル・死後）での押し売り／CTA直近への配置。

---

## 8. 未対応・注意
- 追加8記事は**未作成**（本計画のみ）。作成は人間確認後。
- `before-dispose-parents-house` のタイトル微修正は**提案のみ**（未適用）。
- 有料リスティングは実施しない方針のため、A8のリスティング規約（商標入札）には抵触しない。SEOでも商標非依存を維持。
