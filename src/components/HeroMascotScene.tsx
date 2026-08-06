'use client';

import React from 'react';
import { MascotSequenceAnimation } from './MascotSequenceAnimation';
import { PixelSparkles } from './PixelSparkles';

export const HeroMascotScene: React.FC = () => {
  return (
    <div className="relative w-full min-h-[440px] sm:min-h-[480px] lg:min-h-[520px] flex items-center justify-center overflow-hidden">
      {/* Subtle Radial Orange Illumination Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,112,77,0.14)_0%,rgba(11,14,18,0)_70%)] pointer-events-none" />

      {/* Low-opacity Pixel Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* SVG Dotted Motion Path */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
        viewBox="0 0 560 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 40 380 Q 140 180 280 260 T 520 120"
          stroke="#FF704D"
          strokeWidth="2.5"
          strokeDasharray="5 7"
          strokeLinecap="round"
        />
      </svg>

      {/* Sparse Pixel Sparkles */}
      <PixelSparkles count={4} className="z-10" />

      {/* Mascot Protagonist (480px - 500px on desktop, 300px - 340px on mobile) */}
      <div className="relative z-20 flex items-center justify-center">
        <MascotSequenceAnimation
          width={480}
          height={480}
          className="w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] lg:w-[480px] lg:h-[480px]"
        />
      </div>

      {/* Callout Label 1: Top-Left */}
      <div className="absolute top-[10%] left-[2%] z-30 animate-float-label-1">
        <div className="inline-flex items-center gap-2 rounded-md border border-[#FF704D]/40 bg-[#11151A]/95 px-3 py-1.5 font-mono text-[11px] text-[#F4F5F6] shadow-lg backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-[#FF704D] animate-ping" />
          <span>Inspecting requests…</span>
        </div>
      </div>

      {/* Callout Label 2: Mid-Right */}
      <div className="absolute top-[30%] right-[1%] z-30 animate-float-label-2">
        <div className="inline-flex items-center gap-2 rounded-md border border-[#83D957]/40 bg-[#11151A]/95 px-3 py-1.5 font-mono text-[11px] text-[#83D957] shadow-lg backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-[#83D957]" />
          <span>Retry smartly</span>
        </div>
      </div>

      {/* Callout Label 3: Bottom-Center */}
      <div className="absolute bottom-[6%] left-[22%] z-30 animate-float-label-3">
        <div className="inline-flex items-center gap-2 rounded-md border border-[#2B323B] bg-[#11151A]/95 px-3 py-1.5 font-mono text-[11px] text-[#A5ADB7] shadow-lg backdrop-blur-sm">
          <span className="text-[#FF704D]">⚡</span>
          <span>Keep sessions alive</span>
        </div>
      </div>
    </div>
  );
};
