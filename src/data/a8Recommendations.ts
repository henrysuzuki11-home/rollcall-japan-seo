// =====================================================================
// トップページ「親との時間を、もっと楽しむ」セクションのA8.net提携広告。
//
// 方針：
//  - A8.netから発行された href / img src / 計測1px画像 / a8mat / aid / mid は
//    一切改変しない（トラッキング維持）。表示コピー（theme/title/description/cta）
//    のみ当サイトの編集文言。
//  - 各カードに PR 表記／リンクは rel="nofollow sponsored noopener" + target="_blank"。
//  - コンプライアンス：
//     ・CAMPFIRE は「クラウドファンディングによる支援購入・応援」。投資・資産運用・
//       儲かる・リターン目的 等の金融/投資商品表現は使わない。
//     ・動画講座は完全初心者向けではない。「誰でも簡単」「未経験からすぐ稼げる」
//       「初心者でも安心」等の誤解を招く表現は使わない。
// =====================================================================

export interface A8Recommendation {
  /** 管理・計測用ID */
  id: string;
  /** GA計測に送る広告主名（表示はしない） */
  advertiserName: string;
  /** カード上部の小見出し（テーマ） */
  theme: string;
  /** 補足ラベル（任意） */
  tags?: string[];
  title: string;
  description: string;
  cta: string;
  /** A8計測リンク（改変しない） */
  clickUrl: string;
  /** A8提供バナー（改変しない） */
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  /** 成果計測1px画像（改変しない・広告1つにつき1回だけ出力） */
  trackingPixelUrl: string;
  imageAlt: string;
}

// 表示順：日本旅行 → 動画教材エディター養成コース → CAMPFIRE
export const A8_RECOMMENDATIONS: A8Recommendation[] = [
  {
    id: 'nihon-ryoko',
    advertiserName: '日本旅行',
    theme: '親との旅行',
    tags: ['国内旅行', 'JR＋宿泊', '家族旅行'],
    title: '親と、秋・冬の旅行へ',
    description:
      '紅葉、温泉、年末年始の旅行など、親と一緒に過ごす時間を旅行でつくってみませんか。移動の負担を抑えた、ゆったりした行程がおすすめです。',
    cta: '旅行プランを見る',
    clickUrl: 'https://px.a8.net/svt/ejp?a8mat=4BC4QT+7VEDI2+Z9G+O7P69',
    imageUrl: 'https://www27.a8.net/svt/bgt?aid=260906501476&wid=002&eno=01&mid=s00000004570004067000&mc=1',
    imageWidth: 300,
    imageHeight: 250,
    trackingPixelUrl: 'https://www15.a8.net/0.gif?a8mat=4BC4QT+7VEDI2+Z9G+O7P69',
    imageAlt: '親との旅行プランの広告',
  },
  {
    id: 'douga-editor',
    advertiserName: '動画教材エディター養成コース',
    theme: '思い出を残す',
    tags: ['動画編集', 'スキルを活かす'],
    title: '家族との思い出を、動画に残す',
    description:
      '旅行や家族の写真を、一本の思い出動画に。すでに動画編集の経験がある方なら、編集スキルをさらに仕事にも活かせます。',
    cta: '動画編集スキルを詳しく見る',
    clickUrl: 'https://px.a8.net/svt/ejp?a8mat=4BC4QS+8PRHCQ+4V0U+ZRALD',
    imageUrl: 'https://www28.a8.net/svt/bgt?aid=260906500527&wid=002&eno=01&mid=s00000022683006006000&mc=1',
    imageWidth: 300,
    imageHeight: 250,
    trackingPixelUrl: 'https://www17.a8.net/0.gif?a8mat=4BC4QS+8PRHCQ+4V0U+ZRALD',
    imageAlt: '動画編集スキルの講座の広告',
  },
  {
    id: 'campfire',
    advertiserName: 'CAMPFIRE',
    theme: '応援する',
    tags: ['クラウドファンディング', '地域・ものづくり'],
    title: '新しい挑戦や地域を、家族で応援する',
    description:
      '地域活性化、新しい商品、文化やものづくりなど、家族で応援したくなるプロジェクトを探してみませんか。クラウドファンディングで、気になる取り組みを支援・応援できます。',
    cta: 'プロジェクトを探す',
    clickUrl: 'https://px.a8.net/svt/ejp?a8mat=4BC4QT+7U7IAI+5XBQ+5ZEMP',
    imageUrl: 'https://www29.a8.net/svt/bgt?aid=260906501474&wid=002&eno=01&mid=s00000027647001005000&mc=1',
    imageWidth: 300,
    imageHeight: 250,
    trackingPixelUrl: 'https://www15.a8.net/0.gif?a8mat=4BC4QT+7U7IAI+5XBQ+5ZEMP',
    imageAlt: 'クラウドファンディングで応援できるプロジェクトの広告',
  },
];
