'use client';

import React from 'react';
import Link from 'next/link';
import { PixelImage } from './PixelImage';
import { siteContent } from '@/content/site';

export const SiteFooter: React.FC = () => {
  return (
    <footer className="w-full border-t border-[#2B323B]/80 bg-[#0B0E12] py-8 text-[#A5ADB7]">
      <div className="mx-auto w-[calc(100%-64px)] max-w-[1600px] px-[18px] sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-3">
            <Link href="/" className="flex items-center gap-3 group focus:outline-none">
              <PixelImage
                src="/assets/mascot-idle.png"
                alt="Claude Proxy Mascot"
                width={32}
                height={32}
              />
              <span className="font-pixel text-lg font-bold text-[#FF704D]">
                CLAUDE PROXY
              </span>
            </Link>
            <p className="text-xs text-[#A5ADB7] leading-relaxed max-w-sm">
              {siteContent.description}
            </p>
            <p className="text-[11px] text-[#747D88] font-mono leading-normal pt-1">
              Independent open-source project. Not affiliated with Anthropic or AgentRouter.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 space-y-2 font-mono text-xs">
            <h4 className="font-bold text-[#F4F5F6] tracking-wider uppercase">Navigation</h4>
            <ul className="space-y-1.5 text-[#A5ADB7]">
              <li><Link href="/" className="hover:text-[#F4F5F6] transition-colors">Home</Link></li>
              <li><Link href="/features" className="hover:text-[#F4F5F6] transition-colors">Features</Link></li>
              <li><Link href="/retry-logic" className="hover:text-[#F4F5F6] transition-colors">Retry Logic</Link></li>
              <li><Link href="/quickstart" className="hover:text-[#F4F5F6] transition-colors">Quickstart</Link></li>
              <li><Link href="/compatibility" className="hover:text-[#F4F5F6] transition-colors">Compatibility</Link></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="md:col-span-4 space-y-2 font-mono text-xs">
            <h4 className="font-bold text-[#F4F5F6] tracking-wider uppercase">Resources</h4>
            <ul className="space-y-1.5 text-[#A5ADB7]">
              <li><Link href="/docs" className="hover:text-[#F4F5F6] transition-colors">Documentation</Link></li>
              <li><Link href="/faq" className="hover:text-[#F4F5F6] transition-colors">FAQ</Link></li>
              <li><Link href="/download" className="hover:text-[#F4F5F6] transition-colors">Download</Link></li>
              <li>
                <a
                  href={siteContent.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F4F5F6] transition-colors"
                >
                  GitHub Repository ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-[#2B323B]/60 text-xs font-mono text-[#747D88]">
          <p>© {new Date().getFullYear()} Claude Proxy Team. Open Source MIT License.</p>
          <p className="pt-2 sm:pt-0">Runs locally on localhost:8787</p>
        </div>
      </div>
    </footer>
  );
};
