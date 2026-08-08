"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { LocalizedCaseStudy } from "@/lib/cases/types";
import { useMessages } from "@/i18n/LocaleProvider";
import { cn } from "@/lib/utils";

export type { LocalizedCaseStudy } from "@/lib/cases/types";

type CaseStudyFeaturedPageProps = {
  caseStudy: LocalizedCaseStudy;
  onOpenDetails: (id: string) => void;
  className?: string;
};

export function CaseStudyFeaturedPage({
  caseStudy,
  onOpenDetails,
  className,
}: CaseStudyFeaturedPageProps) {
  const [imageError, setImageError] = useState(false);
  const messages = useMessages();

  return (
    <article
      className={cn(
        "group relative min-h-[520px] cursor-pointer overflow-hidden rounded-2xl border border-white/10",
        className,
      )}
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
      <div className="absolute inset-0 bg-navy">
        {!imageError ? (
          <Image
            src={caseStudy.coverImage}
            alt={caseStudy.gallery[0]?.alt ?? caseStudy.title}
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-40"
            priority
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-navy-light via-navy to-black/60" />
        )}
      </div>

      <div className="relative z-10 flex min-h-[520px] flex-col justify-between p-8 md:p-12 lg:p-14">
        <div className="flex items-start justify-between gap-4">
          <span className="border border-white/30 px-3 py-1 text-xs font-medium tracking-[0.2em] text-white/80 uppercase">
            {caseStudy.category}
          </span>
        </div>

        <div>
          <h2 className="mb-6 max-w-3xl text-3xl leading-tight font-semibold text-white sm:text-4xl lg:text-5xl">
            {caseStudy.title}
          </h2>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <p className="max-w-md text-sm leading-relaxed text-white/70">
              {caseStudy.result}
            </p>

            <div className="flex translate-x-4 items-center gap-2 text-sm text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              <span>{messages.cases.viewCase}</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </div>
          </div>

          {caseStudy.scope.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {caseStudy.scope.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
