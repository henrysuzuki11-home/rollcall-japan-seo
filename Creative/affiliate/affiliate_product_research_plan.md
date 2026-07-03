# アフィリエイト商材リサーチ計画 — 2026-07-03

大原則：まず候補リスト化のみ。**承認済み（approved/published）以外は記事に表示しない**（src/data/affiliateProducts.ts の getDisplayableProducts が機械的に排除）。
表示時ルール：開示表記必須／rel="sponsored nofollow noopener noreferrer"＋target="_blank"／価格・在庫・レビュー点数の固定表示禁止／Amazon画像の無断保存禁止／1記事2〜4点まで／/app・early-adopter・investor には出さない。

| カテゴリ | 想定記事slug | 検索意図 | 候補例 | 向き先 | 自然な理由 | 注意表現 | 優先 |
|---|---|---|---|---|---|---|---|
| 防災・災害時の備え | bousai-goods-oya-checklist, jishin-bousai-checklist | 実家 防災 何から | 防災セット | Amazon/A8 | チェックリスト記事の実践先 | 「絶対安全」禁止 | 高 |
| モバイルバッテリー・充電器 | jikka-mobile-battery-bichiku（掲載済） | 停電 スマホ 充電 | 大容量/ソーラー/乾電池式 | Amazon | 連絡手段の維持=サイト主題 | 保証表現禁止 | 済 |
| 防災ラジオ・ライト | teiden-tsushin-shougai-renraku | 停電 情報収集 | 手回しラジオ | Amazon | 情報途絶への備え | 恐怖訴求禁止 | 中 |
| 非常用トイレ | bousai-goods-oya-checklist（掲載済） | 断水 備え | 携帯トイレ | Amazon | 既存記事の補完 | — | 済 |
| 書類保管・耐火バッグ | oya-moshimo-joho-kyoyu, inheritance-young | 重要書類 保管 | 耐火防水バッグ | Amazon | 「ありか」を作る物理側 | IQ121主導線を崩さない | 高 |
| 見守り生活家電 | mimamori-service-erabikata | 見守り 家電 | スマート電球/プラグ | Amazon | センサー型見守りの入口 | 監視に見せない | 中 |
| スマートタグ | smartphone-lost-family-preparation | 紛失防止 タグ | 紛失防止タグ | Amazon | 置き忘れ対策（情報保護ではないと明記） | 効果の限定を明記 | 高 |
| ハードウェアセキュリティキー | family-information-security-basics | 2段階認証 キー | FIDOキー | Amazon | MFAの発展形 | 上級者向けと明記 | 低 |
| 写真整理・スキャナー | family-photo-seiri, family-record | 古い写真 データ化 | フォトスキャナー | Amazon | 紙写真のデジタル化入口 | 保管の主役はIQ121 | 中 |
| 外付けSSD・バックアップ | family-photo-seiri | 写真 バックアップ | 外付けSSD | Amazon | 二重化の物理側 | 「これだけで十分」禁止 | 中 |
| レシピノート | family-recipe-photo-record | レシピ 記録 ノート | 聞き書きノート | Amazon | 聞き出す「きっかけ」扱い | カニバリ注意（主役はIQ121） | 中 |
| 高齢の親との連絡デバイス | kourei-tsukaiyasui-app | 親 スマホ 簡単 | シニア向けタブレット | Amazon | 操作性の物理解決 | 押し付けない | 低 |
| 一人暮らしの安心アイテム | meal-photo-checkin-family（未執筆） | 一人暮らし 見守り | — | A8 | 生活導線 | — | 低 |
| 実家整理・書類整理 | jikka系 | 実家 片付け | ファイルボックス | Amazon | 整理の物理側 | 遺品整理と混同させない | 低 |
| 見守りサービス（A8） | mimamori-service-erabikata | 見守りサービス 比較 | A8案件要確認 | A8 | 比較記事の受け皿 | **unchecked** | 高 |
| 防災/保険/家事代行/整理収納/セキュリティ系（A8） | 各記事 | — | a8_candidate_programs.md 参照 | A8 | — | すべて **unchecked** | 中 |

次アクション：A8管理画面で「見守りサービス」「宅配食」「セキュリティソフト」の3カテゴリを最優先で承認状況確認 → a8_candidate_programs.md のステータス更新 → 承認後に affiliateProducts.ts へ url/status 反映。
