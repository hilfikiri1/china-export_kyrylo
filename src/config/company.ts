/**
 * Central company facts.
 *
 * These are locale-independent business facts. Edit values here to update them
 * everywhere on the website. Do NOT add unverified marketing claims.
 *
 * See CONTENT_EDITING_GUIDE.md (Russian) for editing instructions.
 */

export const company = {
  /** Primary public brand name. */
  name: "Buy & Bring Solutions",
  /** Short brand form. */
  shortName: "B&BS",
  /** Regional label used where a Poland-specific reference is helpful. */
  regionalName: "B&BS Poland",
  /** Two-letter brand mark shown in the logo lockup. */
  logoMark: "B&B",
  /** Recommended Polish descriptor (master copy). Translations live in i18n messages. */
  descriptorPl: "Import, sourcing i produkcja w Chinach dla firm",
  /** Operational presence in China (verified). */
  chinaPresence: "Foshan, Guangdong, Chiny",
} as const;

/**
 * Confirmed public company statistics. Use these consistently across the site.
 * Do NOT add unverified numbers (reviews, ratings, monthly shipments, etc.).
 *
 * The experience belongs to the Buy & Bring Solutions team and operations as a
 * whole — it is NOT a claim that a Polish office has existed for 17 years.
 */
export type CompanyStatId = "experience" | "clients" | "containers";

export const companyStatValues: Record<CompanyStatId, string> = {
  experience: "17",
  clients: "275+",
  containers: "110+",
};

/**
 * Legal entity data. Values are intentionally empty until verified by the
 * owner. UI must hide any element that would render an empty value.
 * See CONTENT_EDITING_GUIDE.md.
 */
export const legal = {
  legalEntityName: "",
  registrationNumber: "",
  vatNumber: "",
  dataControllerDetails: "",
} as const;

export function hasLegalData(): boolean {
  return Object.values(legal).some((value) => value.trim().length > 0);
}
