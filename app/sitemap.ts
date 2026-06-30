import { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/app/blog/page";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.getshutter.online";

  const staticRoutes = [
    "",
    "/blog",
    "/login",
    "/docs",
    "/docs/getting-started",
    "/docs/ai-readiness",
    "/docs/llms-txt",
    "/docs/schema",
    "/docs/api",
    "/what-is-aeo",
    "/how-to-optimize-aeo",
    "/what-is-geo",
    "/how-to-optimize-geo",
    "/what-is-ai-seo",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(), // Using current date or can be post date
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
