import { heroMapLocations } from "@/content/hero-map";
import type { HeroMapCountry } from "@/content/hero-map";
import {
  geometryToPaths,
  type MultiPolygonGeometry,
  type PolygonGeometry,
} from "@/lib/geo";
import countriesGeo from "../../public/geo/countries-low.json";

export type HeroCountryGeometry = {
  country: Pick<HeroMapCountry, "id" | "geoId" | "type">;
  paths: string[];
};

export const heroCountryGeometries: HeroCountryGeometry[] = heroMapLocations.map(
  (location) => {
    const feature = countriesGeo.features.find(
      (entry) => entry.id === location.geoId,
    );

    if (!feature) {
      return {
        country: {
          id: location.id,
          geoId: location.geoId,
          type: location.type,
        },
        paths: [],
      };
    }

    return {
      country: {
        id: location.id,
        geoId: location.geoId,
        type: location.type,
      },
      paths: geometryToPaths(
        feature.geometry as PolygonGeometry | MultiPolygonGeometry,
      ),
    };
  },
);
