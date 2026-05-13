import Image from "next/image";
import { GALLERY } from "@/lib/site";

export function Gallery() {
  return (
    <section id="gallery" className="bg-white py-24 sm:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Gallery</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Bonfire moments on 30A and Destin
          </h2>
          <p className="mt-5 text-ink-800/75">
            A look at what your night could look like - sunset chairs, glowing
            fires, and groups making memories.
          </p>
        </div>

        <div className="mt-16 columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 [&>*]:mb-4">
          {GALLERY.map((item, i) => (
            <div
              key={item.src}
              className="relative break-inside-avoid overflow-hidden rounded-2xl bg-[var(--color-sand-200)]"
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={800}
                height={i % 3 === 0 ? 1000 : 800}
                sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="h-auto w-full object-cover transition duration-500 hover:scale-[1.02]"
                loading={i < 4 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
