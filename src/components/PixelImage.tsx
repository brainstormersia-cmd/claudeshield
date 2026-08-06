'use client';

import React from 'react';
import Image, { ImageProps } from 'next/image';

interface PixelImageProps extends Omit<ImageProps, 'style'> {
  className?: string;
  style?: React.CSSProperties;
}

// On GitHub Pages the site is served from a subpath (/claudeshield/).
// Next.js basePath handles routing but NOT manual asset paths in src="...".
// This helper injects the basePath prefix for /assets/ references.
function fixAssetPath(src: unknown): unknown {
  if (typeof src !== 'string') return src;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  if (src.startsWith('/assets/') && basePath && !src.startsWith(basePath)) {
    return `${basePath}${src}`;
  }
  return src;
}

export const PixelImage: React.FC<PixelImageProps> = ({
  className = '',
  style,
  alt,
  src,
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
      src={(fixAssetPath(src) as string) ?? src}
      {...props}
    />
  );
};
