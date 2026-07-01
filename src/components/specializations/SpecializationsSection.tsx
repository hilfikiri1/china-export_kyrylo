"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { SectionEdgeFade } from "@/components/backgrounds/SectionEdgeFade";
import { SpecializationsGrid } from "@/components/specializations/SpecializationsGrid";
import { getHomeSpecializations } from "@/content/i18n/home-specializations";
import { getSpecializations } from "@/content/i18n/specializations";
import { useTranslation } from "@/i18n/LocaleProvider";
import { useMotionConfig, viewportOnce } from "@/lib/motion";

export function SpecializationsSection() {
  const { locale, messages } = useTranslation();
  const content = getHomeSpecializations(messages, locale);
  const specializations = getSpecializations(messages);
  const { fadeUp, headerTransition } = useMotionConfig();

  return (
    <section
      id="specjalizacje"
      className="section-alt relative overflow-hidden py-20 sm:py-28"
      aria-label={content.ariaLabel}
    >
      <SectionEdgeFade top />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={headerTransition}
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent-light">
            {content.eyebrow}
          </p>
          <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            {content.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
            {content.lead}
          </p>
        </motion.div>

        <div className="mt-12">
          <SpecializationsGrid specializations={specializations} compact />
        </div>

        <motion.p
          className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-white/55 sm:text-base"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={{ ...headerTransition, delay: 0.1 }}
        >
          {content.closing}
        </motion.p>

        <div className="mt-8 flex justify-center">
          <Link
            href={content.ctaHref}
            className="inline-flex items-center gap-2 rounded-lg border border-accent-light/20 bg-accent-light px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-light/25 transition-colors duration-200 hover:bg-[#dbaa47] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
          >
            {content.ctaLabel}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
