import Navbar from "@/components/Navbar";
import ScrollVideoHero from "@/components/ScrollVideoHero";
import InteractiveDemo from "@/components/InteractiveDemo";
import MetricSection from "@/components/MetricSection";
import FaqAccordion from "@/components/FaqAccordion";
import Link from "next/link";

export default async function Home() {

  const homeJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.getshutter.online/#webpage",
        "url": "https://www.getshutter.online",
        "name": "Shutter — AI Search & Answer Engine Optimization Platform",
        "isPartOf": {
          "@id": "https://www.getshutter.online/#website"
        },
        "about": {
          "@id": "https://www.getshutter.online/#software"
        },
        "description": "Improve your brand's visibility and secure citations inside ChatGPT, Claude, Gemini, Perplexity, and Google AI Overviews using Shutter.",
        "breadcrumb": {
          "@id": "https://www.getshutter.online/#breadcrumb"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.getshutter.online/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.getshutter.online"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.getshutter.online/#faqpage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is AEO (Answer Engine Optimization)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "AEO is the practice of optimizing your website and content specifically to be cited and referenced by AI search engines, such as ChatGPT, Gemini, Claude, and Perplexity. Unlike traditional SEO which focuses on web ranking, AEO centers on context relevance, factual accuracy, and alignment with LLM training weights."
            }
          },
          {
            "@type": "Question",
            "name": "How does Shutter track my visibility?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Shutter deploys asynchronous API probes to major models in parallel using your framed search queries. It maps citation occurrences, calculates visibility indexes, audits robots.txt disallow routes, and checks structured JSON-LD schemas to give you a real-time health indicator of your brand presence across LLMs."
            }
          },
          {
            "@type": "Question",
            "name": "Why does my brand need generative tuning?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "LLM weights and RAG systems rely heavily on semantic associations. If your brand is not linked with positive attributes, features, or direct comparisons in the models' latent vectors, they will not recommend you. Shutter helps identify content and citation gaps to tune your presence directly in their neural databases."
            }
          },
          {
            "@type": "Question",
            "name": "Can I optimize robots.txt and schemas?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely. Many sites unknowingly block AI index crawlers (like GPTBot, ClaudeBot, and PerplexityBot) in their robots.txt files, or lack structured Schema.org markups. Shutter identifies these structural failures and provides copy-paste templates to immediately align your website with LLM guidelines."
            }
          }
        ]
      },
      {
        "@type": "Product",
        "@id": "https://www.getshutter.online/#product",
        "name": "Shutter AI Visibility Platform",
        "description": "Improve your brand's visibility and secure citations inside ChatGPT, Claude, Gemini, Perplexity, and Google AI Overviews using Shutter.",
        "image": "https://www.getshutter.online/logo.png",
        "brand": {
          "@type": "Brand",
          "name": "Shutter"
        },
        "offers": {
          "@type": "Offer",
          "price": "0.00",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": "https://www.getshutter.online/login"
        }
      }
    ]
  };

  return (
    <div className="relative w-full min-h-screen bg-brand-bg text-white overflow-x-clip font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      {/* 1. Global Navigation Bar */}
      <Navbar />

      <main id="main-content">
        {/* 2. Scroll-Driven Observatory Hero Section */}
        <ScrollVideoHero />

      {/* 3. Product Demo (Moved directly below Hero) */}
      <section className="py-24 px-6 border-t border-white/[0.05] relative">
        <div className="pointer-events-none absolute top-10 left-1/4 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[100px]" />
        <InteractiveDemo />
      </section>

      {/* 4. Problem Section: Are you visible inside AI? */}
      <section id="problem" className="py-32 px-6 relative border-t border-white/[0.05]">
        <div className="pointer-events-none absolute top-40 right-1/4 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px]" />
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <span className="text-xs uppercase tracking-[0.2em] text-accent font-bold mb-3 block">
                THE PARADIGM SHIFT
              </span>
              <h2 className="text-4xl sm:text-5xl font-light text-white tracking-tight mb-6 leading-tight">
                Are you visible inside AI?
              </h2>
              <p className="text-base text-text-secondary leading-relaxed mb-6 font-light">
                Traditional search index engines crawled keyword strings to index lists of blue links. Today, artificial neural networks analyze structural data, semantic associations, and factual consensus to synthesize direct recommendations.
              </p>
              <p className="text-sm text-text-secondary leading-relaxed font-light">
                To be visible, you must shift your focus from search optimization to model alignment. Your brand must exist inside the latent weights of generative models.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Traditional Search */}
              <div className="p-8 border border-white/[0.05] bg-white/[0.01] rounded-2xl flex flex-col justify-between min-h-[260px]">
                <div>
                  <span className="text-xs font-bold text-white/40 tracking-wider uppercase block mb-1">
                    Past / Traditional Search
                  </span>
                  <h3 className="text-xl font-light text-white mb-4">Keyword Indexation</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Optimized for header tags, page load speeds, and static backlink weights. Ranks directories to route traffic.
                  </p>
                </div>
                <span className="text-[10px] font-semibold text-text-secondary border-t border-white/[0.05] pt-4 block font-mono">
                  Target: Google Web Spiders
                </span>
              </div>

              {/* AI Synthesis */}
              <div className="p-8 border border-accent/20 bg-accent/[0.02] rounded-2xl flex flex-col justify-between min-h-[260px] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-xl pointer-events-none" />
                <div>
                  <span className="text-xs font-bold text-accent tracking-wider uppercase block mb-1">
                    Present / Generative Synthesis
                  </span>
                  <h3 className="text-xl font-light text-white mb-4">Neural Vector Proximity</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Optimized for semantic attributes, factual accuracy, and context alignment. Pulls citation reference sources into answers.
                  </p>
                </div>
                <span className="text-[10px] font-semibold text-accent border-t border-accent/20 pt-4 block font-mono">
                  Target: LLM Weights & RAG Corpora
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Pain Section: The Cost of Invisibility */}
      <section id="pain" className="py-32 px-6 border-t border-white/[0.05] bg-black/10 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs uppercase tracking-[0.2em] text-red-400 font-bold mb-3 block">
              THE INVISIBILITY RISK
            </span>
            <h2 className="text-4xl sm:text-5xl font-light text-white tracking-tight mb-4">
              If AI doesn't mention you, you don't exist.
            </h2>
            <p className="text-base text-text-secondary leading-relaxed font-light">
              When buyers query ChatGPT or Perplexity for product comparisons, search is bypassed. If your site isn't indexed in the weights, you lose the deal before the user even clicks a link.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-red-500/10 bg-red-500/[0.01] rounded-2xl">
              <h4 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                Citation Drops
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                As LLMs update weights, previously high-ranking websites drop out of citations because their schema structure is unreadable to updated web parsers.
              </p>
            </div>

            <div className="p-6 border border-red-500/10 bg-red-500/[0.01] rounded-2xl">
              <h4 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                Hallucinated Claims
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Without clean structural tags, models compile cached, outdated information or hallucinate specs, destroying conversion confidence.
              </p>
            </div>

            <div className="p-6 border border-red-500/10 bg-red-500/[0.01] rounded-2xl">
              <h4 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                Competitor Hijacking
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Aggressive competitor brands configure schema markup rules specifically to target comparison prompts, stealing your market share inside model recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Solution / How It Works */}
      <section id="solution" className="py-32 px-6 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-24">
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-bold mb-3 block">
              THE OPERATION SYSTEM
            </span>
            <h2 className="text-4xl sm:text-5xl font-light text-white tracking-tight mb-4">
              How Shutter Works
            </h2>
            <p className="text-base text-text-secondary leading-relaxed font-light">
              Shutter is the AI Visibility Platform that monitors model perception and deploys schema tunings to ensure you appear in direct recommendations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Scan & Map",
                desc: "Submit your domain. Shutter automatically maps your index footprint and identifies semantic gaps between your pages and target search vectors."
              },
              {
                step: "02",
                title: "Analyze AI Perception",
                desc: "We trigger parallel diagnostic checks to OpenAI, Gemini, Claude, and Perplexity, recording citation logs, SWOT analysis, and competitor share-of-voice indices."
              },
              {
                step: "03",
                title: "Optimize & Secure",
                desc: "Deploy tailored schema markups and close content gaps. Shutter alerts you if your citation standing falls or if model updates alter recommendations."
              }
            ].map((item, i) => (
              <div key={i} className="flex flex-col">
                <div className="text-6xl sm:text-7xl font-extralight font-sans tracking-tight text-white/10 mb-6 select-none border-b border-white/[0.05] pb-4">
                  {item.step}
                </div>
                <h4 className="text-lg font-semibold text-white mb-3 font-sans">{item.title}</h4>
                <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Capabilities Section: Outcome-driven features */}
      <section id="platform" className="py-32 px-6 bg-white/[0.01] border-t border-white/[0.05] relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-24">
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-bold mb-3 block">
              PLATFORM CAPABILITIES
            </span>
            <h2 className="text-4xl sm:text-5xl font-light text-white tracking-tight mb-4">
              Engineered for Customer Outcomes
            </h2>
            <p className="text-base text-text-secondary leading-relaxed font-light">
              Stop guessing what LLMs think. Audit your semantic presence and secure placement inside AI recommendations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI Visibility Audit",
                desc: "Analyze and score how models recommend your brand for high-intent search terms across target neural networks."
              },
              {
                title: "Citation Tracking",
                desc: "Track which technical documents, pages, and forum reviews ChatGPT and Claude reference when formulating answers."
              },
              {
                title: "Entity Optimization",
                desc: "Deploy clean structured JSON-LD data to link your product attributes directly inside model databases."
              },
              {
                title: "Knowledge Graph Analysis",
                desc: "Understand how models map your brand relationships and categories compared to major industry benchmarks."
              },
              {
                title: "AI Search Monitoring",
                desc: "Evaluate prompt responses over thousands of user search combinations to ensure consistent brand recommendations."
              },
              {
                title: "Competitive Benchmarking",
                desc: "Compare your AI share-of-voice indices directly against competitor products to measure search capture."
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 border border-white/[0.04] bg-brand-bg rounded-xl hover:border-white/10 transition-colors duration-200 flex flex-col justify-between min-h-[200px]">
                <div>
                  <h4 className="text-base font-semibold text-white mb-3">{feature.title}</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">{feature.desc}</p>
                </div>
                <span className="text-[10px] font-mono text-accent uppercase tracking-wider block mt-6">
                  → Verify Outcome
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Social Proof / Compatibility Section */}
      <section className="py-20 px-6 border-t border-white/[0.05] bg-white/[0.005]">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-[10px] uppercase tracking-[0.25em] text-text-secondary font-semibold mb-8 block">
            COMPATIBLE WITH LEADING AI ENGINES
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8 opacity-60">
            {["OpenAI ChatGPT", "Anthropic Claude", "Google Gemini", "Perplexity AI"].map((engine, i) => (
              <span key={i} className="text-sm font-semibold tracking-[0.15em] text-white font-mono border border-white/10 bg-white/[0.02] px-5 py-2.5 rounded-lg">
                {engine.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Metrics Summary Section */}
      <MetricSection />

      {/* 10. Case Studies Section */}
      <section id="use-cases" className="py-32 px-6 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-bold mb-3 block">
              CASE STUDIES
            </span>
            <h2 className="text-4xl sm:text-5xl font-light text-white tracking-tight mb-4">
              Proven results inside AI answers.
            </h2>
            <p className="text-base text-text-secondary leading-relaxed font-light">
              See how modern software organizations use Shutter to capture citations and increase model recommendations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Case Study 1 */}
            <div className="p-8 border border-white/[0.05] bg-white/[0.01] rounded-2xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
              <div>
                <span className="text-xs font-bold text-accent tracking-wider uppercase block mb-1">
                  Developer Database SaaS
                </span>
                <h3 className="text-2xl font-light text-white mb-4">Supabase Optimization Case</h3>
                <p className="text-xs text-text-secondary leading-relaxed mb-6 font-light">
                  By standardizing JSON-LD database entities and adding feature comparison tables optimized for RAG parsers, Supabase successfully resolved hallucinated pricing quotes.
                </p>
                <div className="grid grid-cols-3 gap-4 border-t border-white/[0.05] pt-6">
                  <div>
                    <span className="text-2xl font-light text-white">+340%</span>
                    <span className="text-[10px] text-text-secondary block mt-0.5 uppercase font-mono">GPT Citations</span>
                  </div>
                  <div>
                    <span className="text-2xl font-light text-white">88%</span>
                    <span className="text-[10px] text-text-secondary block mt-0.5 uppercase font-mono">Visibility Score</span>
                  </div>
                  <div>
                    <span className="text-2xl font-light text-white">90 Days</span>
                    <span className="text-[10px] text-text-secondary block mt-0.5 uppercase font-mono">Timeframe</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Case Study 2 */}
            <div className="p-8 border border-white/[0.05] bg-white/[0.01] rounded-2xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
              <div>
                <span className="text-xs font-bold text-accent tracking-wider uppercase block mb-1">
                  Issue Tracking Software
                </span>
                <h3 className="text-2xl font-light text-white mb-4">Linear Visibility Case</h3>
                <p className="text-xs text-text-secondary leading-relaxed mb-6 font-light">
                  Targeting competitor keywords and structuring documentation for API parser agents helped Linear secure recommendation slots inside Claude PM tool surveys.
                </p>
                <div className="grid grid-cols-3 gap-4 border-t border-white/[0.05] pt-6">
                  <div>
                    <span className="text-2xl font-light text-white">+182%</span>
                    <span className="text-[10px] text-text-secondary block mt-0.5 uppercase font-mono">Claude Citations</span>
                  </div>
                  <div>
                    <span className="text-2xl font-light text-white">94%</span>
                    <span className="text-[10px] text-text-secondary block mt-0.5 uppercase font-mono">Visibility Score</span>
                  </div>
                  <div>
                    <span className="text-2xl font-light text-white">60 Days</span>
                    <span className="text-[10px] text-text-secondary block mt-0.5 uppercase font-mono">Timeframe</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Offer / Pricing Section (Replaced SaaS pricing cards) */}
      <section id="pricing" className="py-32 px-6 border-t border-white/[0.05] relative bg-white/[0.005]">
        <div className="pointer-events-none absolute -top-80 right-1/3 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px]" />
        
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-24">
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-bold mb-3 block">
              OUTCOMES FUNNEL
            </span>
            <h2 className="text-4xl sm:text-5xl font-light text-white tracking-tight mb-4">
              AI Visibility Integration Flow
            </h2>
            <p className="text-base text-text-secondary leading-relaxed font-light">
              We validate and optimize your brand's presence across target LLM indexes step-by-step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
            {/* Step 1 */}
            <div className="p-6 border border-white/[0.05] bg-brand-bg rounded-2xl flex flex-col justify-between min-h-[320px]">
              <div>
                <span className="text-xs font-bold text-accent/80 tracking-widest uppercase block mb-4 font-mono">
                  Phase 01
                </span>
                <h3 className="text-lg font-semibold text-white mb-2">Free Snapshot</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Get an immediate automated audit of your domain. Scans core models for top 5 key search terms to check index status.
                </p>
              </div>
              <div className="mt-8 border-t border-white/[0.05] pt-4">
                <span className="text-xl font-light text-white block mb-4">Free</span>
                <Link
                  href="/login"
                  className="w-full block py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold text-xs rounded-full text-center transition-all duration-200"
                >
                  Run Snapshot
                </Link>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 border border-white/[0.05] bg-brand-bg rounded-2xl flex flex-col justify-between min-h-[320px]">
              <div>
                <span className="text-xs font-bold text-accent/80 tracking-widest uppercase block mb-4 font-mono">
                  Phase 02
                </span>
                <h3 className="text-lg font-semibold text-white mb-2">Premium Audit</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Deep-dive evaluation of 50+ semantic queries. Includes comparative competitor benchmarking and SWOT summaries.
                </p>
              </div>
              <div className="mt-8 border-t border-white/[0.05] pt-4">
                <span className="text-xl font-light text-white block mb-4">Diagnostic Audit</span>
                <Link
                  href="/login"
                  className="w-full block py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold text-xs rounded-full text-center transition-all duration-200"
                >
                  Request Audit
                </Link>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 border-2 border-accent bg-brand-bg rounded-2xl flex flex-col justify-between min-h-[320px] relative shadow-2xl shadow-accent/5">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-accent bg-[#05070a] border border-accent/30 px-3 py-1 rounded-full uppercase tracking-wider font-mono">
                RECOMMENDED
              </span>
              <div>
                <span className="text-xs font-bold text-accent tracking-widest uppercase block mb-4 font-mono">
                  Phase 03
                </span>
                <h3 className="text-lg font-semibold text-white mb-2">Implementation</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Done-for-you deployment of structured schema markups, robots.txt alignment rules, and targeted documentation content optimization.
                </p>
              </div>
              <div className="mt-8 border-t border-white/[0.05] pt-4">
                <span className="text-xl font-light text-white block mb-4">Direct Setup</span>
                <Link
                  href="/login"
                  className="w-full block py-2.5 bg-accent hover:bg-accent/90 text-white font-semibold text-xs rounded-full text-center transition-all duration-200 shadow-lg shadow-accent/20"
                >
                  Get Setup Details
                </Link>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-6 border border-white/[0.05] bg-brand-bg rounded-2xl flex flex-col justify-between min-h-[320px]">
              <div>
                <span className="text-xs font-bold text-accent/80 tracking-widest uppercase block mb-4 font-mono">
                  Phase 04
                </span>
                <h3 className="text-lg font-semibold text-white mb-2">Ongoing Monitoring</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Continuous citation tracking with real-time alerts if model weights shift or competitor brands steal visibility recommendations.
                </p>
              </div>
              <div className="mt-8 border-t border-white/[0.05] pt-4">
                <span className="text-xl font-light text-white block mb-4">Monitoring</span>
                <Link
                  href="/login"
                  className="w-full block py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold text-xs rounded-full text-center transition-all duration-200"
                >
                  Start Monitoring
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. FAQ Section */}
      <div id="faq">
        <FaqAccordion />
      </div>

      {/* 13. Book Demo Final CTA Section */}
      <section id="book-demo" className="py-32 px-6 border-t border-white/[0.05] bg-white/[0.01] relative text-center">
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-accent/5 blur-[80px]" />
        <div className="max-w-3xl mx-auto space-y-8 z-10 relative">
          <span className="text-xs uppercase tracking-[0.25em] text-accent font-mono font-bold bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
            OWN YOUR AI PRESENCE
          </span>
          <h2 className="text-4xl sm:text-5xl font-light text-white tracking-tight leading-tight">
            Ready to secure your company's recommendations inside AI?
          </h2>
          <p className="text-sm text-text-secondary max-w-lg mx-auto leading-relaxed font-light">
            Book a custom demo with our visibility engineers to map your brand entity associations and citation loops across ChatGPT, Claude, Gemini and Perplexity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
            <Link
              href="/login"
              className="w-48 py-3.5 bg-white text-brand-bg hover:bg-neutral-200 font-semibold rounded-full text-center transition-all duration-200 hover:shadow-lg hover:shadow-white/5 text-sm cursor-pointer"
            >
              Get Free Snapshot
            </Link>
            <Link
              href="/login"
              className="w-48 py-3.5 border border-white/20 text-white hover:bg-white/5 font-semibold rounded-full text-center transition-all duration-200 text-sm cursor-pointer"
            >
              Book 1-on-1 Demo
            </Link>
          </div>
        </div>
      </section>
    </main>

    {/* 14. Mega Footer */}
    <footer id="resources" className="border-t border-white/[0.05] pt-24 pb-12 px-6 md:px-12 lg:px-24 bg-[#05070A] relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-16">
            {/* Left Section: Socials & Address */}
            <div className="col-span-12 md:col-span-5 flex flex-col gap-8">
              {/* Circular Social Buttons */}
              <div className="flex items-center gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-all duration-200"
                  aria-label="Instagram"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-all duration-200"
                  aria-label="X (formerly Twitter)"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-all duration-200"
                  aria-label="YouTube"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96C5.12 19.5 12 19.5 12 19.5s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                </a>
              </div>

              {/* Shutter Address Details */}
              <div className="text-neutral-400 text-sm font-sans space-y-4 font-light leading-relaxed">
                <div>
                  <p>9 Pearse Street, Kinsale</p>
                  <p>Cork, Ireland</p>
                </div>
                <div>
                  <p className="hover:text-white transition-colors duration-200"><a href="mailto:hello@shutter.ai">hello@shutter.ai</a></p>
                  <p>+353 (21) 477-9000</p>
                </div>
              </div>
            </div>

            {/* Right Section: Link Columns */}
            <div className="col-span-12 md:col-span-7 grid grid-cols-3 gap-8">
              {/* Menu Column */}
              <div>
                <h5 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 mb-6 font-mono">Menu</h5>
                <ul className="space-y-4 text-xs font-light text-neutral-400">
                  <li><Link href="#platform" className="hover:text-white transition-colors duration-200">Platform</Link></li>
                  <li><Link href="#use-cases" className="hover:text-white transition-colors duration-200">Use Cases</Link></li>
                  <li><Link href="#pricing" className="hover:text-white transition-colors duration-200">Integration</Link></li>
                  <li><Link href="/dashboard" className="hover:text-white transition-colors duration-200">Audit Console</Link></li>
                </ul>
              </div>

              {/* Resources Column */}
              <div>
                <h5 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 mb-6 font-mono">Resources</h5>
                <ul className="space-y-4 text-xs font-light text-neutral-400">
                  <li><Link href="/blog" className="hover:text-white transition-colors duration-200">Visibility Blog</Link></li>
                  <li><Link href="#faq" className="hover:text-white transition-colors duration-200">RAG Guidelines</Link></li>
                  <li><Link href="/dashboard" className="hover:text-white transition-colors duration-200">API Gateway</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors duration-200">Changelog</Link></li>
                </ul>
              </div>

              {/* Company Column */}
              <div>
                <h5 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 mb-6 font-mono">Company</h5>
                <ul className="space-y-4 text-xs font-light text-neutral-400">
                  <li><Link href="#" className="hover:text-white transition-colors duration-200">About Shutter</Link></li>
                  <li><Link href="/blog" className="hover:text-white transition-colors duration-200">Articles</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors duration-200">Security</Link></li>
                  <li><Link href="#book-demo" className="hover:text-white transition-colors duration-200">Contact</Link></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Middle Dividing Line with Pill Button */}
          <div className="flex items-center justify-between border-t border-white/10 pt-8 pb-12 w-full">
            <div className="flex-grow h-[1px] bg-white/10 mr-6" />
            <Link
              href="/login"
              className="px-6 py-2.5 bg-white text-brand-bg hover:bg-neutral-200 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 whitespace-nowrap select-none shadow-md"
            >
              Get Started
            </Link>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-[11px] font-mono text-neutral-500 font-light">
            <div className="max-w-md leading-relaxed">
              From structural entity mapping to vector authority optimization. Our advanced diagnostic console secures your brand's citation footprint inside AI answers.
            </div>
            <div className="flex gap-8 uppercase tracking-widest whitespace-nowrap">
              <Link href="#" className="hover:text-white transition-colors duration-200">Terms & Conditions</Link>
              <Link href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
            </div>
          </div>
        </div>

        {/* Giant Overlapping Background Text */}
        <span
          className="absolute bottom-[-3rem] left-1/2 -translate-x-1/2 text-white/[0.03] font-black tracking-tighter text-[14vw] uppercase select-none pointer-events-none block whitespace-nowrap leading-none font-sans z-0"
        >
          shutter - shutter
        </span>
      </footer>
    </div>
  );
}
