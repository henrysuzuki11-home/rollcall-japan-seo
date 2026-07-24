# Affiliate Listing Report — 2026-07-24

> 内部管理用。本レポートの数値・条件・停止理由は公開ページへ出さない。

---

## 1. Active Programs（現在有効・公開可能）

| ASP | 管理用ID | 広告主 | プログラム名 | プログラムID | 状態 | 掲載記事 | 掲載位置 | PR表記 | 計測 | 最終確認 |
|---|---|---|---|---|---|---|---|---|---|---|
| A8 | fukuya-mentaiko | ふくや | 辛子明太子の通販 | s00000014102001 | approved | /articles/homecoming-local-food-family/ | article_after_checklist | あり | affiliate_click | 2026-07-24 |
| VC | yahoo-shopping | 総合オンラインストア | — | pid 892656912 | approved | /articles/parents-house-disaster-supplies-checklist/ 他4記事 | article_after_checklist / 記事下 | あり | affiliate_click | 2026-07-24 |
| VC | furusato-honpo | ふるさと納税 | — | pid 892656917 | approved | /articles/furusato-tax-with-parents/ 他1記事 | article_after_checklist / 記事下 | あり | affiliate_click | 2026-07-24 |
| VC | jalan-travel | 宿泊予約 | — | pid 892656918 | approved | obon / parent-onsen / homecoming-family-talk | 記事下グリッド | あり | affiliate_click | 2026-07-24 |
| VC | seasonal-gift | ギフト専門店 | — | pid 892656911 | approved | ochugen / practical-gifts | 記事下グリッド | あり | affiliate_click | 2026-07-24 |
| VC | kinokuniya-books | オンライン書店 | — | pid 892656916 | approved | practical-gifts / homecoming-family-talk | 記事下グリッド | あり | affiliate_click | 2026-07-24 |
| VC | golf-goods | ゴルフ用品 | — | pid 892656919 | approved | parent-golf-memory | 記事下グリッド | あり | affiliate_click | 2026-07-24 |
| VC | outdoor-wear / ebest-recycle | アウトドア/家電 | — | 892656909 / 892656923 | approved | family-outdoor / homecoming-disaster | 記事下グリッド | あり | affiliate_click | 2026-07-24 |
| A8 | 季節・ギフト・旅行系 23件 | 各社 | — | — | approved | 季節記事群 | 記事下グリッド | あり | affiliate_click | 2026-07-24 |
| A8 | 整理・防災系 5件（coyash-doll / ihinseiri-110 / life-reset / r-cleaning / bousai-goods） | 各社 | — | — | approved | 実家整理・防災記事 | 記事下/サイドバー | あり | 既存計測 | 2026-07-24 |

※ VCは `PUBLIC_ENABLE_VALUECOMMERCE_ADS=true`（本番ビルド）でのみ描画。

---

## 2. Paused Programs

| ASP | 広告主 | プログラム・サイトID | 停止日 | 停止理由 | 再開見込み | 対応した掲載URL | 再開時に必要な作業 |
|---|---|---|---|---|---|---|---|
| ValueCommerce | 日本旅行ホームページ | 管理用ID `nta-travel` / pid 892656908 / sid 3775652 / 対象サイトID 2137988 | 2026-07-22 | 広告主のシステム都合による全プログラム掲載一時停止 | **未定** | /articles/obon-homecoming-parent-checklist/<br>/articles/parent-onsen-trip-memory/<br>/articles/homecoming-family-talk/ | `src/data/valueCommerceAds.ts` の `VC_STATUS_OVERRIDES` から `'nta-travel'` の行を削除するだけで復帰。記事frontmatterの `nta-travel` 指定・pid・URL・掲載記事設定はすべて保持済み |

**状態**：`isActive: false` / `approvalStatus: 'paused'` / `since: 2026-07-22` / `reason: advertiser_system_pause`
**実装**：データ層の停止指定 → `isVCAdVisible()` が false → グリッドから自動除外。設定情報は将来の再開のため保持。

---

## 3. Ended / Terminated Programs

| ASP | 広告主 | プログラムID | 終了日 | 状態 | 削除した掲載URL | 広告コード除去結果 | 計測ピクセル除去結果 | 記事の扱い |
|---|---|---|---|---|---|---|---|---|
| A8.net | 株式会社こころのカンパニー | s00000025525001 | 通知受領 2026-07-23 | **terminated** | /articles/dementia-asset-management-family-trust/ | ✅ クリックURL・バナー画像URLをソースから完全削除（src=0 / dist=0） | ✅ 削除（src=0 / dist=0） | **一般解説記事として維持**。広告のみ削除、本文の解説価値は保持 |

**状態**：`isActive: false` / `approvalStatus: 'ended'` / `endedAt: 2026-07-23` / `reason: advertiser_terminated`
**除去した識別子**（すべて src / dist で0件を確認）：
- programId `s00000025525001`
- クリックURL `.../ejp?a8mat=4B65SJ+4G5MIA+5GYA+5YZ75`
- 画像URL（aid `260627923269` / mid `s00000025525001003000`）
- 計測ピクセルURL
- 広告主名・サービス名（記事・メタデータ・JSON-LDすべて）

---

## 4. Article-to-Ad Mapping

| 記事URL | 記事タイトル | 主テーマ | 広告 | ASP | 状態 | 広告数 | 掲載位置 | 関連性 | 対応要否 |
|---|---|---|---|---|---|---|---|---|---|
| /articles/dementia-asset-management-family-trust/ | 親の認知症で資産管理に困る前に | 家族信託・認知症 | **なし** | — | 広告なし（終了により削除） | 0 | — | — | 対応済 |
| /articles/obon-homecoming-parent-checklist/ | お盆の帰省チェックリスト | 帰省 | jalan-travel, yahoo-shopping | VC | approved（nta-travel除外） | 1 | 記事下 | 高 | 対応済 |
| /articles/parent-onsen-trip-memory/ | 親と行く温泉旅行 | 旅行 | jalan-travel | VC | approved（nta-travel除外） | 1 | 記事下 | 高 | 対応済 |
| /articles/homecoming-family-talk/ | 帰省の会話のきっかけ | 帰省・会話 | jalan-travel, kinokuniya-books | VC | approved（nta-travel除外） | 2 | 記事下 | 高 | 対応済 |
| /articles/parents-house-disaster-supplies-checklist/ | 実家の防災グッズ不足チェックリスト | 防災 | yahoo-shopping | VC | approved | 1 | article_after_checklist | 高 | — |
| /articles/furusato-tax-with-parents/ | 親と楽しむふるさと納税 | ふるさと納税 | furusato-honpo | VC | approved | 1 | article_after_checklist | 高 | — |
| /articles/homecoming-local-food-family/ | 帰省で家族と楽しむ地域の味 | 帰省・食 | fukuya-mentaiko | A8 | approved | 1 | article_after_checklist | 高 | — |
| その他季節・整理・防災記事群 | — | — | A8季節/整理・VC各種 | A8/VC | approved | 1〜4 | 記事下 | 高 | — |

---

## 5. Compliance Check

| 項目 | おやとこ（終了） | 日本旅行（停止） | 有効広告全般 |
|---|---|---|---|
| approval | ended（描画不可） | paused（描画不可） | approved |
| isActive | false | false | true |
| PR表示 | 広告ごと削除（PRのみ残存なし） | グリッドから除外（PRのみ残存なし） | あり |
| rel属性 | — | — | `nofollow sponsored noopener` |
| target属性 | — | — | `_blank` |
| tracking pixel | 削除済 | 出力なし | 広告1件につき1つ |
| script | 元々jsbanner不使用（静的バナー方式） | 同左・出力なし | 静的のみ |
| 空枠対策 | カードごと非描画 | グリッドが0件時に非描画 | 同左 |
| 商標リスティング制限 | 出稿なし（終了） | 出稿なし | 出稿なし（方針） |
| 本人申込み可否 | 対象外（成果対象外条件あり・終了） | — | 自己申込みは行わない |
| 広告掲載URL提出要否 | 不要（終了） | 停止中のため不要 | 鼓月・山本山・eSIM系は提出要 |

---

## 6. Removed Code Verification（公開build検査結果）

**おやとこ** — `dist` 内すべて **0件**
| 識別子 | src | dist |
|---|---|---|
| `s00000025525001` | 0 | 0 |
| `4B65SJ+4G5MIA+5GYA+5YZ75` | 0 | 0 |
| `260627923269` | 0 | 0 |
| `s00000025525001003000` | 0 | 0 |
| `oyatoko-family-trust`（識別子） | 管理データのみ | 0 |
| 「おやとこ」「こころのカンパニー」 | 0 | 0 |

**日本旅行** — `dist` 内 **0件**
| 識別子 | dist |
|---|---|
| pid `892656908`（referral / gifbanner 両方） | 0 |
| jsbanner（元々未使用） | 0 |

**誤削除していないこと（他広告の生存確認）**
- じゃらん pid 892656918：3件出力 ✅
- Yahoo!ショッピング 892656912：5件 ✅
- ふるさと本舗 892656917：1件 ✅
- 防災グッズ A8 `4B65SJ+22F7EA+5HQC+5YZ75`：4記事 ✅（`4B65SJ` はメディア共通IDのため誤検出注意）

---

## 7. Recommendations

1. **広告主1社への依存を避ける** — 今回1日で2社が停止/終了。現在VC 9件＋A8 29件に分散できており方向性は妥当。単一記事の収益を1広告に依存させない。
2. **有用記事と広告を分離する** — 家族信託記事は広告削除後も解説として成立した。この「広告が消えても記事が死なない」構造を全記事で維持する。
3. **停止・終了状態をデータで管理** — `VC_STATUS_OVERRIDES`（VC）と `approvalStatus`（A8）で1行変更＝即時停止を実現。記事本文への直書きは今後も禁止。
4. **広告の自動差し替えをしない** — 停止枠を別広告で機械的に埋めない。関連性を人が確認してから。
5. **記事ごとに主広告1件を基本** — 現行の `article_after_checklist` 方式を維持。
6. **停止通知を受けたら即時非表示にできる設計** — 実現済み（データ1行＋再ビルド）。
7. **30日ごとの掲載状況確認** — 次回 2026-08-23 目安。提携状態・リンク切れ・成果条件変更を点検。
8. **ビルドキャッシュに注意** — `node_modules/.astro/data-store.json` に旧HTMLが残るため、広告停止時は必ずキャッシュ削除後に再ビルドすること（今回実際に発生）。
