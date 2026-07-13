// 共有ユーティリティ：パス解決・env・ログ・fs補助。
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'fs-extra';
import dotenv from 'dotenv';

// video-agent ルート（scripts/ の1つ上）
export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// .env があれば読み込む（無くてもデフォルトで動く）
const envPath = path.join(ROOT, '.env');
if (fs.existsSync(envPath)) dotenv.config({ path: envPath });

// 非対話シェルだと Homebrew の bin が PATH に無いことがあるため補う
// （ffmpeg / whisper / ollama 等をサブプロセスから確実に発見できるように）
{
  const extra = ['/opt/homebrew/bin', '/usr/local/bin', '/opt/local/bin'];
  const cur = (process.env.PATH ?? '').split(':');
  const merged = [...cur, ...extra.filter((d) => !cur.includes(d) && fs.existsSync(d))];
  process.env.PATH = merged.join(':');
}

export function env(key: string, fallback: string): string {
  const v = process.env[key];
  return v === undefined || v === '' ? fallback : v;
}
export function envBool(key: string, fallback: boolean): boolean {
  const v = process.env[key];
  if (v === undefined || v === '') return fallback;
  return /^(1|true|yes|on)$/i.test(v);
}
export function envNum(key: string, fallback: number): number {
  const v = process.env[key];
  const n = v ? Number(v) : NaN;
  return Number.isFinite(n) ? n : fallback;
}

export const SLUG = env('VIDEO_SLUG', 'smartphone-info');

// 主要パス
export const paths = {
  root: ROOT,
  brief: path.join(ROOT, 'data', 'briefs', `${SLUG}.json`),
  scriptJson: path.join(ROOT, 'data', 'scripts', `${SLUG}.script.json`),
  subtitlesJson: path.join(ROOT, 'data', 'subtitles', `${SLUG}.subtitles.json`),
  renderProps: path.join(ROOT, 'data', 'render-props.json'),
  imagesDir: path.join(ROOT, 'outputs', 'images', SLUG),
  audioAiff: path.join(ROOT, 'outputs', 'audio', `${SLUG}.aiff`),
  audioM4a: path.join(ROOT, 'outputs', 'audio', `${SLUG}.m4a`),
  audioDuration: path.join(ROOT, 'outputs', 'audio', `${SLUG}.duration.json`),
  srt: path.join(ROOT, 'outputs', 'subtitles', `${SLUG}.srt`),
  videoMp4: path.join(ROOT, 'outputs', 'videos', `${SLUG}.mp4`),
  logsDir: path.join(ROOT, 'outputs', 'logs'),
  runLog: path.join(ROOT, 'outputs', 'logs', 'run-one-video.log'),
  publicDir: path.join(ROOT, 'public'),
  workflow: path.join(ROOT, 'workflows', 'basic-text-to-image.json'),
  remotionEntry: path.join(ROOT, 'remotion', 'index.ts'),
};

export function ensureDirs() {
  for (const d of [
    path.join(ROOT, 'data', 'scripts'),
    path.join(ROOT, 'data', 'scenes'),
    path.join(ROOT, 'data', 'subtitles'),
    paths.imagesDir,
    path.join(ROOT, 'outputs', 'audio'),
    path.join(ROOT, 'outputs', 'subtitles'),
    path.join(ROOT, 'outputs', 'videos'),
    paths.logsDir,
    path.join(ROOT, 'public', 'images', SLUG),
    path.join(ROOT, 'public', 'audio'),
  ]) {
    fs.ensureDirSync(d);
  }
}

// タグ付きロガー（コンソール＋任意でログファイル追記）
export function makeLogger(tag: string) {
  const stamp = () => new Date().toISOString();
  const write = (level: string, msg: string) => {
    const line = `[${stamp()}] [${tag}] ${level} ${msg}`;
    console.log(line);
    try {
      fs.ensureDirSync(paths.logsDir);
      fs.appendFileSync(paths.runLog, line + '\n');
    } catch {
      /* ログファイル書き込み失敗は致命ではない */
    }
  };
  return {
    info: (m: string) => write('INFO', m),
    warn: (m: string) => write('WARN', m),
    error: (m: string) => write('ERROR', m),
    ok: (m: string) => write('OK ', m),
  };
}

// ===== タイムライン（音声実尺同期）ヘルパー =====
// 動画尺は「音声実尺に合わせる。ただし最低20秒・最大30秒」。
export const TIMELINE_MIN_SEC = 20;
export const TIMELINE_MAX_SEC = 30;

export function clampTimeline(sec: number): number {
  return Math.min(TIMELINE_MAX_SEC, Math.max(TIMELINE_MIN_SEC, sec));
}

function round3(n: number): number {
  return Math.round(n * 1000) / 1000;
}

// outputs/audio/<slug>.duration.json から音声実尺(sec)を読む（無ければ null）
export function readAudioDurationSec(): number | null {
  try {
    if (fs.existsSync(paths.audioDuration)) {
      const j = fs.readJsonSync(paths.audioDuration);
      const d = Number(j.durationSec);
      if (Number.isFinite(d) && d > 0) return d;
    }
  } catch {
    /* noop */
  }
  return null;
}

export type TimedScene = { startSec: number; durationSec: number; endSec: number };

// 元の scene 秒数の比率を保ったまま、合計を targetTotalSec に比例配分する。
export function scaleSceneTimings<T extends { id: string; durationSec: number }>(
  scenes: T[],
  targetTotalSec: number,
): Array<T & TimedScene> {
  const origTotal = scenes.reduce((a, s) => a + s.durationSec, 0) || 1;
  const factor = targetTotalSec / origTotal;
  let acc = 0;
  const out = scenes.map((s) => {
    const dur = s.durationSec * factor;
    const startSec = acc;
    acc += dur;
    return { ...s, startSec: round3(startSec), durationSec: round3(dur), endSec: round3(acc) };
  });
  // 端数調整：最後の endSec を target にそろえる
  if (out.length) {
    const last = out[out.length - 1];
    last.endSec = round3(targetTotalSec);
    last.durationSec = round3(last.endSec - last.startSec);
  }
  return out;
}

// キャンペーンコードなど、出力物に含めてはいけない文字列
export const FORBIDDEN_STRINGS = ['IQ121WF'];

// 検出しても、返すメッセージには禁止文字列そのものを含めない
// （ログ等の出力物に token が漏れ出さないようにするため）。
export function assertNoForbidden(text: string, where: string): string[] {
  const hits: string[] = [];
  for (const f of FORBIDDEN_STRINGS) {
    if (text.includes(f)) hits.push(`${where}: contains a forbidden campaign token`);
  }
  return hits;
}
