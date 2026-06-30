import type { Locale } from "@/i18n/config";

export type RegionalPhone = {
  region: "poland" | "ukraine" | "china";
  label: string;
  countryLabel: string;
  phone: string;
  whatsapp?: string;
};

export const contacts = {
  email: "contact@buybringsolutions.com",
  phones: {
    poland: {
      region: "poland",
      label: "Polska",
      countryLabel: "Poland",
      phone: "+48 783 232 971",
      whatsapp: "https://wa.me/48783232971",
    },
    ukraine: {
      region: "ukraine",
      label: "Ukraina",
      countryLabel: "Ukraine",
      phone: "+380 66 496 38 81",
      whatsapp: "https://wa.me/380664963881",
    },
    china: {
      region: "china",
      label: "Chiny",
      countryLabel: "China",
      phone: "+86 139 2994 3320",
      whatsapp: "https://wa.me/8613929943320",
    },
  } satisfies Record<RegionalPhone["region"], RegionalPhone>,
  addresses: {
    ukraine: "65074, M. Babadzhanyana 25B, Odesa, Ukraine",
    china:
      "4th floor, B lift, Block D8, Core District of Guangdong New Lighting Base, Shishan Town, Foshan City, Guangdong Province, China, 528200",
  },
  telegramUrl: "",
};

export function getPrimaryPhoneByLocale(locale: Locale): RegionalPhone {
  if (locale === "zh") return contacts.phones.china;
  if (locale === "uk" || locale === "ru") return contacts.phones.ukraine;
  return contacts.phones.poland;
}
