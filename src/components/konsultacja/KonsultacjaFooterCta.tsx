"use client";

import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useVisible } from "@/components/proces/useVisible";

type KonsultacjaFooterCtaProps = {
  label: string;
  href: string;
  hint: string;
};

export function KonsultacjaFooterCta({
  label,
  href,
  hint,
}: KonsultacjaFooterCtaProps) {
  const { ref, visible } = useVisible(0.2);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mt-12 text-center md:mt-14"
    >
      <p className="text-sm text-white/50">{hint}</p>
      <Link
        href={href}
        className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-accent-light/50 hover:text-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      >
        {label}
        <ArrowRight size={15} aria-hidden />
      </Link>
    </motion.div>
  );
}
