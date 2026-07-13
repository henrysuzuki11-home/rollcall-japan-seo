// 5. 動画レンダリング：Remotion で MP4 を書き出す。
//    Remotion が失敗しても、FFmpeg のスライドショーで必ず MP4 を出す（必ず1本出す方針）。
import fs from 'fs-extra';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import {
  paths,
  ensureDirs,
  envNum,
  makeLogger,
  SLUG,
  readAudioDurationSec,
  clampTimeline,
  scaleSceneTimings,
} from './_shared.js';

const log = makeLogger('render');

function hasCmd(cmd: string): boolean {
  const r = spawnSync('which', [cmd], { encoding: 'utf8' });
  return r.status === 0 && !!r.stdout.trim();
}

function buildProps() {
  const script = fs.readJsonSync(paths.scriptJson);
  const fps = envNum('VIDEO_FPS', 30);
  const width = envNum('VIDEO_WIDTH', 1080);
  const height = envNum('VIDEO_HEIGHT', 1920);

  // 動画尺は音声実尺に合わせる（最低20・最大30秒）。無ければ台本/env の固定尺。
  const audioDur = readAudioDurationSec();
  const baseDur = envNum('VIDEO_DURATION_SEC', script.durationSec ?? 20);
  const timelineTotal = clampTimeline(audioDur ?? baseDur);

  // シーン表示タイミングは subtitles.json（音声実尺ベース）を最優先。
  // 無ければ台本比率を timelineTotal に配分。
  const byId: Record<string, any> = Object.fromEntries(script.scenes.map((s: any) => [s.id, s]));
  let timings: Array<{ id: string; startSec: number; durationSec: number; caption: string }> = [];
  if (fs.existsSync(paths.subtitlesJson)) {
    const subs = fs.readJsonSync(paths.subtitlesJson).subtitles as Array<{
      id: string;
      startSec: number;
      endSec: number;
      text: string;
    }>;
    timings = subs.map((x) => ({
      id: x.id,
      startSec: x.startSec,
      durationSec: Math.round((x.endSec - x.startSec) * 1000) / 1000,
      caption: x.text,
    }));
  } else {
    timings = scaleSceneTimings(
      script.scenes.map((s: any) => ({ id: s.id, durationSec: s.durationSec, caption: s.caption })),
      timelineTotal,
    ).map((s) => ({ id: s.id, startSec: s.startSec, durationSec: s.durationSec, caption: s.caption }));
  }

  // 画像・音声を public/ にコピー（Remotion は public/ を staticFile で参照する）
  const pubImgDir = path.join(paths.publicDir, 'images', SLUG);
  fs.ensureDirSync(pubImgDir);
  fs.ensureDirSync(path.join(paths.publicDir, 'audio'));

  const scenes = timings.map((t) => {
    const srcPng = path.join(paths.imagesDir, `${t.id}.png`);
    let rel: string | null = null;
    if (fs.existsSync(srcPng)) {
      fs.copySync(srcPng, path.join(pubImgDir, `${t.id}.png`));
      rel = `images/${SLUG}/${t.id}.png`;
    }
    return {
      id: t.id,
      startSec: t.startSec,
      durationSec: t.durationSec,
      caption: t.caption,
      image: rel,
      mood: byId[t.id]?.mood ?? '',
    };
  });

  // 動画尺は最後のシーンの終端（= timelineTotal）に合わせる
  const lastEnd = scenes.length ? scenes[scenes.length - 1].startSec + scenes[scenes.length - 1].durationSec : timelineTotal;
  const videoDurationSec = Math.max(timelineTotal, lastEnd);

  let audioSrc: string | null = null;
  if (fs.existsSync(paths.audioM4a)) {
    fs.copySync(paths.audioM4a, path.join(paths.publicDir, 'audio', `${SLUG}.m4a`));
    audioSrc = `audio/${SLUG}.m4a`;
  }

  const props = {
    title: script.title,
    brand: script.brand,
    cta: 'まず10分。1つだけ残す。',
    width,
    height,
    fps,
    durationInFrames: Math.round(videoDurationSec * fps),
    audioSrc,
    scenes,
  };
  fs.writeJsonSync(paths.renderProps, props, { spaces: 2 });
  log.info(
    `尺: 動画 ${videoDurationSec.toFixed(1)}s / 音声 ${audioDur ? audioDur.toFixed(1) + 's' : 'なし'} / fps ${fps}`,
  );
  return props;
}

function tryRemotion(): boolean {
  const bin = path.join(paths.root, 'node_modules', '.bin', 'remotion');
  const remotionBin = fs.existsSync(bin) ? bin : 'npx';
  const args = fs.existsSync(bin)
    ? ['render', paths.remotionEntry, 'ShortVideo', paths.videoMp4]
    : ['remotion', 'render', paths.remotionEntry, 'ShortVideo', paths.videoMp4];
  args.push(`--props=${paths.renderProps}`, '--public-dir=./public', '--codec=h264', '--overwrite', '--log=info');

  log.info(`Remotion レンダリング: ${remotionBin} ${args.join(' ')}`);
  const r = spawnSync(remotionBin, args, { cwd: paths.root, stdio: 'inherit', encoding: 'utf8' });
  const ok = r.status === 0 && fs.existsSync(paths.videoMp4) && fs.statSync(paths.videoMp4).size > 0;
  if (!ok) log.warn('Remotion レンダリング失敗 — FFmpeg フォールバックへ');
  else log.ok('Remotion で MP4 を書き出しました');
  return ok;
}

// Remotion が使えない場合の保険：画像＋音声を FFmpeg でスライドショー化（テロップ無し）
function ffmpegFallback(props: ReturnType<typeof buildProps>): boolean {
  if (!hasCmd('ffmpeg')) {
    log.error('ffmpeg も見つかりません。MP4 を生成できませんでした。');
    return false;
  }
  const fps = props.fps;
  const w = props.width;
  const h = props.height;
  const list = path.join(paths.logsDir, `${SLUG}.concat.txt`);
  const lines: string[] = ['ffconcat version 1.0'];
  const scenesWithImg = props.scenes.filter((s) => s.image);
  if (scenesWithImg.length === 0) {
    log.error('画像が1枚も無いため FFmpeg フォールバックも実行できません。');
    return false;
  }
  for (const s of props.scenes) {
    const png = path.join(paths.publicDir, s.image ?? '');
    const use = s.image && fs.existsSync(png) ? png : path.join(paths.publicDir, scenesWithImg[0].image!);
    lines.push(`file '${use.replace(/'/g, "'\\''")}'`);
    lines.push(`duration ${s.durationSec}`);
  }
  // concat demuxer は最後のファイルをもう一度書くと duration が反映される
  const lastImg = props.scenes[props.scenes.length - 1];
  const lastPng = lastImg.image
    ? path.join(paths.publicDir, lastImg.image)
    : path.join(paths.publicDir, scenesWithImg[0].image!);
  lines.push(`file '${lastPng.replace(/'/g, "'\\''")}'`);
  fs.writeFileSync(list, lines.join('\n'), 'utf8');

  const args = ['-y', '-f', 'concat', '-safe', '0', '-i', list];
  const hasAudio = !!props.audioSrc && fs.existsSync(path.join(paths.publicDir, props.audioSrc));
  if (hasAudio) args.push('-i', path.join(paths.publicDir, props.audioSrc!));
  args.push(
    '-vf',
    `scale=${w}:${h}:force_original_aspect_ratio=increase,crop=${w}:${h},format=yuv420p`,
    '-r',
    String(fps),
    '-c:v',
    'libx264',
    '-pix_fmt',
    'yuv420p',
  );
  if (hasAudio) args.push('-c:a', 'aac', '-b:a', '192k', '-shortest');
  args.push('-movflags', '+faststart', paths.videoMp4);

  log.info('FFmpeg スライドショーで MP4 を生成中（テロップ無しの保険出力）…');
  const r = spawnSync('ffmpeg', args, { encoding: 'utf8' });
  const ok = r.status === 0 && fs.existsSync(paths.videoMp4) && fs.statSync(paths.videoMp4).size > 0;
  if (!ok) log.error(`FFmpeg フォールバック失敗: ${r.stderr?.slice(-500) ?? ''}`);
  else log.ok('FFmpeg で MP4 を書き出しました（保険出力）');
  return ok;
}

function report() {
  if (!fs.existsSync(paths.videoMp4)) return;
  const bytes = fs.statSync(paths.videoMp4).size;
  const mb = (bytes / 1024 / 1024).toFixed(2);
  let dur = '不明';
  if (hasCmd('ffprobe')) {
    const r = spawnSync(
      'ffprobe',
      ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', paths.videoMp4],
      { encoding: 'utf8' },
    );
    if (r.status === 0) dur = `${Number(r.stdout.trim()).toFixed(1)}s`;
  }
  log.ok(`MP4: ${paths.videoMp4}（${mb} MB, 長さ ${dur}）`);
}

export async function main() {
  ensureDirs();
  const props = buildProps();
  fs.removeSync(paths.videoMp4);

  let ok = tryRemotion();
  let mode = 'remotion';
  if (!ok) {
    ok = ffmpegFallback(props);
    mode = 'ffmpeg-fallback';
  }
  fs.writeJsonSync(path.join(paths.logsDir, `${SLUG}.render-mode.json`), { mode, ok });

  if (!ok) {
    log.error('MP4 の生成に失敗しました。');
    process.exit(1);
  }
  report();
  log.ok(`レンダリングモード: ${mode}`);
}

main().catch((e) => {
  log.error(String(e));
  process.exit(1);
});
