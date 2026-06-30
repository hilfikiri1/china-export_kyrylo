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
      "Omawiamy produkt, wymagania techniczne, ilość, budżet, termin oraz kraj docelowy. Proponujemy zakres całego procesu lub wybranego etapu.",
    cta: { label: "Wyślij brief", href: "/kontakt" },
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
    title: "Wyszukiwanie dostawcy",
    description:
      "Identyfikujemy i weryfikujemy producentów dopasowanych do Twoich wymagań. Przeprowadzamy RFQ, negocjacje i shortlistę kandydatów.",
    cta: { label: "Zobacz jak szukamy", href: "/uslugi/wyszukiwanie-dostawcow" },
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
    id: "audit",
    title: "Audyt fabryki",
    description:
      "Nasz zespół na miejscu odwiedza fabrykę, weryfikuje certyfikaty, park maszynowy i realne możliwości produkcyjne.",
    cta: { label: "Umów audyt", href: "/konsultacja" },
    theme: {
      bg: "#2a1f0a",
      accent: "#fbbf24",
      gradient: "from-amber-950 via-surface-deep to-surface",
    },
    icon: "factory",
    image: "/roadmap/audit.jpg",
    imageAlt: "Hala produkcyjna — audyt fabryki w Chinach",
  },
  {
    id: "production",
    title: "Produkcja i QA",
    description:
      "Monitorujemy produkcję, zatwierdzamy próbki, przeprowadzamy kontrolę inline i inspekcję przed wysyłką (pre-shipment).",
    cta: { label: "Kontrola jakości", href: "/kontakt" },
    theme: {
      bg: "#1e1b4b",
      accent: "#a78bfa",
      gradient: "from-violet-950 via-surface-deep to-surface",
    },
    icon: "check",
    image: "/roadmap/production.jpg",
    imageAlt: "Kontrola jakości na linii produkcyjnej",
  },
  {
    id: "export",
    title: "Eksport z Chin",
    description:
      "Przygotowujemy dokumentację eksportową, organizujemy transport do portu i koordynujemy odprawę po stronie chińskiej.",
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
    title: "Transport kolejowy / lotniczy",
    description:
      "Organizujemy fracht kolejowy i lotniczy, śledzimy ładunek i informujemy o statusie na każdym etapie trasy Chiny–Europa.",
    cta: { label: "Oblicz transport", href: "/kalkulator" },
    theme: {
      bg: "#0a2540",
      accent: "#22d3ee",
      gradient: "from-cyan-950 via-surface-deep to-surface",
    },
    icon: "train",
    image: "/image/road_shipment.jpg",
    imageAlt: "Transport kolejowy — fracht z Chin do Europy",
  },
  {
    id: "delivery",
    title: "Dostawa w Polsce",
    description:
      "Obsługujemy odprawę celną w UE, koordynujemy last mile i dostarczamy towar pod wskazany adres — door-to-door.",
    cta: { label: "Wyślij zapytanie", href: "/kontakt" },
    theme: {
      bg: "#1a1033",
      accent: "#f472b6",
      gradient: "from-rose-950 via-surface-deep to-surface",
    },
    icon: "home",
    image: "/roadmap/delivery.jpg",
    imageAlt: "Dostawa towaru — logistyka last mile w Polsce",
  },
];
