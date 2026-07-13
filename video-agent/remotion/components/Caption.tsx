import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONT_STACK } from '../ShortVideo';

// 中央に表示する大きな日本語テロップ。フェード＋わずかな上昇でSNSでも視認しやすく。
export const Caption: React.FC<{ text: string; isCta?: boolean }> = ({ text, isCta }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 200 }, durationInFrames: Math.round(fps * 0.6) });
  const opacity = interpolate(enter, [0, 1], [0, 1]);
  const translateY = interpolate(enter, [0, 1], [24, 0]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 96px',
      }}
    >
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
          textAlign: 'center',
          fontFamily: FONT_STACK,
          fontWeight: 800,
          color: COLORS.white,
          fontSize: isCta ? 104 : 84,
          lineHeight: 1.45,
          letterSpacing: 0.5,
          textShadow: '0 6px 28px rgba(0,0,0,0.45)',
          maxWidth: '86%',
        }}
      >
        {text}
        {isCta ? (
          <div
            style={{
              marginTop: 40,
              height: 8,
              width: 132,
              marginLeft: 'auto',
              marginRight: 'auto',
              borderRadius: 999,
              backgroundColor: COLORS.cream,
              opacity: 0.9,
            }}
          />
        ) : null}
      </div>
    </div>
  );
};
