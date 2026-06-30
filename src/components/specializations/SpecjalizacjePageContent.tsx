"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/pages/PageHero";
import { SpecializationsGrid } from "@/components/specializations/SpecializationsGrid";
import { getSpecializations } from "@/content/i18n/specializations";
import { useMessages } from "@/i18n/LocaleProvider";
import { useMotionConfig, viewportOnce } from "@/lib/motion";

type SpecjalizacjePageContentProps = {
  eyebrow: string;
  title: string;
  lead: string;
  secondaryLead: string;
};

export function SpecjalizacjePageContent({
  eyebrow,
  title,
  lead,
  secondaryLead,
}: SpecjalizacjePageContentProps) {
  const messages = useMessages();
  const specializations = getSpecializations(messages);
  const { fadeUp, headerTransition } = useMotionConfig();

  return (
    <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
      <PageHero eyebrow={eyebrow} title={title} lead={lead} />

      <motion.p
        className="mx-auto -mt-4 mb-12 max-w-2xl px-4 text-center text-sm leading-relaxed text-white/55 sm:text-base"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeUp}
        transition={headerTransition}
      >
        {secondaryLead}
      </motion.p>

      <SpecializationsGrid specializations={specializations} />
    </div>
  );
}
