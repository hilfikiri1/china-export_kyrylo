"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { LogisticsBackdrop } from "@/components/backgrounds/LogisticsBackdrop";
import { SectionEdgeFade } from "@/components/backgrounds/SectionEdgeFade";
import { getRealizacjeTeaser } from "@/content/realizacje-teaser";
import { useCurrentLocale } from "@/i18n/LocaleProvider";
import { localizedPath } from "@/i18n/routing";
import { useMotionConfig, viewportOnce } from "@/lib/motion";

export function RealizacjeTeaserSection() {
  const [imageError, setImageError] = useState(false);
  const { fadeUp, headerTransition } = useMotionConfig();
  const locale = useCurrentLocale();
  const content = getRealizacjeTeaser(locale);

  return (
    <section
      id="realizacje"
      className="relative overflow-hidden py-20 sm:py-28"
      aria-labelledby="realizacje-teaser-heading"
    >
      <LogisticsBackdrop variant="caseStudies" />
      <SectionEdgeFade top />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            transition={headerTransition}
          >
            <p className="mb-2 text-xs font-semibold tracking-widest text-accent-light uppercase">
              {content.eyebrow}
            </p>
            <h2
              id="realizacje-teaser-heading"
              className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl"
            >
              {content.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
              {content.lead}
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {content.highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/10 bg-navy-light/50 px-3 py-4 text-center sm:px-4 sm:py-5"
                >
                  <p className="text-xl font-bold text-accent-light sm:text-2xl">
                    {item.value}
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-white/50 sm:text-xs">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <ul className="mt-8 space-y-3">
              {content.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex gap-3 text-sm leading-relaxed text-white/70 sm:text-base"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-light"
                    aria-hidden
                  />
                  {bullet}
                </li>
              ))}
            </ul>

            <Link
              href={localizedPath(locale, content.cta.href)}
              className="mt-10 inline-flex items-center gap-2 rounded-lg border border-accent-light/20 bg-accent-light px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-light/25 transition-colors duration-200 hover:bg-[#dbaa47] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              {content.cta.label}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </motion.div>

          <motion.div
            className="relative min-h-[20rem] overflow-hidden rounded-2xl border border-white/10 sm:min-h-[24rem] lg:min-h-[28rem]"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            transition={{ ...headerTransition, delay: 0.1 }}
          >
            {!imageError ? (
              <Image
                src={content.image}
                alt={content.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div
                className="absolute inset-0 bg-gradient-to-br from-navy-light via-navy to-surface-deep"
                aria-hidden
              />
            )}
            <div
              className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent"
              aria-hidden
            />
            <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8">
              <p className="text-xs font-semibold tracking-widest text-accent-light uppercase">
                Logistyka i realizacja
              </p>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/80">
                Od weryfikacji dostawcy po dostawę do magazynu w UE — pełny
                proces importu w jednym miejscu.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
