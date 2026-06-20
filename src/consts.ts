// =====================================================================
// Site-wide constants.
//
// Deployment target: GitHub Pages project site
//   https://henrysuzuki11-home.github.io/rollcall-japan-seo/
//
// SITE_URL  = the GitHub Pages origin (your username .github.io)
// BASE_PATH = the repository name, used as the URL base path.
//             MUST exactly match the GitHub repository name.
//
// If you later move to a custom domain, set SITE_URL to that domain
// and BASE_PATH to '' (empty string).
// =====================================================================

export const SITE_URL = 'https://henrysuzuki11-home.github.io';
export const BASE_PATH = '/rollcall-japan-seo';

export const SITE_NAME = '親みまもり研究所';
export const SITE_TITLE = '親みまもり研究所｜離れて暮らす親の見守りと安否確認';
export const SITE_DESCRIPTION =
  '離れて暮らす親の見守りや安否確認について、毎日の暮らしに役立つ情報をまとめています。一人暮らしの親が心配な方、無理なく続けられる見守りの方法を探している方へ。';

export const SITE_LOCALE = 'ja_JP';
export const SITE_LANG = 'ja';

// 運営者情報（お問い合わせ・運営者表示・著作者に使用）
export const AUTHOR = '親みまもり研究所 編集部';
export const OPERATOR = '親みまもり研究所 編集部';

// TODO: 公開前に、実際に受信できるメールアドレスへ変更してください。
// （Google AdSense の審査では、連絡が取れるお問い合わせ先が必要です）
export const CONTACT_EMAIL = 'info@oyamimamori.jp';

// ---------------------------------------------------------------------
// Google AdSense
//
// 審査通過後に発行される「ca-pub-XXXXXXXXXXXXXXXX」を設定してください。
// 空文字のあいだは広告コードもプレースホルダーも一切出力されません。
// 広告は本番ビルド（import.meta.env.PROD）でのみ表示されます。
// ---------------------------------------------------------------------
export const ADSENSE_CLIENT_ID = ''; // 例: 'ca-pub-1234567890123456'

// ---------------------------------------------------------------------
// アプリ（Roll Call）— ダウンロードリンク
// ---------------------------------------------------------------------
export const APP_NAME = 'Roll Call（ロールコール）';
export const APP_TAGLINE = '毎日電話しなくても、家族の「無事」がわかる。';
export const APP_DESCRIPTION =
  '離れて暮らす家族が、その日の体調や無事をワンタップで知らせ合えるアプリです。電話のように相手の時間を気にせず、「今日も変わりないよ」を気軽に共有できます。利用は無料です。';

// CTA 文言（押し売り感を避けた、落ち着いた表現）
export const APP_CTA_LABEL = '無料で使える安否確認アプリを見る';
export const APP_CTA_IOS = 'iPhoneで見る';
export const APP_CTA_ANDROID = 'Androidで見る';

export const APP_IOS_URL =
  'https://apps.apple.com/in/app/iq121-roll-call-daily-check-in/id6758536104';
export const APP_ANDROID_URL =
  'https://play.google.com/store/apps/details?id=com.iq121.rollcall&hl=ja';

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
