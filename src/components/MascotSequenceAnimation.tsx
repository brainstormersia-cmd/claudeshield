'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PixelImage } from './PixelImage';

const FRAME_PATHS = Array.from({ length: 10 }, (_, i) => `/assets/anim-frame-${i + 1}.png`);

interface MascotSequenceAnimationProps {
  width?: number;
  height?: number;
  className?: string;
}

export const MascotSequenceAnimation: React.FC<MascotSequenceAnimationProps> = ({
  width = 440,
  height = 440,
  className = '',
}) => {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [showGlint, setShowGlint] = useState(false);

  // Lazy initializer to avoid setState in effect body
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  const isAnimatingRef = useRef(false);

  // Listen for reduced motion preference changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Preload all 10 images on mount
  useEffect(() => {
    FRAME_PATHS.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Intermittent natural blink logic
  useEffect(() => {
    if (reducedMotion) return;

    let timeoutId: NodeJS.Timeout;

    const playBlinkSequence = (onComplete: () => void) => {
      let frame = 0;
      const frameInterval = setInterval(() => {
        frame++;
        if (frame < 10) {
          setCurrentFrameIndex(frame);
        } else {
          clearInterval(frameInterval);
          setCurrentFrameIndex(0);
          onComplete();
        }
      }, 22); // ~200ms total blink duration
    };

    const scheduleNextBlink = () => {
      // Random resting duration between 3.5s and 6.5s
      const restDuration = 3500 + Math.random() * 3000;

      timeoutId = setTimeout(() => {
        if (isAnimatingRef.current) return;
        isAnimatingRef.current = true;

        playBlinkSequence(() => {
          // 15% probability of double blink
          if (Math.random() < 0.15) {
            setTimeout(() => {
              playBlinkSequence(() => {
                isAnimatingRef.current = false;
                scheduleNextBlink();
              });
            }, 80);
          } else {
            isAnimatingRef.current = false;
            scheduleNextBlink();
          }
        });
      }, restDuration);
    };

    scheduleNextBlink();

    return () => clearTimeout(timeoutId);
  }, [reducedMotion]);

  // Periodic magnifying glass glint (every 7 - 12 seconds)
  useEffect(() => {
    if (reducedMotion) return;

    let glintTimeout: NodeJS.Timeout;

    const scheduleGlint = () => {
      const delay = 7000 + Math.random() * 5000;
      glintTimeout = setTimeout(() => {
        setShowGlint(true);
        setTimeout(() => {
          setShowGlint(false);
          scheduleGlint();
        }, 280);
      }, delay);
    };

    scheduleGlint();
    return () => clearTimeout(glintTimeout);
  }, [reducedMotion]);

  return (
    <div
      className={`relative flex items-center justify-center select-none ${
        reducedMotion ? '' : 'animate-idle-bob'
      } ${className}`}
      style={{ width, height }}
    >
      {/* Normalized Frame Image */}
      <PixelImage
        src={FRAME_PATHS[currentFrameIndex]}
        alt="Claude Proxy Detective Mascot"
        width={width}
        height={height}
        priority
        className="w-full h-full object-contain pixelated"
      />

      {/* Magnifying Glass Glint Flash */}
      {showGlint && !reducedMotion && (
        <div
          aria-hidden="true"
          className="absolute top-[44%] right-[32%] w-4 h-4 bg-white/90 rounded-full blur-[1px] animate-ping pointer-events-none"
        />
      )}
    </div>
  );
};
