"use client";

import { useState } from "react";
import { motion, type Transition, type Variants } from "framer-motion";
import { getRoadmapStages } from "@/content/i18n/roadmap";
import type { ServiceModule } from "@/content/services";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n/LocaleProvider";
import { cn } from "@/lib/utils";
import { useMotionConfig } from "@/lib/motion";

type ServiceCardProps = {
  service: ServiceModule;
  onRequestHelp: (serviceId: string) => void;
  variants?: Variants;
  transition?: Transition;
};

export function ServiceCard({
  service,
  onRequestHelp,
  variants,
  transition,
}: ServiceCardProps) {
  const { messages, t } = useTranslation();
  const Icon = service.icon;
  const [isHovered, setIsHovered] = useState(false);
  const { prefersReducedMotion, hoverTransition } = useMotionConfig();

  const roadmapTitle = service.roadmapStageId
    ? getRoadmapStages(messages).find((s) => s.id === service.roadmapStageId)
        ?.title
    : undefined;

  return (
    <motion.div
      variants={variants}
      transition={transition}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={
        prefersReducedMotion
          ? undefined
          : { y: -4, transition: hoverTransition }
      }
      className="group h-full focus-within:outline-none"
    >
      <Card
        className={cn(
          "flex h-full flex-col border-white/10 bg-white/5 text-white shadow-none ring-white/10 backdrop-blur-sm transition-[border-color,box-shadow] duration-300 [--card-spacing:--spacing(5)]",
          "group-hover:border-accent-light/40 group-hover:shadow-lg group-hover:shadow-black/20",
          "group-focus-within:border-accent-light/40 group-focus-within:shadow-lg group-focus-within:shadow-black/20",
        )}
      >
        <CardContent className="flex flex-1 flex-col gap-4 p-6">
          {roadmapTitle && (
            <span className="w-fit rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white/50">
              {t("services.section.relatedStagePrefix")}: {roadmapTitle}
            </span>
          )}

          <motion.div
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-light/15 text-accent-light"
            animate={
              prefersReducedMotion || !isHovered
                ? { scale: 1 }
                : { scale: 1.08 }
            }
            transition={hoverTransition}
          >
            <Icon className="h-5 w-5" aria-hidden />
          </motion.div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold leading-snug">
              {service.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              {service.scope}
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            className={cn(
              "w-full border-accent-light/30 bg-accent-light/10 text-white transition-colors duration-300",
              "group-hover:border-accent-light/20 group-hover:bg-accent-light group-hover:text-white group-hover:shadow-md group-hover:shadow-accent-light/20",
              "group-focus-within:border-accent-light/20 group-focus-within:bg-accent-light group-focus-within:text-white",
            )}
            onClick={() => onRequestHelp(service.id)}
          >
            <span className="hidden sm:inline">
              {t("services.section.helpCtaLong")}
            </span>
            <span className="sm:hidden">{t("common.helpAtThisStage")}</span>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
