"use client";

import {
  Building2,
  Eye,
  MapPin,
  ShieldCheck,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useMessages } from "@/i18n/LocaleProvider";

const navButtonClass =
  "static inset-auto left-auto right-auto top-auto my-0 shrink-0 translate-x-0 translate-y-0 size-9 border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white disabled:opacity-30";

type TrustCard = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

export function TrustStrip() {
  const messages = useMessages();

  const trustFactors: TrustCard[] = [
    {
      id: "local-china",
      icon: MapPin,
      title: messages.trust.localChina.title,
      description: messages.trust.localChina.description,
    },
    {
      id: "verification",
      icon: Eye,
      title: messages.trust.verification.title,
      description: messages.trust.verification.description,
    },
    {
      id: "quality",
      icon: ShieldCheck,
      title: messages.trust.quality.title,
      description: messages.trust.quality.description,
    },
    {
      id: "logistics",
      icon: Truck,
      title: messages.trust.logistics.title,
      description: messages.trust.logistics.description,
    },
    {
      id: "flexible",
      icon: Building2,
      title: messages.trust.flexible.title,
      description: messages.trust.flexible.description,
    },
  ];

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
          aria-label={messages.common.previousSlide}
          className={navButtonClass}
        />

        <CarouselContent className="-ml-3 min-w-0 flex-1">
          {trustFactors.map((factor) => {
            const Icon = factor.icon;
            return (
              <CarouselItem
                key={factor.id}
                className="basis-full pl-3 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <div className="p-1">
                  <Card className="h-full border-white/10 bg-white/5 text-white shadow-none ring-white/10 backdrop-blur-sm transition-colors hover:border-accent-light/30 hover:bg-white/10 [--card-spacing:--spacing(4)]">
                    <CardContent className="flex min-h-[148px] flex-col gap-3 p-5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-light/15 text-accent-light">
                        <Icon className="h-5 w-5" aria-hidden />
                      </div>
                      <p className="text-sm font-semibold leading-snug">
                        {factor.title}
                      </p>
                      <p className="text-xs leading-relaxed text-white/60">
                        {factor.description}
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
          aria-label={messages.common.nextSlide}
          className={navButtonClass}
        />
      </div>
    </Carousel>
  );
}
