'use client';

import React from 'react';
import { siteContent } from '@/content/site';
import { PixelHeading, SectionBadge, CodeBlock } from '@/components/UIComponents';
import { ComparisonFlow } from '@/components/FlowComponents';
import { MascotActor } from '@/components/MascotActor';
import { ArrowRight } from 'lucide-react';

export default function HowItWorksPage() {
  const content = siteContent.howItWorks;

  return (
    <div className="space-y-16 py-8 sm:py-12">
      {/* Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <SectionBadge>{content.badge}</SectionBadge>
        <PixelHeading
          title="How the proxy"
          highlight="stabilizes your session"
          subtitle={content.description}
          align="center"
        />
      </div>

      {/* 4-Step Animated Flow Diagram */}
      <div className="rounded-2xl border border-[#2B323B] bg-[#11151A] p-6 sm:p-8 space-y-6 orange-glow-sm">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.nodes.map((node, index) => (
            <div key={node.id} className="relative flex flex-col justify-between rounded-xl border border-[#2B323B] bg-[#151A20] p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex h-7 w-7 items-center justify-center rounded-md border border-[#FF704D]/40 bg-[#FF704D]/10 font-mono text-xs font-bold text-[#FF805D]">
                  {node.id}
                </span>
                {node.id === 2 && <MascotActor pose="inspecting" size={32} />}
              </div>
              <h4 className="font-bold text-sm text-[#F4F5F6]">{node.name}</h4>
              <p className="text-xs text-[#A5ADB7]">{node.subtext}</p>
              
              {index < content.nodes.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-[#191F26] border border-[#2B323B] text-[#FF704D]">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3 Detailed Process Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {content.cards.map((card, idx) => (
          <div key={idx} className="space-y-4 rounded-xl border border-[#2B323B] bg-[#151A20] p-6">
            <h3 className="font-bold text-base text-[#F4F5F6]">{card.title}</h3>
            <p className="text-xs text-[#A5ADB7] leading-relaxed">{card.description}</p>
            <CodeBlock code={card.codeSnippet} language="http" />
          </div>
        ))}
      </div>

      {/* Lifecycle Diagram */}
      <ComparisonFlow />
    </div>
  );
}
