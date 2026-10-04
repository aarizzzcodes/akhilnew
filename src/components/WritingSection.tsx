import React, { useState } from 'react';
import { ArrowUpRight, BookOpen, Clock, Tag } from 'lucide-react';
import { WRITING_ARTICLES } from '../data/portfolioData.ts';
import { WritingArticle } from '../types/portfolio.ts';
import { ScrollReveal } from './ScrollReveal.tsx';

export const WritingSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<WritingArticle | null>(null);

  return (
    <section id="writing" className="py-20 border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Breadcrumb */}
        <ScrollReveal direction="down" delay={0.05}>
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-neutral-400 mb-6">
            <span className="text-white font-semibold">WRITING</span>
            <span className="text-neutral-600">·</span>
            <span>FIELD NOTES</span>
            <span className="text-neutral-600">·</span>
            <span className="text-cyan-400">RESEARCH MONOGRAPHS</span>
          </div>
        </ScrollReveal>

        {/* Section Headline */}
        <div className="max-w-4xl mb-12">
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-4xl sm:text-6xl font-display font-bold text-white tracking-tight mb-6">
              Field notes & monographs.
            </h2>
            <p className="text-lg sm:text-xl text-neutral-300 font-light leading-relaxed">
              Open research notes on quantum algorithms, hardware coherence, C++20 memory layouts,
              and aerodynamic projectile deceleration. Written with formal proofs and working source code.
            </p>
            <div className="mt-4 text-xs font-mono text-neutral-500">
              CORPUS: 04 PEER NOTES · OPEN REPRODUCIBLE DERIVATIONS · AKHIL PESALA
            </div>
          </ScrollReveal>
        </div>

        {/* Articles List */}
        <div className="border border-white/10 rounded-lg overflow-hidden divide-y divide-white/[0.08] bg-[#09090c] mb-8">
          {WRITING_ARTICLES.map((article, idx) => (
            <ScrollReveal key={article.id} direction="up" delay={0.08 * idx}>
              <div
                onClick={() => setSelectedArticle(selectedArticle?.id === article.id ? null : article)}
                className="p-6 hover:bg-white/[0.02] transition-colors cursor-pointer group"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs font-mono text-neutral-400 shrink-0">
                    <span>{article.date}</span>
                    <span className="text-neutral-600">·</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed mb-4 max-w-3xl">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-cyan-400">
                    {article.metricsMentioned}
                  </span>
                  <span className="text-neutral-500 group-hover:text-white transition-colors flex items-center gap-1">
                    <span>{selectedArticle?.id === article.id ? 'Close note' : 'Read full monograph'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Expandable full note draft if selected */}
                {selectedArticle?.id === article.id && (
                  <div className="mt-6 pt-6 border-t border-white/10 text-neutral-300 text-sm leading-relaxed space-y-4 font-sans bg-black/50 p-6 rounded">
                    <p className="text-xs font-mono text-cyan-400">
                      FULL MONOGRAPH CONTENT · AKHIL PESALA (B.TECH FIRST YEAR CS):
                    </p>
                    <div className="whitespace-pre-line font-light">
                      {article.fullContent || article.excerpt}
                    </div>
                    <div className="pt-2 text-xs font-mono text-neutral-500">
                      STATUS: RECORDED IN RESEARCH REPOSITORY · REPRODUCIBLE WITH TEST SEED
                    </div>
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};
