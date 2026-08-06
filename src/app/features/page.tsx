'use client';

import React, { useState } from 'react';
import { siteContent } from '@/content/site';
import { PixelHeading, SectionBadge, FeatureCard } from '@/components/UIComponents';
import { ComparisonFlow } from '@/components/FlowComponents';
import { Copy, Check } from 'lucide-react';

export default function FeaturesPage() {
  const [copied, setCopied] = useState(false);
  const commandText = "python retry-proxy.py --start --upstream https://agentrouter.org";

  const handleCopy = () => {
    navigator.clipboard.writeText(commandText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-16 py-8 sm:py-12">
      {/* Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <PixelHeading
          title="Why this"
          highlight="proxy works"
          subtitle="Designed to keep your Claude API requests stable, fast, and frustration-free without unnecessary request rewriting."
          align="center"
        />
      </div>

      {/* 6 Feature Cards Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {siteContent.whyFeatures.map((feat) => (
          <FeatureCard
            key={feat.id}
            title={feat.title}
            description={feat.description}
            iconName={feat.iconName}
            mascotInspect={feat.mascotInspect}
          />
        ))}
      </div>

      {/* Direct Comparison Section */}
      <ComparisonFlow />

      {/* Terminal Command Pill Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-[#2B323B] bg-[#151A20] p-4 sm:p-6 orange-glow-sm">
        <div className="flex items-center gap-3 font-mono text-xs sm:text-sm text-[#F4F5F6]">
          <span className="text-[#FF704D] font-bold">$</span>
          <span>{commandText}</span>
          <button
            onClick={handleCopy}
            className="ml-2 rounded border border-[#2B323B] bg-[#191F26] px-3 py-1 text-xs text-[#A5ADB7] hover:text-[#F4F5F6] transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-[#83D957]" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-[#A5ADB7]">
          <span>Open source</span>
          <span>•</span>
          <span>MIT License</span>
          <span>•</span>
          <span>Zero dependencies</span>
        </div>
      </div>
    </div>
  );
}
