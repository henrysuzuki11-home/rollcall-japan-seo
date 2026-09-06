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

export type A8ServiceApprovalStatus = 'approved' | 'pending' | 'paused' | 'ended';

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
  /** 終了日（管理用・公開しない） */
  endedAt?: string;
  /** 停止/終了の理由コード（管理用・公開しない） */
  reason?: string;
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

// ---------------------------------------------------------------------
// 【2026-07-23 家族信託プログラム 提携解除】
//   広告主から提携解除の通知を受領したため、広告を即時停止。
//   クリックURL・バナー画像URL・成果計測ピクセルURLは、誤って再描画されることが
//   ないよう、このソース（＝公開ビルドの入力）から完全に除去した。
//   契約・識別子などの履歴は Ops/affiliate-listing-report-20260724.md に記録。
//   掲載していた記事は、広告に依存しない一般解説記事として内容を維持している。
// ---------------------------------------------------------------------
export const A8_SERVICE_ADS: Record<string, A8ServiceAd> = {
  // 特殊清掃（孤独死後の部屋の清掃・消臭・原状回復の相談先の一つ）。
  // A8で承認済みの通常広告。href/img/計測1px/a8mat/aid/mid/wid/eno/mc は発行値のまま。
  // 成果条件はWEB見積り申込後の成約。電話問い合わせは成果対象外のため、CTAは
  // 「WEBから見積もりを相談する」に限定し、電話誘導はしない（本文にも書かない）。
  'tokushu-seiso': {
    id: 'tokushu-seiso',
    network: 'a8',
    advertiserName: '特殊清掃サービス',
    programName: 'tokushu-seiso',
    programId: 's00000014894',
    clickUrl: 'https://px.a8.net/svt/ejp?a8mat=4BC4QT+E2NXCQ+36X8+2NAN35',
    imageUrl: 'https://www21.a8.net/svt/bgt?aid=260906501851&wid=002&eno=01&mid=s00000014894016006000&mc=1',
    trackingPixelUrl: 'https://www18.a8.net/0.gif?a8mat=4BC4QT+E2NXCQ+36X8+2NAN35',
    imageWidth: 300,
    imageHeight: 250,
    category: 'tokushu-seiso',
    isActive: true,
    approvalStatus: 'approved',
    disclosure: 'PR',
    title: 'WEBで特殊清掃の見積もりを相談する',
    description:
      '発見まで時間が経過している、臭い・汚れが残っているなど、通常の清掃では難しい場合の相談先の一つです。作業範囲や見積り条件を確認したうえで検討できます。',
    cta: 'WEBから特殊清掃の見積もりを相談する',
    imageAlt: '特殊清掃サービスの広告',
    placementArticles: ['oya-kodokushi-tokushu-seiso'],
    notes: [
      '成果条件はWEB見積り申込後の成約。電話問い合わせは成果対象外のため電話誘導しない。',
      'デリケートな話題のため、煽り・恐怖訴求・断定表現を避ける。',
    ],
  },
  'oyatoko-family-trust': {
    id: 'oyatoko-family-trust',
    network: 'a8',
    advertiserName: '',
    programName: '',
    programId: '',
    // 提携解除のため広告コードは保持しない（空＝描画不可）
    clickUrl: '',
    imageUrl: '',
    trackingPixelUrl: '',
    imageWidth: 0,
    imageHeight: 0,
    category: 'family-trust',
    isActive: false,
    approvalStatus: 'ended',
    endedAt: '2026-07-23',
    reason: 'advertiser_terminated',
    disclosure: 'PR',
    title: '',
    description: '',
    cta: '',
    imageAlt: '',
    placementArticles: [],
    notes: [
      '2026-07-23 広告主より提携解除の通知を受領。広告コードは削除済み。',
      '再開の予定はない。復活させる場合は新規にA8で提携し直すこと。',
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
