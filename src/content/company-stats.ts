import { companyStatValues } from "@/config/company";

export type CompanyStat = {
  id: string;
  value: string;
  label: string;
};

/**
 * Confirmed public statistics only (Polish master). Translations live in i18n
 * messages under "stats". Values come from src/config/company.ts.
 */
export const companyStats: CompanyStat[] = [
  {
    id: "experience",
    value: `${companyStatValues.experience} lat`,
    label: "doświadczenia we współpracy z Chinami",
  },
  {
    id: "clients",
    value: companyStatValues.clients,
    label: "obsłużonych klientów",
  },
  {
    id: "containers",
    value: companyStatValues.containers,
    label: "dostarczonych kontenerów",
  },
];
