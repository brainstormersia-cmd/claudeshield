'use client';

import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { siteContent } from '@/content/site';

export const GitHubStarsButton: React.FC = () => {
  const [stars, setStars] = useState<string>('1.2k');

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
        // Fallback to static count on error
      }
    }
    fetchStars();
  }, []);

  return (
    <a
      href={siteContent.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-lg border border-[#FF704D]/60 bg-[#FF704D]/10 px-3.5 py-1.5 text-xs font-mono font-semibold text-[#FF805D] hover:bg-[#FF704D]/20 transition-all shadow-sm"
      title="View on GitHub"
    >
      <Star className="h-3.5 w-3.5 fill-[#FF805D]" />
      <span>{stars}</span>
    </a>
  );
};
