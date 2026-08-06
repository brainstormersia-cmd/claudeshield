'use client';

import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

interface InstallCommandProps {
  label?: string;
  className?: string;
}

type Platform = 'macos' | 'windows';

const COMMANDS: Record<Platform, { id: Platform; label: string; command: string; hint: string }> = {
  macos: {
    id: 'macos',
    label: 'macOS / Linux',
    command:
      'curl -sSL https://raw.githubusercontent.com/brainstormersia-cmd/agentrouter-autoretry-claudecode/main/install.py | python',
    hint: 'Bash / Zsh',
  },
  windows: {
    id: 'windows',
    label: 'Windows PowerShell',
    command:
      'curl.exe -sSL https://raw.githubusercontent.com/brainstormersia-cmd/agentrouter-autoretry-claudecode/main/install.py -o "$env:TEMP\\claudeshield-install.py"; python "$env:TEMP\\claudeshield-install.py"',
    hint: 'PowerShell',
  },
};

export const InstallCommand: React.FC<InstallCommandProps> = ({
  label = 'One command. Downloads + configures + launches.',
  className = '',
}) => {
  const [platform, setPlatform] = useState<Platform>('macos');
  const [copied, setCopied] = useState(false);

  const current = COMMANDS[platform];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Platform tabs */}
      <div className="flex gap-1.5 mb-2" role="tablist" aria-label="Choose your operating system">
        {(Object.keys(COMMANDS) as Platform[]).map((key) => (
          <button
            key={key}
            role="tab"
            aria-selected={platform === key}
            onClick={() => {
              setPlatform(key);
              setCopied(false);
            }}
            className={`rounded-lg px-3 py-1.5 text-xs font-mono transition-all ${
              platform === key
                ? 'bg-[#FF704D]/15 text-[#FF704D] border border-[#FF704D]/40'
                : 'bg-[#151A20] text-[#A5ADB7] border border-[#2B323B] hover:text-[#F4F5F6] hover:border-[#FF704D]/40'
            }`}
          >
            {COMMANDS[key].label}
          </button>
        ))}
      </div>

      <div
        className="group relative flex items-center gap-3 rounded-xl border border-[#2B323B] bg-[#0B0E12] px-4 py-3 hover:border-[#FF704D]/50 transition-all"
        role="region"
        aria-label={`Install command for ${current.label}`}
      >
        {/* Terminal prompt icon */}
        <Terminal className="h-4 w-4 shrink-0 text-[#FF704D]" />

        {/* Command text */}
        <code className="truncate font-mono text-xs text-[#A5ADB7] flex-1 min-w-0">
          {current.command}
        </code>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="flex shrink-0 items-center gap-1.5 rounded-lg border border-[#2B323B] bg-[#151A20] px-3 py-1.5 text-xs font-medium text-[#A5ADB7] hover:border-[#FF704D] hover:text-[#F4F5F6] transition-all"
          aria-label={`Copy install command for ${current.label}`}
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
      <p className="mt-1.5 text-xs text-[#747D88]">
        {label} <span className="text-[#FF704D] font-mono">({current.hint})</span>
      </p>

      {/* aria-live for screen readers */}
      <span className="sr-only" aria-live="polite">
        {copied ? 'Command copied to clipboard' : ''}
      </span>
    </div>
  );
};
