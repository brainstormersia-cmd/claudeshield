'use client';

import React, { useState } from 'react';
import { PixelImage } from './PixelImage';
import { PixelIconRefresh, PixelIconHouseHeart, PixelIcon403To429 } from './PixelIcons';
import { Copy, Check, Terminal, Lock, Clock, ArrowRightLeft, ShieldCheck, Shield, Star, Zap } from 'lucide-react';
import { MascotActor } from './MascotActor';

// Section Badge Pill
export const SectionBadge: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <span className={`inline-flex items-center gap-1.5 rounded-full border border-[#FF704D]/30 bg-[#FF704D]/10 px-3.5 py-1 text-xs font-mono text-[#FF805D] ${className}`}>
    <Zap className="h-3 w-3 text-[#FF704D]" />
    {children}
  </span>
);

// Pixel Accent Heading
export const PixelHeading: React.FC<{
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: 'left' | 'center';
}> = ({ title, highlight, subtitle, align = 'left' }) => (
  <div className={`space-y-3 ${align === 'center' ? 'text-center' : 'text-left'}`}>
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F4F5F6]">
      {title} {highlight && <span className="font-pixel text-[#FF704D] drop-shadow-[0_0_12px_rgba(255,112,77,0.35)]">{highlight}</span>}
    </h2>
    {subtitle && <p className="max-w-2xl text-base text-[#A5ADB7] leading-relaxed">{subtitle}</p>}
  </div>
);

// CodeBlock Component with Copy Button & Accessible ARIA live feedback
export const CodeBlock: React.FC<{ code: string; language?: string; filename?: string }> = ({
  code,
  language = 'bash',
  filename,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="relative group overflow-hidden rounded-xl border border-[#2B323B] bg-[#0D0F12] shadow-xl">
      {/* Header bar if filename or language is specified */}
      <div className="flex items-center justify-between border-b border-[#2B323B] bg-[#151A20] px-4 py-2 text-xs font-mono text-[#A5ADB7]">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#EF6258]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFB347]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#83D957]" />
          {filename && <span className="ml-2 text-[#F4F5F6] font-medium">{filename}</span>}
        </div>
        <div className="flex items-center gap-3">
          <span className="uppercase text-[10px] tracking-wider text-[#747D88]">{language}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded bg-[#191F26] px-2 py-1 text-xs text-[#A5ADB7] hover:text-[#F4F5F6] hover:bg-[#2B323B] transition-colors focus:outline-none"
            aria-label="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-[#83D957]" />
                <span className="text-[#83D957] font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Text Area - wraps instead of horizontal scroll */}
      <pre className="whitespace-pre-wrap break-words p-4 font-mono text-xs sm:text-sm text-[#F4F5F6] leading-relaxed">
        <code>{code}</code>
      </pre>

      {/* Accessibility screen reader notice */}
      <span aria-live="polite" className="sr-only">
        {copied ? 'Code copied to clipboard' : ''}
      </span>
    </div>
  );
};

// CodeTabs Component
export const CodeTabs: React.FC<{
  tabs: Array<{ label: string; code: string; language: string }>;
}> = ({ tabs }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  if (!tabs || tabs.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex gap-1 border-b border-[#2B323B] pb-1">
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            onClick={() => setActiveIdx(idx)}
            className={`rounded-t-lg px-4 py-2 text-xs font-mono font-medium transition-colors ${
              activeIdx === idx
                ? 'bg-[#151A20] text-[#FF704D] border-t-2 border-[#FF704D]'
                : 'text-[#A5ADB7] hover:text-[#F4F5F6]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <CodeBlock code={tabs[activeIdx].code} language={tabs[activeIdx].language} />
    </div>
  );
};

// Feature Icon renderer helper
const renderFeatureIcon = (name: string) => {
  switch (name) {
    case 'RotateCw':
    case 'auto-retry':
      return <PixelIconRefresh className="h-8 w-8 text-[#FF704D]" />;
    case '403-429':
      return <PixelIcon403To429 className="h-8 w-8 text-[#FF704D]" />;
    case 'Home':
    case 'local-first':
      return <PixelIconHouseHeart className="h-8 w-8 text-[#FF704D]" />;
    case 'Clock': return <Clock className="h-5 w-5" />;
    case 'ArrowRightLeft': return <ArrowRightLeft className="h-5 w-5" />;
    case 'Lock': return <Lock className="h-5 w-5" />;
    case 'Terminal': return <Terminal className="h-5 w-5" />;
    case 'ShieldCheck': return <ShieldCheck className="h-5 w-5" />;
    case 'Shield': return <Shield className="h-5 w-5" />;
    case 'Star': return <Star className="h-5 w-5" />;
    default: return <Zap className="h-5 w-5" />;
  }
};

// Feature Card Component
export const FeatureCard: React.FC<{
  title: string;
  description: string;
  iconName?: string;
  image?: string;
  mascotInspect?: boolean;
}> = ({ title, description, iconName = 'Zap', image, mascotInspect }) => {
  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-[#2B323B] bg-[#151A20] p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#FF704D]/50 hover:bg-[#191F26] orange-glow-sm">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#FF704D]/30 bg-[#FF704D]/10 text-[#FF704D] group-hover:scale-110 transition-transform">
            {renderFeatureIcon(iconName)}
          </div>
          {mascotInspect && (
            <MascotActor pose="inspecting" size={36} className="opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
          )}
        </div>
        <h3 className="text-lg font-bold text-[#F4F5F6] group-hover:text-[#FF805D] transition-colors">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-[#A5ADB7] leading-relaxed">
          {description}
        </p>
      </div>

      {image && (
        <div className="mt-4 overflow-hidden rounded-lg border border-[#2B323B]">
          <PixelImage src={image} alt={title} width={400} height={180} className="w-full object-cover" />
        </div>
      )}
    </div>
  );
};

// Status Badge Component
export const StatusBadge: React.FC<{ status: 'supported' | 'partial' | 'not_supported' }> = ({ status }) => {
  if (status === 'supported') {
    return (
      <span className="inline-flex items-center gap-1 rounded bg-[#83D957]/15 px-2 py-0.5 text-xs font-mono font-medium text-[#83D957] border border-[#83D957]/30">
        ✓ Supported
      </span>
    );
  }
  if (status === 'partial') {
    return (
      <span className="inline-flex items-center gap-1 rounded bg-[#FFB347]/15 px-2 py-0.5 text-xs font-mono font-medium text-[#FFB347] border border-[#FFB347]/30">
        ~ Partial
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded bg-[#EF6258]/15 px-2 py-0.5 text-xs font-mono font-medium text-[#EF6258] border border-[#EF6258]/30">
      ✕ Not Supported
    </span>
  );
};

// CTA Section Component
export const CTASection: React.FC<{ title?: string; subtitle?: string; primaryText?: string }> = ({
  title = "Ready to stabilize your Claude workflow?",
  subtitle = "Add a focused local reliability layer between Claude Code and AgentRouter.",
  primaryText = "Download Claude Proxy",
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#FF704D]/40 bg-gradient-to-r from-[#151A20] via-[#191F26] to-[#151A20] p-8 sm:p-12 text-center orange-glow-md">
      <div className="relative z-10 mx-auto max-w-2xl space-y-6">
        <MascotActor pose="success" size={84} className="mx-auto" />
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F4F5F6]">
          {title}
        </h2>
        <p className="text-sm sm:text-base text-[#A5ADB7]">
          {subtitle}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href="/download"
            className="rounded-lg bg-[#FF704D] px-6 py-3 text-sm font-semibold text-white hover:bg-[#FF805D] transition-all shadow-lg hover:scale-105"
          >
            {primaryText}
          </a>
          <a
            href="/docs"
            className="rounded-lg border border-[#2B323B] bg-[#11151A] px-6 py-3 text-sm font-semibold text-[#F4F5F6] hover:border-[#FF704D] transition-all"
          >
            View Documentation
          </a>
        </div>
      </div>
    </div>
  );
};
