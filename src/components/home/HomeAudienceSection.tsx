"use client";

import { Building2, Factory, Rocket, Store } from "lucide-react";
import { motion } from "framer-motion";
import { SectionEdgeFade } from "@/components/backgrounds/SectionEdgeFade";
import { getHomeAudience } from "@/content/i18n/home-sections";
import { useMessages } from "@/i18n/LocaleProvider";
import { useMotionConfig, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const segmentIcons = [Store, Building2, Rocket, Factory] as const;

export function HomeAudienceSection() {
  const messages = useMessages();
  const content = getHomeAudience(messages);
  const { fadeUp, headerTransition } = useMotionConfig();

  return (
    <section
      id="dla-kogo"
      className="relative overflow-hidden py-20 sm:py-28"
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

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {content.segments.map((segment, index) => {
            const Icon = segmentIcons[index] ?? Store;
            return (
              <motion.article
                key={segment.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={fadeUp}
                transition={{ ...headerTransition, delay: index * 0.06 }}
              >
                <div
                  className={cn(
                    "mb-4 inline-flex rounded-xl border border-accent-light/20 bg-accent-light/10 p-3",
                  )}
                >
                  <Icon className="h-5 w-5 text-accent-light" aria-hidden />
                </div>
                <h3 className="text-lg font-semibold text-white">{segment.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  {segment.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
