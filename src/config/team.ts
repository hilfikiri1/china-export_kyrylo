/**
 * Regional contact person configuration.
 * Leave fields empty or set `enabled: false` to hide the component.
 * Fill in verified details when available.
 */

export type RegionalContact = {
  /** Set to true only when all required fields are verified */
  enabled: boolean;
  name: string;
  role: string;
  region: string;
  /** Path to photo in /public/team/ */
  photo?: string;
  phone?: string;
  phoneE164?: string;
  whatsapp?: string;
  email?: string;
  /** Short introduction (1–2 sentences) */
  intro?: string;
  /** Languages spoken */
  languages?: string[];
};

/**
 * TODO: Fill in verified details for Kyrylo Podolskyi.
 * Once `enabled: true` and all required fields are set,
 * the RegionalContactCard component will display automatically.
 */
export const primaryContact: RegionalContact = {
  enabled: false,
  name: "", // TODO: Kyrylo Podolskyi
  role: "", // TODO: e.g. "Founder & Managing Director"
  region: "", // TODO: e.g. "Poland / Europe"
  photo: undefined, // TODO: "/team/kyrylo-podolskyi.jpg"
  phone: undefined,
  phoneE164: undefined,
  whatsapp: undefined,
  email: undefined,
  intro: undefined,
  languages: undefined,
};
