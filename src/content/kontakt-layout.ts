import { kontaktPage } from "@/content/pages/kontakt";
import { contacts } from "@/config/contacts";

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
    { value: "17 lat", label: "doświadczenia we współpracy z Chinami" },
    { value: "PL + UA + CN", label: "Obsługa regionalna" },
    { value: "Moduły", label: "Elastyczny zakres usług" },
  ] satisfies KontaktHighlight[],
  channels: [
    {
      id: "email",
      label: "E-mail",
      value: contacts.email,
      href: `mailto:${contacts.email}`,
    },
    {
      id: "phone-pl",
      label: "Telefon (Polska)",
      value: contacts.phones.poland.phone,
      href: "tel:+48783232971",
    },
    {
      id: "phone-ua",
      label: "Telefon (Ukraina)",
      value: contacts.phones.ukraine.phone,
      href: "tel:+380664963881",
    },
    {
      id: "phone-cn",
      label: "Telefon (Chiny)",
      value: contacts.phones.china.phone,
      href: "tel:+8613929943320",
    },
  ] satisfies KontaktChannel[],
  consultationLink: {
    label: "Wolisz konsultację?",
    href: "/konsultacja",
    hint: "Umów bezpłatną 30-minutową rozmowę online",
  },
  form: {
    title: "Wyślij zapytanie",
    description:
      "Opisz projekt — odpowiemy z propozycją zakresu i kolejnych kroków.",
    scopeLabel: "Zakres zapytania",
    scopeOptions: [
      { value: "sourcing", label: "Wyszukiwanie producenta" },
      { value: "audit", label: "Weryfikacja lub audyt fabryki" },
      { value: "qc", label: "Kontrola jakości" },
      { value: "private-label", label: "Private Label / OEM" },
      { value: "consolidation", label: "Konsolidacja" },
      { value: "transport", label: "Transport i odprawa" },
      { value: "full", label: "Kompleksowa obsługa importu" },
      { value: "other", label: "Inne" },
    ] satisfies KontaktScopeOption[],
    submitLabel: "Wyślij zapytanie",
    success: {
      title: "Dziękujemy za zapytanie",
      description:
        "Otrzymaliśmy Twoją wiadomość. Skontaktujemy się z propozycją dalszych kroków.",
    },
  },
} as const;
