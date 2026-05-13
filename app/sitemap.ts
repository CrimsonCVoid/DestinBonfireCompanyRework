import type { MetadataRoute } from "next";
import { BEACHES } from "@/lib/beaches";
import { COMMUNITIES, SITE } from "@/lib/site";
import { BLOG_POSTS } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const corePages = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/destin", priority: 0.95, changeFrequency: "monthly" as const },
    { url: "/locations", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/bonfire-packages", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/add-ons", priority: 0.75, changeFrequency: "monthly" as const },
    { url: "/bachelorette-bonfire", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/bonfire-permit-process", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
    { url: "/refund-policy", priority: 0.4, changeFrequency: "yearly" as const },
  ];

  const communityPages = COMMUNITIES.map((c) => ({
    url: `/locations/${c.slug}`,
    priority: 0.9,
    changeFrequency: "monthly" as const,
  }));

  const beachPages = BEACHES.map((b) => ({
    url: `/service-areas/${b.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  const blogPages = BLOG_POSTS.map((p) => ({
    url: `/blog/${p.slug}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }));

  return [...corePages, ...communityPages, ...beachPages, ...blogPages].map((p) => ({
    url: `${SITE.domain}${p.url}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
