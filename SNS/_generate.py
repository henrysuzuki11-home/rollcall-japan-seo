#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate Buffer-ready CSV/JSON and a human-readable Markdown plan
for @oyamimamori_jp X posts. Single source of truth = POSTS below."""
import csv, json, os

DATE = "2026-06-21"  # 明日分（依頼時点の翌日）
APP_LP = "https://www.oyamimamori.jp/app/"
BASE = os.path.dirname(os.path.abspath(__file__))

POSTS = [
    {
        "post_id": "x_20260621_01",
        "platform": "X",
        "post_type": "empathy_text",
        "recommended_time": "08:10",
        "post_text": "実家を出て、もう何年になるだろう。\n「元気?」と送れば「元気だよ」と返ってくる。\nただそれだけのことが、こんなに安心するなんて、若い頃は思いもしなかった。\n今朝も、母にひとことだけ送ってみる。",
        "image_needed": False,
        "image_prompt": "",
        "link_required": False,
        "reply_text": "",
        "note": "本文のみ／画像なし／リプライなし。朝の共感投稿。",
    },
    {
        "post_id": "x_20260621_02",
        "platform": "X",
        "post_type": "practical_tip",
        "recommended_time": "10:30",
        "post_text": "離れた親と連絡を続けるコツは、「用件がなくても送る」こと。\n天気の話でも、夕飯の写真でもいい。\n“安否確認のための連絡”だと、お互い少し身構えてしまうから。\nなんでもない一言を、気軽に。",
        "image_needed": False,
        "image_prompt": "",
        "link_required": False,
        "reply_text": "",
        "note": "本文のみ／画像なし／リプライなし。実用ヒント。",
    },
    {
        "post_id": "x_20260621_03",
        "platform": "X",
        "post_type": "checklist",
        "recommended_time": "12:15",
        "post_text": "離れて暮らす親に、できているかな。\n・週に一度は声を聞いている\n・緊急時の連絡先を家族で共有している\n・親のスマホの充電習慣を知っている\n\n全部そろわなくて当たり前。ひとつ思い出せたら、それで十分です。",
        "image_needed": False,
        "image_prompt": "",
        "link_required": False,
        "reply_text": "",
        "note": "本文のみ／画像なし／リプライなし。昼のチェックリスト。",
    },
    {
        "post_id": "x_20260621_04",
        "platform": "X",
        "post_type": "empathy_text",
        "recommended_time": "14:30",
        "post_text": "「忙しいだろうから」と、親はなかなか電話してこない。\nこちらも「元気だろう」と、つい後回しにする。\nお互いに遠慮しているうちに、気づけば一か月。\n声が聞きたい気持ちは、たぶん同じなのにね。",
        "image_needed": False,
        "image_prompt": "",
        "link_required": False,
        "reply_text": "",
        "note": "本文のみ／画像なし／リプライなし。すれ違いの共感。",
    },
    {
        "post_id": "x_20260621_05",
        "platform": "X",
        "post_type": "practical_tip",
        "recommended_time": "16:45",
        "post_text": "親に新しい道具を勧めるときは、\n「私が使いたいから、一緒にやってみよう」と誘うとうまくいく。\n「心配だから」だと、年寄り扱いされた気がして、つい身構えてしまうもの。\n見守りは、対等なくらいがちょうどいい。",
        "image_needed": False,
        "image_prompt": "",
        "link_required": False,
        "reply_text": "",
        "note": "本文のみ／画像なし／リプライなし。実用ヒント（別角度）。",
    },
    {
        "post_id": "x_20260621_06",
        "platform": "X",
        "post_type": "emotional_painting",
        "recommended_time": "18:30",
        "post_text": "仕事帰りの電車。\nスマホに「今日も大丈夫」の通知がひとつ届いていた。\nたったそれだけで、肩の力がふっと抜ける夜がある。\n離れていても通じ合えるのは、こんな小さな言葉からなのかもしれない。",
        "image_needed": True,
        "image_prompt": "夜の都市部の部屋で40〜50代の子ども世代がスマホを見つめ、画面に小さく『今日も大丈夫』。遠景に実家のような日本家屋と温かい灯り。親子をつなぐやさしい光の線。映画的で温かい光、上品な日本向け絵画調。深緑・薄緑・クリーム・暖色。文字/ロゴなし、医療・介護感なし。1080x1080。",
        "link_required": False,
        "reply_text": "",
        "note": "画像添付: 01_kyoumo_daijoubu.png ／ 詳細プロンプト: canva-prompts/01_kyoumo_daijoubu_prompt.md ／ リプライなし。共感・リポスト狙い。",
    },
    {
        "post_id": "x_20260621_07",
        "platform": "X",
        "post_type": "empathy_text",
        "recommended_time": "20:15",
        "post_text": "実家に電話して、母の「もしもし」がいつもより少し遅いと、胸がひやりとする。\nなんてことはない、ただ庭にいただけ。\nその「なんてことない」を、毎回そっと確かめられたらいいのに。",
        "image_needed": False,
        "image_prompt": "",
        "link_required": False,
        "reply_text": "",
        "note": "本文のみ／画像なし／リプライなし。『返信がない不安』テーマ。",
    },
    {
        "post_id": "x_20260621_08",
        "platform": "X",
        "post_type": "emotional_painting",
        "recommended_time": "21:30",
        "post_text": "同じ月を、たぶん父も見ている。\n隣にいなくても、気にかけている。\n見守るというのは、監視することじゃなくて、\n「元気でいてね」と静かに願い続けること、なんだと思う。",
        "image_needed": True,
        "image_prompt": "左に都市で暮らす子ども世代、右に実家で静かに過ごす母または父。距離はあるが柔らかい光でつながる構図。見守りは監視ではなく家族を想う小さな習慣であることが伝わる。映画的で温かい光、上品な日本向け絵画調。深緑・薄緑・クリーム・暖色。文字/ロゴなし、医療・介護感なし。1080x1080。",
        "link_required": False,
        "reply_text": "",
        "note": "画像添付: 02_hanareteitemo_kinikaketeiru.png ／ 詳細プロンプト: canva-prompts/02_hanareteitemo_kinikaketeiru_prompt.md ／ リプライなし。ブランドの核（見守り=監視ではない）。",
    },
    {
        "post_id": "x_20260621_09",
        "platform": "X",
        "post_type": "app_cta",
        "recommended_time": "22:30",
        "post_text": "毎日電話するのは、正直むずかしい。\nでも「今日も元気」のひとことだけなら、お互い負担にならない。\nそんな、さりげない見守りの習慣を続けるための方法を、編集部でまとめてみました。",
        "image_needed": False,
        "image_prompt": "",
        "link_required": True,
        "reply_text": "離れて暮らす親の見守りについては、こちらにまとめています。\n" + APP_LP,
        "note": "本日唯一のapp導線。リンクは本文に入れずリプライのみ。画像なし。",
    },
    {
        "post_id": "x_20260621_10",
        "platform": "X",
        "post_type": "checklist",
        "recommended_time": "23:15",
        "post_text": "眠る前に、ひとつだけ。\n・今日、親の声か顔に触れた?\n・触れていないなら、明日の朝いちばんに\n\n返事は急がなくていい。気にかけている、それだけで伝わるものがある。",
        "image_needed": False,
        "image_prompt": "",
        "link_required": False,
        "reply_text": "",
        "note": "本文のみ／画像なし／リプライなし。一日の締めの静かなチェックリスト。",
    },
]

COLS = ["post_id", "platform", "post_type", "recommended_time", "post_text",
        "image_needed", "image_prompt", "link_required", "reply_text", "note"]

IMAGE_FILE = {
    "x_20260621_06": "01_kyoumo_daijoubu.png",
    "x_20260621_08": "02_hanareteitemo_kinikaketeiru.png",
}

def b(v):
    return "true" if v else "false"

# ---- CSV (RFC4180, multiline fields quoted/escaped by csv module) ----
csv_path = os.path.join(BASE, "X", "buffer", "x_posts_tomorrow.csv")
with open(csv_path, "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f, quoting=csv.QUOTE_ALL)
    w.writerow(COLS)
    for p in POSTS:
        w.writerow([p["post_id"], p["platform"], p["post_type"], p["recommended_time"],
                    p["post_text"], b(p["image_needed"]), p["image_prompt"],
                    b(p["link_required"]), p["reply_text"], p["note"]])

# ---- JSON ----
json_path = os.path.join(BASE, "X", "buffer", "x_posts_tomorrow.json")
with open(json_path, "w", encoding="utf-8") as f:
    json.dump({
        "account": "@oyamimamori_jp",
        "account_name": "親みまもり研究所",
        "date": DATE,
        "platform": "X",
        "app_lp": APP_LP,
        "posts": [{
            "post_id": p["post_id"], "platform": p["platform"], "post_type": p["post_type"],
            "recommended_time": p["recommended_time"], "post_text": p["post_text"],
            "image_needed": p["image_needed"],
            "image_file": IMAGE_FILE.get(p["post_id"], ""),
            "image_prompt": p["image_prompt"], "link_required": p["link_required"],
            "reply_text": p["reply_text"], "note": p["note"],
        } for p in POSTS],
    }, f, ensure_ascii=False, indent=2)

# ---- Human-readable Markdown ----
TYPE_JP = {
    "emotional_painting": "絵画投稿（共感・リポスト狙い）",
    "empathy_text": "共感テキスト",
    "checklist": "チェックリスト",
    "practical_tip": "実用ヒント",
    "app_cta": "アプリ導線（1日1本）",
}
md_path = os.path.join(BASE, "X", "posts", "x_posts_tomorrow.md")
lines = []
lines.append(f"# 明日（{DATE}）のX投稿一覧 ― @oyamimamori_jp\n")
lines.append("投稿時間順に並べています。Buffer無料版またはX公式の予約投稿に、手動でコピーして登録してください。\n")
lines.append("- 本文に毎回リンクは入れません。リンクは必要なときだけリプライに入れます。")
lines.append("- 画像付きは2本（絵画投稿）。それ以外はテキストのみです。")
lines.append(f"- app導線は10本中1本のみ（22:30）。リンク先: {APP_LP}\n")
lines.append("---\n")
for i, p in enumerate(POSTS, 1):
    img = IMAGE_FILE.get(p["post_id"], "")
    lines.append(f"## {i}. {p['recommended_time']}　{TYPE_JP[p['post_type']]}")
    lines.append(f"- post_id: `{p['post_id']}`")
    lines.append("")
    lines.append("**投稿本文**")
    lines.append("```")
    lines.append(p["post_text"])
    lines.append("```")
    lines.append(f"- 画像: {'必要' if p['image_needed'] else 'なし'}")
    if p["image_needed"]:
        lines.append(f"- 使用画像ファイル名: `SNS/X/images/{img}`")
    if p["reply_text"]:
        lines.append("- **リプライ文**")
        lines.append("```")
        lines.append(p["reply_text"])
        lines.append("```")
    else:
        lines.append("- リプライ: なし")
    lines.append(f"- Buffer入力メモ: {p['note']}")
    lines.append("\n---\n")
with open(md_path, "w", encoding="utf-8") as f:
    f.write("\n".join(lines))

print("CSV :", csv_path)
print("JSON:", json_path)
print("MD  :", md_path)
print("posts:", len(POSTS))
