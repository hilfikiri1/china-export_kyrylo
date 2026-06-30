/**
 * Contact information per locale.
 * Edit here to update phone numbers, WhatsApp links, etc.
 */

import { company } from "./company";

export type ContactPhone = {
  /** E.164 format for tel: links */
  e164: string;
  /** Display format */
  display: string;
  /** Country label */
  countryLabel: string;
  /** WhatsApp link (if available) */
  whatsapp?: string;
};

export type LocaleContacts = {
  primaryPhone: ContactPhone;
  email: string;
};

/** Phone numbers */
export const phones = {
  poland: {
    e164: "+48783232971",
    display: "+48 783 232 971",
    countryLabel: "Polska",
    whatsapp: "https://wa.me/48783232971",
  },
  ukraine: {
    e164: "+380664963881",
    display: "+380 66 496 38 81",
    countryLabel: "Ukraina",
    whatsapp: "https://wa.me/380664963881",
  },
  china: {
    e164: "+8613929943320",
    display: "+86 139 2994 3320",
    countryLabel: "Chiny",
    whatsapp: "https://wa.me/8613929943320",
  },
} as const;

/** All phones array — for Contact page showing all regional numbers */
export const allPhones: ContactPhone[] = [
  phones.poland,
  phones.ukraine,
  phones.china,
];

/** Primary contact phone per locale */
export const localeContacts: Record<string, LocaleContacts> = {
  pl: {
    primaryPhone: phones.poland,
    email: company.email,
  },
  de: {
    primaryPhone: phones.poland,
    email: company.email,
  },
  uk: {
    primaryPhone: phones.ukraine,
    email: company.email,
  },
  ru: {
    primaryPhone: phones.ukraine,
    email: company.email,
  },
  zh: {
    primaryPhone: phones.china,
    email: company.email,
  },
};

export function getLocaleContacts(locale: string): LocaleContacts {
  return localeContacts[locale] ?? localeContacts.pl;
}
