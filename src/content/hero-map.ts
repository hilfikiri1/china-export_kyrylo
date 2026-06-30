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
      "Centrum sourcingu i produkcji. Wsparcie operacyjne B&BS jest koordynowane z Foshan.",
    hubs: ["Foshan", "Guangdong", "porty i regiony produkcyjne Chin"],
    metrics: [
      { label: "Doświadczenie z Chinami", value: "17 lat" },
      { label: "Obsłużeni klienci", value: "275+" },
      { label: "Dostarczone kontenery", value: "110+" },
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
      "Door-to-door do magazynu lub hali produkcyjnej. Odprawa celna i last mile w UE.",
    hubs: ["Polska", "Europa", "magazyn klienta"],
    metrics: [
      { label: "Kontakt regionalny", value: "+48" },
      { label: "Zakres", value: "odprawa i dostawa" },
      { label: "Wycena", value: "projektowa" },
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
      { label: "Kontakt regionalny", value: "+48" },
      { label: "Tryby", value: "FCL / LCL" },
      { label: "Wycena", value: "projektowa" },
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
      { label: "Kierunek", value: "Europa" },
      { label: "Dostawa", value: "pod adres" },
      { label: "Wycena", value: "projektowa" },
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
      { label: "Kontakt regionalny", value: "+380" },
      { label: "Tryb", value: "multimodalny" },
      { label: "Wycena", value: "projektowa" },
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
    volumeLabel: "wycena projektowa",
    transitDays: "zależnie od ładunku",
    waypoints: [...CORRIDOR_TO_MINSK, [21, 52]],
  },
  {
    id: "cn-de-rail",
    from: "CN",
    to: "DE",
    mode: "rail",
    label: "Kolej: Chiny → Niemcy",
    volume: 85,
    volumeLabel: "wycena projektowa",
    transitDays: "zależnie od ładunku",
    waypoints: [...CORRIDOR_TO_MINSK, [21, 52], [13.4, 52.5]],
  },
  {
    id: "cn-cz-rail",
    from: "CN",
    to: "CZ",
    mode: "rail",
    label: "Kolej: Chiny → Czechy",
    volume: 55,
    volumeLabel: "wycena projektowa",
    transitDays: "zależnie od ładunku",
    waypoints: [...CORRIDOR_TO_MINSK, [21, 52], [14.4, 50.1]],
  },
  {
    id: "cn-ua-rail",
    from: "CN",
    to: "UA",
    mode: "rail",
    label: "Kolej: Chiny → Ukraina",
    volume: 40,
    volumeLabel: "wycena projektowa",
    transitDays: "zależnie od ładunku",
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
    volumeLabel: "wycena projektowa",
    transitDays: "zależnie od ładunku",
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
    volumeLabel: "wycena projektowa",
    transitDays: "zależnie od ładunku",
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
    volumeLabel: "wycena projektowa",
    transitDays: "zależnie od ładunku",
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
    volumeLabel: "wycena projektowa",
    transitDays: "zależnie od ładunku",
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
