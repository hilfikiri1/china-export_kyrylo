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
import type { Messages } from "@/i18n/get-dictionary";
import { getMessageObject } from "@/i18n/translate";
import type {
  ServiceModule,
  ServicePhase,
  ServicePhaseId,
} from "@/content/services";

const phaseIcons: Record<ServicePhaseId, LucideIcon> = {
  "pre-production": Search,
  logistics: Ship,
  delivery: Package,
};

const moduleIcons: Record<string, LucideIcon> = {
  sourcing: Search,
  verification: ShieldCheck,
  qc: ClipboardCheck,
  oem: Tag,
  "payment-export": FileText,
  consolidation: Package,
  freight: Ship,
};

const moduleMeta: Array<{
  id: string;
  phase: ServicePhaseId;
  roadmapStageId?: string;
  slug?: string;
}> = [
  {
    id: "sourcing",
    phase: "pre-production",
    roadmapStageId: "sourcing",
    slug: "wyszukiwanie-dostawcow",
  },
  {
    id: "verification",
    phase: "pre-production",
    roadmapStageId: "verification",
    slug: "audyty-fabryk",
  },
  {
    id: "qc",
    phase: "pre-production",
    roadmapStageId: "qc",
    slug: "kontrola-jakosci",
  },
  {
    id: "oem",
    phase: "pre-production",
    roadmapStageId: "production",
  },
  {
    id: "payment-export",
    phase: "logistics",
    roadmapStageId: "delivery",
  },
  { id: "consolidation", phase: "logistics" },
  {
    id: "freight",
    phase: "delivery",
    roadmapStageId: "delivery",
    slug: "spedycja-i-logistyka",
  },
];

const phaseGrid: Record<ServicePhaseId, { gridClassName: string; panelClassName?: string }> = {
  "pre-production": { gridClassName: "grid gap-4 sm:grid-cols-2 lg:gap-6" },
  logistics: { gridClassName: "grid gap-4 sm:grid-cols-2 lg:gap-6" },
  delivery: {
    gridClassName: "grid gap-4 sm:grid-cols-1 lg:gap-6",
    panelClassName: "mx-auto max-w-3xl",
  },
};

type PhaseMessages = Record<
  string,
  { label: string; description: string }
>;

type ModuleMessages = Record<
  string,
  { title: string; scope: string }
>;

export function getServicePhases(messages: Messages): ServicePhase[] {
  const phases = getMessageObject<PhaseMessages>(messages, "services.phases");
  if (!phases) return [];

  return (["pre-production", "logistics", "delivery"] as ServicePhaseId[]).map(
    (id) => ({
      id,
      label: phases[id]?.label ?? id,
      description: phases[id]?.description ?? "",
      icon: phaseIcons[id],
      ...phaseGrid[id],
    }),
  );
}

export function getServiceModules(messages: Messages): ServiceModule[] {
  const modules = getMessageObject<ModuleMessages>(messages, "services.modules");
  if (!modules) return [];

  return moduleMeta.map((meta) => ({
    ...meta,
    title: modules[meta.id]?.title ?? meta.id,
    scope: modules[meta.id]?.scope ?? "",
    icon: moduleIcons[meta.id] ?? Search,
  }));
}

export function getServiceById(
  messages: Messages,
  id: string,
): ServiceModule | undefined {
  return getServiceModules(messages).find((s) => s.id === id);
}

export function getServicesByPhase(
  messages: Messages,
  phaseId: ServicePhaseId,
): ServiceModule[] {
  return getServiceModules(messages).filter((s) => s.phase === phaseId);
}

export function getServiceBySlug(
  messages: Messages,
  slug: string,
): ServiceModule | undefined {
  return getServiceModules(messages).find((s) => s.slug === slug);
}

export function getServiceNavSlugs(): string[] {
  return moduleMeta.filter((m) => m.slug).map((m) => m.slug!);
}
