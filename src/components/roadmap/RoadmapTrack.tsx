"use client";

import { Container, GripHorizontal } from "lucide-react";
import type { RoadmapStage } from "@/content/roadmap.stages";
import { useT } from "@/i18n/LocaleProvider";
import { cn } from "@/lib/utils";

type RoadmapTrackProps = {
  stages: RoadmapStage[];
  progress: number;
  activeIndex: number;
  isDragging: boolean;
  trackRef: React.RefObject<HTMLDivElement | null>;
  onPointerDown: (e: React.PointerEvent) => void;
  onPointerMove: (e: React.PointerEvent) => void;
  onPointerUp: () => void;
  onStageClick: (index: number) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
};

export function RoadmapTrack({
  stages,
  progress,
  activeIndex,
  isDragging,
  trackRef,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onStageClick,
  onKeyDown,
}: RoadmapTrackProps) {
  const t = useT();
  const handlePosition = `${progress * 100}%`;

  return (
    <div className="relative z-10 mt-12">
      <p className="track-text mb-6 flex items-center gap-2 text-sm font-medium text-white/90">
        <GripHorizontal className="h-4 w-4 shrink-0 text-white/80" />
        {t("home.roadmap.dragHint")}
      </p>

      <div
        ref={trackRef}
        role="slider"
        aria-label={t("home.roadmap.trackAriaLabel")}
        aria-valuemin={0}
        aria-valuemax={stages.length - 1}
        aria-valuenow={activeIndex}
        aria-valuetext={stages[activeIndex].title}
        tabIndex={0}
        className="relative cursor-grab touch-none select-none pt-14 pb-16 active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
      >
        <div className="relative h-10">
          <div className="absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-white/20">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-accent-light transition-[width] duration-75"
              style={{ width: handlePosition }}
            />
          </div>

          {stages.map((stage, i) => {
            const position = `${(i / (stages.length - 1)) * 100}%`;
            const isActive = i === activeIndex;
            const isPast = i < activeIndex;

            return (
              <button
                key={stage.id}
                type="button"
                aria-label={t("home.roadmap.stageAriaLabel", {
                  n: i + 1,
                  title: stage.title,
                })}
                aria-current={isActive ? "step" : undefined}
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                style={{ left: position }}
                onClick={(e) => {
                  e.stopPropagation();
                  onStageClick(i);
                }}
                onPointerDown={(e) => e.stopPropagation()}
              >
                <div
                  className={cn(
                    "flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all duration-200",
                    isActive
                      ? "scale-150 border-accent-light bg-accent-light shadow-lg shadow-black/40"
                      : isPast
                        ? "border-accent-light/70 bg-accent-light/70"
                        : "border-white/50 bg-navy-light/80",
                  )}
                />
              </button>
            );
          })}

          <div
            className={cn(
              "pointer-events-none absolute top-1/2 -translate-x-1/2 -translate-y-[calc(100%+0.875rem)] transition-transform duration-75",
              isDragging && "scale-110",
            )}
            style={{ left: handlePosition }}
            aria-hidden
          >
            <div className="flex h-12 w-16 items-center justify-center rounded-md border-2 border-accent-light bg-black/40 shadow-lg shadow-black/40 backdrop-blur-sm">
              <Container className="h-6 w-6 text-accent-light" />
            </div>
          </div>
        </div>

        <div className="relative mt-5 h-10 sm:h-12">
          {stages.map((stage, i) => {
            const position = `${(i / (stages.length - 1)) * 100}%`;
            const isActive = i === activeIndex;

            return (
              <span
                key={stage.id}
                className={cn(
                  "track-text absolute hidden w-max max-w-[88px] -translate-x-1/2 text-center text-[10px] leading-tight sm:block lg:max-w-[110px] lg:text-xs",
                  isActive
                    ? "font-semibold text-white"
                    : "font-medium text-white/80",
                )}
                style={{ left: position }}
              >
                {stage.title}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
