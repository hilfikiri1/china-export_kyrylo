/**
 * Centralized hero map configuration.
 * Country `id` uses ISO-2; `geoId` uses ISO-3 for GeoJSON polygon matching.
 */

import { statistics } from "@/content/statistics";

export type MapLocationType =
  | "operations"
  | "company-presence"
  | "client-market";

export type MapLocation = {
  id: string;
  countryCode: string;
  geoId: string;
  coordinates: [number, number];
  type: MapLocationType;
};

export type HeroMapMetric = {
  label: string;
  value: string;
};

export type HeroMapCountry = {
  id: string;
  geoId: string;
  lat: number;
  lng: number;
  type: MapLocationType;
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
  to: "DE" | "PL" | "UA" | "EE" | "LV" | "LT" | "BG";
  mode: FlowMode;
  label: string;
  volume: number;
  volumeLabel: string;
  transitDays: string;
  waypoints: [number, number][];
};

export const heroMapLocations: MapLocation[] = [
  {
    id: "CN",
    countryCode: "CN",
    geoId: "CHN",
    coordinates: [113.12, 23.02],
    type: "operations",
  },
  {
    id: "UA",
    countryCode: "UA",
    geoId: "UKR",
    coordinates: [30, 50],
    type: "company-presence",
  },
  {
    id: "PL",
    countryCode: "PL",
    geoId: "POL",
    coordinates: [19, 52],
    type: "company-presence",
  },
  {
    id: "DE",
    countryCode: "DE",
    geoId: "DEU",
    coordinates: [10, 51],
    type: "client-market",
  },
  {
    id: "EE",
    countryCode: "EE",
    geoId: "EST",
    coordinates: [25.5, 59],
    type: "client-market",
  },
  {
    id: "LV",
    countryCode: "LV",
    geoId: "LVA",
    coordinates: [25, 57],
    type: "client-market",
  },
  {
    id: "LT",
    countryCode: "LT",
    geoId: "LTU",
    coordinates: [24, 55.5],
    type: "client-market",
  },
  {
    id: "BG",
    countryCode: "BG",
    geoId: "BGR",
    coordinates: [25, 43],
    type: "client-market",
  },
];

/** Shared Eurasian land-bridge corridor to Minsk */
const CORRIDOR_TO_MINSK: [number, number][] = [
  [116, 34],
  [87, 43],
  [76, 43],
  [55, 51],
  [37, 55],
  [27, 54],
];

const CORRIDOR_TO_POLAND: [number, number][] = [
  ...CORRIDOR_TO_MINSK,
  [21, 52],
];

export const heroMapCountries: HeroMapCountry[] = heroMapLocations.map(
  (location) => {
    const [lng, lat] = location.coordinates;
    const defaults: Record<string, Omit<HeroMapCountry, "id" | "geoId" | "lat" | "lng" | "type">> = {
      CN: {
        name: "Chiny",
        role: "Operacje w Chinach",
        description:
          "Operacje w Foshan: kontakt z producentami, inspekcje, konsolidacja i dokumentacja eksportowa.",
        hubs: ["Foshan"],
        metrics: [
          { label: "Doświadczenie", value: `${statistics.experience.value} lat` },
          { label: "Obsłużeni klienci", value: statistics.clients.value },
          { label: "Baza operacyjna", value: statistics.foshan.value },
        ],
      },
      UA: {
        name: "Ukraina",
        role: "Baza firmy",
        description:
          "Reprezentacja Buy & Bring Solutions na Ukrainie — wsparcie klientów, koordynacja projektów i komunikacja z zespołem w Chinach.",
        hubs: ["Kijów", "Lwów", "Odessa"],
        metrics: [
          { label: "Obsługa", value: "Pełna" },
          { label: "Języki", value: "UK / PL / EN" },
          { label: "Wsparcie", value: "Door-to-door" },
        ],
      },
      PL: {
        name: "Polska",
        role: "Baza firmy",
        description:
          "Siedziba Buy & Bring Solutions w Polsce — koordynacja importu, odprawa celna i dostawa do magazynu klienta.",
        hubs: ["Gdańsk", "Gdynia", "Wrocław"],
        metrics: [
          { label: "Dostarczone kontenery", value: statistics.containers.value },
          { label: "Obsługa celna", value: "Pełna" },
          { label: "Dostawa", value: "Door-to-door" },
        ],
      },
      DE: {
        name: "Niemcy",
        role: "Rynek klientów",
        description:
          "Tranzyt i konsolidacja ładunków dla klientów w Niemczech z dostawą door-to-door.",
        hubs: ["Hamburg", "Frankfurt", "Monachium", "Berlin"],
        metrics: [
          { label: "Tryby transportu", value: "Morski / kolej / lotniczy" },
          { label: "Obsługa FCL / LCL", value: "Tak" },
          { label: "Dostawa", value: "Door-to-door" },
        ],
      },
      EE: {
        name: "Estonia",
        role: "Rynek klientów",
        description:
          "Dostawy B2B dla firm w Estonii z pełną obsługą importu z Chin.",
        hubs: ["Tallinn", "Tartu"],
        metrics: [
          { label: "Tryby transportu", value: "Morski / kolej / lotniczy" },
          { label: "Obsługa importu", value: "Pełna" },
          { label: "Dostawa", value: "Door-to-door" },
        ],
      },
      LV: {
        name: "Łotwa",
        role: "Rynek klientów",
        description:
          "Import towarów i komponentów B2B dla klientów na Łotwie.",
        hubs: ["Ryga", "Liepāja"],
        metrics: [
          { label: "Tryby transportu", value: "Morski / kolej / lotniczy" },
          { label: "Obsługa importu", value: "Pełna" },
          { label: "Dostawa", value: "Door-to-door" },
        ],
      },
      LT: {
        name: "Litwa",
        role: "Rynek klientów",
        description:
          "Wsparcie firm litewskich w imporcie produktów i komponentów z Chin.",
        hubs: ["Wilno", "Kłajpeda"],
        metrics: [
          { label: "Tryby transportu", value: "Morski / kolej / lotniczy" },
          { label: "Obsługa importu", value: "Pełna" },
          { label: "Dostawa", value: "Door-to-door" },
        ],
      },
      BG: {
        name: "Bułgaria",
        role: "Rynek klientów",
        description:
          "Dostawy B2B dla producentów i dystrybutorów w Bułgarii z pełną obsługą importu.",
        hubs: ["Sofia", "Płowdiw", "Warna"],
        metrics: [
          { label: "Tryby transportu", value: "Morski / kolej / lotniczy" },
          { label: "Obsługa importu", value: "Pełna" },
          { label: "Dostawa", value: "Door-to-door" },
        ],
      },
    };

    const copy = defaults[location.id];
    if (!copy) {
      throw new Error(`Missing default copy for map location: ${location.id}`);
    }

    return {
      id: location.id,
      geoId: location.geoId,
      lat,
      lng,
      type: location.type,
      ...copy,
    };
  },
);

export const heroFlowRoutes: HeroFlowRoute[] = [
  {
    id: "cn-pl-rail",
    from: "CN",
    to: "PL",
    mode: "rail",
    label: "Kolej: Chiny → Polska",
    volume: 100,
    volumeLabel: "Fracht kolejowy",
    transitDays: "Zależnie od trasy",
    waypoints: CORRIDOR_TO_POLAND,
  },
  {
    id: "cn-de-rail",
    from: "CN",
    to: "DE",
    mode: "rail",
    label: "Kolej: Chiny → Niemcy",
    volume: 85,
    volumeLabel: "Fracht kolejowy",
    transitDays: "Zależnie od trasy",
    waypoints: [...CORRIDOR_TO_POLAND, [13.4, 52.5]],
  },
  {
    id: "cn-ua-rail",
    from: "CN",
    to: "UA",
    mode: "rail",
    label: "Kolej: Chiny → Ukraina",
    volume: 40,
    volumeLabel: "Fracht kolejowy",
    transitDays: "Zależnie od trasy",
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
    transitDays: "Zależnie od trasy",
    waypoints: [
      [113.12, 23.02],
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
    transitDays: "Zależnie od trasy",
    waypoints: [
      [113.12, 23.02],
      [55, 48],
      [13.4, 52.5],
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
    transitDays: "Zależnie od trasy",
    waypoints: [
      [113.12, 23.02],
      [50, 44],
      [30.5, 50.4],
    ],
  },
  {
    id: "cn-ee-air",
    from: "CN",
    to: "EE",
    mode: "air",
    label: "Lotniczy: Chiny → Estonia",
    volume: 12,
    volumeLabel: "Fracht lotniczy",
    transitDays: "Zależnie od trasy",
    waypoints: [
      [113.12, 23.02],
      [55, 50],
      [25.5, 59],
    ],
  },
  {
    id: "cn-lv-air",
    from: "CN",
    to: "LV",
    mode: "air",
    label: "Lotniczy: Chiny → Łotwa",
    volume: 10,
    volumeLabel: "Fracht lotniczy",
    transitDays: "Zależnie od trasy",
    waypoints: [
      [113.12, 23.02],
      [52, 48],
      [25, 57],
    ],
  },
  {
    id: "cn-lt-air",
    from: "CN",
    to: "LT",
    mode: "air",
    label: "Lotniczy: Chiny → Litwa",
    volume: 10,
    volumeLabel: "Fracht lotniczy",
    transitDays: "Zależnie od trasy",
    waypoints: [
      [113.12, 23.02],
      [50, 46],
      [24, 55.5],
    ],
  },
  {
    id: "cn-bg-air",
    from: "CN",
    to: "BG",
    mode: "air",
    label: "Lotniczy: Chiny → Bułgaria",
    volume: 14,
    volumeLabel: "Fracht lotniczy",
    transitDays: "Zależnie od trasy",
    waypoints: [
      [113.12, 23.02],
      [48, 40],
      [25, 43],
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

export function getFlowRoutesByDestination(countryId: string): HeroFlowRoute[] {
  return heroFlowRoutes.filter((r) => r.to === countryId);
}

export function getMapLocationTypeColors(type: MapLocationType): {
  fill: string;
  fillHover: string;
  stroke: string;
  strokeHover: string;
  marker: string;
  badge: string;
} {
  switch (type) {
    case "operations":
      return {
        fill: "color-mix(in srgb, var(--map-operations) 14%, transparent)",
        fillHover: "color-mix(in srgb, var(--map-operations) 24%, transparent)",
        stroke: "color-mix(in srgb, var(--map-operations) 42%, transparent)",
        strokeHover: "color-mix(in srgb, var(--map-operations) 75%, transparent)",
        marker: "var(--map-operations)",
        badge: "var(--map-operations)",
      };
    case "company-presence":
      return {
        fill: "color-mix(in srgb, var(--map-presence) 12%, transparent)",
        fillHover: "color-mix(in srgb, var(--map-presence) 22%, transparent)",
        stroke: "color-mix(in srgb, var(--map-presence) 40%, transparent)",
        strokeHover: "color-mix(in srgb, var(--map-presence) 72%, transparent)",
        marker: "var(--map-presence)",
        badge: "var(--map-presence)",
      };
    case "client-market":
      return {
        fill: "color-mix(in srgb, var(--map-client) 10%, transparent)",
        fillHover: "color-mix(in srgb, var(--map-client) 20%, transparent)",
        stroke: "color-mix(in srgb, var(--map-client) 38%, transparent)",
        strokeHover: "color-mix(in srgb, var(--map-client) 70%, transparent)",
        marker: "var(--map-client)",
        badge: "var(--map-client)",
      };
  }
}
