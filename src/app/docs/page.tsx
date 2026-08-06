'use client';

import React, { useState } from 'react';
import { siteContent } from '@/content/site';
import { CodeBlock } from '@/components/UIComponents';
import { MascotActor } from '@/components/MascotActor';
import { ExternalLink } from 'lucide-react';

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState<'cURL' | 'Python' | 'JavaScript'>('cURL');

  const examples = {
    cURL: `curl https://your-proxy.local/v1/messages \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-3-opus-20240229",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'`,
    Python: `import requests, json

url = "https://your-proxy.local/v1/messages"
headers = {"Authorization": "Bearer YOUR_API_KEY", "Content-Type": "application/json"}
payload = {"model": "claude-3-opus-20240229", "messages": [{"role": "user", "content": "Hello!"}]}

res = requests.post(url, headers=headers, data=json.dumps(payload))
print(res.json())`,
    JavaScript: `const res = await fetch("https://your-proxy.local/v1/messages", {
  method: "POST",
  headers: {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: "claude-3-opus-20240229",
    messages: [{ role: "user", content: "Hello!" }]
  })
});
const data = await res.json();
console.log(data);`
  };

  const sampleRequestJson = `POST /v1/messages

{
  "model": "claude-3-opus-20240229",
  "messages": [
    {"role": "user", "content": "Hello!"}
  ]
}`;

  const sampleResponseJson = `200 OK

{
  "id": "msg_01Hxyz...",
  "object": "message",
  "role": "assistant",
  "content": "👋 Hello! How can I help you today?",
  "usage": {
    "input_tokens": 12,
    "output_tokens": 18
  }
}`;

  return (
    <div className="space-y-8 py-8 sm:py-12">
      {/* Top Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#2B323B] pb-6">
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FF704D]/30 bg-[#FF704D]/10 px-3 py-1 text-xs font-mono text-[#FF805D]">
            &lt;/&gt; Examples
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F4F5F6]">
            Read <span className="font-pixel text-[#FF704D]">the docs</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#A5ADB7]">
            Everything you need to integrate Claude Proxy into your AgentRouter-powered applications.
          </p>
        </div>
        <MascotActor pose="inspecting" size={80} speechBubble="Copy, paste, ship fast." />
      </div>

      {/* Docs 3-Column Layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Sidebar */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="rounded-xl border border-[#2B323B] bg-[#151A20] p-4 space-y-4 text-xs font-mono">
            <div>
              <span className="text-[#747D88] uppercase text-[10px] tracking-wider block mb-2 font-bold">GETTING STARTED</span>
              <ul className="space-y-1 text-[#A5ADB7]">
                <li className="px-2 py-1 hover:text-[#F4F5F6] cursor-pointer">Overview</li>
                <li className="px-2 py-1 hover:text-[#F4F5F6] cursor-pointer">Install</li>
                <li className="px-2 py-1 hover:text-[#F4F5F6] cursor-pointer">Configuration</li>
              </ul>
            </div>

            <div>
              <span className="text-[#747D88] uppercase text-[10px] tracking-wider block mb-2 font-bold">USAGE</span>
              <ul className="space-y-1 text-[#A5ADB7]">
                <li className="px-2 py-1 hover:text-[#F4F5F6] cursor-pointer">Making Requests</li>
                <li className="px-2 py-1 font-bold text-[#FF704D] bg-[#191F26] rounded border-l-2 border-[#FF704D]">Code Examples</li>
                <li className="px-2 py-1 hover:text-[#F4F5F6] cursor-pointer">Retries & Limits</li>
              </ul>
            </div>

            <div>
              <span className="text-[#747D88] uppercase text-[10px] tracking-wider block mb-2 font-bold">REFERENCE</span>
              <ul className="space-y-1 text-[#A5ADB7]">
                <li className="px-2 py-1 hover:text-[#F4F5F6] cursor-pointer">Error Codes</li>
                <li className="px-2 py-1 hover:text-[#F4F5F6] cursor-pointer">Headers</li>
              </ul>
            </div>

            <div>
              <span className="text-[#747D88] uppercase text-[10px] tracking-wider block mb-2 font-bold">RESOURCES</span>
              <ul className="space-y-1 text-[#A5ADB7]">
                <li className="px-2 py-1 hover:text-[#F4F5F6] cursor-pointer">FAQ</li>
                <li>
                  <a href={siteContent.githubUrl} target="_blank" rel="noopener noreferrer" className="px-2 py-1 hover:text-[#FF704D] flex items-center justify-between">
                    <span>GitHub</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Left Mascot Box */}
          <div className="rounded-xl border border-[#2B323B] bg-[#11151A] p-4 text-center space-y-3 relative">
            <MascotActor pose="idle" size={56} className="mx-auto" />
            <p className="text-xs text-[#A5ADB7] leading-relaxed">
              Need help? Check the FAQ or open an issue on GitHub. ❤
            </p>
          </div>
        </aside>

        {/* Center Code Examples */}
        <main className="lg:col-span-6 space-y-6">
          {/* Tab buttons */}
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

          {/* Code Block Snippet */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-xs text-[#F4F5F6] font-bold">{activeTab} Example</h3>
            </div>
            <CodeBlock code={examples[activeTab]} language={activeTab.toLowerCase()} />
          </div>
        </main>

        {/* Right Rail Examples & Cards */}
        <aside className="lg:col-span-3 space-y-6">
          {/* Example Request */}
          <div className="rounded-xl border border-[#2B323B] bg-[#151A20] p-4 space-y-2">
            <span className="text-xs font-mono font-bold text-[#F4F5F6] block">Example Request</span>
            <CodeBlock code={sampleRequestJson} language="http" />
          </div>

          {/* Example Response */}
          <div className="rounded-xl border border-[#2B323B] bg-[#151A20] p-4 space-y-2">
            <span className="text-xs font-mono font-bold text-[#83D957] block">Example Response</span>
            <CodeBlock code={sampleResponseJson} language="json" />
          </div>

          {/* Retry-After Header Info Card */}
          <div className="rounded-xl border border-[#FF704D]/40 bg-[#FF704D]/10 p-4 space-y-3 orange-glow-sm">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#FF805D]">
              <span>⚡ Retry-After Header</span>
            </div>
            <p className="text-xs text-[#A5ADB7] leading-relaxed">
              When rate limited, we return a 429 status with a Retry-After header (in seconds). Respect it to avoid further limits.
            </p>
            <div className="rounded border border-[#FF704D]/30 bg-[#151A20] p-2 text-xs font-mono text-[#FF704D]">
              Retry-After: 12
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
