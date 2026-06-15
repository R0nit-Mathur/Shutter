import { auth } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import ScrollVideoHero from "@/components/ScrollVideoHero";
import InteractiveDemo from "@/components/InteractiveDemo";
import MetricSection from "@/components/MetricSection";
import Link from "next/link";

export default async function Home() {
  // Fetch NextAuth session on the server
  const session = await auth();

  return (
    <div className="relative w-full min-h-screen bg-brand-bg text-white overflow-x-clip font-sans">
      {/* 1. Global Navigation Bar */}
      <Navbar session={session} />

      {/* 2. Scroll-Driven Observatory Hero Section */}
      <ScrollVideoHero />

      {/* 3. Section 2: Problem Section (SEO vs. AEO vs. GEO) */}
      <section id="solutions" className="py-32 px-6 relative border-t border-white/[0.05]">
        {/* Glow backlight */}
        <div className="pointer-events-none absolute top-40 right-1/4 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px]" />
        
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-24">
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-bold mb-3 block">
              THE PARADIGM SHIFT
            </span>
            <h2 className="text-4xl sm:text-5xl font-light text-white tracking-tight mb-6 leading-tight">
              Search is no longer the only gateway.
            </h2>
            <p className="text-base text-text-secondary leading-relaxed">
              Traditional search index engines crawled directories to match keywords. Today, artificial neural networks analyze structured content, relational links, and statistical authority to formulate syntheses. To be visible, you must optimize for how models perceive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* SEO */}
            <div className="p-8 border border-white/[0.05] bg-white/[0.01] rounded-2xl flex flex-col justify-between min-h-[300px]">
              <div>
                <span className="text-xs font-bold text-white/40 tracking-wider uppercase block mb-1">
                  01 / PAGES
                </span>
                <h3 className="text-2xl font-light text-white mb-4">Traditional SEO</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Optimized for keyword strings, header tags, and index spiders. Focuses on directory structure, loading speed, and static backlink juice. Ranks pages.
                </p>
              </div>
              <span className="text-xs font-semibold text-text-secondary mt-6 border-t border-white/[0.05] pt-4 block">
                Target: Google Crawler Index
              </span>
            </div>

            {/* AEO */}
            <div className="p-8 border border-accent/20 bg-accent/[0.02] rounded-2xl flex flex-col justify-between min-h-[300px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-accent tracking-wider uppercase">
                    02 / CITATIONS
                  </span>
                  <span className="text-[10px] font-bold text-accent border border-accent/30 bg-accent/15 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    CURRENT STANDARD
                  </span>
                </div>
                <h3 className="text-2xl font-light text-white mb-4">Answer Engine Optimization</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Optimized for context relevance and model alignment. Focuses on factual consensus, statistical query mapping, and securing direct citations inside AI summaries. Gets cited by AI.
                </p>
              </div>
              <span className="text-xs font-semibold text-accent mt-6 border-t border-accent/20 pt-4 block">
                Target: ChatGPT, Gemini, Claude, Perplexity
              </span>
            </div>

            {/* GEO */}
            <div className="p-8 border border-white/[0.05] bg-white/[0.01] rounded-2xl flex flex-col justify-between min-h-[300px]">
              <div>
                <span className="text-xs font-bold text-white/40 tracking-wider uppercase block mb-1">
                  03 / WEIGHTS
                </span>
                <h3 className="text-2xl font-light text-white mb-4">Generative Engine Optimization</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Optimized for latent associations and vector proximity. Focuses on aligning your brand entity directly with positive concepts, characteristics, and comparisons inside weights. Shapes AI understanding.
                </p>
              </div>
              <span className="text-xs font-semibold text-text-secondary mt-6 border-t border-white/[0.05] pt-4 block">
                Target: LLM Weights & RAG Corpora
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section 3: Platform Section (Product Showcase) */}
      <section id="platform" className="py-32 px-6 bg-white/[0.01] border-t border-white/[0.05] relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-24">
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-bold mb-3 block">
              CAPABILITIES
            </span>
            <h2 className="text-4xl sm:text-5xl font-light text-white tracking-tight mb-4">
              One platform for AI visibility.
            </h2>
            <p className="text-base text-text-secondary leading-relaxed">
              Shutter provides the structural metrics, vector mapping, and citation optimization necessary to audit and secure your brand's presence in LLMs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Monitor AI Mentions",
                desc: "Real-time alerts and logs whenever target models generate text mentioning your business or products."
              },
              {
                title: "Track Answer Citations",
                desc: "Determine which technical pages, blogs, or docs LLMs cite when summarizing your category."
              },
              {
                title: "Competitive Analysis",
                desc: "Compare visibility indices and share-of-voice directly against major competitor brands."
              },
              {
                title: "Content Opportunity Detection",
                desc: "Identify knowledge gaps inside LLM datasets and suggest structural articles to bridge them."
              },
              {
                title: "Performance Analytics",
                desc: "Programmatic historical graphs tracking your visibility, sentiment, and placement rankings over time."
              },
              {
                title: "Prompt Monitoring",
                desc: "Evaluate brand outcomes against thousands of variations of target buyer search prompts."
              },
              {
                title: "Knowledge Graph Analysis",
                desc: "Audit how models map your brand entities relative to industry attributes and associations."
              },
              {
                title: "Citation Optimization",
                desc: "Actionable recommendations detailing schema markups, citations, and structural updates to get cited more."
              }
            ].map((feature, i) => (
              <div key={i} className="p-6 border border-white/[0.04] bg-brand-bg rounded-xl hover:border-white/10 transition-colors duration-200">
                <h4 className="text-base font-semibold text-white mb-2">{feature.title}</h4>
                <p className="text-xs text-text-secondary leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Section 4: How It Works */}
      <section className="py-32 px-6 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-24">
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-bold mb-3 block">
              EXECUTION PROCESS
            </span>
            <h2 className="text-4xl sm:text-5xl font-light text-white tracking-tight mb-4">
              How Shutter Works
            </h2>
            <p className="text-base text-text-secondary leading-relaxed">
              We compile and optimize your brand footprint through a simple, data-driven cycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Connect your website",
                desc: "Integrate your domain and submit your primary product information. We automatically index your brand's existing entity data and search footprint."
              },
              {
                step: "02",
                title: "Analyze AI visibility",
                desc: "Our API gateway fires asynchronous auditing prompts to OpenAI, Gemini, Claude, and Perplexity, gathering visibility scores, citation logs, and competitor indexes."
              },
              {
                step: "03",
                title: "Improve answer presence",
                desc: "Deploy customized, structured AEO markups, close vector content gaps, and execute the optimizations recommended to secure high-tier LLM placements."
              }
            ].map((item, i) => (
              <div key={i} className="flex flex-col">
                <div className="text-6xl sm:text-7xl font-extralight font-sans tracking-tight text-white/10 mb-6 select-none border-b border-white/[0.05] pb-4">
                  {item.step}
                </div>
                <h4 className="text-lg font-semibold text-white mb-3">{item.title}</h4>
                <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Section 5: Social Proof */}
      <section className="py-20 px-6 border-t border-white/[0.05] bg-white/[0.005]">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-[10px] uppercase tracking-[0.25em] text-text-secondary font-semibold mb-8 block">
            TRUSTED BY TEAMS BUILDING THE FUTURE
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8 opacity-45 grayscale">
            {["Vercel", "Linear", "Supabase", "Stripe", "Retool", "Clerk"].map((brand, i) => (
              <span key={i} className="text-xl font-medium tracking-[0.15em] text-white font-sans">
                {brand.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Section 6: Metrics Section */}
      <MetricSection />

      {/* 8. Section 7: Interactive Demo (Mockup Audit) */}
      <section className="py-32 px-6 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-bold mb-3 block">
              INTERACTIVE DEMO
            </span>
            <h2 className="text-4xl sm:text-5xl font-light text-white tracking-tight mb-4">
              Inspect your visibility footprint.
            </h2>
            <p className="text-base text-text-secondary leading-relaxed">
              Watch how model engines render evaluations and how Shutter traces and audits direct citations.
            </p>
          </div>
          <InteractiveDemo />
        </div>
      </section>

      {/* 9. Section 8: Testimonials & Pricing */}
      <section id="pricing" className="py-32 px-6 border-t border-white/[0.05] relative bg-white/[0.005]">
        {/* Glow backlight */}
        <div className="pointer-events-none absolute -top-80 right-1/3 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px]" />
        
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-24">
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-bold mb-3 block">
              PRICING PLANS
            </span>
            <h2 className="text-4xl sm:text-5xl font-light text-white tracking-tight mb-4">
              Plans built for marketing growth.
            </h2>
            <p className="text-base text-text-secondary leading-relaxed">
              Unlock depth analytics, time-series metrics, competitor notifications, and full AEO auditing maps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Starter */}
            <div className="p-8 border border-white/[0.05] bg-brand-bg rounded-2xl flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Starter</h3>
                <p className="text-xs text-text-secondary mb-6">For single product owners auditing core visibility metrics.</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-light text-white">$149</span>
                  <span className="text-xs text-text-secondary">/ month</span>
                </div>
                
                <ul className="text-xs text-text-secondary space-y-4 border-t border-white/[0.05] pt-6 mb-8">
                  <li className="flex items-center gap-2">✓ Core model scans (OpenAI, Gemini)</li>
                  <li className="flex items-center gap-2">✓ 10 target brand keywords</li>
                  <li className="flex items-center gap-2">✓ Weekly automated updates</li>
                  <li className="flex items-center gap-2">✓ 1 workspace member seat</li>
                </ul>
              </div>
              
              <Link
                href="/login"
                className="w-full py-2.5 border border-white/20 hover:bg-white/5 text-white font-semibold text-xs rounded-full text-center transition-all duration-200"
              >
                Choose Starter
              </Link>
            </div>

            {/* Growth */}
            <div className="p-8 border-2 border-accent bg-brand-bg rounded-2xl flex flex-col justify-between relative shadow-2xl shadow-accent/5">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-accent bg-[#0A0E14] border border-accent px-3 py-1 rounded-full uppercase tracking-wider">
                RECOMMENDED PLAN
              </span>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Growth</h3>
                <p className="text-xs text-text-secondary mb-6">For high-traffic software teams optimizing AEO citation loops.</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-light text-white">$499</span>
                  <span className="text-xs text-text-secondary">/ month</span>
                </div>
                
                <ul className="text-xs text-text-secondary space-y-4 border-t border-white/[0.05] pt-6 mb-8">
                  <li className="flex items-center gap-2">✓ All engines (OpenAI, Claude, Gemini, Perplexity)</li>
                  <li className="flex items-center gap-2">✓ 50 target brand keywords</li>
                  <li className="flex items-center gap-2">✓ Daily automated scans</li>
                  <li className="flex items-center gap-2">✓ Competitor citation drop alerts</li>
                  <li className="flex items-center gap-2">✓ API Access (up to 1,000 queries/mo)</li>
                  <li className="flex items-center gap-2">✓ 5 workspace member seats</li>
                </ul>
              </div>
              
              <Link
                href="/login"
                className="w-full py-2.5 bg-accent hover:bg-accent/90 text-white font-semibold text-xs rounded-full text-center transition-all duration-200"
              >
                Choose Growth
              </Link>
            </div>

            {/* Enterprise */}
            <div className="p-8 border border-white/[0.05] bg-brand-bg rounded-2xl flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Enterprise</h3>
                <p className="text-xs text-text-secondary mb-6">For multi-product companies requiring deep database RAG audits.</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-light text-white">Custom</span>
                </div>
                
                <ul className="text-xs text-text-secondary space-y-4 border-t border-white/[0.05] pt-6 mb-8">
                  <li className="flex items-center gap-2">✓ Continuous database RAG audits</li>
                  <li className="flex items-center gap-2">✓ Unlimited keywords & competitors</li>
                  <li className="flex items-center gap-2">✓ Dedicated model rate limit pools</li>
                  <li className="flex items-center gap-2">✓ Data warehouse synchronization</li>
                  <li className="flex items-center gap-2">✓ 24/7 dedicated support team</li>
                  <li className="flex items-center gap-2">✓ Unlimited member seats</li>
                </ul>
              </div>
              
              <Link
                href="/login"
                className="w-full py-2.5 border border-white/20 hover:bg-white/5 text-white font-semibold text-xs rounded-full text-center transition-all duration-200"
              >
                Contact Enterprise
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Mega Footer */}
      <footer className="border-t border-white/[0.05] pt-24 pb-12 px-6 bg-[#05070A]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-12 mb-16">
            {/* Tagline */}
            <div className="md:col-span-2 flex flex-col justify-between">
              <div>
                <span className="text-xl font-bold tracking-[0.2em] text-white block mb-4">
                  SHUTTER
                </span>
                <p className="text-sm text-text-secondary leading-relaxed max-w-xs mb-8">
                  Become discoverable inside AI-generated answers. Secure your citations.
                </p>
              </div>
              <span className="text-[11px] text-text-secondary font-mono">
                System Status: <span className="text-green-400 font-semibold">● NORMAL OPERATIONAL</span>
              </span>
            </div>

            {/* Links Columns */}
            <div>
              <h5 className="text-xs font-semibold uppercase tracking-widest text-white mb-6">Platform</h5>
              <ul className="space-y-4 text-xs text-text-secondary">
                <li><Link href="#platform" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#solutions" className="hover:text-white transition-colors">Solutions</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">API Keys</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-semibold uppercase tracking-widest text-white mb-6">Pricing</h5>
              <ul className="space-y-4 text-xs text-text-secondary">
                <li><Link href="#pricing" className="hover:text-white transition-colors">Starter</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition-colors">Growth</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition-colors">Enterprise</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-semibold uppercase tracking-widest text-white mb-6">Resources</h5>
              <ul className="space-y-4 text-xs text-text-secondary">
                <li><Link href="#" className="hover:text-white transition-colors">AEO Guide</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">RAG Auditing</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">API Docs</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Changelog</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-semibold uppercase tracking-widest text-white mb-6">Company</h5>
              <ul className="space-y-4 text-xs text-text-secondary">
                <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom section */}
          <div className="border-t border-white/[0.05] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-secondary font-mono">
            <div>
              © {new Date().getFullYear()} Shutter. All rights reserved.
            </div>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-white transition-colors">Security</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
