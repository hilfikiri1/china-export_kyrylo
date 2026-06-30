"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionEdgeFade } from "@/components/backgrounds/SectionEdgeFade";
import { AboutGridPanel } from "@/components/about/AboutGridPanel";
import { aboutGridHero, aboutGridRow, aboutGridSectionCta } from "@/content/about-grid";
import { useLocale, useT } from "@/i18n/LocaleProvider";
import { localeHref } from "@/i18n/routing";

export function AboutGridSection() {
  const [qualityControl, businessTrips] = aboutGridRow;
  const locale = useLocale();
  const t = useT();

  return (
    <section
      id="o-nas"
      className="relative overflow-hidden py-20 sm:py-28"
      aria-label={t("sections.aboutHeading")}
    >
      <SectionEdgeFade top />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 border border-white/10 md:grid-cols-2">
          <AboutGridPanel
            panel={aboutGridHero}
            variant="hero"
            className="border-b border-white/10 md:col-span-2"
          />
          <AboutGridPanel
            panel={qualityControl}
            className="border-b border-white/10 md:border-b-0 md:border-r"
          />
          <AboutGridPanel panel={businessTrips} />
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href={localeHref(locale, aboutGridSectionCta.href)}
            className="inline-flex items-center gap-2 rounded-lg border border-accent-light/20 bg-accent-light px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-light/25 transition-colors duration-200 hover:bg-[#dbaa47] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
          >
            {t(aboutGridSectionCta.labelKey)}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
