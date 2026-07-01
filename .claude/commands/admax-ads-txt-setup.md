---
description: Set up public/ads.txt + 忍者AdMax display-ad plan
---

public/ads.txt（**ユーザー提供の全文をそのまま1行1レコード**で保存）と忍者AdMax表示広告の設計。ads.txtは販売者認証ファイル＝広告は表示しない。広告タグ未提供なら本番表示は実装しない。`adm.shinobi.jp,230541,DIRECT`/google/yahoo行・行数・壊れCSVを検証し、build で dist/ads.txt 出力を確認。オーバーレイ禁止。commitしない。
