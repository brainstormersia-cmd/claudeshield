'use client';

import React, { useState } from 'react';
import { siteContent } from '@/content/site';
import { PixelImage } from '@/components/PixelImage';
import { CodeBlock } from '@/components/UIComponents';
import { MascotActor } from '@/components/MascotActor';

export default function GuidesPage() {
  const [active, setActive] = useState(siteContent.guides[0]?.id || 'claude-code');
  const current = siteContent.guides.find((g) => g.id === active) || siteContent.guides[0];

  return (
    <div className="space-y-8 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#2B323B] pb-6">
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FF704D]/30 bg-[#FF704D]/10 px-3 py-1 text-xs font-mono text-[#FF805D]">
            Integration Guides
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F4F5F6]">
            Connect your <span className="font-pixel text-[#FF704D]">client</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#A5ADB7]">
            Step-by-step setup for every Anthropic-compatible client. The proxy works with all of them.
          </p>
        </div>
        <MascotActor pose="inspecting" size={80} speechBubble="Pick your tool." />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Client selector */}
        <aside className="lg:col-span-3 space-y-2">
          {siteContent.guides.map((guide) => (
            <button
              key={guide.id}
              onClick={() => setActive(guide.id)}
              className={`w-full flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                active === guide.id
                  ? 'border-[#FF704D]/50 bg-[#FF704D]/10'
                  : 'border-[#2B323B] bg-[#151A20] hover:border-[#FF704D]/30'
              }`}
            >
              <PixelImage src={guide.icon} alt={guide.client} width={28} height={28} />
              <span className={`text-sm font-mono ${active === guide.id ? 'text-[#FF704D]' : 'text-[#A5ADB7]'}`}>
                {guide.client}
              </span>
            </button>
          ))}
        </aside>

        {/* Guide content */}
        <main className="lg:col-span-9 space-y-6">
          {current && (
            <>
              <div className="rounded-2xl border border-[#2B323B] bg-[#151A20] p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <PixelImage src={current.icon} alt={current.client} width={40} height={40} />
                  <div>
                    <h2 className="text-xl font-bold text-[#F4F5F6]">{current.client}</h2>
                    <p className="text-xs text-[#A5ADB7]">{current.description}</p>
                  </div>
                </div>

                {/* Steps */}
                <div className="space-y-3">
                  <h3 className="text-xs font-mono font-bold text-[#FF805D] uppercase tracking-wider">Setup Steps</h3>
                  <ol className="space-y-2">
                    {current.steps.map((step, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-[#A5ADB7]">
                        <span className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full border border-[#FF704D]/40 bg-[#FF704D]/10 text-xs font-mono font-bold text-[#FF704D]">
                          {idx + 1}
                        </span>
                        <span className="pt-0.5">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Config */}
                <div className="space-y-2">
                  <h3 className="text-xs font-mono font-bold text-[#FF805D] uppercase tracking-wider">Configuration</h3>
                  <CodeBlock code={current.config} language="json" filename={`${current.client.toLowerCase().replace(/\s/g, '-')}-config`} />
                </div>
              </div>

              {/* Common note */}
              <div className="rounded-xl border border-[#2B323B] bg-[#11151A] p-4 space-y-2">
                <div className="text-xs font-mono font-bold text-[#83D957]">Before you start</div>
                <p className="text-xs text-[#A5ADB7] leading-relaxed">
                  Make sure the proxy is running: <code className="text-[#FF704D]">python retry-proxy.py --start --upstream https://agentrouter.org</code>
                </p>
                <p className="text-xs text-[#747D88]">
                  The proxy injects the required claude-cli User-Agent, handles Chinese error messages, and converts 403 quota errors to 429 automatically.
                </p>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
