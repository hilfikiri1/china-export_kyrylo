/**
 * Navigation structure.
 *
 * `href` values are locale-independent internal slugs (no locale prefix). The
 * locale prefix is added at render time via `localeHref()`. Visible labels are
 * translation keys resolved from the i18n "nav" namespace.
 */

export type NavItem = {
  href: string;
  labelKey: string;
  descriptionKey?: string;
  serviceId?: string;
};

export type NavGroup = { labelKey: string; items: NavItem[] };

export const navGroups: NavGroup[] = [
  {
    labelKey: "nav.group.company",
    items: [
      { href: "/proces", labelKey: "nav.proces" },
      { href: "/o-nas", labelKey: "nav.oNas" },
      { href: "/realizacje", labelKey: "nav.realizacje" },
      { href: "/zespol-w-chinach", labelKey: "nav.chiny" },
    ],
  },
  {
    labelKey: "nav.group.services",
    items: [
      { href: "/uslugi", labelKey: "nav.uslugiAll" },
      {
        href: "/uslugi/wyszukiwanie-dostawcow",
        labelKey: "nav.sourcing",
        serviceId: "sourcing",
      },
      {
        href: "/uslugi/audyty-fabryk",
        labelKey: "nav.verification",
        serviceId: "verification",
      },
      {
        href: "/uslugi/kontrola-jakosci",
        labelKey: "nav.qc",
        serviceId: "qc",
      },
      {
        href: "/uslugi/spedycja-i-logistyka",
        labelKey: "nav.freight",
        serviceId: "freight",
      },
    ],
  },
  {
    labelKey: "nav.group.tools",
    items: [
      { href: "/kalkulator", labelKey: "nav.kalkulator" },
      { href: "/konsultacja", labelKey: "nav.konsultacja" },
      { href: "/kontakt", labelKey: "nav.kontakt" },
    ],
  },
];

/** Flat list of the primary navigation links (used for mobile + footer). */
export const primaryNav: NavItem[] = [
  { href: "/", labelKey: "nav.home" },
  { href: "/uslugi", labelKey: "nav.uslugiAll" },
  { href: "/proces", labelKey: "nav.proces" },
  { href: "/realizacje", labelKey: "nav.realizacje" },
  { href: "/o-nas", labelKey: "nav.oNas" },
  { href: "/zespol-w-chinach", labelKey: "nav.chiny" },
  { href: "/kalkulator", labelKey: "nav.kalkulator" },
  { href: "/kontakt", labelKey: "nav.kontakt" },
];

export const ctaLink = { href: "/kontakt", labelKey: "cta.describeProject" };
