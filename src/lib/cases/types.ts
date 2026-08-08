import type { Locale } from "@/i18n/config";

export type LocalizedCaseStudy = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  challenge?: string;
  requirements?: string[];
  scope: string[];
  products?: string[];
  result: string;
  coverImage: string;
  gallery: Array<{ src: string; alt: string }>;
  country?: string;
  date?: string;
  status?: string;
  locale?: Locale;
};
