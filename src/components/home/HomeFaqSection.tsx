"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { SectionEdgeFade } from "@/components/backgrounds/SectionEdgeFade";
import { getHomeFaq } from "@/content/i18n/home-sections";
import { useMessages } from "@/i18n/LocaleProvider";
import { useMotionConfig, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function HomeFaqSection() {
  const messages = useMessages();
  const content = getHomeFaq(messages);
  const [openId, setOpenId] = useState<string | null>(content.items[0]?.id ?? null);
  const { fadeUp, headerTransition } = useMotionConfig();

  return (
    <section
      id="faq"
      className="relative overflow-hidden py-20 sm:py-28"
      aria-label={content.ariaLabel}
    >
      <SectionEdgeFade top />

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={headerTransition}
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent-light">
            {content.eyebrow}
          </p>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">{content.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-white/70">{content.lead}</p>
        </motion.div>

        <div className="mt-10 space-y-3">
          {content.items.map((item, index) => {
            const isOpen = openId === item.id;
            return (
              <motion.div
                key={item.id}
                className="overflow-hidden rounded-xl border border-white/10 bg-white/5"
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={fadeUp}
                transition={{ ...headerTransition, delay: index * 0.04 }}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                >
                  <span className="text-sm font-semibold text-white sm:text-base">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-accent-light transition-transform duration-200",
                      isOpen && "rotate-180",
                    )}
                    aria-hidden
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-white/10 px-5 pb-4 pt-3">
                    <p className="text-sm leading-relaxed text-white/65">{item.answer}</p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
