'use client';

import React, { useMemo } from 'react';

const COLORS = ['#FF704D', '#FF805D', '#FFB347', '#83D957'];

export const PixelSparkles: React.FC<{ count?: number; className?: string }> = ({
  count = 5,
  className = '',
}) => {
  const sparkles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: `${15 + (i * 17) % 70}%`,
      left: `${10 + (i * 19) % 80}%`,
      size: `${4 + (i % 3) * 2}px`,
      color: COLORS[i % COLORS.length],
      delay: `${(i * 0.4).toFixed(1)}s`,
      duration: '2.5s',
    }));
  }, [count]);

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {sparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          className="absolute block animate-pulse pixelated"
          style={{
            top: sparkle.top,
            left: sparkle.left,
            width: sparkle.size,
            height: sparkle.size,
            backgroundColor: sparkle.color,
            boxShadow: `0 0 6px ${sparkle.color}`,
            animationDelay: sparkle.delay,
            animationDuration: sparkle.duration,
          }}
        />
      ))}
    </div>
  );
};
