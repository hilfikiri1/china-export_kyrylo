import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, MapPin } from "lucide-react";
import { caseStudies, caseStudyCategories } from "@/content/case-studies";
import { locales } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { localizedPath, routes } from "@/i18n/routing";
import { DedicatedPageShell } from "@/components/pages/DedicatedPageShell";
import { getServerTranslation } from "@/i18n/server";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    caseStudies.map((cs) => ({ locale, slug: cs.slug })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return {};
  return {
    title: `${cs.title} — Buy & Bring Solutions`,
    description: cs.summary,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params;
  if (!locales.includes(localeParam as Locale)) notFound();
  const locale = localeParam as Locale;
  const { t } = await getServerTranslation(locale);

  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) notFound();

  const category = caseStudyCategories.find((c) => c.id === cs.categoryId);

  return (
    <DedicatedPageShell
      breadcrumbAriaLabel={t("layout.breadcrumb.ariaLabel")}
      breadcrumbs={buildBreadcrumbs(t, locale, [
        { labelKey: "common.cases", href: localizedPath(locale, routes.cases) },
        { label: cs.title },
      ])}
    >
      <article className="mx-auto max-w-3xl px-4 pb-16 pt-8 sm:px-6 sm:pb-20 lg:px-8 lg:pt-12">
        {/* Header */}
        <div className="mb-8">
          {category && (
            <span className="mb-3 inline-block rounded-full border border-accent-light/30 bg-accent-light/10 px-3 py-1 text-xs font-medium text-accent-light">
              {category.label}
            </span>
          )}
          <h1 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
            {cs.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-white/60">
            {cs.summary}
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-white/40">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              {cs.destinationCountry}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" aria-hidden />
              {cs.publishedAt}
            </span>
          </div>
        </div>

        {/* Cover image */}
        {cs.coverImage && (
          <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <Image
              src={cs.coverImage}
              alt={cs.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        )}

        {/* Challenge */}
        <section className="mb-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-white/40">
            Wyzwanie
          </h2>
          <p className="text-sm leading-relaxed text-white/70">{cs.challenge}</p>
        </section>

        {/* Scope */}
        {cs.scope.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-white/40">
              Zakres prac
            </h2>
            <ul className="space-y-2">
              {cs.scope.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-light" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Outcome */}
        <section className="mb-8 rounded-2xl border border-accent-light/20 bg-accent-light/5 p-5 sm:p-6">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent-light/60">
            Rezultat
          </h2>
          <p className="text-sm leading-relaxed text-white/80">{cs.outcome}</p>
        </section>

        {/* Gallery */}
        {cs.gallery.length > 0 && (
          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-white/40">
              Zdjęcia
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {cs.gallery.map((img) => (
                <div
                  key={img.src}
                  className="relative aspect-video overflow-hidden rounded-xl border border-white/8 bg-white/5"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </article>
    </DedicatedPageShell>
  );
}
