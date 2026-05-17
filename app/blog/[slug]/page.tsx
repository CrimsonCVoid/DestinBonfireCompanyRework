import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactSection } from "@/components/contact-section";
import { BookNowButton } from "@/components/book-now-button";
import { BLOG_POSTS, getBlogPost } from "@/lib/blog";
import { COMMUNITIES, SITE } from "@/lib/site";
import { BEACHES } from "@/lib/beaches";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${SITE.domain}/blog/${post.slug}`,
      images: [`${SITE.domain}${post.heroImage}`],
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function html(s: string) {
  return { __html: s };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  const relatedCommunities = (post.relatedCommunities ?? [])
    .map((s) => COMMUNITIES.find((c) => c.slug === s))
    .filter(Boolean) as (typeof COMMUNITIES)[number][];
  const relatedBeaches = (post.relatedBeaches ?? [])
    .map((s) => BEACHES.find((b) => b.slug === s))
    .filter(Boolean) as (typeof BEACHES)[number][];

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: `${SITE.domain}${post.heroImage}`,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@id": `${SITE.domain}/#business` },
    mainEntityOfPage: `${SITE.domain}/blog/${post.slug}`,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.domain },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.domain}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${SITE.domain}/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <article>
        <section className="relative isolate overflow-hidden">
          <Image
            src={post.heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-900/65 via-ink-900/55 to-ink-900/85" aria-hidden="true" />
          <div className="container-x flex min-h-[60vh] flex-col justify-end py-32 text-white">
            <div className="max-w-3xl">
              <nav aria-label="Breadcrumb" className="mb-6 text-xs uppercase tracking-[0.25em] text-sand-100/80">
                <Link href="/" className="hover:text-[var(--color-ember-400)]">Home</Link>
                <span className="mx-2 opacity-50">/</span>
                <Link href="/blog" className="hover:text-[var(--color-ember-400)]">Blog</Link>
              </nav>
              <p className="eyebrow text-[var(--color-ember-400)]">
                {formatDate(post.date)}
              </p>
              <h1 className="mt-4 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                {post.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base text-sand-100/90 sm:text-lg">
                {post.description}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-28">
          <div className="container-x grid gap-14 lg:grid-cols-[1fr_320px]">
            <div className="prose-content max-w-none">
              {post.intro.map((p, i) => (
                <p
                  key={i}
                  className="mb-5 text-lg leading-[1.75] text-ink-800/90"
                  dangerouslySetInnerHTML={html(p)}
                />
              ))}

              {post.sections.map((s) => (
                <div key={s.heading} className="mt-12">
                  <h2 className="text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
                    {s.heading}
                  </h2>
                  {s.paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className="mt-5 text-[17px] leading-[1.75] text-ink-800/90"
                      dangerouslySetInnerHTML={html(p)}
                    />
                  ))}
                  {s.bullets && (
                    <ul className="mt-5 space-y-2.5 text-[17px] leading-[1.6] text-ink-800/90">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex gap-3">
                          <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-[var(--color-ember-500)]" />
                          <span dangerouslySetInnerHTML={html(b)} />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              <div className="mt-14 rounded-3xl border border-[var(--color-ember-400)]/40 bg-[var(--color-sand-50)] p-8">
                <p className="eyebrow text-[var(--color-ember-700)]">Key Takeaways</p>
                <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-ink-800/90">
                  {post.keyTakeaways.map((t) => (
                    <li key={t} className="flex gap-3">
                      <svg className="mt-1 h-4 w-4 flex-none text-[var(--color-ember-600)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span dangerouslySetInnerHTML={html(t)} />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-12 rounded-3xl bg-ink-900 p-10 text-center text-white">
                <h3
                  className="text-2xl font-semibold tracking-tight sm:text-3xl"
                  dangerouslySetInnerHTML={html(post.ctaTitle ?? "Ready to book?")}
                />
                <p className="mx-auto mt-4 max-w-xl text-sand-100/85">
                  We pull the Walton County permit, set up the seating, light
                  the fire, and stay until the last ember. You just show up.
                </p>
                <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <BookNowButton>Book Your Bonfire</BookNowButton>
                  <a href={SITE.phoneHref} className="text-sm font-semibold text-sand-100 underline-offset-4 hover:underline">
                    Or call {SITE.phone}
                  </a>
                </div>
              </div>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-3xl border border-ink-900/10 bg-[var(--color-sand-50)] p-7">
                <p className="eyebrow">In this guide</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {post.sections.map((s) => (
                    <li key={s.heading}>
                      <a
                        href={`#${s.heading.replace(/\s+/g, "-").toLowerCase()}`}
                        className="text-ink-800/85 hover:text-[var(--color-ember-700)]"
                      >
                        {s.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {relatedCommunities.length > 0 && (
                <div className="mt-6 rounded-3xl border border-ink-900/10 bg-white p-7">
                  <p className="eyebrow">Locations covered</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    {relatedCommunities.map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={`/locations/${c.slug}`}
                          className="text-ink-800/85 hover:text-[var(--color-ember-700)]"
                        >
                          {c.pageTitle} →
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {relatedBeaches.length > 0 && (
                <div className="mt-6 rounded-3xl border border-ink-900/10 bg-white p-7">
                  <p className="eyebrow">Beaches mentioned</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    {relatedBeaches.map((b) => (
                      <li key={b.slug}>
                        <Link
                          href={`/service-areas/${b.slug}`}
                          className="text-ink-800/85 hover:text-[var(--color-ember-700)]"
                        >
                          {b.shortName} →
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </section>

        {related.length > 0 && (
          <section className="bg-[var(--color-sand-100)] py-20 sm:py-28">
            <div className="container-x">
              <div className="mx-auto max-w-3xl text-center">
                <p className="eyebrow">More From The Journal</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Keep reading
                </h2>
              </div>
              <div className="mt-10 grid gap-6 sm:grid-cols-3">
                {related.map((p) => (
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
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--color-ember-600)]">
                        {formatDate(p.date)}
                      </p>
                      <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-ink-900">
                        {p.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <ContactSection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </>
  );
}
