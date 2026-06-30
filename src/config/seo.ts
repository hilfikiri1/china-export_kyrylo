import type { Metadata } from "next";
import { companyConfig } from "@/config/company";
import { defaultLocale, htmlLangByLocale, locales, localizePath, type Locale } from "@/i18n/config";

const siteUrl = "https://global.buybringsolutions.com";

type SeoPageId =
  | "home"
  | "services"
  | "process"
  | "cases"
  | "about"
  | "china"
  | "calculator"
  | "consultation"
  | "contact"
  | "privacy"
  | "cookies"
  | "terms"
  | "calculatorDisclaimer";

const seoCopy: Record<Locale, Record<SeoPageId, { title: string; description: string; path: string }>> = {
  pl: {
    home: {
      title: "Import z Chin dla firm | Buy & Bring Solutions",
      description:
        "Wyszukiwanie i weryfikacja producentów, kontrola jakości, produkcja pod marką własną, transport, odprawa celna i dostawa z Chin do Polski i Europy.",
      path: "/",
    },
    services: { title: "Usługi importu z Chin | Buy & Bring Solutions", description: "Modułowe usługi sourcingu, weryfikacji dostawców, kontroli jakości, Private Label, konsolidacji, transportu i odprawy.", path: "/uslugi" },
    process: { title: "Jak pracujemy przy imporcie z Chin | Buy & Bring Solutions", description: "Sześć etapów współpracy: brief, sourcing, weryfikacja, produkcja, kontrola jakości, transport i dostawa.", path: "/proces" },
    cases: { title: "Realizacje | Buy & Bring Solutions", description: "Wybrane projekty Buy & Bring Solutions: Private Label, akumulatory, konsolidacja, maszyny i sourcing na targach w Chinach.", path: "/realizacje" },
    about: { title: "O nas | Buy & Bring Solutions", description: "Łączymy europejskie firmy z producentami w Chinach, wspierając sourcing, produkcję, kontrolę jakości i dostawy.", path: "/o-nas" },
    china: { title: "Działamy na miejscu w Chinach | Buy & Bring Solutions", description: "Wsparcie operacyjne w Foshan: kontakt z producentami, kontrole, konsolidacja, załadunek i dokumentacja eksportowa.", path: "/zespol-w-chinach" },
    calculator: { title: "Kalkulator kosztu importu z Chin | Buy & Bring Solutions", description: "Orientacyjny kalkulator kosztów zakupu, transportu, cła, VAT i kosztu końcowego importu z Chin.", path: "/kalkulator" },
    consultation: { title: "Umów bezpłatną konsultację | Buy & Bring Solutions", description: "Opisz projekt i wskaż dogodny termin kontaktu. Skontaktujemy się, aby potwierdzić rozmowę.", path: "/konsultacja" },
    contact: { title: "Kontakt | Buy & Bring Solutions", description: "Opowiedz nam o projekcie importu z Chin i zakresie potrzebnej pomocy.", path: "/kontakt" },
    privacy: { title: "Polityka prywatności | Buy & Bring Solutions", description: "Informacje o przetwarzaniu danych osobowych. Treść wymaga uzupełnienia i weryfikacji prawnej.", path: "/polityka-prywatnosci" },
    cookies: { title: "Polityka cookies | Buy & Bring Solutions", description: "Informacje o plikach cookies. Treść wymaga uzupełnienia i weryfikacji prawnej.", path: "/polityka-cookies" },
    terms: { title: "Regulamin strony | Buy & Bring Solutions", description: "Zasady korzystania ze strony. Treść wymaga uzupełnienia i weryfikacji prawnej.", path: "/regulamin" },
    calculatorDisclaimer: { title: "Zastrzeżenie kalkulatora | Buy & Bring Solutions", description: "Kalkulator ma charakter informacyjny i nie stanowi oferty handlowej ani porady podatkowej.", path: "/zastrzezenie-kalkulatora" },
  },
  uk: {} as Record<SeoPageId, { title: string; description: string; path: string }>,
  ru: {} as Record<SeoPageId, { title: string; description: string; path: string }>,
  de: {} as Record<SeoPageId, { title: string; description: string; path: string }>,
  zh: {} as Record<SeoPageId, { title: string; description: string; path: string }>,
};

seoCopy.uk = Object.fromEntries(
  Object.entries(seoCopy.pl).map(([key, value]) => [
    key,
    { ...value, title: value.title.replace("Import z Chin dla firm", "Імпорт з Китаю для бізнесу") },
  ]),
) as typeof seoCopy.uk;
seoCopy.ru = Object.fromEntries(
  Object.entries(seoCopy.pl).map(([key, value]) => [
    key,
    { ...value, title: value.title.replace("Import z Chin dla firm", "Импорт из Китая для бизнеса") },
  ]),
) as typeof seoCopy.ru;
seoCopy.de = Object.fromEntries(
  Object.entries(seoCopy.pl).map(([key, value]) => [
    key,
    { ...value, title: value.title.replace("Import z Chin dla firm", "Import aus China für Unternehmen") },
  ]),
) as typeof seoCopy.de;
seoCopy.zh = Object.fromEntries(
  Object.entries(seoCopy.pl).map(([key, value]) => [
    key,
    { ...value, title: value.title.replace("Import z Chin dla firm", "企业中国进口服务") },
  ]),
) as typeof seoCopy.zh;

function absoluteUrl(path: string): string {
  return `${siteUrl}${path}`;
}

export function getSeo(locale: Locale, page: SeoPageId): Metadata {
  const copy = seoCopy[locale][page] ?? seoCopy[defaultLocale][page];
  const canonicalPath = localizePath(copy.path, locale);
  const languages = Object.fromEntries(
    locales.map((item) => [htmlLangByLocale[item], absoluteUrl(localizePath(copy.path, item))]),
  );

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(canonicalPath),
      languages: {
        ...languages,
        "x-default": absoluteUrl(localizePath(copy.path, defaultLocale)),
      },
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: absoluteUrl(canonicalPath),
      siteName: companyConfig.brandName,
      type: "website",
      images: [{ url: absoluteUrl("/brand/og-image.svg"), width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: [absoluteUrl("/brand/og-image.svg")],
    },
  };
}

export { siteUrl };
