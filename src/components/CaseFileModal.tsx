import React, { useEffect, useState } from 'react';
import { X, CheckCircle2, ArrowUpRight, Code2, Server, ShieldCheck, Cpu, Copy, Check, Download, Atom } from 'lucide-react';
import { CaseFile } from '../types/portfolio.ts';

interface CaseFileModalProps {
  caseFile: CaseFile | null;
  onClose: () => void;
  onContactRelated: (client: string) => void;
}

export const CaseFileModal: React.FC<CaseFileModalProps> = ({
  caseFile,
  onClose,
  onContactRelated
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [downloadedDoc, setDownloadedDoc] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (caseFile) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [caseFile, onClose]);

  if (!caseFile) return null;

  const handleCopyCode = () => {
    if (caseFile.details.codeExcerpt) {
      navigator.clipboard.writeText(caseFile.details.codeExcerpt.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleDownloadMarkdown = () => {
    const content = `# ${caseFile.client} (${caseFile.id})
**Author**: Akhil Pesala (B.Tech First Year Computer Science - Quantum Computing)
**Verification**: ${caseFile.details.verificationDate} - ${caseFile.details.verifiedBy}

## Abstract
${caseFile.description}

## Mathematical Invariant
\`\`\`
${caseFile.details.mathFormulation || 'N/A'}
\`\`\`

## System Overview & Challenge
${caseFile.details.overview}

### Challenge
${caseFile.details.challenge}

### Solution & Circuit Architecture
${caseFile.details.solution}

## Architecture Stack
${caseFile.details.architectureStack.join(', ')}

## Source Code (${caseFile.details.codeExcerpt?.filename || 'snippet.py'})
\`\`\`${caseFile.details.codeExcerpt?.language || 'python'}
${caseFile.details.codeExcerpt?.code || ''}
\`\`\`
`;
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${caseFile.id.toLowerCase()}_documentation.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloadedDoc(true);
    setTimeout(() => setDownloadedDoc(false), 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md transition-opacity"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#0c0c0e] border border-white/20 rounded-xl shadow-2xl p-6 sm:p-10 my-8 overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-8">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 text-xs font-mono font-semibold bg-cyan-400 text-black rounded">
              {caseFile.id}
            </span>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {caseFile.status}
            </span>
            <span className="text-neutral-500 font-mono text-xs hidden sm:inline">
              · Author: Akhil Pesala ({caseFile.details.verificationDate})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadMarkdown}
              className="px-3 py-1.5 text-xs font-mono border border-white/20 rounded hover:bg-white hover:text-black transition-colors flex items-center gap-1.5 text-neutral-300 cursor-pointer"
              title="Download documentation markdown file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloadedDoc ? 'Exported MD' : 'Export .MD'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              aria-label="Close case file"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="mb-8">
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2 flex items-center gap-1.5">
            <Atom className="w-3.5 h-3.5" />
            RESEARCH DOCUMENTATION DOSSIER
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-3">
            {caseFile.client}
          </h2>
          <p className="text-lg text-neutral-300 font-light leading-relaxed">
            {caseFile.tagline}
          </p>
        </div>

        {/* Mathematical Invariant Box */}
        {caseFile.details.mathFormulation && (
          <div className="mb-8 p-4 bg-black/60 border border-cyan-500/30 rounded-lg font-mono text-sm text-cyan-300">
            <div className="text-[11px] text-neutral-400 uppercase mb-1">Mathematical Formulation / Dirac Invariant</div>
            <div className="text-base sm:text-lg font-semibold">{caseFile.details.mathFormulation}</div>
          </div>
        )}

        {/* Circuit Specifications Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-white/[0.03] border border-white/10 rounded-lg mb-8 font-mono">
          <div>
            <div className="text-xs text-neutral-400 uppercase mb-1">Primary Result</div>
            <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
              {caseFile.metrics.primaryValue}
            </div>
            <div className="text-xs text-neutral-400 mt-1">
              {caseFile.metrics.primaryLabel}
            </div>
          </div>

          <div>
            <div className="text-xs text-neutral-400 uppercase mb-1">Circuit Register</div>
            <div className="text-2xl sm:text-3xl font-bold text-cyan-400 tabular-nums">
              {caseFile.details.circuitDetails?.qubits || 4} Qubits
            </div>
            <div className="text-xs text-neutral-400 mt-1">
              Depth: {caseFile.details.circuitDetails?.gateDepth || 38} native gates
            </div>
          </div>

          <div>
            <div className="text-xs text-neutral-400 uppercase mb-1">Complexity Delta</div>
            <div className="text-xl font-bold text-emerald-400 tabular-nums">
              {caseFile.details.performanceDelta.improvement}
            </div>
            <div className="text-xs text-neutral-400 mt-1">
              {caseFile.details.performanceDelta.before} → {caseFile.details.performanceDelta.after}
            </div>
          </div>

          <div>
            <div className="text-xs text-neutral-400 uppercase mb-1">Verification Lead</div>
            <div className="text-sm font-semibold text-neutral-200">
              {caseFile.details.verifiedBy}
            </div>
            <div className="text-xs text-neutral-500 mt-1">
              Academic Lab Submission
            </div>
          </div>
        </div>

        {/* Deep Dive Sections: Overview, Challenge, Solution */}
        <div className="space-y-6 mb-8 text-neutral-300 text-sm sm:text-base leading-relaxed">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-2 flex items-center gap-2">
              <Server className="w-4 h-4 text-cyan-400" />
              1. Theoretical Overview & System Scope
            </h3>
            <p className="text-neutral-300 font-light">{caseFile.details.overview}</p>
          </div>

          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-2 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-amber-400" />
              2. Architectural & Noise Bottlenecks
            </h3>
            <p className="text-neutral-300 font-light">{caseFile.details.challenge}</p>
          </div>

          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              3. Engineered Solution & Unitary Verification
            </h3>
            <p className="text-neutral-300 font-light">{caseFile.details.solution}</p>
          </div>
        </div>

        {/* Technical Architecture Stack */}
        <div className="mb-8">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
            VERIFIED TOOLCHAIN & RUNTIMES
          </div>
          <div className="flex flex-wrap gap-2">
            {caseFile.details.architectureStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 text-xs font-mono bg-white/5 border border-white/10 text-neutral-200 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Code Excerpt */}
        {caseFile.details.codeExcerpt && (
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2 px-1">
              <span className="flex items-center gap-1.5 text-neutral-300">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                {caseFile.details.codeExcerpt.filename}
              </span>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>
            <div className="bg-[#050507] border border-white/10 rounded-lg p-4 font-mono text-xs text-neutral-300 overflow-x-auto leading-relaxed">
              <pre>
                <code>{caseFile.details.codeExcerpt.code}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Testimonial Quote if present */}
        {caseFile.details.testimonial && (
          <div className="p-5 bg-white/[0.02] border-l-2 border-cyan-400 mb-8 italic text-neutral-300 text-sm">
            <p className="mb-2">"{caseFile.details.testimonial.quote}"</p>
            <div className="not-italic font-mono text-xs text-neutral-400">
              — <span className="text-white font-medium">{caseFile.details.testimonial.author}</span>, {caseFile.details.testimonial.role}
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
          <div className="text-xs font-mono text-neutral-500">
            RECORD #{caseFile.id} · OPEN RESEARCH SPECIFICATION
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              Close Dossier
            </button>
            <button
              onClick={() => {
                onClose();
                onContactRelated(caseFile.client);
              }}
              className="px-4 py-2 text-xs font-mono font-medium text-black bg-cyan-400 hover:bg-cyan-300 rounded transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Discuss Research with Akhil</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
