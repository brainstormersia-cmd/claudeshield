'use client';

import React from 'react';
import { siteContent } from '@/content/site';
import { PixelHeading, SectionBadge } from '@/components/UIComponents';
import { FAQAccordion } from '@/components/FlowComponents';
import { MascotActor } from '@/components/MascotActor';
import { GithubIcon } from '@/components/GithubIcon';
import { HelpCircle, Wrench, BookOpen } from 'lucide-react';

export default function FAQPage() {
  return (
    <div className="space-y-16 py-8 sm:py-12">
      {/* Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <SectionBadge>Questions & Answers</SectionBadge>
        <PixelHeading
          title="FAQ &"
          highlight="Troubleshooting"
          subtitle="Everything you need to know about proxy behavior, error conversion, and setup troubleshooting."
          align="center"
        />
      </div>

      {/* Main FAQ Accordion Grid */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
        <div className="lg:col-span-8 space-y-4">
          <h3 className="font-pixel text-xl font-bold text-[#F4F5F6] flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-[#FF704D]" />
            <span>Frequently Asked Questions</span>
          </h3>
          <FAQAccordion />
        </div>

        {/* Mascot Side Panel */}
        <div className="lg:col-span-4 rounded-2xl border border-[#2B323B] bg-[#151A20] p-6 text-center space-y-6 orange-glow-sm">
          <MascotActor pose="inspecting" size={96} speechBubble="Got questions?" className="mx-auto" />
          <div className="space-y-2">
            <h4 className="font-bold text-base text-[#F4F5F6]">Still need assistance?</h4>
            <p className="text-xs text-[#A5ADB7]">Our open-source GitHub issues page is monitored by community builders.</p>
          </div>
          <div className="flex flex-col gap-3 pt-2">
            <a
              href={siteContent.supportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg bg-[#FF704D] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#FF805D] transition-colors"
            >
              <GithubIcon className="h-4 w-4" />
              <span>Open an Issue</span>
            </a>
            <a
              href="/docs"
              className="flex items-center justify-center gap-2 rounded-lg border border-[#2B323B] bg-[#11151A] px-4 py-2.5 text-xs font-semibold text-[#F4F5F6] hover:border-[#FF704D] transition-colors"
            >
              <BookOpen className="h-4 w-4 text-[#A5ADB7]" />
              <span>View Documentation</span>
            </a>
          </div>
        </div>
      </div>

      {/* Troubleshooting Panel */}
      <div className="space-y-6 rounded-2xl border border-[#2B323B] bg-[#11151A] p-6 sm:p-8">
        <h3 className="font-pixel text-xl font-bold text-[#F4F5F6] flex items-center gap-2">
          <Wrench className="h-5 w-5 text-[#FFB347]" />
          <span>Troubleshooting Guide</span>
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {siteContent.troubleshooting.map((item, idx) => (
            <div key={idx} className="rounded-xl border border-[#2B323B] bg-[#151A20] p-5 space-y-3">
              <h4 className="font-bold text-sm text-[#FF805D]">{item.title}</h4>
              <div>
                <span className="text-[10px] font-mono text-[#747D88] block uppercase">Symptom</span>
                <p className="text-xs text-[#EF6258] font-mono">{item.symptom}</p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#747D88] block uppercase">Solution</span>
                <p className="text-xs text-[#A5ADB7] leading-relaxed">{item.solution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
