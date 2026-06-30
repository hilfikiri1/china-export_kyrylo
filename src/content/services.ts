import {
  ClipboardCheck,
  FileText,
  Package,
  Search,
  ShieldCheck,
  Ship,
  Tag,
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
  /** Optional link to a related roadmap stage */
  roadmapStageId?: string;
  /** URL slug for dedicated service page */
  slug?: string;
};

export const servicePhases: ServicePhase[] = [
  {
    id: "pre-production",
    label: "Przed produkcją",
    description: "Od wyszukiwania producenta po kontrolę jakości i OEM.",
    icon: Search,
    gridClassName: "grid gap-4 sm:grid-cols-2 lg:gap-6",
  },
  {
    id: "logistics",
    label: "Logistyka",
    description: "Od fabryki do portu — płatności, konsolidacja i fracht.",
    icon: Ship,
    gridClassName: "grid gap-4 sm:grid-cols-2 lg:gap-6",
  },
  {
    id: "delivery",
    label: "Dostawa w UE",
    description: "Transport, odprawa celna i dostawa pod wskazany adres.",
    icon: Package,
    gridClassName: "grid gap-4 sm:grid-cols-1 lg:gap-6",
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
  },
  {
    id: "qc",
    title: "Kontrola jakości towarów",
    scope:
      "Organizujemy kontrolę jakości na podstawie uzgodnionej specyfikacji, checklisty, próbek referencyjnych i wymagań klienta.",
    icon: ClipboardCheck,
    phase: "pre-production",
    roadmapStageId: "qc",
    slug: "kontrola-jakosci",
  },
  {
    id: "oem",
    title: "Produkcja pod marką własną — Private Label i OEM",
    scope:
      "Pomagamy dostosować produkt, logo, opakowanie, etykiety i instrukcję do wymagań marki oraz rynku docelowego.",
    icon: Tag,
    phase: "pre-production",
    roadmapStageId: "production",
  },
  {
    id: "payment-export",
    title: "Koordynacja płatności i eksportu z Chin",
    scope:
      "Koordynujemy dokumentację handlową i eksportową oraz uzgodniony model współpracy z producentem.",
    icon: FileText,
    phase: "logistics",
    roadmapStageId: "delivery",
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
      "Dobieramy sposób transportu, koordynujemy fracht, dokumentację, odprawę celną oraz dostawę końcową.",
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
