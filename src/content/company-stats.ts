export type CompanyStat = {
  id: string;
  value: string;
  label: string;
};

/** Verified public statistics — do not change without confirmation */
export const companyStats: CompanyStat[] = [
  {
    id: "experience",
    value: "17 lat",
    label: "doświadczenia we współpracy z Chinami",
  },
  {
    id: "clients",
    value: "275+",
    label: "obsłużonych klientów",
  },
  {
    id: "containers",
    value: "110+",
    label: "dostarczonych kontenerów",
  },
  {
    id: "location",
    value: "Foshan",
    label: "operacje i wsparcie na miejscu w Chinach",
  },
];
