"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MapPin, CheckCircle2 } from "lucide-react";
import type { CaseStudy } from "@/content/case-studies";
import { getCategoryById } from "@/content/case-studies";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type CaseStudyDetailModalProps = {
  caseStudy: CaseStudy | null;
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
  const category = caseStudy ? getCategoryById(caseStudy.categoryId) : null;

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
                {category && (
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent-light">
                    {category.label}
                  </p>
                )}
                <DialogTitle className="text-xl font-bold text-white sm:text-2xl">
                  {caseStudy.title}
                </DialogTitle>
                {caseStudy.destinationCountry && (
                  <p className="flex items-center gap-1.5 text-sm text-white/60">
                    <MapPin className="h-4 w-4 text-accent-light" aria-hidden />
                    Kraj dostawy: {caseStudy.destinationCountry}
                  </p>
                )}
              </DialogHeader>

              <div className="mt-6 space-y-6">
                <section>
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-white/50">
                    Wyzwanie klienta
                  </h3>
                  <p className="text-sm leading-relaxed text-white/80">
                    {caseStudy.challenge}
                  </p>
                  <p className="mt-2 text-xs text-white/40">
                    Szczegóły poufne — bez danych identyfikujących klienta.
                  </p>
                </section>

                <section>
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-white/50">
                    Nasz zakres prac
                  </h3>
                  <ul className="space-y-2">
                    {caseStudy.scope.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-white/80"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-accent-light"
                          aria-hidden
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-white/50">
                    Rezultat
                  </h3>
                  <p className="text-sm leading-relaxed text-white/80">
                    {caseStudy.outcome}
                  </p>
                </section>

                <section>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/50">
                    Galeria
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {caseStudy.gallery.map((image) => (
                      <div
                        key={image.src}
                        className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10"
                      >
                        <GalleryImage src={image.src} alt={image.alt} />
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </DialogContent>
    </Dialog>
  );
}
