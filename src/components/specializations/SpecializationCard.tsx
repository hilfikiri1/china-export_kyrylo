"use client";

import { ArrowUpRight } from "lucide-react";
import type { Specialization } from "@/content/specializations";
import { useMessages } from "@/i18n/LocaleProvider";
import { cn } from "@/lib/utils";

type SpecializationCardProps = {
  specialization: Specialization;
  onOpenDetails: (id: string) => void;
  className?: string;
  compact?: boolean;
};

export function SpecializationCard({
  specialization,
  onOpenDetails,
  className,
  compact = false,
}: SpecializationCardProps) {
  const messages = useMessages();
  const Icon = specialization.icon;

  return (
    <article
      className={cn(
        "specialization-card group flex cursor-pointer flex-col rounded-xl border border-white/10 bg-navy-light/40 transition-colors duration-300 hover:border-accent-light/30 hover:bg-navy-light/70",
        compact ? "p-5" : "p-6 sm:p-7",
        className,
      )}
      onClick={() => onOpenDetails(specialization.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpenDetails(specialization.id);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`${messages.specializations.ui.viewDetails}: ${specialization.title}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className={cn(
            "flex shrink-0 items-center justify-center rounded-lg border border-accent-light/20 bg-accent-light/10 text-accent-light transition-colors duration-300 group-hover:border-accent-light/40 group-hover:bg-accent-light/15",
            compact ? "h-10 w-10" : "h-11 w-11",
          )}
        >
          <Icon className={compact ? "h-5 w-5" : "h-5 w-5"} aria-hidden />
        </div>
        <ArrowUpRight
          className="h-4 w-4 shrink-0 text-white/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-light"
          aria-hidden
        />
      </div>

      <h3
        className={cn(
          "mt-4 font-semibold leading-snug text-white",
          compact ? "text-base" : "text-lg",
        )}
      >
        {specialization.title}
      </h3>

      <p
        className={cn(
          "mt-2 line-clamp-3 leading-relaxed text-white/60",
          compact ? "text-sm" : "text-sm sm:text-[15px]",
        )}
      >
        {specialization.shortDescription}
      </p>

      <p className="mt-auto pt-4 text-xs font-medium tracking-wide text-accent-light/80 uppercase transition-colors group-hover:text-accent-light">
        {messages.specializations.ui.viewDetails}
      </p>
    </article>
  );
}
