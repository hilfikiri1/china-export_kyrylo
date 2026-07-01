"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  getServicePhases,
  getServicesByPhase,
} from "@/content/i18n/services";
import type { ServicePhaseId } from "@/content/services";
import { ServiceCard } from "@/components/services/ServiceCard";
import type { ServiceCardComponentProps } from "@/components/services/ServiceCompactTile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "@/i18n/LocaleProvider";
import { useMotionConfig } from "@/lib/motion";
import { cn } from "@/lib/utils";

const mosaicGridClassName =
  "grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4";

type ServicesPhaseTabsProps = {
  onRequestHelp: (serviceId: string) => void;
  variant?: "landing" | "dedicated";
  layout?: "default" | "mosaic";
  CardComponent?: React.ComponentType<ServiceCardComponentProps>;
  expandedTileId?: string | null;
  onExpandTile?: (id: string | null) => void;
};

export function ServicesPhaseTabs({
  onRequestHelp,
  variant = "landing",
  layout = "default",
  CardComponent = ServiceCard,
  expandedTileId,
  onExpandTile,
}: ServicesPhaseTabsProps) {
  const [activePhase, setActivePhase] = useState<ServicePhaseId>("pre-production");
  const { fadeUp, staggerContainer, itemTransition } = useMotionConfig();
  const { messages, t } = useTranslation();
  const servicePhases = getServicePhases(messages);
  const isDedicated = variant === "dedicated";
  const isMosaic = isDedicated && layout === "mosaic";

  function handlePhaseChange(value: string) {
    setActivePhase(value as ServicePhaseId);
    onExpandTile?.(null);
  }

  return (
    <div className={cn(isDedicated ? "services-phase-tabs-dedicated" : "", isDedicated ? "" : "mt-12")}>
      <Tabs value={activePhase} onValueChange={handlePhaseChange}>
        <div
          className={cn(
            "rounded-2xl px-4 py-4 sm:px-5 sm:py-5",
            isDedicated
              ? "border border-white/10 bg-navy-light/50"
              : "bg-black/25 ring-1 ring-white/5 backdrop-blur-[2px]",
          )}
        >
          <div className="-mx-1 overflow-x-auto px-1 pb-1">
            <TabsList
              aria-label={t("services.section.phasesAriaLabel")}
              className={cn(
                "h-auto w-max min-w-full justify-start gap-1 rounded-xl border border-white/10 p-1 sm:min-w-0 sm:w-full",
                isDedicated ? "bg-navy/50" : "bg-white/5 backdrop-blur-sm",
              )}
            >
              {servicePhases.map((phase) => {
                const Icon = phase.icon;
                return (
                  <TabsTrigger
                    key={phase.id}
                    value={phase.id}
                    className={cn(
                      "h-auto flex-none gap-2 rounded-lg border border-transparent px-4 py-2.5 text-sm font-medium text-white/70 transition-colors",
                      "hover:text-white",
                      "data-active:border-accent-light/40 data-active:bg-accent-light/15 data-active:text-white data-active:shadow-none",
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" aria-hidden />
                    {phase.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          <div className="services-phase-descriptions relative mt-4 min-h-[1.25rem]">
            {servicePhases.map((phase) => (
              <p
                key={phase.id}
                className={cn(
                  "text-sm transition-opacity duration-200",
                  isDedicated ? "text-white/65" : "text-white/80",
                  activePhase === phase.id
                    ? "opacity-100"
                    : "pointer-events-none absolute inset-0 opacity-0",
                )}
              >
                {phase.description}
              </p>
            ))}
          </div>
        </div>

        <div
          className={cn(
            "services-phase-panels mt-6",
            isMosaic &&
              "rounded-3xl border border-white/10 bg-[radial-gradient(ellipse_at_top_left,rgba(219,170,71,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.04),transparent_55%)] bg-navy-light/30 p-4 sm:p-6",
          )}
          onClick={(e) => {
            if (isMosaic && e.target === e.currentTarget) {
              onExpandTile?.(null);
            }
          }}
        >
          {servicePhases.map((phase) => (
            <TabsContent
              key={phase.id}
              value={phase.id}
              forceMount
              className={cn(
                "outline-none transition-opacity duration-200",
                "data-[state=inactive]:z-0 data-[state=active]:z-10",
              )}
            >
              <motion.div
                className={cn(
                  isMosaic
                    ? mosaicGridClassName
                    : cn(phase.gridClassName, phase.panelClassName),
                )}
                variants={staggerContainer}
                initial="hidden"
                animate={activePhase === phase.id ? "visible" : "hidden"}
              >
                {getServicesByPhase(messages, phase.id).map((service) => (
                  <CardComponent
                    key={service.id}
                    service={service}
                    onRequestHelp={onRequestHelp}
                    variants={fadeUp}
                    transition={itemTransition}
                    expandedTileId={expandedTileId}
                    onExpandTile={onExpandTile}
                  />
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
