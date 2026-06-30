export type RegionalContactPerson = {
  name: string;
  role: string;
  region: string;
  photo: string;
  phone: string;
  whatsapp: string;
  email: string;
  intro: string;
  languages: string[];
};

/**
 * Add verified values here when available (e.g. Kyrylo Podolskyi).
 * Empty `name` keeps the UI hidden.
 */
export const regionalContactPerson: RegionalContactPerson = {
  name: "",
  role: "",
  region: "",
  photo: "",
  phone: "",
  whatsapp: "",
  email: "",
  intro: "",
  languages: [],
};
