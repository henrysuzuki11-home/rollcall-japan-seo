---
description: Select the top 10 approved posts into the承認制 auto-post queue
---

approve 候補の中から**最強の10本だけ**を選び、自動投稿queue用CSVを作成してください（**承認制**）。

手順:
1. `SNS/X/buffer/x_posts_14days_brutal_buzz_*.csv`（最新）の `approval_recommendation == approve` を対象に。
2. first_line_hook・empathy・repost が高い順に**10本**選ぶ（種別が偏らないよう配慮）。
3. `SNS/X/queue/x_post_queue.csv` を作成。列例: `post_id,date,time,post_type,post_text,link_needed,link_url,approved,note`。
   - `approved` は**全て false**（初期値）。
   - 注記に運用ルール: 人間が `approved=true` にしたものだけ投稿対象／1回1投稿／1日最大5投稿／/appリンク付きは1日1本以下／**アフィリエイト直接投稿は禁止**。

厳守:
- ここでは**投稿しない**（queueを用意するだけ）。自動いいね/フォロー/DM/リプライ禁止。
- Xにアフィリ/Amazonリンクを貼らない。`src/`/`public/`不可。`git commit`しない。
