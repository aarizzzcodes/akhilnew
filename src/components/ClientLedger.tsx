import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Lock, Unlock, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { LEDGER_ENTRIES } from '../data/portfolioData.ts';
import { ScrollReveal } from './ScrollReveal.tsx';

interface ClientLedgerProps {
  onInquireScope: (scope: string) => void;
}

export const ClientLedger: React.FC<ClientLedgerProps> = ({ onInquireScope }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleRow = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="py-20 border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Ledger Header Ticker */}
        <ScrollReveal direction="down" delay={0.05}>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-8 border-b border-white/[0.08] text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-3">
              <span className="text-cyan-400 font-semibold">LOG</span>
              <span>·</span>
              <span>QUANTUM & SYSTEMS LEDGER</span>
            </div>
            <div className="text-[11px] text-neutral-500 uppercase tracking-tight">
              UNSEALED EXPERIMENTAL LOGS · REPRODUCIBLE REPOSITORIES ON RECORD
            </div>
          </div>
        </ScrollReveal>

        {/* Ledger Table Container with ScrollReveal */}
        <ScrollReveal direction="up" delay={0.15}>
          <div className="border border-white/10 rounded-lg overflow-hidden bg-[#09090c]">
            <div className="divide-y divide-white/[0.08]">
              {LEDGER_ENTRIES.map((entry, idx) => {
                const isExpanded = expandedId === entry.id;
                return (
                  <div key={entry.id} className="transition-colors hover:bg-white/[0.02]">
                    {/* Main Row */}
                    <div
                      onClick={() => toggleRow(entry.id)}
                      className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
                    >
                      {/* Left: ID & Title */}
                      <div className="flex items-center gap-4 sm:gap-6 min-w-[280px]">
                        <span className="font-mono text-xs text-cyan-400 font-semibold w-16">
                          {entry.id}
                        </span>
                        <div className="flex items-center gap-2">
                          {entry.status === 'VERIFIED' ? (
                            <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Lock className="w-3.5 h-3.5 text-neutral-500" />
                          )}
                          <span className="font-display font-medium text-white text-base sm:text-lg">
                            {entry.client}
                          </span>
                        </div>
                      </div>

                      {/* Middle: Scope readout */}
                      <div className="font-mono text-xs text-neutral-300 md:text-center truncate max-w-md">
                        {entry.scope}
                      </div>

                      {/* Right: Status badge & Toggle chevron */}
                      <div className="flex items-center justify-between md:justify-end gap-4 min-w-[160px]">
                        <span
                          className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                            entry.status === 'VERIFIED'
                              ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-800/40'
                              : 'text-neutral-400 bg-white/5 border border-white/10'
                          }`}
                        >
                          {entry.status}
                        </span>
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-neutral-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-neutral-400" />
                        )}
                      </div>
                    </div>

                    {/* Expandable Technical Dossier */}
                    {isExpanded && (
                      <div className="px-6 py-5 bg-[#050507] border-t border-white/[0.06] text-xs font-mono">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                          <div>
                            <div className="text-neutral-500 uppercase mb-1">Quantified Outcome</div>
                            <div className="text-sm font-bold text-emerald-400 tabular-nums">
                              {entry.impact}
                            </div>
                          </div>

                          <div>
                            <div className="text-neutral-500 uppercase mb-1">Discipline & Field</div>
                            <div className="text-neutral-300">{entry.category}</div>
                          </div>

                          <div>
                            <div className="text-neutral-500 uppercase mb-1">Execution Milestone</div>
                            <div className="text-neutral-400">{entry.year} · First Year Benchmark</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-white/10">
                          <span className="text-[11px] text-neutral-500">
                            Verified on Akhil Pesala's personal research cluster. Open for academic review.
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onInquireScope(`${entry.client} (${entry.scope})`);
                            }}
                            className="px-3 py-1.5 text-xs text-white border border-cyan-400/30 hover:bg-cyan-400 hover:text-black rounded transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <span>Discuss Experiment Scope</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
