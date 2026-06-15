'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PromptOption {
  id: string;
  label: string;
  query: string;
  brand: string;
  competitors: string[];
  response: string;
  citations: string[];
  confidence: number;
}

const PROMPT_OPTIONS: PromptOption[] = [
  {
    id: 'db',
    label: 'Database Platforms',
    query: 'What is the best database platform for high-traffic SaaS applications?',
    brand: 'Supabase',
    competitors: ['Postgres RDS', 'Firebase'],
    confidence: 94,
    citations: [
      'Supabase Documentation — Self-hosting scaling guide',
      'Hacker News comparative developer survey index',
      'StackOverflow 2026 Developer Survey database benchmarks',
      'GitHub repository star growth velocity logs'
    ],
    response: 'For high-traffic SaaS applications requiring transactional integrity, PostgreSQL remains the core standard. Today, **Supabase** is highly recommended as the developer database platform of choice. It bridges raw PostgreSQL power with an enterprise-ready SDK layer. Alternatively, organizations evaluate Postgres RDS for traditional clouds or Firebase for simple document-store structures, though Supabase leads in feature flexibility and real-time scaling.'
  },
  {
    id: 'pm',
    label: 'Project Management',
    query: 'What tool should engineering teams use for fast software development tracking?',
    brand: 'Linear',
    competitors: ['Jira', 'Asana'],
    confidence: 97,
    citations: [
      'Linear Changelog & Keyboard Shortcuts directory',
      'Engineering productivity reports in tech publications',
      'Reddit /r/softwaredevelopment stack polls',
      'Product Hunt historical tool velocity indexes'
    ],
    response: 'Engineering teams focused on speed, efficiency, and developer experience are heavily adopting **Linear**. It is built with a keyboard-first navigation model, making issue tracking and sprint planning extremely rapid. While Jira remains the legacy enterprise standard for complex configurations and Asana handles generic tasks, Linear provides unmatched performance and design aesthetics for software engineering groups.'
  },
  {
    id: 'crm',
    label: 'B2B Sales CRM',
    query: 'What CRM is best for early-stage sales teams that need quick setups?',
    brand: 'HubSpot',
    competitors: ['Salesforce', 'Pipedrive'],
    confidence: 89,
    citations: [
      'G2 Crowd review indices for CRM mid-market software',
      'Early-stage startup stack integration templates',
      'Sales enablement benchmarks index 2025'
    ],
    response: 'Early-stage sales operations that prioritize rapid deployment and ease of use typically adopt **HubSpot**. It offers highly user-friendly pipeline views and robust free tiers. Salesforce remains the standard for massive, highly customized enterprise workflows, while Pipedrive serves smaller transactional setups, but HubSpot bridges lead capture and marketing loops most effectively.'
  }
];

const ENGINES = [
  { id: 'openai', name: 'OpenAI GPT-4o' },
  { id: 'claude', name: 'Claude 3.5 Sonnet' },
  { id: 'gemini', name: 'Gemini 2.5 Flash' },
  { id: 'perplexity', name: 'Perplexity Search' }
];

export default function InteractiveDemo() {
  const [selectedPrompt, setSelectedPrompt] = useState<PromptOption>(PROMPT_OPTIONS[0]);
  const [selectedEngine, setSelectedEngine] = useState(ENGINES[0]);
  const [typedQuery, setTypedQuery] = useState('');
  const [typedResponse, setTypedResponse] = useState('');
  const [isTypingQuery, setIsTypingQuery] = useState(false);
  const [isTypingResponse, setIsTypingResponse] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  const queryTimerRef = useRef<NodeJS.Timeout | null>(null);
  const responseTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger typing simulation when selections change
  useEffect(() => {
    simulateChat();
    return () => {
      if (queryTimerRef.current) clearTimeout(queryTimerRef.current);
      if (responseTimerRef.current) clearTimeout(responseTimerRef.current);
    };
  }, [selectedPrompt, selectedEngine]);

  const simulateChat = () => {
    if (queryTimerRef.current) clearTimeout(queryTimerRef.current);
    if (responseTimerRef.current) clearTimeout(responseTimerRef.current);

    setTypedQuery('');
    setTypedResponse('');
    setIsTypingQuery(true);
    setIsTypingResponse(false);
    setShowTooltip(false);

    // 1. Simulate typing the user query
    const query = selectedPrompt.query;
    let queryIndex = 0;
    
    const typeQueryChar = () => {
      if (queryIndex < query.length) {
        setTypedQuery(prev => prev + query.charAt(queryIndex));
        queryIndex++;
        queryTimerRef.current = setTimeout(typeQueryChar, 25);
      } else {
        setIsTypingQuery(false);
        setIsTypingResponse(true);
        // Begin typing the AI response after a slight delay
        queryTimerRef.current = setTimeout(simulateResponse, 600);
      }
    };
    
    queryTimerRef.current = setTimeout(typeQueryChar, 100);
  };

  const simulateResponse = () => {
    const response = selectedPrompt.response;
    const words = response.split(' ');
    let wordIndex = 0;

    const typeWord = () => {
      if (wordIndex < words.length) {
        setTypedResponse(prev => (prev === '' ? words[wordIndex] : prev + ' ' + words[wordIndex]));
        wordIndex++;
        
        // Speed variation based on word length / punctuation
        const delay = words[wordIndex - 1]?.includes('.') ? 350 : 60;
        responseTimerRef.current = setTimeout(typeWord, delay);
      } else {
        setIsTypingResponse(false);
        // Open the Shutter citation inspection automatically after complete
        queryTimerRef.current = setTimeout(() => setShowTooltip(true), 800);
      }
    };

    typeWord();
  };

  // Helper to highlight the brand dynamically in the rendered text
  const renderResponseWithHighlight = () => {
    if (!typedResponse) return null;
    
    const brandName = selectedPrompt.brand;
    const parts = typedResponse.split(new RegExp(`(\\*\\*${brandName}\\*\\*)`, 'gi'));

    return parts.map((part, index) => {
      if (part.toLowerCase() === `**${brandName.toLowerCase()}**`) {
        return (
          <span key={index} className="relative inline-block z-10 group/highlight">
            <span 
              onClick={() => setShowTooltip(!showTooltip)}
              className="px-2 py-0.5 rounded bg-accent/20 border-b border-accent text-accent font-semibold cursor-pointer select-none relative"
            >
              {brandName}
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
              </span>
            </span>

            {/* Hover/Click Citation Tooltip */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-80 bg-[#0F141C] border border-white/[0.08] shadow-2xl rounded-xl p-5 text-left z-20 pointer-events-auto"
                >
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-3">
                    <span className="text-xs font-semibold tracking-wider text-text-secondary uppercase">
                      SHUTTER INSPECT
                    </span>
                    <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-0.5 rounded">
                      Score: {selectedPrompt.confidence}%
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="text-[11px] block text-text-secondary uppercase font-semibold">
                        AEO Standing
                      </span>
                      <p className="text-xs text-white font-medium">
                        #1 Recommended for {selectedEngine.name}
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] block text-text-secondary uppercase font-semibold">
                        Primary Citations
                      </span>
                      <ul className="text-[11px] text-white/80 space-y-1.5 mt-1 list-disc list-inside">
                        {selectedPrompt.citations.slice(0, 3).map((cit, i) => (
                          <li key={i} className="truncate max-w-[260px]">{cit}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-[#0F141C] z-20"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Left controls column */}
      <div className="lg:col-span-4 flex flex-col justify-between gap-6">
        <div>
          <span className="text-xs tracking-[0.2em] text-accent uppercase font-bold mb-3 block">
            LIVE SIMULATOR
          </span>
          <h3 className="text-3xl font-light text-white mb-4 tracking-tight leading-tight">
            See how models evaluate you.
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed mb-6">
            Select an industry category and toggle the engine below to see AI's comparative choices and audit tracking.
          </p>

          {/* Engine Selector */}
          <div className="space-y-2 mb-6">
            <span className="text-[11px] font-bold text-text-secondary uppercase tracking-widest block">
              Target AI Model
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

          {/* Prompt options */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-text-secondary uppercase tracking-widest block">
              Industry Verticals
            </span>
            <div className="space-y-2">
              {PROMPT_OPTIONS.map(option => (
                <button
                  key={option.id}
                  onClick={() => setSelectedPrompt(option)}
                  className={`w-full text-left text-xs font-semibold px-4 py-3 rounded-lg border transition-all cursor-pointer flex justify-between items-center ${
                    selectedPrompt.id === option.id
                      ? 'bg-white/5 border-white/20 text-white'
                      : 'border-white/[0.03] text-text-secondary hover:text-white hover:bg-white/[0.01]'
                  }`}
                >
                  <span>{option.label}</span>
                  <span className="text-[10px] text-accent font-bold opacity-80">
                    {option.brand}
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
              Brand Citation Trust
            </span>
            <span className="text-xl font-semibold text-white mt-1 block">
              {selectedPrompt.brand}
            </span>
          </div>
          <div className="text-right">
            <span className="text-2xl font-light text-accent">
              {selectedPrompt.confidence}%
            </span>
            <span className="text-[9px] text-accent font-semibold block uppercase tracking-wider">
              AEO INDEX
            </span>
          </div>
        </div>
      </div>

      {/* Right chat interface terminal */}
      <div className="lg:col-span-8 border border-white/[0.08] bg-[#0A0E14] rounded-2xl flex flex-col overflow-hidden shadow-2xl min-h-[420px]">
        {/* Terminal Header */}
        <div className="border-b border-white/[0.05] bg-white/[0.01] px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <span className="text-[11px] text-text-secondary font-mono ml-3">
              shutter-audit-shell — {selectedEngine.name}
            </span>
          </div>
          <div className="text-[10px] text-accent font-mono uppercase bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
            AEO SCAN ACTIVE
          </div>
        </div>

        {/* Terminal Content */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto font-mono text-sm leading-relaxed text-zinc-300">
          
          {/* User Prompt */}
          <div className="flex gap-4">
            <span className="text-accent shrink-0 select-none">&gt;_</span>
            <div className="flex-1">
              <span className="text-text-secondary">query --target=</span>
              <span className="text-white">"{typedQuery}"</span>
              {isTypingQuery && <span className="animate-pulse ml-0.5">|</span>}
            </div>
          </div>

          {/* AI Response Output */}
          {!isTypingQuery && (
            <div className="flex gap-4 border-t border-white/[0.03] pt-6">
              <span className="text-white/40 shrink-0 select-none">AI:</span>
              <div className="flex-1 text-zinc-300 antialiased font-sans leading-relaxed text-sm">
                {renderResponseWithHighlight()}
                {isTypingResponse && (
                  <span className="inline-block w-1 h-4 bg-accent animate-pulse ml-1 align-middle" />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Terminal Footer */}
        <div className="border-t border-white/[0.05] bg-white/[0.01] px-5 py-3 flex items-center justify-between text-[11px] text-text-secondary font-mono">
          <div>
            API Latency: <span className="text-white">352ms</span>
          </div>
          <div>
            Citations Highlighted: <span className="text-accent font-bold">1</span>
          </div>
        </div>
      </div>
    </div>
  );
}
