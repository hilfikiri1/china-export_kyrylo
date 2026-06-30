"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { RoadmapStage } from "@/content/roadmap.stages";
import { useT } from "@/i18n/LocaleProvider";

type RoadmapStagePanelProps = {
  stage: RoadmapStage;
  stageIndex: number;
  totalStages: number;
};

export function RoadmapStagePanel({
  stage,
  stageIndex,
  totalStages,
}: RoadmapStagePanelProps) {
  const t = useT();

  return (
    <div className="relative z-10 min-h-[180px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={stage.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3 }}
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/55">
            {t("home.roadmap.stageCounter", {
              current: stageIndex + 1,
              total: totalStages,
            })}
          </p>
          <h3 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            {stage.title}
          </h3>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            {stage.description}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
