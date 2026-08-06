'use client';

import React, { useState, useEffect } from 'react';

interface ScrambleTextProps {
  text?: string;
  className?: string;
}

const GLYPHS = '01#@$%&*+?~!=<>XYZ░▒▓█';

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text = 'AgentRouter',
  className = '',
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);

  const handleScramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    const maxIterations = text.length * 4;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iteration / 4) {
              return text[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('')
      );

      iteration += 1;

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, 45);
  };

  // Run initial decode animation once on mount after short timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      let iteration = 0;
      const maxIterations = text.length * 4;

      const interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (index < iteration / 4) {
                return text[index];
              }
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            })
            .join('')
        );

        iteration += 1;

        if (iteration >= maxIterations) {
          clearInterval(interval);
          setDisplayText(text);
        }
      }, 45);
    }, 100);

    return () => clearTimeout(timer);
  }, [text]);

  return (
    <span
      onClick={handleScramble}
      onMouseEnter={handleScramble}
      className={`inline-block font-pixel select-none cursor-pointer hover:brightness-125 transition-all ${className}`}
      title="Click or hover to decode"
    >
      {displayText}
    </span>
  );
};
