'use client';

import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { siteContent } from '@/content/site';

export const GitHubStarsButton: React.FC = () => {
  const [stars, setStars] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStars() {
      try {
        const repoPath = siteContent.githubUrl.replace('https://github.com/', '');
        const res = await fetch(`https://api.github.com/repos/${repoPath}`);
        if (res.ok) {
          const data = await res.json();
          if (data.stargazers_count !== undefined) {
            const count = data.stargazers_count;
            if (count >= 1000) {
              setStars(`${(count / 1000).toFixed(1)}k`);
            } else {
              setStars(`${count}`);
            }
          }
        }
      } catch {
        // Fallback: hide star count on error
      }
    }
    fetchStars();
  }, []);

  return (
    <a
      href={siteContent.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-md border border-[#2B323B] bg-[#F4F5F6] px-2.5 py-1.5 text-xs font-semibold text-[#0B0E12] hover:border-[#FF704D] hover:shadow-md transition-all"
      title="View on GitHub"
    >
      <GithubIcon className="h-4 w-4" />
      <span>Star</span>
      {stars !== null && (
        <>
          <span className="w-px h-3.5 bg-[#2B323B]/40" />
          <Star className="h-3.5 w-3.5 fill-[#FFB347] text-[#FFB347]" />
          <span className="font-mono">{stars}</span>
        </>
      )}
    </a>
  );
};
