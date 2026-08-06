'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PixelImage } from '@/components/PixelImage';
import { HeroMascotScene } from '@/components/HeroMascotScene';
import { ScrambleText } from '@/components/ScrambleText';
import { ArrowRight, BookOpen, Heart, Shield, RefreshCw, Cpu, Code2, Copy, Check } from 'lucide-react';
import { siteContent } from '@/content/site';
import { InstallCommand } from '@/components/InstallCommand';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'cURL' | 'JavaScript' | 'Python'>('cURL');
  const [codeCopied, setCodeCopied] = useState(false);

  const codeSnippets = {
    cURL: `curl http://127.0.0.1:8787/v1/messages \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "YOUR_MODEL_NAME",
    "max_tokens": 1024,
    "messages": [{"role": "user", "content": "Hello!"}]
  }'`,
    JavaScript: `import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  baseURL: 'http://127.0.0.1:8787',
  apiKey: 'YOUR_API_KEY' // Processed locally by proxy
});

const res = await anthropic.messages.create({
  model: 'YOUR_MODEL_NAME',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Hello!' }]
});`,
    Python: `import anthropic

client = anthropic.Anthropic(
    base_url="http://127.0.0.1:8787",
    api_key="YOUR_API_KEY"
)

message = client.messages.create(
    model="YOUR_MODEL_NAME",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello!"}]
)`
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 1800);
  };

  return (
    <div className="space-y-8 sm:space-y-10 py-2 sm:py-4">
      {/* 1. HERO SECTION (Widescreen 1600px, 52% Left / 48% Right, Prominent Typography) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[480px] lg:min-h-[520px]">
        {/* Left Column (52%) */}
        <div className="space-y-5 lg:col-span-7">
          {/* Main Headline */}
          <h1 className="tracking-tight text-[#F4F5F6] leading-[1.1]">
            <span className="block font-bold text-5xl sm:text-6xl lg:text-7xl">
              Claude Proxy
            </span>
            <span className="block font-pixel font-bold text-4xl sm:text-5xl lg:text-[58px] text-[#FF704D] mt-1 drop-shadow-[0_0_24px_rgba(255,112,77,0.4)]">
              for <ScrambleText text="AgentRouter" />
            </span>
          </h1>

          {/* Subhead Paragraph */}
          <p className="text-base sm:text-lg lg:text-[19px] text-[#A5ADB7] leading-[1.6] max-w-2xl">
            {siteContent.hero.subhead}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <Link
              href="/quickstart"
              className="inline-flex items-center gap-2.5 rounded-xl bg-[#FF704D] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#FF805D] transition-all shadow-lg orange-glow-sm hover:scale-105"
            >
              <Heart className="h-4 w-4 fill-white text-white" />
              <span>{siteContent.hero.primaryCta}</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2.5 rounded-xl border border-[#2B323B] bg-[#151A20] px-6 py-3.5 text-sm font-semibold text-[#F4F5F6] hover:border-[#FF704D] transition-all"
            >
              <BookOpen className="h-4 w-4 text-[#A5ADB7]" />
              <span>{siteContent.hero.secondaryCta}</span>
            </Link>
          </div>

          {/* Quick Install Command - with platform tabs */}
          <div className="max-w-2xl">
            <InstallCommand
              label="One command. Downloads + configures + launches automatically. Python 3.8+."
            />
          </div>

          {/* Pipeline Flow Bar */}
          <div className="flex items-center gap-3 pt-1 font-mono text-xs text-[#A5ADB7]">
            <span className="rounded-lg border border-[#2B323B] bg-[#151A20] px-3.5 py-2 text-[#F4F5F6]">Proxy</span>
            <span className="text-[#747D88]">──➔</span>
            <div className="flex items-center justify-center rounded-lg border border-[#FF704D]/40 bg-[#151A20] px-2.5 py-1">
              <PixelImage src="/assets/mascot-walk-1.png" alt="Mascot" width={24} height={24} />
            </div>
            <span className="text-[#747D88]">──➔</span>
            <span className="rounded-lg border border-[#2B323B] bg-[#151A20] px-3.5 py-2 text-[#F4F5F6]">
              AgentRouter
            </span>
          </div>
        </div>

        {/* Right Hero Stage (48% - Mascot Visual Protagonist 480px) */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <HeroMascotScene />
        </div>
      </section>

      {/* 2. MIDDLE ROW: 3 FEATURE CARDS */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Card 1: Auto Retry */}
        <div className="rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-6 flex items-start gap-5 hover:border-[#FF704D]/50 hover:-translate-y-[2px] transition-all duration-180 orange-glow-sm">
          <div className="w-14 shrink-0 pt-1">
            <PixelImage src="/assets/pixel-refresh.png" alt="Auto Retry" width={52} height={52} />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-[#F4F5F6]">{siteContent.primaryFeatures[0].title}</h3>
            <p className="text-sm text-[#A5ADB7] leading-relaxed">
              {siteContent.primaryFeatures[0].description}
            </p>
            <p className="text-xs text-[#747D88] font-mono pt-1">Keep going. Don&apos;t give up.</p>
          </div>
        </div>

        {/* Card 2: 403 -> 429 */}
        <div className="rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-6 flex items-start gap-5 hover:border-[#FF704D]/50 hover:-translate-y-[2px] transition-all duration-180 orange-glow-sm">
          <div className="w-14 shrink-0 flex flex-col items-center justify-center font-pixel text-[#FF704D] leading-none pt-1">
            <span className="text-xl font-bold">403</span>
            <span className="text-sm my-0.5">↓</span>
            <span className="text-xl font-bold">429</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-[#F4F5F6]">{siteContent.primaryFeatures[1].title}</h3>
            <p className="text-sm text-[#A5ADB7] leading-relaxed">
              {siteContent.primaryFeatures[1].description}
            </p>
            <p className="text-xs text-[#747D88] font-mono pt-1">Smoother limits. Fewer breaks.</p>
          </div>
        </div>

        {/* Card 3: Local First */}
        <div className="rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-6 flex items-start gap-5 hover:border-[#FF704D]/50 hover:-translate-y-[2px] transition-all duration-180 orange-glow-sm">
          <div className="w-14 shrink-0 pt-1">
            <PixelImage src="/assets/pixel-home-heart.png" alt="Local First" width={52} height={52} />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-[#F4F5F6]">{siteContent.primaryFeatures[2].title}</h3>
            <p className="text-sm text-[#A5ADB7] leading-relaxed">
              {siteContent.primaryFeatures[2].description}
            </p>
            <p className="text-xs text-[#747D88] font-mono pt-1">Private. Secure. Yours.</p>
          </div>
        </div>
      </section>

      {/* 3. BOTTOM ROW: CODE SNIPPET & REAL RELIABILITY PRINCIPLES */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-stretch">
        {/* Left Card: Code Snippet */}
        <div className="lg:col-span-7 rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-6 flex flex-col justify-between space-y-4">
          {/* Tabs */}
          <div className="flex items-center gap-6 border-b border-[#2B323B] pb-3 font-mono text-xs">
            {(['cURL', 'JavaScript', 'Python'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-1 font-medium transition-colors ${
                  activeTab === tab ? 'text-[#FF704D]' : 'text-[#A5ADB7] hover:text-[#F4F5F6]'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[#FF704D]" />
                )}
              </button>
            ))}
          </div>

          {/* Code Box */}
          <div className="relative rounded-xl border border-[#2B323B] bg-[#090B0E] p-4 font-mono text-xs sm:text-sm text-[#F4F5F6] leading-relaxed flex-1">
            <button
              onClick={handleCopyCode}
              className="absolute top-3 right-3 rounded bg-[#151A20] p-1.5 text-[#A5ADB7] hover:text-[#F4F5F6] border border-[#2B323B] transition-colors"
              title="Copy code"
            >
              {codeCopied ? <Check className="h-4 w-4 text-[#83D957]" /> : <Copy className="h-4 w-4" />}
            </button>
            <pre className="whitespace-pre-wrap break-words pr-8">
              <code>{codeSnippets[activeTab]}</code>
            </pre>
          </div>
        </div>

        {/* Right Card: Built Around Reliability */}
        <div className="lg:col-span-5 rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-6 flex flex-col justify-between space-y-6">
          <div>
            <h3 className="text-base font-bold text-[#FF704D] tracking-wide font-mono mb-4">
              Built around reliability
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {/* Item 1 */}
              <div className="space-y-1.5 p-3 rounded-xl border border-[#2B323B]/60 bg-[#11151A]/60">
                <div className="flex items-center gap-2 text-[#F4F5F6] font-bold text-sm">
                  <Cpu className="h-4 w-4 text-[#83D957]" />
                  <span>Local First</span>
                </div>
                <p className="text-xs text-[#A5ADB7]">Runs on your machine.</p>
              </div>

              {/* Item 2 */}
              <div className="space-y-1.5 p-3 rounded-xl border border-[#2B323B]/60 bg-[#11151A]/60">
                <div className="flex items-center gap-2 text-[#F4F5F6] font-bold text-sm">
                  <RefreshCw className="h-4 w-4 text-[#FFB347]" />
                  <span>Retry-Aware</span>
                </div>
                <p className="text-xs text-[#A5ADB7]">Preserves client retry logic.</p>
              </div>

              {/* Item 3 */}
              <div className="space-y-1.5 p-3 rounded-xl border border-[#2B323B]/60 bg-[#11151A]/60">
                <div className="flex items-center gap-2 text-[#F4F5F6] font-bold text-sm">
                  <Code2 className="h-4 w-4 text-[#FF704D]" />
                  <span>Minimal Rewriting</span>
                </div>
                <p className="text-xs text-[#A5ADB7]">Changes only what is necessary.</p>
              </div>

              {/* Item 4 */}
              <div className="space-y-1.5 p-3 rounded-xl border border-[#2B323B]/60 bg-[#11151A]/60">
                <div className="flex items-center gap-2 text-[#F4F5F6] font-bold text-sm">
                  <Shield className="h-4 w-4 text-[#83D957]" />
                  <span>Open Source</span>
                </div>
                <p className="text-xs text-[#A5ADB7]">Inspectable and configurable.</p>
              </div>
            </div>
          </div>

          {/* Footer Line */}
          <div className="flex items-center gap-2 pt-4 border-t border-[#2B323B]/60 text-xs font-mono text-[#A5ADB7]">
            <span>MIT Licensed • Pure Python Standard Library</span>
          </div>
        </div>
      </section>
    </div>
  );
}
