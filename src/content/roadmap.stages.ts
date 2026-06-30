export type RoadmapStage = {
  id: string;
  title: string;
  description: string;
  cta: { label: string; href: string };
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
    cta: { label: "Opisz swój projekt", href: "/kontakt" },
    theme: {
      bg: "#232830",
      accent: "#38bdf8",
      gradient: "from-sky-950 via-surface-deep to-surface",
    },
    icon: "clipboard",
    image: "/roadmap/brief.jpg",
    imageAlt: "Planowanie projektu importu — brief i specyfikacja",
  },
  {
    id: "sourcing",
    title: "Wyszukiwanie i porównanie producentów",
    description:
      "Wyszukujemy odpowiednie fabryki, zbieramy oferty oraz porównujemy konfiguracje, ceny, terminy produkcji, MOQ i warunki handlowe.",
    cta: { label: "Wyszukiwanie producentów", href: "/uslugi/wyszukiwanie-dostawcow" },
    theme: {
      bg: "#1a2e1a",
      accent: "#4ade80",
      gradient: "from-emerald-950 via-surface-deep to-surface",
    },
    icon: "search",
    image: "/roadmap/sourcing.jpg",
    imageAlt: "Wyszukiwanie producentów — magazyn towarów",
  },
  {
    id: "audit",
    title: "Weryfikacja fabryki i próbek",
    description:
      "Sprawdzamy producenta, dokumentację, możliwości produkcyjne oraz — gdy jest to potrzebne — organizujemy próbki, wideoweryfikację lub audyt.",
    cta: { label: "Weryfikacja i audyty", href: "/uslugi/audyty-fabryk" },
    theme: {
      bg: "#2a1f0a",
      accent: "#fbbf24",
      gradient: "from-amber-950 via-surface-deep to-surface",
    },
    icon: "factory",
    image: "/roadmap/audit.jpg",
    imageAlt: "Weryfikacja fabryki — hala produkcyjna w Chinach",
  },
  {
    id: "production",
    title: "Zamówienie i nadzór nad produkcją",
    description:
      "Pomagamy uzgodnić specyfikację, warunki płatności i harmonogram. Koordynujemy komunikację z producentem podczas realizacji zamówienia.",
    cta: { label: "Kontrola jakości", href: "/uslugi/kontrola-jakosci" },
    theme: {
      bg: "#1e1b4b",
      accent: "#a78bfa",
      gradient: "from-violet-950 via-surface-deep to-surface",
    },
    icon: "check",
    image: "/roadmap/production.jpg",
    imageAlt: "Nadzór nad produkcją — kontrola jakości na linii",
  },
  {
    id: "export",
    title: "Kontrola jakości i dokumenty",
    description:
      "Sprawdzamy zgodność towaru z ustaleniami, ilość, opakowanie, oznakowanie oraz dostępne dokumenty przed wysyłką.",
    cta: { label: "Dowiedz się więcej", href: "/kontakt" },
    theme: {
      bg: "#0c2340",
      accent: "#60a5fa",
      gradient: "from-blue-950 via-surface-deep to-surface",
    },
    icon: "document",
    image: "/roadmap/export.jpg",
    imageAlt: "Kontenery w porcie — eksport z Chin",
  },
  {
    id: "freight",
    title: "Transport, odprawa i dostawa",
    description:
      "Organizujemy eksport z Chin, fracht morski, kolejowy lub lotniczy, odprawę celną i dostawę pod wskazany adres w Polsce lub Europie.",
    cta: { label: "Oblicz koszt importu", href: "/kalkulator" },
    theme: {
      bg: "#0a2540",
      accent: "#22d3ee",
      gradient: "from-cyan-950 via-surface-deep to-surface",
    },
    icon: "train",
    image: "/image/road_shipment.jpg",
    imageAlt: "Transport — fracht z Chin do Europy",
  },
];
