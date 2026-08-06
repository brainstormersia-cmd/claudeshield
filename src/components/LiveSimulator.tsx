'use client';

import React, { useState } from 'react';
import { MascotActor } from './MascotActor';
import { Play, Terminal } from 'lucide-react';

export const LiveSimulator: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'intercepting' | 'converting' | 'retrying' | 'success'>('idle');
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const runSimulation = () => {
    setStatus('sending');
    setLogs([]);
    addLog('POST /v1/messages sent from Claude Code CLI...');

    setTimeout(() => {
      setStatus('intercepting');
      addLog('Upstream returned HTTP 403 Forbidden (x-error-type: org_quota_exceeded)');

      setTimeout(() => {
        setStatus('converting');
        addLog('Claude Proxy intercepted quota error. Classifying as RETRYABLE.');
        addLog('Converted to HTTP 429 Too Many Requests with Retry-After: 3s');

        setTimeout(() => {
          setStatus('retrying');
          addLog('Client waiting for 3s backoff window...');

          setTimeout(() => {
            setStatus('success');
            addLog('Retried request succeeded! HTTP 200 OK (Tokens generated)');
          }, 2000);
        }, 1500);
      }, 1500);
    }, 1200);
  };

  return (
    <div className="rounded-2xl border border-[#2B323B] bg-[#11151A] p-6 space-y-6 orange-glow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#2B323B] pb-4">
        <div>
          <h3 className="text-lg font-bold text-[#F4F5F6] font-pixel">Interactive Proxy Simulator</h3>
          <p className="text-xs text-[#A5ADB7]">Test how Claude Proxy intercepts a 403 quota failure and converts it to 429 Retry-After.</p>
        </div>
        <button
          onClick={runSimulation}
          disabled={status !== 'idle' && status !== 'success'}
          className="flex items-center gap-2 rounded-lg bg-[#FF704D] px-4 py-2 text-xs font-mono font-bold text-white hover:bg-[#FF805D] disabled:opacity-50 transition-all shadow-md"
        >
          <Play className="h-4 w-4" />
          <span>{status === 'idle' || status === 'success' ? 'Simulate 403 Recovery' : 'Simulating...'}</span>
        </button>
      </div>

      {/* Simulator Visualization */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* State Display Card */}
        <div className="rounded-xl border border-[#2B323B] bg-[#151A20] p-5 space-y-4 text-center">
          <MascotActor
            pose={
              status === 'sending' || status === 'retrying'
                ? 'walking'
                : status === 'intercepting' || status === 'converting'
                ? 'inspecting'
                : status === 'success'
                ? 'success'
                : 'idle'
            }
            size={80}
            speechBubble={
              status === 'sending'
                ? 'Sending request...'
                : status === 'intercepting'
                ? 'Caught 403 Quota Error!'
                : status === 'converting'
                ? 'Converting to 429 Retry-After...'
                : status === 'retrying'
                ? 'Retrying request...'
                : status === 'success'
                ? 'Session Recovered! ✓'
                : 'Ready to inspect'
            }
          />

          <div className="pt-2">
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-mono font-bold ${
                status === 'success'
                  ? 'bg-[#83D957]/20 text-[#83D957] border border-[#83D957]'
                  : status === 'intercepting' || status === 'converting'
                  ? 'bg-[#FFB347]/20 text-[#FFB347] border border-[#FFB347]'
                  : 'bg-[#2B323B] text-[#A5ADB7]'
              }`}
            >
              STATE: {status.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Realtime Terminal Log */}
        <div className="rounded-xl border border-[#2B323B] bg-[#0D0F12] p-4 h-56 overflow-y-auto font-mono text-xs text-[#83D957] space-y-1.5">
          <div className="flex items-center gap-2 border-b border-[#2B323B] pb-2 text-[#747D88]">
            <Terminal className="h-3.5 w-3.5" />
            <span>PROXY_SIMULATOR_OUTPUT</span>
          </div>
          {logs.length === 0 ? (
            <p className="text-[#747D88] italic pt-4">Click &quot;Simulate 403 Recovery&quot; to start live event log...</p>
          ) : (
            logs.map((log, idx) => (
              <p key={idx} className="leading-relaxed">
                {log}
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
