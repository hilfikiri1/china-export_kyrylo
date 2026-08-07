import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Phone } from "lucide-react";
import type { AboutPlContent } from "@/content/i18n/about-page-pl";

type ONasPlHeroProps = {
  content: AboutPlContent["hero"];
};

export function ONasPlHero({ content }: ONasPlHeroProps) {
  return (
    <section className="bg-white text-slate-900">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {content.titleBefore}
            <span className="text-accent-light">{content.titleHighlight}</span>
            {content.titleAfter}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {content.lead}
          </p>
          <ul className="mt-6 space-y-3">
            {content.bullets.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-slate-700 sm:text-base">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-accent-light"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={content.primaryCta.href}
              className="inline-flex items-center justify-center rounded-lg bg-accent-light px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent-light/25 transition-colors hover:bg-brand-primary-hover"
            >
              {content.primaryCta.label}
            </Link>
            <a
              href={content.phoneCta.href}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 transition-colors hover:border-accent-light hover:text-accent-light"
            >
              <Phone className="h-4 w-4" aria-hidden />
              {content.phoneCta.label}
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100 shadow-xl">
            <Image
              src={content.portraitSrc}
              alt={content.portraitAlt}
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 480px"
              className="object-cover object-top"
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-16 opacity-60"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, #fff 0 8px, transparent 8px 16px), repeating-linear-gradient(0deg, #0f172a 0 8px, transparent 8px 16px)",
                backgroundSize: "16px 16px",
                maskImage: "linear-gradient(to top, black, transparent)",
              }}
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  );
}
