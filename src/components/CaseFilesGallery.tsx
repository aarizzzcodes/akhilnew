import React, { useState } from 'react';
import { ArrowUpRight, Plus, ExternalLink, Activity, Filter, CheckCircle2, Atom, Code2, FileText } from 'lucide-react';
import { CaseFile } from '../types/portfolio.ts';
import { ScrollReveal } from './ScrollReveal.tsx';
import { AnimatedCounter } from './AnimatedCounter.tsx';

interface CaseFilesGalleryProps {
  projects: CaseFile[];
  onOpenCaseFile: (file: CaseFile) => void;
  onOpenNewProject: () => void;
}

export const CaseFilesGallery: React.FC<CaseFilesGalleryProps> = ({
  projects,
  onOpenCaseFile,
  onOpenNewProject
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = ['ALL', 'QUANTUM CIRCUITS', 'CS FOUNDATIONS', 'PHYSICS & KINETICS'];

  const filteredFiles = projects.filter((file) => {
    if (activeCategory === 'ALL') return true;
    if (activeCategory === 'QUANTUM CIRCUITS') {
      return file.categories.some(c => c.includes('QUANTUM') || c.includes('CIRCUIT') || c.includes('ENTANGLEMENT'));
    }
    if (activeCategory === 'CS FOUNDATIONS') {
      return file.categories.some(c => c.includes('CS') || c.includes('C++') || c.includes('COMPILERS'));
    }
    if (activeCategory === 'PHYSICS & KINETICS') {
      return file.categories.some(c => c.includes('PHYSICS') || c.includes('KINETICS') || c.includes('VECTOR'));
    }
    return true;
  });

  const flagshipFile = filteredFiles.find((f) => f.id === 'QNT-001') || filteredFiles[0];
  const remainingFiles = filteredFiles.filter((f) => f.id !== flagshipFile?.id);

  return (
    <section id="projects" className="py-16 sm:py-24 border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header Ticker */}
        <ScrollReveal direction="down" delay={0.05}>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/[0.08] text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-3">
              <span className="text-white font-medium">PROJECTS & DOCUMENTATIONS</span>
              <span>·</span>
              <span>PUBLISHED NOTEBOOKS & RESEARCH CIRCUITS</span>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Filter segmented buttons */}
              <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded border border-white/10">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors cursor-pointer ${
                      activeCategory === cat
                        ? 'bg-cyan-400 text-black font-semibold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Post Project Quick Action */}
              <button
                onClick={onOpenNewProject}
                className="px-3 py-1 text-xs font-mono bg-white text-black font-semibold rounded hover:bg-neutral-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Post Project</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Flagship Headline Card: QNT-001 Grover's Search */}
        {flagshipFile && (
          <ScrollReveal direction="up" delay={0.1}>
            <div className="group mb-8 bg-[#0a0a0d] border border-cyan-500/20 hover:border-cyan-500/50 transition-all rounded-lg p-6 sm:p-10 relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column */}
                <div className="lg:col-span-4 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-3 text-xs font-mono text-neutral-400 mb-6">
                      <span className="text-cyan-400 font-semibold">{flagshipFile.id}</span>
                      <span>·</span>
                      <span className="text-neutral-500">OPEN RESEARCH</span>
                      <span>·</span>
                      <span className="text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        VERIFIED NOTEBOOK
                      </span>
                    </div>

                    <div className="py-2">
                      <div className="flex items-center gap-2 mb-3">
                        <Atom className="w-8 h-8 text-cyan-400 animate-spin-slow" />
                        <span className="text-xs font-mono text-cyan-300 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
                          QISKIT 1.2 · 5 QUBITS
                        </span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
                        {flagshipFile.client}
                      </div>
                    </div>
                  </div>

                  {/* Quantified highlights */}
                  <div className="pt-6 border-t border-white/10 flex items-center gap-8 font-mono">
                    <div>
                      <div className="text-2xl font-bold text-white tabular-nums">
                        {flagshipFile.metrics.primaryValue}
                      </div>
                      <div className="text-xs text-neutral-400">
                        {flagshipFile.metrics.primaryLabel}
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-emerald-400 tabular-nums">
                        <AnimatedCounter value={flagshipFile.metrics.secondaryValue || '99.8%'} />
                      </div>
                      <div className="text-xs text-neutral-400">
                        {flagshipFile.metrics.secondaryLabel}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-8 flex flex-col justify-between h-full space-y-6">
                  <p className="text-lg sm:text-xl text-neutral-200 font-light leading-relaxed">
                    {flagshipFile.description}
                  </p>

                  {flagshipFile.details.mathFormulation && (
                    <div className="p-3 bg-black/60 border border-white/10 rounded font-mono text-xs text-cyan-300">
                      <span className="text-neutral-500 mr-2">INVARIANT:</span>
                      {flagshipFile.details.mathFormulation}
                    </div>
                  )}

                  {/* Scope categories */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-mono text-neutral-400">
                    {flagshipFile.categories.map((cat, idx) => (
                      <React.Fragment key={cat}>
                        <span className="text-neutral-300">{cat}</span>
                        {idx < flagshipFile.categories.length - 1 && (
                          <span className="text-neutral-600">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Action Button */}
                  <div className="pt-4">
                    <button
                      onClick={() => onOpenCaseFile(flagshipFile)}
                      className="px-5 py-2.5 text-xs font-mono font-medium text-white border border-cyan-400/40 rounded hover:bg-cyan-400 hover:text-black transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>OPEN RESEARCH DOSSIER & DOCUMENTATION +</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Grid of Remaining Quantum & CS Projects with staggered delays */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {remainingFiles.map((file, idx) => (
            <ScrollReveal key={file.id} direction="up" delay={0.08 * (idx % 3)}>
              <div className="bg-[#09090c] border border-white/10 hover:border-cyan-500/40 transition-all rounded-lg p-6 flex flex-col justify-between group h-full">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-3">
                    <span className="text-cyan-400 font-semibold">{file.id}</span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded text-emerald-400 bg-emerald-950/40 border border-emerald-800/30">
                      {file.status}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold font-display text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {file.client}
                  </h4>

                  <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-6 line-clamp-3">
                    {file.description}
                  </p>
                </div>

                <div>
                  {/* Metric Readout Box */}
                  <div className="p-3 bg-white/[0.03] border border-white/5 rounded font-mono mb-4 flex items-center justify-between">
                    <div>
                      <div className="text-base font-bold text-white tabular-nums">
                        {file.metrics.primaryValue}
                      </div>
                      <div className="text-[10px] text-neutral-400 truncate max-w-[130px]">
                        {file.metrics.primaryLabel}
                      </div>
                    </div>
                    {file.metrics.secondaryValue && (
                      <div className="text-right">
                        <div className="text-base font-bold text-cyan-400 tabular-nums">
                          {file.metrics.secondaryValue}
                        </div>
                        <div className="text-[10px] text-neutral-400 truncate max-w-[120px]">
                          {file.metrics.secondaryLabel}
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => onOpenCaseFile(file)}
                    className="w-full py-2 text-xs font-mono text-neutral-300 border border-white/15 rounded hover:bg-white hover:text-black transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>VIEW DOCUMENTATION +</span>
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};
