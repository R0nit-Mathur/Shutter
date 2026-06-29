"use client";

import { useState } from "react";
import Image from "next/image";
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
    title: "What is AEO (Answer Engine Optimization)?",
    year: "2026",
    answer: "AEO is the practice of optimizing your website and content specifically to be cited and referenced by AI search engines, such as ChatGPT, Gemini, Claude, and Perplexity. Unlike traditional SEO which focuses on web ranking, AEO centers on context relevance, factual accuracy, and alignment with LLM training weights."
  },
  {
    id: "how-shutter-works",
    title: "How does Shutter track my visibility?",
    year: "2026",
    answer: "Shutter deploys asynchronous API probes to major models in parallel using your framed search queries. It maps citation occurrences, calculates visibility indexes, audits robots.txt disallow routes, and checks structured JSON-LD schemas to give you a real-time health indicator of your brand presence across LLMs."
  },
  {
    id: "why-do-we-need-tuning",
    title: "Why does my brand need generative tuning?",
    year: "2026",
    answer: "LLM weights and RAG systems rely heavily on semantic associations. If your brand is not linked with positive attributes, features, or direct comparisons in the models' latent vectors, they will not recommend you. Shutter helps identify content and citation gaps to tune your presence directly in their neural databases."
  },
  {
    id: "can-i-optimize-robots",
    title: "Can I optimize robots.txt and schemas?",
    year: "2026",
    answer: "Absolutely. Many sites unknowingly block AI index crawlers (like GPTBot, ClaudeBot, and PerplexityBot) in their robots.txt files, or lack structured Schema.org markups. Shutter identifies these structural failures and provides copy-paste templates to immediately align your website with LLM guidelines."
  }
];

export default function FaqAccordion() {
  const [activeId, setActiveId] = useState<string | null>("what-is-aeo");

  const toggleAccordion = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="bg-brand-bg text-white py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left Side: Images & Brand Intro */}
        <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-row gap-8 items-start relative w-full">
          {/* First Column */}
          <div className="flex flex-col gap-6 w-full lg:w-1/2">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[32px] bg-neutral-900 shadow-md">
              <Image
                src="/aeo_citation_mesh.png"
                alt="AI Citation Mesh"
                fill
                className="object-cover"
                sizes="(max-w-768px) 100vw, 50vw"
                priority
              />
            </div>
            
            {/* Wear the Moment - brand statement replacement */}
            <div className="flex items-center gap-3 mt-2 px-1">
              {/* Custom abstract icon representing Shutter logo */}
              <div className="grid grid-cols-2 gap-1 w-6 h-6 rotate-45">
                <div className="bg-[#FF5D22] rounded-full w-2.5 h-2.5" />
                <div className="bg-white/80 rounded-full w-2.5 h-2.5" />
                <div className="bg-white/80 rounded-full w-2.5 h-2.5" />
                <div className="bg-[#FF5D22] rounded-full w-2.5 h-2.5" />
              </div>
              <span className="text-sm font-bold tracking-wider uppercase text-white">[Optimize the Future]</span>
            </div>
          </div>

          {/* Second Column */}
          <div className="flex flex-col gap-8 w-full lg:w-1/2 lg:mt-16">
            <p className="text-sm text-neutral-400 leading-relaxed font-light">
              From crawling structures to deep model evaluations, our diagnostic console secures your brand’s citation footprint inside AI answers.
            </p>
            
            <div className="relative aspect-[4/5] w-full overflow-hidden shadow-md" style={{ borderRadius: "40px 120px 40px 40px" }}>
              <Image
                src="/aeo_data_node.png"
                alt="AI Data Node"
                fill
                className="object-cover"
                sizes="(max-w-768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>

        {/* Right Side: Interactive FAQ List */}
        <div className="lg:col-span-7 flex flex-col w-full">
          {FAQ_ITEMS.map((item) => {
            const isOpen = activeId === item.id;
            return (
              <div
                key={item.id}
                className="border-t border-white/10 py-6 transition-all duration-300 ease-in-out"
              >
                {/* Header Row */}
                <button
                  onClick={() => toggleAccordion(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  className="flex items-center justify-between w-full text-left group focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4 rounded-lg"
                >
                  <span 
                    id={`faq-title-${item.id}`}
                    className="text-base md:text-lg font-medium text-neutral-200 tracking-tight flex items-baseline gap-2 group-hover:text-white transition-colors duration-200"
                  >
                    <span className="text-xs text-neutral-500 font-mono">©</span>
                    {item.title}
                    <span className="text-xs text-neutral-500 font-mono font-normal ml-1">{item.year}</span>
                  </span>

                  {/* Circular Arrow Icon */}
                  <div className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-white border-white rotate-90' : 'group-hover:border-white'}`}>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-colors duration-300 ${isOpen ? 'text-[#0A0B0D]' : 'text-neutral-400'}`}
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
                    <p className="text-sm text-neutral-400 leading-relaxed max-w-2xl mb-6">
                      {item.answer}
                    </p>
                    
                    <Link
                      href="/login"
                      aria-label={`Get started with ${item.title}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 hover:bg-white hover:text-black rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                    >
                      Get Started
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
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
          <div className="border-t border-white/10" />
        </div>
      </div>
    </section>
  );
}
