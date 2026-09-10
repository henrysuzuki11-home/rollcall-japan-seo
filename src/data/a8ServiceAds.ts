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
  // ラクウル（株式会社ネクサスプロパティマネジメント）。相続した不動産（実家・土地・
  // マンション）の売却相談。A8 s00000024144002。href/img/1px/a8mat/aid/mid は発行値のまま。
  //   成果は「WEB問い合わせ＋30日以内に“相続人本人”であることの確認」。したがって
  //   送客文脈は「すでに相続が発生し、相続人本人が売却を検討」に限定する。生前相談・
  //   親が存命中の売却相談を主要CVにしない。
  //   ★禁止：必ず高く/早く売れる、相場より高く買取、一番高く売れる、絶対損しない 等の断定。
  //   役割分担：ラクウル=相続した不動産の売却相談（全国）、ミライアス=一般的な売却査定
  //   （首都圏）、nocos=相続手続きそのもの。同一記事で横並び強掲載しない（1記事1メインCV）。
  //   掲載は「相続した不動産の売却」文脈の記事のみ。
  'rakuuru-souzoku': {
    id: 'rakuuru-souzoku',
    network: 'a8',
    advertiserName: 'ラクウル 相続不動産売却',
    programName: 'rakuuru',
    programId: 's00000024144002',
    clickUrl: 'https://px.a8.net/svt/ejp?a8mat=4BC4QS+7E4SYI+56AO+BY641',
    imageUrl: 'https://www20.a8.net/svt/bgt?aid=260906500447&wid=002&eno=01&mid=s00000024144002007000&mc=1',
    trackingPixelUrl: 'https://www11.a8.net/0.gif?a8mat=4BC4QS+7E4SYI+56AO+BY641',
    imageWidth: 300,
    imageHeight: 250,
    category: 'souzoku-real-estate',
    isActive: true,
    approvalStatus: 'approved',
    disclosure: 'PR',
    title: '相続した不動産の売却を相談する',
    description:
      '相続した実家・土地・マンションの売却を相談できるサービスの一つです。不動産の売買のほか、リフォームや賃貸管理などの関連領域も扱い、士業との連携体制があります。相談内容や進め方は問い合わせ時にご確認ください。',
    cta: '相続した不動産について相談する',
    imageAlt: '相続した不動産の売却相談サービスの広告',
    placementArticles: ['souzoku-jikka-baikyaku-nagare'],
    notes: [
      '成果はWEB問い合わせ＋30日以内の“相続人本人”確認。相続発生後・相続人本人の売却検討に限定し、生前/存命中の相談を主要CVにしない。',
      '「必ず高く/早く売れる」「一番高く」「絶対損しない」等の断定は禁止。広告主PR文を丸写ししない。',
    ],
  },
  // ALGO Chair Pro（株式会社アイル）。在宅ワーク環境への自己投資（エルゴノミクス
  // チェア）の選択肢の一つとして、リモートワーク・在宅勤務・仕事環境改善の文脈の
  // 記事にのみ紹介する。プログラムID s00000027668001。
  //
  // 2026-09-10 A8発行コードを受領し有効化（href/img/1px/a8mat/aid/mid は発行値のまま）。
  //   バナーは 350×240。改変せずA8配信のまま。
  //
  // 【コンプライアンス】健康効果の断定（腰痛改善/肩こりが治る/姿勢矯正 等）禁止。
  //   自己投資はOKだが「生産性が必ず上がる/年収が上がる/人生が変わる」等の断定禁止。
  //   介護を理由に購入を煽らない。数量限定（30台限定 等）は現在有効と確認できない限り
  //   本文に書かない。価格は公式で確認できる場合に価格帯として明示。
  'algo-chair-pro': {
    id: 'algo-chair-pro',
    network: 'a8',
    advertiserName: 'ALGO Chair Pro',
    programName: 'algo-chair-pro',
    programId: 's00000027668001',
    clickUrl: 'https://px.a8.net/svt/ejp?a8mat=4BC7V7+7JHPEI+5XHK+614CX',
    imageUrl: 'https://www26.a8.net/svt/bgt?aid=260910547456&wid=002&eno=01&mid=s00000027668001013000&mc=1',
    trackingPixelUrl: 'https://www19.a8.net/0.gif?a8mat=4BC7V7+7JHPEI+5XHK+614CX',
    imageWidth: 350,
    imageHeight: 240,
    category: 'work-environment',
    isActive: true,
    approvalStatus: 'approved',
    disclosure: 'PR',
    title: 'エルゴノミクスチェアという選択肢',
    description:
      '長時間のデスクワーク向けに、座面・背もたれ・アームレスト・ヘッドレスト・リクライニングなど複数箇所を調整できるエルゴノミクスチェアの一つです。仕様・価格・在庫・キャンペーンは公式サイトの最新情報をご確認ください。',
    cta: 'ALGO Chair Proの仕様を確認する',
    imageAlt: 'エルゴノミクスチェア ALGO Chair Pro の広告',
    placementArticles: ['zaitaku-work-jiko-toushi-chair'],
    notes: [
      '2026-09-10 A8広告コード受領・有効化（350×240）。成果は対象商品のWEB注文＋決済完了。',
      '健康効果の断定・購入煽り・未確認の数量限定表記は禁止。',
    ],
  },
  // ほけんNaviせつやくん（株式会社フィナンシャル・エージェンシー）。生命保険・医療保険・
  // 家計・老後資金などをFP（ファイナンシャルプランナー）に無料相談できるサービス。
  //   成果地点は「申込」ではなく“FPとの初回無料相談完了”（WEB申込→45日以内・対象69歳以下）。
  //   ★禁止：必ず安くなる/必ず得/相談すれば節約できる 等の断定、無料相談で特典がもらえる等の
  //     示唆、成果報酬のユーザー向け示唆、面談意思のない誘導。→ 表示は中立表現に限定。
  //   ★対象69歳以下。70代以上の送客を避けるため、記事は「親をきっかけに自分(40〜60代)も
  //     見直す」層を主要CVに設計する。掲載は家計・保険・老後資金の相談文脈の記事のみ。
  //   役割分担：松井証券=資産形成/NISA、ほけんNavi=家計・保険・老後資金の相談。
  'hoken-navi-setsuyakun': {
    id: 'hoken-navi-setsuyakun',
    network: 'a8',
    advertiserName: 'ほけんNaviせつやくん',
    programName: 'hoken-navi-setsuyakun',
    programId: 's00000027771001',
    clickUrl: 'https://px.a8.net/svt/ejp?a8mat=4BC735+EL4D3U+5YA6+5YZ75',
    imageUrl: 'https://www24.a8.net/svt/bgt?aid=260909537882&wid=002&eno=01&mid=s00000027771001003000&mc=1',
    trackingPixelUrl: 'https://www13.a8.net/0.gif?a8mat=4BC735+EL4D3U+5YA6+5YZ75',
    imageWidth: 300,
    imageHeight: 250,
    category: 'insurance-fp',
    isActive: true,
    approvalStatus: 'approved',
    disclosure: 'PR',
    title: '保険や家計をFPに相談するという選択肢',
    description:
      '生命保険・医療保険・家計・老後資金などを、ファイナンシャルプランナー（FP）に無料で相談できるサービスの一つです。相談内容によって提案は異なります。対象は69歳以下で、WEBからの申込です。',
    cta: '無料相談の内容を確認する',
    imageAlt: 'FPへの保険・家計の無料相談サービスの広告',
    placementArticles: ['oya-hoken-kakei-fp-soudan'],
    notes: [
      '成果地点はFPとの初回無料相談完了（WEB申込後45日以内・対象69歳以下）。申込＝成果ではない旨を誤認させない。',
      '「必ず安くなる/必ず得/特典がもらえる」等の断定・示唆や、成果報酬のユーザー向け示唆をしない。',
    ],
  },
  // QEEQ 海外レンタカー。海外でのレンタカー比較・予約。成果は海外レンタカーの利用完了。
  //   ★海外利用のみ対象。日本国内レンタカーは対象外のため、国内旅行記事には掲載しない。
  //   ★「AXA安心保険」についての記事掲載・紹介は禁止（本広告の文脈で触れない）。
  //   ★「最安/必ず安い」等は公式に確認できる根拠がない限り断定しない。中立に比較サービスの
  //     一つとして紹介。役割分担：Agoda=現地アクティビティ、QEEQ=海外の移動/レンタカー、
  //     日本旅行=国内旅行全体。掲載は海外旅行の移動文脈の記事のみ。
  'qeeq-rentacar': {
    id: 'qeeq-rentacar',
    network: 'a8',
    advertiserName: 'QEEQ 海外レンタカー',
    programName: 'qeeq-rentacar',
    programId: 's00000027697001',
    clickUrl: 'https://px.a8.net/svt/ejp?a8mat=4BC735+CY6G7U+5XPM+609HT',
    imageUrl: 'https://www23.a8.net/svt/bgt?aid=260909537783&wid=002&eno=01&mid=s00000027697001009000&mc=1',
    trackingPixelUrl: 'https://www15.a8.net/0.gif?a8mat=4BC735+CY6G7U+5XPM+609HT',
    imageWidth: 300,
    imageHeight: 250,
    category: 'travel-rentacar',
    isActive: true,
    approvalStatus: 'approved',
    disclosure: 'PR',
    title: '海外レンタカーを比較して選ぶ',
    description:
      '海外でのレンタカーを比較・予約できるサービスの一つです（海外利用が対象です）。車種・料金・保険・条件は予約前に公式サイトの最新情報をご確認ください。',
    cta: '海外レンタカーを比較する',
    imageAlt: '海外レンタカー比較・予約サービスの広告',
    placementArticles: ['oya-kaigai-ryokou-rentacar'],
    notes: [
      '成果は海外レンタカーのWEB予約＋180日以内の利用完了。日本国内・キャンセル・LINE/アプリ経由は対象外。',
      'AXA安心保険には触れない。「最安/必ず安い」等の断定はしない。',
    ],
  },
  // Agoda 遊び・体験予約（AGODA COMPANY PTE LTD）。旅行先での「遊び・体験」
  // （観光ツアー・テーマパーク・美術館・博物館・現地体験・アクティビティ等）の
  // WEB予約が成果対象。成果は予約時ではなく「実際の体験完了」時に発生する。
  //   ★ホテル・航空券・パッケージ・アプリ経由予約は成果対象外。したがって表示・CTAは
  //     「遊び・体験を探す/予約する」に限定し、宿泊・航空券の予約と誤認させない。
  //   ★日本旅行(VC/nta-travel)＝国内旅行計画・宿泊、Agoda＝旅行先の体験・観光、と役割
  //     を分ける。掲載は「旅行先での体験・観光」文脈の記事のみ。
  //   バナーは 640×340。改変せずA8配信のまま。断定（高齢者なら誰でも参加可等）は禁止。
  //   AgodaブランドをURL/デザインに使わない（運営サイトと誤認させない）。
  'agoda-taiken': {
    id: 'agoda-taiken',
    network: 'a8',
    advertiserName: 'Agoda 遊び・体験予約',
    programName: 'agoda-activities',
    programId: 's00000022946005',
    clickUrl: 'https://px.a8.net/svt/ejp?a8mat=4BC735+F5D3OA+4X1W+TSYJL',
    imageUrl: 'https://www29.a8.net/svt/bgt?aid=260909537916&wid=002&eno=01&mid=s00000022946005006000&mc=1',
    trackingPixelUrl: 'https://www18.a8.net/0.gif?a8mat=4BC735+F5D3OA+4X1W+TSYJL',
    imageWidth: 640,
    imageHeight: 340,
    category: 'travel-experience',
    isActive: true,
    approvalStatus: 'approved',
    disclosure: 'PR',
    title: '旅行先で親と楽しめる遊び・体験を探す',
    description:
      '観光ツアー・美術館・博物館・現地体験など、旅行先での「遊び・体験」をWEBから事前に予約できるサービスの一つです。所要時間・集合場所・バリアフリー・キャンセル条件などは予約前にご確認ください（ホテル・航空券ではなく、遊び・体験の予約が対象です）。',
    cta: '旅行先で楽しめる体験を探す',
    imageAlt: '旅行先の遊び・体験予約サービスの広告',
    placementArticles: ['oyakoukou-ryokou-taiken'],
    notes: [
      '成果対象は遊び・体験のWEB予約＋実際の体験完了。ホテル・航空券・パッケージ・アプリ経由・キャンセル/未参加は対象外。',
      'CTAは体験予約に限定し、宿泊・航空券の予約と誤認させない。高齢者が「誰でも参加可」等の断定はしない。',
    ],
  },
  // RIZAP COOK（RIZAP株式会社）。マンツーマンの料理レッスン。親の食生活をきっかけに
  // 「自分が家庭料理を作れるようになりたい」家族向けの選択肢の一つとして紹介する。
  //   成果地点は「来店完了」（WEB申込→30日以内の来店）。予約のみ・カウンセリング予約
  //   だけでは成果にならない点を、CTA・本文で誤認させない（「予約で報酬」的表現は禁止）。
  //   否認条件に「会員紹介制度・割引制度の記載/利用」があるため、紹介割引には一切触れない。
  //   バナーは 640×640。改変せずA8配信のまま。断定（必ず上達等）・健康効果の断定は禁止。
  //   料金・店舗・コースは公式の最新情報を確認（古いPR文を丸写ししない）。掲載は料理学習
  //   文脈の記事のみ。
  'rizap-cook': {
    id: 'rizap-cook',
    network: 'a8',
    advertiserName: 'RIZAP COOK',
    programName: 'rizap-cook',
    programId: 's00000001671076',
    clickUrl: 'https://px.a8.net/svt/ejp?a8mat=4BC6B4+5N0UU2+CW6+CKRXU9',
    imageUrl: 'https://www29.a8.net/svt/bgt?aid=260908528341&wid=002&eno=01&mid=s00000001671076049000&mc=1',
    trackingPixelUrl: 'https://www18.a8.net/0.gif?a8mat=4BC6B4+5N0UU2+CW6+CKRXU9',
    imageWidth: 640,
    imageHeight: 640,
    category: 'cooking-lesson',
    isActive: true,
    approvalStatus: 'approved',
    disclosure: 'PR',
    title: 'マンツーマンの料理レッスンという選択肢',
    description:
      '受講者のスキルや目標に合わせ、マンツーマン形式で家庭料理などを学べる料理教室の一つです。各工程を自分で実践するスタイルで、オンラインでの復習サポートが用意されている場合があります。料金・店舗・コース内容は公式サイトの最新情報をご確認ください。',
    cta: 'マンツーマン料理レッスンの内容を確認する',
    imageAlt: 'RIZAP COOK（マンツーマン料理レッスン）の広告',
    placementArticles: ['oya-no-tame-ni-ryouri-kihon'],
    notes: [
      '成果地点は来店完了（WEB申込後30日以内）。予約・カウンセリング予約だけでは成果にならない旨を誤認させない。',
      '会員紹介制度・割引制度には触れない（否認条件）。健康効果の断定・「必ず上達」等の断定表現も使わない。',
    ],
  },
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
