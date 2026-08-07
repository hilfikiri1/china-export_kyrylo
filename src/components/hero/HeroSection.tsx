"use client";

import { motion } from "framer-motion";
import { CantonFairTicker } from "@/components/canton-fair/CantonFairTicker";
import { HeroBackground } from "@/components/hero/HeroBackground";
import { HeroCTAs } from "@/components/hero/HeroCTAs";
import { HeroFlowOverlay } from "@/components/hero/HeroFlowOverlay";
import { TrustStrip } from "@/components/hero/TrustStrip";
import { useCurrentLocale, useT } from "@/i18n/LocaleProvider";
import { useMotionConfig, viewportOnce } from "@/lib/motion";

export function HeroSection() {
  const t = useT();
  const locale = useCurrentLocale();
  const showCantonTicker = locale === "pl";
  const { fadeUp, headerTransition } = useMotionConfig();

  return (
    <section
      className="relative flex min-h-screen flex-col overflow-hidden"
      aria-label={t("home.hero.ariaLabel")}
    >
      <HeroBackground />

      {showCantonTicker ? (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20">
          <div className="pointer-events-auto">
            <CantonFairTicker />
          </div>
        </div>
      ) : null}

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 sm:px-6 lg:px-8">
        <motion.header
          className="pointer-events-auto shrink-0 pt-14 text-center sm:pt-16 lg:pt-[4.25rem]"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={headerTransition}
        >
          <p className="mb-3 inline-flex items-center rounded-full border border-accent-light/30 bg-accent-light/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-accent-light sm:mb-4">
            {t("home.hero.eyebrow")}
          </p>
          <h1 className="track-text hero-title mx-auto max-w-[18ch] font-bold tracking-tight text-gray-100">
            {t("home.hero.title")}
          </h1>
          <p className="hero-lead mx-auto mt-4 max-w-[42ch] text-gray-300/80 sm:mt-5">
            {t("home.hero.paragraph")}
          </p>
        </motion.header>

        <div className="pointer-events-auto relative flex min-h-[46vh] flex-1 flex-col py-3 sm:min-h-[52vh] sm:py-4 lg:min-h-[56vh]">
          <HeroFlowOverlay className="h-full" />
        </div>

        <motion.footer
          className="pointer-events-auto shrink-0 pb-8 pt-1 text-center sm:pb-10 lg:pb-12"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={headerTransition}
        >
          <HeroCTAs className="items-center" />
          <div className="mt-8 pt-2 sm:mt-10">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
              {t("home.hero.trustHeading")}
            </p>
            <TrustStrip />
          </div>
        </motion.footer>
      </div>
    </section>
  );
}
