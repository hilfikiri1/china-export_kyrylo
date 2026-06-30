import type { ReactNode } from "react";
import type { DedicatedPageContent } from "@/content/pages/types";
import type { BreadcrumbItem } from "@/components/pages/DedicatedPageShell";
import { DedicatedPageShell } from "@/components/pages/DedicatedPageShell";
import { PageHero } from "@/components/pages/PageHero";
import { PageContentSectionBlock } from "@/components/pages/PageContentSection";
import { PageHighlightGrid } from "@/components/pages/PageHighlightGrid";
import { PageCtaBand } from "@/components/pages/PageCtaBand";

type DedicatedMarketingPageProps = {
  content: DedicatedPageContent;
  breadcrumbs?: BreadcrumbItem[];
  breadcrumbAriaLabel?: string;
  beforeSections?: ReactNode;
  widget?: ReactNode;
  afterSections?: ReactNode;
  children?: ReactNode;
  numberedSections?: boolean;
  skipSections?: boolean;
};

export function DedicatedMarketingPage({
  content,
  breadcrumbs,
  breadcrumbAriaLabel,
  beforeSections,
  widget,
  afterSections,
  children,
  numberedSections = false,
  skipSections = false,
}: DedicatedMarketingPageProps) {
  return (
    <DedicatedPageShell
      breadcrumbs={breadcrumbs}
      breadcrumbAriaLabel={breadcrumbAriaLabel}
    >
      <PageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        lead={content.hero.lead}
      />

      {beforeSections}

      {!skipSections && (
        <div className="space-y-6 pb-8">
          {content.sections.map((section, index) => (
            <PageContentSectionBlock
              key={section.title}
              {...section}
              index={numberedSections ? index : undefined}
            />
          ))}
        </div>
      )}

      {content.highlights && content.highlights.length > 0 && (
        <div className="pb-8">
          <PageHighlightGrid highlights={content.highlights} />
        </div>
      )}

      {afterSections}

      {widget && <div className="pb-8">{widget}</div>}

      {children}

      <PageCtaBand
        primary={content.cta.primary}
        secondary={content.cta.secondary}
      />
    </DedicatedPageShell>
  );
}
