import {
  Building2,
  Eye,
  Layers,
  MapPin,
  ShieldCheck,
  Truck,
  type LucideIcon,
} from "lucide-react";
import type { Messages } from "@/i18n/get-dictionary";

export type TrustFactor = {
  id: string;
  icon: LucideIcon;
  label: string;
  description: string;
};

export function getTrustFactors(messages: Messages): TrustFactor[] {
  return [
    {
      id: "local-china",
      icon: MapPin,
      label: messages.trust.localChina.title,
      description: messages.trust.localChina.description,
    },
    {
      id: "verification",
      icon: Eye,
      label: messages.trust.verification.title,
      description: messages.trust.verification.description,
    },
    {
      id: "quality",
      icon: ShieldCheck,
      label: messages.trust.quality.title,
      description: messages.trust.quality.description,
    },
    {
      id: "logistics",
      icon: Truck,
      label: messages.trust.logistics.title,
      description: messages.trust.logistics.description,
    },
    {
      id: "flexible",
      icon: Layers,
      label: messages.trust.flexible.title,
      description: messages.trust.flexible.description,
    },
  ];
}

/** @deprecated Use getTrustFactors(messages) instead */
export const trustFactors: TrustFactor[] = [
  {
    id: "local-china",
    icon: MapPin,
    label: "Działamy na miejscu w Chinach",
    description:
      "Nasz zespół operacyjny w Foshan kontaktuje się z producentami, koordynuje zamówienia oraz organizuje kontrole i wysyłki.",
  },
  {
    id: "verification",
    icon: Eye,
    label: "Weryfikujemy producentów",
    description:
      "Sprawdzamy dane firmy, możliwości produkcyjne, dokumentację oraz zgodność oferty z wymaganiami projektu.",
  },
  {
    id: "quality",
    icon: ShieldCheck,
    label: "Kontrolujemy towar przed wysyłką",
    description:
      "W zależności od projektu organizujemy kontrolę przedprodukcyjną, kontrolę w trakcie produkcji lub inspekcję przed wysyłką.",
  },
  {
    id: "logistics",
    icon: Truck,
    label: "Organizujemy dostawę od fabryki do magazynu",
    description:
      "Koordynujemy eksport, transport morski, kolejowy, lotniczy lub drogowy, odprawę celną i dostawę końcową.",
  },
  {
    id: "flexible",
    icon: Building2,
    label: "Pełny proces lub wybrana usługa",
    description:
      "Możesz zlecić nam kompleksową obsługę albo tylko wyszukanie producenta, kontrolę jakości, konsolidację lub transport.",
  },
];
