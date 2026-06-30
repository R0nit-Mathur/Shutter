import Navbar from "@/components/Navbar";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "../page";
import { Metadata } from "next";
import fs from "fs";
import path from "path";
import { parseFrontmatter, renderMarkdown } from "@/lib/markdown";

interface BlogDetailProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) {
    return {};
  }

  const ogUrl = `/api/og?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category)}`;

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      locale: "en_US",
      url: `https://www.getshutter.online/blog/${post.slug}`,
      title: post.title,
      description: post.summary,
      siteName: "Shutter",
      publishedTime: new Date(post.date).toISOString(),
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [ogUrl],
      creator: "@getshutter",
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Load article content from Markdown file
  let fileContent = "";
  try {
    const filePath = path.join(process.cwd(), "content/blog", `${slug}.md`);
    fileContent = fs.readFileSync(filePath, "utf-8");
  } catch (err) {
    notFound();
  }

  const { content } = parseFrontmatter(fileContent);
  const renderedContent = renderMarkdown(content);

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  // Dynamic Schemas: Article and Breadcrumb
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `https://www.getshutter.online/blog/${post.slug}/#article`,
        "isPartOf": {
          "@id": `https://www.getshutter.online/blog/${post.slug}/#webpage`
        },
        "headline": post.title,
        "description": post.summary,
        "datePublished": new Date(post.date).toISOString(),
        "dateModified": new Date(post.date).toISOString(),
        "mainEntityOfPage": `https://www.getshutter.online/blog/${post.slug}`,
        "author": {
          "@type": "Organization",
          "name": "Shutter Team",
          "url": "https://www.getshutter.online"
        },
        "publisher": {
          "@id": "https://www.getshutter.online/#organization"
        },
        "image": `https://www.getshutter.online/api/og?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category)}`
      },
      {
        "@type": "WebPage",
        "@id": `https://www.getshutter.online/blog/${post.slug}/#webpage`,
        "url": `https://www.getshutter.online/blog/${post.slug}`,
        "name": post.title,
        "description": post.summary,
        "isPartOf": {
          "@id": "https://www.getshutter.online/#website"
        },
        "breadcrumb": {
          "@id": `https://www.getshutter.online/blog/${post.slug}/#breadcrumb`
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://www.getshutter.online/blog/${post.slug}/#breadcrumb`,
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
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": post.title,
            "item": `https://www.getshutter.online/blog/${post.slug}`
          }
        ]
      }
    ]
  };

  return (
    <div className="relative w-full min-h-screen bg-brand-bg text-white overflow-x-clip font-sans flex flex-col justify-between">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div>
        <Navbar />
        
        {/* Article Header */}
        <header className="pt-40 pb-16 px-6 max-w-4xl mx-auto">
          <div className="space-y-4">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-5xl font-light text-white tracking-tight leading-tight mt-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-text-secondary font-mono pt-2">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readingTime}</span>
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
                href="/blog"
                className="inline-flex items-center gap-2 text-xs font-mono text-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
              >
                ← Back to Blog List
              </Link>
            </div>
          </article>

          {/* Sidebar suggestions */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="p-6 border border-white/[0.05] bg-white/[0.01] rounded-2xl space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-text-secondary font-bold">
                More from Shutter
              </h4>
              
              <div className="space-y-4">
                {otherPosts.map((otherPost) => (
                  <Link
                    key={otherPost.slug}
                    href={`/blog/${otherPost.slug}`}
                    className="block group focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent rounded-lg p-1"
                  >
                    <span className="text-[9px] text-accent font-mono block mb-1 uppercase font-bold">
                      {otherPost.category}
                    </span>
                    <h5 className="text-sm font-semibold text-white group-hover:text-accent transition-colors leading-snug">
                      {otherPost.title}
                    </h5>
                    <p className="text-[10px] text-text-secondary mt-1 line-clamp-2">
                      {otherPost.summary}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="p-6 border border-accent/20 bg-accent/[0.01] rounded-2xl space-y-4">
              <h4 className="text-sm font-semibold text-white">Audit your AI Visibility</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Run a diagnostic check to verify if ChatGPT, Claude, and Gemini cite your documentation accurately.
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
            <Link href="/dashboard" className="hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent">Audit Console</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
