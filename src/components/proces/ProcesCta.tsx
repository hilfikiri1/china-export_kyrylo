"use client";

import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useVisible } from "@/components/proces/useVisible";

type ProcesCtaProps = {
  eyebrow: string;
  title: string;
  body: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export function ProcesCta({
  eyebrow,
  title,
  body,
  primary,
  secondary,
}: ProcesCtaProps) {
  const { ref, visible } = useVisible(0.2);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65 }}
      className="mt-14 text-center md:mt-16"
    >
      <div className="relative overflow-hidden rounded-2xl border border-accent-light/20 bg-navy-light/70 p-8 shadow-[0_0_64px_rgba(219,170,71,0.07)] md:p-10">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(219,170,71,0.08)_0%,transparent_60%)]"
          aria-hidden
        />

        <div className="relative z-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent-light">
            {eyebrow}
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {title}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/55 sm:text-base">
            {body}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={primary.href}
              className="inline-flex items-center gap-2 rounded-lg border border-accent-light/20 bg-accent-light px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent-light/25 transition-all hover:bg-[#dbaa47] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              {primary.label}
              <ArrowRight size={15} aria-hidden />
            </Link>
            {secondary && (
              <Link
                href={secondary.href}
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-accent-light/50 hover:text-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
