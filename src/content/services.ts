import {
  ClipboardCheck,
  FileText,
  Package,
  Search,
  ShieldCheck,
  Ship,
  Tag,
  Truck,
  type LucideIcon,
} from "lucide-react";

export type ServicePhaseId = "pre-production" | "logistics" | "delivery";

export type ServicePhase = {
  id: ServicePhaseId;
  label: string;
  description: string;
  icon: LucideIcon;
  gridClassName: string;
  panelClassName?: string;
};

export type ServiceModule = {
  id: string;
  title: string;
  scope: string;
  icon: LucideIcon;
  phase: ServicePhaseId;
  roadmapStageId?: string;
  slug?: string;
  clientReceives?: string[];
};

export const servicePhases: ServicePhase[] = [
  {
    id: "pre-production",
    label: "Przed produkcją",
    description: "Sourcing, weryfikacja producenta, próbki, Private Label i kontrola jakości.",
    icon: Search,
    gridClassName: "grid gap-4 sm:grid-cols-2 lg:gap-6",
  },
  {
    id: "logistics",
    label: "Eksport i logistyka",
    description: "Dokumentacja, konsolidacja, płatności według ustaleń i przygotowanie wysyłki.",
    icon: Ship,
    gridClassName: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6",
  },
  {
    id: "delivery",
    label: "Transport i odprawa",
    description: "Fracht, odprawa celna, koszty po stronie importu i dostawa końcowa.",
    icon: Truck,
    gridClassName: "grid gap-4 sm:grid-cols-2 lg:gap-6",
    panelClassName: "mx-auto max-w-3xl",
  },
];

export const serviceModules: ServiceModule[] = [
  {
    id: "sourcing",
    title: "Wyszukiwanie producentów i organizacja zakupu",
    scope:
      "Wyszukujemy producentów, zbieramy i porównujemy oferty, analizujemy MOQ, terminy, konfiguracje oraz warunki płatności i dostawy.",
    icon: Search,
    phase: "pre-production",
    roadmapStageId: "sourcing",
    slug: "wyszukiwanie-dostawcow",
    clientReceives: [
      "shortlist producentów",
      "porównanie ofert",
      "informacje o MOQ i terminach",
      "ocenę mocnych stron i ryzyk",
      "rekomendację kolejnych kroków",
    ],
  },
  {
    id: "verification",
    title: "Weryfikacja dostawców i audyty fabryk",
    scope:
      "Sprawdzamy dane rejestrowe, zakres działalności, możliwości produkcyjne, dokumentację i zgodność fabryki z wymaganiami projektu.",
    icon: ShieldCheck,
    phase: "pre-production",
    roadmapStageId: "verification",
    slug: "audyty-fabryk",
    clientReceives: [
      "zdalną weryfikację dokumentów",
      "wideoweryfikację na żywo, gdy jest potrzebna",
      "audyt fizyczny jako osobny zakres projektu",
    ],
  },
  {
    id: "qc",
    title: "Kontrola jakości towarów",
    scope:
      "Organizujemy kontrolę jakości na podstawie uzgodnionej specyfikacji, checklisty, próbek referencyjnych i wymagań klienta.",
    icon: ClipboardCheck,
    phase: "pre-production",
    roadmapStageId: "quality",
    slug: "kontrola-jakosci",
    clientReceives: [
      "kontrolę przed rozpoczęciem produkcji",
      "kontrolę w trakcie produkcji",
      "inspekcję przed wysyłką",
      "nadzór nad załadunkiem kontenera",
    ],
  },
  {
    id: "oem",
    title: "Produkcja pod marką własną — Private Label i OEM",
    scope:
      "Pomagamy dostosować produkt, logo, opakowanie, etykiety i instrukcję do wymagań marki oraz rynku docelowego. Pomagamy zweryfikować dostępność dokumentów producenta i wymagania rynku docelowego.",
    icon: Tag,
    phase: "pre-production",
  },
  {
    id: "payment-export",
    title: "Koordynacja płatności i eksportu z Chin",
    scope:
      "Koordynujemy dokumentację handlową i eksportową oraz uzgodniony model współpracy z producentem.",
    icon: FileText,
    phase: "logistics",
    roadmapStageId: "quality",
  },
  {
    id: "consolidation",
    title: "Konsolidacja towarów od wielu producentów",
    scope:
      "Organizujemy odbiór towarów z kilku fabryk, magazynowanie, kontrolę kompletności, przeładunek i przygotowanie wspólnej wysyłki.",
    icon: Package,
    phase: "logistics",
  },
  {
    id: "freight",
    title: "Transport, odprawa celna i dostawa",
    scope:
      "Dobieramy sposób transportu, koordynujemy fracht, dokumentację, odprawę celną oraz dostawę końcową: FCL, LCL, kolej, transport lotniczy, drogowy i rozwiązania multimodalne.",
    icon: Ship,
    phase: "delivery",
    roadmapStageId: "delivery",
    slug: "spedycja-i-logistyka",
  },
];

export function getServiceById(id: string): ServiceModule | undefined {
  return serviceModules.find((s) => s.id === id);
}

export function getServicesByPhase(phaseId: ServicePhaseId): ServiceModule[] {
  return serviceModules.filter((s) => s.phase === phaseId);
}

export function getPhaseById(phaseId: ServicePhaseId): ServicePhase | undefined {
  return servicePhases.find((p) => p.id === phaseId);
}

export function getServiceBySlug(slug: string): ServiceModule | undefined {
  return serviceModules.find((s) => s.slug === slug);
}

export function getServiceNavSlugs(): string[] {
  return serviceModules
    .filter((s): s is ServiceModule & { slug: string } => Boolean(s.slug))
    .map((s) => s.slug);
}
