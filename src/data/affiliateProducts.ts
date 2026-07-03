// =====================================================================
// アフィリエイト商材マスタ
//
// ルール（Creative/affiliate/ の管理ファイル群と対応）:
//  - status が 'approved' | 'published' かつ url があるものだけ表示対象。
//  - 'candidate' は記事に一切表示しない（リサーチ段階の候補）。
//  - A8案件は管理画面で承認確認が取れるまで 'candidate' のまま。
//  - 価格・レビュー点数・在庫は持たない（固定表示禁止のため項目自体を作らない）。
//  - リンクは rel="sponsored nofollow noopener noreferrer" + target="_blank"。
//  - /app・/iq121-japan/early-adopter・/iq121-japan/investor では使用しない。
// =====================================================================

export type AffiliatePlatform = 'amazon' | 'a8' | 'other';
export type AffiliateStatus = 'candidate' | 'approved' | 'published';
export type AffiliatePlacement = 'body_mid' | 'body_end' | 'sidebar' | 'related_tools';

export interface AffiliateProduct {
  id: string;
  platform: AffiliatePlatform;
  title: string;
  category: string;
  description: string;
  /** 承認済みになるまで空でよい。空のものは表示されない。 */
  url: string;
  status: AffiliateStatus;
  articleSlugs: string[];
  placement: AffiliatePlacement;
  disclosureRequired: boolean;
  rel: string;
  notes?: string;
}

const REL = 'sponsored nofollow noopener noreferrer';

// 現時点では全件 candidate（リサーチ中）。承認後に status/url を更新して表示される。
// 候補の全体像は Creative/affiliate/amazon_candidate_products.md / a8_candidate_programs.md を参照。
export const AFFILIATE_PRODUCTS: AffiliateProduct[] = [
  {
    id: 'amz_dashi_pack_01',
    platform: 'amazon',
    title: '出汁パック（親の味の再現用・例）',
    category: '食品・調味料',
    description: '親の味を記録するとき、使っていた出汁・味噌の銘柄も一緒に残すと再現しやすくなります。',
    url: '',
    status: 'candidate',
    articleSlugs: ['mothers-recipe-family-record'],
    placement: 'body_end',
    disclosureRequired: true,
    rel: REL,
    notes: 'ASIN未確認。検索KW「出汁パック 無添加」',
  },
  {
    id: 'amz_recipe_note_01',
    platform: 'amazon',
    title: 'レシピノート（聞き書き用・例)',
    category: 'レシピノート',
    description: '親の味を聞き出す「最初のメモ」として。長期の保管・共有はデジタル整理と併用を前提に紹介。',
    url: '',
    status: 'candidate',
    articleSlugs: ['family-recipe-photo-record'],
    placement: 'body_end',
    disclosureRequired: true,
    rel: REL,
    notes: 'カニバリ注意（主役はIQ121。きっかけツールとして扱う）',
  },
  {
    id: 'amz_smart_tag_01',
    platform: 'amazon',
    title: 'スマートタグ（紛失防止・例）',
    category: 'スマートタグ・紛失防止',
    description: '鍵や財布の置き忘れ対策に。中の情報を守る仕組みではない点を明記して紹介。',
    url: '',
    status: 'candidate',
    articleSlugs: ['smartphone-lost-family-preparation'],
    placement: 'body_end',
    disclosureRequired: true,
    rel: REL,
  },
  {
    id: 'amz_fire_bag_01',
    platform: 'amazon',
    title: '耐火・防水書類バッグ（例）',
    category: '書類保管',
    description: '重要書類の「ありか」を一か所にまとめる物理的な選択肢として。',
    url: '',
    status: 'candidate',
    articleSlugs: ['oya-moshimo-joho-kyoyu', 'inheritance-important-info-young-people'],
    placement: 'body_end',
    disclosureRequired: true,
    rel: REL,
  },
  {
    id: 'a8_meal_kit_01',
    platform: 'a8',
    title: 'ミールキット・宅配食（例）',
    category: '宅配食・ミールキット',
    description: '離れて暮らす家族の食事が気になるときの選択肢として。健康効果は謳わない。',
    url: '',
    status: 'candidate',
    articleSlugs: ['parent-child-meal-checkin'],
    placement: 'body_end',
    disclosureRequired: true,
    rel: REL,
    notes: 'A8管理画面での承認確認前。unchecked',
  },
];

/** 記事に表示してよい商材だけを返す（candidate と URL 未設定は除外）。 */
export function getDisplayableProducts(slug: string): AffiliateProduct[] {
  return AFFILIATE_PRODUCTS.filter(
    (p) =>
      (p.status === 'approved' || p.status === 'published') &&
      p.url !== '' &&
      p.articleSlugs.includes(slug)
  );
}
