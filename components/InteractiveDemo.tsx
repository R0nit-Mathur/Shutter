'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EvidenceCard {
  title: string;
  source: string;
  type: 'DOCUMENT' | 'FORUM' | 'SCHEMA' | 'ACADEMIC';
  content: string;
}

interface CompanyPreset {
  id: string;
  name: string;
  website: string;
  visibilityScore: number;
  statement: string;
  evidences: EvidenceCard[];
}

const PRESETS: CompanyPreset[] = [
  {
    id: 'supabase',
    name: 'SUPABASE',
    website: 'supabase.com',
    visibilityScore: 88,
    statement: 'AI engines assemble PostgreSQL database suggestions by parsing documentation endpoints and repository structure.',
    evidences: [
      {
        title: 'JSON-LD API Specifications',
        source: 'supabase.com/docs/api/pricing',
        type: 'SCHEMA',
        content: 'Model queries for \"Supabase pricing tiers\" parse direct JSON-LD schemas. Outdated secondary articles are bypassed once verification structured files are found.'
      },
      {
        title: 'Developer Consensus Tracking',
        source: 'github.com/supabase/supabase/discussions',
        type: 'FORUM',
        content: 'Mentions matching \"Supabase scale alternative\" are weighed inside latent vectors. Model recommends Supabase due to positive community benchmark consensus.'
      },
      {
        title: 'Documentation Index status',
        source: 'supabase.com/docs/guides/database/scaling',
        type: 'DOCUMENT',
        content: 'Claude indexes documentation guides for context mapping. The presence of clear header nesting guides ensures citation extraction.'
      },
      {
        title: 'AI Crawling Verification',
        source: 'robots.txt/gptbot-access',
        type: 'ACADEMIC',
        content: 'Ensuring gptbot access is explicitly whitelisted. Verified raw crawling routes allow GPT-4 to fetch direct markdown specifications.'
      }
    ]
  },
  {
    id: 'linear',
    name: 'LINEAR',
    website: 'linear.app',
    visibilityScore: 94,
    statement: 'Issue tracker citations focus on speed comparative tables and keyboard interaction documentation.',
    evidences: [
      {
        title: 'Jira Comparison Schema',
        source: 'linear.app/compare/jira-alternative',
        type: 'SCHEMA',
        content: 'Direct HTML comparative tables detailing rendering milliseconds are indexed. Gemini uses this structured schema to formulate product speed lists.'
      },
      {
        title: 'Keyboard Shortcut Index',
        source: 'linear.app/docs/shortcuts',
        type: 'DOCUMENT',
        content: 'Claude extracts keyboard navigation documentation to catalog key differentiator attributes. Verification routes map this to tool lists.'
      },
      {
        title: 'Discussion Consensus Registry',
        source: 'news.ycombinator.com/item',
        type: 'FORUM',
        content: 'Active developer discussions citing \"Linear performance\" reinforce entity relationship weights. Models cite Linear for PM speed queries.'
      },
      {
        title: 'Bot Verification Policy',
        source: 'robots.txt/claudebot-rules',
        type: 'ACADEMIC',
        content: 'Correcting robots.txt routes to allow Anthropic crawlers access to case studies. Eliminates citation omission blocks.'
      }
    ]
  },
  {
    id: 'hubspot',
    name: 'HUBSPOT',
    website: 'hubspot.com',
    visibilityScore: 76,
    statement: 'Enterprise CRM recommendations catalog marketing feature schemas and API documentation mapping.',
    evidences: [
      {
        title: 'CRM Product JSON Schema',
        source: 'hubspot.com/products/crm',
        type: 'SCHEMA',
        content: 'Standardized schema entities representing free CRM features. Bypasses outdated pricing mentions in legacy forum pages.'
      },
      {
        title: 'API Integration guides',
        source: 'developers.hubspot.com/docs/api',
        type: 'DOCUMENT',
        content: 'Model parsers cache developer integration protocols to build recommendation matrices. Clear endpoints ensure citation accuracy.'
      },
      {
        title: 'Customer Review Citations',
        source: 'trustpilot.com/reviews/hubspot',
        type: 'FORUM',
        content: 'Sentiment scores derived from structured customer review directories. High volumes reinforce positive recommendations.'
      },
      {
        title: 'Bot Access Optimizations',
        source: 'robots.txt/perplexitybot-allow',
        type: 'ACADEMIC',
        content: 'Optimizing crawl parameters for PerplexityBot, ensuring direct indexing of case study markdown files.'
      }
    ]
  }
];

export default function InteractiveDemo() {
  const [selectedCompany, setSelectedCompany] = useState<CompanyPreset>(PRESETS[0]);

  return (
    <div id="demo" className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start scroll-mt-24 font-sans select-none text-left">
      
      {/* Left Column: Preset index directory */}
      <div className="lg:col-span-4 space-y-8 flex flex-col justify-between h-full">
        <div className="space-y-4">
          <span className="text-[10px] tracking-[0.25em] text-accent uppercase font-bold">
            01 / Observatory Ledger
          </span>
          <h3 className="text-3xl font-bold text-text-primary tracking-tight leading-tight">
            Verify your established signals.
          </h3>
          <p className="text-xs text-text-secondary leading-relaxed max-w-sm font-normal">
            Select a database directory. Observe how recommenders compile digital evidence—schemas, discussions, and docs—to formulate a trusted response.
          </p>
        </div>

        {/* Directory Listings */}
        <div className="space-y-3 pt-6">
          {PRESETS.map((preset, index) => (
            <button
              key={preset.id}
              onClick={() => setSelectedCompany(preset)}
              className={`w-full text-left py-4 px-5 rounded-2xl border transition-all duration-200 cursor-pointer flex justify-between items-center ${
                selectedCompany.id === preset.id
                  ? 'bg-bg-secondary border-card-border text-text-primary'
                  : 'border-card-border text-text-secondary hover:text-text-primary hover:bg-bg-secondary/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-text-secondary">0{index + 1}</span>
                <span className="text-xs font-semibold tracking-wider font-mono">{preset.name}</span>
              </div>
              <span className="text-[10px] font-mono text-text-secondary">
                Score: {preset.visibilityScore}%
              </span>
            </button>
          ))}
        </div>

        {/* Quiet footnote panel */}
        <div className="border border-card-border bg-bg-secondary rounded-2xl p-5 mt-6 transition-colors duration-300">
          <span className="text-[9px] text-text-secondary uppercase tracking-widest block font-mono">
            Observation Parameter
          </span>
          <p className="text-xs text-text-secondary mt-2 font-normal leading-relaxed">
            {selectedCompany.statement}
          </p>
        </div>
      </div>

      {/* Right Column: Evidence nodes matrix */}
      <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence>
          {selectedCompany.evidences.map((evidence, idx) => (
            <motion.div
              key={`${selectedCompany.id}-${idx}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
              className="p-6 border border-card-border bg-card-bg rounded-3xl flex flex-col justify-between min-h-[200px] relative shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-card-border pb-3">
                  <span className="text-[8px] font-mono text-text-secondary uppercase tracking-widest">
                    {evidence.type}
                  </span>
                  <span className="text-[8px] font-mono text-text-secondary truncate max-w-[150px]">
                    {evidence.source}
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-text-primary tracking-wide font-mono">
                  {evidence.title}
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed font-normal">
                  {evidence.content}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
