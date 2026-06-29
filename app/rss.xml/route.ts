import { NextResponse } from "next/server";
import { BLOG_POSTS } from "@/app/blog/page";

export async function GET() {
  const baseUrl = "https://www.getshutter.online";
  
  const feedItems = BLOG_POSTS.map((post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid>${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.summary)}</description>
      <category>${escapeXml(post.category)}</category>
    </item>
  `).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Shutter AI Visibility Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Technical insights, strategies, and configurations for AI Search &amp; Answer Engine Optimization.</description>
    <language>en-us</language>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${feedItems}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=600",
    },
  });
}

function escapeXml(unsafe: string) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
}
