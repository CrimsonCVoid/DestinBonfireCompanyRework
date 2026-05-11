import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/api/admin"] },
      { userAgent: "GPTBot", allow: "/", disallow: ["/admin", "/api/admin"] },
      { userAgent: "ClaudeBot", allow: "/", disallow: ["/admin", "/api/admin"] },
      { userAgent: "PerplexityBot", allow: "/", disallow: ["/admin", "/api/admin"] },
      { userAgent: "Google-Extended", allow: "/", disallow: ["/admin", "/api/admin"] },
    ],
    sitemap: `${SITE.domain}/sitemap.xml`,
    host: SITE.domain,
  };
}
