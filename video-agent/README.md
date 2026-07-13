# 親みまもり研究所 ショート動画 自動生成パイプライン

Claude Code をオーケストレーターに、**1コマンドで縦型ショート動画（1080×1920 / 20秒）を1本自動生成**します。

```
台本(Ollama) → 画像(ComfyUI) → 仮ナレ(Mac say) → 字幕(Whisper) → 動画(Remotion) → MP4(FFmpeg)
```

各工程は接続できない場合でも **fallback で必ず MP4 まで到達**します：

| 工程 | 本番 | fallback |
|---|---|---|
| 台本 | Ollama API | 固定台本 JSON |
| 画像 | ComfyUI API | sharp プレースホルダー（グラデーション） |
| 仮ナレ | Mac `say` → ffmpeg m4a | 無音で継続 |
| 字幕 | Whisper | 台本 JSON から SRT 生成 |
| 動画 | Remotion | FFmpeg スライドショー |

> 社内キャンペーンコードは**動画・字幕・音声台本・出力物に一切含めません**（`scripts/_shared.ts` の `FORBIDDEN_STRINGS` に登録し、`check-output` で自動検査）。

---

## 必要環境

- Node.js 18+（推奨 20+）
- macOS（`say` による仮ナレーション。Mac 以外では音声はスキップされ無音動画になります）
- FFmpeg（`brew install ffmpeg`）… 音声変換・保険レンダリングに使用
- 任意：Ollama（台本）、ComfyUI Desktop（画像）、Whisper（字幕）

## セットアップ

```bash
cd video-agent
cp .env.example .env    # 必要なら値を編集
npm install
```

### Ollama（任意）
```bash
ollama serve            # http://localhost:11434
ollama pull llama3.1    # .env の OLLAMA_MODEL と合わせる
```
起動していなければ自動で固定台本にフォールバックします。

### ComfyUI（任意）
- ComfyUI Desktop を起動（既定 `http://127.0.0.1:8188`）。
- 画像生成ワークフローは `workflows/basic-text-to-image.json`。`ckpt_name` を手元のモデルに合わせて変更してください。
- 未接続でもプレースホルダー画像で動画化されます。

### Mac 仮ナレーション（男性声）
既定は男性の **Otoya**（`.env` の `MAC_SAY_VOICE=Otoya`）。

```bash
say -v '?'                       # 利用可能な音声一覧（ja_JP を確認）
say -v Otoya "テスト音声です"      # 動作確認（Otoya が無ければ下記参照）
```

声の変更・フォールバック仕様：
- `.env` / `.env.example` の `MAC_SAY_VOICE` で指定（推奨 `Otoya`）。
- 指定した声が無い場合は **日本語の男性声を自動検出**してフォールバック
  （優先順：Otoya → Hattori → Grandpa → Rocko → Reed → Eddy）。
- 男性声が1つも無い場合は WARNING を出して Kyoko（女性）等へフォールバック。
- **高品質な男性声（Otoya / Hattori）を追加**するには：
  システム設定 ＞ アクセシビリティ ＞ 読み上げコンテンツ ＞ システムの声 ＞「声を管理」から
  日本語の Otoya / Hattori をダウンロード。

### 音声実尺に合わせた尺・字幕同期
Mac say の実音声は台本の想定尺と一致しないため、以下で自動同期します：
- `generate-voiceover` が生成音声の実尺を測り `outputs/audio/<slug>.duration.json` に保存。
- `generate-subtitles` がその実尺に合わせて各シーンの字幕タイミングを**比例配分で再計算**
  （元のシーン秒数比率は維持）。SRT と `subtitles.json` の start/end を更新。
- `render-remotion` が**動画尺を音声実尺に合わせる**（最低20秒・最大30秒にクランプ）。
  各シーンの表示時間も再計算後のタイミングに一致。
- Whisper が使える場合は SRT を Whisper 優先で生成（オンスクリーン字幕は比例配分ベース）。

### Whisper（任意）
```bash
pip install -U openai-whisper     # whisper コマンドが使えること
```
未接続なら台本 JSON から SRT を生成します。

---

## 1本生成（メイン）

```bash
npm run video:one
```

完成物：

- 動画：`outputs/videos/smartphone-info.mp4`
- 音声：`outputs/audio/smartphone-info.m4a`（無ければ無音）
- 字幕：`outputs/subtitles/smartphone-info.srt` / `data/subtitles/smartphone-info.subtitles.json`
- 台本：`data/scripts/smartphone-info.script.json`
- ログ：`outputs/logs/run-one-video.log`

### 工程を個別に実行
```bash
npm run video:script      # 台本
npm run video:images      # 画像
npm run video:voiceover   # 仮ナレ
npm run video:subtitles   # 字幕
npm run video:render      # 動画レンダリング
npm run video:check       # 出力チェック
```

### Remotion をプレビュー（ブラウザ編集）
```bash
npm run remotion:studio
```

---

## 差し替えのしかた

- **高品質音声に差し替える**：`outputs/audio/smartphone-info.m4a` を好きな音声（同名）に置き換えて `npm run video:render` を再実行するだけ。
- **ComfyUI ワークフローを差し替える**：`workflows/basic-text-to-image.json` を編集（node 構成・モデル名）。`generate-comfy-images.ts` は `%%PROMPT%% / %%NEGATIVE%% / %%SEED%% / %%WIDTH%% / %%HEIGHT%%` を置換して `/prompt` に投げます。生成画像は `outputs/images/smartphone-info/scene_0X.png` に保存され、`render` 時に `public/` へコピーされます。
- **台本を変える**：`generate-script.ts` の `FIXED_SCRIPT`、または `data/briefs/smartphone-info.json` を編集。

## 設計メモ

- Remotion は `public/` を `staticFile` で参照するため、`render` 時に `outputs/images` と `outputs/audio` を `public/` へコピーします。
- 中央の大きなテロップは各シーンの `caption`（= `subtitles.json` と同一テキスト・同一タイミング）を表示。二重字幕にならないよう1系統に統一しています。
- 最終シーン（scene_05）が CTA「まず10分。1つだけ残す。」を強調表示します。
- ブランド帯（下部）と進捗バー（上部）は全編固定で、テロップと重なりません。

## 未対応・今後

- 完全自動の連続量産（現状は「成功する1本」を優先）。
- ComfyUI 実モデルでの本番画像生成（既定はプレースホルダー）。
- BGM トラック、細かな字幕の逐語同期（現状はシーン単位）。
