// =====================================================================
// アフィリエイト・サービス広告（A8.net）
//
// 方針：
//  - 「実家整理・生前整理・遺品整理・捨てづらい物の整理」で困ったときの
//    “選択肢の一つ” として自然に紹介する。売り込み・誇大表現はしない。
//  - 記事ごとに関連するサービスだけを frontmatter `affiliateServices` で指定。
//  - リンクは必ず target="_blank" + rel="nofollow sponsored noopener"。
//  - A8 の 1x1 トラッキング画像（trackingPixel）を必ず表示する。
//  - サービス内容・料金・対応エリア・条件は「公式サイトで確認」と明記する。
//  - 商標名を記事タイトル/SEO見出しで強く狙わない（本文でも控えめに）。
// =====================================================================

export type AffiliateServiceId =
  | 'coyash-doll'
  | 'ihinseiri-110'
  | 'life-reset'
  | 'r-cleaning'
  | 'bousai-goods';

export interface AffiliateService {
  id: AffiliateServiceId;
  /** 表示ラベル（PR / 広告） */
  label: string;
  category: string;
  title: string;
  description: string;
  cta: string;
  url: string;
  imageUrl: string;
  trackingPixel: string;
  /** サイドバー等の表示順（小さいほど上） */
  priority: number;
  /** 「整理に困った時の選択肢」サイドバーに載せるか（防災系は本文カードのみ） */
  inSidebar: boolean;
}

export const AFFILIATE_SERVICES: Record<AffiliateServiceId, AffiliateService> = {
  'coyash-doll': {
    id: 'coyash-doll',
    label: 'PR',
    category: '人形・骨董品の整理',
    title: '実家に残った人形、処分する前に',
    description:
      '雛人形・日本人形・西洋人形など、捨てづらい品の整理に。処分する前に、買取という選択肢を確認できます。',
    cta: '人形の整理方法を確認する',
    url: 'https://px.a8.net/svt/ejp?a8mat=4B7T8Z+16V8C2+5BZE+5ZEMP',
    imageUrl:
      'https://www28.a8.net/svt/bgt?aid=260704979072&wid=001&eno=01&mid=s00000024881001005000&mc=1',
    trackingPixel: 'https://www10.a8.net/0.gif?a8mat=4B7T8Z+16V8C2+5BZE+5ZEMP',
    priority: 1,
    inSidebar: true,
  },
  'ihinseiri-110': {
    id: 'ihinseiri-110',
    label: 'PR',
    category: '遺品整理・生前整理',
    title: '家族だけで片付けるのが難しい時に',
    description:
      '遺品整理や生前整理で、思い出の品や書類が多く家族だけでは進めにくい時の相談先です。',
    cta: '遺品整理の相談先を確認する',
    url: 'https://px.a8.net/svt/ejp?a8mat=4B7T8Z+CI4HE+39GM+5MHB4H',
    imageUrl:
      'https://www26.a8.net/svt/bgt?aid=260704979021&wid=001&eno=01&mid=s00000015223034009000&mc=1',
    trackingPixel: 'https://www13.a8.net/0.gif?a8mat=4B7T8Z+CI4HE+39GM+5MHB4H',
    priority: 2,
    inSidebar: true,
  },
  'life-reset': {
    id: 'life-reset',
    label: 'PR',
    category: '遺品整理・生前整理',
    title: '生前整理・遺品整理を相談したい時に',
    description:
      '遠方の実家整理や、施設入居後の家の片付けなど、家族だけで抱え込みにくい場面の選択肢です。',
    cta: '整理の相談先を確認する',
    url: 'https://px.a8.net/svt/ejp?a8mat=4B7T8Z+JNBQQ+36X8+1ZGVGH',
    imageUrl:
      'https://www22.a8.net/svt/bgt?aid=260704979033&wid=001&eno=01&mid=s00000014894012004000&mc=1',
    trackingPixel: 'https://www18.a8.net/0.gif?a8mat=4B7T8Z+JNBQQ+36X8+1ZGVGH',
    priority: 3,
    inSidebar: true,
  },
  'r-cleaning': {
    id: 'r-cleaning',
    label: 'PR',
    category: '大型家具・不用品整理',
    title: '大型家具や家電の整理に困ったら',
    description:
      '実家の片付けで、家族だけでは運び出せない家具や家電がある時の選択肢です。',
    cta: '片付けサービスを確認する',
    url: 'https://px.a8.net/svt/ejp?a8mat=4B7T8Z+1AFTYQ+4X26+NV1XD',
    imageUrl:
      'https://www20.a8.net/svt/bgt?aid=260704979078&wid=001&eno=01&mid=s00000022947004008000&mc=1',
    trackingPixel: 'https://www12.a8.net/0.gif?a8mat=4B7T8Z+1AFTYQ+4X26+NV1XD',
    priority: 4,
    inSidebar: true,
  },
  'bousai-goods': {
    id: 'bousai-goods',
    label: 'PR',
    category: '防災グッズ・備え',
    title: '実家と家族の防災グッズを備えるなら',
    description:
      '離れて暮らす親の家や自宅の備えに。防災グッズを一式でそろえたい時の選択肢の一つです。',
    cta: '防災グッズを確認する',
    url: 'https://px.a8.net/svt/ejp?a8mat=4B65SJ+22F7EA+5HQC+5YZ75',
    imageUrl:
      'https://www21.a8.net/svt/bgt?aid=260627923125&wid=001&eno=01&mid=s00000025626001003000&mc=1',
    trackingPixel: 'https://www15.a8.net/0.gif?a8mat=4B65SJ+22F7EA+5HQC+5YZ75',
    priority: 5,
    inSidebar: false,
  },
};

/** frontmatter で指定された id 順にサービスを取り出す（不明idは無視）。 */
export function getServicesByIds(ids: string[] = []): AffiliateService[] {
  return ids
    .map((id) => AFFILIATE_SERVICES[id as AffiliateServiceId])
    .filter((s): s is AffiliateService => Boolean(s));
}

/** サイドバー用：inSidebar のサービスを priority 順で返す（整理系の4件）。 */
export function getAllServicesByPriority(): AffiliateService[] {
  return Object.values(AFFILIATE_SERVICES)
    .filter((s) => s.inSidebar)
    .sort((a, b) => a.priority - b.priority);
}

/** 共通の広告表記（開示文）。 */
export const AFFILIATE_DISCLOSURE_TEXT =
  '当サイトではアフィリエイト広告を利用しています。掲載しているサービスは、必要に応じた選択肢の一つとして紹介しており、利用を強制するものではありません。サービス内容・料金・対応エリア・条件等は、必ず公式サイトでご確認ください。';
