# Agent model / effort 最適化マトリクス — 2026-06-30

方針：戦略=high/xhigh、単純作業=low/medium、安全レビュー=high、本番コード変更・広告実装・セキュリティ=max。
※ Claude Code の agent frontmatter は `model` が正式key。`effort` は本表での運用指標（起動時に手動で /think 等で調整）。

## X運用
| agent | model | effort | tools | 役割 |
|---|---|---|---|---|
| x-buzz-strategist | sonnet | **xhigh** | Read/Grep/Glob/Write | バズ戦略の核。重く |
| honne-post-writer | sonnet | high | Read/Grep/Glob/Write | 本音代弁（質が命） |
| research-lab-writer | sonnet | medium | Read/Grep/Glob/Write | 研究所メモ |
| weather-disaster-angle-writer | sonnet | medium | Read/Grep/Glob/Write | 天候・実家系 |
| canva-visual-planner | haiku | medium | Read/Grep/Glob/Write | 画像プロンプト（手動運用） |
| buffer-scheduler | haiku | low | Read/Grep/Glob/Write | CSV整形のみ |
| x-auto-queue-manager | haiku | medium | Read/Grep/Glob/Write/Edit | 承認制キュー管理 |
| x-analytics-reviewer | sonnet | high | Read/Grep/Glob | 反応分析・型特定 |
| sns-safety-reviewer | sonnet | high | Read/Grep/Glob | 安全審査 |
| app-conversion-planner | sonnet | high | Read/Grep/Glob/Write | 導線設計（抑制モード） |

## アフィリエイト
| agent | model | effort | tools |
|---|---|---|---|
| affiliate-strategist | sonnet | high | Read/Grep/Glob/Write |
| affiliate-product-researcher | haiku | medium | Read/Grep/Glob/Write |
| affiliate-content-planner | sonnet | medium | Read/Grep/Glob/Write |
| affiliate-disclosure-reviewer | sonnet | high | Read/Grep/Glob |
| affiliate-link-manager | haiku | low | Read/Grep/Glob/Write/Edit |
| affiliate-safety-reviewer | sonnet | high | Read/Grep/Glob/Edit/Write |

## 広告・セキュリティ
| agent | model | effort | tools | メモ |
|---|---|---|---|---|
| ads-strategist | sonnet | high | Read/Grep/Glob/Write | 配置戦略 |
| ads-safety-reviewer | sonnet | high | Read/Grep/Glob | 禁止フォーマット監視 |
| ads-implementation-reviewer | sonnet | **max** | Read/Grep/Glob/Bash | 本番実装レビュー（最重要） |
| security-remediation-agent | opus | **max** | Read/Grep/Glob/Bash | 漏洩対応・鍵再発行案内 |

## 運用ルール
- **max effort** は「本番 src 変更・広告タグ実装・セキュリティ」だけに使う（コスト大）。
- 生成系（honne/research/weather）は sonnet/haiku で数を回し、**質の判定は sonnet+high の reviewer** に任せる二段構え。
- 単純作業（buffer整形・link表）は haiku/low で軽く。
- モデルは各 agent の frontmatter `model:` に反映済み。effortは起動時に調整。
