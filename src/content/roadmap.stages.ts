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
    cta: { label: "Opisz projekt", href: "/kontakt" },
    theme: { bg: "#232830", accent: "#38bdf8", gradient: "from-sky-950 via-surface-deep to-surface" },
    icon: "clipboard",
    image: "/roadmap/brief.jpg",
    imageAlt: "Specyfikacja produktu i planowanie importu z Chin",
  },
  {
    id: "sourcing",
    title: "Wyszukiwanie i porównanie producentów",
    description:
      "Wyszukujemy odpowiednie fabryki, zbieramy oferty oraz porównujemy konfiguracje, ceny, terminy produkcji, MOQ i warunki handlowe.",
    cta: { label: "Zobacz usługę", href: "/uslugi/wyszukiwanie-dostawcow" },
    theme: { bg: "#1a2e1a", accent: "#4ade80", gradient: "from-emerald-950 via-surface-deep to-surface" },
    icon: "search",
    image: "/roadmap/sourcing.jpg",
    imageAlt: "Porównanie ofert producentów w Chinach",
  },
  {
    id: "verification",
    title: "Weryfikacja fabryki i próbek",
    description:
      "Sprawdzamy producenta, dokumentację, możliwości produkcyjne oraz — gdy jest to potrzebne — organizujemy próbki, wideoweryfikację lub audyt.",
    cta: { label: "Weryfikacja dostawcy", href: "/uslugi/audyty-fabryk" },
    theme: { bg: "#2a1f0a", accent: "#fbbf24", gradient: "from-amber-950 via-surface-deep to-surface" },
    icon: "factory",
    image: "/roadmap/audit.jpg",
    imageAlt: "Weryfikacja producenta i próbek w Chinach",
  },
  {
    id: "production",
    title: "Zamówienie i nadzór nad produkcją",
    description:
      "Pomagamy uzgodnić specyfikację, warunki płatności, harmonogram i sposób odbioru. Koordynujemy komunikację z producentem podczas realizacji zamówienia.",
    cta: { label: "Kontrola jakości", href: "/uslugi/kontrola-jakosci" },
    theme: { bg: "#1e1b4b", accent: "#a78bfa", gradient: "from-violet-950 via-surface-deep to-surface" },
    icon: "check",
    image: "/roadmap/production.jpg",
    imageAlt: "Nadzór nad produkcją i komunikacją z producentem",
  },
  {
    id: "quality",
    title: "Kontrola jakości i dokumentów",
    description:
      "Sprawdzamy zgodność towaru z ustaleniami, ilość, opakowanie, oznakowanie, działanie oraz dostępne dokumenty przed wysyłką.",
    cta: { label: "Zapytaj o kontrolę", href: "/kontakt" },
    theme: { bg: "#0c2340", accent: "#60a5fa", gradient: "from-blue-950 via-surface-deep to-surface" },
    icon: "document",
    image: "/roadmap/export.jpg",
    imageAlt: "Kontrola jakości i dokumentów przed wysyłką",
  },
  {
    id: "delivery",
    title: "Transport, odprawa i dostawa",
    description:
      "Organizujemy eksport z Chin, fracht, odprawę celną i dostawę pod wskazany adres w Polsce, Ukrainie lub innym kraju europejskim.",
    cta: { label: "Oblicz koszt", href: "/kalkulator" },
    theme: { bg: "#1a1033", accent: "#f472b6", gradient: "from-rose-950 via-surface-deep to-surface" },
    icon: "home",
    image: "/roadmap/delivery.jpg",
    imageAlt: "Transport, odprawa celna i dostawa z Chin do Europy",
  },
];
