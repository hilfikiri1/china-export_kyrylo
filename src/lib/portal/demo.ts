import type { Project } from "./types";
import type { ProjectDataProvider } from "./provider";

/** Visible only in development. Never bundled or accessible in production. */
const DEMO_PROJECT: Project = {
  token: "demo-bbs-projekt-testowy-2025",
  projectNumber: "BBS-2025-001",
  name: "Linia opakowaniowa — demo",
  currentStage: "production",
  nextStep: "Kontrola jakości przed wysyłką zaplanowana na 20.08.2025",
  plannedDate: "2025-09-15",
  lastUpdatedAt: "2025-08-01T10:30:00Z",
  manager: {
    name: "Anna Kowalska",
    email: "anna@buybringsolutions.com",
    phone: "+48 783 232 971",
  },
  active: true,
  stages: [
    { id: "brief", name: "Brief i specyfikacja", status: "completed", completedAt: "2025-04-10" },
    { id: "sourcing", name: "Wyszukiwanie producenta", status: "completed", completedAt: "2025-05-03" },
    { id: "verification", name: "Weryfikacja fabryki", status: "completed", completedAt: "2025-05-20" },
    { id: "production", name: "Produkcja", status: "current" },
    { id: "qc", name: "Kontrola jakości", status: "upcoming" },
    { id: "shipping", name: "Wysyłka i transport", status: "upcoming" },
    { id: "customs", name: "Odprawa celna", status: "upcoming" },
    { id: "delivery", name: "Dostawa końcowa", status: "upcoming" },
  ],
  updates: [
    {
      id: "u1",
      date: "2025-08-01",
      stage: "Produkcja",
      note: "Produkcja postępuje zgodnie z harmonogramem. Gotowość szacowana na 12 sierpnia.",
    },
    {
      id: "u2",
      date: "2025-07-15",
      stage: "Produkcja",
      note: "Zamówienie potwierdzone. Fabryka rozpoczęła produkcję.",
    },
    {
      id: "u3",
      date: "2025-05-20",
      stage: "Weryfikacja fabryki",
      note: "Audyt fabryki zakończony pozytywnie. Dokumentacja gotowa.",
    },
  ],
  documents: [
    {
      id: "d1",
      name: "Proforma Invoice #2025-042",
      url: "#",
      fileType: "pdf",
      uploadedAt: "2025-07-15",
    },
    {
      id: "d2",
      name: "Raport z audytu fabryki",
      url: "#",
      fileType: "pdf",
      uploadedAt: "2025-05-20",
    },
    {
      id: "d3",
      name: "Specyfikacja techniczna",
      url: "#",
      fileType: "xlsx",
      uploadedAt: "2025-04-12",
    },
  ],
  media: [
    {
      id: "m1",
      type: "image",
      url: "https://images.unsplash.com/photo-1565791380713-1756b9a05343?w=800",
      thumbnailUrl: "https://images.unsplash.com/photo-1565791380713-1756b9a05343?w=400",
      caption: "Linia produkcyjna — etap montażu",
    },
    {
      id: "m2",
      type: "image",
      url: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800",
      thumbnailUrl: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400",
      caption: "Hala produkcyjna",
    },
  ],
  payment: {
    currency: "EUR",
    totalValue: 48500,
    paid: 24250,
    remaining: 24250,
    entries: [
      { id: "p1", date: "2025-07-16", amount: 24250, note: "Zaliczka 50%" },
    ],
  },
  delivery: {
    method: "Transport morski FCL — kontener 20 ft",
    destinationCountry: "Polska",
    destinationAddress: "Warszawa, Mazowieckie",
    containerNumber: "CSQU3054383",
    trackingNumber: "HLCUVAR2507DEMO1",
    trackingUrl: "https://www.searates.com/tracking/",
    estimatedArrival: "2025-09-15",
  },
};

export class DemoProjectProvider implements ProjectDataProvider {
  async getProjectByToken(token: string): Promise<Project | null> {
    if (token === DEMO_PROJECT.token) return DEMO_PROJECT;
    return null;
  }
}
