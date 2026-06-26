#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate 10 days (50 posts) of @oyamimamori_jp X content:
CSV / JSON / human MD + 10 individual Canva prompt files + combined prompts.
Single source of truth = DAYS and IMAGES below."""
import csv, json, os

APP_LP = "https://www.oyamimamori.jp/app/"
BASE = os.path.dirname(os.path.abspath(__file__))
SOFT_REPLY = "離れて暮らす母・父を、無理なく見守る方法を発信しています。\n" + APP_LP
TIMES = ["08:10", "12:15", "16:45", "20:15", "22:30"]
TYPES = ["morning_empathy", "practical_tip", "checklist_or_question",
         "emotional_painting", "app_or_soft_cta"]
DATES = [f"2026-06-{d}" for d in range(24, 31)] + [f"2026-07-0{d}" for d in range(1, 4)]
# Days (1-indexed) whose 22:30 post puts the app link in the BODY (app_cta).
APP_BODY_DAYS = {2, 5, 8, 10}

# 10 emotional_painting images (1/day). file = dayNN_emotional_painting.png
IMAGES = {
    1: {"title": "母から「今日も大丈夫」と届く夜",
        "comp": "夜の都市の部屋で子ども世代がスマホを見ると、画面に小さく『今日も大丈夫』。遠景に実家の灯り。親子をつなぐやさしい光。",
        "en": "Night city apartment; a 40s-50s adult sees a smartphone with a small message '今日も大丈夫'. Distant family home glowing; a soft thread of warm light connects them."},
    2: {"title": "父が電話に出ない夜",
        "comp": "夜の部屋で子ども世代がスマホの発信画面を見て少し心配。遠景の実家で父が静かにお茶。何も起きていないが離れゆえの小さな不安。",
        "en": "A 40s-50s adult looks at a calling screen with faint worry; distant home where an elderly father calmly drinks tea. Quiet unease of distance."},
    3: {"title": "実家の窓に明かりがついている",
        "comp": "夜、実家の窓に温かい明かり。離れて暮らす子ども世代が外からふと見上げ、安心する。家の中で親が穏やかに過ごす。",
        "en": "Night; a family home with windows glowing warm orange. A distant adult gazes toward it and feels reassured; a parent spends the evening calmly inside."},
    4: {"title": "雨の日に母を思い出す",
        "comp": "雨の窓辺で子ども世代がスマホを手に母を思い出す。遠景に実家。雨に濡れた街と家を、暖色のやわらかな光がつなぐ。",
        "en": "A rainy window; an adult holding a phone remembers their mother. Distant family home; warm soft light links the rainy city and the home."},
    5: {"title": "災害ニュースを見て実家を心配する",
        "comp": "夜、テレビ/スマホの災害ニュースを見て実家を案じる子ども世代。すぐ電話しようとする。深刻すぎず、家族を想う静かな緊張。",
        "en": "Night; an adult watches disaster news and worries about the family home, about to call. Not graphic — a quiet tension of caring for family."},
    6: {"title": "仕事帰りの電車で親を思い出す",
        "comp": "夜の電車内、窓に映る子ども世代の顔。ふと親を思い出しスマホを取り出す。車窓の街明かりが暖色でにじむ。",
        "en": "Inside a night train, an adult's reflection in the window; remembering a parent, taking out a phone. City lights blur warm outside."},
    7: {"title": "祖母からの短い返信に安心する",
        "comp": "孫世代がスマホで祖母からの短い返信を読み、ふっと微笑む。画面の文字は小さく自然に。温かい室内光。",
        "en": "A younger adult reads a short reply from a grandmother and softly smiles; tiny natural text on screen; warm indoor light."},
    8: {"title": "父の既読がつかない夜",
        "comp": "夜更けの部屋で子ども世代がスマホを見つめ、既読がつかないメッセージ。父はたぶん就寝中。静かな夜の小さな心配。",
        "en": "Late night; an adult stares at a phone, a message left unread. The father is likely asleep. A small quiet worry in the night."},
    9: {"title": "母が庭に水をやっている朝",
        "comp": "朝の光の中、実家の庭で母が花に水をやる『いつもの景色』。離れた子どもがその情景を思い浮かべる構図。",
        "en": "Morning light; a mother waters garden flowers — an ordinary scene. The distant child pictures this everyday moment."},
    10: {"title": "離れていても家族をつなぐ小さな通知",
         "comp": "スマホに灯る小さな通知『今日も元気』。離れた家族をつなぐ小さな光として、やさしく描く。背景に都市と実家。",
         "en": "A small phone notification glowing '今日も元気' as a tiny light connecting a faraway family; city and family home softly in background."},
}

STYLE = ("上品な日本向け絵画調、映画的で温かい光、漫画/アニメ調にしない。"
         "深緑・薄緑・クリーム・暖色の光。大きな文字/ロゴ/ブランド名は入れない。1080x1080。")
EN_STYLE = ("Cinematic, elegant Japanese painterly illustration, warm tender light, "
            "soft brush texture, 1:1 1080x1080. Palette: deep green, soft pale green, "
            "cream, warm amber. No large text, no logo, no brand name.")
EN_NEG = ("no manga or anime style, no hospital, no clinic, no nursing home, "
          "no medical or caregiving imagery, no wheelchair, no surveillance camera, "
          "not an advertisement, no heavy saturation, no watermark.")

# ---- 50 posts: post_text for each (day -> 5 lines by type) ----
# m=morning_empathy, p=practical_tip, c=checklist_or_question,
# e=emotional_painting, s=soft/app cta
TEXT = {
 1: {
  "m": "「おはよう」だけのメッセージに、意味なんてなくていい。\n母から返る短いスタンプひとつで、今日も大丈夫だと分かる。\nそれで、十分なんだと思う。",
  "p": "親への連絡は、長文より一言のほうが続く。\n「いま駅に着いた」くらいの軽さでいい。\n返信を求めない一言なら、親も気楽に受け取れる。",
  "c": "見守りを始めるのに、特別なきっかけはいらない。\n・親の声が少し小さくなった\n・帰省の回数が減った\n・なんとなく気になる\nひとつでも当てはまれば、もう十分なタイミング。",
  "e": "スマホに「今日も大丈夫」とひとこと。\nそれだけで、夜の心配がすっとほどける日がある。\n離れていても、つながっていられる。",
  "s": "見守りという言葉が、少し重く感じる人もいる。\nでも本当は、見張ることじゃなくて「元気でいてね」を確かめるだけ。\nもっと気楽でいい。",
 },
 2: {
  "m": "毎朝かけられたら理想だけど、現実は仕事に追われて終わる。\nだからせめて、通勤の途中にひとことだけ。\n「いってきます」を、親にも送ってみる。",
  "p": "スマホが苦手な親には、新しい使い方を増やすより、\n「この一個だけ押せばいい」に絞るのがいい。\n選択肢が少ないほど、続けてくれる。",
  "c": "実家の朝は、何時に始まるか知っていますか。\n・カーテンを開ける時間\n・新聞を取りに出る時間\n生活リズムを知っておくと、変化にも気づける。",
  "e": "父が電話に出ない。\n用事はない、ただ声が聞きたかっただけ。\nかけ直してくるその一言を、なんとなく待っている夜。",
  "s": "毎日電話するのは、お互いしんどい。\nでも「今日も元気」のひとことだけなら、負担なく続けられる。\nそんな見守りのかたちをまとめています。\n" + APP_LP,
 },
 3: {
  "m": "母からの返信が、昼を過ぎても来ない。\nたいてい、ただ出かけているだけ。\nそう分かっていても、既読がつくまで少しそわそわする。",
  "p": "「元気?」と聞くより、こちらの近況を送るほうが返事は来やすい。\n「桜が咲いたよ」の一枚に、母は長文で返してきたりする。",
  "c": "親に「心配だよ」と、素直に言えますか。\n照れくさくて、つい「元気?」にすり替えてしまう。\nでも本当は、その一言がいちばん伝わる。",
  "e": "帰り道、実家の方角の空をふと見上げる。\nあの窓にも、今日も明かりがついているだろうか。\n灯っている、それだけで安心できる。",
  "s": "親孝行って、旅行や贈り物じゃなくてもいい。\n週に一度、声を聞くだけでも立派な親孝行だと思う。\n大げさじゃなくていい。",
 },
 4: {
  "m": "子どもが「おばあちゃんは?」と聞いてくる。\nそういえば最近、母と話していない。\n孫のひとことが、連絡のきっかけになる朝。",
  "p": "親の見守りを、一人で抱え込まない。\n兄弟で「気づいたことを共有するだけ」のゆるい連絡をつくると、ぐっと楽になる。",
  "c": "もし今、大きな地震が来たら。\n・親と連絡を取る手段は決めてある?\n・集まる場所は?\n備えは、元気なうちにこそ話しておきたい。",
  "e": "雨の音を聞くと、母を思い出す。\n「傘は持った?」が口ぐせだった人。\n今日はこちらから、「降ってきたね」と送ってみる。",
  "s": "離れていると、実家の様子はほとんど見えない。\n元気なのか、無理していないのか。\nだからこそ、小さな確認を習慣にしておきたい。",
 },
 5: {
  "m": "「あとで電話しよう」の“あとで”は、なかなか来ない。\n気づけば一週間。\n思い立った今、スタンプひとつだけでも送っておく。",
  "p": "親とのビデオ通話は、用件がなくても顔が見られるのがいい。\n操作が難しければ、こちらからかけて、出てもらうだけにする。\nそれで十分つながれる。",
  "c": "親の「いつもの一日」、どれくらい知っていますか。\n・食事の時間\n・寝る時間\n・散歩の習慣\n知っているほど、「いつもと違う」に早く気づける。",
  "e": "ニュースで実家の地名が流れると、心臓がはねる。\nすぐ電話。「大丈夫だよ」の声で、やっと息をつく。\n離れているぶん、不安も大きくなる。",
  "s": "災害のたびに思う、連絡が取れることのありがたさ。\n毎日のひとことが、もしものときの備えにもなる。\nそんな見守りの始め方はこちら。\n" + APP_LP,
 },
 6: {
  "m": "返信は、スタンプひとつでいい。\n言葉がなくても、「見たよ」が分かれば安心する。\n親子の連絡に、長い文章はいらない。",
  "p": "親に連絡するなら、相手の手があく時間を狙う。\n朝の支度中より、お茶を飲む午後のほうが、ゆっくり話せたりする。",
  "c": "「まだ元気だから大丈夫」——そう思っているうちが、実は始めどき。\n元気な今だからこそ、無理なく習慣にできる。",
  "e": "仕事帰りの電車、窓に映る自分の顔が、少し親に似てきた。\nそういえば、最近どうしているかな。\nスマホを取り出して、短くひとこと。",
  "s": "「心配しすぎ」と言われたくなくて、つい連絡を控えてしまう。\nでも、気にかけることは悪いことじゃない。\nさりげなく、続けていけばいい。",
 },
 7: {
  "m": "祖母にメッセージアプリを教えたら、毎朝スタンプが届くようになった。\n中身はいつも同じ花の絵。\nでもその一枚で、今日も元気だと分かる。",
  "p": "親のスマホ、文字を大きくしてあげるだけで連絡のハードルが下がる。\n「見えにくいから後で」が、減る。\n設定をひとつ変えるだけ。",
  "c": "見守りと監視は、何が違うんだろう。\n監視は「管理するため」、見守りは「安心するため」。\n親の自由を尊重するなら、答えは自然と決まる。",
  "e": "祖母からの返信は、いつも一行。\n「げんきです」。\nたったそれだけのメッセージを、なぜか何度も読み返してしまう。",
  "s": "気のきいた言葉も、立派な贈り物もいらない。\n「どうしてる?」のひとことが、いちばん喜ばれたりする。\n親孝行は、それくらいで十分。",
 },
 8: {
  "m": "毎日は無理でも、三日に一度なら続けられる。\n完璧じゃなくていい。\n「たまに気にかける」を、やめないことのほうが大事。",
  "p": "親と「無事の合図」を決めておくと楽になる。\n朝にスタンプを一個送るだけ、とか。\n言葉にしなくても、押すだけで伝わる仕組みにしておく。",
  "c": "実家の冷蔵庫の中、想像できますか。\nちゃんと食べているか、それだけでも気になる。\n見えないからこそ、たまに聞いてみる。",
  "e": "送ったメッセージに、既読がつかないまま夜が更ける。\n父はたぶん、もう寝ているだけ。\n分かっていても、画面をつい確認してしまう。",
  "s": "見守りは、相手を縛るものじゃない。\nお互いに気楽でいられる方法なら、自然と続く。\n肩の力を抜いた見守りの話を、まとめました。\n" + APP_LP,
 },
 9: {
  "m": "母は今ごろ、庭の花に水をやっているはず。\n会えなくても、向こうの朝の景色は想像できる。\nその想像が、少しだけ距離を縮めてくれる。",
  "p": "言葉が苦手な親とは、写真でやり取りするのもいい。\n夕飯の一枚を送れば、向こうも食卓の写真を返してくれる。\n会話より続くことがある。",
  "c": "母から返事が来ないとき、どれくらい待ちますか。\n半日?一日?\n自分なりの線引きを決めておくと、むやみに不安にならずにすむ。",
  "e": "朝の光の中で、母が庭に水をやっている。\nいつもの、なんでもない景色。\nその「いつも通り」が、いちばんの安心なんだと思う。",
  "s": "見守りを始めるのに、遅すぎることはない。\nでも、早すぎることもない。\n気になった今日が、いちばん早いタイミング。",
 },
 10: {
  "m": "「元気?」の二文字を送るのに、勇気はいらない。\nでも、送ると決めることが、案外むずかしい。\n今朝はその二文字を、ちゃんと送ってみる。",
  "p": "見守りは、頑張ると続かない。\n歯みがきみたいに、生活のついでにする。\n「寝る前にひとこと」くらいが、ちょうどいい。",
  "c": "夜、ふと実家を思い出すこと、ありませんか。\nその瞬間が、連絡のサイン。\n思い出したときに、短く送ればいい。",
  "e": "スマホに灯る、小さな通知ひとつ。\n「今日も元気」。\n離れて暮らす家族をつなぐのは、案外こんな小さな光なのかもしれない。",
  "s": "離れていても、家族を想う気持ちは変わらない。\nその気持ちを、無理なく続くかたちにするだけ。\n見守りの始め方を、そっと置いておきます。\n" + APP_LP,
 },
}

KEY = ["m", "p", "c", "e", "s"]

POSTS = []
for di, date in enumerate(DATES, 1):
    for ti, k in enumerate(KEY):
        ptype = TYPES[ti]
        is_emo = (k == "e")
        is_cta_slot = (k == "s")
        body_link = is_cta_slot and di in APP_BODY_DAYS
        post = {
            "post_id": f"x_{date.replace('-','')}_{ti+1}",
            "date": date,
            "platform": "X",
            "post_type": "app_cta" if body_link else ("soft_cta" if is_cta_slot else ptype),
            "recommended_time": TIMES[ti],
            "post_text": TEXT[di][k],
            "image_needed": is_emo,
            "canva_needed": is_emo,
            "canva_prompt": (IMAGES[di]["comp"] + " " + STYLE) if is_emo else "",
            "image_filename": f"day{di:02d}_emotional_painting.png" if is_emo else "",
            "link_required": body_link,
            "reply_text": (SOFT_REPLY if (is_cta_slot and not body_link) else ""),
            "note": "",
        }
        if is_emo:
            post["note"] = (f"画像添付: {post['image_filename']} ／ "
                            f"詳細: canva-prompts/individual/day{di:02d}_emotional_painting_prompt.md ／ リプライなし")
        elif body_link:
            post["note"] = "本日のapp導線（本文にリンク）。CTA文言は日替わり。アプリ名は出しすぎない。"
        elif is_cta_slot:
            post["note"] = "ソフト誘導。本文にリンクは入れず、リプライにサイト/appを記載。"
        else:
            post["note"] = "テキストのみ／画像なし／リプライなし。"
        POSTS.append(post)

COLS = ["post_id", "date", "platform", "post_type", "recommended_time", "post_text",
        "image_needed", "canva_needed", "canva_prompt", "image_filename",
        "link_required", "reply_text", "note"]
def b(v): return "true" if v else "false"

with open(os.path.join(BASE, "X", "buffer", "x_posts_10days.csv"), "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f, quoting=csv.QUOTE_ALL)
    w.writerow(COLS)
    for p in POSTS:
        w.writerow([p["post_id"], p["date"], p["platform"], p["post_type"], p["recommended_time"],
                    p["post_text"], b(p["image_needed"]), b(p["canva_needed"]), p["canva_prompt"],
                    p["image_filename"], b(p["link_required"]), p["reply_text"], p["note"]])

with open(os.path.join(BASE, "X", "buffer", "x_posts_10days.json"), "w", encoding="utf-8") as f:
    json.dump({"account": "@oyamimamori_jp", "account_name": "親みまもり研究所",
               "platform": "X", "app_lp": APP_LP, "period": "2026-06-24〜2026-07-03",
               "posts": POSTS}, f, ensure_ascii=False, indent=2)

# ---- human MD ----
TYPE_JP = {"morning_empathy": "朝の共感", "practical_tip": "実用ヒント",
           "checklist_or_question": "チェック/問いかけ", "emotional_painting": "絵画（共感・リポスト狙い）",
           "app_cta": "app導線（本文リンク）", "soft_cta": "ソフト誘導（リプライにリンク）"}
md = ["# 10日間のX投稿（50本）― @oyamimamori_jp（親みまもり研究所）\n",
      "対象期間: 2026-06-24 〜 2026-07-03／1日5本×10日。",
      "Buffer無料版またはX公式予約に、日付・時間順で手動コピー登録してください。\n",
      f"- 本文に毎回リンクは入れません。app導線は1日1本（22:30）。本文リンクは10日間で4本のみ。",
      f"- それ以外の日はリプライにサイト/app（{APP_LP}）を記載。",
      "- 画像付きは1日1本（絵画）。\n", "---\n"]
for di, date in enumerate(DATES, 1):
    day_posts = [p for p in POSTS if p["date"] == date]
    md.append(f"## Day{di}　{date}\n")
    for p in day_posts:
        md.append(f"### {p['recommended_time']}　{TYPE_JP[p['post_type']]}　`{p['post_id']}`\n")
        md.append("**投稿本文**\n")
        md.append("```\n" + p["post_text"] + "\n```")
        md.append(f"- 画像: {'必要' if p['image_needed'] else 'なし'}")
        if p["image_needed"]:
            md.append(f"- 使用画像ファイル名: `SNS/X/images/{p['image_filename']}`")
            md.append(f"- Canvaプロンプト参照: `SNS/X/canva-prompts/individual/day{di:02d}_emotional_painting_prompt.md`")
        md.append("- **リプライ文**\n\n```\n" + p["reply_text"] + "\n```" if p["reply_text"] else "- リプライ: なし")
        md.append(f"- Buffer入力メモ: {p['note']}\n")
    md.append("---\n")
with open(os.path.join(BASE, "X", "posts", "x_posts_10days.md"), "w", encoding="utf-8") as f:
    f.write("\n".join(md))

# ---- Canva prompts: individual + combined ----
os.makedirs(os.path.join(BASE, "X", "canva-prompts", "individual"), exist_ok=True)
combined = ["# 10日間 emotional_painting Canvaプロンプト一覧\n",
            "各画像 1080×1080。Canva の Magic Media 等に英語プロンプトを貼り、生成後に指定ファイル名で `SNS/X/images/` に保存してください。\n",
            f"共通スタイル: {STYLE}\n", "---\n"]
for di in range(1, 11):
    img = IMAGES[di]
    fname = f"day{di:02d}_emotional_painting.png"
    en = f"{img['en']} {EN_STYLE}"
    body = [f"# Canvaプロンプト Day{di} ―「{img['title']}」\n",
            f"- 出力ファイル名（予定）: `SNS/X/images/{fname}`",
            f"- 用途: {DATES[di-1]} 20:15 の emotional_painting 投稿",
            "- サイズ: 1080 × 1080 px\n",
            "## 構図メモ（日本語）",
            img["comp"] + "\n",
            "## そのまま貼れる英語プロンプト",
            "```", en, "```\n",
            "### Negative（末尾に追記）", "```", EN_NEG, "```\n",
            "## 補足",
            "- 漫画/アニメ調にしない。映画的で温かい絵画調。",
            "- 大きな文字・ロゴ・ブランド名は入れない（スマホ画面の文字はごく小さく自然に）。",
            "- 介護施設・病院・医療を想起させる要素は避ける。"]
    with open(os.path.join(BASE, "X", "canva-prompts", "individual", f"day{di:02d}_emotional_painting_prompt.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(body))
    combined += [f"## Day{di}　{DATES[di-1]} ―「{img['title']}」",
                 f"- ファイル名: `{fname}`",
                 f"- 構図: {img['comp']}",
                 "```", en, "```", ""]
with open(os.path.join(BASE, "X", "canva-prompts", "10days_canva_prompts.md"), "w", encoding="utf-8") as f:
    f.write("\n".join(combined))

from collections import Counter
print("posts:", len(POSTS), dict(Counter(p["post_type"] for p in POSTS)))
print("images:", sum(p["image_needed"] for p in POSTS),
      "body-link app_cta:", sum(p["link_required"] for p in POSTS),
      "soft replies:", sum(1 for p in POSTS if p["reply_text"] and not p["link_required"]))
