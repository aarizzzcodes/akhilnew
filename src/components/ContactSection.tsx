import React, { useState } from 'react';
import { Send, CheckCircle2, Copy, Check, Mail, ArrowUpRight, ShieldCheck, Atom } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal.tsx';

interface ContactSectionProps {
  initialSubject?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialSubject = '' }) => {
  const [inquiryType, setInquiryType] = useState<string>(
    initialSubject ? 'Quantum Computing Research Collab' : 'Quantum Computing Research Collab'
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [institution, setInstitution] = useState('');
  const [message, setMessage] = useState(
    initialSubject ? `Inquiring regarding research dossier: ${initialSubject}` : ''
  );
  
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dispatchReceipt, setDispatchReceipt] = useState<{
    id: string;
    timestamp: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const inquiryTypes = [
    'Quantum Computing Research Collab',
    'Hackathon Team Collaboration',
    'C++ Systems & Open Source',
    'Badminton Kinetics & Sports Analytics',
    'Academic Mentorship / Advisory'
  ];

  const contactEmail = 'akhilpesala.cs@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg('Please complete all required fields (Name, Email, Message).');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setDispatchReceipt({
        id: `QNT-DISPATCH-${Math.floor(100000 + Math.random() * 900000)}`,
        timestamp: new Date().toISOString()
      });
    }, 900);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setInstitution('');
    setMessage('');
    setDispatchReceipt(null);
  };

  return (
    <section id="contact" className="py-20 border-b border-white/[0.08] relative bg-[#060608]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Breadcrumb */}
        <ScrollReveal direction="down" delay={0.05}>
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-neutral-400 mb-6">
            <span className="text-white font-semibold">CONTACT</span>
            <span className="text-neutral-600">·</span>
            <span>RESEARCH DISPATCH</span>
            <span className="text-neutral-600">·</span>
            <span className="text-cyan-400">AKHIL PESALA</span>
          </div>
        </ScrollReveal>

        {/* Section Headline */}
        <div className="max-w-4xl mb-12">
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-4xl sm:text-6xl font-display font-bold text-white tracking-tight mb-6">
              Initiate academic dispatch.
            </h2>
            <p className="text-lg sm:text-xl text-neutral-300 font-light leading-relaxed">
              Interested in collaborating on quantum algorithm benchmarks, NISQ noise modeling,
              low-level C++ data structures, or physics computing? Reach me through the record below
              or directly at{' '}
              <button
                onClick={handleCopyEmail}
                className="text-cyan-400 font-medium underline underline-offset-4 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                {contactEmail}
              </button>.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-8">
            <ScrollReveal direction="left" delay={0.15}>
              <div className="bg-[#0a0a0d] border border-white/15 rounded-xl p-6 sm:p-10">
                {dispatchReceipt ? (
                  <div className="space-y-6 font-mono text-left">
                    <div className="flex items-center gap-3 text-emerald-400">
                      <CheckCircle2 className="w-6 h-6" />
                      <span className="text-lg font-bold">DISPATCH RECORDED ON PERMANENT INBOX</span>
                    </div>

                    <p className="text-sm text-neutral-300 font-sans leading-relaxed">
                      Thank you, <strong className="text-white">{name}</strong>. Your inquiry regarding{' '}
                      <strong className="text-cyan-400">{inquiryType}</strong> has been logged to Akhil Pesala's
                      academic inbox. A technical response will be returned to{' '}
                      <strong className="text-white">{email}</strong> promptly.
                    </p>

                    <div className="p-5 bg-white/[0.03] border border-white/10 rounded-lg text-xs space-y-2">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Dispatch ID:</span>
                        <span className="text-cyan-300 font-semibold">{dispatchReceipt.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Recorded At:</span>
                        <span className="text-neutral-300">{dispatchReceipt.timestamp}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Target Scholar:</span>
                        <span className="text-white font-semibold">Akhil Pesala (B.Tech CS)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Status:</span>
                        <span className="text-emerald-400 font-mono">200 OK · QUEUED FOR REVIEW</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                      <button
                        onClick={handleReset}
                        className="px-4 py-2 text-xs font-mono text-white border border-white/20 hover:bg-white hover:text-black rounded transition-colors cursor-pointer"
                      >
                        Submit Another Dispatch
                      </button>
                      <a
                        href={`mailto:${contactEmail}`}
                        className="px-4 py-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
                      >
                        Open Direct Mail →
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Inquiry Type Selector */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                        01. SELECT COLLABORATION TOPIC
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {inquiryTypes.map((type) => (
                          <button
                            type="button"
                            key={type}
                            onClick={() => setInquiryType(type)}
                            className={`px-3 py-1.5 text-xs font-mono rounded transition-all cursor-pointer ${
                              inquiryType === type
                                ? 'bg-cyan-400 text-black font-semibold'
                                : 'bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                          02. YOUR NAME *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Dr. K. Ramanathan"
                          className="w-full px-4 py-2.5 bg-[#050507] border border-white/15 rounded text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-neutral-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                          03. EMAIL ADDRESS *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. researcher@university.edu"
                          className="w-full px-4 py-2.5 bg-[#050507] border border-white/15 rounded text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-neutral-600"
                        />
                      </div>
                    </div>

                    {/* University / Institution */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                        04. UNIVERSITY / INSTITUTION / LAB
                      </label>
                      <input
                        type="text"
                        value={institution}
                        onChange={(e) => setInstitution(e.target.value)}
                        placeholder="e.g. Department of Computer Science & Quantum Information Lab"
                        className="w-full px-4 py-2.5 bg-[#050507] border border-white/15 rounded text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-neutral-600"
                      />
                    </div>

                    {/* Message / Scope */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                        05. RESEARCH TOPIC OR PROJECT SCOPE *
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Detail your research question, proposed circuit simulation, hackathon idea, or technical question..."
                        className="w-full px-4 py-3 bg-[#050507] border border-white/15 rounded text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-neutral-600 resize-none font-sans"
                      />
                    </div>

                    {errorMsg && (
                      <div className="p-3 bg-red-950/40 border border-red-800/50 rounded text-red-300 text-xs font-mono">
                        {errorMsg}
                      </div>
                    )}

                    {/* Submit button */}
                    <div className="pt-2 flex items-center justify-between">
                      <div className="text-[11px] font-mono text-neutral-500">
                        DIRECT DISPATCH TO AKHIL PESALA · ACADEMIC RECORD
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2.5 bg-cyan-400 text-black font-mono text-xs font-semibold rounded hover:bg-cyan-300 transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        <Send className={`w-3.5 h-3.5 ${isSubmitting ? 'animate-bounce' : ''}`} />
                        <span>{isSubmitting ? 'Transmitting...' : 'Dispatch to Scholar'}</span>
                      </button>
                    </div>

                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-6">
            <ScrollReveal direction="right" delay={0.2}>
              <div className="bg-[#0a0a0d] border border-white/15 rounded-xl p-6 font-mono text-xs">
                <div className="text-cyan-400 uppercase mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>SCHOLAR INBOX</span>
                </div>
                <div className="text-sm font-semibold text-white mb-3 break-all">
                  {contactEmail}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="flex-1 py-2 px-3 bg-white/5 border border-white/10 hover:border-white/30 rounded text-neutral-200 hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied Email</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${contactEmail}?subject=Quantum%20Computing%20Inquiry%20via%20Profile`}
                    className="py-2 px-3 border border-white/10 hover:border-white/30 rounded text-neutral-200 hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span>Open Client</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Profile Status */}
              <div className="bg-[#0a0a0d] border border-white/15 rounded-xl p-6 font-mono text-xs space-y-4 mt-6">
                <div className="flex items-center gap-2 text-white font-bold border-b border-white/10 pb-3">
                  <Atom className="w-4 h-4 text-cyan-400" />
                  <span>CURRENT ENGAGEMENTS</span>
                </div>

                <div className="space-y-3 text-neutral-300">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Degree:</span>
                    <span className="text-white">B.Tech CS (First Year)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Research Focus:</span>
                    <span className="text-cyan-300">Quantum Algorithms & Qiskit</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Sports:</span>
                    <span className="text-white">Competitive Badminton Varsity</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Availability:</span>
                    <span className="text-emerald-400">Open for Research Collabs</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
};
