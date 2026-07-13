// 2. 画像生成：各シーンの visualPrompt を ComfyUI (/prompt) に投げる。
//    - workflow は ComfyUI API 形式（ノードキー "3","4"... / class_type + inputs）。
//    - .env の COMFYUI_* を workflow に反映（SDXL Turbo 想定）。
//    - /prompt が失敗したら HTTP ステータスに加えて response body（node_errors）をログ出力。
//    - ComfyUI 未接続 / 失敗時は sharp で 1080x1920 プレースホルダーにフォールバック。
//    - COMFY_ONLY=scene_01 で1シーンだけ生成テスト可能。
import fs from 'fs-extra';
import path from 'node:path';
import sharp from 'sharp';
import { paths, ensureDirs, env, envNum, makeLogger } from './_shared.js';

const log = makeLogger('images');

const CLIENT_ID = 'video-agent';

// 人物・顔・手を一切出さない方針（心霊写真化の防止）。背景素材として使う。
const NEGATIVE_DEFAULT =
  'people, person, human, face, hands, fingers, body, portrait, family, child, woman, man, ' +
  'extra fingers, distorted hands, bad hands, malformed hands, deformed face, creepy, ghost, horror, scary, uncanny, ' +
  'text, letters, logo, watermark, signature, unreadable text, low quality';

// 深緑→生成りのシーン別グラデーション（プレースホルダー用）
const PALETTE: Array<[string, string]> = [
  ['#1f3d2f', '#3c6b52'],
  ['#24463a', '#4a7a60'],
  ['#2b4a3b', '#587f63'],
  ['#33553f', '#6b8f6f'],
  ['#3c6b52', '#efe9d8'],
];

async function makePlaceholder(index: number, out: string) {
  const w = envNum('VIDEO_WIDTH', 1080);
  const h = envNum('VIDEO_HEIGHT', 1920);
  const [c1, c2] = PALETTE[index % PALETTE.length];
  const num = String(index + 1).padStart(2, '0');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="0.15" y2="1">
        <stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/>
      </linearGradient>
      <radialGradient id="v" cx="0.5" cy="0.42" r="0.75">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.10"/>
        <stop offset="1" stop-color="#000000" stop-opacity="0.22"/>
      </radialGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#g)"/>
    <rect width="${w}" height="${h}" fill="url(#v)"/>
    <circle cx="${w * 0.5}" cy="${h * 0.4}" r="${w * 0.34}" fill="#ffffff" opacity="0.05"/>
    <text x="${w - 60}" y="${h - 56}" font-family="Hiragino Sans, sans-serif" font-size="34"
      fill="#f5f1e6" opacity="0.45" text-anchor="end">scene ${num}</text>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(out);
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// /queue を取得（queue_running / queue_pending）
async function fetchQueue(
  base: string,
): Promise<{ queue_running: any[]; queue_pending: any[] } | null> {
  try {
    const r = await fetch(`${base}/queue`);
    if (!r.ok) return null;
    const j = (await r.json()) as any;
    return { queue_running: j.queue_running ?? [], queue_pending: j.queue_pending ?? [] };
  } catch {
    return null;
  }
}

// timeout 時に /queue と /history/{id} を保存（デバッグ用）
async function dumpTimeoutDebug(base: string, promptId: string) {
  const out = path.join(paths.logsDir, 'comfy-timeout-debug.json');
  const dbg: any = { promptId, savedAt: new Date().toISOString() };
  try {
    dbg.queue = await fetchQueue(base);
  } catch {
    dbg.queue = null;
  }
  try {
    const hr = await fetch(`${base}/history/${promptId}`);
    dbg.history = hr.ok ? await hr.json() : { error: `HTTP ${hr.status}` };
  } catch (e) {
    dbg.history = { error: (e as Error).message };
  }
  fs.ensureDirSync(paths.logsDir);
  fs.writeJsonSync(out, dbg, { spaces: 2 });
  log.warn(`timeout デバッグ情報を保存: ${out}`);
}

async function comfyReachable(base: string): Promise<boolean> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 2500);
  try {
    const r = await fetch(`${base}/system_stats`, { signal: ctrl.signal });
    return r.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(t);
  }
}

// 利用可能なチェックポイント一覧を取得
async function listCheckpoints(base: string): Promise<string[]> {
  try {
    const r = await fetch(`${base}/object_info/CheckpointLoaderSimple`);
    if (!r.ok) return [];
    const j = (await r.json()) as any;
    const list = j?.CheckpointLoaderSimple?.input?.required?.ckpt_name?.[0];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

// 希望のckptが無ければ、利用可能な先頭を使う。1つも無ければ null。
function resolveCkpt(desired: string, available: string[]): string | null {
  if (available.includes(desired)) return desired;
  if (available.length > 0) {
    log.warn(
      `checkpoint "${desired}" が見つかりません — 利用可能な "${available[0]}" を使用します（一覧: ${available.join(', ')}）`,
    );
    return available[0];
  }
  return null;
}

function buildWorkflow(positive: string, ckpt: string): any {
  const tpl = fs.readFileSync(paths.workflow, 'utf8');
  const negative = env('COMFYUI_NEGATIVE', NEGATIVE_DEFAULT);
  const seed = Math.floor(Math.random() * 1e15);
  const filled = tpl
    .replace('"%%POSITIVE%%"', JSON.stringify(positive))
    .replace('"%%NEGATIVE%%"', JSON.stringify(negative))
    .replace('"%%CKPT_NAME%%"', JSON.stringify(ckpt))
    .replace('"%%SAMPLER%%"', JSON.stringify(env('COMFYUI_SAMPLER', 'euler_ancestral')))
    .replace('"%%SCHEDULER%%"', JSON.stringify(env('COMFYUI_SCHEDULER', 'normal')))
    .replace('%%WIDTH%%', String(envNum('COMFYUI_WIDTH', 768)))
    .replace('%%HEIGHT%%', String(envNum('COMFYUI_HEIGHT', 1344)))
    .replace('%%STEPS%%', String(envNum('COMFYUI_STEPS', 4)))
    .replace('%%CFG%%', String(envNum('COMFYUI_CFG', 1.5)))
    .replace('%%SEED%%', String(seed));
  return JSON.parse(filled);
}

async function comfyGenerate(base: string, positive: string, ckpt: string, out: string): Promise<boolean> {
  try {
    const wf = buildWorkflow(positive, ckpt);
    const submit = await fetch(`${base}/prompt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: wf, client_id: CLIENT_ID }),
    });
    if (!submit.ok) {
      // ★ 失敗時は HTTP ステータスに加えて body（node_errors 等）を必ず出す
      const body = await submit.text().catch(() => '');
      log.error(`/prompt HTTP ${submit.status} — ComfyUI エラー詳細: ${body.slice(0, 800)}`);
      return false;
    }
    const { prompt_id } = (await submit.json()) as { prompt_id: string };

    // 履歴ポーリング（最大900秒＝15分：低速MacでのSDXL生成を考慮）。
    // 15秒ごとに進捗（elapsed / prompt_id / queue_running / queue_pending）を出力。
    const TIMEOUT_MS = 900_000;
    const POLL_MS = 3000;
    const startedAt = Date.now();
    let lastLoggedSec = -15;
    let image: { filename: string; subfolder: string; type: string } | null = null;

    while (Date.now() - startedAt < TIMEOUT_MS) {
      await sleep(POLL_MS);
      const elapsed = Math.round((Date.now() - startedAt) / 1000);

      if (elapsed - lastLoggedSec >= 15) {
        lastLoggedSec = elapsed;
        const q = await fetchQueue(base);
        const running = q ? q.queue_running.some((e: any[]) => e[1] === prompt_id) : false;
        const pending = q ? q.queue_pending.some((e: any[]) => e[1] === prompt_id) : false;
        log.info(
          `ComfyUI 待機中: elapsed=${elapsed}s prompt_id=${prompt_id} ` +
            `queue_running=${running}(計${q ? q.queue_running.length : '?'}) ` +
            `queue_pending=${pending}(計${q ? q.queue_pending.length : '?'})`,
        );
      }

      const hr = await fetch(`${base}/history/${prompt_id}`);
      if (!hr.ok) continue;
      const hist = (await hr.json()) as Record<string, any>;
      const entry = hist[prompt_id];
      if (!entry) continue;
      // 実行中に失敗した場合の status も拾う
      if (entry.status?.status_str === 'error') {
        log.error(`ComfyUI 実行エラー: ${JSON.stringify(entry.status).slice(0, 800)}`);
        return false;
      }
      const outputs = entry.outputs ?? {};
      for (const nodeId of Object.keys(outputs)) {
        const imgs = outputs[nodeId].images;
        if (imgs && imgs.length) {
          image = imgs[0];
          break;
        }
      }
      if (image) break;
    }
    if (!image) {
      // timeout 時のみ：/queue と /history/{id} を保存して placeholder フォールバック
      await dumpTimeoutDebug(base, prompt_id);
      log.error(`画像生成タイムアウト（${Math.round(TIMEOUT_MS / 1000)}s）— placeholder にフォールバック`);
      return false;
    }

    const url = `${base}/view?filename=${encodeURIComponent(image.filename)}&subfolder=${encodeURIComponent(
      image.subfolder,
    )}&type=${encodeURIComponent(image.type)}`;
    const ir = await fetch(url);
    if (!ir.ok) {
      log.error(`/view HTTP ${ir.status}`);
      return false;
    }
    const buf = Buffer.from(await ir.arrayBuffer());
    // 動画用に縦型へリサイズ（cover）
    await sharp(buf)
      .resize(envNum('VIDEO_WIDTH', 1080), envNum('VIDEO_HEIGHT', 1920), { fit: 'cover' })
      .png()
      .toFile(out);
    return true;
  } catch (e) {
    log.error(`ComfyUI 生成失敗（例外）: ${(e as Error).message}`);
    return false;
  }
}

export async function main() {
  ensureDirs();
  const script = fs.readJsonSync(paths.scriptJson);
  const base = env('COMFYUI_BASE_URL', 'http://127.0.0.1:8188');

  // テスト用：COMFY_ONLY=scene_01 なら該当シーンのみ処理
  const only = process.env.COMFY_ONLY?.trim();
  const scenes = only ? script.scenes.filter((s: any) => s.id === only) : script.scenes;
  if (only) log.info(`COMFY_ONLY=${only} — 1シーンのみ生成テストします`);

  const reachable = await comfyReachable(base);
  let ckpt: string | null = null;
  if (reachable) {
    log.info(`ComfyUI に接続しました（${base}）`);
    const available = await listCheckpoints(base);
    ckpt = resolveCkpt(env('COMFYUI_CKPT_NAME', 'sd_xl_turbo_1.0_fp16.safetensors'), available);
    if (!ckpt) {
      log.error(
        'ComfyUI にチェックポイントが1つもありません（ckpt list が空）。' +
          ' models/checkpoints にモデルを配置するか extra_model_paths を設定してください — 全シーン placeholder にします。',
      );
    } else {
      log.info(
        `使用 checkpoint: ${ckpt} / ${envNum('COMFYUI_WIDTH', 768)}x${envNum('COMFYUI_HEIGHT', 1344)} steps=${envNum(
          'COMFYUI_STEPS',
          4,
        )} cfg=${envNum('COMFYUI_CFG', 1.5)} ${env('COMFYUI_SAMPLER', 'euler_ancestral')}/${env('COMFYUI_SCHEDULER', 'normal')}`,
      );
    }
  } else {
    log.warn(`ComfyUI に接続できません（${base}）— 全シーンをプレースホルダーで生成`);
  }

  let usedComfy = 0;
  let usedPlaceholder = 0;

  for (let i = 0; i < scenes.length; i++) {
    const scene = scenes[i];
    // 元インデックス（パレット・番号用）
    const idx = script.scenes.findIndex((s: any) => s.id === scene.id);
    const out = path.join(paths.imagesDir, `${scene.id}.png`);
    let ok = false;
    if (reachable && ckpt) ok = await comfyGenerate(base, scene.visualPrompt, ckpt, out);
    if (ok) {
      usedComfy++;
      log.ok(`ComfyUI: ${scene.id}`);
    } else {
      await makePlaceholder(idx < 0 ? i : idx, out);
      usedPlaceholder++;
      log.info(`placeholder: ${scene.id}`);
    }
  }

  // COMFY_ONLY のときはモード集計を上書きしない
  if (!only) {
    const mode = usedComfy > 0 && usedPlaceholder === 0 ? 'comfyui' : usedComfy > 0 ? 'mixed' : 'placeholder';
    fs.writeJsonSync(path.join(paths.imagesDir, '_mode.json'), { mode, usedComfy, usedPlaceholder });
    log.ok(`画像モード: ${mode}（comfy=${usedComfy} / placeholder=${usedPlaceholder}）`);
  } else {
    log.ok(`テスト結果: comfy=${usedComfy} / placeholder=${usedPlaceholder}`);
  }
}

main().catch((e) => {
  log.error(String(e));
  process.exit(1);
});
