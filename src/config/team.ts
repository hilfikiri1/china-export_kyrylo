import type { RegionId } from "@/config/contacts";

/**
 * Optional regional contact people.
 *
 * Leave this array EMPTY until verified personal data is provided. The
 * `RegionalContactPerson` component renders nothing when no entry exists, so
 * the website never shows placeholder or invented people.
 *
 * To activate (e.g. for Kyrylo Podolskyi), add a fully verified entry below.
 * See CONTENT_EDITING_GUIDE.md.
 */
export type ContactPerson = {
  id: string;
  region: RegionId;
  name: string;
  role: string;
  photo?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  intro?: string;
  languages?: string[];
};

export const contactPeople: ContactPerson[] = [
  // TODO (owner): add verified contact person, e.g.:
  // {
  //   id: "kyrylo",
  //   region: "ua",
  //   name: "Kyrylo Podolskyi",
  //   role: "",            // TODO: verified role
  //   photo: "/team/kyrylo.jpg",
  //   phone: "",           // TODO
  //   whatsapp: "",        // TODO
  //   email: "contact@buybringsolutions.com",
  //   intro: "",           // TODO
  //   languages: [],       // TODO e.g. ["uk", "ru", "en"]
  // },
];

export function getContactPersonForRegion(
  region: RegionId,
): ContactPerson | undefined {
  return contactPeople.find((person) => person.region === region);
}
