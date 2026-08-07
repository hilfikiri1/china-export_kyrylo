"use client";

import Link from "next/link";
import { ArrowRight, Ship } from "lucide-react";
import { motion } from "framer-motion";
import { LogisticsBackdrop } from "@/components/backgrounds/LogisticsBackdrop";
import { SectionEdgeFade } from "@/components/backgrounds/SectionEdgeFade";
import { getHomeUrgencyCta } from "@/content/i18n/home-sections";
import { useTranslation } from "@/i18n/LocaleProvider";
import { useMotionConfig, viewportOnce } from "@/lib/motion";
import { Button } from "@/components/ui/button";

export function HomeUrgencyCtaSection() {
  const { locale, messages } = useTranslation();
  const content = getHomeUrgencyCta(messages, locale);
  const { fadeUp, headerTransition } = useMotionConfig();

  return (
    <section
      className="relative overflow-hidden py-20 sm:py-28"
      aria-label={content.ariaLabel}
    >
      <LogisticsBackdrop variant="footer" />
      <SectionEdgeFade top />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div
            className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            transition={headerTransition}
          >
            <div className="mb-4 inline-flex rounded-xl border border-accent-light/20 bg-accent-light/10 p-3">
              <Ship className="h-5 w-5 text-accent-light" aria-hidden />
            </div>
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              {content.portsTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
              {content.portsBody}
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col justify-center rounded-2xl border border-accent-light/20 bg-accent-light/5 p-8"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            transition={{ ...headerTransition, delay: 0.08 }}
          >
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              {content.urgencyTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
              {content.urgencyBody}
            </p>
            <Button
              asChild
              className="mt-6 w-fit bg-accent-light text-navy hover:bg-accent-light/90"
            >
              <Link href={content.ctaHref}>
                {content.ctaLabel}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
