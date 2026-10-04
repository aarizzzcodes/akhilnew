import React, { useState } from 'react';
import { X, Plus, Code2, Cpu, CheckCircle2, FileText, Sparkles, Download } from 'lucide-react';
import { CaseFile } from '../types/portfolio.ts';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveProject: (newProject: CaseFile) => void;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
  onSaveProject
}) => {
  const [projectId, setProjectId] = useState(`QNT-00${Math.floor(Math.random() * 50 + 5)}`);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('QUANTUM ALGORITHMS');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [primaryMetricVal, setPrimaryMetricVal] = useState('99.4%');
  const [primaryMetricLabel, setPrimaryMetricLabel] = useState('State Fidelity on Noisy Simulator');
  const [qubits, setQubits] = useState(5);
  const [gateDepth, setGateDepth] = useState(42);
  const [codeFilename, setCodeFilename] = useState('circuits/grover_oracle.py');
  const [codeSnippet, setCodeSnippet] = useState(`from qiskit import QuantumCircuit, Aer, execute
import numpy as np

def build_quantum_oracle(n_qubits: int, target_state: str) -> QuantumCircuit:
    qc = QuantumCircuit(n_qubits, name="Oracle")
    # Apply phase inversion to target state
    for idx, bit in enumerate(reversed(target_state)):
        if bit == '0':
            qc.x(idx)
    qc.h(n_qubits - 1)
    qc.mcx(list(range(n_qubits - 1)), n_qubits - 1)
    qc.h(n_qubits - 1)
    return qc`);
  const [mathFormula, setMathFormula] = useState('|ψ⟩ = ∑ αᵢ|i⟩  where  ∑ |αᵢ|² = 1');
  const [architectureStack, setArchitectureStack] = useState('Qiskit, Python 3.12, NumPy, Matplotlib, LaTeX');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newProject: CaseFile = {
      id: projectId,
      client: title,
      logoText: title.slice(0, 8).toUpperCase(),
      tagline: tagline || title,
      description: description,
      categories: [category, 'B.TECH CS', 'RESEARCH DOCUMENTATION'],
      status: 'RESEARCH PAPER',
      metrics: {
        primaryValue: primaryMetricVal,
        primaryLabel: primaryMetricLabel,
        secondaryValue: `${qubits} Qubits`,
        secondaryLabel: `${gateDepth} Gate Depth`
      },
      details: {
        overview: description,
        challenge: `Designing a decoherence-resilient circuit within first-year constraints with optimal gate decomposition.`,
        solution: `Synthesized reversible unitary matrices and verified statevector amplitudes against classical matrix multiplication.`,
        architectureStack: architectureStack.split(',').map((s) => s.trim()),
        performanceDelta: {
          before: '2ⁿ classical checks',
          after: 'O(√N) quantum iterations',
          unit: 'Algorithmic Complexity',
          improvement: 'Quadratic Speedup'
        },
        codeExcerpt: {
          filename: codeFilename,
          language: 'python',
          code: codeSnippet
        },
        verificationDate: 'OCT 2026',
        verifiedBy: 'Akhil Pesala (B.Tech CS First Year)',
        mathFormulation: mathFormula,
        circuitDetails: {
          qubits,
          gateDepth,
          entangledPairs: Math.floor(qubits / 2),
          fidelity: primaryMetricVal
        }
      }
    };

    onSaveProject(newProject);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#0c0c0f] border border-white/20 rounded-xl p-6 sm:p-8 my-8 text-left shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 bg-white/10 rounded text-cyan-400">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-xl font-display font-bold text-white">
                Publish Project & Research Documentation
              </h2>
              <p className="text-xs font-mono text-neutral-400">
                Log a new quantum algorithm, CS architecture, or physics project to your record
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 font-mono text-xs">
          
          {/* Row 1: Code & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-neutral-400 mb-1">PROJECT ID / DOSSIER CODE</label>
              <input
                type="text"
                required
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full px-3 py-2 bg-[#050507] border border-white/15 rounded text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-neutral-400 mb-1">FIELD CATEGORY</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-[#050507] border border-white/15 rounded text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                <option value="QUANTUM ALGORITHMS">Quantum Algorithms & Circuits</option>
                <option value="CS FOUNDATIONS">CS Foundations & Data Structures</option>
                <option value="PHYSICS & KINETICS">Physics & Motion Simulation</option>
                <option value="QUANTUM CRYPTOGRAPHY">Quantum Cryptography & QKD</option>
                <option value="HARDWARE ARCHITECTURE">Hardware Architecture & Simulators</option>
              </select>
            </div>
          </div>

          {/* Row 2: Title */}
          <div>
            <label className="block text-neutral-400 mb-1">PROJECT TITLE *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Variational Quantum Eigensolver on Noisy Intermediate-Scale Qubits"
              className="w-full px-3 py-2 bg-[#050507] border border-white/15 rounded text-white focus:outline-none focus:border-cyan-400 font-sans text-sm"
            />
          </div>

          {/* Row 3: Tagline */}
          <div>
            <label className="block text-neutral-400 mb-1">ONE-LINE RESEARCH ABSTRACT</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. Hybrid classical-quantum gradient descent minimizing molecular Hamiltonian expectation value"
              className="w-full px-3 py-2 bg-[#050507] border border-white/15 rounded text-neutral-300 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Row 4: Full Documentation Abstract */}
          <div>
            <label className="block text-neutral-400 mb-1">DOCUMENTATION BODY & SYSTEM DESIGN *</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed description of the quantum circuit, complexity bounds, matrix transformations, and verification benchmark..."
              className="w-full px-3 py-2 bg-[#050507] border border-white/15 rounded text-white focus:outline-none focus:border-cyan-400 font-sans text-sm resize-none"
            />
          </div>

          {/* Row 5: Quantum Circuit Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-white/[0.02] border border-white/10 rounded">
            <div>
              <label className="block text-neutral-500 text-[10px] mb-1">QUBITS</label>
              <input
                type="number"
                min="1"
                max="128"
                value={qubits}
                onChange={(e) => setQubits(Number(e.target.value))}
                className="w-full px-2 py-1 bg-[#050507] border border-white/15 rounded text-white"
              />
            </div>
            <div>
              <label className="block text-neutral-500 text-[10px] mb-1">GATE DEPTH</label>
              <input
                type="number"
                min="1"
                max="5000"
                value={gateDepth}
                onChange={(e) => setGateDepth(Number(e.target.value))}
                className="w-full px-2 py-1 bg-[#050507] border border-white/15 rounded text-white"
              />
            </div>
            <div>
              <label className="block text-neutral-500 text-[10px] mb-1">KEY METRIC VALUE</label>
              <input
                type="text"
                value={primaryMetricVal}
                onChange={(e) => setPrimaryMetricVal(e.target.value)}
                placeholder="e.g. 99.8%"
                className="w-full px-2 py-1 bg-[#050507] border border-white/15 rounded text-emerald-400 font-bold"
              />
            </div>
            <div>
              <label className="block text-neutral-500 text-[10px] mb-1">METRIC CONTEXT</label>
              <input
                type="text"
                value={primaryMetricLabel}
                onChange={(e) => setPrimaryMetricLabel(e.target.value)}
                placeholder="e.g. State Fidelity"
                className="w-full px-2 py-1 bg-[#050507] border border-white/15 rounded text-white text-[11px]"
              />
            </div>
          </div>

          {/* Row 6: Mathematical Invariant */}
          <div>
            <label className="block text-neutral-400 mb-1">MATHEMATICAL FORMULATION / INVARIANT</label>
            <input
              type="text"
              value={mathFormula}
              onChange={(e) => setMathFormula(e.target.value)}
              placeholder="e.g. H = ∑ wᵢ Pᵢ,  ⟨H⟩ = ⟨ψ(θ)|H|ψ(θ)⟩"
              className="w-full px-3 py-2 bg-[#050507] border border-white/15 rounded text-cyan-300 font-mono"
            />
          </div>

          {/* Row 7: Code Excerpt */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-neutral-400">SOURCE CODE SNIPPET (QISKIT / C++ / PYTHON)</label>
              <input
                type="text"
                value={codeFilename}
                onChange={(e) => setCodeFilename(e.target.value)}
                placeholder="filename.py"
                className="w-48 px-2 py-0.5 bg-[#050507] border border-white/10 rounded text-[11px] text-neutral-300"
              />
            </div>
            <textarea
              rows={4}
              value={codeSnippet}
              onChange={(e) => setCodeSnippet(e.target.value)}
              className="w-full px-3 py-2 bg-[#050507] border border-white/15 rounded text-neutral-200 font-mono text-[11px] focus:outline-none focus:border-cyan-400 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-neutral-500 text-[11px]">
              COMMITS AS AKHIL PESALA · B.TECH FIRST YEAR CS
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-neutral-400 hover:text-white rounded transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-white text-black font-semibold rounded hover:bg-neutral-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Publish to Record</span>
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};
