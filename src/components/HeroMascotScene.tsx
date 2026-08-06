'use client';

import React from 'react';
import { MascotSequenceAnimation } from './MascotSequenceAnimation';
import { PixelSparkles } from './PixelSparkles';

export const HeroMascotScene: React.FC = () => {
  return (
    <div className="relative w-full min-h-[440px] sm:min-h-[480px] lg:min-h-[520px] flex items-center justify-center overflow-hidden">
      {/* Ambient Background - subtle, no visible box */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft orbiting glows - low opacity, blurred */}
        <div className="absolute top-[10%] right-[8%] w-56 h-56 rounded-full bg-[#FF704D]/8 blur-3xl animate-orb-1" />
        <div className="absolute bottom-[10%] left-[5%] w-64 h-64 rounded-full bg-[#FF805D]/5 blur-3xl animate-orb-2" />
      </div>

      {/* Low-opacity Pixel Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* SVG Dotted Motion Path - animated dash */}
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
          className="animate-dash-flow"
        />
      </svg>

      {/* Sparse Pixel Sparkles */}
      <PixelSparkles count={5} className="z-10" />

      {/* Mascot Protagonist */}
      <div className="relative z-20 flex items-center justify-center">
        <MascotSequenceAnimation
          width={480}
          height={480}
          className="w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] lg:w-[480px] lg:h-[480px]"
        />
      </div>
    </div>
  );
};
