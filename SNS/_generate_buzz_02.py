#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Buzz-first X posts (batch 02) for @oyamimamori_jp. Goal = reach (repost/quote/
reply), NOT promotion. Rules: NO links anywhere (body or reply), no app/affiliate,
no hashtags. Strong first line, short, universally relatable, quote/reply bait.
Must NOT duplicate the 12 posts in x_posts_buzz.md. Outputs md/csv/json under SNS/X/."""
import csv, json, os
from collections import Counter
BASE=os.path.dirname(os.path.abspath(__file__))

# type: hook=刺す共感 / quote=引用したい一言 / aruaru / question=リプ誘発 / story=情景
POSTS=[
 {"id":"x_buzz02_01","type":"hook","time":"22:30",
  "text":"「既読」がつかない夜は、なんであんなに長いんだろう。\nスマホを伏せて、また裏返して、画面を見る。\nただ寝ているだけ、ってわかってるのに。"},
 {"id":"x_buzz02_02","type":"quote","time":"21:30",
  "text":"親の「大丈夫」は、たいてい\nこっちに心配をかけないための「大丈夫」だ。\nそれを知ってから、言葉の裏側まで聞くようになった。"},
 {"id":"x_buzz02_03","type":"question","time":"20:15",
  "text":"実家に電話するの、つい後回しにしちゃう人いる?\n「明日でいいか」が積み重なって、\n気づけば三週間。\nみんな、どうやって続けてる?"},
 {"id":"x_buzz02_04","type":"story","time":"23:15",
  "text":"夜、ふと窓の外を見たら大きな月が出ていた。\nたぶん、実家でも同じ月が見えてる。\nそれだけで、少しそばにいる気がした。"},
 {"id":"x_buzz02_05","type":"aruaru","time":"12:15",
  "text":"うちの母あるある。\n・電話に出ると第一声が「どうしたの!?」\n・用がないと言うと「なんだ」と笑う\n・最後は必ず「ちゃんと食べてる?」\nこっちを心配してくるのは、いつも親のほう。"},
 {"id":"x_buzz02_06","type":"hook","time":"22:30",
  "text":"父が電話に出ない。\n二回、三回とかけ直すうちに、手が少し冷たくなる。\n四回目で出た父は、ただ庭にいただけだった。\nこの数分の不安、慣れる日は来るのかな。"},
 {"id":"x_buzz02_07","type":"quote","time":"08:10",
  "text":"親孝行って、たぶん大げさなものじゃない。\n「今日寒いね」って送るだけで、\nもう半分くらいは果たせている気がする。"},
 {"id":"x_buzz02_08","type":"story","time":"21:30",
  "text":"帰省の朝、玄関で母が「気をつけてね」と三回言った。\n一回でいいのに、と昔は思っていた。\n今は、その三回が全部ありがたい。"},
 {"id":"x_buzz02_09","type":"hook","time":"23:15",
  "text":"「心配しすぎ」と言われるのが、ちょっと怖い。\nだから本当の不安は、いつも飲み込んでしまう。\nでも、心配するって悪いことじゃないよね。"},
 {"id":"x_buzz02_10","type":"question","time":"20:15",
  "text":"離れて暮らす親の様子、どうやって把握してる?\nこまめに電話?きょうだいと共有?\n「見えない」のがいちばん落ち着かない。"},
 {"id":"x_buzz02_11","type":"quote","time":"16:45",
  "text":"「元気?」のひとことで安心できるなら、\nそれは十分に意味のある連絡だと思う。\n中身がなくていい。声が無事ならそれでいい。"},
 {"id":"x_buzz02_12","type":"hook","time":"22:30",
  "text":"電話の「あ、もしもし」が、いつもより半拍遅い。\nそれだけで、何かあった?と身構えてしまう。\n離れていると、声の小さな変化に妙に敏感になる。"},
 {"id":"x_buzz02_13","type":"story","time":"21:30",
  "text":"実家の冷蔵庫を開けたら、私の好物だけが妙に多かった。\n「いつ帰るか分からないのに」と言いながら、\n母はずっと、私の分を用意していたんだと思う。"},
 {"id":"x_buzz02_14","type":"quote","time":"08:10",
  "text":"見守るというのは、見張ることじゃない。\nドアの外で耳をすますことでもない。\nただ「今日も無事でいてくれた」と、静かに安心することだ。"},
 {"id":"x_buzz02_15","type":"hook","time":"23:15",
  "text":"親が年をとるスピードは、会わない間にだけ速くなる気がする。\n半年ぶりに見た背中が、思っていたより小さかった。\nだから、特別じゃない今日に、連絡しておきたい。"},
]

COLS=["post_id","date","platform","post_type","recommended_time","post_text",
      "image_needed","canva_needed","canva_prompt","image_filename",
      "link_required","reply_text","note"]
def row(p):
    return [p["id"],"順次（バズ最優先・リンクなし）","X",p["type"],p["time"],p["text"],
            "false","false","","","false","",
            "リンクなし・宣伝なし。リーチ最優先"]

with open(os.path.join(BASE,"X","buffer","x_posts_buzz_02.csv"),"w",newline="",encoding="utf-8") as f:
    w=csv.writer(f,quoting=csv.QUOTE_ALL); w.writerow(COLS)
    for p in POSTS: w.writerow(row(p))
with open(os.path.join(BASE,"X","buffer","x_posts_buzz_02.json"),"w",encoding="utf-8") as f:
    json.dump({"account":"@oyamimamori_jp","goal":"reach/buzz","batch":"02",
               "rules":"no links, no promo, no hashtags, strong first line",
               "posts":[dict(zip(COLS,row(p))) for p in POSTS]},f,ensure_ascii=False,indent=2)

TJP={"hook":"刺す共感","quote":"引用したい一言","aruaru":"あるある","question":"問いかけ（リプ誘発）","story":"情景"}
md=["# X バズ狙いセット 02 ― @oyamimamori_jp\n",
    "**目的：リーチ最大化（リポスト・引用・リプ）。宣伝はしない。**",
    "- 本文にもリプライにも**リンクを入れない**（リーチが落ちるため）。",
    "- /app・記事・アフィリエイトは今は出さない。フォロワーと信頼が増えてから。",
    "- ハッシュタグなし。1行目で刺す。短く。",
    "- 既存12本（x_posts_buzz.md）と重複させない新規15本。\n","---\n"]
# 時間順に並べて表示
def tkey(p):
    h,m=p["time"].split(":"); return int(h)*60+int(m)
for p in sorted(POSTS,key=tkey):
    md.append(f"### {p['time']}　{TJP[p['type']]}　`{p['id']}`\n")
    md.append("```\n"+p["text"]+"\n```\n\n---\n")
with open(os.path.join(BASE,"X","posts","x_posts_buzz_02.md"),"w",encoding="utf-8") as f:
    f.write("\n".join(md))
print("posts:",len(POSTS),dict(Counter(p["type"] for p in POSTS)),
      "| links:",sum(1 for p in POSTS if "http" in p["text"]))
