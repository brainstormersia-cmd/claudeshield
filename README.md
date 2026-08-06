# Claude Proxy for AgentRouter — Web Application

Production-ready website and documentation for **Claude Proxy for AgentRouter**, built with Next.js App Router, React, TypeScript, Tailwind CSS, Framer Motion, and Recharts.

## Features

- 🕵️ **Original Pixel-Art Mascot Identity**: Custom animated pixel detective mascot with idle, walking, inspecting, and success sprite poses.
- ⚡ **10 Complete Routes**: Home, Features, How It Works, Retry Logic, Quickstart, Compatibility, Status, Docs, FAQ, and Download.
- 🔁 **Interactive Live Proxy Simulator**: Real-time simulation of 403 quota interception and 429 Retry-After conversion.
- 📊 **Observability & Status Telemetry**: Support for real telemetry API streams + clearly labeled demo mode.
- 📱 **Fully Responsive & Accessible**: WCAG AA compliant with keyboard accessibility, screen reader announcements, and reduced motion support (`prefers-reduced-motion`).

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS v4 + Vanilla CSS Variables
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React + Pixel Art SVGs

## Getting Started Locally

```bash
# 1. Clone or navigate to repo
cd "agentrouter claude proxy"

# 2. Install dependencies
npm install

# 3. Process image assets
node scripts/trim-assets.mjs

# 4. Start local development server
npm run dev
```

Visit `http://localhost:3000` to view the site.

## Building for Production

```bash
# Type check and build bundle
npm run build

# Start production server
npm start
```

## Running Tests

```bash
# Run Playwright E2E tests
npx playwright test
```

## License

MIT License — Independent open-source project. Not affiliated with Anthropic or AgentRouter.
