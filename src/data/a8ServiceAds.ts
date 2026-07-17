// =====================================================================
// A8.net サービス系広告（季節・ギフト系や実家整理系とは別枠）
//
// 方針：
//  - 専門相談などの「選択肢の一つ」として、記事内容に関連する記事にのみ静かに紹介する。
//  - 広告主提供のPR文は転載しない（表示文は当サイトの自作コピー）。
//  - 広告主名・サービス名をSEOタイトル/H1で狙わない。リスティング出稿もしない。
//  - 事業提携・協業ではなく、A8.netで承認された通常のアフィリエイト広告として扱う。
//  - 成果条件・報酬額は内部管理情報（Ops参照）。公開記事本文には記載しない。
//  - ASPのURL・計測パラメータは一切変更しない。
// =====================================================================

export type A8ServiceApprovalStatus = 'approved' | 'pending' | 'ended';

export interface A8ServiceAd {
  id: string;
  network: 'a8';
  advertiserName: string;
  programName: string;
  programId: string;
  /** A8計測リンク（変更しない） */
  clickUrl: string;
  /** A8提供バナー（変更しない） */
  imageUrl: string;
  /** 成果計測ピクセル（広告1表示につき1つだけ出力） */
  trackingPixelUrl: string;
  imageWidth: number;
  imageHeight: number;
  category: string;
  isActive: boolean;
  approvalStatus: A8ServiceApprovalStatus;
  disclosure: 'PR';
  // --- 表示用（当サイトの自作コピー） ---
  title: string;
  description: string;
  cta: string;
  imageAlt: string;
  /** 掲載を許可する記事slug（無関係な記事に出さないためのガード） */
  placementArticles: string[];
  notes: string[];
}

export const A8_SERVICE_ADS: Record<string, A8ServiceAd> = {
  'oyatoko-family-trust': {
    id: 'oyatoko-family-trust',
    network: 'a8',
    advertiserName: '株式会社こころのカンパニー',
    programName: '家族信託の「おやとこ」',
    programId: 's00000025525001',
    clickUrl: 'https://px.a8.net/svt/ejp?a8mat=4B65SJ+4G5MIA+5GYA+5YZ75',
    imageUrl:
      'https://www29.a8.net/svt/bgt?aid=260627923269&wid=001&eno=01&mid=s00000025525001003000&mc=1',
    trackingPixelUrl: 'https://www12.a8.net/0.gif?a8mat=4B65SJ+4G5MIA+5GYA+5YZ75',
    imageWidth: 300,
    imageHeight: 250,
    category: 'family-trust',
    isActive: true,
    approvalStatus: 'approved',
    disclosure: 'PR',
    title: '家族信託について専門家へ相談する',
    description:
      '家族信託について、専門家へ相談できるサービスです。相談内容、対応範囲、費用、契約条件はリンク先でご確認ください。',
    cta: '家族信託について相談内容を確認する',
    imageAlt: '家族信託の相談サービス',
    placementArticles: ['dementia-asset-management-family-trust'],
    notes: [
      '提携日 2026-07-17（A8.netで承認済みの通常のアフィリエイト広告）',
      '広告主提供のPR文は転載しない',
      '社名・サービス名・表記ゆれはリスティングNG（検索広告の出稿はしない）',
      '商標狙いの薄い記事（評判・口コミ・費用・クーポン等）は作らない',
      '成果条件・報酬・確定率などの内部条件は Ops/a8-family-trust-oyatoko.md を参照',
      '法律・税務・登記の断定を避け、専門家相談を促す文脈でのみ掲載する',
    ],
  },
};

/** 表示してよいか（有効 × 承認済み × clickUrlあり）。 */
export function isA8ServiceAdVisible(ad: A8ServiceAd): boolean {
  return ad.isActive && ad.approvalStatus === 'approved' && ad.clickUrl !== '';
}

/**
 * idで取得。slugを渡すと placementArticles に含まれる記事のみ返す
 * （家族信託と無関係な記事に出さないためのガード）。
 */
export function getA8ServiceAd(id: string, slug?: string): A8ServiceAd | null {
  const ad = A8_SERVICE_ADS[id];
  if (!ad || !isA8ServiceAdVisible(ad)) return null;
  if (slug && !ad.placementArticles.includes(slug)) return null;
  return ad;
}
