"use client";

import { MapPin, ShieldCheck, Eye, Truck, Layers, type LucideIcon } from "lucide-react";
import { useT } from "@/i18n/LocaleProvider";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const navButtonClass =
  "static inset-auto left-auto right-auto top-auto my-0 shrink-0 translate-x-0 translate-y-0 size-9 border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white disabled:opacity-30";

const trustIcons: Record<string, LucideIcon> = {
  "local-operations": MapPin,
  verification: ShieldCheck,
  quality: Eye,
  logistics: Truck,
  flexible: Layers,
};

type TrustCard = { id: string; title: string; description: string };

export function TrustStrip() {
  const t = useT();
  const cards = (t.raw("trust.cards") as TrustCard[] | undefined) ?? [];
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <CarouselPrevious
          variant="outline"
          aria-label={t("common.prevSlide")}
          className={navButtonClass}
        />

        <CarouselContent className="-ml-3 min-w-0 flex-1">
          {cards.map((card) => {
            const Icon = trustIcons[card.id] ?? ShieldCheck;
            return (
              <CarouselItem
                key={card.id}
                className="basis-full pl-3 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <div className="p-1">
                  <Card className="h-full border-white/10 bg-white/5 text-white shadow-none ring-white/10 backdrop-blur-sm transition-colors hover:border-accent-light/30 hover:bg-white/10 [--card-spacing:--spacing(4)]">
                    <CardContent className="flex min-h-[148px] flex-col gap-3 p-5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-light/15 text-accent-light">
                        <Icon className="h-5 w-5" aria-hidden />
                      </div>
                      <p className="text-sm font-semibold leading-snug">
                        {card.title}
                      </p>
                      <p className="text-xs leading-relaxed text-white/60">
                        {card.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselNext
          variant="outline"
          aria-label={t("common.nextSlide")}
          className={navButtonClass}
        />
      </div>
    </Carousel>
  );
}
