import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Sparkles, Plus, Atom } from 'lucide-react';

interface TopNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  particlesEnabled: boolean;
  onToggleParticles: () => void;
  onOpenNewProject: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeSection,
  onNavigate,
  soundEnabled,
  onToggleSound,
  particlesEnabled,
  onToggleParticles,
  onOpenNewProject
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'projects', label: 'projects' },
    { id: 'badminton', label: 'badminton-sim' },
    { id: 'instrument', label: 'quantum-curve' },
    { id: 'services', label: 'research-facets' },
    { id: 'writing', label: 'field-notes' },
    { id: 'about', label: 'about' },
    { id: 'contact', label: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#08080a]/92 backdrop-blur-md border-b border-white/[0.08] transition-all">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Zone 1: Clean Brand Wordmark */}
        <div className="flex items-center gap-3">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('projects');
            }}
            className="text-base font-bold tracking-tight text-white hover:text-neutral-300 transition-colors flex items-center gap-2 group"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform" />
            <span>akhilpesala.dev</span>
          </a>
          <span className="hidden sm:inline-block text-xs font-mono text-neutral-500 border-l border-white/10 pl-3">
            b.tech cs · quantum computing
          </span>
        </div>

        {/* Zone 2: 4-6 Text Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 text-xs font-mono tracking-tight text-neutral-400">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`relative py-1 px-2 transition-colors cursor-pointer ${
                  isActive
                    ? 'text-white font-medium'
                    : 'hover:text-white text-neutral-400'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-cyan-400 transition-all" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Interactive Toggles */}
        <div className="flex items-center gap-2">
          {/* Particles Toggle */}
          <button
            onClick={onToggleParticles}
            title={particlesEnabled ? "Pause quantum wavefunction points" : "Enable quantum wavefunction points"}
            className={`p-2 rounded-md transition-colors text-xs font-mono flex items-center gap-1.5 ${
              particlesEnabled
                ? 'text-cyan-400 hover:bg-white/10'
                : 'text-neutral-600 hover:text-neutral-400 hover:bg-white/5'
            }`}
          >
            <Atom className="w-3.5 h-3.5" />
            <span className="hidden lg:inline text-[11px]">|ψ⟩</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? "Mute interactive audio" : "Enable tactile audio"}
            className="p-2 text-neutral-400 hover:text-white rounded-md hover:bg-white/10 transition-colors"
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5" />
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Post Project Button */}
          <button
            onClick={onOpenNewProject}
            className="ml-1 sm:ml-2 px-3 py-1.5 text-xs font-mono font-medium text-black bg-cyan-400 hover:bg-cyan-300 rounded transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Post Project</span>
          </button>
        </div>

      </div>

      {/* Hairline Scroll Progress Bar along header bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/[0.04]">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
};
