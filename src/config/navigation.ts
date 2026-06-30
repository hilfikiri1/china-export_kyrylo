export type NavItem = {
  href: string;
  label: string;
  description?: string;
  serviceId?: string;
};
export type NavGroup = { label: string; items: NavItem[] };

export const navGroups: NavGroup[] = [
  {
    label: "Firma",
    items: [
      { href: "/proces", label: "Jak pracujemy" },
      { href: "/o-nas", label: "O nas" },
      { href: "/realizacje", label: "Realizacje" },
      { href: "/zespol-w-chinach", label: "Działamy w Chinach" },
    ],
  },
  {
    label: "Usługi",
    items: [
      { href: "/uslugi", label: "Usługi modułowe" },
      {
        href: "/uslugi/wyszukiwanie-dostawcow",
        label: "Wyszukiwanie producentów",
        serviceId: "sourcing",
      },
      {
        href: "/uslugi/audyty-fabryk",
        label: "Weryfikacja i audyty fabryk",
        serviceId: "verification",
      },
      {
        href: "/uslugi/kontrola-jakosci",
        label: "Kontrola jakości",
        serviceId: "qc",
      },
      {
        href: "/uslugi/spedycja-i-logistyka",
        label: "Transport i odprawa celna",
        serviceId: "freight",
      },
    ],
  },
  {
    label: "Narzędzia",
    items: [
      { href: "/kalkulator", label: "Kalkulator importu" },
      { href: "/konsultacja", label: "Umów konsultację" },
      { href: "/kontakt", label: "Kontakt" },
    ],
  },
];

export const ctaLink = { href: "/kontakt", label: "Opisz projekt" };
