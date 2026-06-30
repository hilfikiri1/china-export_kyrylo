import type { Metadata } from "next";
import { RealizacjePageSection } from "@/components/case-studies/RealizacjePageSection";
import { DedicatedPageShell } from "@/components/pages/DedicatedPageShell";
import { PageCtaBand } from "@/components/pages/PageCtaBand";
import { getRequiredPageContent } from "@/content/pages";

const content = getRequiredPageContent("realizacje");

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
};

export default function RealizacjePage() {
  return (
    <DedicatedPageShell
      breadcrumbs={[
        { label: "Strona główna", href: "/" },
        { label: "Realizacje" },
      ]}
    >
      <RealizacjePageSection
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        lead={content.hero.lead}
      />
      <PageCtaBand
        primary={content.cta.primary}
        secondary={content.cta.secondary}
      />
    </DedicatedPageShell>
  );
}
