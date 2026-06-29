---
description: Generate 14 days × 5 = 70 buzz-first X posts (link-free, scored)
---

14日分・1日5本＝**70本**のバズ最優先X投稿を作成してください。`honne-post-writer`／`research-lab-writer`／`weather-disaster-angle-writer`／`app-conversion-planner` を使い分けると良いです。

配分: 本音共感49 / 親みまもり研究所メモ14 / 台風・雨・夜・実家4 / app・記事誘導3 / アフィリエイト直接0。
投稿時間: 08:10 / 12:15 / 16:45 / 20:15 / 22:30。

各投稿の型: ①1行目で止める ②感情から入る ③本音を代弁 ④小さな気づきで終える ⑤商品/アプリ/リンクの匂いゼロ。
**Xにリンクを貼らない**（app/記事誘導はlink_url＋reply_textに保持し、本文には出さない）。完全オリジナル。

出力:
- `SNS/X/posts/x_posts_14days_brutal_buzz_YYYY-MM-DD.md`
- `SNS/X/buffer/x_posts_14days_brutal_buzz_YYYY-MM-DD.csv`（列は /x-score-posts と同じ16列）

各投稿に**バズ判定スコア**（first_line_hook/empathy/repost/ad_smell）も付けること（`/x-score-posts` のルール）。
※ `SNS/_generate_brutal_buzz_14days.py` を手本に Python で生成するとCSVが安全。`src/`/`public/`不可。投稿しない。`git commit`しない。
