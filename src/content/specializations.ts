import type { LucideIcon } from "lucide-react";
import {
  Battery,
  Building2,
  Cog,
  FlaskConical,
  Package,
  Shirt,
  ShoppingBag,
  Zap,
} from "lucide-react";

export const specializationIds = [
  "machinery",
  "battery",
  "emobility",
  "chemistry",
  "packaging",
  "textiles",
  "construction",
  "consumer",
] as const;

export type SpecializationId = (typeof specializationIds)[number];

const iconMap: Record<SpecializationId, LucideIcon> = {
  machinery: Cog,
  battery: Battery,
  emobility: Zap,
  chemistry: FlaskConical,
  packaging: Package,
  textiles: Shirt,
  construction: Building2,
  consumer: ShoppingBag,
};

export function getSpecializationIcon(id: string): LucideIcon {
  return iconMap[id as SpecializationId] ?? Cog;
}

export type Specialization = {
  id: SpecializationId;
  icon: LucideIcon;
  title: string;
  shortDescription: string;
  extendedDescription: string;
  items: string[];
  examples?: string;
};
