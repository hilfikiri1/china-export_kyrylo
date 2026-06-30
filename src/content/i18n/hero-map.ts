import type { Messages } from "@/i18n/get-dictionary";
import { statistics } from "@/content/statistics";
import {
  heroFlowRoutes as staticRoutes,
  heroMapLocations,
  type HeroFlowRoute,
  type HeroMapCountry,
  type MapLocationType,
} from "@/content/hero-map";
import { getMessageArray, getMessageObject } from "@/i18n/translate";

const locationGeo = Object.fromEntries(
  heroMapLocations.map((location) => [
    location.id,
    {
      id: location.id,
      geoId: location.geoId,
      lat: location.coordinates[1],
      lng: location.coordinates[0],
      type: location.type,
    },
  ]),
) as Record<
  string,
  Pick<HeroMapCountry, "id" | "geoId" | "lat" | "lng" | "type">
>;

type CountryMessage = {
  id: string;
  name: string;
  role: string;
  description: string;
  hubs: string[];
  metrics: Array<{ label: string; value: string }>;
};

type RouteMessage = {
  id: string;
  label: string;
  volumeLabel: string;
  transitDays: string;
};

export function getHeroMapCountries(messages: Messages): HeroMapCountry[] {
  const countries = getMessageArray<CountryMessage>(
    messages,
    "home.heroMap.countries",
  );

  return countries.map((country) => {
    const geo = locationGeo[country.id];
    if (!geo) {
      throw new Error(`Missing hero map geo for ${country.id}`);
    }

    const metrics =
      country.id === "CN"
        ? [
            {
              label: country.metrics[0]?.label ?? "",
              value: `${statistics.experience.value} ${country.metrics[0]?.value ?? ""}`,
            },
            {
              label: country.metrics[1]?.label ?? "",
              value: statistics.clients.value,
            },
            {
              label: country.metrics[2]?.label ?? "",
              value: statistics.foshan.value,
            },
          ]
        : country.metrics;

    return {
      ...geo,
      name: country.name,
      role: country.role,
      description: country.description,
      hubs: country.hubs,
      metrics,
    };
  });
}

export function getHeroFlowRoutes(messages: Messages): HeroFlowRoute[] {
  const routes = getMessageArray<RouteMessage>(messages, "home.heroMap.routes");

  return staticRoutes.map((route) => {
    const copy = routes.find((r) => r.id === route.id);
    return {
      ...route,
      label: copy?.label ?? route.label,
      volumeLabel: copy?.volumeLabel ?? route.volumeLabel,
      transitDays: copy?.transitDays ?? route.transitDays,
    };
  });
}

export function getHeroMapTransportModes(messages: Messages) {
  return (
    getMessageObject<{ rail: string; air: string }>(
      messages,
      "home.heroMap.transportModes",
    ) ?? { rail: "Rail", air: "Air" }
  );
}

export function getHeroMapInstructions(messages: Messages) {
  return (
    getMessageObject<{ hover: string; tap: string }>(
      messages,
      "home.heroMap.instructions",
    ) ?? { hover: "", tap: "" }
  );
}

export function getHeroMapBadgeLabel(
  messages: Messages,
  type: MapLocationType,
): string {
  const badges = getMessageObject<Record<MapLocationType, string>>(
    messages,
    "home.heroMap.badges",
  );
  return badges?.[type] ?? type;
}
