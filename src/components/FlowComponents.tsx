'use client';

import React, { useState } from 'react';
import { siteContent } from '@/content/site';
import { StatusBadge } from './UIComponents';
import { ChevronDown, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

// 1. Comparison Flow (Without Proxy vs With Proxy)
export const ComparisonFlow: React.FC = () => {
  return (
    <div className="space-y-8 rounded-2xl border border-[#2B323B] bg-[#11151A] p-6 sm:p-8">
      <h3 className="text-xl font-bold text-[#F4F5F6] text-center font-pixel">
        Request Lifecycle Comparison
      </h3>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Without Proxy Column */}
        <div className="rounded-xl border border-[#EF6258]/30 bg-[#151A20] p-5 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#EF6258] font-bold">
            <XCircle className="h-4 w-4" />
            <span>WITHOUT CLAUDE PROXY</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="rounded bg-[#2B323B] px-3 py-1.5 text-[#F4F5F6]">Request</span>
            <ArrowRight className="h-4 w-4 text-[#747D88]" />
            <span className="rounded border border-[#EF6258]/40 bg-[#EF6258]/10 px-3 py-1.5 text-[#EF6258]">
              403 Org Quota Exceeded
            </span>
            <ArrowRight className="h-4 w-4 text-[#747D88]" />
            <span className="rounded border border-[#EF6258] bg-[#EF6258] px-3 py-1.5 text-white font-bold">
              Session Breaks
            </span>
          </div>
          <p className="text-xs text-[#A5ADB7] italic">
            Your CLI request fails abruptly. You have to wait manually and rerun your command, interrupting your session state.
          </p>
        </div>

        {/* With Claude Proxy Column */}
        <div className="rounded-xl border border-[#83D957]/40 bg-[#151A20] p-5 space-y-4 orange-glow-sm">
          <div className="flex items-center gap-2 text-xs font-mono text-[#83D957] font-bold">
            <CheckCircle2 className="h-4 w-4" />
            <span>WITH CLAUDE PROXY</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="rounded bg-[#2B323B] px-2.5 py-1.5 text-[#F4F5F6]">Request</span>
            <ArrowRight className="h-3 w-3 text-[#747D88]" />
            <span className="rounded border border-[#FF704D]/40 bg-[#FF704D]/20 px-2.5 py-1.5 text-[#FF805D]">
              Proxy Intercept
            </span>
            <ArrowRight className="h-3 w-3 text-[#747D88]" />
            <span className="rounded border border-[#FFB347]/40 bg-[#FFB347]/20 px-2.5 py-1.5 text-[#FFB347]">
              Convert to 429 (Retry-After)
            </span>
            <ArrowRight className="h-3 w-3 text-[#747D88]" />
            <span className="rounded border border-[#83D957] bg-[#83D957] px-2.5 py-1.5 text-[#0B0E12] font-bold">
              Success ✓
            </span>
          </div>
          <p className="text-xs text-[#A5ADB7] italic">
            The proxy standardizes temporary quota errors into 429 Retry-After headers so your client auto-retries naturally without breaking session state.
          </p>
        </div>
      </div>
    </div>
  );
};

// 2. Exponential Backoff Chart Component using Recharts
export const BackoffChart: React.FC = () => {
  const data = [
    { attempt: 'Attempt 1', delay: 1, label: '1s' },
    { attempt: 'Attempt 2', delay: 2, label: '2s' },
    { attempt: 'Attempt 3', delay: 4, label: '4s' },
    { attempt: 'Attempt 4', delay: 8, label: '8s' },
    { attempt: 'Attempt 5+', delay: 16, label: '16s (Cap)' },
  ];

  return (
    <div className="rounded-xl border border-[#2B323B] bg-[#151A20] p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-mono text-sm font-bold text-[#F4F5F6]">Exponential Backoff Curve</h4>
        <span className="rounded border border-[#FF704D]/30 bg-[#FF704D]/10 px-2 py-0.5 text-[10px] font-mono text-[#FF805D]">
          Randomized Jitter Included
        </span>
      </div>
      <div className="h-56 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorDelay" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF704D" stopOpacity={0.6}/>
                <stop offset="95%" stopColor="#FF704D" stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2B323B" />
            <XAxis dataKey="attempt" stroke="#A5ADB7" fontSize={11} tickLine={false} />
            <YAxis stroke="#A5ADB7" fontSize={11} unit="s" tickLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: '#11151A', borderColor: '#2B323B', borderRadius: '8px' }}
              itemStyle={{ color: '#FF704D', fontFamily: 'monospace' }}
            />
            <Area type="monotone" dataKey="delay" stroke="#FF704D" strokeWidth={3} fillOpacity={1} fill="url(#colorDelay)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-[#747D88] text-center font-mono">
        Backoff doubles each retry attempt, capped at a maximum 16s timeout. Jitter prevents thundering herd spikes.
      </p>
    </div>
  );
};

// 3. Compatibility Matrix Component
export const CompatibilityMatrix: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-[#2B323B] bg-[#151A20]">
        <table className="w-full text-left text-xs font-mono">
          <thead className="border-b border-[#2B323B] bg-[#11151A] text-[#A5ADB7]">
            <tr>
              <th className="p-4 font-semibold">Client / Target</th>
              <th className="p-4 font-semibold">Messages API</th>
              <th className="p-4 font-semibold">Streaming</th>
              <th className="p-4 font-semibold">Tool Calls</th>
              <th className="p-4 font-semibold">Auth Pass-through</th>
              <th className="p-4 font-semibold">Auto Retry</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2B323B]/60 text-[#F4F5F6]">
            {siteContent.compatibility.matrix.map((row) => (
              <tr key={row.component} className="hover:bg-[#191F26]">
                <td className="p-4 font-bold text-[#F4F5F6]">
                  {row.component}
                  <div className="text-[10px] font-sans font-normal text-[#747D88] mt-0.5">{row.notes}</div>
                </td>
                <td className="p-4"><StatusBadge status={row.messagesApi} /></td>
                <td className="p-4"><StatusBadge status={row.streaming} /></td>
                <td className="p-4"><StatusBadge status={row.toolCalls} /></td>
                <td className="p-4"><StatusBadge status={row.authentication} /></td>
                <td className="p-4"><StatusBadge status={row.retryBehavior} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Card View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {siteContent.compatibility.matrix.map((row) => (
          <div key={row.component} className="rounded-xl border border-[#2B323B] bg-[#151A20] p-4 space-y-3">
            <h4 className="font-bold text-sm text-[#F4F5F6]">{row.component}</h4>
            <p className="text-xs text-[#747D88]">{row.notes}</p>
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#2B323B]">
              <div><span className="text-[10px] text-[#A5ADB7] block">Messages API:</span><StatusBadge status={row.messagesApi} /></div>
              <div><span className="text-[10px] text-[#A5ADB7] block">Streaming:</span><StatusBadge status={row.streaming} /></div>
              <div><span className="text-[10px] text-[#A5ADB7] block">Tool Calls:</span><StatusBadge status={row.toolCalls} /></div>
              <div><span className="text-[10px] text-[#A5ADB7] block">Auto Retry:</span><StatusBadge status={row.retryBehavior} /></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 4. FAQ Accordion Component
export const FAQAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(siteContent.faq[0].id);

  return (
    <div className="space-y-4">
      {siteContent.faq.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="rounded-xl border border-[#2B323B] bg-[#151A20] overflow-hidden transition-colors"
          >
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between p-5 text-left text-sm font-semibold text-[#F4F5F6] hover:text-[#FF704D] focus:outline-none"
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <ChevronDown className={`h-5 w-5 text-[#A5ADB7] transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#FF704D]' : ''}`} />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-xs sm:text-sm text-[#A5ADB7] leading-relaxed border-t border-[#2B323B]/60 pt-4">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
