// 0. オーケストレーター：台本→画像→仮ナレ→字幕→動画→チェック を順に実行。
//    台本・レンダリング・チェックは fatal（失敗で停止）。
//    画像・音声・字幕は fallback で継続（1本を必ず出す方針）。
import fs from 'fs-extra';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { paths, ensureDirs, makeLogger, SLUG } from './_shared.js';

const log = makeLogger('run-one');

type Step = { name: string; file: string; fatal: boolean };

const STEPS: Step[] = [
  { name: '台本生成 (Ollama/fallback)', file: 'generate-script.ts', fatal: true },
  { name: '画像生成 (ComfyUI/placeholder)', file: 'generate-comfy-images.ts', fatal: false },
  { name: '仮ナレ生成 (say)', file: 'generate-voiceover.ts', fatal: false },
  { name: '字幕生成 (Whisper/fallback)', file: 'generate-subtitles.ts', fatal: false },
  { name: '動画レンダリング (Remotion/FFmpeg)', file: 'render-remotion.ts', fatal: true },
  { name: '出力チェック', file: 'check-output.ts', fatal: true },
];

function runStep(step: Step): boolean {
  const tsxBin = path.join(paths.root, 'node_modules', '.bin', 'tsx');
  const scriptPath = path.join(paths.root, 'scripts', step.file);
  const cmd = fs.existsSync(tsxBin) ? tsxBin : 'npx';
  const args = fs.existsSync(tsxBin) ? [scriptPath] : ['tsx', scriptPath];
  const r = spawnSync(cmd, args, { cwd: paths.root, stdio: 'inherit', encoding: 'utf8' });
  return r.status === 0;
}

async function main() {
  ensureDirs();
  // 実行ログを初期化
  fs.writeFileSync(paths.runLog, `# run-one-video ${new Date().toISOString()} slug=${SLUG}\n`);
  log.info(`=== ショート動画 1本生成 開始（slug=${SLUG}）===`);

  for (const step of STEPS) {
    log.info(`▶ ${step.name}`);
    const ok = runStep(step);
    if (ok) {
      log.ok(`✓ ${step.name}`);
    } else if (step.fatal) {
      log.error(`✗ ${step.name} が失敗（fatal）。中止します。`);
      process.exit(1);
    } else {
      log.warn(`△ ${step.name} が失敗しましたが fallback で継続します。`);
    }
  }

  log.ok('=== 完了 ===');
  log.info(`台本      : ${paths.scriptJson}`);
  log.info(`画像      : ${paths.imagesDir}/`);
  log.info(`音声      : ${paths.audioM4a}（無い場合は無音）`);
  log.info(`字幕(SRT) : ${paths.srt}`);
  log.info(`字幕(JSON): ${paths.subtitlesJson}`);
  log.info(`動画(MP4) : ${paths.videoMp4}`);
  log.info(`ログ      : ${paths.runLog}`);
}

main().catch((e) => {
  log.error(String(e));
  process.exit(1);
});
