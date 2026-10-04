import React, { useEffect, useState } from 'react';
import { ArrowUp, Atom } from 'lucide-react';

export const Footer: React.FC = () => {
  const [utcTime, setUtcTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().slice(17, 25) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-[#050507] border-t border-white/[0.08] text-xs font-mono text-neutral-400">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand mark & status */}
        <div className="flex flex-wrap items-center gap-4 text-center md:text-left">
          <div className="text-white font-bold tracking-tight flex items-center gap-1.5">
            <Atom className="w-3.5 h-3.5 text-cyan-400" />
            <span>akhilpesala.dev</span>
          </div>
          <span className="text-neutral-700 hidden sm:inline">·</span>
          <div className="flex items-center gap-1.5 text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>B.TECH CS FIRST YEAR · QUANTUM COMPUTING</span>
          </div>
          <span className="text-neutral-700 hidden sm:inline">·</span>
          <span className="text-neutral-500 tabular-nums">{utcTime}</span>
        </div>

        {/* Center: Legal / Record note */}
        <div className="text-neutral-500 text-center text-[11px]">
          OPEN RESEARCH NOTEBOOKS · DIRAC MATHEMATICAL PROOFS · APACHE 2.0
        </div>

        {/* Right: Scroll to top */}
        <div className="flex items-center gap-6">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Top of record</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
