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
  // おみおくりペット火葬（GRANCIEL株式会社）。A8 s00000026781002。バナー 300×250。
  //   ★位置づけ：「実家のペットが亡くなったら／離れて暮らす家族の見送り準備」という恒久的な
  //     情報記事の中の、対象地域の読者向け選択肢の一つ。単独の火葬業者おすすめ記事にしない。
  //   ★地域限定（最重要）：全国対応と書かない。公式(2026-09-25 omiokuri-pet.co.jp/lp)確認では
  //     対応は静岡県・愛知県の一部地域のみ。A8成果対象地域は「静岡県西部・中部／愛知県中部・東部」。
  //     サービス対応地域とA8成果対象地域を混同しない。地域外読者に問い合わせを促さない。
  //   ★公式確認(2026-09-25)：訪問火葬＋合同火葬/個別火葬、体重40kgまで、24時間電話対応。料金は
  //     プラン・体重で変動するため記事に固定掲載せず「公式で確認」に寄せる（古い料金の固定化を避ける）。
  //   ★成果条件：新規の電話問い合わせ＋葬儀日程調整完了。単なる電話発信で成果になると書かない。
  //     死・不安を煽らない（今すぐ準備しないと後悔/突然死んだら大変/最も安心/唯一/すぐ電話すべき 等
  //     の断定は、広告主PR文にあっても転載しない）。「電話するだけで無料」等も書かない。
  //   ★提携終了日：A8管理画面表示 2026-10-03。終了後は isActive:false / approvalStatus:'ended' に
  //     切替え、clickUrl等を空にする（記事本体は広告非依存で存続する構成）。
  'omiokuri-pet-kaso': {
    id: 'omiokuri-pet-kaso', network: 'a8', advertiserName: 'おみおくりペット火葬',
    programName: 'omiokuri-pet', programId: 's00000026781002',
    clickUrl: 'https://px.a8.net/svt/ejp?a8mat=4BCJJT+DRCOUY+5QN6+BXQOH',
    imageUrl: 'https://www25.a8.net/svt/bgt?aid=260925689832&wid=002&eno=01&mid=s00000026781002005000&mc=1',
    trackingPixelUrl: 'https://www10.a8.net/0.gif?a8mat=4BCJJT+DRCOUY+5QN6+BXQOH',
    imageWidth: 300, imageHeight: 250, category: 'pet-memorial', isActive: true, approvalStatus: 'approved', disclosure: 'PR',
    title: '静岡・愛知の一部地域のペット火葬・訪問火葬の選択肢',
    description: '犬・猫などのペットの訪問火葬・合同火葬・個別火葬に対応するサービスの一つです。対応は静岡県・愛知県の一部地域に限られ、全国対応ではありません。対応地域・プラン・料金・受付方法は公式サイトの最新情報をご確認ください（2026年9月25日確認）。',
    cta: '対応地域・サービス内容を確認する', imageAlt: 'ペットの訪問火葬・火葬サービス おみおくりペット火葬 の広告',
    placementArticles: ['jikka-pet-nakunattara'],
    notes: [
      '静岡・愛知の一部地域限定＝全国対応と書かない。地域外読者に問い合わせを促さない。サービス対応地域(公式)とA8成果対象地域(静岡西部・中部/愛知中部・東部)を混同しない。',
      '成果条件：新規の電話問い合わせ＋葬儀日程調整完了。単なる電話発信で成果になると書かない。死・不安を煽らない断定禁止。料金は変動のため固定掲載せず公式確認へ。',
      '提携終了日：A8管理画面表示 2026-10-03。終了後は isActive:false / approvalStatus:"ended" / endedAt を設定し clickUrl・imageUrl・trackingPixelUrl を空にする。記事本体は広告非依存で存続。',
    ],
  },
  // ONEKOSAMA OINUSAMA（犬猫用品の通販）。A8 s00000015995003。バナー 336×280。
  //   ★位置づけ：「ペット好きの親／親と暮らす犬・猫」への贈り物・ペット用品の選択肢。単独の
  //     ペットEC紹介にせず、既存の「親への贈り物」文脈に接続する。
  //   ★公式(2026-09-25 oneko-sama.com)確認：キャットタワー/猫トイレ/猫砂/ペットウェア(犬服・猫服・
  //     着物・袴・浴衣)/キャリー・抱っこ紐/ペットバギー/ハーネス・リード/寝具・マット/おもちゃ/
  //     防災グッズ/空調ペット服 等を確認。健康効能の宣伝はしない（用品の区分・用途の事実のみ）。
  //   ★成果：WEB注文後30日以内の入金確認。定期便猫砂は2回目以上の継続が必要。LINE経由注文は成果
  //     対象外＝LINEへ誘導する独自CTAを作らない。断定（絶対喜ばれる/最高 等）禁止。価格・在庫・
  //     ラインナップは変動するため公式で確認に寄せる。
  'onekosama-pet': {
    id: 'onekosama-pet', network: 'a8', advertiserName: 'ONEKOSAMA OINUSAMA',
    programName: 'onekosama-oinusama', programId: 's00000015995003',
    clickUrl: 'https://px.a8.net/svt/ejp?a8mat=4BCJJT+DE95JU+3FF2+HWPVL',
    imageUrl: 'https://www20.a8.net/svt/bgt?aid=260925689810&wid=002&eno=01&mid=s00000015995003008000&mc=1',
    trackingPixelUrl: 'https://www14.a8.net/0.gif?a8mat=4BCJJT+DE95JU+3FF2+HWPVL',
    imageWidth: 336, imageHeight: 280, category: 'pet-goods', isActive: true, approvalStatus: 'approved', disclosure: 'PR',
    title: '犬・猫と暮らす家族へのペット用品の選択肢',
    description: 'キャットタワー・猫トイレ・ペットウェア（犬服・猫服・着物）・キャリー・ペットベッド・防災グッズなど、犬猫用品を扱う通販の一つです。ペット好きの親や、親と暮らす犬・猫への贈り物の選択肢に。取扱商品・価格・在庫は公式サイトの最新情報をご確認ください（2026年9月25日確認）。',
    cta: 'ペット用品・ペットグッズを見る', imageAlt: '犬猫用品の通販 ONEKOSAMA OINUSAMA の広告',
    placementArticles: ['oya-pet-gift-erabikata'],
    notes: ['ペット好きの親への贈り物文脈の主CV。ランキング化しない。健康効能は書かない（用品の用途・区分の事実のみ）。', '成果はWEB注文＋30日以内入金。定期便猫砂は2回目以上継続が条件。LINE経由は対象外＝LINE誘導しない。断定禁止。'],
  },
  // Takashirt（タカシャツ）。犬・猫モチーフのTシャツ・グッズ、写真/名入れ対応。A8 s00000027462001。
  //   バナー 300×250。★位置づけ：単なる猫Tシャツ紹介にせず「ペット好きの親へのプレゼント」「愛犬・
  //     愛猫の写真を家族の思い出としてグッズにする」文脈で紹介。
  //   ★公式(2026-09-25 takashirt.jp)確認：犬・猫柄のTシャツ/トート/パーカー/スマホケース/マグカップ、
  //     犬種別T、名入れ・ペット写真入れ対応（オリジナルTシャツ/キーホルダー等）を確認。
  //   ★成果：購入10%。断定（絶対喜ばれる 等）禁止。デザイン・対応商品・価格は公式で確認に寄せる。
  'takashirt-pet': {
    id: 'takashirt-pet', network: 'a8', advertiserName: 'Takashirt',
    programName: 'takashirt', programId: 's00000027462001',
    clickUrl: 'https://px.a8.net/svt/ejp?a8mat=4BCJJT+E9T4M2+5VWC+5YZ75',
    imageUrl: 'https://www26.a8.net/svt/bgt?aid=260925689863&wid=002&eno=01&mid=s00000027462001003000&mc=1',
    trackingPixelUrl: 'https://www18.a8.net/0.gif?a8mat=4BCJJT+E9T4M2+5VWC+5YZ75',
    imageWidth: 300, imageHeight: 250, category: 'pet-goods', isActive: true, approvalStatus: 'approved', disclosure: 'PR',
    title: '犬・猫モチーフのグッズ・写真入れの選択肢',
    description: '犬・猫モチーフのTシャツ・トートバッグ・スマホケースなどを扱い、ペット写真入れや名入れに対応した商品もある通販の一つです。ペット好きの親への贈り物や、愛犬・愛猫の写真を思い出のグッズにする選択肢に。デザイン・対応商品・価格は公式サイトの最新情報をご確認ください（2026年9月25日確認）。',
    cta: 'ペットモチーフ・写真入れグッズを見る', imageAlt: '犬・猫モチーフのグッズ通販 Takashirt の広告',
    placementArticles: ['oya-pet-gift-erabikata', 'oya-pet-shashin-omoide'],
    notes: ['ペットの贈り物／写真を思い出グッズにする文脈で紹介。ランキング化しない。断定禁止。', '成果は購入。デザイン・対応商品・価格は公式で確認。'],
  },
  // Qualial（クオリアル／萩原株式会社）。ベッド・収納・テーブル・ソファ・ラグ等の家具・インテリア通販。
  //   A8 s00000027728001。バナー 300×250（wid=003）。遷移先は px.a8.net 経由（改変しない）。
  //   ★位置づけ：韓国インテリア通販として量産しない。「親の住環境×実家整理×片付け後の家具見直し
  //     ×暮らしやすい部屋づくり」文脈で紹介。
  //   ★役割分担：BLUEBOX=マットレスそのもの、Qualial=ベッド/収納/テーブル/ソファ/ラグ等を含む
  //     住環境の家具全般。睡眠・マットレス記事はBLUEBOX主CV、実家整理・家具・部屋づくり記事はQualial主CV。
  //     住宅そのものの工事はRe:est。
  //   ★禁止：高齢者向け家具/介護用家具/転倒防止家具 と事実確認なく表現しない（高齢者向け専用品では
  //     ない）。安全性は「一般論」と「商品仕様」を明確に分離。断定表現を使わない。LINE経由注文は成果
  //     対象外＝LINEへ誘導する独自CTAを作らない。PR文は転載しない。
  'qualial-furniture': {
    id: 'qualial-furniture', network: 'a8', advertiserName: 'Qualial',
    programName: 'qualial', programId: 's00000027728001',
    clickUrl: 'https://px.a8.net/svt/ejp?a8mat=4BCFNL+51L9TU+5XY8+5YZ75',
    imageUrl: 'https://www22.a8.net/svt/bgt?aid=260920641305&wid=003&eno=01&mid=s00000027728001003000&mc=1',
    trackingPixelUrl: 'https://www11.a8.net/0.gif?a8mat=4BCFNL+51L9TU+5XY8+5YZ75',
    imageWidth: 300, imageHeight: 250, category: 'furniture-interior', isActive: true, approvalStatus: 'approved', disclosure: 'PR',
    title: '親の部屋を整えるときの家具選びの選択肢',
    description: 'ベッド・収納・テーブル・ソファ・ラグなど、部屋づくりに使える家具・インテリアを扱う通販の一つです。実家を片付けたあと、親が暮らしやすい部屋へ整える際の家具選びの選択肢に。サイズ・素材・価格は公式サイトの最新情報をご確認ください。',
    cta: '家具・収納・インテリアを見る', imageAlt: '家具・インテリア通販 Qualial の広告',
    placementArticles: ['jikka-kagu-heyazukuri'],
    notes: ['家具・部屋づくり文脈の主CV（BLUEBOX=マットレス、Re:est=住宅工事と棲み分け）。高齢者向け専用/介護用/転倒防止家具と誤認させない。', '成果はWEB注文＋入金確認。LINE経由は対象外のためLINE誘導しない。安全性は一般論と商品仕様を分離。断定禁止。'],
  },
  // POSIWILLエージェント紹介（自分に合う転職エージェントを探す）。A8 s00000025557003。バナー 300×250。
  //   ★主用途＝STEP2「転職したいが、どのエージェントに相談すればいいか分からない」段階。
  //     キャリアカ(STEP1自己分析)→POSIWILL(STEP2エージェント選び)→キャリナビ(STEP3キャリア相談)
  //     →sXars(STEP4コンサル)の順。1ページに4案件を広告一覧のように並べない（Primary1＋Secondary
  //     最大1）。POSIWILL=「誰に相談するか」を探す、キャリナビ=「自分のキャリアをどうするか」を相談。
  //   ★対象：正社員転職希望者。学生・50歳以上・フリーランスのみ希望は成果対象外＝シニア中心記事に
  //     主CTAとして設置しない。想定読者年齢が合う記事にのみ掲載。
  //   ★禁止：おすすめNo.1/一番信頼できる/絶対に失敗しない 等の断定。親の不安を利用して転職を煽らない。
  //     「自分に合うエージェントを探す選択肢の一つ」として紹介。PR文は転載しない。
  'posiwill-agent': {
    id: 'posiwill-agent', network: 'a8', advertiserName: 'POSIWILLエージェント紹介',
    programName: 'posiwill-agent', programId: 's00000025557003',
    clickUrl: 'https://px.a8.net/svt/ejp?a8mat=4BC735+EPVTY2+5H76+HVNAP',
    imageUrl: 'https://www21.a8.net/svt/bgt?aid=260909537890&wid=002&eno=01&mid=s00000025557003003000&mc=1',
    trackingPixelUrl: 'https://www12.a8.net/0.gif?a8mat=4BC735+EPVTY2+5H76+HVNAP',
    imageWidth: 300, imageHeight: 250, category: 'career-agent', isActive: true, approvalStatus: 'approved', disclosure: 'PR',
    title: '自分に合う転職エージェントを探すという選択肢',
    description: '「転職したいけれど、どのエージェントに相談すればいいか分からない」ときに、自分に合う転職エージェント選びを相談できるサービスの一つです。無料相談があります。対象は正社員転職を考える方（学生や、フリーランスのみ希望の方は対象外の場合があります）。内容・対象は公式サイトでご確認ください。',
    cta: '自分に合う転職エージェントを探す', imageAlt: '転職エージェント紹介サービスの広告',
    placementArticles: ['tenshoku-agent-erabikata'],
    notes: ['STEP2（エージェント選びに迷う段階）の主用途。対象は正社員転職希望者、学生・50歳以上・フリーランスのみ希望は対象外＝シニア中心記事に主CTAを置かない。', '「No.1/一番信頼/絶対失敗しない」等の断定禁止。親の不安を利用して煽らない。1ページに4案件を並べない。'],
  },
  // Kimochi｜オンライン心理カウンセリング（rementalグループ）。A8 s00000026504001。バナー 400×209。
  //   ★位置づけ：高齢の親に受けさせる訴求ではなく「親を支える側（子世代）の心の負担」への選択肢。
  //   ★最重要（メンタルヘルス／YMYL）：治る/うつが改善/受ければ解決/精神的に弱い人向け 等は禁止。
  //     読者を精神疾患と推測しない。自己診断を促さない。恐怖・不安を煽ってCTAを押させない。
  //     ★医療機関の代替として表示しない。緊急時（自傷・自殺念慮等）はアフィリエイトCTAでなく
  //     公的緊急相談・医療につなぐ設計を優先する（記事側で明記）。
  //   ★公式(2026-09-18 kimochi-mental.com)確認：オンラインカウンセリング／「国家資格(公認心理師)を
  //     持ったカウンセラーだけが在籍」／月額プラン制。医療機関でない旨は公式ページに明示がないため
  //     記事側で「医療機関の代替ではない」と明記。PR文は転載しない。
  //   導線：負担→自分で整理→家族・友人に話す→自治体/地域包括支援センター等の公的相談→専門家→
  //     オンラインで相談できる民間サービス→Kimochi の順序を基本に、静かに置く。
  'kimochi-counseling': {
    id: 'kimochi-counseling', network: 'a8', advertiserName: 'Kimochi オンライン心理カウンセリング',
    programName: 'kimochi', programId: 's00000026504001',
    clickUrl: 'https://px.a8.net/svt/ejp?a8mat=4BCDBJ+78RWII+5OI8+631SX',
    imageUrl: 'https://www25.a8.net/svt/bgt?aid=260917615438&wid=002&eno=01&mid=s00000026504001022000&mc=1',
    trackingPixelUrl: 'https://www15.a8.net/0.gif?a8mat=4BCDBJ+78RWII+5OI8+631SX',
    imageWidth: 400, imageHeight: 209, category: 'mental-care', isActive: true, approvalStatus: 'approved', disclosure: 'PR',
    title: '心が疲れたときに相談できる選択肢',
    description: 'オンラインで公認心理師に相談できる、心のケアのサービスの一つです。月額プラン制で、スマホ・PCから利用できます。医療機関ではなく、治療を目的とするものではありません。料金・プラン・対象は公式サイトの最新情報をご確認ください。',
    cta: 'オンライン心理相談の内容を確認する', imageAlt: 'オンライン心理カウンセリングサービスの広告',
    placementArticles: ['oya-shinpai-tsukareta-kokoro'],
    notes: ['メンタルヘルス。治る/改善/解決の断定・精神疾患の推測・自己診断誘導・不安を煽るCTAは禁止。医療機関の代替として表示しない。', '緊急時は公的緊急相談・医療を優先する導線を記事に置く。公式で確認できた事実（公認心理師/オンライン/月額プラン）のみ記載。'],
  },
  // キャリアカ｜AIキャリアサービス（自己分析・キャリア整理の入口）。A8 s00000008977002。対象18〜44歳。
  //   ★成果150円。単独記事は作らず、既存の自己投資/キャリア導線に「STEP1（転職を決める前の自己
  //     分析）」として静かに置く。★150円へのクリックを増やすために、キャリナビ(11,000)・sXars
  //     (25,000)への導線を弱めないこと（キャリナビ記事ではキャリナビが主CV、キャリアカは前段の
  //     テキストリンク）。断定（必ず転職成功 等）禁止。
  //   段階分け：STEP1 キャリアカ(自己分析)→STEP2 キャリナビ(相談)→STEP3 sXars(コンサル転職)。
  'careerca-ai': {
    id: 'careerca-ai', network: 'a8', advertiserName: 'キャリアカ',
    programName: 'careerca', programId: 's00000008977002',
    clickUrl: 'https://px.a8.net/svt/ejp?a8mat=4BCDBJ+6QBGRE+1X9M+C6YGX',
    imageUrl: 'https://www22.a8.net/svt/bgt?aid=260917615407&wid=002&eno=01&mid=s00000008977002048000&mc=1',
    trackingPixelUrl: 'https://www17.a8.net/0.gif?a8mat=4BCDBJ+6QBGRE+1X9M+C6YGX',
    imageWidth: 300, imageHeight: 250, category: 'career-self', isActive: true, approvalStatus: 'approved', disclosure: 'PR',
    title: '転職を決める前の自己分析・キャリア整理',
    description: 'AIを使って自己分析やキャリアの整理ができるサービスの一つです。転職するか決めていない段階の「まず自分を知る」入口として。対象は18〜44歳、プロフィール登録から始められます。内容・対象は公式サイトでご確認ください。',
    cta: '自己分析・キャリア整理の内容を見る', imageAlt: 'AIキャリア自己分析サービスの広告',
    placementArticles: ['oya-chikaku-uturn-tenshoku'],
    notes: ['STEP1（転職を決める前の自己分析）の入口として静かに置く。キャリナビ/sXarsへの導線を弱めない。', '成果150円。「必ず転職成功/誰でも」等の断定禁止。対象18〜44歳。'],
  },
  // ネイティブキャンプ留学（大人の自己投資・親子/三世代の海外滞在＋学び）。A8 s00000014758002。
  //   成果は正式見積完了。学生向け留学に寄せず「40〜60代の学び直し／親子・三世代の海外体験」文脈。
  //   断定（必ず話せる/絶対安心 等）禁止。国・費用・期間は公式で確認。
  'nativecamp-ryugaku': {
    id: 'nativecamp-ryugaku', network: 'a8', advertiserName: 'ネイティブキャンプ留学',
    programName: 'nativecamp-ryugaku', programId: 's00000014758002',
    clickUrl: 'https://px.a8.net/svt/ejp?a8mat=4BCDBJ+6UHHZU+35VG+BXB8X',
    imageUrl: 'https://www26.a8.net/svt/bgt?aid=260917615414&wid=002&eno=01&mid=s00000014758002003000&mc=1',
    trackingPixelUrl: 'https://www18.a8.net/0.gif?a8mat=4BCDBJ+6UHHZU+35VG+BXB8X',
    imageWidth: 300, imageHeight: 250, category: 'study-abroad', isActive: true, approvalStatus: 'approved', disclosure: 'PR',
    title: '語学留学（大人・親子）の相談・見積もり',
    description: '語学留学の相談・見積もりができるサービスの一つです。40代・50代からの学び直しや、親子・三世代での海外滞在＋学びの選択肢に。対象国・費用・期間は公式サイトの最新情報をご確認ください。',
    cta: '語学留学の内容・見積もりを確認する', imageAlt: '語学留学の相談・見積もりサービスの広告',
    placementArticles: ['otona-oyako-ryugaku'],
    notes: ['成果は正式見積完了。学生向けに寄せず大人の自己投資・親子/三世代の海外体験文脈で紹介。', '「必ず話せる/絶対安心」等の断定禁止。費用・期間・国は公式で確認。'],
  },
  // BeBe オンラインストア（こども服・ギフト）。A8 s00000027677001。孫・子どもへの贈り物文脈。
  //   「おすすめ子ども服ランキング」化しない。断定（絶対喜ばれる 等）禁止。サイズ・価格は公式で確認。
  'bebe-store': {
    id: 'bebe-store', network: 'a8', advertiserName: 'BeBe オンラインストア',
    programName: 'bebe', programId: 's00000027677001',
    clickUrl: 'https://px.a8.net/svt/ejp?a8mat=4BCDBJ+6HZEAI+5XK2+5YZ75',
    imageUrl: 'https://www20.a8.net/svt/bgt?aid=260917615393&wid=002&eno=01&mid=s00000027677001003000&mc=1',
    trackingPixelUrl: 'https://www17.a8.net/0.gif?a8mat=4BCDBJ+6HZEAI+5XK2+5YZ75',
    imageWidth: 300, imageHeight: 250, category: 'kids-gift', isActive: true, approvalStatus: 'approved', disclosure: 'PR',
    title: '孫・子どもへのこども服・ギフト',
    description: 'こども服やキッズ向けアイテムを扱うオンラインストアの一つです。出産祝い・誕生日・帰省時の贈り物の選択肢に。サイズ・在庫・価格は公式サイトの最新情報をご確認ください。',
    cta: 'こども服・ギフトの商品を見る', imageAlt: 'こども服・ギフトのオンラインストアの広告',
    placementArticles: ['mago-present-mono-taiken'],
    notes: ['孫・子どもへの贈り物文脈で紹介（ランキング化しない）。', '「絶対喜ばれる」等の断定禁止。サイズ・価格は公式で確認。'],
  },
  // CampusTop（6〜12歳向け英語）。A8 s00000020929005。孫への「体験・学び」を贈る文脈。
  //   無料カウンセリングが成果。断定（必ず話せる 等）禁止。対象年齢・料金は公式で確認。
  'campustop-kids': {
    id: 'campustop-kids', network: 'a8', advertiserName: 'CampusTop',
    programName: 'campustop', programId: 's00000020929005',
    clickUrl: 'https://px.a8.net/svt/ejp?a8mat=4BCDBJ+75SQHM+4HHM+TSBE9',
    imageUrl: 'https://www24.a8.net/svt/bgt?aid=260917615433&wid=002&eno=01&mid=s00000020929005003000&mc=1',
    trackingPixelUrl: 'https://www18.a8.net/0.gif?a8mat=4BCDBJ+75SQHM+4HHM+TSBE9',
    imageWidth: 300, imageHeight: 250, category: 'kids-english', isActive: true, approvalStatus: 'approved', disclosure: 'PR',
    title: '小学生の英語・学びを贈るという選択肢',
    description: '6〜12歳向けの英語学習サービスの一つです。孫や子どもへ「体験・学び」を贈る選択肢として。対象年齢・料金・内容は公式サイトの最新情報をご確認ください。無料カウンセリングがあります。',
    cta: '小学生向け英語プログラムの内容を見る', imageAlt: '小学生向け英語学習サービスの広告',
    placementArticles: ['mago-present-mono-taiken'],
    notes: ['対象6〜12歳。孫への体験・学びを贈る文脈で紹介。成果は無料カウンセリング。', '「必ず話せる/誰でも上達」等の断定禁止。対象年齢・料金は公式で確認。'],
  },
  // RIZAPゴルフ（趣味・自己投資／体験ギフト）。A8 s00000001671069。定年後の趣味・親子で楽しむ文脈。
  //   ★本人申込は成果対象外＝セルフバック的訴求をしない。バナー 1200×628。断定禁止。
  'rizap-golf': {
    id: 'rizap-golf', network: 'a8', advertiserName: 'RIZAPゴルフ',
    programName: 'rizap-golf', programId: 's00000001671069',
    clickUrl: 'https://px.a8.net/svt/ejp?a8mat=4BCDBJ+70FU1M+CW6+BF1O1T',
    imageUrl: 'https://www26.a8.net/svt/bgt?aid=260917615424&wid=002&eno=01&mid=s00000001671069040000&mc=1',
    trackingPixelUrl: 'https://www11.a8.net/0.gif?a8mat=4BCDBJ+70FU1M+CW6+BF1O1T',
    imageWidth: 1200, imageHeight: 628, category: 'hobby', isActive: true, approvalStatus: 'approved', disclosure: 'PR',
    title: 'ゴルフを習うという趣味・自己投資',
    description: 'マンツーマンでゴルフを学べるスクールの一つです。定年後の趣味や、親子で楽しむきっかけ、体験型ギフトの選択肢に。料金・店舗・体験内容は公式サイトの最新情報をご確認ください。',
    cta: 'ゴルフレッスンの内容を確認する', imageAlt: 'マンツーマンのゴルフスクールの広告',
    placementArticles: ['parent-golf-memory'],
    notes: ['本人申込は成果対象外のためセルフバック訴求をしない。趣味・親子・体験ギフト文脈で紹介。', '「必ず上達/絶対失敗しない」等の断定禁止。料金・店舗は公式で確認。'],
  },
  // 京つけもの ニシダや（食べ物・消えものギフト）。A8 s00000021775001。親への食べ物ギフト文脈。
  //   健康効果を訴求しない（贈り物・食を楽しむ切り口）。断定禁止。商品・価格は公式で確認。
  'nishidaya-tsukemono': {
    id: 'nishidaya-tsukemono', network: 'a8', advertiserName: '京つけもの ニシダや',
    programName: 'nishidaya', programId: 's00000021775001',
    clickUrl: 'https://px.a8.net/svt/ejp?a8mat=4BCDBJ+7B5MXM+4O0M+609HT',
    imageUrl: 'https://www22.a8.net/svt/bgt?aid=260917615442&wid=002&eno=01&mid=s00000021775001009000&mc=1',
    trackingPixelUrl: 'https://www19.a8.net/0.gif?a8mat=4BCDBJ+7B5MXM+4O0M+609HT',
    imageWidth: 300, imageHeight: 250, category: 'food-gift', isActive: true, approvalStatus: 'approved', disclosure: 'PR',
    title: '京つけもの（親への食べ物ギフト）',
    description: '京都の漬物を扱う通販の一つです。離れて暮らす親への食べ物・消えものギフトや、敬老の日・帰省の手土産、ご飯のお供の選択肢に。商品・価格は公式サイトの最新情報をご確認ください。',
    cta: '京つけものの商品を見る', imageAlt: '京つけもの通販の広告',
    placementArticles: ['homecoming-local-food-family'],
    notes: ['健康効果を訴求せず、贈り物・食を楽しむ切り口で紹介。', '「絶対美味しい/必ず喜ばれる」等の断定禁止。商品・価格は公式で確認。'],
  },
  // ナノラル 薬用ホワイト＆プロテクト（薬用オーラルケア・医薬部外品）。A8 s00000027814002。
  //   ★健康・医療の断定禁止（治る/必ず改善/口臭がなくなる/高齢者に最適 等）。PR文の転載禁止。
  //   医薬部外品の効能は公式確認の範囲に限定。毎日の歯みがき用品の見直し文脈で紹介。バナー 300×250。
  'nanoral-oral': {
    id: 'nanoral-oral', network: 'a8', advertiserName: 'ナノラル 薬用ホワイト＆プロテクト',
    programName: 'nanoral', programId: 's00000027814002',
    clickUrl: 'https://px.a8.net/svt/ejp?a8mat=4BCDBJ+6OJ5Y2+5YM4+BXB8X',
    imageUrl: 'https://www21.a8.net/svt/bgt?aid=260917615404&wid=002&eno=01&mid=s00000027814002003000&mc=1',
    trackingPixelUrl: 'https://www14.a8.net/0.gif?a8mat=4BCDBJ+6OJ5Y2+5YM4+BXB8X',
    imageWidth: 300, imageHeight: 250, category: 'oral-care', isActive: true, approvalStatus: 'approved', disclosure: 'PR',
    title: '薬用オーラルケア用品という選択肢',
    description: '薬用ハミガキ（医薬部外品）のオーラルケア製品の一つです。毎日の歯みがき用品を見直すときの選択肢に。成分・使い方・効能や価格は公式サイトの最新情報をご確認ください。',
    cta: 'オーラルケア用品の詳細を確認する', imageAlt: '薬用オーラルケア用品の広告',
    placementArticles: ['oya-oral-care-minaoshi'],
    notes: ['健康・医療効果の断定禁止（治る/必ず改善/口臭がなくなる/高齢者に最適 等）。効能は公式確認の範囲に限定。', 'PR文の転載をしない。毎日の歯みがき用品の見直し文脈で紹介。'],
  },
  // BLUEBOX Z1 コイシ マットレス（Hong Kong Jianing Limited）。A8 s00000027770001。
  //   親の寝室・寝具環境を見直す文脈で紹介。対象商品は「Z1 コイシ」のみ（他BLUEBOX商品へ
  //   誤誘導しない）。バナー 300×250。遷移先は px.a8.net 経由で
  //   https://blueboxsleep.jp/products/マットレス-z1-コイシ-強サポートモデル 配下（改変しない）。
  //   ★最重要（薬機法配慮）：健康・医療効果を断定しない。腰痛が改善/肩こりが治る/睡眠の質が
  //     改善/腰を守る/姿勢矯正/病気を防ぐ/健康になる 等は禁止。製品構造の説明に留める
  //     （腰まわりを支える設計／身体のラインに沿いやすい素材／圧力が一部に集中しにくい設計／
  //     硬めの寝心地を好む人向け 等）。「高齢者におすすめ」と一括りにしない。
  //   ★100日トライアル：無条件返品/必ず無料返品と断定しない。対象条件・返品手順・最低利用
  //     期間・返送料・地域・商品状態は公式で確認する旨を記載。未許可クーポンは掲載しない。
  //   ★人物画像の使用禁止（独自画像なし＝A8配信バナーのみ。DL/スクショ/転載しない）。
  //   ★公式(2026-09-14)確認：3ゾーン静音ポケットコイル/5層構造(TENCELカバー・メモリーフォーム・
  //     高密度フォーム・ポケットコイル・エッジフォーム)/TENCEL30%配合の洗えるカバー(360度
  //     ジッパー)/10cm幅エッジサポート/100日お試し(送料無料と案内)/5年保証+25年コイル保証/
  //     やや硬め/シングル〜クイーン。価格は変動のため非掲載。
  //   役割分担：BLUEBOX=寝具、Re:est=住宅全体のリフォーム、ALGO Chair=自分の仕事環境、
  //   藤巻百貨店=上質ギフト。寝室記事でRe:estと同時に強く売らない（住宅全体はRe:estへ内部リンク）。
  'bluebox-z1': {
    id: 'bluebox-z1',
    network: 'a8',
    advertiserName: 'BLUEBOX Z1 コイシ',
    programName: 'bluebox-z1-koishi',
    programId: 's00000027770001',
    clickUrl: 'https://px.a8.net/svt/ejp?a8mat=4BCAZF+FHV85E+5Y9W+601S1',
    imageUrl: 'https://www25.a8.net/svt/bgt?aid=260914587937&wid=003&eno=01&mid=s00000027770001008000&mc=1',
    trackingPixelUrl: 'https://www17.a8.net/0.gif?a8mat=4BCAZF+FHV85E+5Y9W+601S1',
    imageWidth: 300,
    imageHeight: 250,
    category: 'bedding',
    isActive: true,
    approvalStatus: 'approved',
    disclosure: 'PR',
    title: '実家の寝具・マットレスを見直す選択肢',
    description:
      '3ゾーンのポケットコイルに、メモリーフォームやTENCEL配合の洗えるカバーを組み合わせた、やや硬めの寝心地のマットレス（Z1 コイシ）です。取り外して洗えるカバーや10cm幅のエッジサポート、100日間のお試し制度があります。サイズ・硬さ・お試し／保証の条件は公式サイトの最新情報をご確認ください。',
    cta: 'Z1 コイシの仕様・サイズ・トライアル条件を見る',
    imageAlt: 'マットレス BLUEBOX Z1 コイシ の広告',
    placementArticles: ['oya-mattress-shingu-minaoshi'],
    notes: [
      '対象商品はZ1 コイシのみ。成果は決済完了確認（100日お試し中の返品は対象外）。健康・医療効果の断定禁止。人物画像は使用しない。',
      '100日トライアル・保証は「無条件/必ず無料」と断定せず公式で条件確認する旨を記載。高齢者を一括りにせず、本人の寝心地の好み・立ち上がりやすさも確認する旨を書く。',
    ],
  },
  // 医師転職ドットコム（株式会社メディウェル）。医師専門の転職支援。A8 s00000009894001。
  //   親の見守り・介護と医師業務の両立、勤務地/勤務条件の見直しの文脈で紹介。バナー 300×250。
  //   遷移先は px.a8.net 経由（改変しない）。
  //   ★対象は「医師（医師免許取得済み）」のみ。歯科医師・獣医師は成果対象外＝送客しない。
  //   ★成果は会員登録＋本人確認（常勤30,000円／非常勤10,000円）。読者に「登録＝成果」と誤解
  //     させない。★報酬額差を理由に常勤転職を勧めるのは絶対禁止。常勤/非常勤は本人の生活・
  //     家族事情・希望を基準に中立に説明する。
  //   ★公式(2026-09-14)＝医師向け転職支援、常勤・非常勤、専任担当による紹介、医師は無料利用可。
  //     会員数/求人数/満足度等の数値は公式に明示なし＝掲載しない（優良誤認/実績数値/ランキング/
  //     比較表現を避ける。A8広告レギュレーション準拠の保守運用）。
  //   ★YMYL：医療行為の助言はしない。制度・労働環境は一次情報（厚労省等）優先、断定しない。
  //   ★禁止：必ず転職できる/必ず年収UP/医師なら誰でも登録/転職すれば介護解決/非常勤なら必ず
  //     両立/他社より絶対優れている。介護離職を勧めず、現職での調整を先に検討する旨を記載。
  //   役割分担：医師転職ドットコム=医師専門。キャリナビ(20〜34歳一般)・sXars(コンサル)とは
  //   検索意図を完全分離し、医師記事に並べて表示しない。1記事1メインCV。
  'ishi-tenshoku': {
    id: 'ishi-tenshoku',
    network: 'a8',
    advertiserName: '医師転職ドットコム',
    programName: 'ishi-tenshoku-dotcom',
    programId: 's00000009894001',
    clickUrl: 'https://px.a8.net/svt/ejp?a8mat=4BCA7E+9T23A2+24CC+6YRS1',
    imageUrl: 'https://www28.a8.net/svt/bgt?aid=260913578593&wid=002&eno=01&mid=s00000009894001170000&mc=1',
    trackingPixelUrl: 'https://www16.a8.net/0.gif?a8mat=4BCA7E+9T23A2+24CC+6YRS1',
    imageWidth: 300,
    imageHeight: 250,
    category: 'medical-career',
    isActive: true,
    approvalStatus: 'approved',
    disclosure: 'PR',
    title: '医師向けの転職・働き方を相談する',
    description:
      'メディウェルが運営する、医師向けの転職支援サービスの一つです。常勤・非常勤の求人を扱い、専任の担当者が相談に対応します。医師は無料で利用できます。対象は医師（医師免許をお持ちの方）です。求人内容・条件は公式サイトでご確認ください。',
    cta: '医師向け求人・転職支援の内容を見る',
    imageAlt: '医師専門の転職支援サービス 医師転職ドットコム の広告',
    placementArticles: ['ishi-oya-kaigo-hatarakikata'],
    notes: [
      '対象は医師のみ（歯科医師・獣医師は対象外）。成果は会員登録＋本人確認（常勤30,000/非常勤10,000）。登録＝成果と誤解させない。報酬額差で常勤を勧めない。',
      '数値実績・ランキング・比較表現は使わない（根拠未確認のため非掲載）。必ず転職/必ず年収UP/誰でも登録 等の断定禁止。医療行為の助言はしない。介護離職を勧めない。',
    ],
  },
  // sXars（株式会社sXars）。大阪・関西を中心としたコンサル転職エージェント。A8 s00000027799001。
  //   親の近くで働きたい／関西でキャリアアップしたい経験者向け。バナー 336×280。
  //   遷移先は px.a8.net 経由で https://lp.sxars.co.jp/ 配下（改変しない）。
  //   成果地点は「申込／予約／問い合わせ」ではなく“実際のキャリア相談の実施”。
  //   ★対象：原則45歳未満（コンサル経験者は年齢不問）／一定のビジネス経験者。希望勤務地は
  //     東京・大阪・名古屋・福岡・札幌（A8成果条件）。ビジネス未経験者を強く送客しない。
  //   ★公式(2026-09-14 lp.sxars.co.jp)＝関西特化・大阪中心のコンサル転職エージェント、経歴の
  //     見せ方支援、無料キャリア相談。年齢は公式未記載のため「対象になりやすい層」として提示。
  //     年収数値例は成果保証と誤認されうるため掲載しない。
  //   ★禁止：必ずコンサル転職できる/必ず年収UP/絶対内定/他社より優れている/誰でも相談可能。
  //   ★介護離職を勧めない（現職の制度・介護休業・勤務地変更・リモートを先に検討する旨を記載）。
  //   役割分担：sXars=経験者のコンサル転職・キャリアアップ（大阪/関西）、キャリナビ=20〜34歳・
  //   幅広い働き方/転職の相談。同一記事で強く横並びにしない（1記事1メインCV）。
  'sxars-consul': {
    id: 'sxars-consul',
    network: 'a8',
    advertiserName: 'sXars コンサル転職',
    programName: 'sxars',
    programId: 's00000027799001',
    clickUrl: 'https://px.a8.net/svt/ejp?a8mat=4BC7V8+EKIXI2+5YHY+61Z81',
    imageUrl: 'https://www20.a8.net/svt/bgt?aid=260910548881&wid=002&eno=01&mid=s00000027799001017000&mc=1',
    trackingPixelUrl: 'https://www18.a8.net/0.gif?a8mat=4BC7V8+EKIXI2+5YHY+61Z81',
    imageWidth: 336,
    imageHeight: 280,
    category: 'career-consulting',
    isActive: true,
    approvalStatus: 'approved',
    disclosure: 'PR',
    title: 'コンサル転職・関西でのキャリアを相談する',
    description:
      '大阪・関西を中心に、コンサルティング業界への転職を支援するエージェントの一つです。事業会社での営業・企画・PM・社内SEなどの経験を、コンサル転職でどう伝えるかをサポートします。無料のキャリア相談があります。対象になりやすいのは、一定のビジネス経験がある方（原則45歳未満、コンサル経験者は年齢不問）です。',
    cta: '無料キャリア相談の内容を確認する',
    imageAlt: 'コンサル転職支援サービス sXars の広告',
    placementArticles: ['kansai-consul-tenshoku-oya-chikaku'],
    notes: [
      '成果地点は実際のキャリア相談の実施（申込・予約・問い合わせは成果ではない）。対象は一定のビジネス経験者・原則45歳未満（コンサル経験者は年齢不問）、希望勤務地は東京・大阪・名古屋・福岡・札幌。ビジネス未経験者を強く送客しない。',
      '「必ずコンサル転職/必ず年収UP/絶対内定/誰でも相談可能」等は禁止。年収数値は掲載しない。介護離職を勧めず、現職の制度を先に検討する旨を記載。',
    ],
  },
  // Re:est（ニッカホーム株式会社）。リフォーム見積もりサービス。A8 s00000027321001。
  //   「親が住み続ける実家を安全・快適に保つ」文脈で紹介する。バナー 250×250。
  //   成果地点は WEB申込後30日以内の「本見積書確認完了」または「下見実施」（問い合わせ・
  //   仮見積は成果地点ではない）。★本見積で判定される場合、見積15万円以下は対象外のため、
  //   外壁・屋根・浴室・キッチン・複数箇所など「一定規模以上」のリフォーム検討者を主対象に
  //   する。蛇口交換・数千円の小規模修理向け記事にはメインCTAを置かない。
  //   ★電話問い合わせは成果対象外 → 独自の電話CTAを作らない（WEB申込導線を維持）。
  //   ★禁止：大手だから絶対安心/必ず適正価格/一番安くなる/絶対に失敗しない 等の断定、
  //     料金の安さの断定。バリアフリーは「付ければ転倒しない/安全になる」等の断定をしない。
  //   ★対象エリア外は成果対象外 → 対応エリアは公式で確認する旨を記載（全国と断定しない）。
  //   役割分担：Re:est=住み続ける実家の修繕・リフォーム／ラクウル=相続した不動産の売却／
  //   ミライアス=一般的な不動産売却査定／（将来）外壁塗装の窓口=外壁特化／水の救急隊=緊急水回り。
  'reest-reform': {
    id: 'reest-reform',
    network: 'a8',
    advertiserName: 'Re:est リフォーム見積もり',
    programName: 'reest',
    programId: 's00000027321001',
    clickUrl: 'https://px.a8.net/svt/ejp?a8mat=4BC7V7+7H3YZE+5UT6+60OXD',
    imageUrl: 'https://www25.a8.net/svt/bgt?aid=260910547452&wid=002&eno=01&mid=s00000027321001011000&mc=1',
    trackingPixelUrl: 'https://www12.a8.net/0.gif?a8mat=4BC7V7+7H3YZE+5UT6+60OXD',
    imageWidth: 250,
    imageHeight: 250,
    category: 'reform',
    isActive: true,
    approvalStatus: 'approved',
    disclosure: 'PR',
    title: '実家のリフォーム見積もりという選択肢',
    description:
      'ニッカホームが運営するリフォーム見積もりサービスの一つです。外壁・屋根・水回りなど、一定規模のリフォーム検討時に、WEBから見積もりの取得を進められます。対応エリア・費用・保証は公式サイトの最新情報をご確認ください。',
    cta: '実家のリフォーム見積もりを確認する',
    imageAlt: 'リフォーム見積もりサービス Re:est の広告',
    placementArticles: ['jikka-reform-kakunin-point'],
    notes: [
      '成果地点はWEB申込後30日以内の本見積書確認完了または下見実施（問い合わせ・仮見積は不可）。本見積15万円以下は対象外のため、一定規模以上の検討者を主対象にする。',
      '電話CTAを作らない（電話問い合わせは対象外）。断定（絶対安心/必ず適正/一番安く/絶対失敗しない）・料金の安さの断定・バリアフリーの効果断定は禁止。対応エリアは公式で確認。',
    ],
  },
  // ラボカフェ（株式会社オークス）。注文後に焙煎するコーヒーの通販。A8 s00000027754001。
  //   親への「消えもの」ギフト（コーヒー）の文脈で紹介する。遷移先は px.a8.net 経由で
  //   https://coffee-labo.co.jp/shop/ 配下（改変しない）。
  //   ★禁止：最高の一杯/必ず自分にぴったり/絶対喜ばれる/誰にでもおすすめ/必ずおいしい/
  //     買わないと損 等の断定。AI診断は「質問への回答をもとに豆選びをサポートする診断機能」
  //     程度に留め、「AIが最適を必ず選ぶ」とは書かない。カフェインの健康効果・悪影響は
  //     断定しない（持病・服薬中は医師等へ確認する旨を本文に記載）。
  //   ★LINE経由注文は成果対象外 → LINEへ誘導する独自CTAを追加しない。
  //   役割分担：ラボカフェ=コーヒー等の消えものギフト、旅行=体験ギフト、RIZAP COOK=
  //   自分の料理スキルへの自己投資。1記事1メインCV。掲載はギフト（消えもの/コーヒー）文脈のみ。
  'labo-cafe': {
    id: 'labo-cafe',
    network: 'a8',
    advertiserName: 'ラボカフェ',
    programName: 'labo-cafe',
    programId: 's00000027754001',
    clickUrl: 'https://px.a8.net/svt/ejp?a8mat=4BC738+8I0UHM+5Y5G+65ME9',
    imageUrl: 'https://www28.a8.net/svt/bgt?aid=260909540514&wid=002&eno=01&mid=s00000027754001034000&mc=1',
    trackingPixelUrl: 'https://www11.a8.net/0.gif?a8mat=4BC738+8I0UHM+5Y5G+65ME9',
    imageWidth: 300,
    imageHeight: 250,
    category: 'gift-coffee',
    isActive: true,
    approvalStatus: 'approved',
    disclosure: 'PR',
    title: 'コーヒー好きの親へのギフトという選択肢',
    description:
      '注文を受けてから焙煎する方式のコーヒー通販の一つです。複数の産地の豆を扱い、焙煎度を選べるほか、質問への回答をもとに豆選びをサポートする診断機能や定期便もあります。ラインナップ・価格・ギフト対応は公式サイトでご確認ください。',
    cta: 'コーヒー豆のラインナップを見る',
    imageAlt: 'コーヒー通販ラボカフェの広告',
    placementArticles: ['oya-coffee-gift-erabikata'],
    notes: [
      '成果はWEB注文＋30日以内の入金確認（定期便は別）。LINE経由注文は対象外のためLINE誘導CTAを追加しない。',
      '「最高の一杯/必ずぴったり/絶対喜ばれる」等の断定禁止。AI診断は「診断機能」程度に留める。カフェインの健康効果・悪影響は断定しない。',
    ],
  },
  // Marvelous One（株式会社悠久）。乳酸菌食品。A8 s00000027704001。
  //
  // 2026-09-11 A8発行コードを受領し有効化（href/img/1px/a8mat/aid/mid は発行値のまま）。
  //   バナーは 467×299。遷移先は px.a8.net 経由で marvelousone.jp 配下（改変しない）。
  //
  // 【薬機法・景表法・健康増進法に配慮】健康食品のため効果を断定しない。免疫力/
  //   アレルギー/便秘/腸内環境改善/病気予防/健康になる/医薬品的効果 等の表現は禁止。
  //   「高齢者におすすめ」「親に飲ませるべき」等の強い訴求もしない。人物画像は使用禁止。
  //
  // 【公式で事実確認済み（2026-09-11 marvelousone.jp）／数値は公式表記のまま・効能化しない】
  //   ・4種の植物由来乳酸菌を使用
  //   ・国産大豆100%（全粒粉）の豆乳培地で国内培養・生産
  //   ・特許第5958985号
  //   ・500ml当たり1兆5000億個以上の生菌数（※製品スペック。健康効果としては書かない）
  //   ・価格は公式ページに明示表示なし → 本文に価格を記載しない
  'marvelous-one': {
    id: 'marvelous-one',
    network: 'a8',
    advertiserName: 'Marvelous One',
    programName: 'marvelous-one',
    programId: 's00000027704001',
    clickUrl: 'https://px.a8.net/svt/ejp?a8mat=4BC8N5+3KN6I+5XRK+5YZ75',
    imageUrl: 'https://www28.a8.net/svt/bgt?aid=260911553006&wid=002&eno=01&mid=s00000027704001003000&mc=1',
    trackingPixelUrl: 'https://www12.a8.net/0.gif?a8mat=4BC8N5+3KN6I+5XRK+5YZ75',
    imageWidth: 467,
    imageHeight: 299,
    category: 'fermented-food',
    isActive: true,
    approvalStatus: 'approved',
    disclosure: 'PR',
    title: '乳酸菌食品（植物由来乳酸菌）の一例',
    description:
      '4種の植物由来乳酸菌を、国産大豆100%の豆乳培地で国内培養した乳酸菌飲料です（特許第5958985号）。原材料・特徴・価格・購入条件は公式サイトの最新情報をご確認ください。',
    cta: 'Marvelous Oneの商品情報を見る',
    imageAlt: '乳酸菌食品 Marvelous One の広告',
    placementArticles: ['nyusankin-shokuhin-kihon'],
    notes: [
      '2026-09-11 A8広告コード受領・有効化（467×299）。成果はWEB注文後の決済完了。遷移先は marvelousone.jp 配下。',
      '健康効果の断定禁止（免疫/アレルギー/便秘/腸内改善/病気予防 等）。人物画像は使用禁止。価格は公式未表示のため本文に書かない。',
    ],
  },
  // キャリナビ転職（株式会社Assh）。20〜34歳向けのキャリア相談・転職面談。
  //   成果地点は「LINE追加・予約」ではなく“実際の面談実施”（WEB→LINE友だち追加→
  //   面談日程確定→30日以内に面談実施）。★対象年齢20〜34歳。40〜50代向け記事で強い
  //   CTAを出さない（掲載は20〜30代が自然流入する働き方・キャリアの記事に限定）。
  //   ★禁止：必ず年収が上がる/絶対に転職成功/無料だから受けるだけ得/面談で報酬が出る
  //     示唆/特定転職の強制。満足度・年収UP率等の数値は公式根拠を確認できた場合のみ。
  //   スタンスは「家族事情と自分のキャリアの両立」（キャリアを犠牲にする構図にしない）。
  //   役割分担：ALGO Chair Pro=在宅ワーク環境、キャリナビ=働き方・転職・キャリア。
  'carinavi-tenshoku': {
    id: 'carinavi-tenshoku',
    network: 'a8',
    advertiserName: 'キャリナビ転職',
    programName: 'carinavi',
    programId: 's00000027527001',
    clickUrl: 'https://px.a8.net/svt/ejp?a8mat=4BC8N4+G2PDJU+5WEE+5ZEMP',
    imageUrl: 'https://www26.a8.net/svt/bgt?aid=260911552972&wid=002&eno=01&mid=s00000027527001005000&mc=1',
    trackingPixelUrl: 'https://www13.a8.net/0.gif?a8mat=4BC8N4+G2PDJU+5WEE+5ZEMP',
    imageWidth: 300,
    imageHeight: 250,
    category: 'career',
    isActive: true,
    approvalStatus: 'approved',
    disclosure: 'PR',
    title: '働き方・キャリアを無料で相談する',
    description:
      '家族の事情も含めて、今後の働き方やキャリアを相談できるサービスの一つです（対象は20〜34歳）。転職ありきではなく、まず現状を整理する場としても使えます。相談の進め方は公式サイトでご確認ください。',
    cta: '無料キャリア相談の内容を確認する',
    imageAlt: '20〜34歳向けキャリア相談・転職面談サービスの広告',
    placementArticles: ['oya-chikaku-uturn-tenshoku'],
    notes: [
      '成果地点は実際の面談実施（対象20〜34歳）。LINE追加・予約＝成果ではない旨を誤認させない。40〜50代向け記事で強いCTAを出さない。',
      '「必ず年収が上がる/絶対転職成功/無料だから受けるだけ得」等の断定・示唆をしない。数値は公式根拠を確認できた場合のみ。',
    ],
  },
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
