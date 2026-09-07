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
  // 松井証券（証券口座）。金融商品を扱うため、松井証券アフィリエイト広告掲載
  // ガイドライン（2023/11/1版・確認日2026-09-07）に厳密に従う。
  //   禁止：断定的・扇動的表現、「業界No.1/断然有利/絶対儲かる/必勝」等、元本保証との
  //   誤認（元本保証/予想利回り/高利回り等）、リスク記載の著しい過少、初心者でも容易に
  //   利益が得られる印象、成功例のみの紹介、過度な取引誘導、バナーの改変・独自保有、
  //   会社名を含むリスティング購入。必須：広告/PRの明示、十分なリスク記載、日付併記。
  //   → 表示コピーは投資勧誘にならない中立表現に限定し、必ず元本割れリスクに触れる。
  //   掲載は「資産形成/資産管理」文脈の記事のみ（見守り記事等には出さない）。
  'matsui-shoken': {
    id: 'matsui-shoken',
    network: 'a8',
    advertiserName: '松井証券',
    programName: 'matsui-shoken',
    programId: 's00000018318001',
    clickUrl: 'https://px.a8.net/svt/ejp?a8mat=4BC4QS+6D7WOI+3XCC+6GRMP',
    imageUrl: 'https://www28.a8.net/svt/bgt?aid=260906500385&wid=001&eno=01&mid=s00000018318001086000&mc=1',
    trackingPixelUrl: 'https://www12.a8.net/0.gif?a8mat=4BC4QS+6D7WOI+3XCC+6GRMP',
    imageWidth: 300,
    imageHeight: 250,
    category: 'finance',
    isActive: true,
    approvalStatus: 'approved',
    disclosure: 'PR',
    title: '自分の資産形成を考えるなら（証券口座の選択肢）',
    description:
      'NISAや投資信託・株式などを扱う証券会社の一つです。口座開設・サービス内容・手数料は公式サイトの最新情報をご確認ください。投資には価格変動があり、元本割れとなる可能性があります。',
    cta: '松井証券のサービス内容を確認する',
    imageAlt: '松井証券の証券口座サービスの広告',
    placementArticles: ['oya-shisan-seiri'],
    notes: [
      '成果地点は新規口座開設完了（WEB申込、申込後30日以内の開設完了）。資料請求経由等は成果対象外。成果地点を誤認させる記載をしない。',
      'ガイドライン遵守：断定・比較優良・元本保証誤認・リスク過少を避け、必ずリスクに触れる。',
    ],
  },
  // 松井証券 iDeCo。上記と同じガイドラインに従う。制度（掛金上限・加入年齢・税制）は
  // 改正が予定されており、古いPR文のみを根拠にしない。表示は中立・リスク明記に限定し、
  // 具体的制度数値は本文側で「時点」「公式確認」を明示して扱う。掲載はiDeCo記事のみ。
  'matsui-ideco': {
    id: 'matsui-ideco',
    network: 'a8',
    advertiserName: '松井証券 iDeCo',
    programName: 'matsui-ideco',
    programId: 's00000018318002',
    clickUrl: 'https://px.a8.net/svt/ejp?a8mat=4BC4QS+6DTCAA+3XCC+BYT9D',
    imageUrl: 'https://www23.a8.net/svt/bgt?aid=260906500386&wid=001&eno=01&mid=s00000018318002010000&mc=1',
    trackingPixelUrl: 'https://www10.a8.net/0.gif?a8mat=4BC4QS+6DTCAA+3XCC+BYT9D',
    imageWidth: 300,
    imageHeight: 250,
    category: 'finance',
    isActive: true,
    approvalStatus: 'approved',
    disclosure: 'PR',
    title: 'iDeCo（私的年金）の選択肢を調べる',
    description:
      'iDeCoは老後資金づくりの制度の一つです。掛金が所得控除の対象になる一方、原則60歳まで引き出せず、運用による元本割れの可能性もあります。制度・手数料・加入条件は公式サイトの最新情報をご確認ください。',
    cta: '松井証券のiDeCoについて確認する',
    imageAlt: '松井証券のiDeCo（個人型確定拠出年金）サービスの広告',
    placementArticles: ['ideco-kihon-oya-to-jibun'],
    notes: [
      '成果地点は新規口座開設申込（WEB経由で手続き完了）。成果地点を誤認させる記載をしない。',
      'iDeCoのメリットとデメリット（60歳まで引き出せない・手数料・元本割れ）を公平に併記する。',
    ],
  },
  // ミライアス「スマート仲介」（ミライアス株式会社）。相続した不動産（マンション・戸建・
  // 土地）の売却を検討する段階での「売却査定」の相談先の一つ。
  // A8で承認済みの通常広告。href/img/計測1px/a8mat/aid/mid/wid/eno/mc は発行値のまま。
  //
  // 【役割分担】相続手続きそのものは nocos、相続した不動産の売却査定はミライアス、と
  // CVを分ける（1記事1メインCV）。売却検討記事にのみ掲載し、手続き記事には出さない。
  // 【対象エリア】東京都・神奈川県・埼玉県・千葉県。エリア外は成果対象外のため、CTA付近に
  // 対象エリアを必ず明示する（本文・note で表示）。対象物件はマンション・戸建・土地。
  // 断定・比較優良（日本初/No.1/必ず高く売れる/他社より高く 等）は根拠確認なしに使わない。
  'miraias-satei': {
    id: 'miraias-satei',
    network: 'a8',
    advertiserName: 'ミライアス スマート仲介',
    programName: 'miraias-smart-chukai',
    programId: 's00000021019001',
    clickUrl: 'https://px.a8.net/svt/ejp?a8mat=4BC4QT+DGMVYY+4I6M+65ME9',
    imageUrl: 'https://www25.a8.net/svt/bgt?aid=260906501814&wid=002&eno=01&mid=s00000021019001034000&mc=1',
    trackingPixelUrl: 'https://www17.a8.net/0.gif?a8mat=4BC4QT+DGMVYY+4I6M+65ME9',
    imageWidth: 300,
    imageHeight: 250,
    category: 'real-estate',
    isActive: true,
    approvalStatus: 'approved',
    disclosure: 'PR',
    title: '相続した実家の売却を検討するなら、まず査定を',
    description:
      '相続したマンション・戸建・土地の「今の価値」を、WEBから無料で売却査定に申し込めるサービスです。囲い込みをしない仲介の仕組みや、宅建士による対応、VR内見への対応などの特徴があります。対象エリアは東京都・神奈川県・埼玉県・千葉県です。',
    cta: '無料で査定を申し込む',
    imageAlt: '相続した不動産の売却査定サービスの広告',
    placementArticles: ['jikka-sozoku-uru-nokosu-kasu'],
    notes: [
      '成果は WEB経由の売却査定申込＋30日以内の本人確認完了。対象エリア外は成果対象外。',
      '対象エリア：東京都・神奈川県・埼玉県・千葉県。対象物件：マンション・戸建・土地。',
      'クリック＝査定ではないと分かる表現にする。断定・比較優良表現は使わない。',
    ],
  },
  // 相続手続きの「nocos」（NCPグループ運営）。相続発生後（親族が亡くなった後）の
  // 名義変更・相続登記・遺産分割などの手続きをまとめて相談できる相談先の一つ。
  // A8で承認済みの通常広告。href/img/計測1px/a8mat/aid/mid/wid/eno/mc は発行値のまま。
  //
  // 【送客文脈の限定】成果対象は「相続発生後」の相談のみ。生前相談・遺言・生前贈与・
  // 生前の相続税対策・成年後見・死後事務委任・家族信託・相続放棄・限定承認・確定申告
  // 等（相続発生前の相談）は成果対象外。したがって本広告は「親が亡くなった後にやること」
  // 系の記事にのみ掲載し、生前対策・遺言・家族信託の記事には掲載しない（placementで制御）。
  // CTAは資料請求（WEB完了）を基本とする。
  'nocos-sozoku': {
    id: 'nocos-sozoku',
    network: 'a8',
    advertiserName: '相続手続きのnocos',
    programName: 'nocos',
    programId: 's00000026317001',
    clickUrl: 'https://px.a8.net/svt/ejp?a8mat=4BC4QS+5GH36I+5N2A+5ZU29',
    imageUrl: 'https://www25.a8.net/svt/bgt?aid=260906500330&wid=002&eno=01&mid=s00000026317001007000&mc=1',
    trackingPixelUrl: 'https://www13.a8.net/0.gif?a8mat=4BC4QS+5GH36I+5N2A+5ZU29',
    imageWidth: 300,
    imageHeight: 250,
    category: 'inheritance',
    isActive: true,
    approvalStatus: 'approved',
    disclosure: 'PR',
    title: '相続手続きをまとめて相談したい方へ',
    description:
      '亡くなった後の名義変更・相続登記・遺産分割などの手続きを、相続に慣れた専門家へまとめて相談できる相談先の一つです。初回相談は無料、全国のオンライン・訪問・来所に対応しています。',
    cta: '無料で資料請求する',
    imageAlt: '相続手続きの相談サービスの広告',
    placementArticles: ['oya-nakunatta-ato-yarukoto'],
    notes: [
      '成果対象は相続発生後の相談のみ。生前対策・遺言・家族信託・相続放棄等は成果対象外。',
      '送客文脈は必ず「相続発生後」に限定する。生前対策の記事には掲載しない。',
      '断定・過度なNo.1表現・広告主PR文の転載は避ける。',
    ],
  },
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
