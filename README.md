# 親みまもり研究所（Oyami Mamori Kenkyujo）

家族の見守り・安否確認・防災に関する情報メディア。見守りアプリ **Roll Call** の日本国内でのダウンロード促進を目的とした、SEO 最適化済みの Astro 製静的サイトです。

## 特長

- 🏠 **ホームページ** — ヒーロー、カテゴリー、注目記事、新着記事、アプリ CTA
- 📰 **記事システム** — Astro Content Collections（型安全な frontmatter）
- 🗂 **カテゴリー** — 5 カテゴリー × 一覧／個別ページ
- 🔍 **SEO** — `<BaseHead>`（メタ／OGP／Twitter／canonical）、JSON-LD 構造化データ（Organization / WebSite / Article / BreadcrumbList）
- 🗺 **サイトマップ** — `@astrojs/sitemap`（`/sitemap-index.xml`）
- 🤖 **robots.txt** — `public/robots.txt`
- 🔗 **関連記事 & 内部リンク** — カテゴリー・タグのスコアリングで自動表示＋記事本文内の手動リンク
- 📱 **ダウンロードボタン** — iOS / Android（`<DownloadButtons>`）
- 📡 **RSS** — `/rss.xml`

## 開発

```bash
npm install      # 依存関係のインストール
npm run dev      # 開発サーバー (http://localhost:4321)
npm run build    # 本番ビルド → dist/
npm run preview  # ビルド結果のプレビュー
```

## デプロイ（GitHub Pages ＋ 独自ドメイン）

GitHub Actions でビルドし、独自ドメインの直下で公開する設定です。

- 公開 URL: `https://www.oyamimamori.jp/`
- 公開オリジン: `https://www.oyamimamori.jp`（`src/consts.ts` の `SITE_URL`）
- ベースパス: なし（`BASE_PATH = ''`／ドメイン直下）
- 独自ドメイン: [public/CNAME](public/CNAME) に `www.oyamimamori.jp` を記載（ビルド成果物 `dist/` に含まれます）
- ワークフロー: [.github/workflows/deploy.yml](.github/workflows/deploy.yml) — `main` への push で自動ビルド＆デプロイ

GitHub 側の設定：

1. **Settings → Pages → Build and deployment → Source** を **「GitHub Actions」** に
2. **Settings → Pages → Custom domain** に `www.oyamimamori.jp` を設定
3. DNS で `www` の CNAME を `<ユーザー名>.github.io` に向ける（apex を使う場合は A/ALIAS レコードを設定）
4. DNS 反映後、**Enforce HTTPS** を有効化

### 設定変更が必要な場合

- **GitHub Pages プロジェクトサイトに戻す場合**: `SITE_URL` を `https://<ユーザー名>.github.io`、
  `BASE_PATH` を `'/<リポジトリ名>'` に変更し、`public/CNAME` を削除
- **別の独自ドメインに変更する場合**: `SITE_URL`、`public/CNAME`、`public/robots.txt` の
  `Sitemap:` URL を新ドメインに変更
- （任意）`public/og-default.svg` をブランドの OGP 画像に差し替え

### 広告（Google AdSense）と問い合わせ先

- `src/consts.ts` の `CONTACT_EMAIL` を、実際に受信できるメールアドレスに変更
  （お問い合わせ・プライバシーポリシー・運営者情報ページに表示されます）
- AdSense 審査通過後、`src/consts.ts` の `ADSENSE_CLIENT_ID` に
  `ca-pub-XXXXXXXXXXXXXXXX` を設定。空のあいだは広告タグも読み込みスクリプトも
  一切出力されません。広告は本番ビルドでのみ表示されます。
- 広告枠は `src/components/AdSlot.astro`。記事下に設置済みで、未設定時は何も表示しません。

## 記事の追加方法

`src/content/articles/` に Markdown ファイルを追加します。

```markdown
---
title: 記事タイトル
description: 検索結果に表示される説明（120 文字程度）
category: elderly-care   # consts.ts の CATEGORIES の slug
tags: [タグ1, タグ2]
pubDate: 2026-06-20
featured: false          # true でトップページの注目記事に
---

本文（Markdown）。他記事へは /articles/<slug> で内部リンク。
```

カテゴリーの追加・変更は `src/consts.ts` の `CATEGORIES` を編集してください。
