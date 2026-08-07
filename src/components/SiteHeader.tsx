'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PixelImage } from './PixelImage';
import { siteContent } from '@/content/site';
import { Menu, X, ExternalLink } from 'lucide-react';
import { GitHubStarsButton } from './GitHubStarsButton';

export const SiteHeader: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full h-[88px] border-b border-[#2B323B]/80 bg-[#0B0E12]/95 backdrop-blur-md">
      <div className="mx-auto flex h-full w-[calc(100%-64px)] max-w-[1600px] items-center justify-between px-[18px] sm:px-6 lg:px-8">
        
        {/* Maximum Visibility Horizontal Pixel Logo */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none" aria-label="Claude Proxy Home">
          <PixelImage
            src="/assets/logo-horizontal.png"
            alt="Claude Proxy for AgentRouter Horizontal Logo"
            width={340}
            height={68}
            priority
            className="w-[280px] h-[56px] sm:w-[340px] sm:h-[68px] object-contain pixelated group-hover:scale-[1.03] transition-transform drop-shadow-[0_0_18px_rgba(255,112,77,0.5)]"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Main Navigation">
          {siteContent.navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-1 text-sm font-medium transition-colors ${
                  isActive ? 'text-[#F4F5F6]' : 'text-[#A5ADB7] hover:text-[#F4F5F6]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-2 left-0 right-0 h-[2.5px] rounded-full bg-[#FF704D]" />
                )}
              </Link>
            );
          })}

          <a
            href={siteContent.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-base font-medium text-[#A5ADB7] hover:text-[#F4F5F6] transition-colors"
          >
            <span>GitHub</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </nav>

        {/* Live Dynamic GitHub Star Button */}
        <div className="flex items-center gap-3">
          <GitHubStarsButton />

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex md:hidden items-center justify-center rounded-lg border border-[#2B323B] p-2 text-[#A5ADB7] hover:text-[#F4F5F6]"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[88px] z-50 flex flex-col bg-[#0B0E12]/95 backdrop-blur-xl p-6 md:hidden">
          <nav className="flex flex-col gap-4">
            {siteContent.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg font-medium ${item.href === '/' ? 'text-[#F4F5F6]' : 'text-[#A5ADB7]'}`}
              >
                {item.label}
              </Link>
            ))}
            <a href={siteContent.githubUrl} target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-[#FF704D]">GitHub ↗</a>
          </nav>
        </div>
      )}
    </header>
  );
};
