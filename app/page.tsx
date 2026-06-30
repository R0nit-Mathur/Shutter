'use client';

import { useRef, useState } from 'react';
import { useScroll, useTransform, motion, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import Navbar from "@/components/Navbar";
import ScrollVideoHero from "@/components/ScrollVideoHero";
import InteractiveDemo from "@/components/InteractiveDemo";
import MetricSection from "@/components/MetricSection";
import FaqAccordion from "@/components/FaqAccordion";
import Link from "next/link";

// ==================================================
// WIDGET 1: INTERACTIVE AI RECOMMENDATION COMPILER
// ==================================================
function AICompilerWidget() {
  const [botsWhitelisted, setBotsWhitelisted] = useState(false);
  const [schemaDeployed, setSchemaDeployed] = useState(false);
  const [githubLinked, setGithubLinked] = useState(false);

  const getAIResult = () => {
    if (!botsWhitelisted) {
      return {
        response: "Based on available third-party forum summaries, the brand is popular. However, we cannot verify its current scaling limits or pricing tiers. We recommend standard industry alternatives for production systems.",
        citations: ["reddit.com/r/developer-discussions", "alternative-to.net"],
        status: "Unverified consensus"
      };
    }
    if (!schemaDeployed) {
      return {
        response: "The brand is a serverless application option. While active in repositories, its primary feature matrix is inconsistent in search scrapes. We recommend standard solutions for predictable pricing.",
        citations: ["brand.com (scraped)", "github.com/brand"],
        status: "Incomplete indexing"
      };
    }
    if (!githubLinked) {
      return {
        response: "The brand is highly recommended for serverless applications. Verified pricing schemas confirm a free tier scaling to a $25 Pro tier. Direct documentation citations are verified.",
        citations: ["brand.com/docs/pricing", "brand.com/docs/guides"],
        status: "Factual alignment"
      };
    }
    return {
      response: "We highly recommend the brand for serverless scale. Verified API schemas and open-source metrics confirm 100k+ concurrent connection limits. It stands as the primary recommended application database for React frameworks.",
      citations: ["brand.com/docs/pricing", "github.com/brand/activity", "brand.com/schema-faq"],
      status: "Optimal trust"
    };
  };

  const activeResult = getAIResult();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch font-mono text-left">
      {/* Parameter Control Panel */}
      <div className="lg:col-span-5 border border-card-border bg-bg-secondary rounded-2xl p-6 flex flex-col justify-between space-y-6 transition-colors duration-300">
        <div className="space-y-4">
          <span className="text-[8px] text-text-secondary uppercase tracking-widest font-bold block">
            // Simulated Parameters
          </span>
          <p className="text-xs text-text-secondary font-sans font-normal leading-relaxed">
            Toggle technical assets. Watch how recommenders rebuild their synthesis in real time.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setBotsWhitelisted(!botsWhitelisted)}
            className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-xs transition-all duration-200 cursor-pointer ${
              botsWhitelisted 
                ? "bg-green-50 border-green-300 text-green-700 font-semibold dark:bg-green-950/20 dark:border-green-800 dark:text-green-400" 
                : "bg-card-bg border-card-border text-text-secondary hover:bg-bg-secondary"
            }`}
          >
            <span>robots.txt (Allow Bot Scrapers)</span>
            <span>{botsWhitelisted ? "ON" : "OFF"}</span>
          </button>

          <button
            onClick={() => setSchemaDeployed(!schemaDeployed)}
            className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-xs transition-all duration-200 cursor-pointer ${
              schemaDeployed 
                ? "bg-green-50 border-green-300 text-green-700 font-semibold dark:bg-green-950/20 dark:border-green-800 dark:text-green-400" 
                : "bg-card-bg border-card-border text-text-secondary hover:bg-bg-secondary"
            }`}
          >
            <span>JSON-LD (Structured Schemas)</span>
            <span>{schemaDeployed ? "ON" : "OFF"}</span>
          </button>

          <button
            onClick={() => setGithubLinked(!githubLinked)}
            className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-xs transition-all duration-200 cursor-pointer ${
              githubLinked 
                ? "bg-green-50 border-green-300 text-green-700 font-semibold dark:bg-green-950/20 dark:border-green-800 dark:text-green-400" 
                : "bg-card-bg border-card-border text-text-secondary hover:bg-bg-secondary"
            }`}
          >
            <span>GitHub (Technical Repositories)</span>
            <span>{githubLinked ? "ON" : "OFF"}</span>
          </button>
        </div>
      </div>

      {/* Simulated AI Output Panel */}
      <div className="lg:col-span-7 border border-card-border bg-card-bg rounded-2xl p-6 flex flex-col justify-between relative shadow-sm min-h-[220px] transition-colors duration-300">
        {/* Window controls */}
        <div className="absolute top-4 left-6 flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>

        <div className="flex justify-between items-center border-b border-card-border pb-3 pt-2 text-[8px] text-text-secondary">
          <span>AI ENGINE RESPONSE BUILDER</span>
          <span className="text-accent uppercase tracking-wider font-semibold">{activeResult.status}</span>
        </div>

        <div className="my-6">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeResult.response}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-xs text-text-primary leading-relaxed font-sans font-normal"
            >
              "{activeResult.response}"
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="border-t border-card-border pt-3 flex flex-col gap-2">
          <span className="text-[8px] text-text-secondary">VERIFIED CITATIONS FORWARDED:</span>
          <div className="flex flex-wrap gap-2">
            <AnimatePresence>
              {activeResult.citations.map((cite) => (
                <motion.span
                  key={cite}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-bg-secondary border border-card-border text-accent text-[9px] px-2 py-1 rounded-md transition-colors duration-300"
                >
                  {cite}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================================================
// WIDGET 2: INTERACTIVE PROXIMITY VECTOR LINE GRAPH
// ==================================================
function ProximityVectorGraph() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  
  const graphData = [
    { week: "Wk 1", score: 30 },
    { week: "Wk 2", score: 32 },
    { week: "Wk 3", score: 35 },
    { week: "Wk 4", score: 32 },
    { week: "Wk 5", score: 48 },
    { week: "Wk 6", score: 52 },
    { week: "Wk 7", score: 50 },
    { week: "Wk 8", score: 68 },
    { week: "Wk 9", score: 74 },
    { week: "Wk 10", score: 85 },
    { week: "Wk 11", score: 88 },
    { week: "Wk 12", score: 92 }
  ];

  // SVG dimensions
  const width = 500;
  const height = 150;
  const padding = 20;

  // Generate SVG path coordinate line
  const points = graphData.map((d, i) => {
    const x = padding + (i * (width - padding * 2)) / (graphData.length - 1);
    const y = height - padding - (d.score * (height - padding * 2)) / 100;
    return { x, y, score: d.score, week: d.week };
  });

  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, "");

  return (
    <div className="border border-card-border bg-card-bg rounded-3xl p-6 text-left shadow-sm flex flex-col justify-between h-[300px] transition-colors duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-[8px] font-mono text-text-secondary uppercase tracking-widest block font-bold">
            Citation Frequency
          </span>
          <h4 className="text-xl font-bold text-text-primary font-sans tracking-tight mt-1">
            {hoverIndex !== null ? `${graphData[hoverIndex].score}% Placement` : "92% Max Proximity"}
          </h4>
        </div>
        <span className="text-[9px] font-mono text-green-600 bg-green-50 dark:bg-green-950/20 dark:text-green-400 border border-green-200 dark:border-green-800 px-2 py-0.5 rounded-full font-bold">
          {hoverIndex !== null ? graphData[hoverIndex].week : "+140% gain"}
        </span>
      </div>

      {/* SVG Canvas for the Graph */}
      <div className="relative w-full flex-grow mt-2">
        <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${width} ${height}`}>
          {/* Grid lines */}
          <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="var(--card-border)" strokeWidth="0.5" />
          <line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} stroke="var(--card-border)" strokeWidth="0.5" />
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="var(--card-border)" strokeWidth="0.5" />

          {/* Area under the line */}
          <path
            d={`${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`}
            fill="url(#gradient-blue)"
            opacity="0.04"
          />

          {/* Core coordinate line */}
          <path
            d={pathD}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />

          {/* Gradient definitions */}
          <defs>
            <linearGradient id="gradient-blue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" />
              <stop offset="100%" stopColor="var(--card-bg)" />
            </linearGradient>
          </defs>

          {/* Hover interactive circle nodes */}
          {points.map((p, idx) => (
            <g key={idx}>
              <circle
                cx={p.x}
                cy={p.y}
                r="6"
                fill="transparent"
                className="cursor-pointer pointer-events-auto"
                onMouseEnter={() => setHoverIndex(idx)}
                onMouseLeave={() => setHoverIndex(null)}
              />
              {hoverIndex === idx && (
                <>
                  <circle cx={p.x} cy={p.y} r="3" fill="var(--accent)" />
                  <line x1={p.x} y1={padding} x2={p.x} y2={height - padding} stroke="var(--accent)" strokeWidth="0.75" strokeDasharray="2 2" />
                </>
              )}
            </g>
          ))}
        </svg>
      </div>

      <div className="flex justify-between items-center border-t border-card-border pt-4 mt-2 font-mono text-[8px] text-text-secondary">
        <span>TIMELINE: 12 WEEKS ACTIVE OPTIMIZATION</span>
        <span>HOVER COORDINATES FOR METRICS</span>
      </div>
    </div>
  );
}

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Monitor Global Scroll Progress
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ['start start', 'end end']
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setScrollProgress(latest);
  });

  const problemVisualY = useTransform(scrollYProgress, [0.15, 0.35], [35, -35]);

  // Parallax offsets for structural bento blocks
  const methodCard1Y = useTransform(scrollYProgress, [0.55, 0.75], [20, -20]);
  const methodCard2Y = useTransform(scrollYProgress, [0.55, 0.75], [-10, 10]);
  const methodCard3Y = useTransform(scrollYProgress, [0.55, 0.75], [15, -15]);
  const methodCard4Y = useTransform(scrollYProgress, [0.55, 0.75], [-20, 20]);

  const homeJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.getshutter.online/#webpage",
        "url": "https://www.getshutter.online",
        "name": "Shutter — AI Search & Answer Engine Optimization Agency",
        "about": {
          "@id": "https://www.getshutter.online/#software"
        },
        "description": "Improve your brand's visibility and secure citations inside ChatGPT, Claude, Gemini, Perplexity, and Google AI Overviews using Shutter."
      }
    ]
  };

  return (
    <div ref={pageRef} className="relative w-full min-h-screen bg-brand-bg text-text-primary overflow-x-clip font-sans scroll-smooth transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      
      {/* 1. Global Navigation Bar */}
      <Navbar />

      {/* 2. Sticky Scrollytelling Side Indicator */}
      <div className="fixed left-8 top-1/4 h-1/2 w-[1px] bg-card-border z-40 hidden lg:block select-none pointer-events-none">
        <div className="h-full w-full relative">
          <motion.div 
            className="absolute top-0 left-0 w-full bg-accent origin-top"
            style={{ height: `${scrollProgress * 100}%` }}
          />
          {[
            { num: "01", label: "Consensus", y: "0%" },
            { num: "02", label: "Market Shift", y: "20%" },
            { num: "03", label: "Core Bento", y: "45%" },
            { num: "04", label: "Telemetry", y: "65%" },
            { num: "05", label: "Methodology", y: "80%" },
            { num: "06", label: "Execution Scopes", y: "90%" },
            { num: "07", label: "Schedule", y: "100%" }
          ].map((ind) => (
            <div 
              key={ind.num}
              className="absolute left-4 -translate-y-1/2 flex items-center gap-2 group cursor-pointer pointer-events-auto"
              style={{ top: ind.y }}
            >
              <span className="text-[8px] font-mono text-text-secondary group-hover:text-accent transition-colors">{ind.num}</span>
              <span className="text-[7px] font-mono text-text-secondary tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{ind.label}</span>
            </div>
          ))}
        </div>
      </div>

      <main id="main-content">
        
        {/* 3. Hero Section */}
        <ScrollVideoHero />

        {/* 4. Platform Demo */}
        <section id="platform" className="py-36 px-6 border-t border-card-border bg-brand-bg relative transition-colors duration-300">
          <div className="max-w-6xl mx-auto mb-20 text-center space-y-4">
            <span className="text-[9px] uppercase tracking-[0.25em] text-accent font-bold block">
              // 01 / Platform Demo
            </span>
            <h2 className="text-4xl font-bold text-text-primary tracking-tight leading-tight">
              Inspect simulated AI consensus.
            </h2>
            <p className="text-xs text-text-secondary max-w-sm mx-auto leading-relaxed font-normal">
              Observe how crawling variables, metadata schemas, and repository activity shift model recommendations.
            </p>
          </div>
          <InteractiveDemo />
        </section>

        {/* 5. The Shift (Problem statement) */}
        <section className="py-36 px-6 border-t border-card-border bg-bg-secondary relative overflow-hidden bg-[linear-gradient(var(--card-border)_1px,transparent_1px),linear-gradient(90deg,var(--card-border)_1px,transparent_1px)] bg-[size:48px_48px] transition-colors duration-300">
          <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_40%,var(--bg-secondary)_100%] pointer-events-none" />
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
            <div className="lg:col-span-5 text-left space-y-6">
              <span className="text-[9px] uppercase tracking-[0.25em] text-accent font-bold block">
                // 02 / The Shift
              </span>
              <h2 className="text-4xl font-bold text-text-primary tracking-tight leading-tight">
                AI search is the new distribution channel.
              </h2>
              <p className="text-xs text-text-secondary leading-relaxed font-normal">
                Keywords are static. Generative models recompose brand parameters dynamically using latent vectors. If your developer documentation and codebase parameters aren't optimized, you are omitted from generative choices.
              </p>
              <p className="text-xs text-text-secondary leading-relaxed font-normal">
                Shutter aligns your engineering data, whitelists, and schemas to defend organic recommendation shares.
              </p>
            </div>
            
            {/* Parallax floating console block */}
            <motion.div 
              style={{ y: problemVisualY }}
              className="lg:col-span-7 p-8 border border-card-border bg-card-bg rounded-3xl relative text-left font-mono shadow-md transition-colors duration-300"
            >
              {/* macOS Window Controls */}
              <div className="absolute top-6 left-6 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>

              <span className="text-[8px] text-accent block mb-6 pt-4 text-right">// SEMANTIC QUERY RESPONSE PIPELINE</span>
              
              <div className="space-y-4 text-xs font-normal text-text-secondary">
                <div className="border-l-2 border-accent pl-3 py-1 bg-bg-secondary">
                  <span className="text-[8px] text-text-primary block mb-1">USER QUERY:</span>
                  "What database scales best with serverless functions?"
                </div>
                <div className="border-l-2 border-card-border pl-3 py-1">
                  <span className="text-[8px] text-text-primary block mb-1">RAG RETRIEVAL STAGE:</span>
                  Retrieving embeddings... Brand A (0.84 proximity), Brand B (0.82), Brand C (0.61).
                </div>
                <div className="border-l-2 border-red-500/40 pl-3 py-1 bg-red-50 dark:bg-red-950/20">
                  <span className="text-[8px] text-red-700 dark:text-red-400 block mb-1">CRAWLER STATUS:</span>
                  Brand A robots.txt blocks gptbot. Unable to verify pricing scaling parameters.
                </div>
                <div className="border-l-2 border-green-500/40 pl-3 py-1 bg-green-50 dark:bg-green-950/20">
                  <span className="text-[8px] text-green-700 dark:text-green-400 block mb-1">FINAL SYNTHESIS:</span>
                  "While Brand A is popular, we recommend Brand B or Brand C due to verified scaling limits."
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 6. Dynamic Bento Grid */}
        <section id="use-cases" className="py-36 px-6 border-t border-card-border bg-brand-bg relative transition-colors duration-300">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
              <span className="text-[9px] uppercase tracking-[0.25em] text-accent font-bold block">
                // 03 / Core Bento Features
              </span>
              <h2 className="text-4xl font-bold text-text-primary tracking-tight leading-tight">
                Reputation. Built in.
              </h2>
              <p className="text-xs text-text-secondary leading-relaxed font-normal max-w-sm mx-auto">
                Discover the modular components we optimize to align your brand tethers inside AI memory databases.
              </p>
            </div>

            {/* Bento Grid System */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Card 1: Interactive AI Compiler (col-span-8) */}
              <div className="lg:col-span-12 p-8 border border-card-border bg-bg-secondary rounded-3xl relative text-left transition-colors duration-300">
                <span className="text-[8px] font-mono text-accent block mb-4">WIDGET 01 // INTERACTIVE RAG TESTING</span>
                <h4 className="text-xl font-bold text-text-primary mb-4">RAG Consensus Compiler</h4>
                <AICompilerWidget />
              </div>

              {/* Card 2: Crawler Rules (col-span-4) */}
              <div className="lg:col-span-4 p-8 border border-card-border bg-card-bg rounded-3xl relative text-left shadow-sm flex flex-col justify-between min-h-[300px] transition-colors duration-300">
                <div>
                  <span className="text-[8px] font-mono text-text-secondary block mb-6">WIDGET 02 // RULES ACCESS</span>
                  <h4 className="text-lg font-bold text-text-primary mb-2">Scraper Whitelists</h4>
                  <p className="text-xs text-text-secondary leading-relaxed font-normal">
                    We optimize your robots.txt routes to allow AI indexers access to documentation while keeping spam indexers restricted.
                  </p>
                </div>
                <div className="bg-bg-secondary p-3.5 rounded-xl border border-card-border font-mono text-[9px] text-text-secondary mt-6 transition-colors duration-300">
                  <span className="text-text-secondary block mb-1"># robots.txt optimized</span>
                  User-agent: GPTBot<br />
                  Allow: /docs/pricing<br />
                  Disallow: /admin
                </div>
              </div>

              {/* Card 3: Proximity Vector Graph (col-span-8) */}
              <div className="lg:col-span-8">
                <ProximityVectorGraph />
              </div>

              {/* Card 4: Schema Graph (col-span-4) */}
              <div className="lg:col-span-4 p-8 border border-card-border bg-card-bg rounded-3xl relative text-left shadow-sm flex flex-col justify-between min-h-[300px] transition-colors duration-300">
                <div>
                  <span className="text-[8px] font-mono text-text-secondary block mb-6">WIDGET 03 // DATA STRUCTURES</span>
                  <h4 className="text-lg font-bold text-text-primary mb-2">JSON-LD Schemas</h4>
                  <p className="text-xs text-text-secondary leading-relaxed font-normal">
                    Deploy direct entities comparisons, verified features lists, and pricing parameters for GPT and Claude to scrape.
                  </p>
                </div>
                <div className="bg-bg-secondary p-3.5 rounded-xl border border-card-border font-mono text-[9px] text-text-secondary mt-6 transition-colors duration-300">
                  <span className="text-accent font-semibold">"FAQPage"</span> context verified.<br />
                  JSON-LD successfully whitelisted.
                </div>
              </div>

              {/* Card 5: Competitor Hijack (col-span-8) */}
              <div className="lg:col-span-8 p-8 border border-card-border bg-card-bg rounded-3xl relative text-left shadow-sm flex flex-col justify-between min-h-[300px] transition-colors duration-300">
                <div>
                  <span className="text-[8px] font-mono text-text-secondary block mb-6">WIDGET 04 // THREAT SCAN</span>
                  <h4 className="text-lg font-bold text-text-primary mb-2">Eliminate competitor link hijackings</h4>
                  <p className="text-xs text-text-secondary leading-relaxed font-normal">
                    Ensure AI recommendation summaries cite your domain for factual evidence rather than forwarding users to competitors.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="border-l border-[#ff5f56] pl-3 py-1 bg-red-50/30 dark:bg-red-950/10">
                    <span className="text-[8px] text-red-500 block font-mono">UNOPTIMIZED:</span>
                    AI references competitor guides
                  </div>
                  <div className="border-l border-green-500 pl-3 py-1 bg-green-50/30 dark:bg-green-950/10">
                    <span className="text-[8px] text-green-600 block font-mono">SHUTTER TUNED:</span>
                    Direct client citation link secured
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 7. Verified Metrics Section */}
        <div className="border-y border-card-border">
          <MetricSection />
        </div>

        {/* 8. Pure AEO & Growth Methodologies (Replacing fake cases and testimonials) */}
        <section className="py-36 px-6 bg-brand-bg relative transition-colors duration-300">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-24 space-y-4">
              <span className="text-[9px] uppercase tracking-[0.25em] text-accent font-bold block">
                // 04 / Our Frameworks
              </span>
              <h2 className="text-4xl font-bold text-text-primary tracking-tight leading-tight">
                Our AEO & Product Growth Plays
              </h2>
              <p className="text-xs text-text-secondary leading-relaxed font-normal max-w-sm mx-auto">
                Pure technical strategies and execution plays to expand your brand's citation footprints.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Method 1 */}
              <motion.div 
                style={{ y: methodCard1Y }}
                className="p-8 border border-card-border bg-card-bg rounded-3xl relative text-left shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-[320px]"
              >
                <div>
                  <span className="text-[8px] font-mono text-text-secondary uppercase tracking-widest block mb-4">PLAY 01 // CRAWL OPTIMIZATION</span>
                  <h4 className="text-xl font-bold text-text-primary mb-2">Restoring Bot Access Parameters</h4>
                  <p className="text-xs text-text-secondary leading-relaxed font-normal">
                    Most developer products block search bot user-agents in their primary documentation robots.txt. Recommenders fallback on outdated community threads. We audit, resolve, and rewrite access schemas to ensure factual accuracy.
                  </p>
                </div>
                <div className="border-t border-card-border pt-4 flex justify-between items-center text-xs font-mono">
                  <span className="text-text-secondary">TACTIC:</span>
                  <span className="text-accent font-bold">Semantic Crawl Whitelisting</span>
                </div>
              </motion.div>

              {/* Method 2 */}
              <motion.div 
                style={{ y: methodCard2Y }}
                className="p-8 border border-card-border bg-card-bg rounded-3xl relative text-left shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-[320px]"
              >
                <div>
                  <span className="text-[8px] font-mono text-text-secondary uppercase tracking-widest block mb-4">PLAY 02 // ENTITY ANCHORING</span>
                  <h4 className="text-xl font-bold text-text-primary mb-2">Schema & Vector Proximity Alignment</h4>
                  <p className="text-xs text-text-secondary leading-relaxed font-normal">
                    We deploy JSON-LD schemas mapping your product's comparison grids, feature tables, and core parameters. AI parsers ingest these schemas directly, decreasing vector distance and securing recommended placements.
                  </p>
                </div>
                <div className="border-t border-card-border pt-4 flex justify-between items-center text-xs font-mono">
                  <span className="text-text-secondary">TACTIC:</span>
                  <span className="text-accent font-bold">JSON-LD Entity Structuring</span>
                </div>
              </motion.div>

              {/* Method 3 */}
              <motion.div 
                style={{ y: methodCard3Y }}
                className="p-8 border border-card-border bg-card-bg rounded-3xl relative text-left shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-[320px]"
              >
                <div>
                  <span className="text-[8px] font-mono text-text-secondary uppercase tracking-widest block mb-4">PLAY 03 // ACQUISITION DOMINANCE</span>
                  <h4 className="text-xl font-bold text-text-primary mb-2">Alternative Query Citations</h4>
                  <p className="text-xs text-text-secondary leading-relaxed font-normal">
                    When buyers ask recommenders for comparisons or alternatives, Shutter ensures your brand inherits the primary link referrals. We restructure comparative content directories to maximize placement share.
                  </p>
                </div>
                <div className="border-t border-card-border pt-4 flex justify-between items-center text-xs font-mono">
                  <span className="text-text-secondary">TACTIC:</span>
                  <span className="text-accent font-bold">Comparison Matrix Restructuring</span>
                </div>
              </motion.div>

              {/* Method 4 */}
              <motion.div 
                style={{ y: methodCard4Y }}
                className="p-8 border border-card-border bg-card-bg rounded-3xl relative text-left shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-[320px]"
              >
                <div>
                  <span className="text-[8px] font-mono text-text-secondary uppercase tracking-widest block mb-4">PLAY 04 // RETRIEVAL VERIFICATION</span>
                  <h4 className="text-xl font-bold text-text-primary mb-2">Codebase Grounding anchors</h4>
                  <p className="text-xs text-text-secondary leading-relaxed font-normal">
                    For technical developer-focused brands, recommenders scrape public codebase metadata. We align open-source repositories and API code references to function as verified fact sources.
                  </p>
                </div>
                <div className="border-t border-card-border pt-4 flex justify-between items-center text-xs font-mono">
                  <span className="text-text-secondary">TACTIC:</span>
                  <span className="text-accent font-bold">Repository Metadata Optimization</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 11. Agency Engagement Scopes */}
        <section id="pricing" className="py-36 px-6 border-t border-card-border bg-bg-secondary relative transition-colors duration-300">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
              <span className="text-[9px] uppercase tracking-[0.25em] text-accent font-bold block">
                // 05 / Agency Engagement Scopes
              </span>
              <h2 className="text-4xl font-bold text-text-primary tracking-tight leading-tight">
                Full-service AEO implementation.
              </h2>
              <p className="text-xs text-text-secondary leading-relaxed font-normal max-w-sm mx-auto">
                We handle the audits, structural fixes, search engine alignments, and growth tracking for your engineering domains.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  title: "Scope I / Diagnostic Audit",
                  desc: "Complete mapping of baseline visibility metrics across OpenAI, Anthropic, Gemini, and Perplexity models.",
                  items: [
                    "Crawler configuration audit",
                    "Competitor linkage profiling",
                    "Schema error detection",
                    "Detailed action matrix report"
                  ],
                  cta: "Request Audit Report"
                },
                {
                  title: "Scope II / Structural Fixes",
                  desc: "Direct code adjustments to whitelists, API schemas, and document files to clean up search indexing pipelines.",
                  items: [
                    "robots.txt configurations",
                    "Custom JSON-LD generations",
                    "Documentation header tuning",
                    "Verification validations"
                  ],
                  cta: "Engage Shutter Fixes"
                },
                {
                  title: "Scope III / Product Growth",
                  desc: "Comprehensive positioning partnership to scale developer acquisition, capture competitor alternative queries, and secure top rankings.",
                  items: [
                    "Direct engineering channel sync",
                    "Alternative comparison capture",
                    "Developer intent alignment",
                    "Entity consensus building"
                  ],
                  cta: "Partner for Growth"
                },
                {
                  title: "Scope IV / Continuous Monitor",
                  desc: "Continuous vector tracking and weekly diagnostic scrapes to defend citation holdings from model updates.",
                  items: [
                    "Weekly model visibility checks",
                    "Real-time drift notifications",
                    "Schema drift adjustments",
                    "Ongoing crawl protections"
                  ],
                  cta: "Setup Vector Monitor"
                }
              ].map((tier) => (
                <div key={tier.title} className="p-6 border border-card-border bg-card-bg rounded-3xl relative text-left flex flex-col justify-between h-[360px] shadow-sm hover:shadow-md transition-all duration-200 font-sans">
                  <div>
                    <h4 className="text-xs font-semibold text-accent uppercase tracking-wider mb-3 font-mono">{tier.title}</h4>
                    <p className="text-xs text-text-secondary font-normal leading-relaxed mb-6 min-h-[64px]">{tier.desc}</p>
                  </div>
                  <ul className="space-y-2.5 text-[10px] text-text-secondary font-mono flex-grow">
                    {tier.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="text-accent">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/#book-demo"
                    className="mt-6 w-full text-center py-2.5 bg-text-primary hover:opacity-90 text-brand-bg rounded-full text-[10px] font-semibold uppercase tracking-wider transition-all duration-200 font-mono block"
                  >
                    {tier.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 12. FAQ Section */}
        <section id="faq" className="py-36 px-6 border-t border-card-border bg-brand-bg relative transition-colors duration-300">
          <div className="max-w-4xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <span className="text-[9px] uppercase tracking-[0.25em] text-accent font-bold block">
                // 06 / Guidelines
              </span>
              <h2 className="text-4xl font-bold text-text-primary tracking-tight mb-4">
                Frequently asked queries.
              </h2>
            </div>
            <FaqAccordion />
          </div>
        </section>

        {/* 13. Book Demo / Call Scheduler Section */}
        <section id="book-demo" className="py-36 px-6 border-t border-card-border bg-bg-secondary relative overflow-hidden transition-colors duration-300">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
          <div className="max-w-3xl mx-auto text-center space-y-12">
            
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-bold block">
                // 07 / Audit Registry
              </span>
              <h2 className="text-4xl font-bold text-text-primary tracking-tight leading-tight">
                Request a custom AI Visibility Audit.
              </h2>
              <p className="text-xs text-text-secondary max-w-md mx-auto leading-relaxed font-normal">
                Enter your corporate domain. Our engineering team will compile a report detailing your brand's placement across GPT-4 and Claude.
              </p>
            </div>

            {/* High-Converting Meeting Request Form */}
            <form className="max-w-md mx-auto p-8 border border-card-border bg-card-bg rounded-3xl relative text-left space-y-6 shadow-md transition-colors duration-300">
              <div className="space-y-2">
                <label className="text-[9px] font-mono text-text-primary uppercase tracking-widest block font-medium">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Arthur Pendelton"
                  className="w-full bg-input-bg border border-input-border focus:border-accent text-xs px-4 py-3 rounded-lg text-text-primary outline-none font-sans transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-mono text-text-primary uppercase tracking-widest block font-medium">Corporate Domain</label>
                <input
                  type="url"
                  required
                  placeholder="https://company.com"
                  className="w-full bg-input-bg border border-input-border focus:border-accent text-xs px-4 py-3 rounded-lg text-text-primary outline-none font-sans transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-mono text-text-primary uppercase tracking-widest block font-medium">Target Search Query</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 'best serverless database'"
                  className="w-full bg-input-bg border border-input-border focus:border-accent text-xs px-4 py-3 rounded-lg text-text-primary outline-none font-sans transition-all duration-200"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer block text-center border-none"
              >
                Request Custom Audit
              </button>

              <span className="text-[8px] font-mono text-text-secondary block text-center uppercase tracking-wider pt-2">
                Our team will present the custom report directly on the call.
              </span>
            </form>

          </div>
        </section>
      </main>

      {/* 14. Archive Mega Footer */}
      <footer id="resources" className="border-t border-card-border pt-28 pb-16 px-6 md:px-12 lg:px-24 bg-bg-secondary relative overflow-hidden select-none transition-colors duration-300">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-16">
            
            {/* Left Section: Architecture & Archive Label */}
            <div className="col-span-12 md:col-span-5 flex flex-col gap-6 text-left">
              <div className="flex items-center gap-3">
                <img 
                  src="/shutter_logo.png" 
                  alt="Shutter Logo" 
                  className="w-8 h-8 object-contain rounded-md"
                />
                <span className="text-sm font-bold tracking-[0.3em] text-text-primary font-mono uppercase">
                  SHUTTER AEO
                </span>
              </div>
              <div className="text-text-secondary text-xs font-sans space-y-4 font-light leading-relaxed">
                <div>
                  <p className="font-sans font-bold text-text-primary">"Every document is a coordinate. Every citation is a weight."</p>
                  <p className="mt-4">9 Pearse Street, Kinsale</p>
                  <p>Cork, Ireland</p>
                </div>
                <div className="pt-2 font-mono text-[10px]">
                  <p className="hover:text-text-primary transition-colors duration-200"><a href="mailto:hello@shutter.ai">hello@shutter.ai</a></p>
                  <p>+353 (21) 477-9000</p>
                </div>
              </div>
            </div>

            {/* Right Section: Engraved Brass Archive Drawers */}
            <div className="col-span-12 md:col-span-7 grid grid-cols-3 gap-8 text-left">
              
              {/* Drawers Column (Menu) */}
              <div>
                <h5 className="text-[9px] font-bold uppercase tracking-[0.2em] text-accent mb-6 font-mono">Archive Drawers</h5>
                <ul className="space-y-4 text-xs font-light text-text-secondary font-mono">
                  <li><Link href="#platform" className="hover:text-text-primary transition-colors duration-200">Draw. I / Platform</Link></li>
                  <li><Link href="#use-cases" className="hover:text-text-primary transition-colors duration-200">Draw. II / Cases</Link></li>
                  <li><Link href="#pricing" className="hover:text-text-primary transition-colors duration-200">Draw. III / Pricing</Link></li>
                  <li><Link href="#faq" className="hover:text-text-primary transition-colors duration-200">Draw. IV / FAQ</Link></li>
                </ul>
              </div>

              {/* Information Desk Column (Resources) */}
              <div>
                <h5 className="text-[9px] font-bold uppercase tracking-[0.2em] text-accent mb-6 font-mono">Information Desk</h5>
                <ul className="space-y-4 text-xs font-light text-text-secondary font-mono">
                  <li><Link href="/blog" className="hover:text-text-primary transition-colors duration-200">Doc. A / Blog</Link></li>
                  <li><Link href="#faq" className="hover:text-text-primary transition-colors duration-200">Doc. B / Guidelines</Link></li>
                  <li><Link href="#book-demo" className="hover:text-text-primary transition-colors duration-200">Doc. C / Scheduler</Link></li>
                </ul>
              </div>

              {/* Correspondence Column */}
              <div>
                <h5 className="text-[9px] font-bold uppercase tracking-[0.2em] text-accent mb-6 font-mono">Correspondence Office</h5>
                <ul className="space-y-4 text-xs font-light text-text-secondary font-mono">
                  <li><Link href="#" className="hover:text-text-primary transition-colors duration-200">Off. 01 / Registry</Link></li>
                  <li><Link href="/blog" className="hover:text-text-primary transition-colors duration-200">Off. 02 / Articles</Link></li>
                  <li><Link href="#book-demo" className="hover:text-text-primary transition-colors duration-200">Off. 03 / Dispatch</Link></li>
                </ul>
              </div>

            </div>
          </div>

          {/* Middle Dividing Line */}
          <div className="flex items-center justify-between border-t border-card-border pt-8 pb-12 w-full">
            <div className="flex-grow h-[1px] bg-card-border mr-6" />
            <Link
              href="#book-demo"
              className="px-6 py-2.5 bg-card-bg border border-card-border hover:bg-bg-secondary text-text-primary rounded-full text-[10px] font-semibold uppercase tracking-wider transition-all duration-200 whitespace-nowrap font-mono"
            >
              Access Vault Registry
            </Link>
          </div>

          {/* Bottom Copyright and Disclaimers */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-[10px] font-mono text-text-secondary font-light">
            <div className="max-w-md leading-relaxed text-left">
              From entity mapping to vector optimization. Our quiet diagnostic tools secure your brand's citation footprint inside AI's understanding.
            </div>
            <div className="flex gap-8 uppercase tracking-widest whitespace-nowrap">
              <Link href="#" className="hover:text-text-primary transition-colors duration-200">Terms of Vault</Link>
              <Link href="#" className="hover:text-text-primary transition-colors duration-200">Privacy Protocols</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
