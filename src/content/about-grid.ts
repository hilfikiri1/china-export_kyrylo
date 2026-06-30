export type AboutGridPanel = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export const aboutGridSectionCta = {
  label: "Działamy na miejscu w Chinach",
  href: "/zespol-w-chinach",
} as const;

export const aboutGridHero: AboutGridPanel = {
  id: "team-china",
  title: "Wsparcie operacyjne w Foshan",
  description:
    "Nasz zespół w Foshan koordynuje kontakt z producentami, organizację inspekcji i przygotowanie wysyłek.",
  image: "/image/china_office.jpg",
  imageAlt: "Operacje Buy & Bring Solutions w Foshan, Chiny",
};

export function getAboutPanelById(id: string): AboutGridPanel | undefined {
  if (aboutGridHero.id === id) return aboutGridHero;
  return aboutGridRow.find((panel) => panel.id === id);
}

export function getRequiredAboutPanel(id: string): AboutGridPanel {
  const panel = getAboutPanelById(id);
  if (!panel) {
    throw new Error(`Missing about panel: ${id}`);
  }
  return panel;
}

export const aboutGridRow: AboutGridPanel[] = [
  {
    id: "quality-control",
    title: "Kontrola jakości i dokumentacja",
    description:
      "Organizujemy inspekcje towaru przed wysyłką, zbieramy dokumentację i weryfikujemy zgodność z uzgodnioną specyfikacją.",
    image: "/image/quality_control.jpg",
    imageAlt: "Kontrola jakości towarów przed wysyłką z Chin",
  },
  {
    id: "business-trips",
    title: "Wsparcie przy wizytach biznesowych",
    description:
      "Wspieramy klientów podczas wyjazdów do Chin — organizacja wizyt w fabrykach, tłumaczenie i wsparcie podczas negocjacji.",
    image: "/image/business_trips.jpg",
    imageAlt: "Wizyta biznesowa w chińskiej fabryce",
  },
];
