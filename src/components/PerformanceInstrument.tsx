import React, { useState, useRef } from 'react';
import { ShieldCheck, RefreshCw, Atom, Cpu, Gauge, Zap } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal.tsx';
import { AnimatedCounter } from './AnimatedCounter.tsx';

export const PerformanceInstrument: React.FC = () => {
  const [scrubPercent, setScrubPercent] = useState<number>(85);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [currentFidelity, setCurrentFidelity] = useState<number>(99.8);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const getQuantumStateAtPercent = (p: number): { fidelity: number; stage: string; note: string } => {
    if (p < 28) {
      return {
        fidelity: +(100 - (p / 28) * 4.5).toFixed(2),
        stage: 'Hadamard Uniform Superposition |s⟩',
        note: 'All 32 basis states populated with equal probability amplitude 1/√32.'
      };
    } else if (p < 60) {
      return {
        fidelity: +(95.5 - ((p - 28) / 32) * 8.2).toFixed(2),
        stage: 'Oracle Phase Kickback & Entanglement Layer',
        note: 'Marked state undergoes π-phase inversion; multi-controlled Toffoli accumulates slight phase drift.'
      };
    } else {
      const delta = (p - 60) / 40;
      return {
        fidelity: +(99.4 + delta * 0.4).toFixed(2),
        stage: 'Dynamical Decoupling & Diffusion Recovery',
        note: 'Hahn-echo π pulses cancel low-frequency dephasing; target amplitude reaches 99.8% probability.'
      };
    }
  };

  const currentStatus = getQuantumStateAtPercent(scrubPercent);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const p = Math.round((x / rect.width) * 100);
    setScrubPercent(p);
  };

  const handleSimulateTomography = () => {
    setIsSimulating(true);
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      const jitter = (Math.random() - 0.5) * 0.4;
      setCurrentFidelity(+(99.8 + jitter).toFixed(2));
      if (step > 12) {
        clearInterval(interval);
        setIsSimulating(false);
        setCurrentFidelity(99.8);
      }
    }, 100);
  };

  return (
    <section id="instrument" className="py-20 border-b border-white/[0.08] relative bg-[#07070a]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header telemetry band */}
        <ScrollReveal direction="down" delay={0.05}>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-8 border-b border-white/[0.08] text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-3">
              <span className="text-cyan-400 font-semibold flex items-center gap-1.5">
                <Atom className="w-3.5 h-3.5" />
                003
              </span>
              <span>·</span>
              <span>QUANTUM STATE FIDELITY & DECOHERENCE BENCHMARK</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-neutral-500">NOISY SIMULATOR (AER 1.2) VERIFIED</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                VERIFIED
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Project Context & Huge Readout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10">
          <div className="lg:col-span-7">
            <ScrollReveal direction="left" delay={0.1}>
              <div className="text-xs font-mono text-cyan-400 mb-2">
                QNT-001 5-QUBIT REGISTER · NOISE MITIGATION PROFILE
              </div>
              <h3 className="text-3xl sm:text-4xl font-display font-bold text-white mb-3">
                Superposition Fidelity Curve
              </h3>
              <p className="text-neutral-300 font-light text-sm sm:text-base max-w-xl">
                Measurement of quantum state overlap |⟨ψ_ideal|ψ_noisy⟩|² through oracle phase inversion,
                comparing unmitigated dephasing against dynamical decoupling pulse stabilization.
              </p>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-5 flex flex-col lg:items-end justify-end font-mono">
            <ScrollReveal direction="right" delay={0.15}>
              <div className="flex items-baseline gap-3">
                <span className="text-6xl sm:text-7xl lg:text-8xl font-black font-display text-white tracking-tight tabular-nums">
                  <AnimatedCounter value={currentFidelity.toString()} />
                </span>
                <span className="text-xl sm:text-2xl text-cyan-400 font-light">%</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-neutral-400 mt-1">
                <span>TARGET STATE RECOVERY</span>
                <span className="text-emerald-400 font-semibold bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-800/40">
                  -0.18% ERROR RATE
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* The Curve Visualizer Container */}
        <ScrollReveal direction="up" delay={0.2} distance={30}>
          <div className="relative bg-[#050508] border border-white/15 rounded-xl p-6 sm:p-10 mb-8 overflow-hidden">
            
            <div className="flex justify-between items-center text-xs font-mono text-neutral-400 mb-6 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>|s⟩ UNIFORM STATE</span>
              </div>
              <div className="text-[11px] text-neutral-500 uppercase">
                SCRUB TIMELINE TO PROFILE WAVEFUNCTION COHERENCE
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>99.8% DIFFUSION RECOVERY</span>
              </div>
            </div>

            {/* SVG Latency Curve */}
            <div className="relative h-64 sm:h-80 w-full cursor-crosshair">
              <svg
                ref={svgRef}
                className="w-full h-full overflow-visible"
                viewBox="0 0 1000 300"
                preserveAspectRatio="none"
                onMouseMove={handleMouseMove}
              >
                <defs>
                  <linearGradient id="quantumGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                    <stop offset="45%" stopColor="#8b5cf6" stopOpacity="0.8" />
                    <stop offset="65%" stopColor="#10b981" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="1" />
                  </linearGradient>

                  <linearGradient id="quantumArea" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                  </linearGradient>

                  <pattern id="quantumGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="0.75" fill="rgba(255,255,255,0.08)" />
                  </pattern>
                </defs>

                <rect x="0" y="0" width="1000" height="300" fill="url(#quantumGrid)" />

                {/* Reference Grid Lines */}
                <line x1="0" y1="50" x2="1000" y2="50" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                <line x1="0" y1="150" x2="1000" y2="150" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                <line x1="0" y1="260" x2="1000" y2="260" stroke="rgba(255,255,255,0.12)" />

                {/* Shaded Area */}
                <path
                  d="M 0 50 C 250 60, 350 210, 480 230 C 580 240, 680 70, 1000 60 L 1000 300 L 0 300 Z"
                  fill="url(#quantumArea)"
                />

                {/* Main Coherence Curve */}
                <path
                  d="M 0 50 C 250 60, 350 210, 480 230 C 580 240, 680 70, 1000 60"
                  fill="none"
                  stroke="url(#quantumGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* "DYNAMIC DECOUPLING" Annotation Marker */}
                <g transform="translate(480, 260)">
                  <text x="0" y="0" fill="#06b6d4" fontSize="10" fontFamily="monospace" letterSpacing="0.1em">
                    DYNAMIC DECOUPLING PULSE
                  </text>
                  <line x1="0" y1="5" x2="160" y2="5" stroke="#06b6d4" strokeWidth="1" />
                </g>

                {/* Scrubbing Vertical Line & Cursor Tracking */}
                {(() => {
                  const scrubX = scrubPercent * 10;
                  let scrubY = 60;
                  if (scrubPercent < 28) {
                    scrubY = 50 + (scrubPercent / 28) * 30;
                  } else if (scrubPercent < 60) {
                    scrubY = 80 + ((scrubPercent - 28) / 32) * 150;
                  } else {
                    scrubY = 230 - ((scrubPercent - 60) / 40) * 170;
                  }
                  return (
                    <g>
                      <line
                        x1={scrubX}
                        y1="0"
                        x2={scrubX}
                        y2="300"
                        stroke="#06b6d4"
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                        opacity="0.85"
                      />
                      <circle cx={scrubX} cy={scrubY} r="5" fill="#06b6d4" />
                      <circle cx={scrubX} cy={scrubY} r="10" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.4" />
                    </g>
                  );
                })()}
              </svg>
            </div>

            {/* Interactive Inspection Readout Below Graph */}
            <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div>
                <div className="text-neutral-500 uppercase mb-1">Scrub Position</div>
                <div className="text-white font-semibold flex items-center gap-2">
                  <span>{scrubPercent}% through circuit depth</span>
                  <span className="text-neutral-500">·</span>
                  <span className="text-cyan-400">{currentStatus.fidelity}%</span>
                </div>
              </div>

              <div>
                <div className="text-neutral-500 uppercase mb-1">Circuit Phase</div>
                <div className="text-neutral-200">{currentStatus.stage}</div>
              </div>

              <div>
                <div className="text-neutral-500 uppercase mb-1">Wavefunction Status</div>
                <div className="text-neutral-400 font-light leading-tight">{currentStatus.note}</div>
              </div>
            </div>

          </div>
        </ScrollReveal>

        {/* Sub-footer notes and actions */}
        <ScrollReveal direction="up" delay={0.25}>
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-400">
            <div>
              measured on 5-qubit register · simulated under depolarizing noise λ = 0.001
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleSimulateTomography}
                disabled={isSimulating}
                className="px-3.5 py-1.5 border border-cyan-400/30 hover:border-cyan-400 text-white rounded transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isSimulating ? 'animate-spin' : ''}`} />
                <span>{isSimulating ? 'Sampling Shots...' : 'Fire Qubit Tomography'}</span>
              </button>
              <span className="text-neutral-500 hidden sm:inline">|</span>
              <span className="text-neutral-400">FULL MATHEMATICAL PROOF IN NOTEBOOK</span>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
