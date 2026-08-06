'use client';

import React from 'react';
import Image, { ImageProps } from 'next/image';

interface PixelImageProps extends Omit<ImageProps, 'style'> {
  className?: string;
  style?: React.CSSProperties;
}

export const PixelImage: React.FC<PixelImageProps> = ({
  className = '',
  style,
  alt,
  ...props
}) => {
  return (
    <Image
      alt={alt || ''}
      className={`pixel-art select-none ${className}`}
      style={{
        imageRendering: 'pixelated',
        WebkitFontSmoothing: 'none',
        ...style,
      }}
      unoptimized
      {...props}
    />
  );
};
