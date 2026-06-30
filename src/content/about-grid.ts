export type AboutGridPanel = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export const aboutGridSectionCta = {
  labelKey: "nav.chiny",
  href: "/zespol-w-chinach",
} as const;

export const aboutGridHero: AboutGridPanel = {
  id: "team-china",
  title: "Działamy na miejscu w Chinach",
  description:
    "Zespół operacyjny w Foshan — od weryfikacji producentów po koordynację produkcji, kontrole i wysyłki.",
  image: "/image/china_office.jpg",
  imageAlt: "Zespół operacyjny Buy & Bring Solutions w Chinach",
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
      "Inspekcje jakości, raporty z kontroli oraz weryfikacja dokumentów producenta przed wysyłką.",
    image: "/image/quality_control.jpg",
    imageAlt: "Kontrola jakości towarów przed wysyłką z Chin",
  },
  {
    id: "business-trips",
    title: "Wsparcie podczas wizyt w Chinach",
    description:
      "Organizujemy wizyty w fabrykach, tłumaczenia na miejscu i wsparcie podczas rozmów z producentami.",
    image: "/image/business_trips.jpg",
    imageAlt: "Wsparcie podczas wizyt biznesowych w Chinach",
  },
];
