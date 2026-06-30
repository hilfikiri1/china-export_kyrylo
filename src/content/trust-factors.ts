import {
  Building2,
  Eye,
  MapPin,
  ShieldCheck,
  Truck,
  type LucideIcon,
} from "lucide-react";
import type { Messages } from "@/i18n/get-dictionary";
import { getMessageObject } from "@/i18n/translate";

export type TrustFactor = {
  id: string;
  icon: LucideIcon;
  label: string;
  description: string;
};

type TrustMessages = Record<string, { title: string; description: string }>;

export function getTrustFactors(messages: Messages): TrustFactor[] {
  const trust = getMessageObject<TrustMessages>(messages, "home.trust");
  if (!trust) return [];

  return [
    {
      id: "local-china",
      icon: MapPin,
      label: trust.localChina?.title ?? "",
      description: trust.localChina?.description ?? "",
    },
    {
      id: "verification",
      icon: Eye,
      label: trust.verification?.title ?? "",
      description: trust.verification?.description ?? "",
    },
    {
      id: "quality",
      icon: ShieldCheck,
      label: trust.quality?.title ?? "",
      description: trust.quality?.description ?? "",
    },
    {
      id: "logistics",
      icon: Truck,
      label: trust.logistics?.title ?? "",
      description: trust.logistics?.description ?? "",
    },
    {
      id: "flexible",
      icon: Building2,
      label: trust.flexible?.title ?? "",
      description: trust.flexible?.description ?? "",
    },
  ];
}
