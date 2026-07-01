import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ONasHeroProps = {
  eyebrow: string;
  title: string;
  lead: string;
  image: string;
  imageAlt: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export function ONasHero({
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
  primaryCta,
  secondaryCta,
}: ONasHeroProps) {
  return (
    <section className="dark-surface page-hero-banner relative flex min-h-[calc(100vh-4rem)] flex-col justify-end overflow-hidden bg-surface-deep">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="page-hero-scrim absolute inset-0 bg-gradient-to-t from-surface-deep via-surface-deep/60 to-transparent" />
        <div className="page-hero-scrim absolute inset-0 bg-gradient-to-r from-surface-deep/80 to-transparent" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden
      />

      <div className="absolute top-0 left-0 right-0 h-[3px] bg-accent-light" aria-hidden />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-24 sm:px-6 sm:pb-20 lg:px-8 lg:pb-28">
        <div className="max-w-4xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-10 bg-accent-light" aria-hidden />
            <span className="text-xs font-semibold uppercase tracking-widest text-accent-light">
              {eyebrow}
            </span>
          </div>

          <h1 className="text-4xl font-bold leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            {title}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
            {lead}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href={primaryCta.href}
              className="gold-cta hero-cta-primary inline-flex items-center justify-center gap-3 bg-accent-light px-6 py-3.5 text-sm font-semibold tracking-wide text-white shadow-lg shadow-accent-light/25 transition-colors hover:bg-[#dbaa47] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light focus-visible:ring-offset-2 focus-visible:ring-offset-surface-deep"
            >
              {primaryCta.label}
              <ArrowRight size={16} aria-hidden />
            </Link>
            <Link
              href={secondaryCta.href}
              className="muted-cta-on-dark inline-flex items-center justify-center gap-3 border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors hover:border-accent-light/50 hover:text-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light focus-visible:ring-offset-2 focus-visible:ring-offset-surface-deep"
            >
              {secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
