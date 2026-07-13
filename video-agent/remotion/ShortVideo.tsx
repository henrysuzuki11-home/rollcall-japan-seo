import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { Scene } from './components/Scene';
import { BrandFooter } from './components/BrandFooter';
import { ProgressBar } from './components/ProgressBar';

// ブランドカラー：深い緑・白・生成り
export const COLORS = {
  green: '#1f3d2f',
  greenMid: '#3c6b52',
  cream: '#f5f1e6',
  white: '#ffffff',
};
export const FONT_STACK =
  "'Hiragino Sans','Hiragino Kaku Gothic ProN','Noto Sans JP','YuGothic','Yu Gothic',sans-serif";

export type SceneInput = {
  id: string;
  startSec: number;
  durationSec: number;
  caption: string;
  image: string | null; // public/ からの相対パス（例: images/smartphone-info/scene_01.png）
  mood: string;
};

export type ShortVideoProps = {
  title: string;
  brand: string;
  cta: string;
  width: number;
  height: number;
  fps: number;
  durationInFrames: number;
  audioSrc: string | null; // public/ からの相対パス（例: audio/smartphone-info.m4a）
  scenes: SceneInput[];
};

// Studio / 単体レンダリング用のデフォルト（画像・音声が無くてもグラデーションで成立）
export const defaultProps: ShortVideoProps = {
  title: '大事な情報、スマホの中だけ？',
  brand: '親みまもり研究所',
  cta: 'まず10分。1つだけ残す。',
  width: 1080,
  height: 1920,
  fps: 30,
  durationInFrames: 600,
  audioSrc: null,
  scenes: [
    { id: 'scene_01', startSec: 0, durationSec: 4, caption: '大事な情報、スマホの中だけ？', image: null, mood: 'gentle warning' },
    { id: 'scene_02', startSec: 4, durationSec: 4, caption: '家族が困るのは、突然です', image: null, mood: 'quiet concern' },
    { id: 'scene_03', startSec: 8, durationSec: 3, caption: '連絡先。保険や口座。', image: null, mood: 'orderly' },
    { id: 'scene_04', startSec: 11, durationSec: 3, caption: '薬や持病。', image: null, mood: 'caring' },
    { id: 'scene_05', startSec: 14, durationSec: 6, caption: 'まず10分。1つだけ残す。', image: null, mood: 'hopeful' },
  ],
};

export const ShortVideo: React.FC<ShortVideoProps> = (props) => {
  const { scenes, fps, brand, audioSrc } = props;
  const lastIndex = scenes.length - 1;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.green, fontFamily: FONT_STACK }}>
      {audioSrc ? <Audio src={staticFile(audioSrc)} /> : null}

      {scenes.map((scene, i) => {
        const from = Math.round(scene.startSec * fps);
        const frames = Math.max(1, Math.round(scene.durationSec * fps));
        return (
          <Sequence key={scene.id} from={from} durationInFrames={frames} name={scene.id}>
            <Scene scene={scene} sceneFrames={frames} isCta={i === lastIndex} />
          </Sequence>
        );
      })}

      {/* 全編に固定表示：進捗バー（上）とブランド（下）。captionと重ならない配置。 */}
      <ProgressBar />
      <BrandFooter brand={brand} />
    </AbsoluteFill>
  );
};
