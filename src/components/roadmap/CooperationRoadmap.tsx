"use client";

import { LogisticsBackdrop } from "@/components/backgrounds/LogisticsBackdrop";
import { SectionEdgeFade } from "@/components/backgrounds/SectionEdgeFade";
import { roadmapStages } from "@/content/roadmap.stages";
import { RoadmapBackground } from "@/components/roadmap/RoadmapBackground";
import { RoadmapStagePanel } from "@/components/roadmap/RoadmapStagePanel";
import { RoadmapTrack } from "@/components/roadmap/RoadmapTrack";
import { useRoadmapScrub } from "@/components/roadmap/useRoadmapScrub";
import { getHomeContent } from "@/content/home";
import type { Locale } from "@/i18n/config";

export function CooperationRoadmap({
  embedded = false,
  locale = "pl",
}: {
  embedded?: boolean;
  locale?: Locale;
}) {
  const {
    progress,
    activeIndex,
    activeStage,
    isDragging,
    trackRef,
    goToStage,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleKeyDown,
  } = useRoadmapScrub();
  const content = getHomeContent(locale);

  return (
    <section
      id={embedded ? undefined : "roadmap"}
      className={embedded ? "relative overflow-hidden py-8 sm:py-12" : "relative overflow-hidden py-20 sm:py-28"}
      aria-labelledby={embedded ? undefined : "roadmap-heading"}
    >
      {!embedded && <LogisticsBackdrop variant="roadmap" />}
      {!embedded && <SectionEdgeFade top />}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10">
          <RoadmapBackground stage={activeStage} />

          <div className="relative p-8 sm:p-12 lg:p-16">
            {!embedded && (
              <>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent-light">
                  {content.processEyebrow}
                </p>
                <h2
                  id="roadmap-heading"
                  className="text-2xl font-bold text-white sm:text-3xl"
                >
                  {content.processTitle}
                </h2>
                <p className="mt-2 max-w-lg text-sm text-white/70">
                  {content.processLead}
                </p>
              </>
            )}

            <div className={embedded ? "mt-0" : "mt-8 lg:mt-10"}>
              <RoadmapStagePanel
                stage={activeStage}
                stageIndex={activeIndex}
                totalStages={roadmapStages.length}
              />
            </div>

            <RoadmapTrack
              progress={progress}
              activeIndex={activeIndex}
              isDragging={isDragging}
              trackRef={trackRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onStageClick={goToStage}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
