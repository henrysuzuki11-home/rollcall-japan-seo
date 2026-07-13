import React from 'react';
import { COLORS, FONT_STACK } from '../ShortVideo';

// 画面下部に固定表示するブランド名。テロップと重ならないよう最下部に配置。
export const BrandFooter: React.FC<{ brand: string }> = ({ brand }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 88,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '18px 40px',
          borderRadius: 999,
          backgroundColor: 'rgba(31,61,47,0.72)',
          border: `1px solid rgba(245,241,230,0.35)`,
          backdropFilter: 'blur(2px)',
        }}
      >
        <span
          style={{
            width: 16,
            height: 16,
            borderRadius: 999,
            backgroundColor: COLORS.cream,
            display: 'inline-block',
          }}
        />
        <span
          style={{
            fontFamily: FONT_STACK,
            fontWeight: 700,
            fontSize: 40,
            color: COLORS.cream,
            letterSpacing: 2,
          }}
        >
          {brand}
        </span>
      </div>
    </div>
  );
};
