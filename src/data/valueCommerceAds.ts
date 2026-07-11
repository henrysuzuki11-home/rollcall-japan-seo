// =====================================================================
// ValueCommerce 広告（季節・家族イベント系）
//
// 方針：
//  - 親みまもり研究所の本線（終活・家族の情報整理・親の見守り）は崩さない。
//    旅行・買い物は主役ではなく「親と会う/話す/思い出を残すきっかけ」。
//  - 記事ごとに内容に合う広告だけを frontmatter `valueCommerceAds` で指定。
//  - 各カードに PR 表記／リンクに rel="nofollow sponsored noopener" + target="_blank"。
//  - 商標名・サービス名はSEOタイトル/H1/H2で狙わない。公式サイトと誤認させない。
//
// レンダリングについて：
//  VCの jsbanner は document.write を使うため、ページ読み込み後に set:html 等で
//  動的挿入すると表示が崩れる危険がある。そこで本実装では、同一 sid/pid の
//  「静的バナー（referral リンク + gifbanner 画像）＝提供された <noscript> と同等」を
//  安全に描画する。元の script 文字列は raw フィールドに保持（参照用・非描画）。
// =====================================================================

export type VCAdStatus = 'pending_review' | 'active' | 'suspended';

export interface ValueCommerceAd {
  id: string;
  label: string; // PR / 広告
  category: string;
  title: string;
  description: string;
  useFor: string[];
  pid: string;
  /** 元の広告タグ（参照用・そのままは描画しない） */
  raw: string;
  /** この広告を public site に表示してよいか。審査完了までは false。 */
  isActive: boolean;
  /** 審査ステータス。'active' 以外は非表示。 */
  status: VCAdStatus;
  /** 広告ネットワーク識別子。 */
  network: 'valuecommerce';
}

// ---------------------------------------------------------------------
// 審査ゲート（マスタースイッチ）
//   親みまもり研究所はバリューコマース適正審査中。審査中はリンクが有効配信
//   されず、クリックすると「配信する広告リンクが無効…」ページに飛び、
//   バナーも汎用画像になってしまう。そのため審査完了まで VC 広告は
//   public site に一切表示しない（コード・データは残す）。
//
//   審査完了後の再有効化手順：
//     1. VC_GLOBAL_ACTIVE を true にする
//     2. 有効化する広告の isActive を true / status を 'active' にする
//   ※ 個別に段階公開したい場合は VC_GLOBAL_ACTIVE を true にしたうえで、
//     公開する広告だけ isActive:true にする。
// ---------------------------------------------------------------------
export const VC_GLOBAL_ACTIVE = false;

const SID = '3775652';

/** 静的バナーのクリック先（referral）。 */
export function vcReferralUrl(pid: string): string {
  return `https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=${SID}&pid=${pid}`;
}
/** 静的バナー画像（gifbanner）。インプレッション計測を兼ねる。 */
export function vcBannerUrl(pid: string): string {
  return `https://ad.jp.ap.valuecommerce.com/servlet/gifbanner?sid=${SID}&pid=${pid}`;
}

type VCAdBase = Omit<ValueCommerceAd, 'isActive' | 'status' | 'network'>;

const VC_ADS_BASE: Record<string, VCAdBase> = {
  'nta-travel': {
    id: 'nta-travel', label: 'PR', category: '旅行・宿泊',
    title: '親との旅行・帰省の宿を探す',
    description: '帰省や親との温泉旅行、家族旅行を考える時の選択肢です。条件や対象商品は公式サイトでご確認ください。',
    useFor: ['お盆', '帰省', '里帰り', '親との温泉旅行', '三世代旅行'],
    pid: '892656908',
    raw: '<script language="javascript" src="//ad.jp.ap.valuecommerce.com/servlet/jsbanner?sid=3775652&pid=892656908"></script><noscript><a href="//ck.jp.ap.valuecommerce.com/servlet/referral?sid=3775652&pid=892656908" rel="nofollow sponsored noopener"><img src="//ad.jp.ap.valuecommerce.com/servlet/gifbanner?sid=3775652&pid=892656908" border="0"></a></noscript>',
  },
  'outdoor-wear': {
    id: 'outdoor-wear', label: 'PR', category: 'アウトドア・防災',
    title: '家族アウトドアや防災用品を確認する',
    description: '親子三世代の外出や、帰省時の防災・暑さ対策用品を考える時の選択肢です。',
    useFor: ['家族アウトドア', '防災用品', '帰省時の暑さ対策', '親子三世代の外出'],
    pid: '892656909',
    raw: '<script language="javascript" src="//ad.jp.ap.valuecommerce.com/servlet/jsbanner?sid=3775652&pid=892656909"></script><noscript><a href="//ck.jp.ap.valuecommerce.com/servlet/referral?sid=3775652&pid=892656909" rel="nofollow sponsored noopener"><img src="//ad.jp.ap.valuecommerce.com/servlet/gifbanner?sid=3775652&pid=892656909" border="0"></a></noscript>',
  },
  'seasonal-gift': {
    id: 'seasonal-gift', label: 'PR', category: 'ギフト',
    title: '親への季節の贈り物を考える',
    description: 'お中元・お歳暮・手土産など、親と連絡を取るきっかけになる贈り物の選択肢です。',
    useFor: ['お中元', 'お歳暮', '親へのギフト', '実家への手土産'],
    pid: '892656911',
    raw: '<script language="javascript" src="//ad.jp.ap.valuecommerce.com/servlet/jsbanner?sid=3775652&pid=892656911"></script><noscript><a href="//ck.jp.ap.valuecommerce.com/servlet/referral?sid=3775652&pid=892656911" rel="nofollow sponsored noopener"><img src="//ad.jp.ap.valuecommerce.com/servlet/gifbanner?sid=3775652&pid=892656911" border="0"></a></noscript>',
  },
  'yahoo-shopping': {
    id: 'yahoo-shopping', label: 'PR', category: '買い物・実用品',
    title: '親への実用品や防災用品を探す',
    description: '親への実用品、防災用品、見守り家電、小物などを探す時の選択肢です。価格や条件は公式サイトでご確認ください。',
    useFor: ['親への実用品', '防災用品', '見守り家電', '帰省準備', '小物'],
    pid: '892656912',
    raw: '<script language="javascript" src="//ad.jp.ap.valuecommerce.com/servlet/jsbanner?sid=3775652&pid=892656912"></script><noscript><a href="//ck.jp.ap.valuecommerce.com/servlet/referral?sid=3775652&pid=892656912" rel="nofollow sponsored noopener"><img src="//ad.jp.ap.valuecommerce.com/servlet/gifbanner?sid=3775652&pid=892656912" border="0"></a></noscript>',
  },
  'yahoo-shopping-sub': {
    id: 'yahoo-shopping-sub', label: 'PR', category: '買い物・実用品',
    title: '家族のための実用品を確認する',
    description: '帰省・防災・見守り・整理用品など、家族のための買い物に使える選択肢です。',
    useFor: ['防災', '整理用品', '実用品'],
    pid: '892656914',
    raw: '<script language="javascript" src="//ad.jp.ap.valuecommerce.com/servlet/jsbanner?sid=3775652&pid=892656914"></script><noscript><a href="//ck.jp.ap.valuecommerce.com/servlet/referral?sid=3775652&pid=892656914" rel="nofollow sponsored noopener"><img src="//ad.jp.ap.valuecommerce.com/servlet/gifbanner?sid=3775652&pid=892656914" border="0"></a></noscript>',
  },
  'kinokuniya-books': {
    id: 'kinokuniya-books', label: 'PR', category: '本・エンディングノート',
    title: '終活や家族の話し合いに役立つ本を探す',
    description: '終活本、エンディングノート、介護や相続の入門書など、家族で話すきっかけになる本の選択肢です。',
    useFor: ['終活本', 'エンディングノート', '介護本', '親との会話'],
    pid: '892656916',
    raw: '<script language="javascript" src="//ad.jp.ap.valuecommerce.com/servlet/jsbanner?sid=3775652&pid=892656916"></script><noscript><a href="//ck.jp.ap.valuecommerce.com/servlet/referral?sid=3775652&pid=892656916" rel="nofollow sponsored noopener"><img src="//ad.jp.ap.valuecommerce.com/servlet/gifbanner?sid=3775652&pid=892656916" border="0"></a></noscript>',
  },
  'furusato-honpo': {
    id: 'furusato-honpo', label: 'PR', category: 'ふるさと納税・食',
    title: '家族で楽しめる返礼品を確認する',
    description: '家族で楽しむ食材や、親への贈り物を考える時の選択肢です。制度や控除条件は公式サイトでご確認ください。',
    useFor: ['ふるさと納税', '親への食の贈り物', '家族で楽しむ食材'],
    pid: '892656917',
    raw: '<script language="javascript" src="//ad.jp.ap.valuecommerce.com/servlet/jsbanner?sid=3775652&pid=892656917"></script><noscript><a href="//ck.jp.ap.valuecommerce.com/servlet/referral?sid=3775652&pid=892656917" rel="nofollow sponsored noopener"><img src="//ad.jp.ap.valuecommerce.com/servlet/gifbanner?sid=3775652&pid=892656917" border="0"></a></noscript>',
  },
  'jalan-travel': {
    id: 'jalan-travel', label: 'PR', category: '旅行・宿泊',
    title: '親との宿泊・温泉旅行を探す',
    description: '親との温泉旅行や家族旅行、帰省時の宿泊を考える時の選択肢です。予約条件は公式サイトでご確認ください。',
    useFor: ['親との温泉旅行', '家族旅行', '帰省', '里帰り'],
    pid: '892656918',
    raw: '<script language="javascript" src="//ad.jp.ap.valuecommerce.com/servlet/jsbanner?sid=3775652&pid=892656918"></script><noscript><a href="//ck.jp.ap.valuecommerce.com/servlet/referral?sid=3775652&pid=892656918" rel="nofollow sponsored noopener"><img src="//ad.jp.ap.valuecommerce.com/servlet/gifbanner?sid=3775652&pid=892656918" border="0"></a></noscript>',
  },
  'golf-goods': {
    id: 'golf-goods', label: 'PR', category: '親子ゴルフ',
    title: '親子ゴルフの用品を確認する',
    description: '親と一緒にゴルフを楽しむ時の用品を考える選択肢です。商品情報や条件は公式サイトでご確認ください。',
    useFor: ['親子ゴルフ', '父の日', '定年後の趣味'],
    pid: '892656919',
    raw: '<script language="javascript" src="//ad.jp.ap.valuecommerce.com/servlet/jsbanner?sid=3775652&pid=892656919"></script><noscript><a href="//ck.jp.ap.valuecommerce.com/servlet/referral?sid=3775652&pid=892656919" rel="nofollow sponsored noopener"><img src="//ad.jp.ap.valuecommerce.com/servlet/gifbanner?sid=3775652&pid=892656919" border="0"></a></noscript>',
  },
  'ebest-recycle': {
    id: 'ebest-recycle', label: 'PR', category: '家電・小型家電整理',
    title: '小型家電の整理や買い替えを考える',
    description: '実家の小型家電整理、防災・見守り家電、買い替えを考える時の選択肢です。対象商品や条件は公式サイトでご確認ください。',
    useFor: ['小型家電整理', '防災家電', '見守り家電', '実家整理'],
    pid: '892656923',
    raw: '<script language="javascript" src="//ad.jp.ap.valuecommerce.com/servlet/jsbanner?sid=3775652&pid=892656923"></script><noscript><a href="//ck.jp.ap.valuecommerce.com/servlet/referral?sid=3775652&pid=892656923" rel="nofollow sponsored noopener"><img src="//ad.jp.ap.valuecommerce.com/servlet/gifbanner?sid=3775652&pid=892656923" border="0"></a></noscript>',
  },
};

// 各広告に状態フィールド（isActive / status / network）を付与して確定。
// 審査中は全広告 isActive:false / status:'pending_review'。
export const VALUE_COMMERCE_ADS: Record<string, ValueCommerceAd> = Object.fromEntries(
  Object.entries(VC_ADS_BASE).map(([id, ad]) => [
    id,
    {
      ...ad,
      isActive: false,
      status: 'pending_review' as VCAdStatus,
      network: 'valuecommerce' as const,
    },
  ]),
);

/** その広告を今 public site に出してよいか（マスタースイッチ×個別フラグ×状態）。 */
export function isVCAdVisible(ad: ValueCommerceAd): boolean {
  return VC_GLOBAL_ACTIVE && ad.isActive && ad.status === 'active';
}

/**
 * frontmatter で指定された id 順に取り出す。
 * 審査中（非表示）の広告は除外するため、審査完了までは常に空配列になる。
 */
export function getVCAdsByIds(ids: string[] = []): ValueCommerceAd[] {
  return ids
    .map((id) => VALUE_COMMERCE_ADS[id])
    .filter((a): a is ValueCommerceAd => Boolean(a) && isVCAdVisible(a));
}

/** 季節キーワード → 広告id（SeasonalAffiliateBlock 用）。 */
export const VC_SEASON_MAP: Record<string, string[]> = {
  obon: ['nta-travel', 'jalan-travel', 'yahoo-shopping'],
  kisei: ['nta-travel', 'jalan-travel', 'yahoo-shopping'],
  gift: ['seasonal-gift', 'yahoo-shopping', 'furusato-honpo'],
  onsen: ['nta-travel', 'jalan-travel'],
  outdoor: ['outdoor-wear', 'yahoo-shopping'],
  golf: ['golf-goods'],
  books: ['kinokuniya-books'],
  bousai: ['yahoo-shopping', 'outdoor-wear', 'ebest-recycle'],
};

export const VC_DISCLOSURE_TEXT =
  '当サイトではアフィリエイト広告を利用しています。掲載しているサービスは、必要に応じた選択肢の一つとして紹介しており、利用を強制するものではありません。商品情報・価格・在庫・キャンペーン・予約条件等は、必ず公式サイトでご確認ください。';
