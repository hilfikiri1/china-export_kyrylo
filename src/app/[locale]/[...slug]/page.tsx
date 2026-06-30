import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RealizacjePageSection } from "@/components/case-studies/RealizacjePageSection";
import { ImportCalculator } from "@/components/forms/ImportCalculator";
import { ContactForm } from "@/components/forms/ContactForm";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { KontaktPageContent } from "@/components/kontakt/KontaktPageContent";
import { KonsultacjaPageContent } from "@/components/konsultacja/KonsultacjaPageContent";
import { MyWChinachPageContent } from "@/components/my-w-chinach/MyWChinachPageContent";
import { ONasPageContent } from "@/components/o-nas/ONasPageContent";
import { DedicatedMarketingPage } from "@/components/pages/DedicatedMarketingPage";
import { DedicatedPageShell } from "@/components/pages/DedicatedPageShell";
import { PageCtaBand } from "@/components/pages/PageCtaBand";
import { ProcesPageContent } from "@/components/proces/ProcesPageContent";
import { FeaturedStepsPanel } from "@/components/services/FeaturedStepsPanel";
import { ServicesDedicatedGrid } from "@/components/services/ServicesDedicatedGrid";
import { SourcingProcessCarousel } from "@/components/services/SourcingProcessCarousel";
import { getSeo } from "@/config/seo";
import { getMessages } from "@/i18n/messages";
import { isLocale, locales, localizePath, type Locale } from "@/i18n/config";
import { getRequiredPageContent, getRequiredPageContentByServiceSlug } from "@/content/pages";
import { getServiceBySlug, getServiceNavSlugs } from "@/content/services";
import { myWChinachLayout } from "@/content/my-w-chinach-layout";
import { logistykaLayout } from "@/content/logistyka-layout";
import { LogistykaPageContent } from "@/components/logistyka/LogistykaPageContent";
import { getLocalizedPage } from "@/content/localized-pages";

type PageProps = {
  params: Promise<{ locale: string; slug: string[] }>;
};

const pageSeoIds: Record<string, Parameters<typeof getSeo>[1]> = {
  uslugi: "services",
  proces: "process",
  realizacje: "cases",
  "o-nas": "about",
  "zespol-w-chinach": "china",
  kalkulator: "calculator",
  konsultacja: "consultation",
  kontakt: "contact",
  "polityka-prywatnosci": "privacy",
  "polityka-cookies": "cookies",
  regulamin: "terms",
  "zastrzezenie-kalkulatora": "calculatorDisclaimer",
};

export function generateStaticParams() {
  const staticPaths = [
    "uslugi",
    "proces",
    "realizacje",
    "o-nas",
    "zespol-w-chinach",
    "kalkulator",
    "konsultacja",
    "kontakt",
    "polityka-prywatnosci",
    "polityka-cookies",
    "regulamin",
    "zastrzezenie-kalkulatora",
    ...getServiceNavSlugs().map((slug) => `uslugi/${slug}`),
  ];

  return locales.flatMap((locale) =>
    staticPaths.map((path) => ({ locale, slug: path.split("/") })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const path = slug.join("/");

  const seoId = pageSeoIds[path] ?? pageSeoIds[slug[0]];
  if (seoId) return getSeo(locale, seoId);

  if (slug[0] === "uslugi" && slug[1]) {
    const content = getRequiredPageContentByServiceSlug(slug[1]);
    return { title: content.meta.title, description: content.meta.description };
  }

  return {};
}

function breadcrumbs(locale: Locale, current: string, parent?: { label: string; href: string }) {
  const messages = getMessages(locale);
  return [
    { label: messages.common.home, href: localizePath("/", locale) },
    ...(parent ? [{ label: parent.label, href: localizePath(parent.href, locale) }] : []),
    { label: current },
  ];
}

function LegalPlaceholder({ locale, type }: { locale: Locale; type: string }) {
  const titles: Record<string, string> = {
    "polityka-prywatnosci": "Polityka prywatności",
    "polityka-cookies": "Polityka cookies",
    regulamin: "Regulamin strony",
    "zastrzezenie-kalkulatora": "Zastrzeżenie kalkulatora",
  };
  const title = titles[type] ?? "Informacje prawne";

  return (
    <DedicatedMarketingPage
      content={{
        id: type,
        meta: { title, description: title },
        hero: {
          eyebrow: "Legal",
          title,
          lead:
            "Ta strona jest przygotowana jako miejsce na zweryfikowaną treść prawną. Dane rejestrowe i pełne zapisy należy uzupełnić po konsultacji prawnej.",
        },
        sections: [
          {
            title: "Wymaga uzupełnienia",
            body:
              "Treść nie pokazuje niezweryfikowanych numerów rejestrowych ani danych prawnych. Uzupełnij ją w centralnej konfiguracji po potwierdzeniu przez właściciela i prawnika.",
          },
        ],
        cta: {
          primary: { label: "Kontakt", href: localizePath("/kontakt", locale) },
        },
      }}
      breadcrumbs={breadcrumbs(locale, title)}
    />
  );
}

export default async function LocalizedCatchAllPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const path = slug.join("/");

  if (locale !== "pl") {
    const localizedKeyByPath: Record<string, Parameters<typeof getLocalizedPage>[1]> = {
      uslugi: "services",
      proces: "process",
      realizacje: "cases",
      "o-nas": "about",
      "zespol-w-chinach": "china",
      kalkulator: "calculator",
      konsultacja: "consultation",
      kontakt: "contact",
    };
    const localizedKey = localizedKeyByPath[path] ?? (slug[0] === "uslugi" ? "services" : undefined);
    const localizedContent = localizedKey ? getLocalizedPage(locale, localizedKey) : null;

    if (localizedContent) {
      if (path === "kalkulator") {
        return (
          <DedicatedMarketingPage content={localizedContent} breadcrumbs={breadcrumbs(locale, localizedContent.hero.title)} skipSections>
            <ImportCalculator locale={locale} />
          </DedicatedMarketingPage>
        );
      }

      if (path === "kontakt") {
        return (
          <DedicatedMarketingPage content={localizedContent} breadcrumbs={breadcrumbs(locale, localizedContent.hero.title)} skipSections>
            <div className="mx-auto max-w-3xl px-4 pb-12 sm:px-6 lg:px-8">
              <ContactForm />
            </div>
          </DedicatedMarketingPage>
        );
      }

      if (path === "konsultacja") {
        return (
          <DedicatedMarketingPage content={localizedContent} breadcrumbs={breadcrumbs(locale, localizedContent.hero.title)} skipSections>
            <div className="mx-auto max-w-2xl px-4 pb-12 sm:px-6 lg:px-8">
              <ConsultationForm />
            </div>
          </DedicatedMarketingPage>
        );
      }

      return (
        <DedicatedMarketingPage
          content={localizedContent}
          breadcrumbs={breadcrumbs(locale, localizedContent.hero.title)}
        />
      );
    }
  }

  if (path === "uslugi") {
    const content = getRequiredPageContent("uslugi");
    return (
      <DedicatedMarketingPage
        content={content}
        breadcrumbs={breadcrumbs(locale, "Usługi")}
        widget={<ServicesDedicatedGrid />}
      />
    );
  }

  if (path === "proces") {
    return (
      <DedicatedPageShell breadcrumbs={breadcrumbs(locale, "Jak pracujemy")}>
        <ProcesPageContent />
      </DedicatedPageShell>
    );
  }

  if (path === "realizacje") {
    const content = getRequiredPageContent("realizacje");
    return (
      <DedicatedPageShell breadcrumbs={breadcrumbs(locale, "Realizacje")}>
        <RealizacjePageSection
          eyebrow={content.hero.eyebrow}
          title={content.hero.title}
          lead={content.hero.lead}
        />
        <PageCtaBand primary={content.cta.primary} secondary={content.cta.secondary} />
      </DedicatedPageShell>
    );
  }

  if (path === "o-nas") {
    return (
      <DedicatedPageShell breadcrumbs={breadcrumbs(locale, "O nas")}>
        <ONasPageContent />
      </DedicatedPageShell>
    );
  }

  if (path === "zespol-w-chinach") {
    return (
      <DedicatedPageShell breadcrumbs={breadcrumbs(locale, "Działamy w Chinach")}>
        <MyWChinachPageContent />
        <PageCtaBand primary={myWChinachLayout.cta.primary} secondary={myWChinachLayout.cta.secondary} />
      </DedicatedPageShell>
    );
  }

  if (path === "kalkulator") {
    const content = getRequiredPageContent("kalkulator");
    return (
      <DedicatedMarketingPage content={content} breadcrumbs={breadcrumbs(locale, "Kalkulator")} skipSections>
        <ImportCalculator locale={locale} />
      </DedicatedMarketingPage>
    );
  }

  if (path === "konsultacja") {
    return (
      <DedicatedPageShell breadcrumbs={breadcrumbs(locale, "Umów konsultację")}>
        <KonsultacjaPageContent />
      </DedicatedPageShell>
    );
  }

  if (path === "kontakt") {
    return (
      <DedicatedPageShell breadcrumbs={breadcrumbs(locale, "Kontakt")}>
        <KontaktPageContent />
      </DedicatedPageShell>
    );
  }

  if (["polityka-prywatnosci", "polityka-cookies", "regulamin", "zastrzezenie-kalkulatora"].includes(path)) {
    return <LegalPlaceholder locale={locale} type={path} />;
  }

  if (slug[0] === "uslugi" && slug[1]) {
    const service = getServiceBySlug(slug[1]);
    if (!service) notFound();

    if (slug[1] === "spedycja-i-logistyka") {
      return (
        <DedicatedPageShell breadcrumbs={breadcrumbs(locale, service.title, { label: "Usługi", href: "/uslugi" })}>
          <LogistykaPageContent />
          <PageCtaBand primary={logistykaLayout.cta.primary} secondary={logistykaLayout.cta.secondary} />
        </DedicatedPageShell>
      );
    }

    const content = getRequiredPageContentByServiceSlug(slug[1]);
    return (
      <DedicatedMarketingPage
        content={content}
        breadcrumbs={breadcrumbs(locale, service.title, { label: "Usługi", href: "/uslugi" })}
        beforeSections={
          content.featuredSteps ? (
            <FeaturedStepsPanel {...content.featuredSteps} />
          ) : content.processCarousel ? (
            <SourcingProcessCarousel {...content.processCarousel} asideSections={content.sections} />
          ) : undefined
        }
        skipSections={Boolean(content.processCarousel)}
        numberedSections
      />
    );
  }

  notFound();
}
