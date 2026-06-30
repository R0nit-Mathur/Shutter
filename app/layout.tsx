import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.getshutter.online"),
  title: {
    default: "Shutter — AI Search & Answer Engine Optimization Platform",
    template: "%s | Shutter",
  },
  description: "Improve your visibility across ChatGPT, Claude, Gemini, Perplexity and Google AI Overviews using Shutter.",
  keywords: [
    "Answer Engine Optimization",
    "AEO",
    "Generative Engine Optimization",
    "GEO",
    "AI Search Optimization",
    "AI Visibility",
    "ChatGPT SEO",
    "Claude SEO",
    "Gemini SEO",
    "Perplexity SEO",
    "Google AI Overviews",
    "AI Search Analytics",
    "SaaS SEO",
    "LLM Indexation"
  ],
  authors: [{ name: "Shutter Team", url: "https://www.getshutter.online" }],
  creator: "Shutter",
  publisher: "Shutter",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.getshutter.online",
    title: "Shutter — AI Search & Answer Engine Optimization Platform",
    description: "Improve your visibility across ChatGPT, Claude, Gemini, Perplexity and Google AI Overviews using Shutter.",
    siteName: "Shutter",
    images: [
      {
        url: "/api/og?title=Own+Your+AI+Presence",
        width: 1200,
        height: 630,
        alt: "Shutter — AI Search & Answer Engine Optimization Platform"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Shutter — AI Search & Answer Engine Optimization Platform",
    description: "Improve your visibility across ChatGPT, Claude, Gemini, Perplexity and Google AI Overviews using Shutter.",
    images: ["/api/og?title=Own+Your+AI+Presence"],
    creator: "@getshutter",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Root JSON-LD Structured Data
  const rootJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://www.getshutter.online/#organization",
      "name": "Shutter",
      "url": "https://www.getshutter.online",
      "logo": "https://www.getshutter.online/logo.png",
      "sameAs": [
        "https://x.com/getshutter",
        "https://github.com/getshutter"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+353 (21) 477-9000",
        "contactType": "sales",
        "email": "hello@shutter.ai",
        "areaServed": "US",
        "availableLanguage": "en"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://www.getshutter.online/#website",
      "url": "https://www.getshutter.online",
      "name": "Shutter",
      "description": "AI Search & Answer Engine Optimization Platform",
      "publisher": {
        "@id": "https://www.getshutter.online/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.getshutter.online/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": "https://www.getshutter.online/#software",
      "name": "Shutter Platform",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "All",
      "publisher": {
        "@id": "https://www.getshutter.online/#organization"
      },
      "offers": {
        "@type": "Offer",
        "price": "0.00",
        "priceCurrency": "USD"
      }
    }
  ];

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Inline script to prevent theme flash and set dark mode by default */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const storedTheme = localStorage.getItem('theme');
                if (storedTheme === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body 
        className="min-h-full flex flex-col bg-brand-bg text-text-primary selection:bg-accent/30 selection:text-text-primary transition-colors duration-300 relative"
        suppressHydrationWarning
      >
        <div className="gradient-bg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootJsonLd) }}
        />
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
