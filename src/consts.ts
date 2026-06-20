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
export const SITE_TITLE = '親みまもり研究所｜家族の見守り・安否確認の情報メディア';
export const SITE_DESCRIPTION =
  '離れて暮らす親や子どもの見守り、安否確認、防災・防犯について、専門的かつ実践的な情報をお届けする情報メディアです。毎日の「元気だよ」を家族に届ける見守りアプリ「Roll Call」もご紹介しています。';

export const SITE_LOCALE = 'ja_JP';
export const SITE_LANG = 'ja';

export const AUTHOR = '親みまもり研究所 編集部';

// ---------------------------------------------------------------------
// App (Roll Call) — download links
// ---------------------------------------------------------------------
export const APP_NAME = 'Roll Call（ロールコール）';
export const APP_TAGLINE = '毎日の「元気だよ」を、ワンタップで家族に。';
export const APP_DESCRIPTION =
  'Roll Call は、毎日の安否確認をワンタップで完了できる見守りアプリです。離れて暮らす家族同士で「今日も元気」をシンプルに共有でき、高齢の親や一人暮らしの家族の見守りに最適です。';

export const APP_IOS_URL =
  'https://apps.apple.com/in/app/iq121-roll-call-daily-check-in/id6758536104';
export const APP_ANDROID_URL =
  'https://play.google.com/store/apps/details?id=com.iq121.rollcall&hl=ja';

// ---------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------
export interface Category {
  slug: string;
  name: string;
  description: string;
  emoji: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: 'elderly-care',
    name: '高齢者の見守り',
    description:
      '離れて暮らす高齢の親を見守るための方法、サービス、心構えを解説します。一人暮らしの親が心配な方へ。',
    emoji: '👵',
  },
  {
    slug: 'safety-check',
    name: '安否確認・防災',
    description:
      '災害時や緊急時の安否確認、家族で備えておきたい防災の知識をまとめています。',
    emoji: '🛟',
  },
  {
    slug: 'child-safety',
    name: '子どもの安全',
    description:
      '子どもの登下校や留守番の見守り、防犯対策など、子育て世代に役立つ情報をお届けします。',
    emoji: '🎒',
  },
  {
    slug: 'family-communication',
    name: '家族のつながり',
    description:
      '離れていても家族のつながりを保つコミュニケーションの工夫やヒントを紹介します。',
    emoji: '💬',
  },
  {
    slug: 'app-guide',
    name: 'アプリ活用ガイド',
    description:
      '見守りアプリ「Roll Call」の使い方や、見守りツールの選び方を詳しく解説します。',
    emoji: '📱',
  },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

// ---------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------
export const NAV_LINKS = [
  { href: '/', label: 'ホーム' },
  { href: '/articles', label: '記事一覧' },
  { href: '/categories', label: 'カテゴリー' },
  { href: '/about', label: '当サイトについて' },
];
