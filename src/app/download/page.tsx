'use client';

import React, { useState } from 'react';
import { siteContent } from '@/content/site';
import { MascotActor } from '@/components/MascotActor';
import { PixelSparkles } from '@/components/PixelSparkles';
import { GithubIcon } from '@/components/GithubIcon';
import { PixelIconHouseHeart, PixelIconShieldHeart, PixelIconRefresh } from '@/components/PixelIcons';
import { BookOpen, Zap, ArrowRight, GitBranch } from 'lucide-react';

export default function DownloadPage() {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);
    if (typeof window !== 'undefined') {
      window.open(siteContent.downloadUrl, '_blank');
    }
  };

  const checklistItems = [
    "Stabilize Claude API requests",
    "Automatically retry failures",
    "Handle rate limits gracefully",
    "Keep your coding sessions alive",
    "100% local. Your keys stay on your machine."
  ];

  return (
    <div className="space-y-16 py-8 sm:py-12">
      {/* Top Banner Section */}
      <div className="relative overflow-hidden rounded-2xl border border-[#2B323B] bg-[#11151A] p-8 sm:p-12 orange-glow-sm">
        {downloaded && <PixelSparkles count={8} />}

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FF704D]/30 bg-[#FF704D]/10 px-3.5 py-1 text-xs font-mono text-[#FF805D]">
              You&apos;re all set.
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F4F5F6]">
              Ready to stabilize your{' '}
              <span className="font-pixel text-[#FF704D] block mt-1 drop-shadow-[0_0_15px_rgba(255,112,77,0.35)]">
                Claude workflow?
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#A5ADB7] leading-relaxed max-w-xl">
              Claude Proxy for AgentRouter keeps your API requests reliable, your rate limits safe, and your sessions alive — so you can focus on building.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 rounded-lg bg-[#FF704D] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#FF805D] transition-all shadow-lg hover:scale-105"
              >
                <span>Download Claude Proxy</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href={siteContent.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[#2B323B] bg-[#151A20] px-6 py-3.5 text-sm font-semibold text-[#F4F5F6] hover:border-[#FF704D] transition-all"
              >
                <GithubIcon className="h-4 w-4" />
                <span>Star on GitHub ↗</span>
              </a>
            </div>

            {/* Quick Explore Links */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#A5ADB7] pt-4">
              <span className="text-[#747D88]">Explore more:</span>
              <a href="/docs" className="inline-flex items-center gap-1.5 rounded border border-[#2B323B] bg-[#151A20] px-3 py-1.5 hover:text-[#FF704D]">
                <BookOpen className="h-3.5 w-3.5" />
                <span>View Docs</span>
              </a>
              <a href="/quickstart" className="inline-flex items-center gap-1.5 rounded border border-[#2B323B] bg-[#151A20] px-3 py-1.5 hover:text-[#FF704D]">
                <Zap className="h-3.5 w-3.5 text-[#FF704D]" />
                <span>Quickstart Guide</span>
              </a>
            </div>
          </div>

          {/* Right Checklist Box */}
          <div className="lg:col-span-5 rounded-xl border border-[#2B323B] bg-[#151A20] p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF704D]">
              <span className="font-bold text-[#F4F5F6]">Built for developers who ship.</span>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-[#A5ADB7]">
              {checklistItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-[#FF704D] font-bold text-xs mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 3 Summary Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="flex flex-col items-center text-center rounded-xl border border-[#2B323B] bg-[#151A20] p-6 space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#FF704D]/30 bg-[#FF704D]/10 text-[#FF704D]">
            <GitBranch className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-base text-[#F4F5F6]">Open Source</h3>
          <p className="text-xs text-[#A5ADB7]">Built by developers</p>
        </div>

        <div className="flex flex-col items-center text-center rounded-xl border border-[#2B323B] bg-[#151A20] p-6 space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#FF704D]/30 bg-[#FF704D]/10 text-[#FF704D]">
            <PixelIconShieldHeart size={36} />
          </div>
          <h3 className="font-bold text-base text-[#F4F5F6]">MIT License</h3>
          <p className="text-xs text-[#A5ADB7]">Free to use. Free to build.</p>
        </div>

        <div className="flex flex-col items-center text-center rounded-xl border border-[#2B323B] bg-[#151A20] p-6 space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#FF704D]/30 bg-[#FF704D]/10 text-[#FF704D]">
            <PixelIconHouseHeart size={36} />
          </div>
          <h3 className="font-bold text-base text-[#F4F5F6]">Local First</h3>
          <p className="text-xs text-[#A5ADB7]">Private. Secure. Yours.</p>
        </div>
      </div>

      {/* What's Next Roadmap Bar */}
      <div className="rounded-2xl border border-[#2B323B] bg-[#11151A] p-6 space-y-6">
        <div className="flex items-center gap-3">
          <MascotActor pose="inspecting" size={48} />
          <span className="font-mono text-xs text-[#A5ADB7]">What&apos;s next</span>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="flex items-start gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FF704D] text-xs font-bold text-white font-mono">1</span>
            <div>
              <h4 className="font-bold text-sm text-[#F4F5F6]">Better SSE handling</h4>
              <p className="text-xs text-[#747D88]">Smarter stream reconnections</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#2B323B] bg-[#151A20] text-xs font-bold text-[#A5ADB7] font-mono">2</span>
            <div>
              <h4 className="font-bold text-sm text-[#F4F5F6]">Smarter health checks</h4>
              <p className="text-xs text-[#747D88]">Adaptive, provider-aware logic</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#2B323B] bg-[#151A20] text-xs font-bold text-[#A5ADB7] font-mono">3</span>
            <div>
              <h4 className="font-bold text-sm text-[#F4F5F6]">More gateway compatibility</h4>
              <p className="text-xs text-[#747D88]">Support for more ecosystems</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
