# Akhil Pesala — B.Tech CS & Quantum Computing Research Portfolio

A high-performance, editorial academic portfolio, project documentation platform, and physics computing showcase engineered for **Akhil Pesala**, a B.Tech First Year Computer Science & Engineering student specializing in **Quantum Computing** and competitive athletics.

Built with React 19, TypeScript, Tailwind CSS v4, Motion, and HTML5 Canvas.

---

## 🌟 Key Features

### 1. 2D Vector Badminton Bullet-Time Simulation (`#badminton`)
- **Visual Style**: Minimalist, modern flat 2D vector illustration with isometric court lines, net texture, player vector silhouette, and a default **clean white background** (with optional tactical dark mode toggle).
- **Seamless Loop Sequence (~6s)**:
  1. **The Serve**: Player executes an underhand serve across the net.
  2. **The Defensive Return**: Opponent clears the shuttlecock high toward the rear court.
  3. **Bullet-Time Freeze & Mental Calculation HUD**: As the player leaps into mid-air, time dilates into slow motion. Stylized glowing neon cyan and amber HUD rings, aerodynamic trajectory parabolas, mathematical equations ($y(t) = v_0 \sin\theta t - \frac{1}{2}gt^2$), speedometers ($418.5\text{ km/h}$), and tactical target arcs ($|\psi\rangle = 99.2\%\text{ Ace}$) illuminate around the suspended shuttlecock.
  4. **Explosive Smash**: Time snaps back to full speed; the player executes an overhead jump smash driving the shuttlecock into the court crosshair with an impact shockwave.
  5. **Recovery**: Settles back into base stance for the seamless loop.
- **Interactive Controls**: Play/Pause, "Freeze HUD" toggle, timeline scrubber, and speed multipliers ($0.5\times, 1\times, 1.5\times$).

### 2. Project & Research Documentation Publishing System
- **"+ Post Project" Creator**: Akhil can publish new projects and research documentations directly via the web UI.
  - Fields for Project ID, Title, Field Category, Abstract, Qubit Count, Gate Depth, Dirac Invariant, and Code Snippet.
- **Local Persistence**: Automatically saves to browser `localStorage` and renders immediately in the project gallery.
- **Documentation Exporter**: Download any project's complete research dossier with formulas and code as a `.md` (Markdown) file.

### 3. Pre-Loaded Quantum & CS Research Projects
- **`QNT-001` — Grover's Quantum Search Engine**: 5-Qubit statevector oracle with multi-controlled Toffoli diffusion in Qiskit ($O(\sqrt{N})$ speedup, $99.8\%$ target state fidelity).
- **`QNT-002` — Variational Quantum Eigensolver (VQE)**: Molecular ground state energy calculation for the $H_2$ dimer on a noisy Aer simulator ($-1.137\text{ Ha}$ ground state).
- **`QNT-003` — Quantum Teleportation & Entanglement Swapping**: Bennett-Brassard-Crépeau protocol with dynamic circuit feedforward ($100\%$ simulated fidelity).
- **`CS-101` — Cache-Conscious B-Tree in C++20**: 64-byte hardware cache-line aligned indexing ($14.2\text{ ns}$ P99 lookup latency).
- **`PHY-001` — Badminton Shuttlecock Aerodynamics & Smash Physics**: Runge-Kutta 4th-order (RK4) numerical trajectory integration ($418.5\text{ km/h}$ launch velocity, $C_d \approx 0.58$).
- **`QNT-004` — Quantum Gate Transpiler from Scratch**: Synthesizing Boolean logic into reversible Toffoli & Fredkin matrices with zero ancilla leakage.

### 4. Interactive Quantum Decoherence Instrument
- Interactive SVG state fidelity curve measuring wavefunction coherence $| \langle\psi_{\text{ideal}}|\psi_{\text{noisy}}\rangle |^2$ through circuit depth.
- Interactive timeline scrubbing to inspect gate phases and a live state tomography runner.

### 5. Kinetic Scroll-Reactive Particle Swarm & Animations
- **Wavefunction Particle Swarm (`ParticleSwarmCanvas`)**: 2,200+ stippled points that orbit, flock toward the cursor, and react dynamically to scroll velocity.
- **Scroll Progress Indicator**: Glowing gradient hairline progress bar across the bottom of the sticky navigation.
- **Motion Reveal Entrances (`motion/react`)**: Compositor-accelerated transitions with custom easing (`cubic-bezier(0.16, 1, 0.3, 1)`).
- **Animated Counters (`AnimatedCounter`)**: Quantitative metrics count up smoothly upon entering view.

---

## 🛠️ Tech Stack

- **Framework**: React 19 (SPA on Vite 8)
- **Language**: TypeScript 5.8+ (Strict Mode)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Motion & Animations**: `motion` (`motion/react`)
- **Canvas / Graphics**: Native HTML5 Canvas 2D + SVG Vector Graphics
- **Icons**: Lucide React
- **Audio Feedback**: Web Audio API (tactile synthesized clicks)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (version 20 or higher recommended)
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/akhil-pesala-portfolio.git
   cd akhil-pesala-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview the production build:
   ```bash
   npm run preview
   ```

---

## 📁 Project Structure

```
├── index.html                           # HTML entry point with fonts & meta tags
├── metadata.json                        # Applet metadata & permissions
├── package.json                         # Dependencies & build scripts
├── tsconfig.json                        # TypeScript configuration
├── vite.config.ts                       # Vite configuration with Tailwind CSS plugin
├── src/
│   ├── main.tsx                         # App entry point
│   ├── index.css                        # Tailwind v4 styles & custom font bindings
│   ├── App.tsx                          # Main application layout & coordinator
│   ├── types/
│   │   └── portfolio.ts                 # TypeScript interfaces for projects, articles, ledger
│   ├── data/
│   │   └── portfolioData.ts             # Default project files, articles, and research pillars
│   └── components/
│       ├── TopNav.tsx                   # 3-zone header with scroll progress & post trigger
│       ├── HeroSection.tsx              # Research manifesto & live metric counters
│       ├── CaseFilesGallery.tsx         # Filterable project dossiers & documentation cards
│       ├── BadmintonCalculationAnimation.tsx # 2D vector badminton bullet-time animation
│       ├── PerformanceInstrument.tsx    # Quantum gate fidelity & decoherence curve
│       ├── ClientLedger.tsx             # Expandable research experiment logs
│       ├── ServicesSection.tsx          # The four research facets ("One spine, four facets")
│       ├── LabSection.tsx               # Interactive latency probe & token simulator
│       ├── WritingSection.tsx           # Technical monographs & open field notes
│       ├── AboutSection.tsx             # Academic bio, coursework & athletics profile
│       ├── ContactSection.tsx           # Academic dispatch & direct email form
│       ├── Footer.tsx                   # Site footer with UTC clock & legal record
│       ├── CaseFileModal.tsx            # Full documentation modal with Markdown export
│       ├── NewProjectModal.tsx          # Project & documentation posting dialog
│       ├── ParticleSwarmCanvas.tsx      # Scroll-reactive 2D canvas quantum swarm
│       ├── ScrollReveal.tsx             # Reusable motion reveal wrapper
│       └── AnimatedCounter.tsx          # Scroll-triggered count-up metric display
```

---

## 📄 License

Open-source project licensed under the [Apache-2.0 License](LICENSE).
Research documentations and notebooks authored by **Akhil Pesala**.
