"use client";

import { SectionEdgeFade } from "@/components/backgrounds/SectionEdgeFade";
import { ProcesCta } from "@/components/proces/ProcesCta";
import { ProcesHero } from "@/components/proces/ProcesHero";
import { ProcesStepRow } from "@/components/proces/ProcesStepRow";
import { getProcesLayout } from "@/content/i18n/proces-layout";
import { useTranslation } from "@/i18n/LocaleProvider";

export function ProcesPageContent() {
  const { messages, locale } = useTranslation();
  const { hero, steps, cta, stepsAriaLabel } = getProcesLayout(messages, locale);

  return (
    <div className="proces-page relative overflow-hidden pb-16 sm:pb-20">
      <SectionEdgeFade top />

      <div
        className="proces-page-grid pointer-events-none absolute inset-0 opacity-60"
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
        <ProcesHero {...hero} />

        <ol className="list-none" aria-label={stepsAriaLabel}>
          {steps.map((step, index) => (
            <li key={step.num}>
              <ProcesStepRow
                step={step}
                index={index}
                totalSteps={steps.length}
              />
            </li>
          ))}
        </ol>

        <ProcesCta {...cta} />
      </div>
    </div>
  );
}
