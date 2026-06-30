import type { Messages } from "@/i18n/get-dictionary";
import { statistics } from "@/content/statistics";
import {
  heroFlowRoutes as staticRoutes,
  type HeroFlowRoute,
  type HeroMapCountry,
} from "@/content/hero-map";
import { getMessageArray, getMessageObject } from "@/i18n/translate";

const countryGeo: Record<
  string,
  Pick<HeroMapCountry, "id" | "geoId" | "lat" | "lng">
> = {
  CN: { id: "CN", geoId: "CHN", lat: 23.02, lng: 113.12 },
  PL: { id: "PL", geoId: "POL", lat: 52, lng: 19 },
  DE: { id: "DE", geoId: "DEU", lat: 51, lng: 10 },
  CZ: { id: "CZ", geoId: "CZE", lat: 50, lng: 15 },
  UA: { id: "UA", geoId: "UKR", lat: 50, lng: 30 },
};

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
    const geo = countryGeo[country.id];
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
