"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import type { LocalizedCaseStudy } from "@/components/case-studies/CaseStudyFeaturedPage";
import { useMessages } from "@/i18n/LocaleProvider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type CaseStudyDetailModalProps = {
  caseStudy: LocalizedCaseStudy | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function GalleryImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={cn(
          "bg-gradient-to-br from-navy-light to-navy",
          className,
        )}
        aria-hidden
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, 400px"
      className={cn("object-cover", className)}
      onError={() => setError(true)}
    />
  );
}

export function CaseStudyDetailModal({
  caseStudy,
  open,
  onOpenChange,
}: CaseStudyDetailModalProps) {
  const prefersReducedMotion = useReducedMotion();
  const messages = useMessages();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-white/10 bg-navy-light text-white ring-white/10 sm:max-w-2xl">
        {caseStudy && (
          <AnimatePresence mode="wait">
            <motion.div
              key={caseStudy.id}
              initial={{ opacity: 0, ...(prefersReducedMotion ? {} : { y: 8 }) }}
              animate={{ opacity: 1, ...(prefersReducedMotion ? {} : { y: 0 }) }}
              transition={{ duration: prefersReducedMotion ? 0.1 : 0.25 }}
            >
              <DialogHeader className="text-left">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent-light">
                  {caseStudy.category}
                </p>
                <DialogTitle className="text-xl font-bold text-white sm:text-2xl">
                  {caseStudy.title}
                </DialogTitle>
              </DialogHeader>

              <p className="mt-4 text-sm leading-relaxed text-white/70">
                {caseStudy.summary}
              </p>

              {caseStudy.challenge && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-white">
                    {messages.cases.challenge}
                  </h3>
                  <p className="mt-2 text-sm text-white/60">{caseStudy.challenge}</p>
                </div>
              )}

              {caseStudy.requirements && caseStudy.requirements.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-white">
                    {messages.cases.requirements}
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {caseStudy.requirements.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-sm text-white/70"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-accent-light"
                          aria-hidden
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6">
                <h3 className="text-sm font-semibold text-white">
                  {messages.cases.scope}
                </h3>
                <ul className="mt-3 space-y-2">
                  {caseStudy.scope.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-sm text-white/70"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent-light"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {caseStudy.products && caseStudy.products.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-white">
                    {messages.cases.products}
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {caseStudy.products.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-sm text-white/70"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-accent-light"
                          aria-hidden
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
                <h3 className="text-sm font-semibold text-white">
                  {messages.cases.result}
                </h3>
                <p className="mt-2 text-sm text-white/70">{caseStudy.result}</p>
              </div>

              {caseStudy.gallery.length > 0 && (
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {caseStudy.gallery.map((img) => (
                    <div
                      key={img.src}
                      className="relative aspect-[4/3] overflow-hidden rounded-lg"
                    >
                      <GalleryImage src={img.src} alt={img.alt} />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </DialogContent>
    </Dialog>
  );
}
