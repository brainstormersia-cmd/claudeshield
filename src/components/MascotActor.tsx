'use client';

import React, { useState, useEffect } from 'react';
import { PixelImage } from './PixelImage';
import { PixelSparkles } from './PixelSparkles';

export type MascotPose = 'idle' | 'walking' | 'inspecting' | 'success';

interface MascotActorProps {
  pose?: MascotPose;
  size?: number;
  className?: string;
  speechBubble?: string;
  onClick?: () => void;
  showSparkles?: boolean;
}

export const MascotActor: React.FC<MascotActorProps> = ({
  pose = 'idle',
  size = 72,
  className = '',
  speechBubble,
  onClick,
  showSparkles = false,
}) => {
  const [walkFrame, setWalkFrame] = useState<1 | 2>(1);
  const [lensShine, setLensShine] = useState(false);

  // Walk cycle animation frame toggle (160ms)
  useEffect(() => {
    if (pose !== 'walking') return;

    const interval = setInterval(() => {
      setWalkFrame((prev) => (prev === 1 ? 2 : 1));
    }, 160);

    return () => clearInterval(interval);
  }, [pose]);

  // Subtle lens shine every 6s on idle
  useEffect(() => {
    if (pose !== 'idle') return;

    const interval = setInterval(() => {
      setLensShine(true);
      setTimeout(() => setLensShine(false), 800);
    }, 6000);

    return () => clearInterval(interval);
  }, [pose]);

  let src = '/assets/mascot-idle.png';
  let poseClass = '';

  if (pose === 'walking') {
    src = walkFrame === 1 ? '/assets/mascot-walk-1.png' : '/assets/mascot-walk-2.png';
    poseClass = 'animate-bounce-subtle';
  } else if (pose === 'inspecting') {
    src = '/assets/mascot-inspect.png';
    poseClass = 'transform rotate-2 scale-105';
  } else if (pose === 'success') {
    src = '/assets/mascot-success.png';
    poseClass = '-translate-y-2 scale-110';
  } else {
    src = '/assets/mascot-idle.png';
    poseClass = 'animate-idle-subtle';
  }

  const height = Math.round(size * 1.05);

  return (
    <div
      className={`relative inline-flex flex-col items-center justify-center transition-transform duration-200 ${className} ${
        onClick ? 'cursor-pointer hover:scale-105' : ''
      }`}
      onClick={onClick}
    >
      {/* Speech bubble if provided */}
      {speechBubble && (
        <div className="absolute -top-12 z-20 whitespace-nowrap rounded-md border border-[#2B323B] bg-[#151A20] px-3 py-1.5 text-xs font-mono font-medium text-[#F4F5F6] shadow-lg orange-glow-sm">
          <span>{speechBubble}</span>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 border-x-4 border-t-4 border-x-transparent border-t-[#151A20]" />
        </div>
      )}

      {/* Sparkles on success or when inspecting */}
      {(showSparkles || pose === 'success' || pose === 'inspecting') && (
        <PixelSparkles count={5} className="z-10" />
      )}

      {/* Lens shine sparkle overlay */}
      {lensShine && (
        <div className="absolute top-2 right-2 z-20 h-2 w-2 rounded-full bg-white opacity-90 shadow-[0_0_8px_#ffffff] animate-ping" />
      )}

      <div className={`relative transition-all duration-300 ${poseClass}`}>
        <PixelImage
          src={src}
          alt={`Claude Proxy Mascot (${pose})`}
          width={size}
          height={height}
          priority
        />
      </div>
    </div>
  );
};
