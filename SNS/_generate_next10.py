#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate Buffer-ready CSV/JSON + human-readable MD for the next 10
@oyamimamori_jp X posts (今日3本 + 明日7本). Single source of truth = POSTS.

NOTE on type mix: the requested breakdown summed to 11
(empathy 5 + practical 2 + checklist 1 + painting 2 + app_cta 1).
To respect the hard limits (total 10, images=2, app_cta=1) we keep the
best-performing empathy_text at 5 and trim practical_tip 2 -> 1."""
import csv, json, os

APP_LP = "https://www.oyamimamori.jp/app/"
BASE = os.path.dirname(os.path.abspath(__file__))

# Soft reply (no link) for emotional posts — keeps app導線 to exactly 1 (app_cta).
EMO_REPLY = "離れて暮らす母・父を、無理なく見守る方法を、少しずつ発信しています。"
# The only app導線 link, placed in the app_cta reply (not in any post body).
CTA_REPLY = "離れて暮らす母・父を、無理なく見守る方法を発信しています。\n" + APP_LP

POSTS = [
    # ===== 今日 2026-06-22（3本）=====
    {
        "post_id": "x_20260622_01", "date": "2026-06-22", "post_type": "empathy_text",
        "recommended_time": "18:30",
        "post_text": "親はいつまでも親のままだと、どこかで思っていた。\n久しぶりに聞いた声が少し小さくなっていて、はっとした。\n会えるうちに、もう少しだけ話しておきたい。",
        "image_needed": False, "canva_needed": False, "canva_prompt": "", "image_filename": "",
        "link_required": False, "reply_text": "",
        "note": "テキストのみ／画像なし／リプライなし。強い1行目の共感投稿。",
    },
    {
        "post_id": "x_20260622_02", "date": "2026-06-22", "post_type": "emotional_painting",
        "recommended_time": "20:30",
        "post_text": "父が、電話に出ない。\nたぶん風呂か、テレビに夢中なだけ。\nわかっているのに、コール音が長いと、少しだけ落ち着かない。\n離れているって、こういうことなんだな。",
        "image_needed": True, "canva_needed": True,
        "canva_prompt": "夜の都市の部屋で40〜50代がスマホの発信画面を見て少し心配。遠景の実家では父が静かな部屋でお茶、または窓際で過ごす。何も起きていないが離れているゆえの小さな不安。温かい光で親子がつながる。上品な日本向け絵画調・映画的な温かい光・深緑/薄緑/クリーム/暖色。文字・ロゴなし、医療介護感なし。1080x1080。",
        "image_filename": "03_chichi_denwa_denai_yoru.png",
        "link_required": False, "reply_text": EMO_REPLY,
        "note": "画像添付: 03_chichi_denwa_denai_yoru.png ／ 詳細: canva-prompts/03_chichi_denwa_denai_yoru_prompt.md ／ リプライはリンクなしの共感ひとこと。",
    },
    {
        "post_id": "x_20260622_03", "date": "2026-06-22", "post_type": "empathy_text",
        "recommended_time": "22:30",
        "post_text": "「用事がないと電話しちゃいけない」なんて、誰も言っていないのに。\n用がなくてもかけていいんだと気づいたのは、わりと最近のことだ。",
        "image_needed": False, "canva_needed": False, "canva_prompt": "", "image_filename": "",
        "link_required": False, "reply_text": "",
        "note": "テキストのみ／画像なし／リプライなし。短めの共感投稿。",
    },
    # ===== 明日 2026-06-23（7本）=====
    {
        "post_id": "x_20260623_01", "date": "2026-06-23", "post_type": "empathy_text",
        "recommended_time": "08:10",
        "post_text": "「おはよう」を送れる相手がいるのは、けっこうすごいことだ。\n実家の母に、今朝もスタンプをひとつ。\n返ってくる「おはよう」で、こちらの一日も始まる。",
        "image_needed": False, "canva_needed": False, "canva_prompt": "", "image_filename": "",
        "link_required": False, "reply_text": "",
        "note": "テキストのみ／画像なし／リプライなし。朝の共感投稿。",
    },
    {
        "post_id": "x_20260623_02", "date": "2026-06-23", "post_type": "practical_tip",
        "recommended_time": "10:30",
        "post_text": "親との連絡は、「質問」より「報告」がいい。\n「元気?」より「今日は天気がいいよ」。\n聞かれると答える義務が生まれるけれど、報告なら気楽に続く。",
        "image_needed": False, "canva_needed": False, "canva_prompt": "", "image_filename": "",
        "link_required": False, "reply_text": "",
        "note": "テキストのみ／画像なし／リプライなし。実用ヒント。",
    },
    {
        "post_id": "x_20260623_03", "date": "2026-06-23", "post_type": "checklist",
        "recommended_time": "12:15",
        "post_text": "離れて暮らす親と、最後に話したのはいつ?\n・今週、声を聞いた\n・先週までさかのぼる\n・思い出せない\n\n下にいくほど、今夜あたりが電話の頃合いです。",
        "image_needed": False, "canva_needed": False, "canva_prompt": "", "image_filename": "",
        "link_required": False, "reply_text": "",
        "note": "テキストのみ／画像なし／リプライなし。軽いトーンのチェックリスト。",
    },
    {
        "post_id": "x_20260623_04", "date": "2026-06-23", "post_type": "empathy_text",
        "recommended_time": "15:30",
        "post_text": "親の「大丈夫」は、半分は気づかいでできている。\n本当に平気なときも、少し無理しているときも、母は「大丈夫」と言う。\nだから、声のトーンだけは聞き逃したくない。",
        "image_needed": False, "canva_needed": False, "canva_prompt": "", "image_filename": "",
        "link_required": False, "reply_text": "",
        "note": "テキストのみ／画像なし／リプライなし。共感投稿。",
    },
    {
        "post_id": "x_20260623_05", "date": "2026-06-23", "post_type": "empathy_text",
        "recommended_time": "18:30",
        "post_text": "実家の電話番号は、今でも諳んじている。\n携帯の短縮番号より先に、指が覚えている番号。\nかける回数は減っても、あの番号だけは忘れない。",
        "image_needed": False, "canva_needed": False, "canva_prompt": "", "image_filename": "",
        "link_required": False, "reply_text": "",
        "note": "テキストのみ／画像なし／リプライなし。郷愁系の共感投稿。",
    },
    {
        "post_id": "x_20260623_06", "date": "2026-06-23", "post_type": "emotional_painting",
        "recommended_time": "20:30",
        "post_text": "夜、実家の窓に灯りがついているのを見ると、なぜだかほっとする。\n今日も、変わらず暮らしている。\nその当たり前が、いちばんありがたい。",
        "image_needed": True, "canva_needed": True,
        "canva_prompt": "夜、実家の窓に温かい灯り。離れて暮らす子ども世代がスマホを手に、ふと実家を思い出す。家の中で母または父が穏やかに過ごす様子をやわらかく。見守りは監視でなく気にかける習慣だと伝わる。上品な日本向け絵画調・映画的な温かい光・深緑/薄緑/クリーム/暖色。文字・ロゴなし、医療介護感なし。1080x1080。",
        "image_filename": "04_jikka_no_akari.png",
        "link_required": False, "reply_text": EMO_REPLY,
        "note": "画像添付: 04_jikka_no_akari.png ／ 詳細: canva-prompts/04_jikka_no_akari_prompt.md ／ リプライはリンクなしの共感ひとこと。",
    },
    {
        "post_id": "x_20260623_07", "date": "2026-06-23", "post_type": "app_cta",
        "recommended_time": "22:30",
        "post_text": "毎日電話したい気持ちはあるけれど、現実はなかなかむずかしい。\nそんな人どうしで、無理なく続けられる見守り方を探しています。\n「今日も元気」のひとことを、気軽に渡し合えたら。",
        "image_needed": False, "canva_needed": False, "canva_prompt": "", "image_filename": "",
        "link_required": True, "reply_text": CTA_REPLY,
        "note": "本日唯一のapp導線。リンクは本文に入れずリプライのみ。宣伝色を抑え『見守り方の紹介』として。",
    },
]

COLS = ["post_id", "date", "platform", "post_type", "recommended_time", "post_text",
        "image_needed", "canva_needed", "canva_prompt", "image_filename",
        "link_required", "reply_text", "note"]

def b(v):
    return "true" if v else "false"

# ---- CSV ----
with open(os.path.join(BASE, "X", "buffer", "x_posts_next_10.csv"), "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f, quoting=csv.QUOTE_ALL)
    w.writerow(COLS)
    for p in POSTS:
        w.writerow([p["post_id"], p["date"], "X", p["post_type"], p["recommended_time"],
                    p["post_text"], b(p["image_needed"]), b(p["canva_needed"]),
                    p["canva_prompt"], p["image_filename"], b(p["link_required"]),
                    p["reply_text"], p["note"]])

# ---- JSON ----
with open(os.path.join(BASE, "X", "buffer", "x_posts_next_10.json"), "w", encoding="utf-8") as f:
    json.dump({
        "account": "@oyamimamori_jp", "account_name": "親みまもり研究所",
        "platform": "X", "app_lp": APP_LP,
        "dates": {"today": "2026-06-22 (3本)", "tomorrow": "2026-06-23 (7本)"},
        "posts": [{"platform": "X", **p} for p in POSTS],
    }, f, ensure_ascii=False, indent=2)

# ---- Markdown ----
TYPE_JP = {
    "emotional_painting": "絵画投稿（共感・リポスト狙い）", "empathy_text": "共感テキスト",
    "checklist": "チェックリスト", "practical_tip": "実用ヒント", "app_cta": "アプリ導線（1日1本）",
}
def render(posts):
    out = []
    for i, p in enumerate(posts, 1):
        out.append(f"### {p['recommended_time']}　{TYPE_JP[p['post_type']]}　`{p['post_id']}`")
        out.append("\n**投稿本文**\n")
        out.append("```\n" + p["post_text"] + "\n```")
        out.append(f"- 画像: {'必要' if p['image_needed'] else 'なし'}")
        if p["image_needed"]:
            out.append(f"- 使用画像ファイル名: `SNS/X/images/{p['image_filename']}`")
            stem = p["image_filename"].rsplit(".", 1)[0]
            out.append(f"- Canvaプロンプト参照: `SNS/X/canva-prompts/{stem}_prompt.md`")
        if p["reply_text"]:
            out.append("- **リプライ文**\n")
            out.append("```\n" + p["reply_text"] + "\n```")
        else:
            out.append("- リプライ: なし")
        out.append(f"- Buffer入力メモ: {p['note']}\n")
        out.append("---\n")
    return "\n".join(out)

today = [p for p in POSTS if p["date"] == "2026-06-22"]
tomorrow = [p for p in POSTS if p["date"] == "2026-06-23"]
md = []
md.append("# 次の10投稿 ― @oyamimamori_jp（親みまもり研究所）\n")
md.append("投稿時間順。Buffer無料版またはX公式の予約投稿に手動でコピーして登録してください。\n")
md.append("- 本文に毎回リンクは入れません。リンクは app_cta のリプライ1本のみ。")
md.append("- 画像付きは2本（絵画投稿）。それ以外はテキストのみ。")
md.append(f"- app導線は10本中1本のみ。リンク先: {APP_LP}\n")
md.append("---\n")
md.append("## 今日 2026-06-22（3本）\n")
md.append(render(today))
md.append("## 明日 2026-06-23（7本）\n")
md.append(render(tomorrow))
with open(os.path.join(BASE, "X", "posts", "x_posts_next_10.md"), "w", encoding="utf-8") as f:
    f.write("\n".join(md))

from collections import Counter
print("posts:", len(POSTS), "/ types:", dict(Counter(p["post_type"] for p in POSTS)))
print("images:", sum(p["image_needed"] for p in POSTS), "/ links:", sum(p["link_required"] for p in POSTS))
print("today:", len(today), "tomorrow:", len(tomorrow))
