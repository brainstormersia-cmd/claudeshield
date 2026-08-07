'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PixelImage } from '@/components/PixelImage';
import { MascotActor } from '@/components/MascotActor';
import { CodeBlock } from '@/components/UIComponents';
import { BookOpen, ArrowRight } from 'lucide-react';
import { GithubIcon } from '@/components/GithubIcon';
import { siteContent } from '@/content/site';

export default function QuickstartPage() {
  const [activeSection, setActiveSection] = useState<'overview' | 'quickstart' | 'configuration'>('quickstart');
  const [tab1, setTab1] = useState<'git' | 'download'>('git');
  const [tab2, setTab2] = useState<'.env' | 'export'>('.env');
  const [tab3, setTab3] = useState<'bash' | 'json'>('bash');

  const code1 = {
    git: `git clone https://github.com/brainstormersia-cmd/agentrouter-autoretry-claudecode.git
cd agentrouter-autoretry-claudecode`,
    download: `curl -O https://raw.githubusercontent.com/brainstormersia-cmd/agentrouter-autoretry-claudecode/main/retry-proxy.py`
  };

  const code2 = {
    '.env': `# One command setup
python retry-proxy.py
# Answer: gateway, API key, model
# Auto-configures ~/.claude/settings.json`,
    export: `python retry-proxy.py --start --upstream https://agentrouter.org`
  };

  const code3 = {
    bash: `export ANTHROPIC_BASE_URL=http://127.0.0.1:8787
export ANTHROPIC_API_KEY=your-agentrouter-key
export CLAUDE_CODE_RETRY_WATCHDOG=1

# Now run Claude Code as usual
claude`,
    json: `{
  "env": {
    "ANTHROPIC_BASE_URL": "http://127.0.0.1:8787",
    "ANTHROPIC_API_KEY": "your-agentrouter-key",
    "CLAUDE_CODE_RETRY_WATCHDOG": "1"
  }
}`
  };

  return (
    <div className="space-y-10 py-6">
      {/* Secondary Nav - real tabs with content on this page */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 border-b border-[#2B323B]/80 pb-4 font-mono text-sm flex-wrap">
        {([
          { id: 'overview', label: 'Overview' },
          { id: 'quickstart', label: 'Quickstart' },
          { id: 'configuration', label: 'Configuration' },
        ] as const).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeSection === tab.id
                ? 'text-[#FF704D] font-bold bg-[#FF704D]/10 border border-[#FF704D]/40'
                : 'text-[#A5ADB7] hover:text-[#F4F5F6] hover:bg-[#151A20]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Hero Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2B323B] bg-[#151A20] px-4 py-1 text-xs font-mono text-[#A5ADB7]">
            <span>Get up and running in under 2 minutes.</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#F4F5F6]">
            Install <span className="font-pixel text-[#FF704D]">in minutes</span>
          </h1>

          <p className="text-base text-[#A5ADB7] leading-relaxed">
            Three simple steps to start proxying Claude API requests through AgentRouter.
          </p>
        </div>

        <MascotActor pose="walking" size={130} speechBubble="I'll guide you!" />
      </div>

      {/* Overview section */}
      {activeSection === 'overview' && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-6 space-y-3">
            <div className="text-sm font-bold text-[#FF805D] font-mono">What is ClaudeShield?</div>
            <p className="text-xs text-[#A5ADB7] leading-relaxed">
              A local reliability proxy between your client (Claude Code, OpenCode, etc.) and AgentRouter.
              It converts non-retryable gateway errors into retryable 429 responses, so your sessions stay alive.
            </p>
          </div>
          <div className="rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-6 space-y-3">
            <div className="text-sm font-bold text-[#FF805D] font-mono">What it fixes</div>
            <ul className="space-y-2 text-xs text-[#A5ADB7] leading-relaxed list-disc pl-4">
              <li>403 quota errors from AgentRouter → converted to 429 + Retry-After</li>
              <li>504 gateway timeouts → converted to retryable</li>
              <li>"Empty or malformed response (200)" → detected and retried</li>
              <li>Missing claude-cli User-Agent → injected automatically</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-6 space-y-3">
            <div className="text-sm font-bold text-[#FF805D] font-mono">Works with</div>
            <div className="flex flex-wrap gap-2">
              {['Claude Code', 'Claude Desktop', 'OpenCode', 'Codex', 'Cline', 'Roo Code'].map((c) => (
                <span key={c} className="rounded border border-[#2B323B] bg-[#11151A] px-2 py-1 text-[10px] font-mono text-[#A5ADB7]">
                  {c}
                </span>
              ))}
            </div>
            <Link href="/guides" className="text-xs font-mono text-[#FF704D] hover:text-[#FF805D]">
              Setup guides →
            </Link>
          </div>
        </div>
      )}

      {/* Configuration section */}
      {activeSection === 'configuration' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-6 space-y-4">
            <div className="text-sm font-bold text-[#F4F5F6] font-mono">settings.json</div>
            <p className="text-xs text-[#A5ADB7]">Claude Code reads this file to find the proxy:</p>
            <CodeBlock code={`{
  "env": {
    "ANTHROPIC_BASE_URL": "http://127.0.0.1:8787",
    "ANTHROPIC_API_KEY": "your-agentrouter-key",
    "CLAUDE_CODE_RETRY_WATCHDOG": "1",
    "CLAUDE_CODE_MAX_RETRIES": "300"
  }
}`} language="json" />
          </div>
          <div className="rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-6 space-y-4">
            <div className="text-sm font-bold text-[#F4F5F6] font-mono">Environment variables</div>
            <p className="text-xs text-[#A5ADB7]">For clients that read env vars (OpenCode, Codex):</p>
            <CodeBlock code={`export ANTHROPIC_BASE_URL=http://127.0.0.1:8787
export ANTHROPIC_API_KEY=your-agentrouter-key
export CLAUDE_CODE_RETRY_WATCHDOG=1

# or OpenAI-compatible clients:
export OPENAI_BASE_URL=http://127.0.0.1:8787/v1`} language="bash" />
          </div>
        </div>
      )}

      {/* 3 Step Cards Grid - shown only in Quickstart tab */}
      {activeSection === 'quickstart' && (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Step 1 */}
        <div className="rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-6 space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF704D] text-sm font-bold text-white font-mono">1</span>
            <div>
              <h3 className="font-bold text-base text-[#F4F5F6]">Clone or download</h3>
              <p className="text-xs text-[#747D88]">Get Claude Proxy running locally.</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex gap-4 border-b border-[#2B323B] pb-1 text-xs font-mono">
              <button onClick={() => setTab1('git')} className={tab1 === 'git' ? 'text-[#FF704D] font-bold border-b border-[#FF704D]' : 'text-[#A5ADB7]'}>git</button>
              <button onClick={() => setTab1('download')} className={tab1 === 'download' ? 'text-[#FF704D] font-bold border-b border-[#FF704D]' : 'text-[#A5ADB7]'}>download</button>
            </div>
            <CodeBlock code={code1[tab1]} language="bash" />
          </div>
        </div>

        {/* Step 2 */}
        <div className="rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-6 space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF704D] text-sm font-bold text-white font-mono">2</span>
            <div>
              <h3 className="font-bold text-base text-[#F4F5F6]">Set environment variables</h3>
              <p className="text-xs text-[#747D88]">Add your AgentRouter API key.</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex gap-4 border-b border-[#2B323B] pb-1 text-xs font-mono">
              <button onClick={() => setTab2('.env')} className={tab2 === '.env' ? 'text-[#FF704D] font-bold border-b border-[#FF704D]' : 'text-[#A5ADB7]'}>.env</button>
              <button onClick={() => setTab2('export')} className={tab2 === 'export' ? 'text-[#FF704D] font-bold border-b border-[#FF704D]' : 'text-[#A5ADB7]'}>export</button>
            </div>
            <CodeBlock code={code2[tab2]} language="bash" />
          </div>
        </div>

        {/* Step 3 */}
        <div className="rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-6 space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF704D] text-sm font-bold text-white font-mono">3</span>
            <div>
              <h3 className="font-bold text-base text-[#F4F5F6]">Point your client to the proxy</h3>
              <p className="text-xs text-[#747D88]">Use this endpoint in Claude Code or your client.</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex gap-4 border-b border-[#2B323B] pb-1 text-xs font-mono">
              <button onClick={() => setTab3('bash')} className={tab3 === 'bash' ? 'text-[#FF704D] font-bold border-b border-[#FF704D]' : 'text-[#A5ADB7]'}>bash</button>
              <button onClick={() => setTab3('json')} className={tab3 === 'json' ? 'text-[#FF704D] font-bold border-b border-[#FF704D]' : 'text-[#A5ADB7]'}>json</button>
            </div>
            <CodeBlock code={code3[tab3]} language="bash" />
          </div>
        </div>
      </div>
      )}

      {/* Mascot Trail Sequence matching Image 1 */}
      <div className="relative py-4 flex items-center justify-around border-y border-[#2B323B]/60">
        <div className="flex flex-col items-center gap-1">
          <PixelImage src="/assets/mascot-inspect.png" alt="Mascot Laptop" width={64} height={64} />
        </div>
        <div className="flex flex-col items-center gap-1">
          <PixelImage src="/assets/mascot-walk-1.png" alt="Mascot Key" width={64} height={64} />
        </div>
        <div className="flex flex-col items-center gap-1">
          <PixelImage src="/assets/mascot-success.png" alt="Mascot Map" width={64} height={64} />
        </div>
      </div>

      {/* 3 Bottom Feature Summary Cards matching Image 1 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-6 flex items-start gap-4">
          <PixelImage src="/assets/pixel-home-heart.png" alt="Localhost" width={48} height={48} />
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-[#F4F5F6]">Runs on localhost</h4>
            <p className="text-xs text-[#A5ADB7] leading-relaxed">
                    Your proxy runs locally on http://127.0.0.1:8787. Nothing leaves your machine except API calls to AgentRouter.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-6 flex items-start gap-4">
          <PixelImage src="/assets/pixel-shield-heart.png" alt="Key Security" width={48} height={48} />
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-[#F4F5F6]">No key leaves your machine</h4>
            <p className="text-xs text-[#A5ADB7] leading-relaxed">
              Your Anthropic API key never leaves your computer. We only proxy your requests.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-6 flex items-start gap-4">
          <PixelImage src="/assets/pixel-refresh.png" alt="AgentRouter" width={48} height={48} />
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-[#F4F5F6]">Works with AgentRouter</h4>
            <p className="text-xs text-[#A5ADB7] leading-relaxed">
                    Injects required headers and handles SSE streams for hidden errors automatically.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Footer Action Bar matching Image 1 */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#2B323B]/60 text-xs font-mono text-[#A5ADB7]">
        <div>Open source MIT licensed. Built for the community.</div>
        <div className="flex items-center gap-4">
          <a
            href={siteContent.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-[#2B323B] bg-[#151A20] px-4 py-2 text-xs font-semibold text-[#F4F5F6] hover:border-[#FF704D]"
          >
            <GithubIcon className="h-4 w-4" />
            <span>View on GitHub</span>
          </a>
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 rounded-lg bg-[#FF704D] px-4 py-2 text-xs font-bold text-white hover:bg-[#FF805D]"
          >
            <BookOpen className="h-4 w-4" />
            <span>Read the Docs</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
