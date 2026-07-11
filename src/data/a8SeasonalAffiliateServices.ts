// =====================================================================
// A8.net 季節・帰省・ギフト・旅行系アフィリエイト広告
//
// 方針：
//  - 親みまもり研究所の本線（親との時間・帰省・家族で話すきっかけ・見守り・
//    情報整理）を崩さない。旅行・ギフトは「会う/話す/思い出を残すきっかけ」。
//  - 記事ごとに内容に合う広告だけを frontmatter `a8SeasonalAds` で指定。
//    gift系記事は最大4枚、travel系記事は最大3枚まで。
//  - 各カードに PR 表記／リンクは表示側で rel="nofollow sponsored noopener"
//    + target="_blank" に統一（A8元コードが nofollow のみでも付与）。
//  - 商標名・サービス名・会社名・商品名はSEOタイトル/H1/H2で狙わない。
//    公式サイトと誤認させない。誇大表現・広告主PR文のコピペ禁止。
//  - 料金・在庫・配送・予約条件・キャンペーン・成果対象条件は「公式サイトで
//    確認」と明記（description / notes 参照）。
//  - 画像利用制限（人物画像NG・商品画像NG・素材加工NG 等）は notes に明記し、
//    表示は A8 提供バナー（imageUrl）と成果計測ピクセル（trackingPixel）のみ。
// =====================================================================

export type A8Priority = 'high' | 'medium' | 'low';

export interface A8SeasonalAd {
  id: string;
  network: 'a8';
  label: string; // 常に 'PR'
  category: string;
  subcategory: string;
  title: string;
  description: string;
  cta: string;
  url: string; // A8 計測リンク（px.a8.net）
  imageUrl: string; // A8 提供バナー
  trackingPixel: string; // 成果計測ピクセル（0.gif）
  imageWidth: number;
  imageHeight: number;
  programName: string;
  programId: string;
  commission: string;
  epc: string;
  approvalRate: string;
  priority: A8Priority;
  useFor: string[];
  notes: string[];
}

/** 横長バナー（728x90 等）はカード内で縮小表示する必要がある目印。 */
export function isWideBanner(ad: A8SeasonalAd): boolean {
  return ad.imageWidth >= 600 && ad.imageHeight <= 120;
}

export const A8_SEASONAL_ADS: Record<string, A8SeasonalAd> = {
  'kogetsu-wagashi': {
    id: 'kogetsu-wagashi', network: 'a8', label: 'PR',
    category: 'gift-food', subcategory: 'wagashi',
    title: 'お中元・お歳暮や帰省の手土産に和菓子を考える',
    description: '和菓子は、季節の贈り物やお供え、帰省時の手土産として選ばれやすい品です。商品情報やのし対応は公式サイトで確認してください。',
    cta: '和菓子ギフトを確認する',
    url: 'https://px.a8.net/svt/ejp?a8mat=4B7XX7+4VMW8I+4LJ6+60WN5',
    imageUrl: 'https://www25.a8.net/svt/bgt?aid=260711035295&wid=001&eno=01&mid=s00000021453001012000&mc=1',
    trackingPixel: 'https://www12.a8.net/0.gif?a8mat=4B7XX7+4VMW8I+4LJ6+60WN5',
    imageWidth: 300, imageHeight: 250,
    programName: '京都から「千寿せんべい」などこだわりの和菓子をお届け【鼓月オンラインストア】',
    programId: 's00000021453001', commission: '購入10%', epc: '13.54', approvalRate: '88.09%',
    priority: 'high',
    useFor: ['お中元', 'お歳暮', 'お供え', '帰省土産', '手土産', '親への贈り物'],
    notes: ['社名・商品名・類似キーワードはリスティングNG', '広告表示必須', '広告掲載URL提出が必要'],
  },
  'quattro-ebi-cheese': {
    id: 'quattro-ebi-cheese', network: 'a8', label: 'PR',
    category: 'gift-food', subcategory: 'snack-gift',
    title: '帰省の手土産や季節の贈り物を考える',
    description: '家族で集まる時の手土産や、季節の贈り物を考える時の選択肢です。商品情報や配送条件は公式サイトで確認してください。',
    cta: '手土産ギフトを確認する',
    url: 'https://px.a8.net/svt/ejp?a8mat=4B7XX7+4WTRG2+442A+C7DWH',
    imageUrl: 'https://www27.a8.net/svt/bgt?aid=260711035297&wid=001&eno=01&mid=s00000019189002050000&mc=1',
    trackingPixel: 'https://www11.a8.net/0.gif?a8mat=4B7XX7+4WTRG2+442A+C7DWH',
    imageWidth: 300, imageHeight: 300,
    programName: '新感覚えびせん【クアトロえびチーズ】特別キャンペーン',
    programId: 's00000019189002', commission: '新規購入1500円', epc: '12.04', approvalRate: '100%',
    priority: 'high',
    useFor: ['帰省土産', 'お中元', 'お歳暮', '母の日', '父の日', '手土産', '家族で集まる時'],
    notes: ['広告主新規のみ成果対象', '複数個購入でも成果一律', '社名・商標・チーズえびせんはリスティングNG', '広告表示必須'],
  },
  'ocean-princess-canned-gift': {
    id: 'ocean-princess-canned-gift', network: 'a8', label: 'PR',
    category: 'gift-food', subcategory: 'canned-food',
    title: '保存しやすい食のギフトを考える',
    description: '缶詰など保存しやすい食品は、ギフトや備蓄の選択肢にもなります。商品情報や条件は公式サイトで確認してください。',
    cta: '保存しやすい食品ギフトを確認する',
    url: 'https://px.a8.net/svt/ejp?a8mat=4B7XX7+4XF71U+3UY8+61JSH',
    imageUrl: 'https://www29.a8.net/svt/bgt?aid=260711035298&wid=001&eno=01&mid=s00000018008001015000&mc=1',
    trackingPixel: 'https://www16.a8.net/0.gif?a8mat=4B7XX7+4XF71U+3UY8+61JSH',
    imageWidth: 300, imageHeight: 250,
    programName: '高級缶詰ギフト・お取り寄せ専門店「オーシャンプリンセス」',
    programId: 's00000018008001', commission: '購入5%', epc: '0.11', approvalRate: '100%',
    priority: 'low',
    useFor: ['お中元', 'お歳暮', '食品ギフト', '防災備蓄', '実家への手土産'],
    notes: ['カタログ請求フォームからの購入は否認', 'モンマルシェ・オーシャンプリンセス・野菜をMotto!!・ツナはリスティングNG', '防災備蓄記事で補助的に使う'],
  },
  'ministop-online': {
    id: 'ministop-online', network: 'a8', label: 'PR',
    category: 'gift-food', subcategory: 'frozen-food-convenience',
    title: '家族で楽しめる冷凍食品や季節商品を確認する',
    description: '帰省時の食卓や家族で集まる時の軽食・季節商品を考える時の選択肢です。商品情報や受取条件は公式サイトで確認してください。',
    cta: '家族向け食品を確認する',
    url: 'https://px.a8.net/svt/ejp?a8mat=4B7XX7+4Y0MNM+5TL0+5ZEMP',
    imageUrl: 'https://www22.a8.net/svt/bgt?aid=260711035299&wid=001&eno=01&mid=s00000027162001005000&mc=1',
    trackingPixel: 'https://www10.a8.net/0.gif?a8mat=4B7XX7+4Y0MNM+5ZEMP',
    imageWidth: 728, imageHeight: 90,
    programName: 'ミニストップの公式オンラインストア【ミニストップオンライン】',
    programId: 's00000027162001', commission: '購入2%', epc: '0.95', approvalRate: '96.87%',
    priority: 'low',
    useFor: ['帰省時の食卓', '家族で集まる時の軽食', '孫との食事', '季節商品'],
    notes: ['LINE経由注文は否認', 'サイト内人物画像NG', '低優先度・全記事に出さない', '728x90横長バナーのためカード表示時レイアウト注意', 'trackingPixel URLが元コード通りか確認'],
  },
  'yamamotoyama-tea-nori': {
    id: 'yamamotoyama-tea-nori', network: 'a8', label: 'PR',
    category: 'gift-food', subcategory: 'tea-nori',
    title: '親世代にも贈りやすいお茶・海苔ギフト',
    description: 'お茶や海苔など、落ち着いた食の贈り物を考える時の選択肢です。商品情報や配送条件は公式サイトで確認してください。',
    cta: 'お茶・海苔ギフトを確認する',
    url: 'https://px.a8.net/svt/ejp?a8mat=4B7XX7+4YM29E+5K8M+61RI9',
    imageUrl: 'https://www20.a8.net/svt/bgt?aid=260711035300&wid=001&eno=01&mid=s00000025951001016000&mc=1',
    trackingPixel: 'https://www19.a8.net/0.gif?a8mat=4B7XX7+4YM29E+5K8M+61RI9',
    imageWidth: 200, imageHeight: 200,
    programName: '「上から読んでも…」で認知度抜群。お茶と海苔といえば【山本山オンラインショップ】',
    programId: 's00000025951001', commission: '購入10%', epc: '5.64', approvalRate: '91.66%',
    priority: 'high',
    useFor: ['お中元', 'お歳暮', '親への贈り物', '実家への手土産', '敬老の日', '落ち着いた食ギフト'],
    notes: ['LINE経由購入は否認', '人物画像NG', '社名・サービス名・表記ゆれはリスティングNG', '広告表示必須', '広告掲載URL提出が必要'],
  },
  'shimanohito-seafood-gift': {
    id: 'shimanohito-seafood-gift', network: 'a8', label: 'PR',
    category: 'gift-food', subcategory: 'seafood',
    title: '家族で楽しめる海鮮ギフトを考える',
    description: '海鮮ギフトやおせちなど、家族で集まる時の食の贈り物を考える選択肢です。商品情報や配送条件は公式サイトで確認してください。',
    cta: '海鮮ギフトを確認する',
    url: 'https://px.a8.net/svt/ejp?a8mat=4B7XX7+4ZSXGY+4UKG+62MDD',
    imageUrl: 'https://www26.a8.net/svt/bgt?aid=260711035302&wid=001&eno=01&mid=s00000022624001020000&mc=1',
    trackingPixel: 'https://www12.a8.net/0.gif?a8mat=4B7XX7+4ZSXGY+4UKG+62MDD',
    imageWidth: 250, imageHeight: 250,
    programName: '日本最北の島、礼文島から高品質な食材をお届け【島の人 オンラインショップ】',
    programId: 's00000022624001', commission: '購入7.5%', epc: '1.3', approvalRate: '40.81%',
    priority: 'medium',
    useFor: ['お歳暮', 'お中元', '海鮮ギフト', 'おせち', '家族で集まる食事'],
    notes: ['島の人・礼文島はリスティングNG', '予約商品は発送まで日数がかかる場合あり'],
  },
  'yonezawagyu-gift': {
    id: 'yonezawagyu-gift', network: 'a8', label: 'PR',
    category: 'gift-food', subcategory: 'beef',
    title: '家族で味わう食のギフトを考える',
    description: '親への贈り物や家族で集まる日の食事として、少し特別な食のギフトを考える選択肢です。商品情報や配送条件は公式サイトで確認してください。',
    cta: '食のギフトを確認する',
    url: 'https://px.a8.net/svt/ejp?a8mat=4B7XX7+526NW2+242M+DCJDT',
    imageUrl: 'https://www29.a8.net/svt/bgt?aid=260711035306&wid=001&eno=01&mid=s00000009859002242000&mc=1',
    trackingPixel: 'https://www12.a8.net/0.gif?a8mat=4B7XX7+526NW2+242M+DCJDT',
    imageWidth: 300, imageHeight: 250,
    programName: '客単価10,000円！ギフトにお勧め米沢牛専門店の販促プログラム',
    programId: 's00000009859002', commission: '購入10%', epc: '4.29', approvalRate: '88.23%',
    priority: 'high',
    useFor: ['親への食ギフト', '家族で集まる食事', 'お中元', 'お歳暮', '敬老の日'],
    notes: ['商品情報や配送条件は公式サイト確認'],
  },
  'gelabo-gelato': {
    id: 'gelabo-gelato', network: 'a8', label: 'PR',
    category: 'gift-food', subcategory: 'sweets',
    title: '家族で楽しめるスイーツギフトを考える',
    description: '孫や親世代と一緒に楽しめるスイーツギフトを考える時の選択肢です。商品情報や配送条件は公式サイトで確認してください。',
    cta: 'スイーツギフトを確認する',
    url: 'https://px.a8.net/svt/ejp?a8mat=4B7XX7+53DJ3M+51FE+614CX',
    imageUrl: 'https://www25.a8.net/svt/bgt?aid=260711035308&wid=001&eno=01&mid=s00000023513001013000&mc=1',
    trackingPixel: 'https://www14.a8.net/0.gif?a8mat=4B7XX7+53DJ3M+51FE+614CX',
    imageWidth: 300, imageHeight: 250,
    programName: '北海道ジェラート専門店！1日1200名を超える人気店！【GELATERIA GELABO】',
    programId: 's00000023513001', commission: '購入10%', epc: '0.77', approvalRate: '100%',
    priority: 'medium',
    useFor: ['夏ギフト', '孫と祖父母', '家族で集まる日', 'スイーツギフト'],
    notes: ['商標・社名・サイト名・商品名・人物名・表記ゆれはリスティングNG'],
  },
  'shaddy-gift': {
    id: 'shaddy-gift', network: 'a8', label: 'PR',
    category: 'gift-lifestyle', subcategory: 'general-gift',
    title: 'お中元・お歳暮・内祝いの贈り物を考える',
    description: '季節の贈り物、内祝い、お返しなど、家族の節目に合わせたギフトを考える時の選択肢です。商品情報や条件は公式サイトで確認してください。',
    cta: 'ギフトを確認する',
    url: 'https://px.a8.net/svt/ejp?a8mat=4B7XX7+54KEB6+4DMG+5ZMCH',
    imageUrl: 'https://www27.a8.net/svt/bgt?aid=260711035310&wid=001&eno=01&mid=s00000020428001006000&mc=1',
    trackingPixel: 'https://www13.a8.net/0.gif?a8mat=4B7XX7+54KEB6+4DMG+5ZMCH',
    imageWidth: 300, imageHeight: 250,
    programName: '【シャディ公式】内祝や、お返しも！ギフト専門店【シャディギフトモール】',
    programId: 's00000020428001', commission: '購入5%', epc: '0.93', approvalRate: '64.7%',
    priority: 'medium',
    useFor: ['お中元', 'お歳暮', '内祝い', '香典返し', '親族への贈り物'],
    notes: ['代金引換払い注文など一部否認条件あり', '商標KWはリスティングNG'],
  },
  'mameil-macaron': {
    id: 'mameil-macaron', network: 'a8', label: 'PR',
    category: 'gift-food', subcategory: 'sweets',
    title: '特別感のあるスイーツギフトを考える',
    description: '手土産や特別な日の贈り物として、スイーツギフトを考える時の選択肢です。商品情報や配送条件は公式サイトで確認してください。',
    cta: 'スイーツギフトを確認する',
    url: 'https://px.a8.net/svt/ejp?a8mat=4B7XX7+555TWY+51FE+BYDTT',
    imageUrl: 'https://www27.a8.net/svt/bgt?aid=260711035311&wid=001&eno=01&mid=s00000023513002008000&mc=1',
    trackingPixel: 'https://www13.a8.net/0.gif?a8mat=4B7XX7+555TWY+51FE+BYDTT',
    imageWidth: 300, imageHeight: 250,
    programName: '1粒を作るのにのべ1週間かかる生チョコマカロン【MAMEIL NAMA CHOCOLATE MACARON】',
    programId: 's00000023513002', commission: '購入15%', epc: '0.99', approvalRate: '97.5%',
    priority: 'medium',
    useFor: ['手土産', '高級スイーツギフト', '母の日', '家族で集まる日'],
    notes: ['商標・社名・サイト名・商品名・人物名・表記ゆれはリスティングNG'],
  },
  'true-towel': {
    id: 'true-towel', network: 'a8', label: 'PR',
    category: 'gift-lifestyle', subcategory: 'towel',
    title: '親への実用的な日用品ギフトを考える',
    description: 'タオルなどの日用品は、親への実用的な贈り物として選びやすい品です。商品情報や配送条件は公式サイトで確認してください。',
    cta: '日用品ギフトを確認する',
    url: 'https://px.a8.net/svt/ejp?a8mat=4B7XX7+4JQ84Y+4ESE+63H8H',
    imageUrl: 'https://www28.a8.net/svt/bgt?aid=260711035275&wid=001&eno=01&mid=s00000020579001024000&mc=1',
    trackingPixel: 'https://www16.a8.net/0.gif?a8mat=4B7XX7+4JQ84Y+4ESE+63H8H',
    imageWidth: 300, imageHeight: 250,
    programName: 'どこまでも濃密でどこまでもシンプルな今治産タオル【TRUE TOWEL】',
    programId: 's00000020579001', commission: '購入10%', epc: '3.34', approvalRate: '100%',
    priority: 'high',
    useFor: ['親への実用ギフト', '内祝い', '敬老の日', '日用品ギフト'],
    notes: ['商標・社名はリスティングNG'],
  },
  'shimamoto-mentaiko': {
    id: 'shimamoto-mentaiko', network: 'a8', label: 'PR',
    category: 'gift-food', subcategory: 'seafood',
    title: '実家への手土産や食のギフトを考える',
    description: '食卓で楽しめる食品ギフトは、帰省や季節の贈り物の選択肢になります。商品情報や配送条件は公式サイトで確認してください。',
    cta: '食品ギフトを確認する',
    url: 'https://px.a8.net/svt/ejp?a8mat=4B7XX7+4KX3CI+2WSI+63WO1',
    imageUrl: 'https://www27.a8.net/svt/bgt?aid=260711035277&wid=001&eno=01&mid=s00000013581001026000&mc=1',
    trackingPixel: 'https://www12.a8.net/0.gif?a8mat=4B7XX7+4KX3CI+2WSI+63WO1',
    imageWidth: 300, imageHeight: 250,
    programName: '新鮮な国産たらこを厳選！博多辛子明太子の【島本】販売',
    programId: 's00000013581001', commission: '購入8%', epc: '11.96', approvalRate: '96.96%',
    priority: 'high',
    useFor: ['お中元', 'お歳暮', '実家への手土産', '食品ギフト'],
    notes: ['しまもと・島本等、社名・商標はリスティングNG'],
  },
  'jtrip-domestic': {
    id: 'jtrip-domestic', network: 'a8', label: 'PR',
    category: 'travel-domestic', subcategory: 'jal-tour',
    title: '親との国内旅行や帰省旅行を考える',
    description: '飛行機を使った国内旅行や親との旅を考える時の選択肢です。予約条件や対象プランは公式サイトで確認してください。',
    cta: '国内旅行の選択肢を確認する',
    url: 'https://px.a8.net/svt/ejp?a8mat=4B7XX7+56CP4I+40T2+67C4H',
    imageUrl: 'https://www23.a8.net/svt/bgt?aid=260711035313&wid=001&eno=01&mid=s00000018767001042000&mc=1',
    trackingPixel: 'https://www10.a8.net/0.gif?a8mat=4B7XX7+56CP4I+40T2+67C4H',
    imageWidth: 300, imageHeight: 250,
    programName: 'JALで行く！格安国内旅行のジェイトリップ（J-TRIP）',
    programId: 's00000018767001', commission: '成約1000円', epc: '0.17', approvalRate: '36%',
    priority: 'low',
    useFor: ['親との国内旅行', '帰省旅行', '沖縄', '北海道'],
    notes: ['飛行機を利用しないプランはNG', '芸能人画像の商品リンク使用NG', '商標KWはリスティングNG'],
  },
  'oooh-overseas-custom-trip': {
    id: 'oooh-overseas-custom-trip', network: 'a8', label: 'PR',
    category: 'travel-overseas', subcategory: 'custom-trip',
    title: '海外旅行の相談先を考える',
    description: '海外旅行で現地に詳しい人へ相談したい時の選択肢です。相談条件や対応地域は公式サイトで確認してください。',
    cta: '海外旅行の相談先を確認する',
    url: 'https://px.a8.net/svt/ejp?a8mat=4B7XX7+56Y4QA+5OEM+5YZ75',
    imageUrl: 'https://www23.a8.net/svt/bgt?aid=260711035314&wid=001&eno=01&mid=s00000026491001003000&mc=1',
    trackingPixel: 'https://www17.a8.net/0.gif?a8mat=4B7XX7+56Y4QA+5OEM+5YZ75',
    imageWidth: 300, imageHeight: 250,
    programName: '現地旅行会社と「行きたい」を叶える海外旅行サービス【Oooh】',
    programId: 's00000026491001', commission: 'チャット開始750円', epc: '0.19', approvalRate: '100%',
    priority: 'low',
    useFor: ['海外家族旅行', '親との特別な旅', '旅行相談'],
    notes: ['成果地点は旅行会社アサイン後のチャット開始', '商標・商品名関連ワードはリスティングNG'],
  },
  'saily-esim': {
    id: 'saily-esim', network: 'a8', label: 'PR',
    category: 'esim', subcategory: 'overseas-esim',
    title: '海外旅行前の通信手段を確認する',
    description: '海外旅行中の連絡手段を準備する時の選択肢です。対応国や利用条件は公式サイトで確認してください。',
    cta: 'eSIMの選択肢を確認する',
    url: 'https://px.a8.net/svt/ejp?a8mat=4B7XX7+59XAR6+5L2C+5YZ75',
    imageUrl: 'https://www26.a8.net/svt/bgt?aid=260711035319&wid=001&eno=01&mid=s00000026058001003000&mc=1',
    trackingPixel: 'https://www19.a8.net/0.gif?a8mat=4B7XX7+59XAR6+5YZ75',
    imageWidth: 300, imageHeight: 250,
    programName: '海外旅行のためのお得なeSIM【Saily】',
    programId: 's00000026058001', commission: '新規購入10%', epc: '-', approvalRate: '100%',
    priority: 'medium',
    useFor: ['海外旅行', '親との海外旅行', '旅行中の連絡手段', 'eSIM'],
    notes: ['リスティングNG', 'アプリ経由NG', '1世帯2回以上NG', '記事作成ボーナスは条件が厳しいため無理に狙わない', 'trackingPixel URLが元コード通りか確認'],
  },
  'airtrip-domestic-tour': {
    id: 'airtrip-domestic-tour', network: 'a8', label: 'PR',
    category: 'travel-domestic', subcategory: 'domestic-tour',
    title: '親との国内旅行や沖縄・北海道旅行を考える',
    description: '親との旅行や家族旅行を考える時の選択肢です。対象商品や予約条件は公式サイトで確認してください。',
    cta: '国内ツアーを確認する',
    url: 'https://px.a8.net/svt/ejp?a8mat=4B7XX7+5AIQCY+AD2+2HGDN5',
    imageUrl: 'https://www24.a8.net/svt/bgt?aid=260711035320&wid=001&eno=01&mid=s00000001343015025000&mc=1',
    trackingPixel: 'https://www10.a8.net/0.gif?a8mat=4B7XX7+5AIQCY+AD2+2HGDN5',
    imageWidth: 300, imageHeight: 250,
    programName: '沖縄旅行や北海道旅行！格安国内旅行なら【エアトリ国内ツアー】',
    programId: 's00000001343015', commission: '予約2000円', epc: '1.76', approvalRate: '41.17%',
    priority: 'medium',
    useFor: ['親との国内旅行', '沖縄', '北海道', '家族旅行'],
    notes: ['国内ツアーJAL利用のみ成果対象', 'アプリ経由NG', 'ブランドKWはリスティングNG'],
  },
  'best-one-cruise': {
    id: 'best-one-cruise', network: 'a8', label: 'PR',
    category: 'travel-domestic', subcategory: 'cruise',
    title: '親との特別な船旅を考える',
    description: 'クルーズ旅行は、移動の負担を抑えながら家族で過ごす旅の選択肢になります。料金や条件は公式サイトで確認してください。',
    cta: 'クルーズ旅行を確認する',
    url: 'https://px.a8.net/svt/ejp?a8mat=4B7XX7+5CWGS2+2VWA+5ZU29',
    imageUrl: 'https://www26.a8.net/svt/bgt?aid=260711035324&wid=001&eno=01&mid=s00000013465001007000&mc=1',
    trackingPixel: 'https://www14.a8.net/0.gif?a8mat=4B7XX7+5CWGS2+2VWA+5ZU29',
    imageWidth: 300, imageHeight: 250,
    programName: 'クルーズ旅行と船旅のことなら【ベストワンクルーズ】成約促進',
    programId: 's00000013465001', commission: '成約2000円', epc: '3.52', approvalRate: '46.37%',
    priority: 'medium',
    useFor: ['夫婦旅行', 'シニア旅行', '親との特別な旅行', '家族の記念旅行'],
    notes: ['10万円以下予約NG', '添乗員・航空券付ツアー、チャータークルーズはNG', 'ネガティブ記事での集客禁止', '商標KWはリスティングNG'],
  },
  'airtrip-overseas': {
    id: 'airtrip-overseas', network: 'a8', label: 'PR',
    category: 'travel-overseas', subcategory: 'overseas-flight-hotel',
    title: '海外航空券・海外ホテルを確認する',
    description: '海外旅行を計画する時の航空券・ホテルの選択肢です。成果対象や予約条件は公式サイトで確認してください。',
    cta: '海外旅行の選択肢を確認する',
    url: 'https://px.a8.net/svt/ejp?a8mat=4B7XX7+5GH2EQ+2YGS+7AK5T',
    imageUrl: 'https://www23.a8.net/svt/bgt?aid=260711035330&wid=001&eno=01&mid=s00000013798001225000&mc=1',
    trackingPixel: 'https://www16.a8.net/0.gif?a8mat=4B7XX7+5GH2EQ+2YGS+7AK5T',
    imageWidth: 728, imageHeight: 90,
    programName: '格安航空券・海外旅行の【エアトリ】 渡航・宿泊・旅行促進',
    programId: 's00000013798001', commission: '海外ホテル1% / 海外航空券2%', epc: '0.03', approvalRate: '76.92%',
    priority: 'low',
    useFor: ['海外旅行', '海外航空券', '海外ホテル'],
    notes: ['リスティングNG', '国内領域・海外ツアーなど成果対象外あり', '広告素材以外の画像使用禁止', '728x90横長バナーのためカードレイアウト注意'],
  },
  'needs-tour-domestic': {
    id: 'needs-tour-domestic', network: 'a8', label: 'PR',
    category: 'travel-domestic', subcategory: 'domestic-tour',
    title: '沖縄・北海道など親との国内旅行を考える',
    description: '親との旅行や家族旅行を考える時の国内ツアーの選択肢です。対象商品や予約条件は公式サイトで確認してください。',
    cta: '国内旅行の選択肢を確認する',
    url: 'https://px.a8.net/svt/ejp?a8mat=4B7XX7+5H2I0I+AD2+2BEEF5',
    imageUrl: 'https://www26.a8.net/svt/bgt?aid=260711035331&wid=001&eno=01&mid=s00000001343014008000&mc=1',
    trackingPixel: 'https://www18.a8.net/0.gif?a8mat=4B7XX7+5H2I0I+AD2+2BEEF5',
    imageWidth: 300, imageHeight: 250,
    programName: '【ニーズツアー】国内旅行＆沖縄旅行',
    programId: 's00000001343014', commission: '購入1000円 / JAL利用2000円', epc: '2.64', approvalRate: '54.16%',
    priority: 'high',
    useFor: ['親との国内旅行', '沖縄', '北海道', '帰省旅行'],
    notes: ['アプリ経由NG', 'ブランドKWはリスティングNG', '実在しないクーポン表現NG', '期限切れ情報の掲載放置NG'],
  },
  'japan-global-esim': {
    id: 'japan-global-esim', network: 'a8', label: 'PR',
    category: 'esim', subcategory: 'overseas-esim',
    title: '海外旅行前の通信手段を確認する',
    description: '海外旅行中に家族と連絡を取るための通信手段として、eSIMを確認する選択肢です。対応国や料金は公式サイトで確認してください。',
    cta: 'eSIMの選択肢を確認する',
    url: 'https://px.a8.net/svt/ejp?a8mat=4B7XX7+5HNXMA+5HZI+5ZEMP',
    imageUrl: 'https://www27.a8.net/svt/bgt?aid=260711035332&wid=001&eno=01&mid=s00000025659001005000&mc=1',
    trackingPixel: 'https://www16.a8.net/0.gif?a8mat=4B7XX7+5HNXMA+5HZI+5ZEMP',
    imageWidth: 300, imageHeight: 250,
    programName: '海外旅行・出張なら手軽で便利なeSIM【JAPAN&GLOBAL eSIM】',
    programId: 's00000025659001', commission: '購入15%', epc: '0.72', approvalRate: '100%',
    priority: 'medium',
    useFor: ['海外旅行', '親との海外旅行', '旅行中の連絡手段', 'eSIM'],
    notes: ['商標・社名・表記ゆれKWはリスティングNG', '広告表示必須', '広告掲載URL提出が必要'],
  },
  'tora-esim': {
    id: 'tora-esim', network: 'a8', label: 'PR',
    category: 'esim', subcategory: 'overseas-esim',
    title: '海外旅行前に通信手段を準備する',
    description: '海外旅行中にスマホで地図や連絡を使うための通信手段として、eSIMを確認する選択肢です。対応国や料金は公式サイトで確認してください。',
    cta: 'eSIMを確認する',
    url: 'https://px.a8.net/svt/ejp?a8mat=4B7XX7+5URGXE+5NG6+5Z6WX',
    imageUrl: 'https://www29.a8.net/svt/bgt?aid=260711035354&wid=001&eno=01&mid=s00000026367001004000&mc=1',
    trackingPixel: 'https://www12.a8.net/0.gif?a8mat=4B7XX7+5URGXE+5NG6+5Z6WX',
    imageWidth: 300, imageHeight: 250,
    programName: '海外向けeSIM！スマホ一つで旅行がもっと快適【TORA eSIM】',
    programId: 's00000026367001', commission: '購入15%', epc: '0.08', approvalRate: '100%',
    priority: 'medium',
    useFor: ['海外旅行', '親との海外旅行', '旅行中の連絡手段', 'eSIM'],
    notes: ['人物画像NG', '社名・サービス名・表記ゆれKWはリスティングNG', '広告表示必須', '広告掲載URL提出が必要'],
  },
  'maikai-hawaii-tours': {
    id: 'maikai-hawaii-tours', network: 'a8', label: 'PR',
    category: 'travel-overseas', subcategory: 'hawaii-tour',
    title: 'ハワイ家族旅行の現地ツアーを考える',
    description: 'ハワイでの空港送迎や観光ツアーを考える時の選択肢です。予約条件や成果対象は公式サイトで確認してください。',
    cta: 'ハワイ旅行の選択肢を確認する',
    url: 'https://px.a8.net/svt/ejp?a8mat=4B7XX7+5VCWJ6+54RO+HVNAP',
    imageUrl: 'https://www23.a8.net/svt/bgt?aid=260711035355&wid=001&eno=01&mid=s00000023946003003000&mc=1',
    trackingPixel: 'https://www19.a8.net/0.gif?a8mat=4B7XX7+5VCWJ6+54RO+HVNAP',
    imageWidth: 300, imageHeight: 250,
    programName: '25年の信頼と実績！ハワイ旅行をもっと自由に、もっと快適に【Maikai Hawaii Tours】',
    programId: 's00000023946003', commission: 'ツアー催行10%', epc: '-', approvalRate: '-',
    priority: 'medium',
    useFor: ['ハワイ旅行', '親との海外旅行', '家族旅行', '現地ツアー'],
    notes: ['無料見積りフォーム・問い合わせからの申込はNG', '催行不可による払い戻しはNG', 'マイカイ・Maikai・Maikai Hawaii Toursなど商標・商品名関連ワードはリスティングNG'],
  },
};

const PRIORITY_RANK: Record<A8Priority, number> = { high: 0, medium: 1, low: 2 };

/**
 * frontmatter で指定された id 順に取り出す（不明idは無視）。
 * max を指定するとその枚数で打ち切る（記事別上限：gift4枚・travel3枚など）。
 * 指定順を尊重しつつ、順序が同じなら priority で安定化する必要はない
 * （記事側で優先順に並べて渡す運用）。
 */
export function getA8SeasonalAdsByIds(ids: string[] = [], max?: number): A8SeasonalAd[] {
  const ads = ids
    .map((id) => A8_SEASONAL_ADS[id])
    .filter((a): a is A8SeasonalAd => Boolean(a));
  return typeof max === 'number' ? ads.slice(0, max) : ads;
}

/** priority の高い順に並べ替える（補助用途）。 */
export function sortByPriority(ads: A8SeasonalAd[]): A8SeasonalAd[] {
  return [...ads].sort((a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority]);
}

export const A8_SEASONAL_DISCLOSURE_TEXT =
  '当サイトではアフィリエイト広告（A8.net）を利用しています。掲載しているサービスは、必要に応じた選択肢の一つとして紹介しており、利用を強制するものではありません。商品情報・価格・在庫・配送・予約条件・キャンペーン・成果対象条件等は、必ず公式サイトでご確認ください。';
