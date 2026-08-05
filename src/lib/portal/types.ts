export type ProjectStageStatus = "completed" | "current" | "upcoming";

export type ProjectStage = {
  id: string;
  name: string;
  status: ProjectStageStatus;
  completedAt?: string;
};

export type ProjectUpdate = {
  id: string;
  date: string;
  stage: string;
  note: string;
};

export type ProjectDocument = {
  id: string;
  name: string;
  url: string;
  fileType: string;
  uploadedAt: string;
};

export type ProjectMedia = {
  id: string;
  type: "image" | "video";
  url: string;
  thumbnailUrl?: string;
  caption?: string;
};

export type ProjectPaymentEntry = {
  id: string;
  date: string;
  amount: number;
  note: string;
};

export type ProjectPayment = {
  currency: string;
  totalValue: number;
  paid: number;
  remaining: number;
  entries: ProjectPaymentEntry[];
};

export type ProjectDelivery = {
  method: string;
  destinationCountry: string;
  destinationAddress?: string;
  containerNumber?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  estimatedArrival?: string;
};

export type ProjectManager = {
  name: string;
  email: string;
  phone?: string;
};

export type Project = {
  /** Internal token — never display to the user */
  token: string;
  /** User-visible project number, e.g. "BBS-2025-042" */
  projectNumber: string;
  name: string;
  currentStage: string;
  nextStep?: string;
  plannedDate?: string;
  lastUpdatedAt: string;
  manager: ProjectManager;
  stages: ProjectStage[];
  updates: ProjectUpdate[];
  documents: ProjectDocument[];
  media: ProjectMedia[];
  payment: ProjectPayment;
  delivery: ProjectDelivery;
  active: boolean;
};
