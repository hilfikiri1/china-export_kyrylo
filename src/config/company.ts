/**
 * Central company facts — edit here to update everywhere.
 * These values do NOT require translation (they are factual, brand-specific data).
 */

export const company = {
  /** Primary brand name */
  name: "Buy & Bring Solutions",
  /** Short brand form */
  shortName: "B&BS",
  /** Regional label for Polish market */
  regionalName: "B&BS Poland",
  /** Polish market descriptor */
  descriptor: "Import, sourcing i produkcja w Chinach dla firm",

  /** Official domain */
  domain: "buybringsolutions.com",
  /** Official email (same in all locales) */
  email: "contact@buybringsolutions.com",

  /** Company statistics — only verified public data */
  stats: {
    experience: { value: "17", label: "lat doświadczenia we współpracy z Chinami" },
    clients: { value: "275+", label: "obsłużonych klientów" },
    containers: { value: "110+", label: "dostarczonych kontenerów" },
    location: { value: "Foshan", label: "operacje i wsparcie na miejscu w Chinach" },
  },

  /** Legal entity information — fill in when verified */
  legal: {
    entityName: "", // TODO: Add verified legal entity name
    registrationNumber: "", // TODO: Add registration number
    vatNumber: "", // TODO: Add VAT number
    dataControllerDetails: "", // TODO: Add data controller details
  },

  /** Operational presence (verified) */
  operations: {
    china: {
      city: "Foshan",
      province: "Guangdong",
      country: "China",
      address:
        "4th floor, B lift, Block D8, Core District of Guangdong New Lighting Base, Shishan Town, Foshan City, Guangdong Province, China, 528200",
    },
    ukraine: {
      city: "Odesa",
      country: "Ukraine",
      address: "65074, M. Babadzhanyana 25B, Odesa, Ukraine",
    },
  },
} as const;
