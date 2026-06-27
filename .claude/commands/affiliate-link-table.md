---
description: Create/update the affiliate link management table (no secrets, no real IDs)
---

アフィリエイトリンク管理表を作成・更新してください。`affiliate-link-manager` サブエージェント推奨。

1. 既存があれば `Affiliate/links/affiliate_link_table.csv` を読む。なければ `Affiliate/links/affiliate_link_table.example.csv` を雛形にする。
2. 列: `link_id,program_name,category,product_or_service_name,affiliate_url,landing_article,disclosure_required,last_checked,status,notes`
3. 各掲載予定について行を追加・更新。`affiliate_url` は人間提供の実URLのみ。未確定は `REPLACE_WITH_AFFILIATE_URL`。`disclosure_required` は原則 `yes`。
4. 出力: `Affiliate/links/affiliate_link_table.csv`

注意:
- **secret・ログイン情報・個人情報は書かない**。実アフィリエイトIDを勝手に入れない。
- src/・public/ は触らない。git commit はしない。
