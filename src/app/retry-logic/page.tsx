'use client';

import React, { useState } from 'react';
import { PixelImage } from '@/components/PixelImage';
import { CodeBlock } from '@/components/UIComponents';
import { BackoffChart } from '@/components/FlowComponents';
import { ShieldCheck, Clock, Server, Monitor, Shield } from 'lucide-react';
import { GithubIcon } from '@/components/GithubIcon';

export default function RetryLogicPage() {
  const [activeTab, setActiveTab] = useState<'cURL' | 'JavaScript' | 'Python'>('cURL');

  const exampleCode = {
    cURL: `curl https://your-proxy.local/v1/messages \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-3-opus-20240229",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'`,
    JavaScript: `import Anthropic from '@anthropic-ai/sdk';
const anthropic = new Anthropic({ baseURL: 'http://localhost:3000' });`,
    Python: `import anthropic
client = anthropic.Anthropic(base_url="http://localhost:3000")`
  };

  const response429Json = `HTTP/1.1 429 Too Many Requests
Retry-After: 12
Content-Type: application/json

{
  "error": {
    "type": "rate_limit",
    "message": "Rate limit exceeded",
    "retry_after": 12
  }
}`;

  return (
    <div className="space-y-8 py-6">
      {/* Top Banner Header */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-center">
        <div className="space-y-4 lg:col-span-6">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#F4F5F6]">
            Retry Logic <span className="font-pixel text-[#FF704D] block mt-1">Smarter failure handling.</span>
          </h1>

          <p className="text-base text-[#A5ADB7] leading-relaxed">
            Claude Proxy automatically detects temporary failures, respects rate limits, and retries with exponential backoff — so your coding sessions stay alive.
          </p>
        </div>

        {/* 4-Step Sequence with Mascot Traveler matching Image 2 */}
        <div className="lg:col-span-6 rounded-2xl border border-[#2B323B]/80 bg-[#11151A] p-6 space-y-4">
          <div className="flex items-center justify-around">
            <PixelImage src="/assets/mascot-walk-1.png" alt="Mascot 1" width={44} height={44} />
            <PixelImage src="/assets/mascot-inspect.png" alt="Mascot 2" width={44} height={44} />
            <PixelImage src="/assets/mascot-walk-2.png" alt="Mascot 3" width={44} height={44} />
            <PixelImage src="/assets/mascot-success.png" alt="Mascot 4" width={44} height={44} />
          </div>

          <div className="grid grid-cols-4 gap-2 pt-2 border-t border-[#2B323B] text-[11px] font-mono">
            <div className="space-y-1">
              <span className="inline-block rounded border border-[#2B323B] bg-[#151A20] px-1.5 py-0.5 text-[#F4F5F6] font-bold">1</span>
              <div className="font-bold text-[#F4F5F6]">Timeout</div>
              <div className="text-[#747D88]">Network</div>
            </div>

            <div className="space-y-1">
              <span className="inline-block rounded border border-[#2B323B] bg-[#151A20] px-1.5 py-0.5 text-[#F4F5F6] font-bold">2</span>
              <div className="font-bold text-[#F4F5F6]">Capacity</div>
              <div className="text-[#747D88]">529</div>
            </div>

            <div className="space-y-1">
              <span className="inline-block rounded border border-[#2B323B] bg-[#151A20] px-1.5 py-0.5 text-[#F4F5F6] font-bold">3</span>
              <div className="font-bold text-[#F4F5F6]">Server Error</div>
              <div className="text-[#747D88]">5xx</div>
            </div>

            <div className="space-y-1">
              <span className="inline-block rounded border border-[#83D957]/40 bg-[#83D957]/10 px-1.5 py-0.5 text-[#83D957] font-bold">4</span>
              <div className="font-bold text-[#83D957]">Quota Exceeded</div>
              <div className="text-[#83D957]">403 ➔ 429</div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Row: 2 Big Cards matching Image 2 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Card 1: Intelligent Rate Limit Handling */}
        <div className="lg:col-span-6 rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-6 space-y-6">
          <h3 className="text-base font-bold text-[#FF704D] font-mono">Intelligent Rate Limit Handling</h3>

          <div className="grid grid-cols-3 gap-3 items-center text-center font-mono">
            {/* 403 Box */}
            <div className="rounded-xl border border-[#EF6258]/40 bg-[#EF6258]/10 p-3 space-y-1">
              <div className="text-xs text-[#EF6258]">Quota Exceeded</div>
              <div className="text-2xl font-bold text-[#EF6258]">403</div>
            </div>

            {/* 429 Converted Box */}
            <div className="rounded-xl border border-[#FF704D]/40 bg-[#FF704D]/10 p-3 space-y-1">
              <div className="text-xs text-[#FF805D]">Converted & Retried</div>
              <div className="text-2xl font-bold text-[#FF704D]">429</div>
              <div className="text-[10px] text-[#A5ADB7]">Retry-After: 12s</div>
            </div>

            {/* Session Stays Alive Box */}
            <div className="rounded-xl border border-[#83D957]/40 bg-[#83D957]/10 p-3 space-y-1">
              <ShieldCheck className="h-5 w-5 text-[#83D957] mx-auto" />
              <div className="text-xs font-bold text-[#83D957]">Session Stays Alive</div>
            </div>
          </div>

          <p className="text-xs text-[#A5ADB7] leading-relaxed border-t border-[#2B323B]/60 pt-4">
            We normalize 403 rate limit responses into 429 with Retry-After and retry automatically — no action needed.
          </p>
        </div>

        {/* Card 2: Exponential Backoff */}
        <div className="lg:col-span-6 rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#FF704D] font-mono">Exponential Backoff</h3>
            <span className="text-xs font-mono text-[#747D88] rounded border border-[#2B323B] px-2 py-0.5">Jitter included</span>
          </div>

          <BackoffChart />

          <p className="text-xs text-[#A5ADB7] leading-relaxed border-t border-[#2B323B]/60 pt-4">
            Backoff doubles each time, up to a safe maximum. Jitter prevents thundering herd.
          </p>
        </div>
      </div>

      {/* Bottom Row: 2 Big Cards matching Image 2 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: What We Retry */}
        <div className="lg:col-span-6 rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-6 space-y-4">
          <h3 className="text-base font-bold text-[#F4F5F6] font-mono">What We Retry (Automatically)</h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="space-y-1">
              <Clock className="h-5 w-5 text-[#FF704D]" />
              <div className="font-bold text-xs text-[#F4F5F6]">Timeouts</div>
              <div className="text-[11px] text-[#747D88]">No response in time.</div>
            </div>

            <div className="space-y-1">
              <Server className="h-5 w-5 text-[#FF704D]" />
              <div className="font-bold text-xs text-[#F4F5F6]">Capacity Errors</div>
              <div className="text-[11px] text-[#747D88]">529, overloaded upstream.</div>
            </div>

            <div className="space-y-1">
              <Monitor className="h-5 w-5 text-[#FF704D]" />
              <div className="font-bold text-xs text-[#F4F5F6]">Server Errors</div>
              <div className="text-[11px] text-[#747D88]">500, 502, 503, 504.</div>
            </div>

            <div className="space-y-1">
              <Shield className="h-5 w-5 text-[#FF704D]" />
              <div className="font-bold text-xs text-[#F4F5F6]">Rate Limits</div>
              <div className="text-[11px] text-[#747D88]">403 (quota) ➔ 429</div>
            </div>
          </div>

          <p className="text-xs text-[#747D88] pt-2 border-t border-[#2B323B]/60">
            We do not retry 4xx errors other than rate limits, or client-side issues.
          </p>
        </div>

        {/* Right: Code snippet & 429 Normalized Payload */}
        <div className="lg:col-span-6 rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-6 space-y-4">
          <div className="flex items-center gap-4 border-b border-[#2B323B] pb-2 font-mono text-xs">
            <button onClick={() => setActiveTab('cURL')} className={activeTab === 'cURL' ? 'text-[#FF704D] font-bold border-b border-[#FF704D]' : 'text-[#A5ADB7]'}>cURL</button>
            <button onClick={() => setActiveTab('JavaScript')} className={activeTab === 'JavaScript' ? 'text-[#FF704D] font-bold border-b border-[#FF704D]' : 'text-[#A5ADB7]'}>JavaScript</button>
            <button onClick={() => setActiveTab('Python')} className={activeTab === 'Python' ? 'text-[#FF704D] font-bold border-b border-[#FF704D]' : 'text-[#A5ADB7]'}>Python</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CodeBlock code={exampleCode[activeTab]} language="bash" />
            <CodeBlock code={response429Json} language="http" />
          </div>
        </div>
      </div>

      {/* Footer Strip matching Image 2 */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#2B323B]/60 text-xs font-mono text-[#A5ADB7]">
        <div>Reliability by default. Productivity by design.</div>
        <div className="flex items-center gap-2">
          <GithubIcon className="h-4 w-4 text-[#A5ADB7]" />
          <span>Open source • MIT License</span>
        </div>
      </div>
    </div>
  );
}
