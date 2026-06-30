import { kontaktPage } from "@/content/pages/kontakt";
import { contactEmail, phones } from "@/config/contacts";

export type KontaktHighlight = {
  value: string;
  label: string;
};

export type KontaktChannel = {
  id: string;
  label: string;
  value: string;
  href?: string;
};

export type KontaktScopeOption = {
  value: string;
  label: string;
};

export const kontaktLayout = {
  meta: kontaktPage.meta,
  hero: kontaktPage.hero,
  guidance: {
    title: "Co warto napisać",
    body: "Nie musisz mieć gotowej specyfikacji — wystarczy opis produktu, planowany wolumen i harmonogram. Resztę doprecyzujemy na konsultacji.",
    bullets: kontaktPage.sections[0]?.bullets ?? [],
  },
  highlights: [
    { value: "Foshan", label: "Operacje na miejscu w Chinach" },
    { value: "PL · UA · CN", label: "Wsparcie w Europie i Chinach" },
    { value: "Moduły", label: "Elastyczny zakres usług" },
  ] satisfies KontaktHighlight[],
  channels: [
    {
      id: "email",
      label: "E-mail",
      value: contactEmail,
      href: `mailto:${contactEmail}`,
    },
    {
      id: "phone-pl",
      label: "Telefon (Polska)",
      value: phones.pl.display,
      href: `tel:${phones.pl.tel}`,
    },
    {
      id: "phone-ua",
      label: "Telefon (Ukraina)",
      value: phones.ua.display,
      href: `tel:${phones.ua.tel}`,
    },
    {
      id: "phone-cn",
      label: "Telefon (Chiny)",
      value: phones.cn.display,
      href: `tel:${phones.cn.tel}`,
    },
  ] satisfies KontaktChannel[],
  consultationLink: {
    label: "Wolisz konsultację?",
    href: "/konsultacja",
    hint: "Umów bezpłatną rozmowę online — opisz projekt i wskaż dogodny termin.",
  },
  form: {
    title: "Wyślij zapytanie",
    description:
      "Opisz projekt — odpowiemy z propozycją zakresu i kolejnych kroków.",
    scopeLabel: "Zakres zapytania",
    scopeOptions: [
      { value: "sourcing", label: "Wyszukiwanie dostawcy" },
      { value: "audit", label: "Audyt fabryki" },
      { value: "qc", label: "Kontrola jakości" },
      { value: "logistics", label: "Logistyka i transport" },
      { value: "full", label: "Pełny proces importu" },
    ] satisfies KontaktScopeOption[],
    submitLabel: "Wyślij zapytanie",
    success: {
      title: "Dziękujemy za zapytanie",
      description:
        "Otrzymaliśmy Twoją wiadomość. Skontaktujemy się w ciągu 24 godzin roboczych z propozycją dalszych kroków.",
    },
  },
} as const;
