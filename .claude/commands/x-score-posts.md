---
description: Score X posts for buzz and set approve/revise/reject
---

70本（または対象セット）の各投稿に**バズ判定スコア**を付け、approve/revise/reject を決めてください。

スコア（各1〜5）と列:
`post_id,date,time,post_type,post_text,image_needed,canva_prompt,link_needed,link_url,reply_text,note,first_line_hook,empathy_score,repost_potential,ad_smell_risk,approval_recommendation`

判定ルール:
- `first_line_hook` が **3以下なら reject**
- `empathy_score` が **3以下なら reject**
- `ad_smell_risk` が **4以上なら reject**
- `approve` は**70本中20本まで**（最も強いものから）
- 上記を満たさない良作は `revise`

出力: 対象の Buffer CSV を上書き更新（`SNS/X/buffer/...csv`）。
注意: 正直に評価する（全部approveにしない）。`src/`/`public/`不可。投稿しない。`git commit`しない。
