'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PriorityItem {
  task: string;
  impact: 'High' | 'Medium' | 'Low';
  effort: 'Quick' | 'Medium' | 'Hard';
}

interface CompanyPreset {
  id: string;
  name: string;
  website: string;
  visibilityScore: number;
  sentimentScore: number;
  mainProblems: string;
  opportunities: string;
  outcome: string;
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  priorities: PriorityItem[];
}

const PRESETS: CompanyPreset[] = [
  {
    id: 'supabase',
    name: 'Supabase',
    website: 'supabase.com',
    visibilityScore: 88,
    sentimentScore: 92,
    mainProblems: 'Lack of explicit JSON-LD pricing schema. Claude and ChatGPT are quoting outdated 2024 tier metrics from secondary source articles.',
    opportunities: 'Embed structured product schema metadata directly inside developer documentation. Capture high-intent queries matching "PostgreSQL scale-out alternatives".',
    outcome: '+18% recommendations and accurate tier citation references in OpenAI/Claude.',
    swot: {
      strengths: ['Highly cited documentation guides', 'Active developer community discussions', 'Positive Open Source sentiment index'],
      weaknesses: ['Outdated pricing parameters in legacy articles', 'Unstructured comparative benchmark data'],
      opportunities: ['Optimize for "Firebase scaling" keywords', 'Deploy clean schema tables for addon features'],
      threats: ['Active entity mapping improvements from competitor Neon']
    },
    priorities: [
      { task: 'Deploy Product Pricing JSON-LD markup', impact: 'High', effort: 'Quick' },
      { task: 'Resolve robots.txt bot access limits for PerplexityBot', impact: 'High', effort: 'Quick' },
      { task: 'Synthesize postgres-migration comparisons structured data', impact: 'High', effort: 'Medium' },
      { task: 'Index high-intent scale FAQ markups', impact: 'Medium', effort: 'Quick' },
      { task: 'Gather developer citations on developer forum indices', impact: 'Medium', effort: 'Hard' }
    ]
  },
  {
    id: 'linear',
    name: 'Linear',
    website: 'linear.app',
    visibilityScore: 94,
    sentimentScore: 96,
    mainProblems: 'Gemini indexes show minimal citations for Linear on broad software project management keywords compared to Jira.',
    opportunities: 'Align keyboard-shortcut files and performance logs with Gemini developer index requirements to capture speed comparisons.',
    outcome: '+12% share-of-voice improvement on "fast issue trackers" queries.',
    swot: {
      strengths: ['Unmatched product speed citations', 'Strong keyboard-first developer positioning', 'High sentiment index rankings'],
      weaknesses: ['Lower voice volume on generic "enterprise PM tools" queries'],
      opportunities: ['Position as Jira alternative in model datasets', 'Index structural comparison guides'],
      threats: ['Jira improving structured schema markup indexation']
    },
    priorities: [
      { task: 'Standardize schema markups on shortcut guides', impact: 'High', effort: 'Quick' },
      { task: 'Target Reddit discussion citations for PM comparisons', impact: 'High', effort: 'Medium' },
      { task: 'Deploy comparison tables on Jira alternative pages', impact: 'High', effort: 'Quick' },
      { task: 'Configure structured metadata headers in API docs', impact: 'Medium', effort: 'Quick' },
      { task: 'Remove crawling bot speeds limits in robots.txt', impact: 'Medium', effort: 'Quick' }
    ]
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    website: 'hubspot.com',
    visibilityScore: 76,
    sentimentScore: 84,
    mainProblems: 'Outdated feature summaries generated inside Claude due to legacy customer review weights and unstructured blog indexes.',
    opportunities: 'Publish structural feature cards with JSON-LD tags, making secondary marketing attributes directly readable by Anthropic crawlers.',
    outcome: 'Claude sentiment index restoration and higher recommendation placements in CRM comparisons.',
    swot: {
      strengths: ['Huge index footprint', 'Excellent high-intent blog citation rates', 'Abundant brand mention volume'],
      weaknesses: ['Lower citation trust on complex developer CRM guides', 'Outdated forum threads skewing sentiment'],
      opportunities: ['Deploy structured JSON-LD features schemas for free tools', 'Streamline developer API knowledge graph association'],
      threats: ['Salesforce capturing high-end custom enterprise citations']
    },
    priorities: [
      { task: 'Deploy feature-comparison JSON-LD schema', impact: 'High', effort: 'Quick' },
      { task: 'Implement high-intent FAQ structured tables', impact: 'Medium', effort: 'Quick' },
      { task: 'Update API and developer docs structured entities', impact: 'Medium', effort: 'Medium' },
      { task: 'Partner for positive review citations in tech reports', impact: 'High', effort: 'Hard' },
      { task: 'Update customer case study structured metadata', impact: 'Low', effort: 'Quick' }
    ]
  }
];

const ENGINES = [
  { id: 'openai', name: 'OpenAI GPT-4o' },
  { id: 'claude', name: 'Claude 3.5 Sonnet' },
  { id: 'gemini', name: 'Gemini 3.5 Flash' },
  { id: 'perplexity', name: 'Perplexity Search' }
];

export default function InteractiveDemo() {
  const [selectedCompany, setSelectedCompany] = useState<CompanyPreset>(PRESETS[0]);
  const [selectedEngine, setSelectedEngine] = useState(ENGINES[0]);
  const [activeTab, setActiveTab] = useState<'summary' | 'priorities' | 'swot'>('summary');
  const [isScanning, setIsScanning] = useState(false);

  // Trigger brief scanning effect when parameters change
  useEffect(() => {
    setIsScanning(true);
    const timer = setTimeout(() => setIsScanning(false), 600);
    return () => clearTimeout(timer);
  }, [selectedCompany, selectedEngine]);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-500/10 border-red-500/30 text-red-400';
      case 'Medium': return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500';
      default: return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'Quick': return 'bg-green-500/10 border-green-500/30 text-green-400';
      case 'Medium': return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500';
      default: return 'bg-purple-500/10 border-purple-500/30 text-purple-400';
    }
  };

  return (
    <div id="demo" className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch scroll-mt-24">
      {/* Left controls column */}
      <div className="lg:col-span-4 flex flex-col justify-between gap-6">
        <div>
          <span className="text-xs tracking-[0.2em] text-accent uppercase font-bold mb-3 block">
            Product Showcase
          </span>
          <h3 className="text-3xl font-light text-white mb-4 tracking-tight leading-tight">
            Inspect your AI footprint.
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed mb-6">
            Select a brand preset and toggle target AI engines to preview how Shutter traces, analyzes, and lists visibility parameters.
          </p>

          {/* Engine Selector */}
          <div className="space-y-2 mb-6">
            <span className="text-[11px] font-bold text-text-secondary uppercase tracking-widest block">
              Target AI Engine
            </span>
            <div className="grid grid-cols-2 gap-2">
              {ENGINES.map(engine => (
                <button
                  key={engine.id}
                  onClick={() => setSelectedEngine(engine)}
                  className={`text-left text-xs font-semibold px-3 py-2.5 rounded-lg border transition-all cursor-pointer ${
                    selectedEngine.id === engine.id
                      ? 'bg-white/5 border-accent text-accent'
                      : 'border-white/[0.05] text-text-secondary hover:text-white hover:bg-white/[0.02]'
                  }`}
                >
                  {engine.name}
                </button>
              ))}
            </div>
          </div>

          {/* Preset options */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-text-secondary uppercase tracking-widest block">
              Brand Presets
            </span>
            <div className="space-y-2">
              {PRESETS.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => setSelectedCompany(preset)}
                  className={`w-full text-left text-xs font-semibold px-4 py-3.5 rounded-lg border transition-all cursor-pointer flex justify-between items-center ${
                    selectedCompany.id === preset.id
                      ? 'bg-white/5 border-white/20 text-white'
                      : 'border-white/[0.03] text-text-secondary hover:text-white hover:bg-white/[0.01]'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-semibold">{preset.name}</span>
                    <span className="text-[10px] text-text-secondary font-normal mt-0.5">{preset.website}</span>
                  </div>
                  <span className="text-sm text-accent font-light">
                    Score: {preset.visibilityScore}%
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Audit metrics snapshot */}
        <div className="border border-white/[0.05] bg-white/[0.01] rounded-xl p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-text-secondary uppercase tracking-widest block">
              AI Sentiment Index
            </span>
            <span className="text-base font-semibold text-white mt-1 block">
              {selectedCompany.name}
            </span>
          </div>
          <div className="text-right">
            <span className="text-2xl font-light text-accent">
              {selectedCompany.sentimentScore}%
            </span>
            <span className="text-[9px] text-accent font-semibold block uppercase tracking-wider">
              Positive
            </span>
          </div>
        </div>
      </div>

      {/* Right chat interface/console */}
      <div className="lg:col-span-8 border border-white/[0.08] bg-[#070b10] rounded-2xl flex flex-col overflow-hidden shadow-2xl min-h-[460px]">
        {/* Console Header */}
        <div className="border-b border-white/[0.05] bg-white/[0.01] px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <span className="text-[11px] text-text-secondary font-mono ml-3">
              console://{selectedCompany.website} — {selectedEngine.name}
            </span>
          </div>
          <div className="text-[9px] text-accent font-mono uppercase bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
            VISIBILITY PREVIEW
          </div>
        </div>

        {/* Dashboard inner content */}
        <div className="flex-grow p-6 flex flex-col justify-between">
          
          <AnimatePresence mode="wait">
            {isScanning ? (
              <motion.div
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-grow flex flex-col items-center justify-center py-16 text-center space-y-4"
              >
                <div className="w-8 h-8 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
                <span className="text-xs font-mono text-text-secondary uppercase tracking-widest">
                  Analyzing citation graphs...
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="flex-grow flex flex-col space-y-6"
              >
                {/* Score & Tabs row */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/[0.05] pb-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-full border border-white/10 flex items-center justify-center bg-black/40">
                      <svg className="absolute inset-0 w-full h-full -rotate-90">
                        <circle cx="32" cy="32" r="26" fill="transparent" className="stroke-white/[0.04]" strokeWidth="4" />
                        <circle cx="32" cy="32" r="26" fill="transparent" className="stroke-accent" strokeWidth="4"
                          strokeDasharray={2 * Math.PI * 26}
                          strokeDashoffset={2 * Math.PI * 26 * (1 - selectedCompany.visibilityScore / 100)}
                        />
                      </svg>
                      <span className="text-lg font-light text-white font-mono">{selectedCompany.visibilityScore}%</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">AI Visibility Score</h4>
                      <p className="text-xs text-text-secondary mt-0.5">Aggregate recommendation weight</p>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="flex gap-1 bg-white/[0.02] border border-white/[0.06] p-1 rounded-lg">
                    {([
                      { id: 'summary', label: 'Executive Summary' },
                      { id: 'priorities', label: 'Top Priorities' },
                      { id: 'swot', label: 'SWOT Index' }
                    ] as const).map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                          activeTab === tab.id
                            ? 'bg-white/10 text-white shadow-sm'
                            : 'text-text-secondary hover:text-white'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab content panel */}
                <div className="flex-grow">
                  {activeTab === 'summary' && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border border-white/[0.04] bg-white/[0.01] rounded-xl">
                          <span className="text-[10px] uppercase tracking-wider text-red-400 font-bold block mb-1">
                            Main Problem
                          </span>
                          <p className="text-xs text-text-secondary leading-relaxed">
                            {selectedCompany.mainProblems}
                          </p>
                        </div>
                        <div className="p-4 border border-white/[0.04] bg-white/[0.01] rounded-xl">
                          <span className="text-[10px] uppercase tracking-wider text-green-400 font-bold block mb-1">
                            Biggest Opportunity
                          </span>
                          <p className="text-xs text-text-secondary leading-relaxed">
                            {selectedCompany.opportunities}
                          </p>
                        </div>
                      </div>
                      <div className="p-4 border border-white/[0.04] bg-accent/[0.01] rounded-xl flex items-center justify-between gap-4">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-accent font-bold block mb-0.5">
                            Expected Outcome
                          </span>
                          <p className="text-xs text-text-secondary font-light">
                            {selectedCompany.outcome}
                          </p>
                        </div>
                        <span className="text-[10px] font-bold text-accent border border-accent/20 bg-accent/5 px-2 py-1 rounded whitespace-nowrap">
                          EST. IMPACT: HIGH
                        </span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'priorities' && (
                    <div className="space-y-3 animate-fadeIn">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="border-b border-white/[0.05] text-[10px] text-text-secondary uppercase tracking-wider">
                              <th className="py-2.5 font-semibold">Priority Action Item</th>
                              <th className="py-2.5 font-semibold text-center w-24">Impact</th>
                              <th className="py-2.5 font-semibold text-center w-24">Effort</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/[0.03] text-zinc-300">
                            {selectedCompany.priorities.map((item, idx) => (
                              <tr key={idx} className="hover:bg-white/[0.01]">
                                <td className="py-3 font-medium flex items-center gap-2">
                                  <span className="text-accent font-mono">0{idx + 1}.</span>
                                  {item.task}
                                </td>
                                <td className="py-3 text-center">
                                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${getImpactColor(item.impact)}`}>
                                    {item.impact}
                                  </span>
                                </td>
                                <td className="py-3 text-center">
                                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${getEffortColor(item.effort)}`}>
                                    {item.effort}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {activeTab === 'swot' && (
                    <div className="grid grid-cols-2 gap-4 animate-fadeIn">
                      <div className="p-3 border border-white/[0.04] bg-green-500/[0.01] rounded-xl">
                        <span className="text-[10px] uppercase font-bold text-green-400 tracking-wider block mb-1.5">
                          S / Strengths
                        </span>
                        <ul className="text-[10px] text-text-secondary space-y-1 list-disc list-inside">
                          {selectedCompany.swot.strengths.map((s, i) => <li key={i} className="truncate">{s}</li>)}
                        </ul>
                      </div>
                      <div className="p-3 border border-white/[0.04] bg-red-500/[0.01] rounded-xl">
                        <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider block mb-1.5">
                          W / Weaknesses
                        </span>
                        <ul className="text-[10px] text-text-secondary space-y-1 list-disc list-inside">
                          {selectedCompany.swot.weaknesses.map((s, i) => <li key={i} className="truncate">{s}</li>)}
                        </ul>
                      </div>
                      <div className="p-3 border border-white/[0.04] bg-accent/[0.01] rounded-xl">
                        <span className="text-[10px] uppercase font-bold text-accent tracking-wider block mb-1.5">
                          O / Opportunities
                        </span>
                        <ul className="text-[10px] text-text-secondary space-y-1 list-disc list-inside">
                          {selectedCompany.swot.opportunities.map((s, i) => <li key={i} className="truncate">{s}</li>)}
                        </ul>
                      </div>
                      <div className="p-3 border border-white/[0.04] bg-yellow-500/[0.01] rounded-xl">
                        <span className="text-[10px] uppercase font-bold text-yellow-500 tracking-wider block mb-1.5">
                          T / Threats
                        </span>
                        <ul className="text-[10px] text-text-secondary space-y-1 list-disc list-inside">
                          {selectedCompany.swot.threats.map((s, i) => <li key={i} className="truncate">{s}</li>)}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

              </motion.div>
            )}
          </AnimatePresence>

          {/* Console Footer */}
          <div className="border-t border-white/[0.05] bg-white/[0.01] px-5 py-3 -mx-6 -mb-6 flex items-center justify-between text-[11px] text-text-secondary font-mono">
            <div>
              Scanning latency: <span className="text-white">412ms</span>
            </div>
            <div>
              Citations Verified: <span className="text-accent font-bold">14 sources</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
