"use client";

import { useState } from "react";
import Link from "next/link";

interface FaqItem {
  id: string;
  title: string;
  year: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "what-is-aeo",
    title: "What is Answer Engine Optimization?",
    year: "2026",
    answer: "AEO is the mapping of human knowledge structures to ensure they are readable by artificial intelligence model parsers. Unlike traditional search indices which match keywords, AI engines synthesize semantic relationships inside latent vector spaces."
  },
  {
    id: "how-shutter-works",
    title: "How does Shutter establish visibility?",
    year: "2026",
    answer: "Shutter aligns your documentation, compliance endpoints, and API tables with LLM retrieval requirements (RAG). By presenting data in direct entity relationships, we ensure the recommenders link to your domain."
  },
  {
    id: "why-do-we-need-tuning",
    title: "Why is traditional SEO insufficient?",
    year: "2026",
    answer: "Traditional spiders crawl blue links. AI model crawlers retrieve facts. If your facts are unverified, unstructured, or hidden behind blocking robots.txt configurations, you are omitted from generative recommendations."
  },
  {
    id: "can-i-optimize-robots",
    title: "Can crawling paths be whitelisted?",
    year: "2026",
    answer: "Yes. Many enterprise domains unknowingly block AI index crawlers (like GPTBot, ClaudeBot, and PerplexityBot) in their robots.txt files, or lack structured Schema.org markup. Shutter maps these faults and aligns access."
  }
];

export default function FaqAccordion() {
  const [activeId, setActiveId] = useState<string | null>("what-is-aeo");

  const toggleAccordion = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="bg-bg-secondary text-text-primary py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden border-t border-card-border font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left Side: Concrete Quote Slab (Converted to light Apple cardboard) */}
        <div className="lg:col-span-5 flex flex-col justify-between min-h-[380px] p-8 border border-card-border bg-card-bg rounded-3xl relative select-none shadow-sm transition-colors duration-300">
          <div className="space-y-4">
            <span className="text-[9px] font-sans text-text-secondary uppercase tracking-widest block font-semibold">
              03 / Design Principle
            </span>
            <h2 className="text-3xl font-bold text-text-primary tracking-tight leading-snug">
              Trust is built on verified connections.
            </h2>
          </div>

          <div className="pt-12 space-y-4 border-t border-card-border">
            <p className="text-xs text-text-secondary leading-relaxed font-normal">
              From crawling structures to deep model evaluations, Shutter secures your brand’s citation footprint inside AI answers.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[9px] font-mono text-text-secondary uppercase tracking-widest">Observatory Status: Active</span>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive FAQ List */}
        <div className="lg:col-span-7 flex flex-col w-full text-left">
          {FAQ_ITEMS.map((item) => {
            const isOpen = activeId === item.id;
            return (
              <div
                key={item.id}
                className="border-t border-card-border py-6 transition-all duration-300 ease-in-out"
              >
                {/* Header Row */}
                <button
                  onClick={() => toggleAccordion(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  className="flex items-center justify-between w-full text-left group focus:outline-none rounded-lg cursor-pointer"
                >
                  <span 
                    id={`faq-title-${item.id}`}
                    className="text-base font-semibold text-text-primary tracking-tight flex items-baseline gap-2 group-hover:text-accent transition-colors duration-200"
                  >
                    <span className="text-[9px] text-text-secondary font-mono font-normal">©</span>
                    {item.title}
                    <span className="text-[9px] text-text-secondary font-mono font-normal ml-1">{item.year}</span>
                  </span>

                  {/* Circular Arrow Icon */}
                  <div className={`w-6 h-6 rounded-full border border-card-border flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-text-primary border-text-primary text-brand-bg rotate-90' : 'group-hover:border-text-primary'}`}>
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-colors duration-300 ${isOpen ? 'text-brand-bg' : 'text-text-secondary'}`}
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </button>

                {/* Content Section */}
                <div
                  id={`faq-answer-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-title-${item.id}`}
                  className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-xs text-text-secondary leading-relaxed max-w-2xl mb-4 font-normal">
                      {item.answer}
                    </p>
                    
                    <Link
                      href="/#book-demo"
                      aria-label={`Get started with ${item.title}`}
                      className="inline-flex items-center gap-1.5 border border-card-border hover:border-text-primary text-text-primary px-4 py-2 rounded-full text-[10px] font-semibold tracking-wider uppercase transition-all duration-300"
                    >
                      Book a Call
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
          {/* Border-bottom for the last item to complete the grid lines */}
          <div className="border-t border-card-border" />
        </div>
      </div>
    </section>
  );
}
