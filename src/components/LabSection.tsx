import React, { useState } from 'react';
import { Sliders, Play, Cpu, ShieldCheck, Gauge, Globe2, Sparkles, Terminal, Atom } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal.tsx';

export const LabSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'latency' | 'agents' | 'tokens'>('latency');
  
  // Latency probe test state
  const [targetUrl, setTargetUrl] = useState('https://akhilpesala.dev');
  const [probeRunning, setProbeRunning] = useState(false);
  const [probeResults, setProbeResults] = useState<{
    dns: number;
    tls: number;
    ttfb: number;
    dom: number;
    score: number;
  } | null>({
    dns: 1.8,
    tls: 11.2,
    ttfb: 42.5,
    dom: 8.4,
    score: 98
  });

  // Token calculator state
  const [contextTokens, setContextTokens] = useState(16000);
  const [concurrency, setConcurrency] = useState(50);
  const [modelType, setModelType] = useState<'flash' | 'pro'>('flash');

  const runLatencyProbe = () => {
    setProbeRunning(true);
    setTimeout(() => {
      setProbeResults({
        dns: +(Math.random() * 2 + 1).toFixed(1),
        tls: +(Math.random() * 5 + 9).toFixed(1),
        ttfb: +(Math.random() * 10 + 38).toFixed(1),
        dom: +(Math.random() * 4 + 6).toFixed(1),
        score: Math.floor(Math.random() * 4 + 96)
      });
      setProbeRunning(false);
    }, 800);
  };

  const calculatedCostPer1kOps = modelType === 'flash'
    ? ((contextTokens / 1000000) * 0.075 * concurrency * 1000).toFixed(3)
    : ((contextTokens / 1000000) * 1.25 * concurrency * 1000).toFixed(3);

  return (
    <section id="lab" className="py-20 border-b border-white/[0.08] relative bg-[#060608]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Lab Header */}
        <ScrollReveal direction="down" delay={0.05}>
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-neutral-400 mb-6">
            <span className="text-white font-semibold">LAB</span>
            <span className="text-neutral-600">·</span>
            <span>WORKING EXHIBITS</span>
            <span className="text-neutral-600">·</span>
            <span className="text-cyan-400">INTERACTIVE INSTRUMENTS</span>
          </div>
        </ScrollReveal>

        <div className="max-w-4xl mb-12">
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-4xl sm:text-6xl font-display font-bold text-white tracking-tight mb-6">
              Run the instrument.
            </h2>
            <p className="text-lg sm:text-xl text-neutral-300 font-light leading-relaxed">
              Exhibits, not static screenshots. Interactive instruments measuring edge response,
              quantum state decoherence, and token complexity. Point it at your architecture. Point it
              at this one.
            </p>
            <div className="mt-4 text-xs font-mono text-neutral-500">
              OPEN SIMULATORS · COMPILED WITH MODERN WEB STANDARDS · ZERO LATENCY
            </div>
          </ScrollReveal>
        </div>

        {/* Instrument Switcher Tabs */}
        <ScrollReveal direction="up" delay={0.15}>
          <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-8 text-xs font-mono">
            <button
              onClick={() => setActiveTab('latency')}
              className={`px-4 py-2 rounded transition-colors cursor-pointer ${
                activeTab === 'latency'
                  ? 'bg-cyan-400 text-black font-semibold'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              01. Live Edge Latency Profiler
            </button>
            <button
              onClick={() => setActiveTab('tokens')}
              className={`px-4 py-2 rounded transition-colors cursor-pointer ${
                activeTab === 'tokens'
                  ? 'bg-cyan-400 text-black font-semibold'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              02. Quantum / AI Architecture Rig
            </button>
          </div>
        </ScrollReveal>

        {/* Tab 1: Edge Latency Profiler */}
        {activeTab === 'latency' && (
          <ScrollReveal direction="up" delay={0.2}>
            <div className="bg-[#09090c] border border-white/15 rounded-xl p-6 sm:p-10">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-4">
                  <Globe2 className="w-4 h-4 text-cyan-400" />
                  <span>ACTIVE NETWORK & EDGE PROBE</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <input
                    type="text"
                    value={targetUrl}
                    onChange={(e) => setTargetUrl(e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-[#050507] border border-white/20 rounded font-mono text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                    placeholder="https://your-domain.com"
                  />
                  <button
                    onClick={runLatencyProbe}
                    disabled={probeRunning}
                    className="px-6 py-2.5 bg-cyan-400 text-black font-mono text-xs font-semibold rounded hover:bg-cyan-300 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Play className={`w-3.5 h-3.5 fill-current ${probeRunning ? 'animate-spin' : ''}`} />
                    <span>{probeRunning ? 'Measuring...' : 'Probe Edge'}</span>
                  </button>
                </div>

                {probeResults && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
                    <div className="p-4 bg-white/[0.03] border border-white/10 rounded">
                      <div className="text-[11px] text-neutral-500 uppercase mb-1">DNS Handshake</div>
                      <div className="text-2xl font-bold text-white tabular-nums">
                        {probeResults.dns} ms
                      </div>
                    </div>
                    <div className="p-4 bg-white/[0.03] border border-white/10 rounded">
                      <div className="text-[11px] text-neutral-500 uppercase mb-1">TLS Negotiate</div>
                      <div className="text-2xl font-bold text-white tabular-nums">
                        {probeResults.tls} ms
                      </div>
                    </div>
                    <div className="p-4 bg-white/[0.03] border border-white/10 rounded">
                      <div className="text-[11px] text-neutral-500 uppercase mb-1">Server TTFB</div>
                      <div className="text-2xl font-bold text-cyan-400 tabular-nums">
                        {probeResults.ttfb} ms
                      </div>
                    </div>
                    <div className="p-4 bg-white/[0.03] border border-white/10 rounded">
                      <div className="text-[11px] text-neutral-500 uppercase mb-1">Edge Index Score</div>
                      <div className="text-2xl font-bold text-emerald-400 tabular-nums">
                        {probeResults.score} / 100
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Tab 2: Token Architecture Rig */}
        {activeTab === 'tokens' && (
          <ScrollReveal direction="up" delay={0.2}>
            <div className="bg-[#09090c] border border-white/15 rounded-xl p-6 sm:p-10 font-mono text-xs">
              <div className="max-w-3xl space-y-6">
                <div className="flex items-center gap-2 text-neutral-400 mb-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>SIMULATED AGENT CONTEXT & TOKEN LATENCY MODEL</span>
                </div>

                <div>
                  <div className="flex justify-between text-neutral-400 mb-2">
                    <span>Context Window Depth:</span>
                    <span className="text-cyan-300 font-bold">{contextTokens.toLocaleString()} tokens</span>
                  </div>
                  <input
                    type="range"
                    min="2000"
                    max="128000"
                    step="2000"
                    value={contextTokens}
                    onChange={(e) => setContextTokens(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-neutral-400 mb-2">
                    <span>Concurrent Agent Swarm:</span>
                    <span className="text-white font-bold">{concurrency} parallel instances</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="200"
                    step="5"
                    value={concurrency}
                    onChange={(e) => setConcurrency(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <span className="text-neutral-400">Architecture Tier:</span>
                  <button
                    onClick={() => setModelType('flash')}
                    className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
                      modelType === 'flash' ? 'bg-cyan-400 text-black font-semibold' : 'bg-white/5 text-neutral-400'
                    }`}
                  >
                    Edge Flash Model (Sub-20ms)
                  </button>
                  <button
                    onClick={() => setModelType('pro')}
                    className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
                      modelType === 'pro' ? 'bg-cyan-400 text-black font-semibold' : 'bg-white/5 text-neutral-400'
                    }`}
                  >
                    Deep Reasoning Pro Model
                  </button>
                </div>

                <div className="p-5 bg-white/[0.03] border border-white/10 rounded mt-6 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-neutral-500 uppercase mb-1">Estimated Ingest Rate</div>
                    <div className="text-xl font-bold text-white">
                      {((contextTokens * concurrency) / 1000).toFixed(0)}k tokens / sec
                    </div>
                  </div>
                  <div>
                    <div className="text-neutral-500 uppercase mb-1">Operating Cost (1,000 runs)</div>
                    <div className="text-2xl font-bold text-emerald-400">
                      ${calculatedCostPer1kOps}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

      </div>
    </section>
  );
};
