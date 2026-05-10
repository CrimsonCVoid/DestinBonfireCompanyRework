import Image from "next/image";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  image = "/images/Wideshot12ChairsBeach.jpeg",
  video,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image?: string;
  /** Optional looping background video. Image is used as poster. */
  video?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      {video ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={image}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          aria-hidden="true"
        >
          <source src={video} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
          aria-hidden="true"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-900/55 via-ink-900/45 to-ink-900/75" aria-hidden="true" />
      <div className="container-x flex min-h-[60vh] flex-col items-center justify-center py-32 text-center text-white">
        <p className="eyebrow text-[var(--color-ember-400)]">{eyebrow}</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-2xl text-balance text-base text-sand-100/90 sm:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
