"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ClipboardList, FileText, Search, ShieldCheck, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ProcesStep, ProcesStepIcon } from "@/content/proces-layout";
import { useVisible } from "@/components/proces/useVisible";

const stepIcons: Record<ProcesStepIcon, LucideIcon> = {
  "file-text": FileText,
  search: Search,
  "clipboard-list": ClipboardList,
  "shield-check": ShieldCheck,
  truck: Truck,
};

type ProcesStepRowProps = {
  step: ProcesStep;
  index: number;
  totalSteps: number;
};

export function ProcesStepRow({ step, index, totalSteps }: ProcesStepRowProps) {
  const { ref, visible } = useVisible();
  const [hovered, setHovered] = useState(false);
  const Icon = stepIcons[step.icon] ?? FileText;
  const isLast = index === totalSteps - 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative flex gap-5 md:gap-8"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex w-[52px] shrink-0 flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={visible ? { scale: 1, opacity: 1 } : {}}
          transition={{
            duration: 0.45,
            delay: 0.18,
            type: "spring",
            stiffness: 220,
            damping: 18,
          }}
          className="relative z-10 flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 text-xs font-bold tracking-wider transition-all duration-300"
          style={{
            background: hovered ? step.theme.accent : "var(--surface-deep)",
            borderColor: step.theme.accent,
            color: hovered ? "var(--surface-deep)" : step.theme.accent,
            boxShadow: hovered
              ? `0 0 28px ${step.theme.accent}99, 0 0 56px ${step.theme.accent}44`
              : `0 0 10px ${step.theme.accent}44`,
          }}
        >
          {step.num}
        </motion.div>

        {!isLast && (
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={visible ? { scaleY: 1, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="mt-1.5 min-h-8 flex-1 origin-top rounded-sm"
            style={{
              width: 2,
              background: `linear-gradient(to bottom, ${step.theme.accent}88 0%, transparent 100%)`,
            }}
            aria-hidden
          />
        )}
      </div>

      <div
        className="mb-5 flex-1 overflow-hidden rounded-2xl border transition-all duration-300 md:mb-6"
        style={{
          background: hovered
            ? `linear-gradient(140deg, rgba(20,24,30,0.97) 0%, ${step.theme.glow} 100%)`
            : "rgba(28,33,40,0.55)",
          borderColor: hovered ? step.theme.glowBorder : "rgba(255,255,255,0.07)",
          boxShadow: hovered
            ? `0 8px 48px ${step.theme.glow}, inset 0 1px 0 rgba(255,255,255,0.06)`
            : "inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        <div
          className="h-[3px] transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, ${step.theme.accent} 0%, transparent 100%)`,
            opacity: hovered ? 1 : 0,
          }}
          aria-hidden
        />

        <div className="p-6 md:p-8">
          <div className="mb-5 flex items-start justify-between">
            <div
              className="flex h-[46px] w-[46px] items-center justify-center rounded-xl transition-all duration-300"
              style={{
                background: step.theme.glow,
                border: `1px solid ${step.theme.glowBorder}`,
              }}
            >
              <Icon size={20} style={{ color: step.theme.accent }} aria-hidden />
            </div>
            <span
              className="select-none text-5xl font-bold leading-none transition-colors duration-300 sm:text-6xl md:text-7xl"
              style={{
                color: hovered ? `${step.theme.accent}22` : "rgba(255,255,255,0.05)",
              }}
              aria-hidden
            >
              {step.num}
            </span>
          </div>

          {step.tagline ? (
            <p
              className="mb-2 text-xs font-semibold uppercase tracking-widest"
              style={{ color: step.theme.accent }}
            >
              {step.tagline}
            </p>
          ) : null}

          <h3 className="mb-3 text-xl font-bold leading-tight tracking-tight text-white sm:text-2xl">
            {step.title}
          </h3>

          <p className="mb-6 text-sm leading-relaxed text-white/60 sm:text-base">
            {step.body}
          </p>

          <ul className="space-y-2.5">
            {step.bullets.map((bullet, bulletIndex) => (
              <motion.li
                key={bullet}
                initial={{ opacity: 0, x: -12 }}
                animate={visible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.28 + bulletIndex * 0.1 }}
                className="flex items-start gap-3"
              >
                <span
                  className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: step.theme.glow,
                    border: `1px solid ${step.theme.glowBorder}`,
                  }}
                >
                  <Check
                    size={10}
                    strokeWidth={3}
                    style={{ color: step.theme.accent }}
                    aria-hidden
                  />
                </span>
                <span className="text-sm text-white/75">{bullet}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
