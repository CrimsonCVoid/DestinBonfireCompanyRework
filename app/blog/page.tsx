import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactSection } from "@/components/contact-section";
import { BLOG_POSTS } from "@/lib/blog";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bonfire Blog: Permits, Beach Picks & Local Guides",
  description:
    "Local guides on Destin and 30A beach bonfires - permitted accesses, parking tips, wedding ideas, and family-night plans. Written by people who host bonfires nightly.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Bonfire Blog: Permits, Beach Picks & Local Guides",
    description:
      "Local guides on Destin and 30A beach bonfires from people who host them nightly.",
    url: `${SITE.domain}/blog`,
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndexPage() {
  const sorted = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));
  const [feature, ...rest] = sorted;

  const blogLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE.name} Blog`,
    url: `${SITE.domain}/blog`,
    blogPost: BLOG_POSTS.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      url: `${SITE.domain}/blog/${p.slug}`,
      image: `${SITE.domain}${p.heroImage}`,
      author: { "@type": "Organization", name: p.author },
    })),
  };

  return (
    <>
      <section className="relative bg-[var(--color-sand-50)] pt-40 pb-20 sm:pt-48 sm:pb-28">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Bonfire Journal</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Local guides for your Destin or 30A bonfire night
            </h1>
            <p className="mt-6 text-base leading-relaxed text-ink-800/80 sm:text-lg">
              Written by the people who actually host the bonfires - not a
              content agency in a different state. Permits, beach picks,
              parking tips, wedding ideas, and the small stuff guests usually
              wish they&rsquo;d known before booking.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-x">
          <Link
            href={`/blog/${feature.slug}`}
            className="group grid gap-8 overflow-hidden rounded-3xl bg-[var(--color-sand-50)] shadow-sm ring-1 ring-ink-900/5 transition hover:shadow-xl lg:grid-cols-[1.2fr_1fr]"
          >
            <div className="relative aspect-[4/3] lg:aspect-auto">
              <Image
                src={feature.heroImage}
                alt={feature.title}
                fill
                priority
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-[1.02]"
              />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-14">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-ember-600)]">
                Featured · {formatDate(feature.date)} · {feature.readingTime}
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-4xl">
                {feature.title}
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-ink-800/80 sm:text-base">
                {feature.description}
              </p>
              <p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-ember-600)]">
                Read the guide
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="M13 5l7 7-7 7" />
                </svg>
              </p>
            </div>
          </Link>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {rest.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-ink-900/5 transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={p.heroImage}
                    alt={p.title}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--color-ember-600)]">
                    {formatDate(p.date)} · {p.readingTime}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold leading-snug tracking-tight text-ink-900">
                    {p.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-800/75">
                    {p.hook}
                  </p>
                  <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-ember-600)]">
                    Read more
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="M13 5l7 7-7 7" />
                    </svg>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogLd) }}
      />
    </>
  );
}
