export type AboutGridPanel = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export const aboutGridSectionCta = {
  label: "Poznaj nasz zespół w Chinach",
  href: "/zespol-w-chinach",
} as const;

export const aboutGridHero: AboutGridPanel = {
  id: "team-china",
  title: "Zespół w Chinach",
  description:
    "Lokalny zespół na miejscu — od weryfikacji dostawców po koordynację produkcji i wysyłki.",
  image: "/image/china_office.jpg",
  imageAlt: "Wsparcie operacyjne Buy & Bring Solutions w Chinach",
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
      "Inspekcje QA, raporty z kontroli, certyfikaty i pełna dokumentacja zgodna z wymogami importu do UE.",
    image: "/image/quality_control.jpg",
    imageAlt: "Kontrola jakości towarów przed wysyłką z Chin",
  },
  {
    id: "business-trips",
    title: "Wyjazdy biznesowe do Chin",
    description:
      "Organizujemy wizyty w fabrykach, tłumaczenia na miejscu i wsparcie podczas negocjacji z dostawcami.",
    image: "/image/business_trips.jpg",
    imageAlt: "Transport lotniczy — wyjazdy biznesowe do Chin",
  },
];
