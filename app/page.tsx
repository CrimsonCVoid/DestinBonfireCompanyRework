import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { TrustStrip } from "@/components/trust-strip";
import { WelcomeSection } from "@/components/welcome-section";
import { WhyChooseUs } from "@/components/why-choose-us";
import { CommunitiesSection } from "@/components/communities-section";
import { PackagesSection } from "@/components/packages-section";
import { BacheloretteCta } from "@/components/bachelorette-cta";
import { Testimonials } from "@/components/testimonials";
import { FaqAccordion } from "@/components/faq-accordion";
import { ServiceAreas } from "@/components/service-areas";
import { Gallery } from "@/components/gallery";
import { ContactSection } from "@/components/contact-section";
import { FAQ, PACKAGES, SERVICE_AREAS, SITE } from "@/lib/site";

// Title comes from layout metadata.title.default
export const metadata: Metadata = {
  description:
    "Luxury, fully-permitted private beach bonfires near Destin and along 30A. We handle the Walton County permit, premium seating, s'mores, and cleanup — you just show up. Packages from $429.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Beach Bonfire Experience",
    provider: { "@id": `${SITE.domain}/#business` },
    areaServed: SERVICE_AREAS.map((a) => ({ "@type": "Place", name: a.name })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Beach Bonfire Packages",
      itemListElement: PACKAGES.map((p) => ({
        "@type": "Offer",
        name: p.name,
        price: p.price.toString(),
        priceCurrency: "USD",
        description: `${p.tagline}. ${p.groupSize}. ${p.duration}.`,
        availability: "https://schema.org/InStock",
        url: `${SITE.domain}/bonfire-packages#${p.slug}`,
      })),
    },
  };

  return (
    <>
      <Hero />
      <TrustStrip />
      <WelcomeSection />
      <PackagesSection />
      <Testimonials />
      <WhyChooseUs />
      <CommunitiesSection />
      <BacheloretteCta />
      <FaqAccordion />
      <ServiceAreas />
      <Gallery />
      <ContactSection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </>
  );
}
