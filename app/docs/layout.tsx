import Navbar from "@/components/Navbar";
import Link from "next/link";
import React from "react";

export const DOC_LINKS = [
  { label: "Getting Started", href: "/docs/getting-started", slug: "getting-started" },
  { label: "AI Readiness & GEO", href: "/docs/ai-readiness", slug: "ai-readiness" },
  { label: "Deploying llms.txt", href: "/docs/llms-txt", slug: "llms-txt" },
  { label: "Structured Schema", href: "/docs/schema", slug: "schema" },
  { label: "Console API Reference", href: "/docs/api", slug: "api" },
];

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full min-h-screen bg-brand-bg text-white overflow-x-clip font-sans flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Documentation Content Framework */}
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Sidebar Navigation */}
          <aside className="lg:col-span-3 border-r border-white/[0.05] pr-8 lg:sticky lg:top-32 h-fit space-y-8">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent font-bold block mb-4">
                Documentation
              </span>
              <nav className="flex flex-col gap-2">
                {DOC_LINKS.map((link) => (
                  <Link
                    key={link.slug}
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-white transition-colors py-2 px-3 hover:bg-white/[0.02] rounded-lg block font-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="p-4 border border-accent/20 bg-accent/[0.02] rounded-2xl text-xs space-y-2">
              <span className="font-semibold text-white block">Need Help?</span>
              <p className="text-text-secondary leading-relaxed font-light">
                Reach out to our visibility support engineers for manual integration details.
              </p>
              <a
                href="mailto:hello@shutter.ai"
                className="text-accent hover:underline font-mono font-medium block pt-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
              >
                hello@shutter.ai
              </a>
            </div>
          </aside>

          {/* Right Core Content Area */}
          <main className="lg:col-span-9 min-h-[500px]">
            {children}
          </main>
        </div>
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
