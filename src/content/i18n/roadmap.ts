import type { Messages } from "@/i18n/get-dictionary";
import { getMessageArray } from "@/i18n/translate";
import type { RoadmapCtaId, RoadmapStage } from "@/content/roadmap.stages";

const stageThemes: Record<
  string,
  RoadmapStage["theme"] & { icon: string; image: string }
> = {
  brief: {
    bg: "#232830",
    accent: "#38bdf8",
    gradient: "from-sky-950 via-surface-deep to-surface",
    icon: "clipboard",
    image: "/roadmap/brief.jpg",
  },
  sourcing: {
    bg: "#1a2e1a",
    accent: "#4ade80",
    gradient: "from-emerald-950 via-surface-deep to-surface",
    icon: "search",
    image: "/roadmap/sourcing.jpg",
  },
  verification: {
    bg: "#2a1f0a",
    accent: "#fbbf24",
    gradient: "from-amber-950 via-surface-deep to-surface",
    icon: "factory",
    image: "/roadmap/audit.jpg",
  },
  production: {
    bg: "#1e1b4b",
    accent: "#a78bfa",
    gradient: "from-violet-950 via-surface-deep to-surface",
    icon: "check",
    image: "/roadmap/production.jpg",
  },
  qc: {
    bg: "#0c2340",
    accent: "#60a5fa",
    gradient: "from-blue-950 via-surface-deep to-surface",
    icon: "document",
    image: "/roadmap/export.jpg",
  },
  delivery: {
    bg: "#0a2540",
    accent: "#22d3ee",
    gradient: "from-cyan-950 via-surface-deep to-surface",
    icon: "train",
    image: "/image/road_shipment.jpg",
  },
};

type RoadmapStageMessage = {
  id: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaId: RoadmapCtaId;
  imageAlt: string;
};

export function getRoadmapStages(messages: Messages): RoadmapStage[] {
  const stages = getMessageArray<RoadmapStageMessage>(
    messages,
    "home.roadmap.stages",
  );

  return stages.map((stage) => {
    const theme = stageThemes[stage.id];
    if (!theme) {
      throw new Error(`Missing roadmap theme for stage: ${stage.id}`);
    }
    const { icon, image, ...themeColors } = theme;
    return {
      id: stage.id,
      title: stage.title,
      description: stage.description,
      cta: { label: stage.ctaLabel, ctaId: stage.ctaId },
      theme: themeColors,
      icon,
      image,
      imageAlt: stage.imageAlt,
    };
  });
}
