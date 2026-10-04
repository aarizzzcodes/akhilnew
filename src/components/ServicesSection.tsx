import React, { useState } from 'react';
import { ArrowUpRight, Terminal, Cpu, Database, FileText, Check, Layers, Atom } from 'lucide-react';
import { SERVICE_FACETS } from '../data/portfolioData.ts';
import { ScrollReveal } from './ScrollReveal.tsx';

interface ServicesSectionProps {
  onContactFacet: (facetTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onContactFacet }) => {
  const [selectedFacetId, setSelectedFacetId] = useState<string>('facet-1');
  const activeFacet = SERVICE_FACETS.find((f) => f.id === selectedFacetId) || SERVICE_FACETS[0];

  return (
    <section id="services" className="py-20 border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Header Breadcrumb */}
        <ScrollReveal direction="down" delay={0.05}>
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-neutral-400 mb-6">
            <span className="text-white font-semibold">RESEARCH PILLARS</span>
            <span className="text-neutral-600">·</span>
            <span>THE FOUR FACETS</span>
            <span className="text-neutral-600">·</span>
            <span className="text-cyan-400">AKHIL PESALA</span>
          </div>
        </ScrollReveal>

        {/* Section Headline */}
        <div className="max-w-4xl mb-12">
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-4xl sm:text-6xl font-display font-bold text-white tracking-tight mb-6">
              One spine, four facets.
            </h2>
            <p className="text-lg sm:text-xl text-neutral-300 font-light leading-relaxed">
              Everything below is the same discipline pointed at a different surface: make complex
              systems legible — to researchers, to compilers, to the quantum processors executing the
              unitary gates — and ship the proof personally.
            </p>
            <div className="mt-4 text-xs font-mono text-neutral-500">
              04 RESEARCH FACETS · EACH RUNS A VERIFIED SCALE MODEL · WALK THE RACK
            </div>
          </ScrollReveal>
        </div>

        {/* Coursework & Lab Focus Ribbon */}
        <ScrollReveal direction="up" delay={0.15}>
          <div className="py-5 border-y border-white/[0.08] mb-12 flex flex-wrap items-center justify-between gap-6 text-xs font-mono text-neutral-400">
            <span className="text-neutral-500 uppercase">ACTIVE RESEARCH INQUIRIES ACROSS</span>
            <div className="flex items-center gap-8 text-neutral-300 font-medium">
              <span className="hover:text-cyan-300 transition-colors">QUANTUM CIRCUITS</span>
              <span className="text-neutral-600">·</span>
              <span className="hover:text-cyan-300 transition-colors">C++20 SYSTEMS</span>
              <span className="text-neutral-600">·</span>
              <span className="hover:text-cyan-300 transition-colors">AERODYNAMICS (RK4)</span>
              <span className="text-neutral-600">·</span>
              <span className="hover:text-cyan-300 transition-colors">REVERSIBLE COMPILERS</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Interactive Facet Tabs Selector */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
            {SERVICE_FACETS.map((facet) => {
              const isSelected = facet.id === selectedFacetId;
              return (
                <button
                  key={facet.id}
                  onClick={() => setSelectedFacetId(facet.id)}
                  className={`p-4 text-left border rounded-lg transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-lg shadow-cyan-950/50'
                      : 'bg-[#09090c] border-white/10 text-neutral-400 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <div className="font-mono text-xs text-cyan-400 mb-1">{facet.number}</div>
                  <div className="font-display font-semibold text-sm sm:text-base leading-snug">
                    {facet.title}
                  </div>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Active Facet Deep-Dive Card */}
        <ScrollReveal direction="up" delay={0.25}>
          <div className="bg-[#0a0a0d] border border-white/15 rounded-xl p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left: Summary & Deliverables */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
                  <span className="text-cyan-400 font-bold">{activeFacet.number}</span>
                  <span>·</span>
                  <span>WORKING CIRCUITS & PROOFS, NOT WORKFLOW SLIDES</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  {activeFacet.title}
                </h3>

                <p className="text-base sm:text-lg text-neutral-200 font-light leading-relaxed">
                  {activeFacet.summary}
                </p>

                <div className="space-y-3 pt-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                    CORE DELIVERABLES & EXPERIMENTAL OUTCOMES
                  </div>
                  <ul className="space-y-2.5">
                    {activeFacet.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => onContactFacet(activeFacet.title)}
                    className="px-5 py-2.5 text-xs font-mono font-medium text-black bg-cyan-400 hover:bg-cyan-300 rounded transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span>Collaborate on {activeFacet.title}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right: Live Scale Model Box */}
              <div className="lg:col-span-5 bg-[#050507] border border-white/10 rounded-lg p-5 font-mono text-xs">
                <div className="flex items-center justify-between text-[11px] text-neutral-400 border-b border-white/10 pb-3 mb-4">
                  <span className="text-white font-medium flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    SCALE MODEL
                  </span>
                  <span className="text-neutral-500 uppercase">CALIBRATED SPEC</span>
                </div>

                <div className="text-[11px] text-neutral-400 mb-4">
                  {activeFacet.sampleModel.label}
                </div>

                <div className="space-y-3">
                  {activeFacet.sampleModel.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-1.5 border-b border-white/5">
                      <span className="text-neutral-400">{item.key}</span>
                      <span className="text-cyan-300 font-semibold tabular-nums">{item.val}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-3 border-t border-white/10 text-[10px] text-neutral-500 flex justify-between items-center">
                  <span>VERIFIED MEASUREMENT FROM AKHIL PESALA'S NOTEBOOK</span>
                  <span className="text-emerald-400 font-mono">200 OK</span>
                </div>
              </div>

            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
