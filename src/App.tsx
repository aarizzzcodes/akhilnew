/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { ParticleSwarmCanvas } from './components/ParticleSwarmCanvas.tsx';
import { TopNav } from './components/TopNav.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { CaseFilesGallery } from './components/CaseFilesGallery.tsx';
import { BadmintonCalculationAnimation } from './components/BadmintonCalculationAnimation.tsx';
import { PerformanceInstrument } from './components/PerformanceInstrument.tsx';
import { ClientLedger } from './components/ClientLedger.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { LabSection } from './components/LabSection.tsx';
import { WritingSection } from './components/WritingSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { CaseFileModal } from './components/CaseFileModal.tsx';
import { NewProjectModal } from './components/NewProjectModal.tsx';
import { CaseFile } from './types/portfolio.ts';
import { CASE_FILES } from './data/portfolioData.ts';
import { ScrollReveal } from './components/ScrollReveal.tsx';
import { Zap, Crosshair } from 'lucide-react';

const STORAGE_KEY = 'akhil_pesala_posted_projects';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('projects');
  const [selectedCaseFile, setSelectedCaseFile] = useState<CaseFile | null>(null);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState<boolean>(false);
  const [contactSubject, setContactSubject] = useState<string>('');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [particlesEnabled, setParticlesEnabled] = useState<boolean>(true);

  // Projects list: initialized from default CASE_FILES + any user posted projects from localStorage
  const [projects, setProjects] = useState<CaseFile[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge custom projects with default ones ensuring no duplicates
          const ids = new Set(parsed.map((p: CaseFile) => p.id));
          const rest = CASE_FILES.filter((f) => !ids.has(f.id));
          return [...parsed, ...rest];
        }
      }
    } catch {
      // fallback
    }
    return CASE_FILES;
  });

  const handleSaveNewProject = (newProj: CaseFile) => {
    setProjects((prev) => {
      const updated = [newProj, ...prev];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore storage errors
      }
      return updated;
    });
    // Open the newly posted project documentation right away!
    setSelectedCaseFile(newProj);
  };

  // Audio synthesizer for subtle tactile feedback
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playBlip = (freq = 800) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // AudioContext failure gracefully ignored
    }
  };

  const handleNavigate = (sectionId: string) => {
    playBlip(750);
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenCaseFile = (file: CaseFile) => {
    playBlip(900);
    setSelectedCaseFile(file);
  };

  const handleInquireFromLedgerOrModal = (scope: string) => {
    playBlip(850);
    setContactSubject(scope);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Observe active section when scrolling
  useEffect(() => {
    const sections = ['projects', 'badminton', 'instrument', 'services', 'lab', 'writing', 'about', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#070709] text-[#e5e5e7] selection:bg-cyan-400 selection:text-black font-sans">
      
      {/* Quantum Wavefunction / Superposition Stippled Particle Swarm */}
      {particlesEnabled && <ParticleSwarmCanvas />}

      {/* Top Navigation */}
      <TopNav
        activeSection={activeSection}
        onNavigate={handleNavigate}
        soundEnabled={soundEnabled}
        onToggleSound={() => {
          setSoundEnabled(!soundEnabled);
          if (!soundEnabled) playBlip(1000);
        }}
        particlesEnabled={particlesEnabled}
        onToggleParticles={() => setParticlesEnabled(!particlesEnabled)}
        onOpenNewProject={() => setIsNewProjectModalOpen(true)}
      />

      {/* Main Content */}
      <main className="relative z-10">
        
        {/* Hero Section */}
        <HeroSection
          onExploreWork={() => handleNavigate('projects')}
          onExploreBadminton={() => handleNavigate('badminton')}
          onExploreCurve={() => {
            const el = document.getElementById('instrument');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenNewProject={() => setIsNewProjectModalOpen(true)}
        />

        {/* Projects & Documentations Gallery */}
        <CaseFilesGallery
          projects={projects}
          onOpenCaseFile={handleOpenCaseFile}
          onOpenNewProject={() => setIsNewProjectModalOpen(true)}
        />

        {/* Badminton Bullet-Time Vector Simulation Section */}
        <section id="badminton" className="py-20 border-b border-white/[0.08] relative bg-[#050508]">
          <div className="max-w-7xl mx-auto px-6">
            
            <ScrollReveal direction="down" delay={0.05}>
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-8 border-b border-white/[0.08] text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-3">
                  <span className="text-cyan-400 font-semibold flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    PHYSICS & KINETICS
                  </span>
                  <span>·</span>
                  <span>COMPUTATIONAL SPORTS MODELING</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-neutral-500 uppercase">AKHIL PESALA · VARSITY BADMINTON</span>
                  <span className="text-emerald-400 font-semibold bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-800/40">
                    418.5 KM/H PEAK SMASH
                  </span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <div className="max-w-4xl mb-10">
                <h2 className="text-4xl sm:text-5xl font-display font-bold text-white tracking-tight mb-4">
                  The Calculated Smash: Mental Calculation & Bullet-Time Aerodynamics
                </h2>
                <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
                  Clean flat 2D vector animation of a badminton player executing a serve, receiving a defensive clear,
                  entering a bullet-time freeze where stylized neon HUD calculations predict aerodynamic trajectory,
                  terminal drag parabolas, speed meters, and tactical target arcs — before exploding into a 418.5 km/h smash.
                </p>
              </div>
            </ScrollReveal>

            {/* The 2D Vector Animation Component */}
            <ScrollReveal direction="up" delay={0.15}>
              <BadmintonCalculationAnimation />
            </ScrollReveal>

          </div>
        </section>

        {/* Quantum Coherence & State Fidelity Curve */}
        <PerformanceInstrument />

        {/* Research Ledger / Experiment Logs */}
        <ClientLedger onInquireScope={handleInquireFromLedgerOrModal} />

        {/* Research Facets ("One spine, four facets") */}
        <ServicesSection onContactFacet={handleInquireFromLedgerOrModal} />

        {/* Interactive Lab Exhibits */}
        <LabSection />

        {/* Field Notes & Monographs */}
        <WritingSection />

        {/* About Akhil Pesala */}
        <AboutSection />

        {/* Contact / Academic Dispatch */}
        <ContactSection initialSubject={contactSubject} />

      </main>

      {/* Footer */}
      <Footer />

      {/* Unsealed Research Dossier / Documentation Modal */}
      <CaseFileModal
        caseFile={selectedCaseFile}
        onClose={() => setSelectedCaseFile(null)}
        onContactRelated={handleInquireFromLedgerOrModal}
      />

      {/* Post New Project / Documentation Modal */}
      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        onSaveProject={handleSaveNewProject}
      />

    </div>
  );
}
