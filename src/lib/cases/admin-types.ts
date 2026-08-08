export type EditableCaseMediaRef =
  | {
      kind: "url";
      value: string;
      name?: string;
      previewUrl?: string;
    }
  | {
      kind: "upload";
      id: string;
      name: string;
      previewUrl?: string;
    };

export type EditableCaseMediaState = {
  cover?: EditableCaseMediaRef;
  gallery: EditableCaseMediaRef[];
};

export type AdminNotionCaseSummary = {
  id: string;
  notionUrl: string;
  title: string;
  slug: string;
  category: string;
  publishedAt?: string;
  status: "Published" | "Draft";
  published: boolean;
  archived: boolean;
  featured: boolean;
  coverImage?: string;
};

export type AdminNotionCase = AdminNotionCaseSummary & {
  clientLabel: string;
  excerpt: string;
  country: string;
  challenge: string;
  requirements: string[];
  work: string[];
  products: string[];
  result: string;
  outcome: string;
  orderValueUsd?: number;
  deliveryMethod: string;
  videoUrl: string;
  media: EditableCaseMediaState;
};
