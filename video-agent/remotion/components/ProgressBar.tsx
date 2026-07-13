import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS } from '../ShortVideo';

// 画面上部の細い進捗バー。全体の経過を示す。
export const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const pct = Math.min(1, frame / Math.max(1, durationInFrames - 1));

  return (
    <div
      style={{
        position: 'absolute',
        top: 56,
        left: 56,
        right: 56,
        height: 8,
        borderRadius: 999,
        backgroundColor: 'rgba(245,241,230,0.25)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${pct * 100}%`,
          height: '100%',
          borderRadius: 999,
          backgroundColor: COLORS.cream,
        }}
      />
    </div>
  );
};
