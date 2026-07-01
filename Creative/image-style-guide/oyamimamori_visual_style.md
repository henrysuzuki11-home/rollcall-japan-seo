# ビジュアルスタイルガイド — 親みまもり研究所

画像は**手動半自動運用**（Claude Codeでプロンプト作成 → Leonardo AI / Canva / Ideogram へ人間がコピペ生成）。**API自動化しない・APIキー扱わない・Leonardo無料前提にしない**。

## トーン（守る）
- 実家、古い写真、アルバム、スマホ、親子の距離、**やさしい光**。
- 日本の家庭らしい雰囲気。夕方の暖色光・窓辺・木のテーブルなど。
- 感情はあるが**悲しすぎない／暗くしすぎない／希望のある**明るさ。

## 避ける
- 高齢者施設・病院・医療・介護感。車椅子・点滴・白衣。
- 広告っぽさ（キラキラ・価格・大きな文字）。
- 画像内の**文字・ロゴ・ブランド名**（基本入れない）。
- 参考サイトの画像の模倣。

## 3系統（記事に合わせて選ぶ）
1. **写真風**（realistic editorial photography）— 実家・備え・スマホ系。
2. **やわらかいイラスト風**（soft gentle illustration）— 家族の記録・思い出系。
3. **上品な絵画調**（elegant painterly）— 感情の強い共感hero・SNS映え。

## サイズ
- hero/OGP: 1200×630 ／ 横長: 1080×720 ／ カード: 800×600。WebP推奨。

## 配色
- 深緑・薄緑・クリーム・暖色の光（ブランド色）。彩度は上げすぎない。

## 人物表現
- 後ろ姿・手元・シルエット中心でも可（顔を作り込みすぎない＝親近感＋権利リスク低減）。

## 共通ネガティブ（プロンプト末尾に付ける）
```
no text, no logo, no watermark, no brand name, not an advertisement,
no hospital, no clinic, no nursing home, no medical or caregiving imagery,
no wheelchair, not manga/anime cel style, no heavy saturation, not dark/depressing
```
