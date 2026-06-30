/**
 * Central contact configuration.
 *
 * Edit phone numbers, email and addresses here — they propagate across the
 * whole website. See CONTENT_EDITING_GUIDE.md (Russian).
 */

import type { Locale } from "@/i18n/config";

export type RegionId = "pl" | "ua" | "cn";

export type RegionalPhone = {
  region: RegionId;
  /** ISO-ish display label for the country the number belongs to. */
  countryLabelKey: "country.pl" | "country.ua" | "country.cn";
  /** E.164-ish display number. */
  display: string;
  /** tel: href (digits and leading +). */
  tel: string;
  /** WhatsApp link target, or null when not available. */
  whatsapp: string | null;
  /** Telegram link target, or null when no official URL exists. */
  telegram: string | null;
};

export type RegionalAddress = {
  region: RegionId;
  labelKey: "address.ua" | "address.cn";
  lines: string[];
};

/** Shared email — identical across all locales. */
export const contactEmail = "contact@buybringsolutions.com";

export const phones: Record<RegionId, RegionalPhone> = {
  pl: {
    region: "pl",
    countryLabelKey: "country.pl",
    display: "+48 783 232 971",
    tel: "+48783232971",
    whatsapp: "https://wa.me/48783232971",
    telegram: null,
  },
  ua: {
    region: "ua",
    countryLabelKey: "country.ua",
    display: "+380 66 496 38 81",
    tel: "+380664963881",
    whatsapp: "https://wa.me/380664963881",
    telegram: null,
  },
  cn: {
    region: "cn",
    countryLabelKey: "country.cn",
    display: "+86 139 2994 3320",
    tel: "+8613929943320",
    whatsapp: "https://wa.me/8613929943320",
    telegram: null,
  },
};

/**
 * Verified physical addresses. No Polish / Warsaw office is listed because no
 * verified Polish address has been provided. Do NOT invent a German office.
 */
export const addresses: RegionalAddress[] = [
  {
    region: "ua",
    labelKey: "address.ua",
    lines: ["65074, M. Babadzhanyana 25B", "Odesa, Ukraine"],
  },
  {
    region: "cn",
    labelKey: "address.cn",
    lines: [
      "4th floor, B lift, Block D8",
      "Core District of Guangdong New Lighting Base",
      "Shishan Town, Foshan City",
      "Guangdong Province, China, 528200",
    ],
  },
];

/**
 * Which regional phone is the primary contact for each public locale.
 * - Polish & German -> Polish/European number
 * - Ukrainian & Russian -> Ukrainian number
 * - Chinese -> Chinese number
 */
const localePrimaryRegion: Record<Locale, RegionId> = {
  pl: "pl",
  de: "pl",
  uk: "ua",
  ru: "ua",
  zh: "cn",
};

export function getPrimaryPhone(locale: Locale): RegionalPhone {
  return phones[localePrimaryRegion[locale]];
}

/** All regional phones, in a stable order for the contact page. */
export const allPhones: RegionalPhone[] = [phones.pl, phones.ua, phones.cn];
