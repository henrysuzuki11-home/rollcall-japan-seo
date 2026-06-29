#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""X posts that tie naturally into the 3 newly published articles
(防災グッズ / モバイルバッテリー / 見守りカメラ). Rules:
- Empathy-first. NO links / NO affiliate in the post body.
- Article promo posts put the ARTICLE url in the REPLY, with the X disclosure
  「※記事内に広告・PRを含みます。」(the linked article contains PR/affiliate).
- Use at most 1 promo per day; keep most posts non-promo.
- No hashtags. Do not paste affiliate links directly on X.
Outputs md/csv/json under SNS/X/."""
import csv, json, os
BASE=os.path.dirname(os.path.abspath(__file__))
SITE="https://www.oyamimamori.jp"
A_BOUSAI=f"{SITE}/articles/bousai-goods-oya-checklist"
A_BATT=f"{SITE}/articles/jikka-mobile-battery-bichiku"
A_CAM=f"{SITE}/articles/mimamori-camera-erabu-mae-ni"
PR="※記事内に広告・PRを含みます。"

POSTS=[
 # ---- 非プロモ（リンクなし・共感/実用）----
 {"id":"x_tiein_01","type":"empathy_text","time":"08:10",
  "text":"実家の防災、気にはなっていても、つい後回しになる。\n「うちは大丈夫」と親は言うけれど、本当に大丈夫かは、見てみないと分からない。\n今度帰ったとき、一緒に確認してみよう。","reply":"",
  "note":"リンクなし／本文のみ。備えの共感（防災記事の前振り）"},
 {"id":"x_tiein_02","type":"practical_tip","time":"12:15",
  "text":"親に防災を勧めるなら、「心配だから」より「一緒に確認しよう」。\n年寄り扱いされた気がすると、人は身構えてしまうもの。\n対等なくらいが、ちょうどいい。","reply":"",
  "note":"リンクなし／実用ヒント"},
 {"id":"x_tiein_03","type":"empathy_text","time":"16:45",
  "text":"停電のニュースを見ると、まず思い浮かぶのは実家のこと。\nスマホの充電が切れたら、連絡も取れなくなる。\nせめて充電の備えだけでも、と思う夜。","reply":"",
  "note":"リンクなし／バッテリー記事の前振り"},
 {"id":"x_tiein_04","type":"empathy_text","time":"20:15",
  "text":"見守りカメラを考えたとき、ふと手が止まった。\n「これ、監視になっていないかな」と。\n大事なのは機能より、親本人の気持ちなのかもしれない。","reply":"",
  "note":"リンクなし／見守りカメラ記事の前振り（監視でない方針）"},
 {"id":"x_tiein_05","type":"practical_tip","time":"22:30",
  "text":"親に何か備えてもらうなら、増やすより「一つだけ」。\nあれもこれもは続かない。\n続くのは、いつもいちばんシンプルなほう。","reply":"",
  "note":"リンクなし／実用ヒント"},
 # ---- 記事誘導（本文はリンクなし。リプライに記事URL＋PR注記）----
 {"id":"x_tiein_promo_bousai","type":"article_promo","time":"16:45","link":True,
  "text":"離れて暮らす親の実家、何から備えればいいか分からない——。\nあれこれ買う前に、まず「最低限の3つ」から考えると気がラクになる。\nチェックリストにして整理してみました。",
  "reply":f"くわしくはこちら。\n{A_BOUSAI}\n{PR}",
  "note":"記事誘導：防災グッズ。本文にリンクなし／リプライに記事URL＋PR注記。1日1本まで"},
 {"id":"x_tiein_promo_batt","type":"article_promo","time":"20:15","link":True,
  "text":"停電したとき、実家の親と連絡が取れるだろうか。\nスマホの充電が切れたら、それも難しくなる。\n「充電の備え」を、連絡の備えとして整理してみました。",
  "reply":f"くわしくはこちら。\n{A_BATT}\n{PR}",
  "note":"記事誘導：モバイルバッテリー。リプライに記事URL＋PR注記。1日1本まで"},
 {"id":"x_tiein_promo_cam","type":"article_promo","time":"21:30","link":True,
  "text":"親の様子が見えなくて、見守りカメラを考える。\nでも「監視されている」と感じさせたくはない。\nカメラを選ぶ前に、家族で決めておきたいことを整理しました。",
  "reply":f"くわしくはこちら。\n{A_CAM}\n{PR}",
  "note":"記事誘導：見守りカメラ。リプライに記事URL＋PR注記。1日1本まで"},
]

COLS=["post_id","date","platform","post_type","recommended_time","post_text",
      "image_needed","canva_needed","canva_prompt","image_filename",
      "link_required","reply_text","note"]
def row(p):
    return [p["id"],"順次（2026-07-04〜・1日1誘導まで）","X",p["type"],p["time"],p["text"],
            "false","false","","","true" if p.get("link") else "false",p.get("reply",""),p["note"]]

with open(os.path.join(BASE,"X","buffer","x_posts_article_tiein.csv"),"w",newline="",encoding="utf-8") as f:
    w=csv.writer(f,quoting=csv.QUOTE_ALL); w.writerow(COLS)
    for p in POSTS: w.writerow(row(p))

with open(os.path.join(BASE,"X","buffer","x_posts_article_tiein.json"),"w",encoding="utf-8") as f:
    json.dump({"account":"@oyamimamori_jp","platform":"X","note":"新着3記事への誘導セット",
               "articles":{"bousai":A_BOUSAI,"battery":A_BATT,"camera":A_CAM},
               "posts":[dict(zip(COLS,row(p))) for p in POSTS]},f,ensure_ascii=False,indent=2)

TJP={"empathy_text":"共感テキスト","practical_tip":"実用ヒント","article_promo":"記事誘導（リプライにURL＋PR注記）"}
md=["# X投稿セット：新着3記事への誘導 ― @oyamimamori_jp\n",
    "共感主軸。**本文にリンクは入れず**、記事誘導は**リプライ**に記事URL＋「※記事内に広告・PRを含みます。」。",
    "直接アフィリエイトリンクは貼らない。ハッシュタグなし。**記事誘導は1日1本まで**、共感投稿の合間に。\n",
    f"- 防災グッズ: {A_BOUSAI}",f"- モバイルバッテリー: {A_BATT}",f"- 見守りカメラ: {A_CAM}",
    "\n> ⚠ 記事URLは本番デプロイ（git push）後に有効になります。\n","---\n"]
for p in POSTS:
    md.append(f"### {p['time']}　{TJP[p['type']]}　`{p['id']}`\n")
    md.append("**投稿本文**\n\n```\n"+p["text"]+"\n```")
    if p.get("reply"):
        md.append("- **リプライ文**\n\n```\n"+p["reply"]+"\n```")
    else:
        md.append("- リプライ: なし")
    md.append(f"- Buffer入力メモ: {p['note']}\n\n---\n")
with open(os.path.join(BASE,"X","posts","x_posts_article_tiein.md"),"w",encoding="utf-8") as f:
    f.write("\n".join(md))
from collections import Counter
print("posts:",len(POSTS),dict(Counter(p["type"] for p in POSTS)),
      "| promo(link):",sum(1 for p in POSTS if p.get("link")))
