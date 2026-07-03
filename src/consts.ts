// =====================================================================
// Site-wide constants.
//
// Deployment target: custom domain (served at the domain root)
//   https://www.oyamimamori.jp/
//
// SITE_URL  = the site origin (custom domain).
// BASE_PATH = URL base path. Empty for a custom domain (root).
//             For a GitHub Pages project site it would be '/<repo-name>'.
//
// NOTE: public/CNAME must contain the custom domain so GitHub Pages
// serves the site at the domain root.
// =====================================================================

export const SITE_URL = 'https://www.oyamimamori.jp';
export const BASE_PATH = '';

export const SITE_NAME = '親みまもり研究所';
export const SITE_TITLE = '親みまもり研究所｜離れて暮らす親子のための、安心確認と家族の記録';
export const SITE_DESCRIPTION =
  '離れて暮らす親子のための、安心確認と家族の記録。親の見守り・安否確認から、親子双方の安心確認、レシピ・写真・動画などの家族の記録、重要情報の整理まで。見守りは監視ではなく、安心の確認。必要な情報を、必要な相手に、必要なタイミングで届けるための情報をまとめています。';
// サブコピー（ヒーロー等で使用）
export const SITE_TAGLINE = '親を見守る。子を想う。家族の記録を、安心できる場所に残す。';

export const SITE_LOCALE = 'ja_JP';
export const SITE_LANG = 'ja';

// 運営者情報（お問い合わせ・運営者表示・著作者に使用）
export const AUTHOR = '親みまもり研究所 編集部';
export const OPERATOR = '親みまもり研究所 編集部';

// お問い合わせ先メールアドレス（参考用）。
// ※ 公開ページには直接表示・mailtoリンクしない方針。問い合わせは /contact のフォーム
//    （Google Apps Script）経由で受け付け、通知先メールは GAS 側で設定する。
export const CONTACT_EMAIL = 'henry@iq121.com';

// ---------------------------------------------------------------------
// Google AdSense
//
// 審査通過後に発行される「ca-pub-XXXXXXXXXXXXXXXX」を設定してください。
// 空文字のあいだは広告コードもプレースホルダーも一切出力されません。
// 広告は本番ビルド（import.meta.env.PROD）でのみ表示されます。
// ---------------------------------------------------------------------
export const ADSENSE_CLIENT_ID = ''; // 例: 'ca-pub-1234567890123456'

// ---------------------------------------------------------------------
// 忍者AdMax 広告タグ（本番ビルドのみ表示・スマホ対応のレスポンシブ枠）
//
// 最適化のしかた：
//  - ユニットIDを差し替えるだけで枠を入れ替え・A/Bできます。
//  - 空文字にするとその枠は出力されません（記事中だけ/記事下だけ も可能）。
//  - 配置・密度ルールは Ads/strategy/ad_optimization_balance_*.md を参照。
//
// ※ 広告“配信の認証”には別途 public/ads.txt（販売者リスト）が必要です。
// ---------------------------------------------------------------------
// 記事下（関連記事の下・/app CTA より下）
export const ADMAX_TAG_SRC =
  'https://adm.shinobi.jp/s/0937cd67c11152e687f7d6a496f41824';
// 記事中（最初の見出しの直後に1枠・rehypeで自動挿入）
export const ADMAX_TAG_SRC_IN_ARTICLE =
  'https://adm.shinobi.jp/s/efc7d07663ae3f526ba4974dd64e79bd';

// ---------------------------------------------------------------------
// Google Analytics 4
//
// 計測タグは本番ビルド（import.meta.env.PROD）でのみ出力されます。
// ローカル / 開発（npm run dev）では出力されません。
// 空文字にすると計測タグは一切出力されません。
// ---------------------------------------------------------------------
export const GA_MEASUREMENT_ID = 'G-X4JJ4KQQG6';

// ---------------------------------------------------------------------
// アプリ（Roll Call）— ダウンロードリンク
// ---------------------------------------------------------------------
export const APP_NAME = 'Roll Call（ロールコール）';
export const APP_TAGLINE = '毎日電話しなくても、家族の「無事」がわかる。';
export const APP_DESCRIPTION =
  '離れて暮らす家族が、その日の体調や無事をワンタップで知らせ合えるアプリです。電話のように相手の時間を気にせず、「今日も変わりないよ」を気軽に共有できます。利用は無料です。';

// CTA 文言（押し売り感を避けた、落ち着いた表現）
export const APP_CTA_LABEL = '無料で見守りを始める';
export const APP_CTA_IOS = 'App Storeで無料ダウンロード';
export const APP_CTA_ANDROID = 'Google Playで無料ダウンロード';

export const APP_IOS_URL =
  'https://apps.apple.com/jp/app/iq121-roll-call-daily-check-in/id6758536104';
export const APP_ANDROID_URL =
  'https://play.google.com/store/apps/details?id=com.iq121.rollcall&hl=ja&gl=JP';

// ---------------------------------------------------------------------
// IQ121 公式アプリ（Legacy Planner / Storage）— ダウンロードリンク
//
// Roll Call（毎日の安否確認）とは別の、家族の記録・重要情報整理アプリ。
// キャンペーンコードにより対象期間中無料で試せる（保証・永続無料とは書かない）。
// ---------------------------------------------------------------------
export const IQ121_APP_NAME = 'IQ121';
export const IQ121_IOS_URL =
  'https://apps.apple.com/jp/app/iq121-legacy-planner-storage/id6476048879';
export const IQ121_ANDROID_URL =
  'https://play.google.com/store/apps/details?id=com.iq.iq121&hl=ja';

// ---------------------------------------------------------------------
// Google Apps Script フォーム・バックエンド
//
// 投資家問い合わせ / Early Adopter 登録の送信先（GAS Web App）。
// これは公開エンドポイントであり、秘密情報ではありません（.env 不要）。
// 送信は必ず Content-Type: text/plain;charset=utf-8 で JSON 文字列を送ること。
// ---------------------------------------------------------------------
export const GOOGLE_APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwq1MVReldpB9ecckaRy4HyBtRD9dBUgwPDn5c70myZfynlE5uTMedRoIvQjtq4vYZ3/exec';

// ---------------------------------------------------------------------
// 人気記事（サイドバー用・手動キュレーション）
//   存在しない slug は表示時に自動スキップされます。表示は最大5件。
// ---------------------------------------------------------------------
export const POPULAR_SLUGS = [
  'hanarete-kurasu-oya-mimamori',
  'oya-anpi-kakunin-mainichi',
  'family-recipe-photo-record',
  'inheritance-important-info-young-people',
  'mimamori-app-erabikata',
  // 予備（上のslugが存在しない場合の繰り上げ候補）
  'teiden-tsushin-shougai-renraku',
  'jikka-mobile-battery-bichiku',
  'mothers-recipe-family-record',
  'parent-child-meal-checkin',
  'parent-child-emergency-information-sharing',
  'when-to-share-important-family-information',
  'family-information-security-basics',
  'line-family-important-info-sharing',
  'smartphone-lost-family-preparation',
];

// サイドバー下部の忍者AdMaxタグ（未設定のあいだはプレースホルダー枠のみ）。
// 実タグを入れる場合はここに src を設定（本番ビルドでのみ描画）。
export const ADMAX_TAG_SRC_SIDEBAR = '';

// ---------------------------------------------------------------------
// カテゴリー
//   icon … 絵文字を使わず、CSS の丸アイコンに表示する 1 文字のラベル
// ---------------------------------------------------------------------
export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: 'elderly-care',
    name: '高齢者の見守り',
    description:
      '一人暮らしの親が心配な方へ。離れて暮らす高齢の親を見守る方法や、介護・認知症と向き合うときの考え方をまとめています。',
    icon: '親',
  },
  {
    slug: 'safety-check',
    name: '安否確認',
    description:
      '毎日電話するのは大変——そんな方へ。無理なく「無事かどうか」を確かめ合う方法や、続けるための工夫を紹介します。',
    icon: '安',
  },
  {
    slug: 'disaster',
    name: '防災と緊急連絡',
    description:
      '地震や災害で連絡が取れないと不安なものです。いざというときに家族とつながるための備えと連絡手段をまとめています。',
    icon: '防',
  },
  {
    slug: 'family-communication',
    name: '離れて暮らす家族',
    description:
      '離れていても、家族のつながりは保てます。気をつかいすぎず、自然に連絡を続けるためのヒントを紹介します。',
    icon: '家',
  },
  {
    slug: 'app-guide',
    name: '見守りアプリ活用',
    description:
      '見守りアプリやツールの選び方、使い方を解説します。スマホが苦手な親でも使えるか、という視点も大切にしています。',
    icon: 'ア',
  },
  {
    slug: 'oyako-anshin',
    name: '親子の安心確認',
    description:
      '見守りは、子が親を見るだけではありません。親も子を想うもの。食事の写真ひとつでも伝わる、親子双方の「安心確認」の工夫を紹介します。',
    icon: '子',
  },
  {
    slug: 'oya-recipe',
    name: '親のレシピ・家族の食卓',
    description:
      '親の味、実家のごはん、家族の食卓。料理の写真やレシピを「食の記録」として残し、家族で共有するための考え方をまとめています。',
    icon: '食',
  },
  {
    slug: 'family-record',
    name: '家族の記録',
    description:
      '写真・動画・思い出・家系のこと。家族の記録を無理なく残し、整理するためのヒントを紹介します。記録は、家族の会話を増やす時間にもなります。',
    icon: '記',
  },
  {
    slug: 'important-info',
    name: '重要情報の共有',
    description:
      '相続・もしもの備え・デジタル終活。年齢に関係なく、大切な情報を整理し、必要な相手に、必要なタイミングで届けるための考え方をまとめています。',
    icon: '備',
  },
  {
    slug: 'family-security',
    name: '家族のセキュリティ',
    description:
      '家族の写真・レシピ・重要情報の守り方。パスワードや多要素認証の基本から、日常の連絡と大切な記録の置き場所の分け方まで、やさしく解説します。',
    icon: '守',
  },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

// ---------------------------------------------------------------------
// ナビゲーション
// ---------------------------------------------------------------------
export const NAV_LINKS = [
  { href: '/', label: 'ホーム' },
  { href: '/articles', label: '記事一覧' },
  { href: '/categories', label: 'カテゴリー' },
  { href: '/app', label: 'アプリを見る' },
  { href: '/iq121-japan', label: 'IQ121 Japan' },
  { href: '/about', label: '運営者情報' },
];

// フッターのサイト情報リンク（AdSense 審査で求められる固定ページ）
export const FOOTER_INFO_LINKS = [
  { href: '/about', label: '運営者情報' },
  { href: '/contact', label: 'お問い合わせ' },
  { href: '/privacy', label: 'プライバシーポリシー' },
  { href: '/disclaimer', label: '免責事項' },
  { href: '/terms', label: '利用規約' },
];
