"use client";

import { motion } from "framer-motion";
import { SectionEdgeFade } from "@/components/backgrounds/SectionEdgeFade";
import { industryCategories } from "@/content/industries";
import { useMotionConfig, viewportOnce } from "@/lib/motion";
import { useT } from "@/i18n/LocaleProvider";

export function IndustriesSection() {
  const t = useT();
  const { fadeUp, headerTransition } = useMotionConfig();

  return (
    <section
      className="relative overflow-hidden py-20 sm:py-28"
      aria-labelledby="industries-heading"
    >
      <SectionEdgeFade top bottom />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={headerTransition}
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent-light">
            {t("nav.uslugiAll")}
          </p>
          <h2
            id="industries-heading"
            className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl"
          >
            {t("sections.industriesHeading")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">
            {t("sections.industriesLead")}
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industryCategories.map((category) => {
            const Icon = category.icon;
            return (
              <article
                key={category.id}
                className="flex flex-col rounded-2xl border border-white/10 bg-navy-light/50 p-6 transition-colors hover:border-accent-light/30"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-accent-light/15 text-accent-light">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="text-base font-semibold leading-snug text-white">
                  {category.title}
                </h3>
                <ul className="mt-3 space-y-1.5">
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-sm leading-relaxed text-white/60"
                    >
                      <span
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-light/70"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-white/55">
          {t("sections.industriesClosing")}
        </p>
      </div>
    </section>
  );
}
