import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/hero/HeroSection";
import { CooperationRoadmap } from "@/components/roadmap/CooperationRoadmap";
import { StatsBanner } from "@/components/stats/StatsBanner";
import { ServicesSection } from "@/components/services/ServicesSection";
import { RealizacjeTeaserSection } from "@/components/case-studies/RealizacjeTeaserSection";
import { AboutGridSection } from "@/components/about/AboutGridSection";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getSeo } from "@/config/seo";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return getSeo(locale, "home");
}

export default async function LocalizedHome({ params }: LocalePageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const resolvedLocale: Locale = locale;

  return (
    <>
      <HeroSection locale={resolvedLocale} />
      <CooperationRoadmap locale={resolvedLocale} />
      <StatsBanner locale={resolvedLocale} />
      <ServicesSection locale={resolvedLocale} />
      <RealizacjeTeaserSection />
      <AboutGridSection />
    </>
  );
}
