import Navbar from "@/components/Navbar";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import fs from "fs";
import path from "path";
import { parseFrontmatter, renderMarkdown } from "@/lib/markdown";

export const dynamicParams = false;

const whitelistedSlugs = [
  "what-is-aeo",
  "how-to-optimize-aeo",
  "what-is-geo",
  "how-to-optimize-geo",
  "what-is-ai-seo"
];

const GUIDES_METADATA: Record<string, { title: string; category: string; readingTime: string; date: string; faqs: Array<{ q: string; a: string }> }> = {
  "what-is-aeo": {
    title: "What is AEO (Answer Engine Optimization)?",
    category: "AEO",
    readingTime: "5 min read",
    date: "June 29, 2026",
    faqs: [
      {
        q: "What is AEO (Answer Engine Optimization)?",
        a: "AEO is the practice of optimizing website content so that it is cited and referenced directly by AI assistants and answer engines like ChatGPT, Claude, Gemini, and Perplexity."
      },
      {
        q: "How does AEO differ from SEO?",
        a: "SEO focuses on keyword rankings and listing links in search engines, while AEO optimizes for semantic relevance, factual accuracy, and structured data to be summarized directly by AI."
      }
    ]
  },
  "how-to-optimize-aeo": {
    title: "How to Optimize for Answer Engines",
    category: "AEO",
    readingTime: "6 min read",
    date: "June 29, 2026",
    faqs: [
      {
        q: "How do I optimize my site for ChatGPT and Claude?",
        a: "Frame content around direct questions, deploy structured JSON-LD schemas (such as FAQPage and Product), allow bot indexing in your robots.txt, and write clear, factual answers."
      },
      {
        q: "Why are structured schemas important for AEO?",
        a: "Schemas provide crawler bots with explicit, machine-readable data, reducing vector calculation errors and citation drops."
      }
    ]
  },
  "what-is-geo": {
    title: "What is GEO (Generative Engine Optimization)?",
    category: "GEO",
    readingTime: "5 min read",
    date: "June 29, 2026",
    faqs: [
      {
        q: "What is GEO (Generative Engine Optimization)?",
        a: "GEO is the technical practice of structuring digital content for generative search algorithms, specifically optimizing for RAG (Retrieval-Augmented Generation) pipelines and models like Perplexity."
      },
      {
        q: "What ranking factors does GEO focus on?",
        a: "GEO focuses on factual grounding, semantic density, entity attribute associations, and machine-readable comparison tables."
      }
    ]
  },
  "how-to-optimize-geo": {
    title: "How to Optimize for GEO",
    category: "GEO",
    readingTime: "6 min read",
    date: "June 29, 2026",
    faqs: [
      {
        q: "How do I optimize my website for Perplexity Search?",
        a: "Structure content in concise chunks for RAG parsing, deploy a standard llms.txt map, and provide clear comparative lists and factual statistics."
      },
      {
        q: "What is the llms.txt standard?",
        a: "A root-level text configuration file providing developer agents and LLMs with a clean, raw markdown map of a product's documentation."
      }
    ]
  },
  "what-is-ai-seo": {
    title: "What is AI SEO?",
    category: "AI SEO",
    readingTime: "4 min read",
    date: "June 29, 2026",
    faqs: [
      {
        q: "What is AI SEO?",
        a: "AI SEO is the utilization of machine learning tools to automate keyword clustering, crawl analysis, SWOT brand audits, and content semantic structures."
      },
      {
        q: "How does Shutter assist with AI SEO?",
        a: "Shutter provides real-time citation tracking, semantic gap analysis, and diagnostic SWOT reports across top models."
      }
    ]
  }
};

interface GuideDetailProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return whitelistedSlugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: GuideDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = GUIDES_METADATA[slug];
  if (!guide) {
    return {};
  }

  const ogUrl = `/api/og?title=${encodeURIComponent(guide.title)}&category=${encodeURIComponent(guide.category)}`;

  return {
    title: guide.title,
    description: `Learn all about ${guide.title}. Our comprehensive, FAQ-backed Answer Engine Optimization and AI SEO resource guide.`,
    alternates: {
      canonical: `/${slug}`,
    },
    openGraph: {
      type: "article",
      locale: "en_US",
      url: `https://www.getshutter.online/${slug}`,
      title: guide.title,
      description: `Learn all about ${guide.title}. Our comprehensive Answer Engine Optimization and AI SEO resource guide.`,
      siteName: "Shutter",
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
          alt: guide.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: `Learn all about ${guide.title}. Our comprehensive Answer Engine Optimization and AI SEO resource guide.`,
      images: [ogUrl],
      creator: "@getshutter",
    },
  };
}

export default async function GuideDetailPage({ params }: GuideDetailProps) {
  const { slug } = await params;
  const guide = GUIDES_METADATA[slug];

  if (!guide) {
    notFound();
  }

  // Load guide content from Markdown file
  let fileContent = "";
  try {
    const filePath = path.join(process.cwd(), "content/guides", `${slug}.md`);
    fileContent = fs.readFileSync(filePath, "utf-8");
  } catch (err) {
    notFound();
  }

  const { content } = parseFrontmatter(fileContent);
  const renderedContent = renderMarkdown(content);

  const sidebarGuides = Object.entries(GUIDES_METADATA)
    .filter(([key]) => key !== slug)
    .map(([key, val]) => ({
      slug: key,
      title: val.title,
      category: val.category
    }));

  // JSON-LD FAQPage & Article Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": `https://www.getshutter.online/${slug}/#faq`,
        "mainEntity": guide.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      },
      {
        "@type": "Article",
        "@id": `https://www.getshutter.online/${slug}/#article`,
        "isPartOf": {
          "@id": `https://www.getshutter.online/${slug}/#webpage`
        },
        "headline": guide.title,
        "description": guide.title,
        "datePublished": new Date(guide.date).toISOString(),
        "dateModified": new Date(guide.date).toISOString(),
        "author": {
          "@type": "Organization",
          "name": "Shutter Team",
          "url": "https://www.getshutter.online"
        },
        "publisher": {
          "@id": "https://www.getshutter.online/#organization"
        }
      },
      {
        "@type": "WebPage",
        "@id": `https://www.getshutter.online/${slug}/#webpage`,
        "url": `https://www.getshutter.online/${slug}`,
        "name": guide.title,
        "isPartOf": {
          "@id": "https://www.getshutter.online/#website"
        },
        "breadcrumb": {
          "@id": `https://www.getshutter.online/${slug}/#breadcrumb`
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://www.getshutter.online/${slug}/#breadcrumb`,
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
            "name": guide.category,
            "item": `https://www.getshutter.online/${slug}`
          }
        ]
      }
    ]
  };

  return (
    <div className="relative w-full min-h-screen bg-brand-bg text-white overflow-x-clip font-sans flex flex-col justify-between">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div>
        <Navbar />
        
        {/* Article Header */}
        <header className="pt-40 pb-16 px-6 max-w-4xl mx-auto">
          <div className="space-y-4">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
              {guide.category} GUIDE
            </span>
            <h1 className="text-3xl sm:text-5xl font-light text-white tracking-tight leading-tight mt-4">
              {guide.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-text-secondary font-mono pt-2">
              <span>{guide.date}</span>
              <span>•</span>
              <span>{guide.readingTime}</span>
            </div>
          </div>
        </header>

        {/* Article Body + Sidebar */}
        <main className="pb-32 px-6 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main content */}
          <article className="lg:col-span-8 border border-white/[0.05] bg-white/[0.01] p-8 rounded-2xl">
            <div className="prose prose-invert max-w-none">
              {renderedContent}
            </div>

            {/* Back button */}
            <div className="border-t border-white/[0.05] pt-8 mt-12">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs font-mono text-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
              >
                ← Back to Home
              </Link>
            </div>
          </article>

          {/* Sidebar suggestions */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="p-6 border border-white/[0.05] bg-white/[0.01] rounded-2xl space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-text-secondary font-bold">
                More AI Search Guides
              </h4>
              
              <div className="space-y-4">
                {sidebarGuides.map((sidebarGuide) => (
                  <Link
                    key={sidebarGuide.slug}
                    href={`/${sidebarGuide.slug}`}
                    className="block group focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent rounded-lg p-1"
                  >
                    <span className="text-[9px] text-accent font-mono block mb-1 uppercase font-bold">
                      {sidebarGuide.category}
                    </span>
                    <h5 className="text-sm font-semibold text-white group-hover:text-accent transition-colors leading-snug">
                      {sidebarGuide.title}
                    </h5>
                  </Link>
                ))}
              </div>
            </div>

            <div className="p-6 border border-accent/20 bg-accent/[0.01] rounded-2xl space-y-4">
              <h4 className="text-sm font-semibold text-white">Optimize your AI Presence</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Run a diagnostic check to verify if ChatGPT, Claude, and Gemini recommend your product accurately.
              </p>
              <Link
                href="/login"
                className="w-full block py-2.5 bg-white text-brand-bg hover:bg-neutral-200 font-semibold text-xs rounded-full text-center transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
              >
                Launch Free Snapshot
              </Link>
            </div>
          </aside>

        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] py-8 px-6 text-center text-xs text-neutral-500 font-mono">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>&copy; 2026 Shutter. Own Your AI Presence.</span>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent">Home</Link>
            <Link href="/blog" className="hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent">Visibility Blog</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
