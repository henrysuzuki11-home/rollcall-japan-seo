#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Buzz-first X posts for @oyamimamori_jp. Goal = reach (repost/quote/reply),
NOT promotion. Rules: NO links anywhere (body or reply), no app/affiliate,
no hashtags. Strong first line, short, universally relatable, quote/reply bait.
Outputs md/csv/json under SNS/X/."""
import csv, json, os
from collections import Counter
BASE=os.path.dirname(os.path.abspath(__file__))

# type: hook=刺す共感 / quote=引用したい一言 / aruaru / question=リプ誘発 / story=情景
POSTS=[
 {"id":"x_buzz_01","type":"hook","time":"08:10",
  "text":"親が年をとったことを、まだ認めたくない自分がいる。\n声が少し小さくなった。歩くのが少し遅くなった。\n見ないふりをしているのは、たぶん私のほうだ。"},
 {"id":"x_buzz_02","type":"quote","time":"21:30",
  "text":"離れて暮らすというのは、\n親のことを思い出す回数が増える、ということだった。"},
 {"id":"x_buzz_03","type":"hook","time":"22:30",
  "text":"母からの返信が半日来ないだけで、\n頭の中では最悪のことばかり考えてしまう。\n——ただ、出かけていただけ。\nこの繰り返しに少し疲れている人、私だけじゃないと思う。"},
 {"id":"x_buzz_04","type":"hook","time":"12:15",
  "text":"「親孝行しなきゃ」と思った日ほど、\n忙しくて電話できない。\nそして、罪悪感だけが残る。\n…完璧じゃなくていいんだよね、きっと。"},
 {"id":"x_buzz_05","type":"question","time":"20:15",
  "text":"みんな、親とどれくらいの頻度で連絡してる?\n毎日?週に一度?それとも、用があるときだけ?\n正解がなくて、いつも少し迷う。"},
 {"id":"x_buzz_06","type":"story","time":"20:15",
  "text":"帰省の最終日、車で実家を出るとき。\nミラーの中で、ずっと手を振る母が小さくなっていく。\nあの景色だけは、何年経っても慣れない。"},
 {"id":"x_buzz_07","type":"quote","time":"21:30",
  "text":"見守りは、監視とは違う。\n「ちゃんとしているか確認する」んじゃなくて、\n「元気でいてね」と、ただ願い続けること。"},
 {"id":"x_buzz_08","type":"story","time":"19:00",
  "text":"父は、用がないと電話してこない。\nだから父から着信があると、一瞬どきっとする。\n「どうした?」「いや、声が聞きたかっただけ」\n——そういう父であってほしい、ずっと。"},
 {"id":"x_buzz_09","type":"aruaru","time":"12:15",
  "text":"実家あるある。\n・冷蔵庫に賞味期限切れ\n・同じ話を三回\n・「元気、元気」しか言わない\n・帰るたび「痩せた?」と聞かれる\n心配の半分は、たぶん愛情。"},
 {"id":"x_buzz_10","type":"quote","time":"08:10",
  "text":"電話の向こうの「もしもし」だけで、\nその日の親の調子が、なんとなく分かる。\n言葉より、声のトーン。\n離れているからこそ、耳がよくなる。"},
 {"id":"x_buzz_11","type":"hook","time":"22:30",
  "text":"毎日電話したい。でも毎日はできない。\nこの「でも」の部分に、\nみんな少しずつ、罪悪感を抱えている気がする。"},
 {"id":"x_buzz_12","type":"hook","time":"23:15",
  "text":"親が元気なうちに、と思う。\nでも「元気なうち」が、いつまでなのかは分からない。\nだから、特別な日じゃなくていい。\n今日、ひとことだけ送ってみる。"},
]

COLS=["post_id","date","platform","post_type","recommended_time","post_text",
      "image_needed","canva_needed","canva_prompt","image_filename",
      "link_required","reply_text","note"]
def row(p):
    return [p["id"],"順次（バズ最優先・リンクなし）","X",p["type"],p["time"],p["text"],
            "false","false","","","false","",  # link_required=false, reply空
            "リンクなし・宣伝なし。リーチ最優先。反応の良い型を翌週に増やす"]

with open(os.path.join(BASE,"X","buffer","x_posts_buzz.csv"),"w",newline="",encoding="utf-8") as f:
    w=csv.writer(f,quoting=csv.QUOTE_ALL); w.writerow(COLS)
    for p in POSTS: w.writerow(row(p))
with open(os.path.join(BASE,"X","buffer","x_posts_buzz.json"),"w",encoding="utf-8") as f:
    json.dump({"account":"@oyamimamori_jp","goal":"reach/buzz",
               "rules":"no links, no promo, no hashtags, strong first line",
               "posts":[dict(zip(COLS,row(p))) for p in POSTS]},f,ensure_ascii=False,indent=2)

TJP={"hook":"刺す共感","quote":"引用したい一言","aruaru":"あるある","question":"問いかけ（リプ誘発）","story":"情景"}
md=["# X バズ狙いセット ― @oyamimamori_jp\n",
    "**目的：リーチ最大化（リポスト・引用・リプ）。宣伝はしない。**",
    "- 本文にもリプライにも**リンクを入れない**（リーチが落ちるため）。",
    "- /app・記事・アフィリエイトは今は出さない。フォロワーと信頼が増えてから。",
    "- ハッシュタグなし。1行目で刺す。短く。\n","---\n"]
for p in POSTS:
    md.append(f"### {p['time']}　{TJP[p['type']]}　`{p['id']}`\n")
    md.append("```\n"+p["text"]+"\n```\n\n---\n")
with open(os.path.join(BASE,"X","posts","x_posts_buzz.md"),"w",encoding="utf-8") as f:
    f.write("\n".join(md))
print("posts:",len(POSTS),dict(Counter(p["type"] for p in POSTS)),
      "| links:",sum(1 for p in POSTS if p.get("link")))
