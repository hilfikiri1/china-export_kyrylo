import type { Metadata } from "next";
import { HeroSection } from "@/components/hero/HeroSection";
import { CantonFairTicker } from "@/components/canton-fair/CantonFairTicker";
import { CooperationRoadmap } from "@/components/roadmap/CooperationRoadmap";
import { StatsBanner } from "@/components/stats/StatsBanner";
import { ServicesSection } from "@/components/services/ServicesSection";
import { RealizacjeTeaserSection } from "@/components/case-studies/RealizacjeTeaserSection";
import { AboutGridSection } from "@/components/about/AboutGridSection";
import { HomeAudienceSection } from "@/components/home/HomeAudienceSection";
import { HomeFaqSection } from "@/components/home/HomeFaqSection";
import { HomeMissionSection } from "@/components/home/HomeMissionSection";
import { HomeUrgencyCtaSection } from "@/components/home/HomeUrgencyCtaSection";
import { SpecializationsSection } from "@/components/specializations/SpecializationsSection";
import {
  getAlternateLanguages,
  getCanonicalUrl,
  getPageSeo,
  organizationStructuredData,
  siteUrl,
} from "@/config/seo";
import { locales, type Locale } from "@/i18n/config";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const seo = getPageSeo("home", locale);

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: getCanonicalUrl(locale),
      languages: getAlternateLanguages(),
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: getCanonicalUrl(locale),
      siteName: "Buy & Bring Solutions",
      locale,
      type: "website",
      images: [{ url: `${siteUrl}/brand/logo.svg` }],
    },
  };
}

export default async function Home({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;

  const jsonLd = {
    ...organizationStructuredData,
    url: getCanonicalUrl(locale),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {locale === "pl" ? <CantonFairTicker /> : null}
      <HeroSection />
      <CooperationRoadmap />
      <StatsBanner />
      <ServicesSection />
      <HomeAudienceSection />
      <RealizacjeTeaserSection />
      <AboutGridSection />
      <SpecializationsSection />
      <HomeMissionSection />
      <HomeUrgencyCtaSection />
      <HomeFaqSection />
    </>
  );
}
