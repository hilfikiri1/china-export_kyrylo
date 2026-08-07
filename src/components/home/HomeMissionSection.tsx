"use client";

import { Award, Handshake, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { SectionEdgeFade } from "@/components/backgrounds/SectionEdgeFade";
import { getHomeMission } from "@/content/i18n/home-sections";
import { useMessages } from "@/i18n/LocaleProvider";
import { useMotionConfig, viewportOnce } from "@/lib/motion";

const pillarIcons = [Award, Handshake, ShieldCheck] as const;

export function HomeMissionSection() {
  const messages = useMessages();
  const content = getHomeMission(messages);
  const { fadeUp, headerTransition } = useMotionConfig();

  return (
    <section
      id="misja"
      className="relative overflow-hidden py-20 sm:py-28"
      aria-label={content.ariaLabel}
    >
      <SectionEdgeFade top bottom />

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

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {content.pillars.map((pillar, index) => {
            const Icon = pillarIcons[index] ?? Award;
            return (
              <motion.article
                key={pillar.id}
                className="rounded-2xl border border-white/10 bg-navy-light/60 p-8 text-center"
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={fadeUp}
                transition={{ ...headerTransition, delay: index * 0.08 }}
              >
                <div className="mx-auto mb-5 inline-flex rounded-full border border-accent-light/25 bg-accent-light/10 p-4">
                  <Icon className="h-6 w-6 text-accent-light" aria-hidden />
                </div>
                <h3 className="text-lg font-semibold text-white">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">
                  {pillar.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
