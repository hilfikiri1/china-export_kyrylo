import Image from "next/image";

const galleryImages = [
  {
    src: "/image/about/gallery-production.jpg",
    alt: "Pracownicy chińskiej fabryki podczas montażu kabli i komponentów elektronicznych",
  },
  {
    src: "/image/about/gallery-factory-visit.jpg",
    alt: "Wizyta biznesowa w chińskim zakładzie produkcyjnym z przedstawicielem B&BS",
  },
  {
    src: "/image/about/gallery-warehouse.jpg",
    alt: "Magazyn i logistyka — palety z towarami gotowymi do eksportu z Chin",
  },
] as const;

export function CantonFairGallery() {
  return (
    <section aria-labelledby="canton-gallery-heading" className="pt-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
          Na miejscu w Chinach
        </p>
        <h2 id="canton-gallery-heading" className="mt-3 text-2xl font-bold text-white sm:text-3xl">
          Targi, fabryki i logistyka w jednym wyjeździe
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-white/55 sm:text-base">
          Canton Fair to punkt startowy. Później jedziemy do producentów, sprawdzamy zakład i
          przygotowujemy kolejne kroki importu.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {galleryImages.map((image) => (
          <div
            key={image.src}
            className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition duration-700 hover:scale-105"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-surface-deep/55 via-transparent to-transparent"
              aria-hidden
            />
          </div>
        ))}
      </div>
    </section>
  );
}
