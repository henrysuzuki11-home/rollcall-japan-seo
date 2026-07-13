// 3. 仮ナレーション：Mac の say で音声を作り、ffmpeg/afconvert で m4a 化。
//    - デフォルト音声は男性の Otoya。無ければ Kyoko / 他の日本語音声へフォールバック。
//    - 生成後に音声実尺を測り outputs/audio/<slug>.duration.json に保存（字幕・尺同期に使用）。
//    - Mac 以外 / say 無効 / 失敗時は WARNING を出して無音で継続。
import fs from 'fs-extra';
import os from 'node:os';
import { spawnSync } from 'node:child_process';
import { paths, ensureDirs, env, envBool, makeLogger, assertNoForbidden, SLUG } from './_shared.js';

const log = makeLogger('voiceover');

function hasCmd(cmd: string): boolean {
  const r = spawnSync('which', [cmd], { encoding: 'utf8' });
  return r.status === 0 && !!r.stdout.trim();
}

// say -v '?' から日本語(ja_JP)の音声名一覧を取得
function listJapaneseVoices(): string[] {
  const r = spawnSync('say', ['-v', '?'], { encoding: 'utf8' });
  if (r.status !== 0 || !r.stdout) return [];
  const voices: string[] = [];
  for (const line of r.stdout.split('\n')) {
    const loc = line.match(/[a-z]{2}_[A-Z]{2}/);
    if (!loc || loc[0] !== 'ja_JP') continue;
    const name = line.slice(0, loc.index).trim();
    if (name) voices.push(name);
  }
  return voices;
}

// 既知の日本語「男性」voice 優先リスト（標準声 → Sonoma のノベルティ男性声）
const MALE_JA_PREF = ['Otoya', 'Hattori', 'Grandpa', 'Rocko', 'Reed', 'Eddy'];

function matchVoice(jaVoices: string[], name: string): string | undefined {
  // "Grandpa (Japanese (Japan))" のような表記もあるため前方一致で拾う
  return jaVoices.find((v) => v === name || v.startsWith(name + ' ') || v.startsWith(name + '('));
}

// 希望voice → 日本語男性声 → Kyoko → 任意の日本語voice の順でフォールバック
function pickVoice(desired: string, jaVoices: string[]): string {
  const exact = matchVoice(jaVoices, desired);
  if (exact) return exact;

  // 男性声を探す
  for (const m of MALE_JA_PREF) {
    const hit = matchVoice(jaVoices, m);
    if (hit) {
      log.warn(
        `voice "${desired}" が未インストール — 日本語男性声 "${hit}" にフォールバックします。` +
          ` 高品質な男性声にするには Otoya / Hattori を追加してください（システム設定＞アクセシビリティ＞読み上げコンテンツ＞システムの声＞声を管理）`,
      );
      return hit;
    }
  }
  // 男性声が無ければ Kyoko（女性）へ
  const kyoko = matchVoice(jaVoices, 'Kyoko');
  if (kyoko) {
    log.warn(`日本語男性声が見つかりません — "${kyoko}"（女性）にフォールバックします`);
    return kyoko;
  }
  if (jaVoices[0]) {
    log.warn(`"${desired}" が使えません — "${jaVoices[0]}" にフォールバックします`);
    return jaVoices[0];
  }
  log.warn(`日本語音声が見つかりません — "${desired}" のまま試行します`);
  return desired;
}

function probeDurationSec(file: string): number | null {
  if (hasCmd('ffprobe')) {
    const r = spawnSync(
      'ffprobe',
      ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', file],
      { encoding: 'utf8' },
    );
    if (r.status === 0) {
      const d = Number(r.stdout.trim());
      if (Number.isFinite(d) && d > 0) return d;
    }
  }
  if (hasCmd('afinfo')) {
    const r = spawnSync('afinfo', [file], { encoding: 'utf8' });
    if (r.status === 0) {
      const m = r.stdout.match(/estimated duration:\s*([\d.]+)\s*sec/);
      if (m) return Number(m[1]);
    }
  }
  return null;
}

export async function main() {
  ensureDirs();
  const script = fs.readJsonSync(paths.scriptJson);
  const narration: string = script.scenes.map((s: any) => s.voiceover).join('\n');

  const hits = assertNoForbidden(narration, 'narration');
  if (hits.length) {
    log.error('ナレーションに禁止文字列 — 音声生成を中止');
    return;
  }

  fs.removeSync(paths.audioDuration);

  if (!envBool('ENABLE_MAC_SAY_VOICEOVER', true)) {
    log.warn('ENABLE_MAC_SAY_VOICEOVER=false — 音声生成をスキップ（無音で継続）');
    return;
  }
  if (os.platform() !== 'darwin' || !hasCmd('say')) {
    log.warn('Mac の say コマンドが使えません — 音声生成をスキップ（無音で継続）');
    return;
  }

  const desired = env('MAC_SAY_VOICE', 'Otoya');
  const jaVoices = listJapaneseVoices();
  if (jaVoices.length) log.info(`利用可能な日本語音声: ${jaVoices.join(', ')}`);
  const voice = pickVoice(desired, jaVoices);
  log.info(`使用 voice: ${voice}`);

  fs.removeSync(paths.audioAiff);
  fs.removeSync(paths.audioM4a);

  const say = spawnSync('say', ['-v', voice, '-o', paths.audioAiff, narration], { encoding: 'utf8' });
  if (say.status !== 0 || !fs.existsSync(paths.audioAiff)) {
    log.warn(`say 失敗（${say.stderr || 'unknown'}）— 無音で継続。日本語音声一覧: say -v '?'`);
    return;
  }
  log.ok(`AIFF: ${paths.audioAiff}`);

  // aiff → m4a（ffmpeg 優先、無ければ macOS 標準 afconvert）
  let produced = false;
  if (hasCmd('ffmpeg')) {
    const ff = spawnSync(
      'ffmpeg',
      ['-y', '-i', paths.audioAiff, '-c:a', 'aac', '-b:a', '192k', paths.audioM4a],
      { encoding: 'utf8' },
    );
    if (ff.status === 0 && fs.existsSync(paths.audioM4a)) {
      log.ok(`M4A (ffmpeg): ${paths.audioM4a}`);
      produced = true;
    } else {
      log.warn('ffmpeg 変換失敗 — afconvert を試します');
    }
  }
  if (!produced && hasCmd('afconvert')) {
    const ac = spawnSync(
      'afconvert',
      [paths.audioAiff, paths.audioM4a, '-f', 'm4af', '-d', 'aac', '-b', '192000'],
      { encoding: 'utf8' },
    );
    if (ac.status === 0 && fs.existsSync(paths.audioM4a)) {
      log.ok(`M4A (afconvert): ${paths.audioM4a}`);
      produced = true;
    } else {
      log.warn('afconvert 変換失敗');
    }
  }
  if (!produced) log.warn('m4a 変換不可 — Remotion は無音になる場合があります');

  // 音声実尺を測って duration.json に保存（m4a 優先、無ければ aiff）
  const target = produced ? paths.audioM4a : paths.audioAiff;
  const dur = probeDurationSec(target);
  if (dur) {
    const rel = produced ? `outputs/audio/${SLUG}.m4a` : `outputs/audio/${SLUG}.aiff`;
    fs.writeJsonSync(
      paths.audioDuration,
      { slug: SLUG, audioPath: rel, durationSec: Math.round(dur * 10) / 10, voice },
      { spaces: 2 },
    );
    log.ok(`音声実尺: ${dur.toFixed(1)}s → ${paths.audioDuration}`);
  } else {
    log.warn('音声実尺を取得できません（ffprobe/afinfo 無し）— 字幕は固定尺で生成されます');
  }
}

main().catch((e) => {
  log.error(String(e));
  process.exit(1);
});
