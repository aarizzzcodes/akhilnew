import React from 'react';
import { ArrowDownRight, Activity, ShieldCheck, Plus, Atom, Zap } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal.tsx';
import { AnimatedCounter } from './AnimatedCounter.tsx';

interface HeroSectionProps {
  onExploreWork: () => void;
  onExploreBadminton: () => void;
  onExploreCurve: () => void;
  onOpenNewProject: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreWork,
  onExploreBadminton,
  onExploreCurve,
  onOpenNewProject
}) => {
  return (
    <section className="relative pt-16 pb-12 sm:pt-24 sm:pb-20 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Kicker / Section Category */}
        <ScrollReveal delay={0.05} direction="down">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono tracking-widest text-neutral-400 mb-6">
            <span className="text-white font-semibold">AKHIL PESALA</span>
            <span className="text-neutral-600">·</span>
            <span className="text-cyan-400">B.TECH CS FIRST YEAR</span>
            <span className="text-neutral-600">·</span>
            <span>QUANTUM COMPUTING & PHYSICS ARCHIVE</span>
            <span className="text-neutral-600">·</span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              UNSEALED NOTEBOOKS
            </span>
          </div>
        </ScrollReveal>

        {/* Massive Headline */}
        <div className="max-w-4xl">
          <ScrollReveal delay={0.15} direction="up" distance={30}>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black font-display tracking-tight text-white leading-[1.02] mb-8">
              On the record.
            </h1>
          </ScrollReveal>
          
          {/* Editorial manifesto */}
          <ScrollReveal delay={0.25} direction="up" distance={20}>
            <p className="text-lg sm:text-xl lg:text-2xl text-neutral-300 font-light leading-relaxed mb-10 max-w-3xl">
              Circuits for <span className="text-white font-medium">Grover's Search</span>,{' '}
              <span className="text-white font-medium">VQE Molecular Eigensolvers</span>, and{' '}
              <span className="text-white font-medium">Cache-Conscious C++20 Data Systems</span>;
              open research documentations with mathematical proofs and verifiable Qiskit notebooks.
              Every claim files the same way — derived from unitary principles, verified on silicon and simulators.{' '}
              <span className="text-white font-medium italic">
                No adjectives doing a number's job.
              </span>
            </p>
          </ScrollReveal>

          {/* Quick action buttons */}
          <ScrollReveal delay={0.35} direction="up" distance={15}>
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <button
                onClick={onExploreWork}
                className="px-5 py-2.5 text-xs sm:text-sm font-mono font-medium text-black bg-white rounded hover:bg-neutral-200 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Examine Projects & Notebooks</span>
                <ArrowDownRight className="w-4 h-4" />
              </button>
              <button
                onClick={onExploreBadminton}
                className="px-5 py-2.5 text-xs sm:text-sm font-mono text-cyan-300 border border-cyan-500/40 rounded hover:border-cyan-400 hover:text-white transition-colors flex items-center gap-2 cursor-pointer bg-cyan-950/20"
              >
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Badminton Bullet-Time Vector Sim</span>
              </button>
              <button
                onClick={onOpenNewProject}
                className="px-4 py-2.5 text-xs sm:text-sm font-mono text-black bg-cyan-400 hover:bg-cyan-300 rounded font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Post New Project</span>
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* Telemetry Registry Banner Bar with Animated Counters */}
        <ScrollReveal delay={0.45} direction="up" distance={15}>
          <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-400">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <div>
                <span className="text-white font-semibold">
                  <AnimatedCounter value="06" /> FILE:
                </span>{' '}
                QUANTUM & CS PROJECTS
              </div>
              <span className="text-neutral-700 hidden sm:inline">·</span>
              <div>
                <span className="text-cyan-400 font-semibold">
                  <AnimatedCounter value="99.8%" />
                </span>{' '}
                STATE FIDELITY
              </div>
              <span className="text-neutral-700 hidden sm:inline">·</span>
              <div>
                <span className="text-white font-semibold">
                  <AnimatedCounter value="418.5" /> KM/H
                </span>{' '}
                SMASH VELOCITY
              </div>
              <span className="text-neutral-700 hidden sm:inline">·</span>
              <div>
                <span className="text-white font-semibold">
                  <AnimatedCounter value="14.2" /> NS
                </span>{' '}
                P99 B-TREE LOOKUP
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-neutral-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400/80" />
              <span>DIRAC NOTATION PROOFS · APACHE 2.0 CODE</span>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
