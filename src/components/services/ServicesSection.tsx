"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionEdgeFade } from "@/components/backgrounds/SectionEdgeFade";
import { ServiceLeadModal } from "@/components/services/ServiceLeadModal";
import { ServicesBackground } from "@/components/services/ServicesBackground";
import { ServicesPhaseTabs } from "@/components/services/ServicesPhaseTabs";
import { useMessages } from "@/i18n/LocaleProvider";
import { useMotionConfig, viewportOnce } from "@/lib/motion";

export function ServicesSection({ embedded = false }: { embedded?: boolean }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const { fadeUp, headerTransition } = useMotionConfig();
  const messages = useMessages();

  function handleRequestHelp(serviceId: string) {
    setSelectedServiceId(serviceId);
    setModalOpen(true);
  }

  return (
    <section
      id={embedded ? undefined : "uslugi"}
      className={embedded ? "relative overflow-hidden py-8 sm:py-12" : "relative overflow-hidden py-20 sm:py-28"}
      aria-labelledby={embedded ? undefined : "services-heading"}
    >
      {!embedded && <SectionEdgeFade top bottom />}

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="services-media-card relative overflow-hidden rounded-3xl border border-white/10">
          <ServicesBackground />

          <div
            className="services-grid-bg pointer-events-none absolute inset-0 z-[1]"
            aria-hidden
          />

          <div className="relative z-10 p-8 sm:p-12 lg:p-16">
            {!embedded && (
              <motion.div
                className="max-w-3xl"
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={fadeUp}
                transition={headerTransition}
              >
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent-light">
                  {messages.common.modularServices}
                </p>
                <h2
                  id="services-heading"
                  className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl"
                >
                  {messages.services.heading}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
                  {messages.services.supporting}
                </p>
              </motion.div>
            )}

            <ServicesPhaseTabs onRequestHelp={handleRequestHelp} />
          </div>
        </div>
      </div>

      <ServiceLeadModal
        serviceId={selectedServiceId}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </section>
  );
}
