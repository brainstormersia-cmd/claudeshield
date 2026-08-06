'use client';

import React from 'react';
import { PixelImage } from '@/components/PixelImage';
import { MascotActor } from '@/components/MascotActor';
import { CodeBlock } from '@/components/UIComponents';
import { CheckCircle2, Shield, RefreshCw, Home } from 'lucide-react';

export default function CompatibilityPage() {
  const matrixData = [
    { client: 'Claude Code', desc: 'Official CLI', icon: '/assets/badge-claude-code.png' },
    { client: 'Anthropic API', desc: 'api.anthropic.com', icon: '/assets/badge-anthropic-api.png' },
    { client: 'OpenAI-Compatible', desc: 'OpenAI style endpoints', icon: '/assets/badge-openai-compatible.png' },
    { client: 'AgentRouter', desc: 'agentrouter.ai', icon: '/assets/badge-agentrouter.png' },
    { client: 'Custom Clients', desc: 'Any HTTP client', icon: '/assets/pixel-terminal.png' }
  ];

  return (
    <div className="space-y-8 py-6">
      {/* Hero Header Banner */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-center">
        <div className="space-y-4 lg:col-span-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2B323B] bg-[#151A20] px-4 py-1 text-xs font-mono text-[#A5ADB7]">
            <span className="text-[#FF704D]">⚡</span>
            <span>Works with your stack.</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#F4F5F6]">
            Compatibility <span className="font-pixel text-[#FF704D] block mt-1">&amp; Integrations</span>
          </h1>

          <p className="text-base text-[#A5ADB7] leading-relaxed">
            Claude Proxy is designed to work where you do. Use your favorite client, SDK, or gateway — we handle the rest.
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
                <th className="py-3 px-2 text-center">Chat Completions</th>
                <th className="py-3 px-2 text-center">Messages</th>
                <th className="py-3 px-2 text-center">Streaming</th>
                <th className="py-3 px-2 text-center">Tools / Functions</th>
                <th className="py-3 px-2 text-center">Auth</th>
                <th className="py-3 px-2 text-center">Rate Limit</th>
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
                  <td className="py-3 px-2 text-center"><CheckCircle2 className="h-4 w-4 text-[#83D957] mx-auto" /></td>
                  <td className="py-3 px-2 text-center"><CheckCircle2 className="h-4 w-4 text-[#83D957] mx-auto" /></td>
                  <td className="py-3 px-2 text-center"><CheckCircle2 className="h-4 w-4 text-[#83D957] mx-auto" /></td>
                  <td className="py-3 px-2 text-center"><CheckCircle2 className="h-4 w-4 text-[#83D957] mx-auto" /></td>
                  <td className="py-3 px-2 text-center"><CheckCircle2 className="h-4 w-4 text-[#83D957] mx-auto" /></td>
                  <td className="py-3 px-2 text-center"><CheckCircle2 className="h-4 w-4 text-[#83D957] mx-auto" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Sidebar Box: Best with AgentRouter */}
        <div className="lg:col-span-4 rounded-2xl border border-[#FF704D]/40 bg-[#151A20]/90 p-6 space-y-6 orange-glow-sm">
          <div>
            <h3 className="text-base font-bold text-[#FF704D] font-mono">Best with AgentRouter</h3>
            <p className="text-xs text-[#A5ADB7] pt-1">Native integration. Smarter routing. Better reliability.</p>
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
                <div className="text-[#747D88]">Full support for SSE and chunked responses.</div>
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

      {/* 3 Bottom Example Command Cards matching Image 5 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-5 space-y-2">
          <div className="text-xs font-mono text-[#FF704D] font-bold">Example (OpenAI-Compatible)</div>
          <div className="text-xs font-mono text-[#A5ADB7]">Base URL: https://your-proxy.local/v1</div>
          <div className="text-xs font-mono text-[#A5ADB7]">Headers: Authorization: Bearer YOUR_API_KEY</div>
        </div>

        <div className="rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-5 space-y-2">
          <div className="text-xs font-mono text-[#FF704D] font-bold">Example (Anthropic SDK)</div>
          <CodeBlock code={`const client = new Anthropic({
  baseURL: "https://your-proxy.local/v1",
  apiKey: process.env.YOUR_API_KEY
});`} language="javascript" />
        </div>

        <div className="rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-5 space-y-2">
          <div className="text-xs font-mono text-[#FF704D] font-bold">Example (Claude Code)</div>
          <CodeBlock code={`claude --api-base https://your-proxy.local/v1`} language="bash" />
        </div>
      </div>
    </div>
  );
}
