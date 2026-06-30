/**
 * CMS-ready configuration for the Hero flow map overlay.
 * Country `id` uses ISO-2; `geoId` uses ISO-3 for GeoJSON polygon matching.
 */

export type HeroMapMetric = {
  label: string;
  value: string;
};

export type HeroMapCountry = {
  id: string;
  geoId: string;
  lat: number;
  lng: number;
  name: string;
  role: string;
  description: string;
  hubs: string[];
  metrics: HeroMapMetric[];
};

export type FlowMode = "rail" | "air";

export type HeroFlowRoute = {
  id: string;
  from: "CN";
  to: "DE" | "PL" | "CZ" | "UA";
  mode: FlowMode;
  label: string;
  volume: number;
  volumeLabel: string;
  transitDays: string;
  waypoints: [number, number][];
};

/** Shared Eurasian land-bridge corridor to Minsk */
const CORRIDOR_TO_MINSK: [number, number][] = [
  [116, 34],
  [87, 43],
  [76, 43],
  [55, 51],
  [37, 55],
  [27, 54],
];

export const heroMapCountries: HeroMapCountry[] = [
  {
    id: "CN",
    geoId: "CHN",
    lat: 35,
    lng: 104,
    name: "Chiny",
    role: "Kraj źródłowy",
    description:
      "Centrum sourcingu i produkcji. Wsparcie operacyjne na miejscu, weryfikacja producentów i kontrola jakości przed wysyłką.",
    hubs: ["Foshan", "Guangzhou", "Shanghai"],
    metrics: [
      { label: "Baza operacyjna", value: "Foshan, Guangdong" },
      { label: "Zakres", value: "Sourcing i kontrola jakości" },
      { label: "Eksport", value: "Organizacja i dokumentacja" },
    ],
  },
  {
    id: "PL",
    geoId: "POL",
    lat: 52,
    lng: 19,
    name: "Polska",
    role: "Główny kierunek dostaw",
    description:
      "Dostawa do magazynu lub hali produkcyjnej. Odprawa celna i dostawa końcowa w UE.",
    hubs: ["Gdańsk", "Gdynia", "Wrocław"],
    metrics: [
      { label: "Dostawa", value: "Pod wskazany adres" },
      { label: "Czas tranzytu (kolej)", value: "14–18 dni" },
      { label: "Obsługa celna", value: "Pełna" },
    ],
  },
  {
    id: "DE",
    geoId: "DEU",
    lat: 51,
    lng: 10,
    name: "Niemcy",
    role: "Rynek docelowy",
    description:
      "Tranzyt i konsolidacja ładunków dla klientów w Europie Zachodniej z dostawą door-to-door.",
    hubs: ["Hamburg", "Frankfurt", "Monachium", "Berlin"],
    metrics: [
      { label: "Dostawa", value: "Door-to-door" },
      { label: "Czas tranzytu (kolej)", value: "16–20 dni" },
      { label: "Obsługa FCL / LCL", value: "Tak" },
    ],
  },
  {
    id: "CZ",
    geoId: "CZE",
    lat: 50,
    lng: 15,
    name: "Czechy",
    role: "Rynek docelowy",
    description:
      "Dostawy B2B dla producentów i dystrybutorów w Czechach z pełną obsługą importu.",
    hubs: ["Praga", "Brno", "Ostrawa"],
    metrics: [
      { label: "Dostawa", value: "Pod wskazany adres" },
      { label: "Czas tranzytu (kolej)", value: "15–19 dni" },
      { label: "Obsługa FCL / LCL", value: "Tak" },
    ],
  },
  {
    id: "UA",
    geoId: "UKR",
    lat: 50,
    lng: 30,
    name: "Ukraina",
    role: "Rynek docelowy",
    description:
      "Import towarów i komponentów B2B z obsługą tranzytu lądowego i lotniczego do magazynów klienta.",
    hubs: ["Kijów", "Lwów", "Odessa"],
    metrics: [
      { label: "Dostawa", value: "Do magazynu klienta" },
      { label: "Tryb", value: "Kolej + lotniczy" },
      { label: "Czas tranzytu", value: "16–22 dni" },
    ],
  },
];

export const heroFlowRoutes: HeroFlowRoute[] = [
  {
    id: "cn-pl-rail",
    from: "CN",
    to: "PL",
    mode: "rail",
    label: "Kolej: Chiny → Polska",
    volume: 100,
    volumeLabel: "Połączenie kolejowe",
    transitDays: "14–18 dni",
    waypoints: [...CORRIDOR_TO_MINSK, [21, 52]],
  },
  {
    id: "cn-de-rail",
    from: "CN",
    to: "DE",
    mode: "rail",
    label: "Kolej: Chiny → Niemcy",
    volume: 85,
    volumeLabel: "Połączenie kolejowe",
    transitDays: "16–20 dni",
    waypoints: [...CORRIDOR_TO_MINSK, [21, 52], [13.4, 52.5]],
  },
  {
    id: "cn-cz-rail",
    from: "CN",
    to: "CZ",
    mode: "rail",
    label: "Kolej: Chiny → Czechy",
    volume: 55,
    volumeLabel: "Połączenie kolejowe",
    transitDays: "15–19 dni",
    waypoints: [...CORRIDOR_TO_MINSK, [21, 52], [14.4, 50.1]],
  },
  {
    id: "cn-ua-rail",
    from: "CN",
    to: "UA",
    mode: "rail",
    label: "Kolej: Chiny → Ukraina",
    volume: 40,
    volumeLabel: "Połączenie kolejowe",
    transitDays: "16–22 dni",
    waypoints: [
      [116, 34],
      [87, 43],
      [76, 43],
      [55, 51],
      [37, 55],
      [30.5, 50.4],
    ],
  },
  {
    id: "cn-pl-air",
    from: "CN",
    to: "PL",
    mode: "air",
    label: "Lotniczy: Chiny → Polska",
    volume: 22,
    volumeLabel: "Fracht lotniczy",
    transitDays: "3–5 dni",
    waypoints: [
      [121.5, 31.2],
      [60, 45],
      [21, 52],
    ],
  },
  {
    id: "cn-de-air",
    from: "CN",
    to: "DE",
    mode: "air",
    label: "Lotniczy: Chiny → Niemcy",
    volume: 20,
    volumeLabel: "Fracht lotniczy",
    transitDays: "3–5 dni",
    waypoints: [
      [121.5, 31.2],
      [55, 48],
      [13.4, 52.5],
    ],
  },
  {
    id: "cn-cz-air",
    from: "CN",
    to: "CZ",
    mode: "air",
    label: "Lotniczy: Chiny → Czechy",
    volume: 15,
    volumeLabel: "Fracht lotniczy",
    transitDays: "3–5 dni",
    waypoints: [
      [113, 22.5],
      [50, 42],
      [14.4, 50.1],
    ],
  },
  {
    id: "cn-ua-air",
    from: "CN",
    to: "UA",
    mode: "air",
    label: "Lotniczy: Chiny → Ukraina",
    volume: 18,
    volumeLabel: "Fracht lotniczy",
    transitDays: "4–6 dni",
    waypoints: [
      [121.5, 31.2],
      [50, 44],
      [30.5, 50.4],
    ],
  },
];

const countryMap = new Map(heroMapCountries.map((c) => [c.id, c]));
const geoIdMap = new Map(heroMapCountries.map((c) => [c.geoId, c]));

export function getHeroMapCountry(id: string): HeroMapCountry | undefined {
  return countryMap.get(id) ?? geoIdMap.get(id);
}

export const heroMapCountryIds = heroMapCountries.map((c) => c.id);

export function getFlowRoutes(): HeroFlowRoute[] {
  return heroFlowRoutes;
}

export function getFlowRoutesByDestination(
  countryId: string,
): HeroFlowRoute[] {
  return heroFlowRoutes.filter((r) => r.to === countryId);
}

export function getRouteTooltip(route: HeroFlowRoute): string {
  const modeLabel = route.mode === "rail" ? "Kolej" : "Lotniczy";
  return `${route.label} · ${route.volumeLabel} · ${modeLabel} · ${route.transitDays}`;
}
