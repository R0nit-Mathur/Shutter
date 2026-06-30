'use client';

import { useRef, useState } from 'react';
import { useScroll, useMotionValueEvent, useTransform, motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// 12 chapters representing how AI maps trust (Apple Agency Style)
const CHAPTERS = [
  {
    id: 1,
    question: "How does AI choose what to recommend?",
    lesson: "It compiles. It doesn't search.",
    worldReaction: "Generating semantic search pathways.",
    query: "RECOMMEND DATABASE",
    engine: "GPT-4o",
    activeSource: "Docs",
    status: "scanning",
    crawlers: { gpt: "ACTIVE", claude: "STANDBY", perplexity: "STANDBY" }
  },
  {
    id: 2,
    question: "Why is my company missing from ChatGPT results?",
    lesson: "If AI can't trust you, it won't recommend you.",
    worldReaction: "Omission detected. Missing citation parameters.",
    query: "RECOMMEND DATABASE",
    engine: "GPT-4o",
    activeSource: "Docs",
    status: "omitted",
    crawlers: { gpt: "BLOCKED", claude: "STANDBY", perplexity: "STANDBY" }
  },
  {
    id: 3,
    question: "What makes AI trust one company over another?",
    lesson: "Accuracy, authority, and consistency.",
    worldReaction: "Aligning cross-referenced sources.",
    query: "RECOMMEND DATABASE",
    engine: "Claude 3.5",
    activeSource: "Schema",
    status: "scanning",
    crawlers: { gpt: "ACTIVE", claude: "ACTIVE", perplexity: "STANDBY" }
  },
  {
    id: 4,
    question: "Can one bad page destroy my AI visibility?",
    lesson: "Yes. Inconsistent facts break consensus.",
    worldReaction: "Data mismatch detected on third-party forum.",
    query: "COMPARE DB PRICING",
    engine: "Claude 3.5",
    activeSource: "Docs",
    status: "conflict",
    crawlers: { gpt: "ACTIVE", claude: "CONFLICT", perplexity: "STANDBY" }
  },
  {
    id: 5,
    question: "Why does documentation matter so much for AEO?",
    lesson: "Models need facts. Documentation is evidence.",
    worldReaction: "Structuring API parameters.",
    query: "VERIFY SCALE LIMITS",
    engine: "Gemini Pro",
    activeSource: "Docs",
    status: "verified",
    crawlers: { gpt: "ACTIVE", claude: "ACTIVE", perplexity: "STANDBY" }
  },
  {
    id: 6,
    question: "How do LLMs verify my brand claims?",
    lesson: "By cross-linking your website with codebase repositories.",
    worldReaction: "Factual anchors verified.",
    query: "CROSS REFERENCE",
    engine: "Gemini Pro",
    activeSource: "GitHub",
    status: "verified",
    crawlers: { gpt: "ACTIVE", claude: "ACTIVE", perplexity: "ACTIVE" }
  },
  {
    id: 7,
    question: "Can I optimize for Perplexity and Gemini together?",
    lesson: "Yes. All search models share one index.",
    worldReaction: "Parsing shared JSON-LD schemas.",
    query: "RECOMMEND DATABASE",
    engine: "Perplexity",
    activeSource: "Schema",
    status: "scanning",
    crawlers: { gpt: "ACTIVE", claude: "ACTIVE", perplexity: "ACTIVE" }
  },
  {
    id: 8,
    question: "What is the role of Github in developer AEO?",
    lesson: "Open-source data acts as raw grounding material.",
    worldReaction: "Extracting repository metrics.",
    query: "VERIFY CODE EXAMPLES",
    engine: "Perplexity",
    activeSource: "GitHub",
    status: "verified",
    crawlers: { gpt: "ACTIVE", claude: "ACTIVE", perplexity: "ACTIVE" }
  },
  {
    id: 9,
    question: "Can AI misunderstand a company?",
    lesson: "Yes. Outdated blogs lead to false recommendations.",
    worldReaction: "Scraping obsolete article indices.",
    query: "RECOMMEND DATABASE",
    engine: "GPT-4o",
    activeSource: "Docs",
    status: "conflict",
    crawlers: { gpt: "ACTIVE", claude: "ACTIVE", perplexity: "ACTIVE" }
  },
  {
    id: 10,
    question: "How does Shutter help my company get cited?",
    lesson: "We repair your crawlers and deploy structured entities.",
    worldReaction: "Shutter whitelists active bots.",
    query: "SHUTTER RESOLVE",
    engine: "All Engines",
    activeSource: "All Sources",
    status: "resolved",
    crawlers: { gpt: "OPTIMIZED", claude: "OPTIMIZED", perplexity: "OPTIMIZED" }
  },
  {
    id: 11,
    question: "Is AI visibility static or dynamic?",
    lesson: "Dynamic. Scrapes occur daily. Monitoring is constant.",
    worldReaction: "Re-indexing nodes across OpenAI and Anthropic.",
    query: "TRACK DRIFT",
    engine: "All Engines",
    activeSource: "All Sources",
    status: "resolved",
    crawlers: { gpt: "OPTIMIZED", claude: "OPTIMIZED", perplexity: "OPTIMIZED" }
  },
  {
    id: 12,
    question: "What is the final state of an optimized brand?",
    lesson: "Natural authority. AI recommends you first.",
    worldReaction: "Optimal citation layout established.",
    query: "FINAL CITATION",
    engine: "All Engines",
    activeSource: "All Sources",
    status: "resolved",
    crawlers: { gpt: "OPTIMIZED", claude: "OPTIMIZED", perplexity: "OPTIMIZED" }
  }
];

export default function ScrollVideoHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Monitor Scroll Progress of the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Keep track of normalized scroll progress
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setScrollProgress(latest);
  });

  // Determine active chapter based on scroll position
  const activeChapterIndex = Math.min(
    Math.floor(scrollProgress * CHAPTERS.length),
    CHAPTERS.length - 1
  );
  const activeChapter = CHAPTERS[activeChapterIndex] || CHAPTERS[0];

  // Determine active state name
  const getActiveStateName = (progress: number) => {
    if (progress < 0.15) return 'AUDITING';
    if (progress < 0.35) return 'BOT MANAGEMENT';
    if (progress < 0.55) return 'SCHEMA ENGINEERING';
    if (progress < 0.75) return 'PRODUCT GROWTH';
    if (progress < 0.9) return 'REPUTATION SECURED';
    return 'PARTNERSHIP ACTIVE';
  };
  const activeState = getActiveStateName(scrollProgress);

  // Motion transitions for the camera perspective
  const viewScale = useTransform(scrollYProgress, [0, 0.4, 0.75, 1], [1.01, 0.99, 0.96, 0.94]);
  const viewRotate = useTransform(scrollYProgress, [0.1, 0.9], [-0.5, 0.5]);

  // Vignette overlay opacity transitions
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 0.85, 0.75]);

  return (
    <div ref={containerRef} className="relative w-full lg:h-[600vh] h-auto bg-bg-secondary overflow-clip transition-colors duration-300">
      
      {/* Pinned Exhibit Viewport */}
      <div className="relative lg:sticky lg:top-0 lg:left-0 w-full lg:h-screen h-auto lg:overflow-hidden z-10 flex items-center justify-center py-16 lg:py-0">
        
        {/* Layout Grid Container - Separates Text (Left) and The Alignment Matrix (Right) */}
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center lg:h-full relative z-20">
          
          {/* LEFT SIDEBAR: NARRATIVE ENGINE */}
          <div className="lg:col-span-5 flex flex-col justify-between lg:h-[75vh] h-auto py-4 lg:py-8 text-left z-30 select-none">
            
            {/* Header: Active State Progress */}
            <div className="space-y-2">
              <span className="inline-block bg-bg-secondary text-text-secondary text-[8px] font-mono tracking-widest px-2.5 py-1 rounded-full uppercase font-bold border border-card-border">
                AEO Agency Partner
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeChapter.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 0.5, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.5 }}
                  className="text-[9px] font-sans tracking-[0.25em] uppercase text-text-secondary font-bold block pt-1"
                >
                  Chapter {activeChapter.id} / 12 — {activeState}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Core Copy (Apple Editorial Sans-Serif) */}
            <div className="space-y-4 my-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`copy-${activeChapter.id}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  className="space-y-4"
                >
                  {/* Active AI Prompt */}
                  <span className="text-[10px] sm:text-xs font-sans text-accent tracking-wide uppercase font-semibold block">
                    {activeChapter.question}
                  </span>

                  {/* Factual Cognitive Lesson (Large Bold Sans) */}
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary tracking-tight leading-tight">
                    {activeChapter.lesson}
                  </h1>
                  
                  {/* Environmental State reaction summary */}
                  <p className="text-xs text-text-secondary max-w-sm tracking-wide leading-relaxed font-normal opacity-85 border-l border-card-border pl-4 py-1">
                    {activeChapter.worldReaction}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Actions or Scroll Guide */}
            <div className="flex flex-col gap-4 max-w-sm">
              {scrollProgress >= 0.88 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col gap-3 w-full"
                >
                  <Link
                    href="#book-demo"
                    className="px-6 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-full text-center transition-all duration-200 text-xs tracking-wide cursor-pointer"
                  >
                    Schedule Growth Call
                  </Link>
                </motion.div>
              ) : (
                <div className="space-y-3">
                  <div className="w-full bg-card-border h-[1px] relative rounded-full overflow-hidden">
                    <div 
                      className="bg-text-secondary h-full transition-all duration-200 ease-out" 
                      style={{ width: `${scrollProgress * 100}%` }}
                    />
                  </div>
                  <span className="text-[9px] tracking-wide uppercase text-text-secondary font-medium block">
                    Scroll to advance the timeline
                  </span>
                </div>
              )}
            </div>

          </div>

          {/* RIGHT VIEWPORT: THE ALIGNMENT MATRIX (PIXEL-PERFECT APPLE GRID) */}
          <div className="lg:col-span-7 flex justify-center items-center lg:h-[70vh] h-auto w-full z-10">
            <motion.div 
              style={{ scale: viewScale, rotate: viewRotate }}
              className="border border-card-border bg-card-bg rounded-3xl p-6 lg:p-8 relative flex flex-col justify-between lg:h-full h-auto w-full shadow-lg shadow-card-shadow text-left select-none transition-colors duration-300"
            >
              {/* macOS window title bar dots */}
              <div className="absolute top-6 left-6 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>

              {/* Panel Header with Active Audits */}
              <div className="flex justify-between items-center border-b border-card-border pb-4 pt-4">
                <span className="text-[8px] text-text-secondary uppercase tracking-widest block font-bold font-mono">
                  RAG CONSULTANCY MONITOR
                </span>
                <span className="text-[9px] text-accent block uppercase tracking-wider font-semibold font-mono">
                  STATE: {activeChapter.status.toUpperCase()}
                </span>
              </div>

              {/* Crawlers Access Status Sub-Bar */}
              <div className="grid grid-cols-3 gap-3 py-2 text-[8px] font-mono border-b border-card-border/60">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-text-secondary/40" />
                  <span className="text-text-secondary">GPTBOT:</span>
                  <span className={activeChapter.crawlers.gpt === "OPTIMIZED" ? "text-green-600 font-bold" : activeChapter.crawlers.gpt === "BLOCKED" ? "text-red-500 font-bold" : "text-text-secondary"}>
                    {activeChapter.crawlers.gpt}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-text-secondary/40" />
                  <span className="text-text-secondary">CLAUDEBOT:</span>
                  <span className={activeChapter.crawlers.claude === "OPTIMIZED" ? "text-green-600 font-bold" : activeChapter.crawlers.claude === "CONFLICT" ? "text-red-500 font-bold" : "text-text-secondary"}>
                    {activeChapter.crawlers.claude}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-text-secondary/40" />
                  <span className="text-text-secondary">PERPLEXITY:</span>
                  <span className={activeChapter.crawlers.perplexity === "OPTIMIZED" ? "text-green-600 font-bold" : "text-text-secondary"}>
                    {activeChapter.crawlers.perplexity}
                  </span>
                </div>
              </div>

              {/* Active Query Box */}
              <div className="space-y-2 py-4">
                <span className="text-[8px] text-text-secondary uppercase tracking-widest block font-mono">Semantic Query Target</span>
                <div className="bg-bg-secondary border border-card-border p-3.5 rounded-xl flex items-center justify-between">
                  <span className="text-xs text-text-primary font-semibold">
                    {activeChapter.query}
                  </span>
                  <span className="text-[8px] text-text-secondary font-mono">RESOLVING VECTORS...</span>
                </div>
              </div>

              {/* Grid matrix representing active Search Engines */}
              <div className="grid grid-cols-2 gap-4 py-4">
                {[
                  { name: "GPT-4o", score: 85 },
                  { name: "Claude 3.5", score: 90 },
                  { name: "Gemini Pro", score: 78 },
                  { name: "Perplexity", score: 92 }
                ].map((eng) => {
                  const isActive = activeChapter.engine === eng.name || activeChapter.engine === "All Engines";
                  return (
                    <div 
                      key={eng.name}
                      className={`p-4 border rounded-xl transition-all duration-300 ${
                        isActive 
                          ? "border-accent bg-accent-bg" 
                          : "border-card-border bg-bg-secondary/20"
                      }`}
                    >
                      <div className="flex justify-between items-center text-[9px] mb-2 font-mono">
                        <span className={isActive ? "text-text-primary font-semibold" : "text-text-secondary"}>{eng.name}</span>
                        <span className={isActive ? "text-accent" : "text-text-secondary"}>
                          {isActive ? "ACTIVE" : "STANDBY"}
                        </span>
                      </div>
                      <div className="h-[3px] bg-card-border w-full rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${isActive ? "bg-accent" : "bg-text-secondary/40"}`}
                          style={{ width: isActive ? `${eng.score}%` : "0%" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Grid matrix representing active Semantic Citations */}
              <div className="border-t border-card-border pt-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[8px] text-text-secondary uppercase tracking-widest block font-mono">Reference Verification Signals</span>
                  <span className="text-[8px] text-text-secondary font-mono">SCORE: {scrollProgress >= 0.8 ? "92% OPTIMAL" : "CHECKING..."}</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "Docs", label: "Docs Guide" },
                    { id: "Schema", label: "JSON-LD" },
                    { id: "GitHub", label: "Repos" }
                  ].map((src) => {
                    const isActive = activeChapter.activeSource === src.id || activeChapter.activeSource === "All Sources";
                    const isConflict = activeChapter.status === "conflict" && isActive;
                    const isOmitted = activeChapter.status === "omitted" && isActive;
                    
                    return (
                      <div 
                        key={src.id}
                        className={`p-3 border rounded-xl text-center transition-all duration-300 text-[10px] ${
                          isConflict 
                            ? "border-red-300 bg-red-50 text-red-700 font-semibold" 
                            : isOmitted 
                            ? "border-red-200 bg-red-50/50 text-red-500/60"
                            : isActive 
                            ? "border-green-300 bg-green-50 text-green-700 font-semibold" 
                            : "border-card-border bg-bg-secondary/10 text-text-secondary"
                        }`}
                      >
                        <div className="font-semibold">{src.label}</div>
                        <div className="text-[7px] uppercase mt-1 font-mono">
                          {isConflict ? "CONFLICT" : isOmitted ? "BLOCKED" : isActive ? "ALIGNED" : "INACTIVE"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </motion.div>
          </div>

        </div>

        {/* Radial vignette mask (Apple Light/Dark theme transition) */}
        <motion.div
          className="absolute inset-0 pointer-events-none bg-radial-[circle_at_center,transparent_40%,var(--bg-secondary)_100%] transition-colors duration-300"
          style={{ opacity: overlayOpacity }}
        />
      </div>
    </div>
  );
}
