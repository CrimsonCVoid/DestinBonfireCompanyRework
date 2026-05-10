import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Fraunces, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SITE } from "@/lib/site";
import "./globals.css";

// VDX Marketing — Google Tag Manager container.
// Per VDX brief: every page must include the head snippet + body noscript fallback.
// All Google Ads / GA4 / Meta Pixel tags are deployed by VDX inside this container —
// do NOT add gtag.js, GA4, or Meta Pixel directly anywhere in this codebase.
// Contact: ross@vdxmarketing.com
const GTM_ID = "GTM-KRQ9ZJQ7";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#e07a3a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: `Luxury Beach Bonfires Near Destin | ${SITE.name}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "luxury beach bonfire Destin",
    "Destin beach bonfire",
    "30A beach bonfire",
    "beach bonfire rental Destin",
    "Miramar Beach bonfire",
    "Santa Rosa Beach bonfire",
    "Seaside bonfire",
    "Rosemary Beach bonfire",
    "bachelorette bonfire 30A",
    "South Walton bonfire",
    "bonfire permits Walton County",
    "private beach bonfire Florida",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.domain,
    siteName: SITE.name,
    title: `Luxury Beach Bonfires Near Destin | ${SITE.name}`,
    description: SITE.description,
    images: [
      {
        url: "/images/BigCircleBonfireSetupNight.jpg",
        width: 1200,
        height: 630,
        alt: "Private beach bonfire experience on 30A near Destin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Luxury Beach Bonfires Near Destin | ${SITE.name}`,
    description: SITE.description,
    images: ["/images/BigCircleBonfireSetupNight.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "6RupO49g5VNWvISKcJWY6uePfql9uumLN5zw021zPRs",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/favicon.png", type: "image/png" },
    ],
    apple: "/images/favicon.png",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE.domain}/#business`,
  name: SITE.name,
  description: SITE.description,
  url: SITE.domain,
  telephone: SITE.phone,
  email: SITE.email,
  image: [
    `${SITE.domain}/images/12ChairSetupSunset.jpeg`,
    `${SITE.domain}/images/BigCircleBonfireSetupNight.jpg`,
    `${SITE.domain}/images/18ChairSunsetSetup.jpg`,
  ],
  logo: `${SITE.domain}/images/destin-bonfire-company-logo.png`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postal,
    addressCountry: SITE.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: SITE.address.lat,
    longitude: SITE.address.lng,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...SITE.hours.days],
      opens: SITE.hours.opens,
      closes: SITE.hours.closes,
    },
  ],
  sameAs: [SITE.social.facebook, SITE.social.instagram],
  areaServed: [
    "Destin, FL",
    "30A",
    "Santa Rosa Beach, FL",
    "Miramar Beach, FL",
    "Seaside, FL",
    "Rosemary Beach, FL",
    "Inlet Beach, FL",
    "Grayton Beach, FL",
    "Blue Mountain Beach, FL",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        {/* Google Tag Manager — VDX Marketing (head snippet, as high as possible). */}
        <Script
          id="gtm-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) — must be immediately after opening <body>. */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:shadow-lg"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        {/*
          FareHarbor Lightframe — intercepts anchors with data-fh-customer-id
          and data-fh-flow matching the shortname, opens them in a modal.
        */}
        <Script
          src="https://fareharbor.com/embeds/api/v1/?autolightframe=yes"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
