---
description: Organize candidate product/service categories into a comparison map (CSV)
---

カテゴリ別に紹介候補の商品・サービス軸を整理してください。特定商品に偏らず、**比較軸**を作ります。`affiliate-product-researcher` サブエージェント推奨。

1. 読む: `Affiliate/products/affiliate_category_policy.md`。
2. 相性の良いカテゴリ（防災グッズ／モバイルバッテリー／非常食／実家の防災用品／親が使いやすいスマホ周辺機器／見守りカメラ／GPSタグ／スマートタグ／スマートスピーカー／家族連絡サービス／親向けスマホ講座・通信）ごとに整理。
3. 出力CSV（列）: `category,reader_problem,product_type,selection_criteria,avoid_claims,article_angle,priority,notes`
4. 出力先: `Affiliate/products/affiliate_product_map_YYYY-MM-DD.csv`

注意:
- 医療・健康効果の断定を避ける（avoid_claims に明記）。怪しい健康食品・過度な防犯商材・根拠不明商品は入れない。
- 実商品名を出す場合も誇張せず、比較軸で中立に。実IDやsecretは書かない。src/・public/ は触らない。git commit はしない。
