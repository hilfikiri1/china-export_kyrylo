"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import type { Specialization } from "@/content/specializations";
import { useMessages } from "@/i18n/LocaleProvider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type SpecializationDetailModalProps = {
  specialization: Specialization | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SpecializationDetailModal({
  specialization,
  open,
  onOpenChange,
}: SpecializationDetailModalProps) {
  const prefersReducedMotion = useReducedMotion();
  const messages = useMessages();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-white/10 bg-navy-light text-white ring-white/10 sm:max-w-2xl">
        {specialization && (
          <AnimatePresence mode="wait">
            <motion.div
              key={specialization.id}
              initial={{ opacity: 0, ...(prefersReducedMotion ? {} : { y: 8 }) }}
              animate={{ opacity: 1, ...(prefersReducedMotion ? {} : { y: 0 }) }}
              transition={{ duration: prefersReducedMotion ? 0.1 : 0.25 }}
            >
              <DialogHeader className="text-left">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg border border-accent-light/20 bg-accent-light/10 text-accent-light">
                  <specialization.icon className="h-5 w-5" aria-hidden />
                </div>
                <DialogTitle className="text-xl font-bold text-white sm:text-2xl">
                  {specialization.title}
                </DialogTitle>
              </DialogHeader>

              <p className="mt-4 text-sm leading-relaxed text-white/70">
                {specialization.extendedDescription}
              </p>

              <div className="mt-6">
                <h3 className="text-sm font-semibold text-white">
                  {messages.specializations.ui.productsHeading}
                </h3>
                <ul className="mt-3 space-y-2">
                  {specialization.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-white/70">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent-light"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {specialization.examples && (
                <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
                  <h3 className="text-sm font-semibold text-white">
                    {messages.specializations.ui.examplesHeading}
                  </h3>
                  <p className="mt-2 text-sm text-white/70">
                    {specialization.examples}
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </DialogContent>
    </Dialog>
  );
}
