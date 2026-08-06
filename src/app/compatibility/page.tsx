'use client';

import React from 'react';
import { PixelImage } from '@/components/PixelImage';
import { MascotActor } from '@/components/MascotActor';
import { CodeBlock } from '@/components/UIComponents';
import { CheckCircle2, Shield, RefreshCw, Home, TerminalSquare } from 'lucide-react';

export default function CompatibilityPage() {
  const matrixData = [
    { client: 'Claude Code', desc: 'Official CLI', icon: '/assets/badge-claude-code.png' },
    { client: 'Anthropic API', desc: 'api.anthropic.com', icon: '/assets/badge-anthropic-api.png' },
    { client: 'OpenCode', desc: 'Terminal AI agent (SST)', icon: '/assets/pixel-terminal.png' },
    { client: 'AgentRouter', desc: 'agentrouter.org', icon: '/assets/badge-agentrouter.png' },
    { client: 'Custom Clients', desc: 'Any HTTP client', icon: '/assets/pixel-terminal.png' }
  ];

  // All Anthropic-format clients get full support through the proxy
  const supported = ['Claude Code', 'Anthropic API', 'OpenCode', 'AgentRouter', 'Custom Clients'];

  return (
    <div className="space-y-8 py-6">
      {/* Hero Header Banner */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-center">
        <div className="space-y-4 lg:col-span-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2B323B] bg-[#151A20] px-4 py-1 text-xs font-mono text-[#A5ADB7]">
            <span>Works with your stack.</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#F4F5F6]">
            Compatibility <span className="font-pixel text-[#FF704D] block mt-1">&amp; Integrations</span>
          </h1>

          <p className="text-base text-[#A5ADB7] leading-relaxed">
            ClaudeShield is designed to work where you do. Use your favorite client, SDK, or gateway — the proxy handles auth and retries.
          </p>
        </div>

        {/* Right Stage: Mascot + Floating Pill Badges matching Image 5 */}
        <div className="lg:col-span-6 rounded-2xl border border-[#2B323B]/80 bg-[#11151A] p-6 relative flex items-center justify-around overflow-hidden">
          <div className="space-y-4 z-10">
            <PixelImage src="/assets/badge-claude-code.png" alt="Claude Code" width={130} height={30} />
            <PixelImage src="/assets/badge-anthropic-api.png" alt="Anthropic API" width={130} height={30} />
          </div>
          <MascotActor pose="inspecting" size={130} />
          <div className="space-y-4 z-10">
            <PixelImage src="/assets/badge-openai-compatible.png" alt="OpenAI Compatible" width={150} height={30} />
            <PixelImage src="/assets/badge-agentrouter.png" alt="AgentRouter" width={130} height={30} />
          </div>
        </div>
      </div>

      {/* Main Compatibility Table + Right Sidebar Box matching Image 5 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Matrix Table */}
        <div className="lg:col-span-8 rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-6 overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-[#2B323B] text-[#747D88]">
                <th className="py-3 px-2">Client / Gateway</th>
                <th className="py-3 px-2 text-center">Messages API</th>
                <th className="py-3 px-2 text-center">Streaming</th>
                <th className="py-3 px-2 text-center">Tool Calls</th>
                <th className="py-3 px-2 text-center">Auth</th>
                <th className="py-3 px-2 text-center">Retry Behavior</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2B323B]/60 text-[#F4F5F6]">
              {matrixData.map((row, idx) => (
                <tr key={idx}>
                  <td className="py-3 px-2">
                    <div className="font-bold flex items-center gap-2">
                      <PixelImage src={row.icon} alt={row.client} width={24} height={24} />
                      <div>
                        <div>{row.client}</div>
                        <div className="text-[10px] text-[#747D88]">{row.desc}</div>
                      </div>
                    </div>
                  </td>
                  {supported.includes(row.client) ? (
                    <>
                      <td className="py-3 px-2 text-center"><CheckCircle2 className="h-4 w-4 text-[#83D957] mx-auto" /></td>
                      <td className="py-3 px-2 text-center"><CheckCircle2 className="h-4 w-4 text-[#83D957] mx-auto" /></td>
                      <td className="py-3 px-2 text-center"><CheckCircle2 className="h-4 w-4 text-[#83D957] mx-auto" /></td>
                      <td className="py-3 px-2 text-center"><CheckCircle2 className="h-4 w-4 text-[#83D957] mx-auto" /></td>
                      <td className="py-3 px-2 text-center"><CheckCircle2 className="h-4 w-4 text-[#83D957] mx-auto" /></td>
                    </>
                  ) : (
                    <td className="py-3 px-2 text-center" colSpan={5}>
                      <span className="text-[#FFB347]">partial</span>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-[10px] text-[#747D88] pt-3">
            Anthropic-format clients (Messages API) get full support. OpenAI-format clients need a translation layer.
          </p>
        </div>

        {/* Right Sidebar Box: Best with AgentRouter */}
        <div className="lg:col-span-4 rounded-2xl border border-[#FF704D]/40 bg-[#151A20]/90 p-6 space-y-6 orange-glow-sm">
          <div>
            <h3 className="text-base font-bold text-[#FF704D] font-mono">Designed for AgentRouter</h3>
            <p className="text-xs text-[#A5ADB7] pt-1">Injects required headers. Handles Chinese error messages.</p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-[#FF704D] shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-[#F4F5F6]">Minimal request rewriting</div>
                <div className="text-[#747D88]">We translate just enough. Nothing more.</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <RefreshCw className="h-5 w-5 text-[#FF704D] shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-[#F4F5F6]">Streaming aware</div>
                <div className="text-[#747D88]">SSE peek-stream detects errors hidden in 200 responses.</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Home className="h-5 w-5 text-[#FF704D] shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-[#F4F5F6]">Local proxy mode</div>
                <div className="text-[#747D88]">Keep traffic private. Stay in control.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* OpenCode Setup Section */}
      <div className="rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-6 space-y-4">
        <div className="flex items-center gap-3">
          <TerminalSquare className="h-5 w-5 text-[#FF704D]" />
          <h2 className="text-base font-bold text-[#F4F5F6]">OpenCode (terminal AI agent)</h2>
        </div>
        <p className="text-xs text-[#A5ADB7] leading-relaxed">
          OpenCode works with ClaudeShield in both API formats. The proxy forwards requests as-is,
          and AgentRouter accepts both <code className="text-[#FF704D]">/v1/messages</code> (Anthropic)
          and <code className="text-[#FF704D]">/v1/chat/completions</code> (OpenAI-compatible).
          Tested and working.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Method 1: OpenAI-compatible (default OpenCode setup) */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-[#FF704D] font-bold">Method 1 - OpenAI-compatible (recommended)</div>
            <CodeBlock
              code={`{
  "provider": {
    "claudeshield": {
      "name": "ClaudeShield (AgentRouter)",
      "npm": "@ai-sdk/openai-compatible",
      "options": {
        "baseURL": "http://127.0.0.1:8787/v1",
        "apiKey": "your-agentrouter-key"
      },
      "models": {
        "claude-opus-5": { "name": "Claude Opus 5" }
      }
    }
  }
}`}
              language="json"
              filename="opencode.json"
            />
            <p className="text-[10px] text-[#747D88]">
              Uses <code className="text-[#FF704D]">@ai-sdk/openai-compatible</code> - the default OpenCode provider style.
            </p>
          </div>

          {/* Method 2: Anthropic Messages API */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-[#FF704D] font-bold">Method 2 - Anthropic Messages API</div>
            <CodeBlock
              code={`{
  "provider": {
    "claudeshield": {
      "name": "ClaudeShield (AgentRouter)",
      "npm": "@ai-sdk/anthropic",
      "options": {
        "baseURL": "http://127.0.0.1:8787",
        "apiKey": "your-agentrouter-key"
      },
      "models": {
        "claude-opus-5": { "name": "Claude Opus 5" }
      }
    }
  }
}`}
              language="json"
              filename="opencode.json"
            />
            <p className="text-[10px] text-[#747D88]">
              Uses <code className="text-[#FF704D]">@ai-sdk/anthropic</code> for native Messages API format.
            </p>
          </div>
        </div>

        {/* Quick env vars alternative */}
        <div className="rounded-xl border border-[#2B323B] bg-[#11151A] p-4 space-y-2">
          <div className="text-xs font-mono font-bold text-[#FF704D]">Quick alternative - Environment variables</div>
          <CodeBlock
            code={`# Terminal (macOS / Linux)
export ANTHROPIC_BASE_URL=http://127.0.0.1:8787/v1
export ANTHROPIC_API_KEY=your-agentrouter-key

# PowerShell (Windows)
$env:ANTHROPIC_BASE_URL="http://127.0.0.1:8787/v1"
$env:ANTHROPIC_API_KEY="your-agentrouter-key"

# Launch
opencode`}
            language="bash"
          />
        </div>

        <div className="rounded-xl border border-[#2B323B] bg-[#11151A] p-4 space-y-2">
          <div className="text-xs font-mono font-bold text-[#83D957]">Start the proxy first</div>
          <CodeBlock
            code={`python retry-proxy.py --start --upstream https://agentrouter.org`}
            language="bash"
          />
        </div>
      </div>

      {/* 3 Bottom Example Command Cards matching Image 5 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-5 space-y-2">
          <div className="text-xs font-mono text-[#FF704D] font-bold">Example (Claude Code)</div>
          <CodeBlock code={`ANTHROPIC_BASE_URL=http://127.0.0.1:8787
claude --dangerously-skip-permissions`} language="bash" />
        </div>

        <div className="rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-5 space-y-2">
          <div className="text-xs font-mono text-[#FF704D] font-bold">Example (Anthropic SDK)</div>
          <CodeBlock code={`const client = new Anthropic({
  baseURL: "http://127.0.0.1:8787",
  apiKey: process.env.YOUR_API_KEY
});`} language="javascript" />
        </div>

        <div className="rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-5 space-y-2">
          <div className="text-xs font-mono text-[#FF704D] font-bold">Example (cURL)</div>
          <CodeBlock code={`curl http://127.0.0.1:8787/v1/messages \\
  -H "Authorization: Bearer YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"claude-opus-5","max_tokens":64,
       "messages":[{"role":"user","content":"Hello"}]}'`} language="bash" />
        </div>
      </div>
    </div>
  );
}
