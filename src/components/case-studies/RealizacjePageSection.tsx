"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CaseStudyDetailModal } from "@/components/case-studies/CaseStudyDetailModal";
import { CaseStudyFeaturedPage } from "@/components/case-studies/CaseStudyFeaturedPage";
import { CaseStudyGridCard } from "@/components/case-studies/CaseStudyGridCard";
import { useMessages } from "@/i18n/LocaleProvider";
import type { LocalizedCaseStudy } from "@/lib/cases/types";
import { useMotionConfig, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RealizacjePageSectionProps = {
  eyebrow: string;
  title: string;
  lead: string;
  cases: LocalizedCaseStudy[];
};

export function RealizacjePageSection({
  eyebrow,
  title,
  lead,
  cases,
}: RealizacjePageSectionProps) {
  const messages = useMessages();
  const allCases = cases;

  const categories = useMemo(() => {
    const unique = [...new Set(allCases.map((c) => c.category))];
    return ["all", ...unique] as const;
  }, [allCases]);

  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { fadeUp, headerTransition } = useMotionConfig();

  const filtered =
    activeFilter === "all"
      ? allCases
      : allCases.filter((c) => c.category === activeFilter);

  const featured = filtered[0];
  const rest = filtered.slice(1);
  const selectedCase = selectedId
    ? allCases.find((c) => c.id === selectedId) ?? null
    : null;

  function handleOpen(id: string) {
    setSelectedId(id);
    setModalOpen(true);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
      <motion.section
        className="grid items-end gap-8 py-12 md:grid-cols-[1fr_auto] md:gap-12 md:py-16 lg:py-20"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeUp}
        transition={headerTransition}
      >
        <div>
          <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-accent-light uppercase">
            {eyebrow}
          </p>
          <h1 className="text-4xl leading-[0.95] font-bold tracking-tight text-white sm:text-5xl lg:text-7xl">
            {title}
          </h1>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-white/60 md:pb-1">{lead}</p>
      </motion.section>

      {categories.length > 2 && (
        <section className="flex flex-col gap-4 border-y border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div
            className="-mx-1 overflow-x-auto px-1 pb-1"
            role="tablist"
            aria-label={messages.cases.heading}
          >
            <div className="flex w-max min-w-full flex-wrap gap-2">
              {categories.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  role="tab"
                  aria-selected={activeFilter === filter}
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200",
                    activeFilter === filter
                      ? "border-accent-light/40 bg-accent-light/15 text-white"
                      : "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white",
                  )}
                >
                  {filter === "all" ? messages.common.viewAll : filter}
                </button>
              ))}
            </div>
          </div>
          <span className="shrink-0 text-sm text-white/50">
            {filtered.length} {messages.cases.heading.toLowerCase()}
          </span>
        </section>
      )}

      {featured ? (
        <>
          <section className="mt-8 mb-6">
            <CaseStudyFeaturedPage caseStudy={featured} onOpenDetails={handleOpen} />
          </section>

          {rest.length > 0 && (
            <section className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((caseStudy) => (
                <CaseStudyGridCard
                  key={caseStudy.id}
                  caseStudy={caseStudy}
                  onOpenDetails={handleOpen}
                />
              ))}
            </section>
          )}
        </>
      ) : (
        <p className="mt-8 mb-16 text-center text-sm text-white/50">
          {messages.common.error}
        </p>
      )}

      <CaseStudyDetailModal
        caseStudy={selectedCase}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
