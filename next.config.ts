import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
  // Old site sitemap had 5 URLs - all already exist on the new site at the
  // same paths (/, /bonfire-packages, /bachelorette-bonfire,
  // /bonfire-permit-process, /refund-policy). The legacy anchor #AREASWESERVE
  // is preserved as a hidden anchor inside the service-areas component.
  // These defensive redirects cover common variations (trailing slashes,
  // legacy slug formats, common typos) so we don't lose any inbound links.
  async redirects() {
    return [
      // Legacy / variant slugs
      { source: "/areas-we-serve", destination: "/#service-areas", permanent: true },
      { source: "/service-areas", destination: "/#service-areas", permanent: true },
      { source: "/locations", destination: "/#locations", permanent: true },
      { source: "/packages", destination: "/bonfire-packages", permanent: true },
      { source: "/bonfire-package", destination: "/bonfire-packages", permanent: true },
      { source: "/permits", destination: "/bonfire-permit-process", permanent: true },
      { source: "/permit", destination: "/bonfire-permit-process", permanent: true },
      { source: "/permit-process", destination: "/bonfire-permit-process", permanent: true },
      { source: "/bachelorette", destination: "/bachelorette-bonfire", permanent: true },
      { source: "/bachelorette-party", destination: "/bachelorette-bonfire", permanent: true },
      { source: "/refund", destination: "/refund-policy", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/faq", destination: "/#faq", permanent: true },
    ];
  },
};

export default config;
