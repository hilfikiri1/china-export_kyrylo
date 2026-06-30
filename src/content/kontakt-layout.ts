import { contactConfig, mailtoHref, telHref } from "@/config/contacts";
import { kontaktPage } from "@/content/pages/kontakt";

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

export const serviceScopeOptions = [
  { value: "sourcing", label: "wyszukiwanie producenta" },
  { value: "audit", label: "weryfikacja lub audyt fabryki" },
  { value: "qc", label: "kontrola jakości" },
  { value: "private-label", label: "Private Label / OEM" },
  { value: "consolidation", label: "konsolidacja" },
  { value: "freight", label: "transport i odprawa" },
  { value: "full", label: "kompleksowa obsługa importu" },
  { value: "other", label: "inne" },
] satisfies KontaktScopeOption[];

export const kontaktLayout = {
  meta: kontaktPage.meta,
  hero: kontaktPage.hero,
  guidance: {
    title: "Co warto napisać",
    body:
      "Im więcej danych otrzymamy na starcie, tym szybciej określimy realny zakres pracy i kolejne kroki.",
    bullets: kontaktPage.sections[0]?.bullets ?? [],
  },
  highlights: [
    { value: "17 lat", label: "Doświadczenia z Chinami" },
    { value: "275+", label: "Obsłużonych klientów" },
    { value: "110+", label: "Dostarczonych kontenerów" },
  ] satisfies KontaktHighlight[],
  channels: [
    {
      id: "email",
      label: "E-mail",
      value: contactConfig.email,
      href: mailtoHref(),
    },
    {
      id: "phone-pl",
      label: "Telefon — Polska",
      value: contactConfig.phones.poland.display,
      href: telHref(contactConfig.phones.poland),
    },
    {
      id: "phone-ua",
      label: "Telefon — Ukraina",
      value: contactConfig.phones.ukraine.display,
      href: telHref(contactConfig.phones.ukraine),
    },
    {
      id: "phone-cn",
      label: "Telefon — Chiny",
      value: contactConfig.phones.china.display,
      href: telHref(contactConfig.phones.china),
    },
  ] satisfies KontaktChannel[],
  consultationLink: {
    label: "Wolisz konsultację?",
    href: "/konsultacja",
    hint: "Opisz projekt i wskaż dogodny termin kontaktu",
  },
  form: {
    title: "Wyślij zapytanie",
    description:
      "Opisz projekt — odpowiemy z propozycją zakresu i kolejnych kroków.",
    scopeLabel: "Zakres potrzebnej pomocy",
    scopeOptions: serviceScopeOptions,
    submitLabel: "Wyślij zapytanie",
    success: {
      title: "Dziękujemy za zapytanie",
      description:
        "Otrzymaliśmy Twoją wiadomość. Skontaktujemy się, aby omówić kolejne kroki.",
    },
  },
} as const;
