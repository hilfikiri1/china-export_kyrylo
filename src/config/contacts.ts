import type { Locale } from "@/i18n/config";

export type PhoneRegion = "poland" | "ukraine" | "china";

export type RegionalPhone = {
  id: PhoneRegion;
  countryLabel: Record<Locale, string>;
  display: string;
  e164: string;
  whatsapp: string;
};

export const contactConfig = {
  email: "contact@buybringsolutions.com",
  phones: {
    poland: {
      id: "poland",
      countryLabel: {
        pl: "Polska",
        uk: "Польща",
        ru: "Польша",
        de: "Polen",
        zh: "波兰",
      },
      display: "+48 783 232 971",
      e164: "+48783232971",
      whatsapp: "https://wa.me/48783232971",
    },
    ukraine: {
      id: "ukraine",
      countryLabel: {
        pl: "Ukraina",
        uk: "Україна",
        ru: "Украина",
        de: "Ukraine",
        zh: "乌克兰",
      },
      display: "+380 66 496 38 81",
      e164: "+380664963881",
      whatsapp: "https://wa.me/380664963881",
    },
    china: {
      id: "china",
      countryLabel: {
        pl: "Chiny",
        uk: "Китай",
        ru: "Китай",
        de: "China",
        zh: "中国",
      },
      display: "+86 139 2994 3320",
      e164: "+8613929943320",
      whatsapp: "https://wa.me/8613929943320",
    },
  } satisfies Record<PhoneRegion, RegionalPhone>,
  telegramUrl: "",
} as const;

export function getPrimaryPhone(locale: Locale): RegionalPhone {
  if (locale === "zh") return contactConfig.phones.china;
  if (locale === "uk" || locale === "ru") return contactConfig.phones.ukraine;
  return contactConfig.phones.poland;
}

export function mailtoHref(): string {
  return `mailto:${contactConfig.email}`;
}

export function telHref(phone: RegionalPhone): string {
  return `tel:${phone.e164}`;
}
