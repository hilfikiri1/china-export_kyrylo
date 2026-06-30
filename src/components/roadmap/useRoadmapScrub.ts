"use client";

import { useCallback, useRef, useState } from "react";
import type { RoadmapStage } from "@/content/roadmap.stages";

export function useRoadmapScrub(stages: RoadmapStage[]) {
  const stageCount = stages.length;
  const [progress, setProgressState] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const activeIndex = Math.min(
    stageCount - 1,
    Math.round(progress * (stageCount - 1)),
  );

  const setProgress = useCallback((value: number) => {
    setProgressState(Math.max(0, Math.min(1, value)));
  }, []);

  const goToStage = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(stageCount - 1, index));
      setProgressState(clamped / (stageCount - 1));
    },
    [stageCount],
  );

  const progressFromClientX = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const x = clientX - rect.left;
      setProgress(x / rect.width);
    },
    [setProgress],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      setIsDragging(true);
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      progressFromClientX(e.clientX);
    },
    [progressFromClientX],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      progressFromClientX(e.clientX);
    },
    [isDragging, progressFromClientX],
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    setProgressState((p) => {
      const idx = Math.round(p * (stageCount - 1));
      return idx / (stageCount - 1);
    });
  }, [stageCount]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        goToStage(activeIndex + 1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goToStage(activeIndex - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goToStage(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goToStage(stageCount - 1);
      }
    },
    [activeIndex, goToStage, stageCount],
  );

  return {
    progress,
    activeIndex,
    activeStage: stages[activeIndex],
    isDragging,
    trackRef,
    setProgress,
    goToStage,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleKeyDown,
  };
}
