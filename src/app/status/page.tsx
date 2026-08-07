'use client';

import React, { useState, useEffect } from 'react';
import { MascotActor } from '@/components/MascotActor';
import { siteContent } from '@/content/site';

interface ProxyStats {
  version: string;
  upstream: string;
  uptime_seconds: number;
  uptime_human: string;
  requests: number;
  converted: number;
  passed: number;
  errors: number;
  retry_rate: number;
  timestamp: string;
}

export default function StatusPage() {
  const [stats, setStats] = useState<ProxyStats | null>(null);
  const [connected, setConnected] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const endpoint = siteContent.statusEndpoint || 'http://127.0.0.1:8787/stats';

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(endpoint, { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setStats(data);
        setConnected(true);
        setError(null);
      } catch (e) {
        setConnected(false);
        setError(e instanceof Error ? e.message : String(e));
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, [endpoint]);

  return (
    <div className="space-y-8 py-6">
      {/* Hero Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#2B323B] pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2B323B] bg-[#151A20] px-4 py-1 text-xs font-mono text-[#A5ADB7]">
            <span className={`h-2 w-2 rounded-full ${connected === null ? 'bg-[#FFB347]' : connected ? 'bg-[#83D957]' : 'bg-[#EF6258]'}`} />
            <span>{connected === null ? 'Checking...' : connected ? 'Proxy Online' : 'Proxy Offline'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F4F5F6]">
            Proxy <span className="font-pixel text-[#FF704D]">status</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#A5ADB7]">
            Live telemetry from your local ClaudeShield instance.
          </p>
        </div>
        <MascotActor pose={connected ? 'success' : 'inspecting'} size={80} />
      </div>

      {connected === false && (
        <div className="rounded-2xl border border-[#FFB347]/40 bg-[#FFB347]/5 p-6 space-y-3">
          <div className="text-sm font-bold text-[#FFB347] font-mono">Proxy not reachable</div>
          <p className="text-xs text-[#A5ADB7] leading-relaxed">
            Could not reach <code className="text-[#FF805D]">{endpoint}</code>. This page shows
            telemetry from your <b>local</b> proxy instance — it is not a public service.
          </p>
          <div className="rounded-xl border border-[#2B323B] bg-[#0B0E12] px-4 py-3 font-mono text-xs text-[#A5ADB7]">
            <span className="text-[#FF704D]">$</span> python retry-proxy.py --start --upstream https://agentrouter.org
          </div>
          {error && <div className="text-[11px] text-[#EF6258] font-mono">Error: {error}</div>}
        </div>
      )}

      {connected === true && stats && (
        <>
          {/* Stat Cards */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            <div className="rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-5 space-y-2">
              <div className="text-xs font-mono text-[#747D88]">Version</div>
              <div className="text-xl font-bold text-[#F4F5F6] font-mono">v{stats.version}</div>
            </div>
            <div className="rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-5 space-y-2">
              <div className="text-xs font-mono text-[#747D88]">Uptime</div>
              <div className="text-xl font-bold text-[#F4F5F6] font-mono">{stats.uptime_human}</div>
            </div>
            <div className="rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-5 space-y-2">
              <div className="text-xs font-mono text-[#747D88]">Requests</div>
              <div className="text-xl font-bold text-[#F4F5F6] font-mono">{stats.requests.toLocaleString()}</div>
            </div>
            <div className="rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-5 space-y-2">
              <div className="text-xs font-mono text-[#747D88]">Converted → 429</div>
              <div className="text-xl font-bold text-[#FF805D] font-mono">{stats.converted.toLocaleString()}</div>
            </div>
            <div className="rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-5 space-y-2">
              <div className="text-xs font-mono text-[#747D88]">Errors</div>
              <div className="text-xl font-bold text-[#EF6258] font-mono">{stats.errors.toLocaleString()}</div>
            </div>
          </div>

          {/* Details */}
          <div className="rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-6 space-y-4">
            <div className="text-sm font-bold text-[#F4F5F6] font-mono">Session details</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="rounded-xl border border-[#2B323B] bg-[#11151A] p-4 space-y-2">
                <div className="text-[#747D88]">Upstream</div>
                <div className="text-[#F4F5F6] break-all">{stats.upstream}</div>
              </div>
              <div className="rounded-xl border border-[#2B323B] bg-[#11151A] p-4 space-y-2">
                <div className="text-[#747D88]">Retry rate</div>
                <div className="text-[#FF805D] text-base font-bold">{(stats.retry_rate * 100).toFixed(2)}%</div>
              </div>
              <div className="rounded-xl border border-[#2B323B] bg-[#11151A] p-4 space-y-2">
                <div className="text-[#747D88]">Passed through</div>
                <div className="text-[#F4F5F6]">{stats.passed.toLocaleString()}</div>
              </div>
              <div className="rounded-xl border border-[#2B323B] bg-[#11151A] p-4 space-y-2">
                <div className="text-[#747D88]">Last update</div>
                <div className="text-[#F4F5F6]">{stats.timestamp}</div>
              </div>
            </div>
            <p className="text-[11px] text-[#747D88] font-mono">
              Auto-refresh every 10s. Data is local to this machine — the proxy never sends telemetry anywhere.
            </p>
          </div>
        </>
      )}

      {connected === null && (
        <div className="rounded-2xl border border-[#2B323B]/80 bg-[#151A20]/90 p-8 text-center">
          <div className="text-sm font-mono text-[#A5ADB7]">Connecting to local proxy...</div>
        </div>
      )}
    </div>
  );
}
