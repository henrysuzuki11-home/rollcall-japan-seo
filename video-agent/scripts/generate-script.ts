// 1. 台本生成：Ollama で 20 秒・5 シーンの台本 JSON を作る。
//    Ollama 未起動 / API 失敗 / JSON parse 失敗の場合は固定台本にフォールバック。
import fs from 'fs-extra';
import { z } from 'zod';
import { paths, ensureDirs, env, makeLogger, assertNoForbidden, SLUG } from './_shared.js';

const log = makeLogger('script');

const SceneSchema = z.object({
  id: z.string(),
  startSec: z.number(),
  durationSec: z.number(),
  caption: z.string(),
  voiceover: z.string(),
  visualPrompt: z.string(),
  mood: z.string(),
});
const ScriptSchema = z.object({
  slug: z.string(),
  title: z.string(),
  durationSec: z.number(),
  brand: z.string(),
  scenes: z.array(SceneSchema).min(1),
});
export type VideoScript = z.infer<typeof ScriptSchema>;

// ---- 固定台本（信頼できる真実。Ollama 成否に関わらずこれが基準） ----
const FIXED_SCRIPT: VideoScript = {
  slug: SLUG,
  title: '大事な情報、スマホの中だけ？',
  durationSec: 20,
  brand: '親みまもり研究所',
  scenes: [
    {
      id: 'scene_01',
      startSec: 0,
      durationSec: 4,
      caption: '大事な情報、スマホの中だけ？',
      voiceover: '大事な情報、スマホの中だけに残していませんか？',
      visualPrompt:
        'A quiet Japanese family home interior, wooden table near a window, smartphone placed on the table, notebook and small cup nearby, warm morning sunlight, calm and clean, lots of empty space in the center for captions, no people, no hands, no face, no text',
      mood: 'gentle warning',
    },
    {
      id: 'scene_02',
      startSec: 4,
      durationSec: 4,
      caption: '家族が困るのは、突然です',
      voiceover: 'もし自分に何かあった時、家族が最初に困るのは、意外と身近な情報です。',
      visualPrompt:
        'Japanese living room, neatly arranged family documents and envelopes on a low wooden table, soft natural light through shoji window, calm thoughtful mood, no people, no hands, no face, no text, empty center space for captions',
      mood: 'quiet concern',
    },
    {
      id: 'scene_03',
      startSec: 8,
      durationSec: 3,
      caption: '連絡先。保険や口座。',
      voiceover: '連絡先。保険や口座。',
      visualPrompt:
        'Notebook, smartphone, envelopes, insurance-like papers and bankbook-like abstract documents neatly arranged on a wooden desk, warm light, clean documentary style, no readable text, no people, no hands, no face',
      mood: 'orderly',
    },
    {
      id: 'scene_04',
      startSec: 11,
      durationSec: 3,
      caption: '薬や持病。',
      voiceover: '薬や持病。',
      visualPrompt:
        'Medicine notebook, pill case, calendar, small tray, and pen on a clean wooden desk, warm reassuring light, Japanese home atmosphere, no people, no hands, no face, no readable text',
      mood: 'caring',
    },
    {
      id: 'scene_05',
      startSec: 14,
      durationSec: 6,
      caption: 'まず10分。1つだけ残す。',
      voiceover:
        '全部を完璧に整理しなくていい。まず10分。誰に連絡してほしいかだけでも、残しておく。親みまもり研究所。',
      visualPrompt:
        'Family photo album closed on a table, notebook and pen beside it, gentle green and beige background, hopeful warm light, no visible people, no faces, no hands, no text, empty center space for captions',
      mood: 'hopeful',
    },
  ],
};

async function tryOllama(): Promise<VideoScript | null> {
  const base = env('OLLAMA_BASE_URL', 'http://localhost:11434');
  const model = env('OLLAMA_MODEL', 'llama3.1');
  const brief = fs.readJsonSync(paths.brief);
  const prompt = [
    'あなたは日本語のショート動画の構成作家です。',
    `ブランド「${brief.brand}」、テーマ「${brief.theme}」、トーン「${brief.tone}」。`,
    `キーメッセージ: ${brief.keyMessage}`,
    '20秒・5シーンの縦型動画台本を作ってください。',
    '各シーンは id, startSec, durationSec, caption(短い日本語テロップ), voiceover(ナレーション), visualPrompt(英語, 文字を含めない, 実在人物に似せない), mood を持ちます。',
    'durationSec の合計は必ず20にしてください。',
    '不安を煽りすぎず、やさしく。visualPrompt に文字（text/letters）を入れないでください。',
    '出力は JSON のみ。形式: {"slug","title","durationSec","brand","scenes":[...]}。',
  ].join('\n');

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 60_000);
  try {
    const res = await fetch(`${base}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, prompt, stream: false, format: 'json' }),
      signal: ctrl.signal,
    });
    if (!res.ok) {
      log.warn(`Ollama HTTP ${res.status} — フォールバックします`);
      return null;
    }
    const data = (await res.json()) as { response?: string };
    if (!data.response) return null;
    const parsed = ScriptSchema.parse(JSON.parse(data.response));
    // 安全策：slug/brand/durationSec を固定値で上書き
    parsed.slug = SLUG;
    parsed.brand = FIXED_SCRIPT.brand;
    parsed.durationSec = FIXED_SCRIPT.durationSec;
    log.ok(`Ollama (${model}) で台本を生成しました（${parsed.scenes.length}シーン）`);
    return parsed;
  } catch (e) {
    log.warn(`Ollama 失敗（${(e as Error).message}）— 固定台本にフォールバック`);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export async function main() {
  ensureDirs();
  let script = await tryOllama();
  if (!script) {
    script = FIXED_SCRIPT;
    log.info('固定台本を使用します');
  }

  // 禁止文字列チェック
  const hits = assertNoForbidden(JSON.stringify(script), 'script.json');
  if (hits.length) {
    log.error(`禁止文字列を検出したため固定台本に置換: ${hits.join(', ')}`);
    script = FIXED_SCRIPT;
  }

  fs.writeJsonSync(paths.scriptJson, script, { spaces: 2 });
  log.ok(`書き出し: ${paths.scriptJson}`);
  return script;
}

main().catch((e) => {
  log.error(String(e));
  process.exit(1);
});
