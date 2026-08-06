'use client';

import React, { useState } from 'react';
import { siteContent } from '@/content/site';
import { CodeBlock } from '@/components/UIComponents';
import { MascotActor } from '@/components/MascotActor';
import { ExternalLink } from 'lucide-react';

type DocSection =
  | 'overview'
  | 'install'
  | 'configuration'
  | 'making-requests'
  | 'retries'
  | 'error-codes'
  | 'headers';

const SECTIONS: { id: DocSection; group: string; label: string }[] = [
  { id: 'overview', group: 'GETTING STARTED', label: 'Overview' },
  { id: 'install', group: 'GETTING STARTED', label: 'Install' },
  { id: 'configuration', group: 'GETTING STARTED', label: 'Configuration' },
  { id: 'making-requests', group: 'USAGE', label: 'Making Requests' },
  { id: 'retries', group: 'USAGE', label: 'Retries & Limits' },
  { id: 'error-codes', group: 'REFERENCE', label: 'Error Codes' },
  { id: 'headers', group: 'REFERENCE', label: 'Headers' },
];

export default function DocsPage() {
  const [active, setActive] = useState<DocSection>('overview');
  const [activeTab, setActiveTab] = useState<'cURL' | 'Python' | 'JavaScript'>('cURL');

  const examples = {
    cURL: `curl http://127.0.0.1:8787/v1/messages \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-opus-5",
    "max_tokens": 1024,
    "messages": [{"role": "user", "content": "Hello!"}]
  }'`,
    Python: `import anthropic

client = anthropic.Anthropic(
    base_url="http://127.0.0.1:8787",
    api_key="YOUR_API_KEY"
)

message = client.messages.create(
    model="claude-opus-5",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello!"}]
)`,
    JavaScript: `import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  baseURL: "http://127.0.0.1:8787",
  apiKey: "YOUR_API_KEY"
});

const res = await client.messages.create({
  model: "claude-opus-5",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Hello!" }]
});`
  };

  const content: Record<DocSection, { title: string; body: React.ReactNode }> = {
    overview: {
      title: 'Overview',
      body: (
        <div className="space-y-4 text-sm text-[#A5ADB7] leading-relaxed">
          <p>
            ClaudeShield is a local reliability proxy that sits between Claude Code
            (or any Anthropic-compatible client) and AgentRouter.
          </p>
          <p>It solves one problem: gateway errors that crash your session.</p>
          <div className="rounded-xl border border-[#2B323B] bg-[#11151A] p-4 font-mono text-xs space-y-2">
            <p className="text-[#83D957]"># What it does</p>
            <p className="text-[#F4F5F6]">403 quota  {'->'} 429 + Retry-After (client retries)</p>
            <p className="text-[#F4F5F6]">504 timeout {'->'} 429 + Retry-After (client retries)</p>
            <p className="text-[#F4F5F6]">200 + SSE error {'->'} 503 (client retries)</p>
            <p className="text-[#F4F5F6]">403 no model {'->'} pass through (fail fast)</p>
          </div>
          <ul className="list-disc pl-5 space-y-1">
            <li>Pure Python 3.8+ standard library - zero dependencies</li>
            <li>Runs locally on <code className="text-[#FF704D]">127.0.0.1:8787</code></li>
            <li>Injects the <code className="text-[#FF704D]">claude-cli/1.0.0</code> User-Agent AgentRouter requires</li>
            <li>Detects Chinese error messages (<code className="text-[#FF704D]">用户额度不足</code>)</li>
          </ul>
        </div>
      ),
    },
    install: {
      title: 'Install',
      body: (
        <div className="space-y-4 text-sm text-[#A5ADB7] leading-relaxed">
          <p>One command installs and launches everything:</p>
          <CodeBlock
            code={`curl -sSL https://raw.githubusercontent.com/brainstormersia-cmd/agentrouter-autoretry-claudecode/main/install.py | python`}
            language="bash"
          />
          <p>The installer:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Downloads <code className="text-[#FF704D]">retry-proxy.py</code> to <code className="text-[#FF704D]">~/.claude/</code></li>
            <li>Launches interactive setup (3 questions: gateway, key, model)</li>
            <li>Auto-configures <code className="text-[#FF704D]">~/.claude/settings.json</code></li>
          </ul>
          <p className="text-xs text-[#747D88]">Manual install:</p>
          <CodeBlock
            code={`curl -O https://raw.githubusercontent.com/brainstormersia-cmd/agentrouter-autoretry-claudecode/main/retry-proxy.py
python retry-proxy.py --start --upstream https://agentrouter.org`}
            language="bash"
          />
        </div>
      ),
    },
    configuration: {
      title: 'Configuration',
      body: (
        <div className="space-y-4 text-sm text-[#A5ADB7] leading-relaxed">
          <p>The proxy is configured via <code className="text-[#FF704D]">~/.claude/settings.json</code>:</p>
          <CodeBlock
            code={`{
  "env": {
    "ANTHROPIC_BASE_URL": "http://127.0.0.1:8787",
    "ANTHROPIC_API_KEY": "your-agentrouter-key",
    "CLAUDE_CODE_RETRY_WATCHDOG": "1",
    "CLAUDE_CODE_MAX_RETRIES": "300"
  }
}`}
            language="json"
          />
          <div className="space-y-2">
            <p className="font-mono text-xs text-[#F4F5F6]">
              <span className="text-[#FF704D]">ANTHROPIC_BASE_URL</span> - point at the proxy
            </p>
            <p className="font-mono text-xs text-[#F4F5F6]">
              <span className="text-[#FF704D]">ANTHROPIC_API_KEY</span> - your AgentRouter key
            </p>
            <p className="font-mono text-xs text-[#F4F5F6]">
              <span className="text-[#FF704D]">CLAUDE_CODE_RETRY_WATCHDOG</span> - retries 429/529 indefinitely
            </p>
            <p className="font-mono text-xs text-[#F4F5F6]">
              <span className="text-[#FF704D]">CLAUDE_CODE_MAX_RETRIES</span> - max retry attempts (300)
            </p>
          </div>
        </div>
      ),
    },
    'making-requests': {
      title: 'Making Requests',
      body: (
        <div className="space-y-4">
          <p className="text-sm text-[#A5ADB7] leading-relaxed">
            Point any Anthropic-compatible client at <code className="text-[#FF704D]">http://127.0.0.1:8787</code>.
            The proxy forwards to AgentRouter with the required headers.
          </p>
          <div className="flex gap-2 border-b border-[#2B323B] pb-2">
            {(['cURL', 'Python', 'JavaScript'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-lg px-4 py-2 text-xs font-mono font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-[#151A20] text-[#FF704D] border border-[#FF704D]/40'
                    : 'text-[#A5ADB7] hover:text-[#F4F5F6]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <CodeBlock code={examples[activeTab]} language={activeTab.toLowerCase()} />
        </div>
      ),
    },
    retries: {
      title: 'Retries & Limits',
      body: (
        <div className="space-y-4 text-sm text-[#A5ADB7] leading-relaxed">
          <p>The proxy converts errors into <code className="text-[#FF704D]">429 + Retry-After</code>.
          Claude Code's watchdog then applies exponential backoff with jitter.</p>
          <div className="rounded-xl border border-[#FF704D]/30 bg-[#FF704D]/5 p-4 space-y-2">
            <p className="font-mono text-xs font-bold text-[#FF805D]">Converted to 429 + Retry-After</p>
            <p className="text-xs">Quota/rate-limit 403 (用户额度不足) - Retry-After: 20s</p>
            <p className="text-xs">504 gateway timeout - Retry-After: 20s</p>
            <p className="text-xs">400 rate-limit - Retry-After: 20s</p>
            <p className="text-xs">5xx server errors - Retry-After: 15s</p>
            <p className="text-xs">Network errors - 503 + Retry-After: 10s</p>
          </div>
          <div className="rounded-xl border border-[#2B323B] bg-[#11151A] p-4 space-y-2">
            <p className="font-mono text-xs font-bold text-[#EF6258]">Not retried (circuit breaker)</p>
            <p className="text-xs">Invalid API key (401)</p>
            <p className="text-xs">Model not accessible (无权访问模型)</p>
            <p className="text-xs">Non-existent model (404)</p>
            <p className="text-xs">Genuine permission denials</p>
          </div>
          <p className="text-xs text-[#747D88]">
            The proxy sets Retry-After headers. The actual backoff timing is applied by
            Claude Code's CLAUDE_CODE_RETRY_WATCHDOG.
          </p>
        </div>
      ),
    },
    'error-codes': {
      title: 'Error Codes',
      body: (
        <div className="space-y-3 text-sm">
          <div className="grid grid-cols-[80px_1fr] gap-2 font-mono text-xs">
            <span className="text-[#FF704D] font-bold">401</span>
            <span className="text-[#A5ADB7]">Invalid API key. Pass through, no retry.</span>
            <span className="text-[#FF704D] font-bold">403</span>
            <span className="text-[#A5ADB7]">Quota (converted to 429) or permission denial (pass through).</span>
            <span className="text-[#FF704D] font-bold">404</span>
            <span className="text-[#A5ADB7]">Model not found. Pass through, no retry.</span>
            <span className="text-[#FF704D] font-bold">429</span>
            <span className="text-[#A5ADB7]">Rate limit. Pass through + Retry-After.</span>
            <span className="text-[#FF704D] font-bold">500</span>
            <span className="text-[#A5ADB7]">Server error. Pass through + Retry-After.</span>
            <span className="text-[#FF704D] font-bold">502</span>
            <span className="text-[#A5ADB7]">Bad gateway. Pass through + Retry-After.</span>
            <span className="text-[#FF704D] font-bold">503</span>
            <span className="text-[#A5ADB7]">Service unavailable. Pass through + Retry-After.</span>
            <span className="text-[#FF704D] font-bold">504</span>
            <span className="text-[#A5ADB7]">Gateway timeout. Converted to 429 + Retry-After.</span>
            <span className="text-[#FF704D] font-bold">520-527</span>
            <span className="text-[#A5ADB7]">Cloudflare errors. Pass through + Retry-After.</span>
          </div>
        </div>
      ),
    },
    headers: {
      title: 'Headers',
      body: (
        <div className="space-y-4 text-sm text-[#A5ADB7] leading-relaxed">
          <p>The proxy injects and forwards these headers:</p>
          <CodeBlock
            code={`# Injected by proxy
User-Agent: claude-cli/1.0.0 (external, cli)

# Forwarded from Claude Code (unchanged)
Authorization: Bearer <your-key>
x-api-key: <your-key>
anthropic-version: 2023-06-01
anthropic-beta: output-128k-2025-02-19

# Added on converted responses
Retry-After: 20`}
            language="http"
          />
          <p className="text-xs text-[#747D88]">
            The proxy never stores your key. It forwards whatever Claude Code sends.
          </p>
        </div>
      ),
    },
  };

  return (
    <div className="space-y-8 py-8 sm:py-12">
      {/* Top Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#2B323B] pb-6">
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FF704D]/30 bg-[#FF704D]/10 px-3 py-1 text-xs font-mono text-[#FF805D]">
            Documentation
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F4F5F6]">
            Read <span className="font-pixel text-[#FF704D]">the docs</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#A5ADB7]">
            Everything you need to integrate ClaudeShield with AgentRouter.
          </p>
        </div>
        <MascotActor pose="inspecting" size={80} speechBubble="Copy, paste, ship fast." />
      </div>

      {/* Docs 2-Column Layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Sidebar */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="rounded-xl border border-[#2B323B] bg-[#151A20] p-4 space-y-4 text-xs font-mono">
            {(['GETTING STARTED', 'USAGE', 'REFERENCE'] as const).map((group) => (
              <div key={group}>
                <span className="text-[#747D88] uppercase text-[10px] tracking-wider block mb-2 font-bold">{group}</span>
                <ul className="space-y-1 text-[#A5ADB7]">
                  {SECTIONS.filter((s) => s.group === group).map((s) => (
                    <li key={s.id}>
                      <button
                        onClick={() => setActive(s.id)}
                        className={`w-full text-left px-2 py-1 rounded transition-colors ${
                          active === s.id
                            ? 'font-bold text-[#FF704D] bg-[#191F26] border-l-2 border-[#FF704D]'
                            : 'hover:text-[#F4F5F6] hover:bg-[#191F26]/50'
                        }`}
                      >
                        {s.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <span className="text-[#747D88] uppercase text-[10px] tracking-wider block mb-2 font-bold">RESOURCES</span>
              <ul className="space-y-1 text-[#A5ADB7]">
                <li><a href="/faq" className="block px-2 py-1 hover:text-[#F4F5F6]">FAQ</a></li>
                <li>
                  <a href={siteContent.githubUrl} target="_blank" rel="noopener noreferrer" className="px-2 py-1 hover:text-[#FF704D] flex items-center justify-between">
                    <span>GitHub</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Main Content - Dynamic */}
        <main className="lg:col-span-6 space-y-4">
          <h2 className="text-xl font-bold text-[#F4F5F6]">{content[active].title}</h2>
          {content[active].body}
        </main>

        {/* Right Rail - Quick Stats */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="rounded-xl border border-[#2B323B] bg-[#151A20] p-4 space-y-2">
            <span className="text-xs font-mono font-bold text-[#F4F5F6] block">Quick Facts</span>
            <div className="space-y-1.5 text-xs text-[#A5ADB7]">
              <p className="flex justify-between"><span>Port</span><span className="text-[#FF704D] font-mono">8787</span></p>
              <p className="flex justify-between"><span>Language</span><span className="text-[#FF704D] font-mono">Python 3.8+</span></p>
              <p className="flex justify-between"><span>Dependencies</span><span className="text-[#FF704D] font-mono">Zero</span></p>
              <p className="flex justify-between"><span>Upstream</span><span className="text-[#FF704D] font-mono">agentrouter.org</span></p>
            </div>
          </div>

          <div className="rounded-xl border border-[#FF704D]/40 bg-[#FF704D]/10 p-4 space-y-3 orange-glow-sm">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#FF805D]">
              <span>Retry-After Header</span>
            </div>
            <p className="text-xs text-[#A5ADB7] leading-relaxed">
              When rate limited, we return a 429 status with a Retry-After header (in seconds). Respect it to avoid further limits.
            </p>
            <div className="rounded border border-[#FF704D]/30 bg-[#151A20] p-2 text-xs font-mono text-[#FF704D]">
              Retry-After: 20
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
