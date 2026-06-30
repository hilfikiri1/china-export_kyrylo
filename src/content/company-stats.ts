export { getStatistics, statistics } from "@/content/statistics";
export type { LocalizedString, LocalizedStringArray } from "@/content/statistics";

import type { Locale } from "@/i18n/config";
import { getStatistics } from "@/content/statistics";

export type CompanyStat = {
  id: string;
  value: string;
  label: string;
};

export function getCompanyStats(locale: Locale): CompanyStat[] {
  return getStatistics(locale);
}
