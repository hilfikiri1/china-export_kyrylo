import { getStatistics, type LocalizedStatistic } from "@/content/statistics";

export type CompanyStat = LocalizedStatistic;

export const companyStats: CompanyStat[] = getStatistics("pl");
