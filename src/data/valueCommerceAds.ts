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

export type VCApprovalStatus = 'approved' | 'pending' | 'paused' | 'ended';

export interface ValueCommerceAd {
  id: string;
  network: 'valuecommerce';
  /** 広告主の種別（商標名は狙わない安全な総称表記） */
  advertiserName: string;
  category: string;
  title: string;
  description: string;
  /** クリック先（元広告コードの referral URL。空なら非表示） */
  clickUrl: string;
  /** バナー画像（元広告コードの gifbanner URL。任意・無効時は非表示） */
  imageUrl?: string;
  /** 承認済みかつ有効な広告のみ true */
  isActive: boolean;
  /** VC参加審査/プログラム承認状態。'approved' 以外は非表示 */
  approvalStatus: VCApprovalStatus;
  /** 掲載を許可する記事slug（関連記事のみに限定するガード） */
  placementArticles: string[];
  /** PR表記（常に 'PR'） */
  disclosure: 'PR';
  // --- 参考用（描画しない） ---
  pid: string;
  raw: string;
  useFor: string[];
}

// ---------------------------------------------------------------------
// 公開ゲート（環境変数マスタースイッチ）
//   VC参加審査が承認されたため、本番では PUBLIC_ENABLE_VALUECOMMERCE_ADS=true
//   を設定して有効化する。未設定/false の環境では VC 広告を一切表示しない。
//   ※ 環境変数が true でも、各広告の isActive=false / approvalStatus!=='approved'
//     / clickUrl 空 のものは表示しない（多段ガード）。
// ---------------------------------------------------------------------
export const VC_ENV_ENABLED = import.meta.env.PUBLIC_ENABLE_VALUECOMMERCE_ADS === 'true';

const SID = '3775652';

/** 静的バナーのクリック先（referral）。 */
export function vcReferralUrl(pid: string): string {
  return `https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=${SID}&pid=${pid}`;
}
/** 静的バナー画像（gifbanner）。インプレッション計測を兼ねる。 */
export function vcBannerUrl(pid: string): string {
  return `https://ad.jp.ap.valuecommerce.com/servlet/gifbanner?sid=${SID}&pid=${pid}`;
}

type VCAdBase = Pick<
  ValueCommerceAd,
  'id' | 'category' | 'title' | 'description' | 'useFor' | 'pid' | 'raw'
> & { label?: string };

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

// 広告主の総称表記（商標名は使わない。公式サイトと誤認させない安全な種別名）。
const VC_ADVERTISER_NAMES: Record<string, string> = {
  'nta-travel': '国内旅行予約',
  'jalan-travel': '宿泊予約',
  'yahoo-shopping': '総合オンラインストア',
  'yahoo-shopping-sub': '総合オンラインストア',
  'seasonal-gift': 'ギフト専門店',
  'furusato-honpo': 'ふるさと納税',
  'kinokuniya-books': 'オンライン書店',
  'outdoor-wear': 'アウトドア用品',
  'ebest-recycle': '家電・リサイクル',
  'golf-goods': 'ゴルフ用品',
};

// 掲載を許可する記事slug（各記事の frontmatter valueCommerceAds と一致）。
// ここに無い記事では、たとえ frontmatter で指定されても表示しない。
const VC_PLACEMENT_ARTICLES: Record<string, string[]> = {
  'nta-travel': ['obon-homecoming-parent-checklist', 'parent-onsen-trip-memory', 'homecoming-family-talk'],
  'jalan-travel': ['obon-homecoming-parent-checklist', 'parent-onsen-trip-memory', 'homecoming-family-talk'],
  'yahoo-shopping': [
    'obon-homecoming-parent-checklist',
    'ochugen-parent-gift',
    'practical-gifts-for-parents',
    'family-outdoor-memory',
    'homecoming-disaster-supplies',
    'parents-house-disaster-supplies-checklist',
  ],
  'yahoo-shopping-sub': [],
  'seasonal-gift': ['ochugen-parent-gift', 'practical-gifts-for-parents'],
  'furusato-honpo': ['ochugen-parent-gift', 'furusato-tax-with-parents'],
  'kinokuniya-books': ['practical-gifts-for-parents', 'homecoming-family-talk'],
  'outdoor-wear': ['family-outdoor-memory', 'homecoming-disaster-supplies'],
  'ebest-recycle': ['homecoming-disaster-supplies'],
  'golf-goods': ['parent-golf-memory'],
};

// ---------------------------------------------------------------------
// 個別広告の停止指定（内部管理用・公開HTMLには出力しない）
//
//   広告主からの停止/終了通知を受けたら、ここに追記するだけで即座に非表示になる。
//   設定情報（pid・URL等）は将来の再開のために残す。
// ---------------------------------------------------------------------
type VCOverride = {
  status: VCApprovalStatus;
  /** 停止日（管理用） */
  since: string;
  /** 停止理由コード（管理用） */
  reason: string;
};

const VC_STATUS_OVERRIDES: Record<string, VCOverride> = {
  // 日本旅行：広告主のシステム都合により全プログラム掲載一時停止（再開見込み未定）。
  // 再開時は、この行を削除するだけで元の承認済み状態に戻る。
  'nta-travel': {
    status: 'paused',
    since: '2026-07-22',
    reason: 'advertiser_system_pause',
  },
};

// VC参加審査・各広告主プログラムが承認済み。
// clickUrl / imageUrl は元広告コード（raw の pid）由来の referral / gifbanner を保持（推測URLは作らない）。
// リンク不明・欠損の広告は clickUrl 空にして自動的に非表示になる。
// 停止指定（VC_STATUS_OVERRIDES）がある広告は isActive=false となり描画されない。
export const VALUE_COMMERCE_ADS: Record<string, ValueCommerceAd> = Object.fromEntries(
  Object.entries(VC_ADS_BASE).map(([id, ad]) => {
    const clickUrl = ad.pid ? vcReferralUrl(ad.pid) : '';
    const imageUrl = ad.pid ? vcBannerUrl(ad.pid) : undefined;
    const placement = VC_PLACEMENT_ARTICLES[id] ?? [];
    const override = VC_STATUS_OVERRIDES[id];
    // 承認済み扱い：有効な clickUrl があり、掲載先が定義され、停止指定が無いもの。
    const approved = clickUrl !== '' && placement.length > 0 && !override;
    return [
      id,
      {
        id,
        network: 'valuecommerce' as const,
        advertiserName: VC_ADVERTISER_NAMES[id] ?? ad.category,
        category: ad.category,
        title: ad.title,
        description: ad.description,
        clickUrl,
        imageUrl,
        isActive: approved,
        approvalStatus: (override
          ? override.status
          : approved
            ? 'approved'
            : 'pending') as VCApprovalStatus,
        placementArticles: placement,
        disclosure: 'PR' as const,
        pid: ad.pid,
        raw: ad.raw,
        useFor: ad.useFor,
      },
    ];
  }),
);

/** その広告を今 public site に出してよいか（環境変数×承認状態×有効フラグ×clickUrl）。 */
export function isVCAdVisible(ad: ValueCommerceAd): boolean {
  return VC_ENV_ENABLED && ad.isActive && ad.approvalStatus === 'approved' && ad.clickUrl !== '';
}

/**
 * frontmatter で指定された id 順に取り出す。
 * - 環境変数OFF / 未承認 / clickUrl欠損 の広告は除外。
 * - slug を渡すと placementArticles に含まれる記事のみに限定（関連性ガード）。
 */
export function getVCAdsByIds(ids: string[] = [], slug?: string): ValueCommerceAd[] {
  return ids
    .map((id) => VALUE_COMMERCE_ADS[id])
    .filter(
      (a): a is ValueCommerceAd =>
        Boolean(a) && isVCAdVisible(a) && (!slug || a.placementArticles.includes(slug)),
    );
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
