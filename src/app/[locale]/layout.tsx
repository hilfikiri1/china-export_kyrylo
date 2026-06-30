import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { LogisticsBackdrop } from "@/components/backgrounds/LogisticsBackdrop";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import "../globals.css";
import { cn } from "@/lib/utils";
import { hreflang, htmlLang, isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { createTranslator } from "@/i18n/translate";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { localeHref } from "@/i18n/routing";
import { siteUrl, seo } from "@/config/seo";

const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-sans",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const messages = await getDictionary(locale);
  const t = createTranslator(messages);

  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[hreflang[l]] = `${siteUrl}${localeHref(l, "/")}`;
  }
  languages["x-default"] = `${siteUrl}/`;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t("seo.home.title"),
      template: `%s | ${seo.siteName}`,
    },
    description: t("seo.home.description"),
    alternates: {
      canonical: `${siteUrl}${localeHref(locale, "/")}`,
      languages,
    },
    openGraph: {
      type: "website",
      siteName: seo.siteName,
      title: t("seo.home.title"),
      description: t("seo.home.description"),
      url: `${siteUrl}${localeHref(locale, "/")}`,
      locale: hreflang[locale],
      images: [{ url: seo.ogImage, width: 1200, height: 630, alt: seo.siteName }],
    },
    twitter: {
      card: seo.twitterCard,
      title: t("seo.home.title"),
      description: t("seo.home.description"),
      images: [seo.ogImage],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const typedLocale = locale as Locale;
  const messages = await getDictionary(typedLocale);

  return (
    <html
      lang={htmlLang[typedLocale]}
      className={cn(
        "h-full",
        "antialiased",
        jakarta.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="relative min-h-full flex flex-col bg-background text-foreground">
        <OrganizationJsonLd />
        <LocaleProvider locale={typedLocale} messages={messages}>
          <LogisticsBackdrop variant="site" />
          <Header />
          <main className="relative z-10 flex-1 pt-16">{children}</main>
          <Footer />
          <CookieConsent />
        </LocaleProvider>
      </body>
    </html>
  );
}
