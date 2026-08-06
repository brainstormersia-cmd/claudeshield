import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0B0E12',
          elevated: '#11151A',
          card: '#151A20',
          cardSecondary: '#191F26',
          border: '#2B323B',
          orange: '#FF704D',
          brightOrange: '#FF805D',
          darkOrange: '#C9472D',
          main: '#F4F5F6',
          secondary: '#A5ADB7',
          muted: '#747D88',
          success: '#83D957',
          warning: '#FFB347',
          error: '#EF6258',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        pixel: ['var(--font-pixel)', 'cursive', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
