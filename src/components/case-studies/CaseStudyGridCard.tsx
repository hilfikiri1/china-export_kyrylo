"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { LocalizedCaseStudy } from "@/components/case-studies/CaseStudyFeaturedPage";
import { useMessages } from "@/i18n/LocaleProvider";
import { cn } from "@/lib/utils";

type CaseStudyGridCardProps = {
  caseStudy: LocalizedCaseStudy;
  onOpenDetails: (id: string) => void;
  className?: string;
};

export function CaseStudyGridCard({
  caseStudy,
  onOpenDetails,
  className,
}: CaseStudyGridCardProps) {
  const [imageError, setImageError] = useState(false);
  const messages = useMessages();

  return (
    <article
      className={cn("group flex cursor-pointer flex-col", className)}
      onClick={() => onOpenDetails(caseStudy.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpenDetails(caseStudy.id);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`${messages.cases.viewCase}: ${caseStudy.title}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-navy">
        {!imageError ? (
          <Image
            src={caseStudy.coverImage}
            alt={caseStudy.gallery[0]?.alt ?? caseStudy.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover opacity-85 transition-all duration-700 group-hover:scale-105 group-hover:opacity-70"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-navy-light to-navy" />
        )}

        <div className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex items-center gap-2 border border-white/50 px-4 py-2 text-sm text-white">
            <span>{messages.cases.viewCase}</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </div>
        </div>

        <div className="absolute top-4 left-4">
          <span className="bg-navy-light/90 px-2 py-1 text-xs font-medium tracking-[0.15em] text-white uppercase">
            {caseStudy.category}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 pt-5 pb-2">
        <h3 className="line-clamp-2 text-lg leading-snug font-semibold text-white">
          {caseStudy.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-white/60">
          {caseStudy.summary}
        </p>
        <p className="mt-auto line-clamp-2 border-t border-white/10 pt-3 text-xs text-white/50">
          {caseStudy.result}
        </p>
      </div>
    </article>
  );
}
