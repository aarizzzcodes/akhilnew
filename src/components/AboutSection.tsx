import React from 'react';
import { ShieldCheck, Cpu, Terminal, Layers, ArrowUpRight, Award, Atom, Zap } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal.tsx';

export const AboutSection: React.FC = () => {
  const principles = [
    {
      title: "No adjectives doing a number's job",
      desc: "If an algorithm is fast, state the asymptotic Big-O bound and gate depth in counts. If a quantum state is preserved, measure fidelity to three decimal places. No hand-waving."
    },
    {
      title: "The mathematics and the code share a desk",
      desc: "Dirac notation without circuit implementation is pure theory; code without mathematical rigor is guessing. I derive the unitary matrices and write the Qiskit and C++ code myself."
    },
    {
      title: "Athletic intuition mirrors computational physics",
      desc: "On the badminton court, high-speed split-second decisions rely on non-linear drag models and trajectory parabolas. Physical sports and quantum computing share the same mathematical foundations."
    }
  ];

  const courseworkCategories = [
    { label: "Quantum & Mathematics", items: ["Quantum Information & Computation", "Linear Algebra & Hilbert Spaces", "Discrete Mathematics & Graph Theory", "Calculus & Differential Equations"] },
    { label: "Computer Science Core", items: ["Data Structures & Algorithms (C++20)", "Computer Architecture & Organization", "Operating Systems Foundations", "Reversible Logic & Compilers"] },
    { label: "Toolchain & Simulators", items: ["Qiskit Terra & Nature", "Python 3.12 (NumPy, SciPy)", "Modern C++ (Clang, CMake)", "LaTeX & Technical Writing"] },
    { label: "Sports & Athletics", items: ["Competitive Badminton (Singles/Doubles)", "Trajectory Aerodynamics (RK4)", "Smash Velocity Mechanics (400+ km/h)", "Agility & Cognitive Reflex Training"] }
  ];

  return (
    <section id="about" className="py-20 border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Breadcrumb */}
        <ScrollReveal direction="down" delay={0.05}>
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-neutral-400 mb-6">
            <span className="text-white font-semibold">ABOUT</span>
            <span className="text-neutral-600">·</span>
            <span>RESEARCHER PROFILE</span>
            <span className="text-neutral-600">·</span>
            <span className="text-cyan-400">AKHIL PESALA</span>
          </div>
        </ScrollReveal>

        {/* Bio & Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          <div className="lg:col-span-7">
            <ScrollReveal direction="left" delay={0.1}>
              <h2 className="text-4xl sm:text-6xl font-display font-bold text-white tracking-tight mb-8">
                Akhil Pesala.
              </h2>
              <div className="space-y-6 text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
                <p>
                  I am a first-year <strong className="text-white font-medium">B.Tech Computer Science and Engineering</strong> student
                  specializing in <span className="text-cyan-400 font-medium">Quantum Computing</span>, reversible compiler design,
                  and high-performance systems.
                </p>
                <p>
                  My work centers on the intersection of quantum algorithms (Grover's search, VQE molecular simulations,
                  entanglement distribution protocols) and memory-conscious classical architectures in modern C++20.
                </p>
                <p>
                  Off the terminal, I am a dedicated competitive badminton player. I study the extreme aerodynamics
                  of feathered shuttlecock flight — where 400+ km/h smashes steepen under drag into split-second tactical
                  drops — bridging physical motion kinetics with computational modeling.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Quick Academic Card */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="right" delay={0.15}>
              <div className="bg-[#09090c] border border-white/15 rounded-xl p-6 sm:p-8 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <span className="text-white font-bold flex items-center gap-2">
                    <Atom className="w-4 h-4 text-cyan-400" />
                    ACADEMIC PROFILE
                  </span>
                  <span className="text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
                    B.TECH FIRST YEAR CS
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-neutral-400">Student Scholar</span>
                    <span className="text-white font-semibold">Akhil Pesala</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-neutral-400">Specialization</span>
                    <span className="text-cyan-300">Quantum Computing & Algorithms</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-neutral-400">Academic Inquiries</span>
                    <span className="text-neutral-200">Open for Research & Lab Projects</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-neutral-400">Athletics</span>
                    <span className="text-white">Varsity Badminton (Smash: 418.5 km/h)</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 text-neutral-400">
                  <span className="text-neutral-500">QUANTUM LEDGER IDENTIFIER:</span>
                  <div className="mt-1 text-cyan-300 font-mono text-[11px] truncate">
                    |ψ_akhil⟩ = α|CS⟩ + β|QUANTUM⟩ + γ|BADMINTON⟩
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Principles */}
        <div className="mb-16">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-6">
              RESEARCH & COMPUTATIONAL TENETS
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {principles.map((p, idx) => (
                <div
                  key={idx}
                  className="bg-[#09090c] border border-white/10 rounded-lg p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="font-mono text-xs text-cyan-500 mb-2">0{idx + 1}.</div>
                    <h3 className="font-display font-bold text-white text-lg mb-3">
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Coursework & Toolchain */}
        <div>
          <ScrollReveal direction="up" delay={0.15}>
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-6">
              ACADEMIC DISCIPLINE & TOOLCHAIN
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">
              {courseworkCategories.map((cat, idx) => (
                <div key={idx} className="p-5 bg-white/[0.02] border border-white/10 rounded-lg">
                  <div className="text-cyan-400 font-semibold mb-3 border-b border-white/10 pb-2">
                    {cat.label}
                  </div>
                  <ul className="space-y-2">
                    {cat.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="text-neutral-300 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-neutral-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
};
