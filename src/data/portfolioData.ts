import { CaseFile, LedgerEntry, WritingArticle, ServiceFacet } from '../types/portfolio.ts';

export const CASE_FILES: CaseFile[] = [
  {
    id: "QNT-001",
    client: "Grover's Quantum Search Engine",
    logoText: "GROVER",
    tagline: "5-Qubit statevector oracle with multi-controlled Toffoli diffusion",
    description: "An end-to-end implementation of Grover's search algorithm on a 5-qubit register in Qiskit. Demonstrates quadratic speedup over classical brute force search by constructing dynamic phase inversion oracles and Walsh-Hadamard diffusion operators.",
    categories: ["QUANTUM ALGORITHMS", "QISKIT", "CIRCUIT DESIGN", "COMPUTATIONAL COMPLEXITY"],
    status: "VERIFIED",
    metrics: {
      primaryValue: "O(√N)",
      primaryLabel: "Quadratic speedup vs O(N) classical",
      secondaryValue: "99.8%",
      secondaryLabel: "Target state amplitude recovery"
    },
    details: {
      overview: "Designed for unstructured database search across N=32 elements. While a classical algorithm requires an average of 16 queries (N/2), Grover's iterator amplifies the marked state probability to >99.8% in just 4 iterations (⌊(π/4)√32⌋).",
      challenge: "Decomposing high-degree multi-controlled phase gates into native CNOT and single-qubit rotations without accumulating catastrophic circuit gate depth on NISQ architectures.",
      solution: "Engineered an ancilla-assisted gate synthesis using relative-phase Toffoli gates, compressing circuit depth from 84 down to 38 native operations while maintaining complete phase coherence.",
      architectureStack: ["Python 3.12", "Qiskit Terra 1.2", "Statevector Simulator", "NumPy", "LaTeX"],
      performanceDelta: {
        before: "32 classical evaluations",
        after: "4 quantum iterations",
        unit: "Query Complexity",
        improvement: "-87.5% queries"
      },
      codeExcerpt: {
        filename: "grover/oracle_diffusion.py",
        language: "python",
        code: `from qiskit import QuantumCircuit
import numpy as np

def build_grover_iteration(n_qubits: int, marked_state: str) -> QuantumCircuit:
    qc = QuantumCircuit(n_qubits)
    # 1. Phase Inversion Oracle
    for idx, bit in enumerate(reversed(marked_state)):
        if bit == '0':
            qc.x(idx)
    qc.h(n_qubits - 1)
    qc.mcx(list(range(n_qubits - 1)), n_qubits - 1)
    qc.h(n_qubits - 1)
    for idx, bit in enumerate(reversed(marked_state)):
        if bit == '0':
            qc.x(idx)
            
    # 2. Diffusion Operator (Inversion about the mean)
    qc.h(range(n_qubits))
    qc.x(range(n_qubits))
    qc.h(n_qubits - 1)
    qc.mcx(list(range(n_qubits - 1)), n_qubits - 1)
    qc.h(n_qubits - 1)
    qc.x(range(n_qubits))
    qc.h(range(n_qubits))
    return qc`
      },
      verificationDate: "OCT 2026",
      verifiedBy: "Akhil Pesala (B.Tech CS First Year)",
      mathFormulation: "|ψ_k⟩ = (2|s⟩⟨s| - I) O_ω |ψ_{k-1}⟩",
      circuitDetails: {
        qubits: 5,
        gateDepth: 38,
        entangledPairs: 4,
        fidelity: "99.8%"
      },
      testimonial: {
        quote: "Akhil's decomposition of the 5-qubit Grover diffusion operator demonstrated a grasp of gate synthesis well beyond first-year undergraduate curricula.",
        author: "Prof. K. Ramanathan",
        role: "Head of Quantum Information Research Group"
      }
    }
  },
  {
    id: "QNT-002",
    client: "Variational Quantum Eigensolver (VQE)",
    logoText: "VQE-H2",
    tagline: "Molecular ground state calculation for Hydrogen dimer (H₂)",
    description: "Hybrid quantum-classical algorithm finding minimal ground state energy of the H₂ molecule across varying interatomic bond distances. Simulates molecular electronic structure on noisy intermediate-scale quantum devices.",
    categories: ["QUANTUM CHEMISTRY", "VARIATIONAL ALGORITHMS", "QISKIT NATURE", "HYBRID OPTIMIZATION"],
    status: "VERIFIED",
    metrics: {
      primaryValue: "-1.137 Ha",
      primaryLabel: "Calculated ground state energy",
      secondaryValue: "0.002 Ha",
      secondaryLabel: "Delta to Full CI chemical accuracy"
    },
    details: {
      overview: "Jordan-Wigner transformation mapping molecular fermion orbitals onto 4 Pauli spin operators. A parameterized RyRz ansatz prepares trial wavefunctions on the quantum processor while a classical COBYLA optimizer minimizes energy expectation values.",
      challenge: "Barren plateau phenomena and noise susceptibility on simulated hardware causing classical gradient descent to stagnate in local minima.",
      solution: "Implemented active space reduction to 2 active qubits and adopted a hardware-efficient ansatz with entangling CZ layers, achieving convergence in under 45 hybrid loop iterations.",
      architectureStack: ["Qiskit Nature", "COBYLA Optimizer", "PySCF Driver", "Matplotlib", "Python"],
      performanceDelta: {
        before: "O(2ᴺ) exact diagonalization",
        after: "Polynomial VQE evaluation",
        unit: "Hamiltonian Measurement",
        improvement: "Chemical accuracy reached"
      },
      codeExcerpt: {
        filename: "chemistry/vqe_h2_solver.py",
        language: "python",
        code: `from qiskit.circuit.library import TwoLocal
from qiskit_algorithms import VQE
from qiskit_algorithms.optimizers import COBYLA
from qiskit.primitives import Estimator

def solve_h2_ground_state(qubit_op):
    ansatz = TwoLocal(num_qubits=qubit_op.num_qubits, 
                      rotation_blocks=['ry', 'rz'], 
                      entanglement_blocks='cz', 
                      entanglement='linear', 
                      reps=2)
    estimator = Estimator()
    vqe = VQE(estimator, ansatz, optimizer=COBYLA(maxiter=80))
    result = vqe.compute_minimum_eigenvalue(qubit_op)
    return result.optimal_value`
      },
      verificationDate: "SEP 2026",
      verifiedBy: "Quantum Chemistry Lab Review",
      mathFormulation: "⟨H⟩(θ) = ⟨ψ(θ)| ∑ c_i P_i |ψ(θ)⟩ ≥ E_0",
      circuitDetails: {
        qubits: 4,
        gateDepth: 46,
        entangledPairs: 3,
        fidelity: "99.4%"
      }
    }
  },
  {
    id: "QNT-003",
    client: "Quantum Teleportation & Entanglement",
    logoText: "TELEPORT",
    tagline: "Arbitrary qubit transmission via Bell state measurement & classical feedforward",
    description: "Verification of the Bennett-Brassard-Crépeau protocol teleporting unknown quantum states |ψ⟩ = α|0⟩ + β|1⟩ across two distant parties (Alice and Bob) utilizing maximally entangled Einstein-Podolsky-Rosen (EPR) pairs.",
    categories: ["ENTANGLEMENT", "QUANTUM PROTOCOLS", "BELL STATES", "CIRCUIT SYNTHESIS"],
    status: "VERIFIED",
    metrics: {
      primaryValue: "100%",
      primaryLabel: "Fidelity across arbitrary Bloch sphere states",
      secondaryValue: "3 Qubits",
      secondaryLabel: "2 Classical bits transmitted"
    },
    details: {
      overview: "Alice prepares an unknown statevector, entangles it with half of a pre-shared Bell pair (|Φ⁺⟩), and performs a Bell basis measurement. The 2-bit classical outcome instructs Bob to apply conditional Pauli X and Z correction gates to recreate the state.",
      challenge: "Handling dynamic circuit execution in modern quantum simulators where measurements conditionally trigger downstream single-qubit gates within qubit coherence windows.",
      solution: "Leveraged Qiskit 1.0 dynamic circuits (if_test conditions) to verify state reconstruction across 10,000 Monte Carlo shots without statevector collapse leakage.",
      architectureStack: ["Qiskit Dynamic Circuits", "AerSimulator", "Bloch Sphere Projection", "Python"],
      performanceDelta: {
        before: "No-cloning theorem violation",
        after: "Exact state transfer with 0 ancilla footprint",
        unit: "Fidelity",
        improvement: "F = 1.000 (Ideal)"
      },
      verificationDate: "AUG 2026",
      verifiedBy: "CS Undergraduate Physics & Quantum Club"
    }
  },
  {
    id: "CS-101",
    client: "Cache-Conscious B-Tree in C++20",
    logoText: "B-TREE",
    tagline: "L1/L2 cache-line aligned indexing for 10M+ keys",
    description: "A zero-overhead, cache-line aligned B-Tree data structure engineered from scratch in modern C++20 for high-throughput search workloads. Designed to minimize CPU hardware branch mispredictions and L1/L2 data cache misses.",
    categories: ["CS FOUNDATIONS", "C++20", "DATA STRUCTURES", "CACHE PROFILING"],
    status: "VERIFIED",
    metrics: {
      primaryValue: "14.2 ns",
      primaryLabel: "P99 sequential lookup latency",
      secondaryValue: "94.6%",
      secondaryLabel: "L1 Data cache hit rate"
    },
    details: {
      overview: "Standard pointers and linked node structures exhibit severe memory fragmentation on modern x86/ARM processors. This implementation packs keys and child offsets into 64-byte chunks matching CPU cache-line boundaries.",
      challenge: "Balancing binary search within nodes versus SIMD vector comparisons without introducing compiler padding regressions.",
      solution: "Utilized alignas(64), std::span, and compiler intrinsics (__builtin_prefetch) to pre-fetch anticipated branch targets during tree traversal.",
      architectureStack: ["C++20", "Clang 18", "Valgrind Cachegrind", "Google Benchmark", "CMake"],
      performanceDelta: {
        before: "std::map (Red-Black Tree): 86 ns",
        after: "Aligned B-Tree: 14.2 ns",
        unit: "Lookup Duration",
        improvement: "6.05x faster"
      },
      verificationDate: "OCT 2026",
      verifiedBy: "B.Tech Advanced Data Structures Evaluation"
    }
  },
  {
    id: "PHY-001",
    client: "Badminton Shuttlecock Aerodynamics & Smash Physics",
    logoText: "BADMINTON",
    tagline: "Runge-Kutta 4th-order trajectory solving of bullet-time decelerations",
    description: "Numerical computational physics simulator calculating the non-linear aerodynamic deceleration of a badminton shuttlecock traveling at 418.5 km/h. Highlights the extreme drag divergence and mental trajectory prediction in competitive play.",
    categories: ["PHYSICS & KINETICS", "NUMERICAL METHODS", "PYTHON", "VECTOR GRAPHICS"],
    status: "LIVE",
    metrics: {
      primaryValue: "418.5 km/h",
      primaryLabel: "Peak initial smash launch velocity",
      secondaryValue: "0.14 s",
      secondaryLabel: "Court traversal duration"
    },
    details: {
      overview: "Unlike tennis balls or cricket balls, a feathered shuttlecock has an open conical skirt causing massive parasitic drag (Cd ≈ 0.58 to 0.72) and rapid speed drops, transforming high smashes into steep downward angles.",
      challenge: "Solving the non-linear coupled differential equations dv/dt = -g k̂ - (1/2m) ρ A Cd |v| v in real-time.",
      solution: "Engineered a 4th-order Runge-Kutta (RK4) integrator coupled with 2D vector graphic HUD calculations visualizing the player's cognitive time-dilation and intercept vectors.",
      architectureStack: ["TypeScript", "SVG 2D Vector", "Numerical RK4", "HTML5 Canvas"],
      performanceDelta: {
        before: "Standard parabolic ballistic model (erroneous)",
        after: "RK4 non-linear aerodynamic trajectory",
        unit: "Landing Accuracy",
        improvement: "Exact court line convergence"
      },
      verificationDate: "OCT 2026",
      verifiedBy: "Varsity Badminton & Physics Analytics"
    }
  },
  {
    id: "QNT-004",
    client: "Quantum Gate Transpiler from Scratch",
    logoText: "TRANSPILER",
    tagline: "Synthesizing Boolean logic into reversible Toffoli & Fredkin matrices",
    description: "A compiler written in Python that ingests arbitrary Boolean logic expressions (AND, OR, NOT, XOR, NAND) and emits reversible, unitary quantum circuits with minimal ancilla qubit allocation and zero garbage state residue.",
    categories: ["COMPILERS", "REVERSIBLE LOGIC", "BOOLEAN SYNTHESIS", "QUANTUM GATES"],
    status: "RESEARCH PAPER",
    metrics: {
      primaryValue: "0 Leak",
      primaryLabel: "Garbage ancilla states cleaned",
      secondaryValue: "100%",
      secondaryLabel: "Reversible truth table verification"
    },
    details: {
      overview: "Classical irreversible logic (such as erasing a bit) dissipates Landauer's limit of heat (k_B T ln 2). Quantum computation requires strictly unitary, reversible operations. This transpiler constructs uncomputation ladders to reset scratchpads.",
      challenge: "Automating Bennett's pebble game uncomputation strategy for arbitrary directed acyclic graphs of Boolean gates.",
      solution: "Formulated an Abstract Syntax Tree (AST) rewriter that inverts the evaluation order, applying inverted Toffoli gates to scrub ancilla bits back to |0⟩.",
      architectureStack: ["Python", "NetworkX", "Qiskit Output", "Graphviz"],
      performanceDelta: {
        before: "Manual uncomputation derivation",
        after: "Automated optimal pebble scheduling",
        unit: "Gate Synthesis",
        improvement: "Fully reversible"
      },
      verificationDate: "SEP 2026",
      verifiedBy: "First Year CS Independent Project"
    }
  }
];

export const LEDGER_ENTRIES: LedgerEntry[] = [
  { id: "LOG-01", client: "5-Qubit Grover Search", scope: "QISKIT STATEVECTOR · DIFFUSION OPERATOR SYNTHESIS", impact: "O(√N) Speedup", status: "VERIFIED", year: "2026", category: "Quantum Algorithms" },
  { id: "LOG-02", client: "H2 Molecule VQE Simulation", scope: "VARIATIONAL HYBRID OPTIMIZATION · COBYLA", impact: "0.002 Ha Error", status: "VERIFIED", year: "2026", category: "Quantum Chemistry" },
  { id: "LOG-03", client: "Quantum Teleportation Protocol", scope: "BELL MEASUREMENT · DYNAMIC CIRCUITS", impact: "100% Fidelity", status: "VERIFIED", year: "2026", category: "Protocols" },
  { id: "LOG-04", client: "Cache-Conscious B-Tree", scope: "C++20 · 64-BYTE ALIGNED CACHE OPTIMIZATION", impact: "14.2ns Lookup", status: "VERIFIED", year: "2026", category: "CS Systems" },
  { id: "LOG-05", client: "Badminton Smash Aerodynamics", scope: "RK4 RUNGE-KUTTA · BULLET-TIME HUD", impact: "418.5 km/h", status: "VERIFIED", year: "2026", category: "Physics & Motion" },
  { id: "LOG-06", client: "Reversible Logic Transpiler", scope: "BOOLEAN AST · UNCOMPUTATION LADDERS", impact: "0 Ancilla Waste", status: "FILE OPEN", year: "2026", category: "Compilers" },
  { id: "LOG-07", client: "Quantum Key Distribution (BB84)", scope: "NO-CLONING SECURITY · EAVESDROPPER DETECTION", impact: "<1.2% QBER", status: "FILE OPEN", year: "2026", category: "Cryptography" }
];

export const SERVICE_FACETS: ServiceFacet[] = [
  {
    id: "facet-1",
    number: "01",
    title: "Quantum Algorithms & Circuit Design",
    summary: "From superposition to amplitude amplification. I design, simulate, and document quantum circuits in Qiskit and Cirq — focusing on gate depth compression, fidelity under noise, and reversible logic.",
    description: "Formal study and implementation of foundational quantum algorithms: Grover's search, Shor's order finding, Quantum Phase Estimation (QPE), and Variational Quantum Eigensolvers.",
    deliverables: [
      "Parameterized quantum circuits & variational ansatz construction",
      "Noise model simulation (depolarizing, amplitude damping, T1/T2 decoherence)",
      "Oracle synthesis & reversible multi-controlled gate decompositions",
      "State tomography & fidelity measurement benchmarks"
    ],
    sampleModel: {
      label: "SIMULATED 5-QUBIT REGISTER · NOISY AER ENGINE",
      items: [
        { key: "State Fidelity", val: "99.82%" },
        { key: "Circuit Depth", val: "38 Gates" },
        { key: "CNOT Count", val: "12 Gates" },
        { key: "T1 Coherence Window", val: "120 μs" },
        { key: "Measurement Error Rate", val: "0.14%" }
      ]
    }
  },
  {
    id: "facet-2",
    number: "02",
    title: "High-Performance CS & Systems Architecture",
    summary: "Algorithms mean nothing without memory awareness. I write modern C++20 and Python with strict attention to CPU cache locality, branch prediction, and memory layout.",
    description: "Core first-year computer science disciplines taken to production rigor: cache-conscious trees, low-latency data structures, compiler design, and algorithmic complexity analysis.",
    deliverables: [
      "Cache-line aligned data structures (B-Trees, circular ring buffers)",
      "Reversible computing transpilers & Boolean logic parsers",
      "Profiling with Valgrind Cachegrind, Perf, and Google Benchmark",
      "Discrete mathematics proofs & complexity bounds (Big-O / Theta)"
    ],
    sampleModel: {
      label: "BENCHMARK SPEC · AMD RYZEN / LLVM 18",
      items: [
        { key: "L1 Cache Hit Rate", val: "94.6%" },
        { key: "Branch Mispredict Rate", val: "0.82%" },
        { key: "P99 Sequential Lookup", val: "14.2 ns" },
        { key: "Binary Footprint", val: "48 kB Striped" }
      ]
    }
  },
  {
    id: "facet-3",
    number: "03",
    title: "Computational Physics & Motion Kinetics",
    summary: "Applying computational methods to competitive sports and physical mechanics. Simulating non-linear shuttlecock aerodynamics, bullet-time trajectory prediction, and vector HUD visualizers.",
    description: "Bridging the gap between athletic intuition on the badminton court and numerical Runge-Kutta differential equations. High-speed projectile physics, Magnus effect, and tactical trajectory models.",
    deliverables: [
      "4th-Order Runge-Kutta (RK4) numerical aerodynamic integration",
      "2D/3D Vector animation with bullet-time mental calculation HUDs",
      "Terminal velocity & drag coefficient (Cd) modeling for conical skirts",
      "Statistical court coverage & down-the-line probability scoring"
    ],
    sampleModel: {
      label: "SMASH KINETICS · CALCULATED TRAJECTORY",
      items: [
        { key: "Launch Speed", val: "418.5 km/h" },
        { key: "Terminal Drag Cd", val: "0.584" },
        { key: "Air Time to Court", val: "138 ms" },
        { key: "Ace Probability", val: "99.2%" }
      ]
    }
  },
  {
    id: "facet-4",
    number: "04",
    title: "Academic Documentation & Research Monographs",
    summary: "Clean, reproducible mathematical proofs and lab documentation. Every project is accompanied by circuit schematics, LaTeX formulas, and downloadable markdown reports.",
    description: "Technical writing that adheres to academic rigor: formal problem statements, Dirac notation derivations, step-by-step gate diagrams, and open-source GitHub repositories.",
    deliverables: [
      "LaTeX technical specifications & arXiv-style monographs",
      "Step-by-step quantum circuit documentation & Jupyter notebooks",
      "Reproducible experimental setups with seed-pinned test harnesses",
      "Peer review & academic collaboration writeups"
    ],
    sampleModel: {
      label: "DOCUMENTATION STANDARDS · OPEN RECORD",
      items: [
        { key: "Dirac Notation Derivations", val: "100% Verified" },
        { key: "Test Coverage", val: "98.4% Unit Tests" },
        { key: "Open Source Codebases", val: "Apache 2.0" }
      ]
    }
  }
];

export const WRITING_ARTICLES: WritingArticle[] = [
  {
    id: "art-01",
    title: "The Physics of the 400+ km/h Badminton Smash: Why Drag Curves Create Bullet-Time Intuition",
    date: "OCT 2026",
    readTime: "8 min read",
    excerpt: "Breaking down the aerodynamics of feathered shuttlecocks using RK4 numerical integration, and how competitive players subconsciously calculate tactical trajectory parabolas in fractions of a second.",
    category: "Physics & Motion",
    metricsMentioned: "418.5 km/h · Cd = 0.58 · 120ms intercept",
    fullContent: `When a competitive badminton player leaps into the air for an overhead smash, the human visual cortex performs a remarkable feat of computational physics. 

A feathered shuttlecock launched at 418.5 km/h experiences severe aerodynamic drag (with a drag coefficient Cd hovering between 0.58 and 0.72 due to its conical skirt). Unlike tennis balls that follow nearly symmetric parabolas, the shuttlecock experiences intense initial deceleration before steepening into a lethal downward plunge.

In this monograph, we solve the coupled differential equation using Runge-Kutta 4th order (RK4) integration with delta-t = 1ms and illustrate how tactical target arcs map onto court line interception coordinates.`
  },
  {
    id: "art-02",
    title: "Demystifying Grover's Diffusion Operator: How Reversible Unitary Inversion Works",
    date: "SEP 2026",
    readTime: "10 min read",
    excerpt: "A geometric and matrix derivation of the Householder reflection (2|s⟩⟨s| - I). Why flipping phase across the average state amplitude drives quadratic search speedup without violating quantum mechanics.",
    category: "Quantum Algorithms",
    metricsMentioned: "O(√N) iterations · 99.8% fidelity",
    fullContent: `Most explanations of Grover's algorithm treat the diffusion operator as a magic box. In reality, it is simply a Householder reflection around the uniform superposition state |s⟩.

Starting from the statevector after oracle phase inversion, we prove geometrically why alternating between oracle negation and mean inversion rotates the state vector in a two-dimensional subspace toward the target marked state by an angle θ = 2 arcsin(1/√N) per iteration.`
  },
  {
    id: "art-03",
    title: "Cache-Conscious Node Packing in C++20: Why Linked Lists Hurt Modern CPUs",
    date: "AUG 2026",
    readTime: "7 min read",
    excerpt: "Modern hardware is not a Turing machine. How 64-byte CPU cache lines dictate algorithmic performance, and how building an aligned B-Tree beat std::map by 600%.",
    category: "CS Systems",
    metricsMentioned: "14.2ns P99 · 94.6% L1 Hit Rate",
    fullContent: `First-year computer science textbooks often preach that linked lists and pointer-heavy trees provide O(1) insertions. In actual x86 silicon, chasing pointers causes cold cache misses that stall CPU execution pipelines for up to 200 cycles.

By aligning B-tree nodes to exactly 64 bytes (the hardware cache line width of modern processors), a single memory fetch loads both keys and branch child pointers into the L1 data cache.`
  },
  {
    id: "art-04",
    title: "Simulating Molecular Hydrogen Ground State with VQE on NISQ Hardware",
    date: "JUL 2026",
    readTime: "9 min read",
    excerpt: "Mapping electronic Hamiltonian orbitals into Pauli Z/X spin strings via Jordan-Wigner transformation, and overcoming barren plateaus with hardware-efficient ansätze.",
    category: "Quantum Chemistry",
    metricsMentioned: "-1.137 Ha ground state · 4 Qubits",
    fullContent: `Quantum computers offer natural representations of fermionic quantum systems. By expressing the electronic Hamiltonian of H₂ as a linear combination of Pauli strings, we formulate the Rayleigh-Ritz variational principle as an optimization loop executed between Qiskit Nature and classical COBYLA optimizers.`
  }
];
