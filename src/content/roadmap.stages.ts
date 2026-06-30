export type RoadmapCtaId =
  | "contact"
  | "consultation"
  | "calculator"
  | "sourcing"
  | "audit"
  | "qc"
  | "freight";

export type RoadmapStage = {
  id: string;
  title: string;
  description: string;
  cta: { label: string; ctaId: RoadmapCtaId };
  theme: {
    bg: string;
    accent: string;
    gradient: string;
  };
  icon: string;
  image: string;
  imageAlt: string;
};

export const roadmapStages: RoadmapStage[] = [
  {
    id: "brief",
    title: "Brief i specyfikacja",
    description:
      "Poznajemy produkt, jego zastosowanie, wymagania techniczne, planowaną ilość, budżet, termin oraz kraj docelowy.",
    cta: { label: "Wyślij brief", ctaId: "contact" },
    theme: {
      bg: "#232830",
      accent: "#38bdf8",
      gradient: "from-sky-950 via-surface-deep to-surface",
    },
    icon: "clipboard",
    image: "/roadmap/brief.jpg",
    imageAlt: "Spotkanie biznesowe i planowanie projektu importu",
  },
  {
    id: "sourcing",
    title: "Wyszukiwanie i porównanie producentów",
    description:
      "Wyszukujemy odpowiednie fabryki, zbieramy oferty oraz porównujemy konfiguracje, ceny, terminy produkcji, MOQ i warunki handlowe.",
    cta: { label: "Zobacz jak szukamy", ctaId: "sourcing" },
    theme: {
      bg: "#1a2e1a",
      accent: "#4ade80",
      gradient: "from-emerald-950 via-surface-deep to-surface",
    },
    icon: "search",
    image: "/roadmap/sourcing.jpg",
    imageAlt: "Magazyn z towarami — wyszukiwanie dostawców",
  },
  {
    id: "verification",
    title: "Weryfikacja fabryki i próbek",
    description:
      "Sprawdzamy producenta, dokumentację, możliwości produkcyjne oraz — gdy jest to potrzebne — organizujemy próbki, wideoweryfikację lub audyt.",
    cta: { label: "Umów weryfikację", ctaId: "audit" },
    theme: {
      bg: "#2a1f0a",
      accent: "#fbbf24",
      gradient: "from-amber-950 via-surface-deep to-surface",
    },
    icon: "factory",
    image: "/roadmap/audit.jpg",
    imageAlt: "Hala produkcyjna — weryfikacja fabryki w Chinach",
  },
  {
    id: "production",
    title: "Zamówienie i nadzór nad produkcją",
    description:
      "Pomagamy uzgodnić specyfikację, warunki płatności, harmonogram i sposób odbioru. Koordynujemy komunikację z producentem podczas realizacji zamówienia.",
    cta: { label: "Wyślij zapytanie", ctaId: "contact" },
    theme: {
      bg: "#1e1b4b",
      accent: "#a78bfa",
      gradient: "from-violet-950 via-surface-deep to-surface",
    },
    icon: "check",
    image: "/roadmap/production.jpg",
    imageAlt: "Nadzór nad produkcją w fabryce",
  },
  {
    id: "qc",
    title: "Kontrola jakości i dokumentów",
    description:
      "Sprawdzamy zgodność towaru z ustaleniami, ilość, opakowanie, oznakowanie, działanie oraz dostępne dokumenty przed wysyłką.",
    cta: { label: "Kontrola jakości", ctaId: "qc" },
    theme: {
      bg: "#0c2340",
      accent: "#60a5fa",
      gradient: "from-blue-950 via-surface-deep to-surface",
    },
    icon: "document",
    image: "/roadmap/export.jpg",
    imageAlt: "Kontrola jakości i dokumentacja przed wysyłką",
  },
  {
    id: "delivery",
    title: "Transport, odprawa i dostawa",
    description:
      "Organizujemy eksport z Chin, fracht, odprawę celną i dostawę pod wskazany adres w Polsce, Ukrainie lub innym kraju europejskim.",
    cta: { label: "Oblicz transport", ctaId: "freight" },
    theme: {
      bg: "#0a2540",
      accent: "#22d3ee",
      gradient: "from-cyan-950 via-surface-deep to-surface",
    },
    icon: "train",
    image: "/image/road_shipment.jpg",
    imageAlt: "Transport i dostawa door-to-door",
  },
];
