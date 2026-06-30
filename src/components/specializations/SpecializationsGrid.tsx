"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SpecializationCard } from "@/components/specializations/SpecializationCard";
import { SpecializationDetailModal } from "@/components/specializations/SpecializationDetailModal";
import type { Specialization } from "@/content/specializations";
import { useMotionConfig, viewportOnce } from "@/lib/motion";

type SpecializationsGridProps = {
  specializations: Specialization[];
  compact?: boolean;
};

export function SpecializationsGrid({
  specializations,
  compact = false,
}: SpecializationsGridProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { fadeUp, headerTransition } = useMotionConfig();

  const selected = selectedId
    ? specializations.find((s) => s.id === selectedId) ?? null
    : null;

  function handleOpen(id: string) {
    setSelectedId(id);
    setModalOpen(true);
  }

  return (
    <>
      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeUp}
        transition={headerTransition}
      >
        {specializations.map((specialization, index) => (
          <motion.div
            key={specialization.id}
            variants={fadeUp}
            transition={{ ...headerTransition, delay: index * 0.04 }}
          >
            <SpecializationCard
              specialization={specialization}
              onOpenDetails={handleOpen}
              compact={compact}
              className="h-full"
            />
          </motion.div>
        ))}
      </motion.div>

      <SpecializationDetailModal
        specialization={selected}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
}
