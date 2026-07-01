"use client";

import { SectionEdgeFade } from "@/components/backgrounds/SectionEdgeFade";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { KonsultacjaAgenda } from "@/components/konsultacja/KonsultacjaAgenda";
import { KonsultacjaFooterCta } from "@/components/konsultacja/KonsultacjaFooterCta";
import { KonsultacjaHero } from "@/components/konsultacja/KonsultacjaHero";
import { getKonsultacjaLayout } from "@/content/i18n/konsultacja-layout";
import { useTranslation } from "@/i18n/LocaleProvider";

export function KonsultacjaPageContent() {
  const { messages, locale } = useTranslation();
  const { hero, agenda, footerCta } = getKonsultacjaLayout(messages, locale);

  return (
    <div className="konsultacja-page relative overflow-hidden pb-16 sm:pb-20">
      <SectionEdgeFade top />

      <div
        className="konsultacja-page-grid pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute top-0 left-1/2 z-0 h-[500px] w-[900px] max-w-full -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(219,170,71,0.09) 0%, transparent 65%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-2xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <KonsultacjaHero {...hero} stats={[...hero.stats]} />
        <KonsultacjaAgenda {...agenda} steps={[...agenda.steps]} />
        <ConsultationForm />
        <KonsultacjaFooterCta {...footerCta} />
      </div>
    </div>
  );
}
