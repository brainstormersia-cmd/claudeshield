'use client';

import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

interface InstallCommandProps {
  command?: string;
  label?: string;
  className?: string;
}

const DEFAULT_COMMAND =
  'curl -sSL https://raw.githubusercontent.com/brainstormersia-cmd/agentrouter-autoretry-claudecode/main/install.py | python';

export const InstallCommand: React.FC<InstallCommandProps> = ({
  command = DEFAULT_COMMAND,
  label = 'One command. Downloads + configures + launches.',
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        className="group relative flex items-center gap-3 rounded-xl border border-[#2B323B] bg-[#0B0E12] px-4 py-3 hover:border-[#FF704D]/50 transition-all"
        role="region"
        aria-label="Install command"
      >
        {/* Terminal prompt icon */}
        <Terminal className="h-4 w-4 shrink-0 text-[#FF704D]" />

        {/* Command text */}
        <code className="truncate font-mono text-xs text-[#A5ADB7] flex-1 min-w-0">
          {command}
        </code>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="flex shrink-0 items-center gap-1.5 rounded-lg border border-[#2B323B] bg-[#151A20] px-3 py-1.5 text-xs font-medium text-[#A5ADB7] hover:border-[#FF704D] hover:text-[#F4F5F6] transition-all"
          aria-label="Copy install command"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-[#83D957]" />
              <span className="text-[#83D957]">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Label */}
      <p className="mt-1.5 text-xs text-[#747D88]">{label}</p>

      {/* aria-live for screen readers */}
      <span className="sr-only" aria-live="polite">
        {copied ? 'Command copied to clipboard' : ''}
      </span>
    </div>
  );
};
