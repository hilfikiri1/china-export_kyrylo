import { kontaktPage } from "@/content/pages/kontakt";
import { phones } from "@/config/contacts";
import { company } from "@/config/company";

export type KontaktHighlight = {
  value: string;
  label: string;
};

export type KontaktChannel = {
  id: string;
  label: string;
  value: string;
  href?: string;
  whatsapp?: string;
  countryLabel?: string;
};

export type KontaktScopeOption = {
  value: string;
  label: string;
};

export const kontaktLayout = {
  meta: kontaktPage.meta,
  hero: kontaktPage.hero,
  guidance: {
    title: "Co warto opisać",
    body: "Nie musisz mieć gotowej specyfikacji — wystarczy opis produktu, planowany wolumen i harmonogram. Resztę doprecyzujemy na konsultacji.",
    bullets: kontaktPage.sections[0]?.bullets ?? [],
  },
  highlights: [
    { value: "24h", label: "Odpowiedź robocza" },
    { value: "PL/UK/EN/CN", label: "Języki obsługi" },
    { value: "Moduły", label: "Elastyczny zakres usług" },
  ] satisfies KontaktHighlight[],
  channels: [
    {
      id: "email",
      label: "E-mail",
      value: company.email,
      href: `mailto:${company.email}`,
    },
    {
      id: "phone-pl",
      label: "Telefon (Polska)",
      value: phones.poland.display,
      href: `tel:${phones.poland.e164}`,
      whatsapp: phones.poland.whatsapp,
      countryLabel: "Polska",
    },
    {
      id: "phone-ua",
      label: "Telefon (Ukraina)",
      value: phones.ukraine.display,
      href: `tel:${phones.ukraine.e164}`,
      whatsapp: phones.ukraine.whatsapp,
      countryLabel: "Ukraina",
    },
    {
      id: "phone-cn",
      label: "Telefon (Chiny)",
      value: phones.china.display,
      href: `tel:${phones.china.e164}`,
      whatsapp: phones.china.whatsapp,
      countryLabel: "Chiny",
    },
  ] satisfies KontaktChannel[],
  address: {
    china: company.operations.china.address,
    ukraine: company.operations.ukraine.address,
  },
  consultationLink: {
    label: "Wolisz konsultację?",
    href: "/konsultacja",
    hint: "Umów bezpłatną rozmowę online",
  },
  form: {
    title: "Opisz swój projekt",
    description:
      "Im więcej informacji przekażesz, tym szybciej możemy ocenić projekt i przygotować kolejne kroki.",
    scopeLabel: "Zakres zapytania",
    scopeOptions: [
      { value: "sourcing", label: "Wyszukiwanie producenta" },
      { value: "verification", label: "Weryfikacja lub audyt fabryki" },
      { value: "qc", label: "Kontrola jakości" },
      { value: "oem", label: "Private Label / OEM" },
      { value: "consolidation", label: "Konsolidacja" },
      { value: "freight", label: "Transport i odprawa celna" },
      { value: "full", label: "Kompleksowa obsługa importu" },
      { value: "other", label: "Inne" },
    ] satisfies KontaktScopeOption[],
    submitLabel: "Wyślij zapytanie",
    success: {
      title: "Dziękujemy!",
      description:
        "Otrzymaliśmy Twoje zapytanie. Skontaktujemy się z Tobą wkrótce.",
    },
  },
} as const;
