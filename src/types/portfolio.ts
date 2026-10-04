export interface CaseFile {
  id: string; // e.g. "QNT-001"
  client: string; // Project title / Lab name
  logoText?: string;
  tagline: string;
  description: string;
  categories: string[];
  status: 'VERIFIED' | 'UNSEALED' | 'LIVE' | 'IN PRODUCTION' | 'RESEARCH PAPER';
  metrics: {
    primaryValue: string;
    primaryLabel: string;
    secondaryValue?: string;
    secondaryLabel?: string;
  };
  details: {
    overview: string;
    challenge: string;
    solution: string;
    architectureStack: string[];
    performanceDelta: {
      before: string;
      after: string;
      unit: string;
      improvement: string;
    };
    codeExcerpt?: {
      filename: string;
      language: string;
      code: string;
    };
    verificationDate: string;
    verifiedBy: string;
    mathFormulation?: string;
    circuitDetails?: {
      qubits: number;
      gateDepth: number;
      entangledPairs: number;
      fidelity: string;
    };
    testimonial?: {
      quote: string;
      author: string;
      role: string;
    };
  };
}

export interface LedgerEntry {
  id: string;
  client: string;
  scope: string;
  impact: string;
  status: 'VERIFIED' | 'FILE OPEN' | 'SEALED';
  year: string;
  category: string;
}

export interface WritingArticle {
  id: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  category: string;
  url?: string;
  metricsMentioned: string;
  fullContent?: string;
}

export interface ServiceFacet {
  id: string;
  number: string;
  title: string;
  summary: string;
  description: string;
  deliverables: string[];
  sampleModel: {
    label: string;
    items: { key: string; val: string }[];
  };
}
