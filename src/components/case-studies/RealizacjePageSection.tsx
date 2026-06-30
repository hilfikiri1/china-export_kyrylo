"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  caseStudyCategories,
  getCaseStudyById,
  getCaseStudiesByCategory,
  type CaseStudyCategoryId,
} from "@/content/case-studies";
import { CaseStudyDetailModal } from "@/components/case-studies/CaseStudyDetailModal";
import { CaseStudyFeaturedPage } from "@/components/case-studies/CaseStudyFeaturedPage";
import { CaseStudyGridCard } from "@/components/case-studies/CaseStudyGridCard";
import { useMotionConfig, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

type FilterId = CaseStudyCategoryId | "all";

const filters: { id: FilterId; label: string }[] = [
  { id: "all", label: "Wszystkie" },
  ...caseStudyCategories.map((c) => ({ id: c.id, label: c.label })),
];

type RealizacjePageSectionProps = {
  eyebrow: string;
  title: string;
  lead: string;
};

function projectCountLabel(count: number): string {
  if (count === 1) return "1 projekt";
  if (count >= 2 && count <= 4) return `${count} projekty`;
  return `${count} projektów`;
}

export function RealizacjePageSection({
  eyebrow,
  title,
  lead,
}: RealizacjePageSectionProps) {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { fadeUp, headerTransition } = useMotionConfig();

  const filtered = getCaseStudiesByCategory(activeFilter);
  const featured = filtered[0];
  const rest = filtered.slice(1);
  const selectedCase = selectedId ? getCaseStudyById(selectedId) : null;

  const activeCategoryHint = useMemo(
    () => caseStudyCategories.find((c) => c.id === activeFilter)?.examples,
    [activeFilter],
  );

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

      <section className="flex flex-col gap-4 border-y border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div
          className="-mx-1 overflow-x-auto px-1 pb-1"
          role="tablist"
          aria-label="Filtruj realizacje według branży"
        >
          <div className="flex w-max min-w-full flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={activeFilter === filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200",
                  activeFilter === filter.id
                    ? "border-accent-light/40 bg-accent-light/15 text-white"
                    : "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white",
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        <span className="shrink-0 text-sm text-white/50">
          {projectCountLabel(filtered.length)}
        </span>
      </section>

      {activeFilter !== "all" && activeCategoryHint && (
        <p className="pt-4 text-sm text-white/50">{activeCategoryHint}</p>
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
          Brak realizacji w tej kategorii.
        </p>
      )}

      <CaseStudyDetailModal
        caseStudy={selectedCase ?? null}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
