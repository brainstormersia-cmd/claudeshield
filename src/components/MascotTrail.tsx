'use client';

import React from 'react';

interface MascotTrailProps {
  className?: string;
}

export const MascotTrail: React.FC<MascotTrailProps> = ({ className = '' }) => {
  return (
    <svg
      className={`absolute inset-0 h-full w-full pointer-events-none ${className}`}
      viewBox="0 0 600 350"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M 50 180 C 120 100, 220 90, 310 160 C 400 230, 480 200, 540 120"
        stroke="#FF704D"
        strokeWidth="3"
        strokeDasharray="8 8"
        strokeLinecap="round"
        className="opacity-60"
        style={{
          filter: 'drop-shadow(0px 0px 4px rgba(255, 112, 77, 0.4))',
        }}
      />
      {/* Decorative arrow cues */}
      <polygon points="310,160 302,154 304,166" fill="#FF704D" opacity="0.8" />
      <polygon points="540,120 532,114 534,126" fill="#FF704D" opacity="0.8" />
    </svg>
  );
};
