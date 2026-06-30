import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Metadata } from "next";

export interface BlogPost {
  title: string;
  summary: string;
  slug: string;
  date: string;
  readingTime: string;
  category: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    title: "AI Visibility: The New Frontier of Digital Presence",
    summary: "For two decades, marketing teams fought for the top search results on Google. Today, artificial neural networks formulate synthesized answers, making semantic alignment and citation indexation the new standard.",
    slug: "ai-visibility-new-frontier",
    date: "June 25, 2026",
    readingTime: "5 min read",
    category: "AI Visibility"
  },
  {
    title: "How to Rank inside ChatGPT: Secrets of Model Optimization",
    summary: "An inside look at how OpenAI's GPT-4o search and crawler bots parse web documentation. Learn the structured formatting guidelines necessary to secure direct backlink recommendations.",
    slug: "how-to-rank-inside-chatgpt",
    date: "June 18, 2026",
    readingTime: "7 min read",
    category: "ChatGPT"
  },
  {
    title: "Securing Citations in Claude 3.5 Sonnet and Gemini Answers",
    summary: "Many sites unknowingly block AI index crawlers (like ClaudeBot and Google-Extended) inside their robots.txt files. Here is the copy-paste configuration to enable correct indexing and citation mapping.",
    slug: "securing-citations-claude-gemini",
    date: "June 12, 2026",
    readingTime: "6 min read",
    category: "Claude"
  },
  {
    title: "Understanding Knowledge Graphs and Entity SEO",
    summary: "Large language models rely heavily on latent semantic weights. Discover how to map your brand relative to industry-specific keywords, attributes, and comparisons inside AI knowledge structures.",
    slug: "understanding-knowledge-graphs-entity-seo",
    date: "June 05, 2026",
    readingTime: "8 min read",
    category: "Schema"
  },
  {
    title: "What is AEO (Answer Engine Optimization)?",
    summary: "Understand the core concepts of AEO, how it differs from traditional SEO, and how you can prepare your business for the era of conversational answer engines.",
    slug: "what-is-answer-engine-optimization",
    date: "June 02, 2026",
    readingTime: "4 min read",
    category: "AEO"
  },
  {
    title: "Inside the Perplexity Search Index: How RAG Drives Citations",
    summary: "Perplexity AI has changed real-time answer engines using RAG. Discover how their index crawler parses webpages and what metrics decide which site gets cited in answers.",
    slug: "inside-perplexity-search-indexes",
    date: "May 28, 2026",
    readingTime: "6 min read",
    category: "Perplexity"
  },
  {
    title: "Google AI Overviews and the Future of Web Search",
    summary: "Google AI Overviews (formerly SGE) push traditional search results below the fold. Learn how to optimize your content structure to appear inside Google's AI-generated summaries.",
    slug: "google-ai-overviews-future",
    date: "May 20, 2026",
    readingTime: "5 min read",
    category: "Google AI"
  },
  {
    title: "JSON-LD Schema Masterclass: Structuring Data for AI Bots",
    summary: "Structured data is the language of LLMs. Learn how to design rich Organization, Product, and FAQ schemas to give models clear, unambiguous data about your brand.",
    slug: "json-ld-schema-masterclass",
    date: "May 15, 2026",
    readingTime: "8 min read",
    category: "SEO"
  },
  {
    title: "Creating a Comprehensive llms.txt File for Your Product",
    summary: "The llms.txt standard provides an easy way for developer agents to read your site documentation. Learn how to configure and serve a structured markdown map.",
    slug: "creating-llms-txt-standard",
    date: "May 08, 2026",
    readingTime: "5 min read",
    category: "LLMs"
  },
  {
    title: "Optimizing Your Codebase Documentation for RAG Models",
    summary: "Retrieval-Augmented Generation relies on document chunking and vector indexing. Learn how to design your codebase docs so RAG parsers retrieve accurate data.",
    slug: "optimizing-for-rag-models",
    date: "May 01, 2026",
    readingTime: "6 min read",
    category: "AI Search"
  }
];

export const metadata: Metadata = {
  title: "Shutter Intelligence — The AI Visibility Blog",
  description: "Technical insights, strategies, and code configurations to help your brand own its presence inside LLM recommendations across ChatGPT, Claude, Gemini and Perplexity.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Shutter Intelligence — The AI Visibility Blog",
    description: "Technical insights, strategies, and code configurations to help your brand own its presence inside LLM recommendations.",
    url: "https://www.getshutter.online/blog",
    images: [
      {
        url: "/api/og?title=Shutter+Intelligence+Blog&category=Blog",
        width: 1200,
        height: 630,
        alt: "Shutter Intelligence — The AI Visibility Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shutter Intelligence — The AI Visibility Blog",
    description: "Technical insights, strategies, and code configurations to help your brand own its presence inside LLM recommendations.",
    images: ["/api/og?title=Shutter+Intelligence+Blog&category=Blog"],
  },
};

export default async function BlogPage() {
  const blogBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://www.getshutter.online/blog/#breadcrumb",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.getshutter.online"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://www.getshutter.online/blog"
      }
    ]
  };

  return (
    <div className="relative w-full min-h-screen bg-brand-bg text-white overflow-x-clip font-sans flex flex-col justify-between">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogBreadcrumb) }}
      />
      <div>
        <Navbar />
        
        {/* Blog Header */}
        <header className="pt-36 pb-20 px-6 border-b border-white/[0.05] relative">
          <div className="pointer-events-none absolute top-24 left-1/3 h-[300px] w-[300px] rounded-full bg-accent/5 blur-[80px]" />
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-mono font-bold bg-accent/10 border border-accent/20 px-3.5 py-1 rounded-full">
              SHUTTER INTELLIGENCE
            </span>
            <h1 className="text-4xl sm:text-5xl font-light text-white tracking-tight leading-tight">
              The AI Visibility Blog
            </h1>
            <p className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed font-light">
              Technical insights, strategies, and code configurations to help your brand own its presence inside LLM recommendations.
            </p>
          </div>
        </header>

        {/* Blog Listing Grid */}
        <main className="py-24 px-6 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BLOG_POSTS.map((post) => (
              <article key={post.slug}>
                <Link 
                  href={`/blog/${post.slug}`}
                  className="p-8 border border-white/[0.05] bg-white/[0.01] hover:border-white/10 rounded-2xl flex flex-col justify-between hover:bg-white/[0.015] hover:scale-[1.01] transition-all duration-200 min-h-[280px] group block h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded">
                        {post.category}
                      </span>
                      <span className="text-[10px] text-text-secondary font-mono">
                        {post.date}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-light text-white mb-3 group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed font-light mb-6">
                      {post.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/[0.05] pt-4 mt-6 text-[10px] font-mono text-text-secondary uppercase">
                    <span>{post.readingTime}</span>
                    <span className="text-accent group-hover:translate-x-1 transition-transform">Read Article →</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </main>
      </div>

      {/* Mini Footer */}
      <footer className="border-t border-white/[0.05] py-8 px-6 text-center text-xs text-neutral-500 font-mono">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>&copy; 2026 Shutter. Own Your AI Presence.</span>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent">Home</Link>
            <Link href="/dashboard" className="hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent">Audit Console</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
