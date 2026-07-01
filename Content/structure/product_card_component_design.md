# 商品カード コンポーネント設計（記事本文用）— 親みまもり研究所

記事**本文中**に自然に置く商品カード。将来 `src/components/ProductCard.astro` として実装（人間確認後）。

## 表示要素
- 商品名
- カテゴリ（例：モバイルバッテリー）
- 一言コメント（中立・比較軸で）
- **商品画像**（各ASPが提供する正規素材のURLのみ。自前保存/加工しない）
- ボタン：Amazonで見る／楽天で見る／Yahooショッピングで見る／A8で見る（あるものだけ）
- **「※広告・PRを含みます」**（カード内に明示）
- 注意書き（サイズ・仕様・利用条件は各ページで確認）

## デザイン方針
- 罫線＋淡い背景の控えめカード（記事の“補助”であり主役でない）。
- ボタンは `rel="sponsored nofollow noopener" target="_blank"`。
- **1記事に2〜5個まで**。/app CTA・見出し直後の広告と隣接させない。

## data構造（frontmatter or 記事内MDX/HTML）
```
name, category, comment, image_url(ASP正規), 
amazon_url, rakuten_url, yahoo_url, a8_url  (無いものは空)
```
実URLは人間が入力（`REPLACE_WITH_AFFILIATE_URL`）。管理は `Affiliate/links/affiliate_link_table.csv`。

## 実装コンポーネント案（未実装）
```
---
// src/components/ProductCard.astro（将来）
interface Props { name; category; comment; imageUrl; amazon?; rakuten?; yahoo?; a8? }
---
<aside class="product-card">
  <span class="product-card__pr">※広告・PRを含みます</span>
  <img src={imageUrl} alt={name} loading="lazy" width="200" height="200" />
  <div>
    <p class="product-card__cat">{category}</p>
    <p class="product-card__name">{name}</p>
    <p class="product-card__comment">{comment}</p>
    <div class="product-card__buttons">
      {amazon && <a href={amazon} target="_blank" rel="sponsored nofollow noopener">Amazonで見る</a>}
      ...（楽天/Yahoo/A8 同様）
    </div>
    <p class="product-card__note">サイズ・仕様・利用条件は各ページでご確認ください。</p>
  </div>
</aside>
```

## 禁止
- Amazon商品画像の自前保存・加工。A8素材の改変。価格/レビュー点数の固定手打ち。
- /app CTA の直前直後、見出し直後の広告と連続配置。
