// 4. 字幕生成：音声があり Whisper が使えれば Whisper で SRT を作る。
//    使えない/失敗時は台本 JSON から SRT を生成。
//    Remotion 用の subtitles.json は常に台本のタイミングから生成（シーンと厳密に整合）。
import fs from 'fs-extra';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import {
  paths,
  ensureDirs,
  envBool,
  envNum,
  makeLogger,
  SLUG,
  assertNoForbidden,
  readAudioDurationSec,
  clampTimeline,
  scaleSceneTimings,
} from './_shared.js';

const log = makeLogger('subtitles');

function hasCmd(cmd: string): boolean {
  const r = spawnSync('which', [cmd], { encoding: 'utf8' });
  return r.status === 0 && !!r.stdout.trim();
}

function fmtTime(sec: number): string {
  const ms = Math.round((sec - Math.floor(sec)) * 1000);
  const s = Math.floor(sec) % 60;
  const m = Math.floor(sec / 60) % 60;
  const h = Math.floor(sec / 3600);
  const p = (n: number, l = 2) => String(n).padStart(l, '0');
  return `${p(h)}:${p(m)}:${p(s)},${p(ms, 3)}`;
}

function srtFromTimed(items: Array<{ startSec: number; endSec: number; text: string }>): string {
  return items
    .map((s, i) => `${i + 1}\n${fmtTime(s.startSec)} --> ${fmtTime(s.endSec)}\n${s.text}\n`)
    .join('\n');
}

function tryWhisper(): boolean {
  if (!envBool('ENABLE_WHISPER_SUBTITLES', true)) {
    log.info('ENABLE_WHISPER_SUBTITLES=false — Whisper をスキップ');
    return false;
  }
  if (!fs.existsSync(paths.audioM4a)) {
    log.info('音声（m4a）が無いため Whisper をスキップ');
    return false;
  }
  if (!hasCmd('whisper')) {
    log.info('whisper コマンドが見つからないためスキップ');
    return false;
  }
  const outDir = path.dirname(paths.srt);
  log.info('Whisper で字幕生成中…');
  const r = spawnSync(
    'whisper',
    [paths.audioM4a, '--language', 'Japanese', '--output_format', 'srt', '--output_dir', outDir],
    { encoding: 'utf8' },
  );
  // whisper は <basename>.srt を outDir に出力する
  const produced = path.join(outDir, `${SLUG}.srt`);
  if (r.status === 0 && fs.existsSync(produced)) {
    log.ok('Whisper で SRT を生成しました');
    return true;
  }
  log.warn('Whisper 失敗 — 台本フォールバックに切替');
  return false;
}

export async function main() {
  ensureDirs();
  const script = fs.readJsonSync(paths.scriptJson);

  // 音声実尺があれば、それに合わせてタイムラインを再計算（最低20・最大30秒）。
  // 無ければ台本の durationSec（20秒）を使用。
  const audioDur = readAudioDurationSec();
  const baseDur = envNum('VIDEO_DURATION_SEC', script.durationSec ?? 20);
  const timelineTotal = clampTimeline(audioDur ?? baseDur);
  const recalculated = audioDur !== null;
  if (recalculated) {
    log.info(`音声実尺 ${audioDur!.toFixed(1)}s を検出 — 字幕タイミングを比例配分で再計算（動画尺 ${timelineTotal.toFixed(1)}s）`);
  } else {
    log.info(`音声実尺なし — 台本の固定尺 ${timelineTotal.toFixed(1)}s を使用`);
  }

  // 元 scene 比率を保ったまま timelineTotal に配分（Remotion のシーン表示もこれに従う）
  const timed = scaleSceneTimings(
    script.scenes.map((s: any) => ({ id: s.id, durationSec: s.durationSec, caption: s.caption })),
    timelineTotal,
  );

  // Remotion 用 subtitles.json（再計算後のタイミング）
  const subtitles = timed.map((s) => ({
    id: s.id,
    startSec: s.startSec,
    endSec: s.endSec,
    text: s.caption,
  }));
  fs.writeJsonSync(
    paths.subtitlesJson,
    { slug: SLUG, durationSec: timelineTotal, basedOnAudio: recalculated, audioDurationSec: audioDur, subtitles },
    { spaces: 2 },
  );
  log.ok(`subtitles.json: ${paths.subtitlesJson}`);

  // SRT：Whisper 優先 → ダメなら再計算タイミングで生成
  let source = recalculated ? 'audio-proportional' : 'script-fixed';
  if (tryWhisper()) {
    source = 'whisper';
  } else {
    fs.writeFileSync(paths.srt, srtFromTimed(subtitles), 'utf8');
    log.ok(`${source} で SRT を生成: ${paths.srt}`);
  }

  // 禁止文字列チェック（SRT）
  const srtText = fs.readFileSync(paths.srt, 'utf8');
  const hits = assertNoForbidden(srtText, 'srt');
  if (hits.length) log.error(`SRT に禁止文字列: ${hits.join(', ')}`);

  fs.writeJsonSync(path.join(path.dirname(paths.subtitlesJson), `${SLUG}.subtitle-source.json`), {
    source,
  });
  log.ok(`字幕ソース: ${source}`);
}

main().catch((e) => {
  log.error(String(e));
  process.exit(1);
});
