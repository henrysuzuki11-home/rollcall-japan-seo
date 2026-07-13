import React from 'react';
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { COLORS } from '../ShortVideo';
import { Caption } from './Caption';
import type { SceneInput } from '../ShortVideo';

// 1シーン：背景画像（無ければグラデーション）＋ 深緑オーバーレイ ＋ 中央テロップ。
export const Scene: React.FC<{ scene: SceneInput; sceneFrames: number; isCta?: boolean }> = ({
  scene,
  sceneFrames,
  isCta,
}) => {
  const frame = useCurrentFrame();
  const src = scene.image ? staticFile(scene.image) : null;

  // ゆっくりズーム（ケン・バーンズ）で静止画でも動きを出す
  const scale = interpolate(frame, [0, sceneFrames], [1.05, 1.13], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      {src ? (
        <AbsoluteFill style={{ overflow: 'hidden' }}>
          <Img
            src={src}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: `scale(${scale})`,
            }}
          />
        </AbsoluteFill>
      ) : (
        <AbsoluteFill
          style={{
            background: `linear-gradient(160deg, ${COLORS.green} 0%, ${COLORS.greenMid} 70%, ${COLORS.cream} 140%)`,
          }}
        />
      )}

      {/* 深緑オーバーレイ（テロップ可読性のため下部を濃く） */}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(31,61,47,0.42) 0%, rgba(31,61,47,0.30) 40%, rgba(31,61,47,0.62) 100%)',
        }}
      />

      <Caption text={scene.caption} isCta={isCta} />
    </AbsoluteFill>
  );
};
