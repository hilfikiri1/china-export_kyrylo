"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, type Transition, type Variants } from "framer-motion";
import { getRoadmapStages } from "@/content/i18n/roadmap";
import type { ServiceModule } from "@/content/services";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslation } from "@/i18n/LocaleProvider";
import { localizedPath } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useMotionConfig } from "@/lib/motion";

export type ServiceCardComponentProps = {
  service: ServiceModule;
  onRequestHelp: (serviceId: string) => void;
  variants?: Variants;
  transition?: Transition;
  expandedTileId?: string | null;
  onExpandTile?: (id: string | null) => void;
};

export function ServiceCompactTile({
  service,
  onRequestHelp,
  variants,
  transition,
  expandedTileId,
  onExpandTile,
}: ServiceCardComponentProps) {
  const { locale } = useLocale();
  const { messages, t } = useTranslation();
  const Icon = service.icon;
  const { prefersReducedMotion } = useMotionConfig();
  const isTouchExpanded = expandedTileId === service.id;

  const roadmapTitle = service.roadmapStageId
    ? getRoadmapStages(messages).find((s) => s.id === service.roadmapStageId)
        ?.title
    : undefined;

  function handleTileClick() {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(min-width: 768px)").matches) return;
    onExpandTile?.(isTouchExpanded ? null : service.id);
  }

  function handleRequestHelpClick(e: React.MouseEvent) {
    e.stopPropagation();
    onRequestHelp(service.id);
  }

  return (
    <motion.div
      variants={variants}
      transition={transition}
      className="group/tile h-full"
    >
      <article
        role="button"
        tabIndex={0}
        onClick={handleTileClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleTileClick();
          }
        }}
        className={cn(
          "relative flex h-full min-h-[8.75rem] flex-col rounded-xl border border-white/10 border-l-2 border-l-accent-light/35 bg-navy-light/80 p-4 text-left transition-all",
          prefersReducedMotion ? "duration-0" : "duration-300",
          "md:hover:z-10 md:hover:min-h-[18rem] md:hover:border-accent-light/40 md:hover:shadow-xl md:hover:shadow-black/30",
          "md:focus-within:z-10 md:focus-within:min-h-[18rem] md:focus-within:border-accent-light/40 md:focus-within:shadow-xl md:focus-within:shadow-black/30",
          isTouchExpanded &&
            "z-10 min-h-[18rem] border-accent-light/40 shadow-xl shadow-black/30",
        )}
      >
        <div className="mb-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-light/15 text-accent-light transition-transform md:group-hover/tile:scale-105">
          <Icon className="h-4 w-4" aria-hidden />
        </div>

        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-white">
          {service.title}
        </h3>

        <p
          className={cn(
            "mt-1.5 text-xs leading-relaxed text-white/50 line-clamp-1",
            "md:group-hover/tile:hidden md:group-focus-within/tile:hidden",
            isTouchExpanded && "hidden",
          )}
        >
          {service.scope}
        </p>

        <div
          className={cn(
            "mt-3 hidden flex-1 flex-col gap-3",
            "md:group-hover/tile:flex md:group-focus-within/tile:flex",
            isTouchExpanded && "flex",
          )}
        >
          {roadmapTitle && (
            <span className="w-fit rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/50">
              {roadmapTitle}
            </span>
          )}

          <p className="text-xs leading-relaxed text-white/60">{service.scope}</p>

          <div className="mt-auto flex flex-col gap-2 pt-1">
            {service.slug && (
              <Link
                href={localizedPath(locale, `uslugi/${service.slug}`)}
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  "inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-white transition-colors",
                  "hover:border-white/25 hover:bg-white/10",
                )}
              >
                {t("common.learnMore")}
                <ArrowRight className="h-3 w-3" aria-hidden />
              </Link>
            )}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full border-accent-light/30 bg-accent-light/10 text-xs text-white hover:border-accent-light/20 hover:bg-accent-light hover:text-white"
              onClick={handleRequestHelpClick}
            >
              {t("common.requestContact")}
            </Button>
          </div>
        </div>
      </article>
    </motion.div>
  );
}
