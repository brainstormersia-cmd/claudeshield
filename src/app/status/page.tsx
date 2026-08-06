'use client';

import React from 'react';
import { MascotActor } from '@/components/MascotActor';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

export default function StatusPage() {
  const chartData = [
    { time: '00:00', requests: 24000 },
    { time: '04:00', requests: 42000 },
    { time: '08:00', requests: 68000 },
    { time: '12:00', requests: 52000 },
    { time: '16:00', requests: 84000 },
    { time: '20:00', requests: 61000 },
    { time: '24:00', requests: 48000 }
  ];

  const recentIncidents = [
    { date: 'May 6, 09:42', title: 'Elevated latency in us-east-1', duration: 'Resolved 12m', status: 'resolved' },
    { date: 'May 6, 07:18', title: 'High retry rate due to upstream timeouts', duration: 'Resolved 47m', status: 'resolved' },
    { date: 'May 5, 22:31', title: 'Brief traffic spike handled', duration: 'Resolved 9m', status: 'resolved' }
  ];

  const retryEvents = [
    { time: '09:43:21', model: 'claude-3-opus', reason: 'rate_limit', retries: 2 },
    { time: '09:43:18', model: 'claude-3-sonnet', reason: 'timeout', retries: 1 },
    { time: '09:43:15', model: 'claude-3-opus', reason: 'server_error', retries: 2 },
    { time: '09:43:12', model: 'claude-3-haiku', reason: 'overloaded', retries: 1 },
    { time: '09:43:09', model: 'claude-3-sonnet', reason: 'timeout', retries: 2 }
  ];

  return (
    <div className="space-y-8 py-6">
      {/* Hero Banner Header */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-center">
        <div className="space-y-4 lg:col-span-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2B323B] bg-[#151A20] px-4 py-1 text-xs font-mono text-[#A5ADB7]">
            <span className="h-2 w-2 rounded-full bg-[#83D957] animate-ping" />
            <span>Status / Observability</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#F4F5F6]">
            System Status <span className="font-pixel text-[#FF704D] block mt-1">&amp; Observability</span>
          </h1>

          <p className="text-base text-[#A5ADB7] leading-relaxed">
            Real-time insights into Claude Proxy performance, reliability, and health.
          </p>
          <div className="text-xs font-mono text-[#747D88]">Live data • Auto-refresh every 10s</div>
        </div>

        {/* Right Stage: Mascot + Traffic Area Chart matching Image 3 */}
        <div className="lg:col-span-6 rounded-2xl border border-[#2B323B]/80 bg-[#11151A] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#2B323B] pb-3 text-xs font-mono text-[#A5ADB7]">
            <span className="font-bold text-[#F4F5F6]">Proxied Requests (24h)</span>
            <div className="flex items-center gap-2">
              <MascotActor pose="inspecting" size={42} speechBubble="Checking request flow..." />
            </div>
          </div>

          <div className="h-[140px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF704D" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#FF704D" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#747D88" fontSize={10} tickLine={false} />
                <YAxis stroke="#747D88" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#151A20', borderColor: '#2B323B', color: '#F4F5F6', fontSize: 12 }} />
                <Area type="monotone" dataKey="requests" stroke="#FF704D" strokeWidth={2} fillOpacity={1} fill="url(#colorReq)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 5 Health Stat Cards matching Image 3 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-5">
        <div className="rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-5 space-y-2">
          <div className="text-xs font-mono text-[#747D88]">Uptime (30d)</div>
          <div className="text-2xl font-bold text-[#F4F5F6] font-mono">99.9%</div>
          <div className="text-[11px] text-[#83D957]">Total uptime</div>
        </div>

        <div className="rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-5 space-y-2">
          <div className="text-xs font-mono text-[#747D88]">Proxied Requests (24h)</div>
          <div className="text-2xl font-bold text-[#F4F5F6] font-mono">2.14M</div>
          <div className="text-[11px] text-[#A5ADB7]">Total requests</div>
        </div>

        <div className="rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-5 space-y-2">
          <div className="text-xs font-mono text-[#747D88]">Retry Rate (24h)</div>
          <div className="text-2xl font-bold text-[#FF704D] font-mono">2.1%</div>
          <div className="text-[11px] text-[#A5ADB7]">Of total requests</div>
        </div>

        <div className="rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-5 space-y-2">
          <div className="text-xs font-mono text-[#747D88]">Median Added Latency</div>
          <div className="text-2xl font-bold text-[#F4F5F6] font-mono">120ms</div>
          <div className="text-[11px] text-[#83D957]">P50 latency</div>
        </div>

        <div className="rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-5 space-y-2">
          <div className="text-xs font-mono text-[#747D88]">Proxy Health</div>
          <div className="text-2xl font-bold text-[#83D957] font-mono">Healthy</div>
          <div className="text-[11px] text-[#83D957]">All systems operational</div>
        </div>
      </div>

      {/* Bottom Grid: Recent Incidents & Latest Retry Events matching Image 3 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Recent Incidents */}
        <div className="lg:col-span-5 rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#2B323B] pb-3">
            <h3 className="font-bold text-sm text-[#F4F5F6]">Recent Incidents</h3>
            <span className="text-xs font-mono text-[#FF704D] hover:underline cursor-pointer">View all incidents ➔</span>
          </div>

          <div className="space-y-3">
            {recentIncidents.map((inc, idx) => (
              <div key={idx} className="flex items-start justify-between p-2.5 rounded-lg border border-[#2B323B]/60 bg-[#11151A]">
                <div className="space-y-1">
                  <div className="text-[11px] font-mono text-[#747D88]">{inc.date}</div>
                  <div className="text-xs font-medium text-[#F4F5F6]">{inc.title}</div>
                </div>
                <span className="text-[10px] font-mono text-[#83D957] bg-[#83D957]/10 px-2 py-0.5 rounded border border-[#83D957]/30">
                  {inc.duration}
                </span>
              </div>
            ))}
          </div>

          <div className="text-xs font-mono text-[#83D957] flex items-center gap-2 pt-2">
            <span>✓ All systems operational</span>
          </div>
        </div>

        {/* Latest Retry Events Table */}
        <div className="lg:col-span-7 rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-6 space-y-4 relative">
          <div className="flex items-center justify-between border-b border-[#2B323B] pb-3">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-[#F4F5F6]">Latest Retry Events</h3>
              <span className="text-[10px] font-mono bg-[#83D957]/10 text-[#83D957] border border-[#83D957]/30 px-2 py-0.5 rounded">Live</span>
            </div>
            <MascotActor pose="inspecting" size={48} speechBubble="Peeking at incidents..." />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#2B323B] text-[#747D88]">
                  <th className="py-2">Time</th>
                  <th className="py-2">Model</th>
                  <th className="py-2">Reason</th>
                  <th className="py-2">Retries</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2B323B]/60 text-[#F4F5F6]">
                {retryEvents.map((ev, idx) => (
                  <tr key={idx}>
                    <td className="py-2.5 text-[#747D88]">{ev.time}</td>
                    <td className="py-2.5">{ev.model}</td>
                    <td className="py-2.5 text-[#FF704D]">{ev.reason}</td>
                    <td className="py-2.5 font-bold">{ev.retries}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Regional Health Bar Footer matching Image 3 */}
      <div className="rounded-xl border border-[#2B323B] bg-[#11151A] p-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#A5ADB7]">
        <div className="flex flex-wrap items-center gap-6">
          <span className="font-bold text-[#F4F5F6]">Regional Health:</span>
          <span>us-east-1 <span className="text-[#83D957]">● Healthy</span></span>
          <span>us-west-2 <span className="text-[#83D957]">● Healthy</span></span>
          <span>eu-central-1 <span className="text-[#83D957]">● Healthy</span></span>
          <span>ap-southeast-1 <span className="text-[#FFB347]">● Degraded</span></span>
          <span>sa-east-1 <span className="text-[#83D957]">● Healthy</span></span>
        </div>
        <span className="text-[#FF704D] hover:underline cursor-pointer">View status page ➔</span>
      </div>
    </div>
  );
}
