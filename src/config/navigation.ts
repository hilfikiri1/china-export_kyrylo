import type { Locale } from "@/i18n/config";
import { routes, localizedPath } from "@/i18n/routing";

export type NavItem = {
  href: string;
  labelKey: keyof typeof navLabelKeys;
  description?: string;
  serviceId?: string;
};

export type NavGroup = {
  labelKey: keyof typeof navGroupLabelKeys;
  items: NavItem[];
};

export const navGroupLabelKeys = {
  company: "company",
  services: "services",
  tools: "tools",
} as const;

export const navLabelKeys = {
  home: "home",
  services: "services",
  process: "process",
  cases: "cases",
  about: "about",
  china: "china",
  modularServices: "modularServices",
  sourcing: "sourcing",
  audits: "audits",
  qc: "qc",
  freight: "freight",
  calculator: "calculator",
  consultation: "consultation",
  contact: "contact",
} as const;

export function getNavGroups(locale: Locale): NavGroup[] {
  return [
    {
      labelKey: "company",
      items: [
        { href: localizedPath(locale, routes.process), labelKey: "process" },
        { href: localizedPath(locale, routes.about), labelKey: "about" },
        { href: localizedPath(locale, routes.cases), labelKey: "cases" },
        { href: localizedPath(locale, routes.china), labelKey: "china" },
      ],
    },
    {
      labelKey: "services",
      items: [
        { href: localizedPath(locale, routes.services), labelKey: "modularServices" },
        {
          href: localizedPath(locale, `${routes.services}/wyszukiwanie-dostawcow`),
          labelKey: "sourcing",
          serviceId: "sourcing",
        },
        {
          href: localizedPath(locale, `${routes.services}/audyty-fabryk`),
          labelKey: "audits",
          serviceId: "verification",
        },
        {
          href: localizedPath(locale, `${routes.services}/kontrola-jakosci`),
          labelKey: "qc",
          serviceId: "qc",
        },
        {
          href: localizedPath(locale, `${routes.services}/spedycja-i-logistyka`),
          labelKey: "freight",
          serviceId: "freight",
        },
      ],
    },
    {
      labelKey: "tools",
      items: [
        { href: localizedPath(locale, routes.calculator), labelKey: "calculator" },
        { href: localizedPath(locale, routes.consultation), labelKey: "consultation" },
        { href: localizedPath(locale, routes.contact), labelKey: "contact" },
      ],
    },
  ];
}

export function getCtaLink(locale: Locale) {
  return {
    href: localizedPath(locale, routes.contact),
    labelKey: "cta" as const,
  };
}

export function resolveNavLabel(
  labelKey: keyof typeof navLabelKeys,
  messages: {
    nav: Record<string, string>;
    common: Record<string, string>;
    services: {
      modules: {
        sourcing: { title: string };
        verification: { title: string };
        qc: { title: string };
        freight: { title: string };
      };
    };
  },
): string {
  const navMap: Record<keyof typeof navLabelKeys, string> = {
    home: messages.nav.home,
    services: messages.nav.services,
    process: messages.nav.process,
    cases: messages.nav.cases,
    about: messages.nav.about,
    china: messages.nav.china,
    modularServices: messages.common.modularServices,
    sourcing: messages.services.modules.sourcing.title,
    audits: messages.services.modules.verification.title,
    qc: messages.services.modules.qc.title,
    freight: messages.services.modules.freight.title,
    calculator: messages.nav.calculator,
    consultation: messages.common.bookConsultationNav,
    contact: messages.nav.contact,
  };
  return navMap[labelKey] ?? labelKey;
}

export function resolveNavGroupLabel(
  labelKey: keyof typeof navGroupLabelKeys,
  messages: { common: Record<string, string> },
): string {
  const map: Record<keyof typeof navGroupLabelKeys, string> = {
    company: messages.common.company,
    services: messages.common.footerServices,
    tools: messages.common.tools,
  };
  return map[labelKey];
}
