// 6. 出力チェック：必須ファイルの存在確認と、禁止文字列（IQ121WF）の混入チェック。
import fs from 'fs-extra';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { paths, makeLogger, FORBIDDEN_STRINGS, readAudioDurationSec } from './_shared.js';

const log = makeLogger('check');

function mp4DurationSec(file: string): number | null {
  const which = spawnSync('which', ['ffprobe'], { encoding: 'utf8' });
  if (which.status !== 0) return null;
  const r = spawnSync(
    'ffprobe',
    ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', file],
    { encoding: 'utf8' },
  );
  if (r.status === 0) {
    const d = Number(r.stdout.trim());
    if (Number.isFinite(d) && d > 0) return d;
  }
  return null;
}

function scanDirForForbidden(dir: string): string[] {
  const hits: string[] = [];
  if (!fs.existsSync(dir)) return hits;
  const walk = (d: string) => {
    for (const name of fs.readdirSync(d)) {
      const p = path.join(d, name);
      const st = fs.statSync(p);
      if (st.isDirectory()) {
        walk(p);
      } else if (/\.(json|srt|txt|log|vtt|ass)$/i.test(name)) {
        const text = fs.readFileSync(p, 'utf8');
        // token 自体はメッセージに含めない（ログへ漏らさない）
        for (const f of FORBIDDEN_STRINGS) if (text.includes(f)) hits.push(`${p}: forbidden campaign token`);
      }
    }
  };
  walk(dir);
  return hits;
}

export async function main() {
  let failed = false;

  // 必須／任意ファイル
  const required: Array<[string, string]> = [
    [paths.videoMp4, 'MP4 動画'],
    [paths.srt, 'SRT 字幕'],
    [paths.scriptJson, '台本 JSON'],
  ];
  for (const [f, label] of required) {
    if (fs.existsSync(f)) log.ok(`${label}: ${f}`);
    else {
      log.error(`${label} が見つかりません: ${f}`);
      failed = true;
    }
  }

  // 音声は任意（無ければ WARNING）
  if (fs.existsSync(paths.audioM4a)) log.ok(`音声(m4a): ${paths.audioM4a}`);
  else if (fs.existsSync(paths.audioAiff)) log.warn(`m4a は無いが aiff あり: ${paths.audioAiff}（動画は無音の可能性）`);
  else log.warn('音声ファイルが見つかりません（無音動画として生成されています）');

  // 尺の確認：MP4 実尺 と 音声実尺 を表示し、ズレが大きければ WARNING
  const audioDur = readAudioDurationSec();
  const vdur = fs.existsSync(paths.videoMp4) ? mp4DurationSec(paths.videoMp4) : null;
  log.info(`MP4 実尺: ${vdur !== null ? vdur.toFixed(1) + 's' : '不明(ffprobe無し)'}`);
  log.info(`音声実尺: ${audioDur !== null ? audioDur.toFixed(1) + 's' : 'なし'}`);
  if (vdur !== null && audioDur !== null) {
    const drift = Math.abs(vdur - audioDur);
    // 音声が30秒超で動画をクランプした場合は差が出るのが正常
    if (drift > 1.0 && audioDur <= 30.5) {
      log.warn(`字幕/音声のドリフト可能性: MP4 と音声の尺差が ${drift.toFixed(1)}s あります`);
    } else {
      log.ok(`尺同期 OK（MP4 と音声の差 ${drift.toFixed(1)}s）`);
    }
  }

  // 禁止文字列スキャン
  const scanDirs = [
    path.join(paths.root, 'data', 'scripts'),
    path.join(paths.root, 'data', 'subtitles'),
    path.join(paths.root, 'outputs', 'subtitles'),
    path.join(paths.root, 'outputs', 'logs'),
    path.join(paths.root, 'data', 'briefs'),
  ];
  let forbidden: string[] = [];
  for (const d of scanDirs) forbidden = forbidden.concat(scanDirForForbidden(d));
  // 動画ファイル名にも含まれないこと
  for (const f of FORBIDDEN_STRINGS) if (paths.videoMp4.includes(f)) forbidden.push(`video filename: "${f}"`);

  if (forbidden.length) {
    log.error(`禁止キャンペーンコードを検出: ${forbidden.join(' / ')}`);
    failed = true;
  } else {
    log.ok('禁止キャンペーンコードは出力物に含まれていません');
  }

  if (failed) {
    log.error('チェック失敗');
    process.exit(1);
  }
  log.ok(`DONE: ${paths.videoMp4}`);
}

main().catch((e) => {
  log.error(String(e));
  process.exit(1);
});
