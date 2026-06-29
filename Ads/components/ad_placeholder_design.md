# 広告枠コンポーネント設計（将来実装用・未実装）— 2026-06-27

> ⚠ **広告タグが未提供のため、本番には実装しない。** これは将来の設計メモ。
> 既存の `src/components/AdSlot.astro`（AdSense用・未設定時は何も出さない）と同じ「設定があるときだけ出す」思想を踏襲する。

## 方針
- 広告タグ（忍者AdMax等のJS/HTML）が提供されたら、**本番ビルド時のみ**出力するコンポーネントを作る。
- タグ未設定なら**何も描画しない**（空枠も出さない）。`src/` 本番への実装は人間確認後。

## 想定コンポーネント `src/components/DisplayAd.astro`（未作成）
```
---
// 例（将来）。consts に AD_ENABLED / 各枠のタグIDを置く想定。
// import { ADMAX_ENABLED } from '../consts';
interface Props { slot: 'in-article' | 'below-article'; }
const { slot } = Astro.props;
const enabled = import.meta.env.PROD && /* ADMAX_ENABLED */ false;
---
{ enabled && (
  <aside class="display-ad" aria-label="広告" data-slot={slot}>
    <span class="display-ad__label">広告</span>
    <!-- ここに忍者AdMax等のタグを差し込む（受領後） -->
  </aside>
) }
```

## 配置（ArticleLayout 内）
- **記事中（in-article）**：本文の自然な区切り（H2とH2の間）に1枠。
- **記事下（below-article）**：`関連記事 → /app CTA →（余白）→ DisplayAd(below-article)` の順。
- いずれも `Ads/strategy/admax_display_ads_setup_*.md` の禁止配置・距離感ルールに従う。

## スタイル要件（CLS対策）
- 枠は最小高さを確保（例 min-height で領域予約）。
- 「広告」ラベルを上部に小さく常時表示。
- /app CTA・アフィリ商品カードと**最低1セクション**離す。

## 受領後のTODO（人間確認のうえで）
1. `consts.ts` に広告の有効フラグ／タグIDを追加（secretではない公開ID）。
2. `DisplayAd.astro` を実装（上記）。本番のみ・未設定時は非表示。
3. `ArticleLayout.astro` に記事中1・記事下1で挿入（CTAより下）。
4. ビルド→本番URLで表示・CLS・速度・/app導線への影響を確認。
