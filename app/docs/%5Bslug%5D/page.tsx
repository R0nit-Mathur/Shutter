import { notFound } from "next/navigation";
import { Metadata } from "next";
import fs from "fs";
import path from "path";
import { parseFrontmatter, renderMarkdown } from "@/lib/markdown";
import { DOC_LINKS } from "../layout";

interface DocDetailProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return DOC_LINKS.map((link) => ({
    slug: link.slug,
  }));
}

export async function generateMetadata({ params }: DocDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = DOC_LINKS.find((d) => d.slug === slug);
  if (!doc) {
    return {};
  }

  return {
    title: `${doc.label} — Shutter Docs`,
    description: `Learn how to configure ${doc.label} on the Shutter AI Visibility and Answer Engine Optimization platform.`,
    alternates: {
      canonical: `/docs/${doc.slug}`,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `https://www.getshutter.online/docs/${doc.slug}`,
      title: `${doc.label} — Shutter Docs`,
      description: `Learn how to configure ${doc.label} on the Shutter AI Visibility platform.`,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(doc.label)}&category=Documentation`,
          width: 1200,
          height: 630,
          alt: doc.label,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${doc.label} — Shutter Docs`,
      description: `Learn how to configure ${doc.label} on the Shutter AI Visibility platform.`,
      images: [`/api/og?title=${encodeURIComponent(doc.label)}&category=Documentation`],
    },
  };
}

export default async function DocDetailPage({ params }: DocDetailProps) {
  const { slug } = await params;
  const doc = DOC_LINKS.find((d) => d.slug === slug);

  if (!doc) {
    notFound();
  }

  // Load documentation content from Markdown file
  let fileContent = "";
  try {
    const filePath = path.join(process.cwd(), "content/docs", `${slug}.md`);
    fileContent = fs.readFileSync(filePath, "utf-8");
  } catch (err) {
    notFound();
  }

  const { frontmatter, content } = parseFrontmatter(fileContent);
  const renderedContent = renderMarkdown(content);

  // Dynamic Breadcrumb Schema
  const docBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `https://www.getshutter.online/docs/${doc.slug}/#breadcrumb`,
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
        "name": "Docs",
        "item": "https://www.getshutter.online/docs/getting-started"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": doc.label,
        "item": `https://www.getshutter.online/docs/${doc.slug}`
      }
    ]
  };

  return (
    <article className="border border-white/[0.05] bg-white/[0.01] p-8 rounded-2xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(docBreadcrumb) }}
      />
      <header className="border-b border-white/[0.05] pb-6 mb-8">
        <h1 className="text-3xl sm:text-4xl font-light text-white tracking-tight leading-tight mb-2">
          {frontmatter.title}
        </h1>
        {frontmatter.summary && (
          <p className="text-sm text-text-secondary leading-relaxed font-light">
            {frontmatter.summary}
          </p>
        )}
      </header>

      <div className="prose prose-invert max-w-none">
        {renderedContent}
      </div>
    </article>
  );
}
