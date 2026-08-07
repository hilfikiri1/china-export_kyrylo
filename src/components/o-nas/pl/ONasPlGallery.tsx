"use client";

import Image from "next/image";
import type { AboutPlContent } from "@/content/i18n/about-page-pl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type ONasPlGalleryProps = {
  gallery: AboutPlContent["gallery"];
};

export function ONasPlGallery({ gallery }: ONasPlGalleryProps) {
  return (
    <section className="bg-white text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <h2 className="mb-8 text-center text-2xl font-bold sm:text-3xl">
          {gallery.title}
        </h2>

        <Carousel
          opts={{ align: "start", loop: true }}
          className="mx-auto w-full max-w-5xl"
        >
          <CarouselContent className="-ml-4">
            {gallery.slides.map((slide) => (
              <CarouselItem
                key={slide.src}
                className="basis-full pl-4 sm:basis-1/2 lg:basis-1/3"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 shadow-md">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="border-slate-300 bg-white text-slate-900 hover:bg-slate-50" />
          <CarouselNext className="border-slate-300 bg-white text-slate-900 hover:bg-slate-50" />
        </Carousel>
      </div>
    </section>
  );
}
