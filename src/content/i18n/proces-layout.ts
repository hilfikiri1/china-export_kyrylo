import type { Messages } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/routing";
import { getMessageArray, getMessageObject } from "@/i18n/translate";
import type {
  ProcesStat,
  ProcesStep,
  ProcesStepIcon,
} from "@/content/proces-layout";

const stepMeta: Array<{
  icon: ProcesStepIcon;
  theme: ProcesStep["theme"];
}> = [
  {
    icon: "file-text",
    theme: {
      accent: "#dbaa47",
      glow: "rgba(219,170,71,0.12)",
      glowBorder: "rgba(219,170,71,0.28)",
    },
  },
  {
    icon: "search",
    theme: {
      accent: "#4ade80",
      glow: "rgba(74,222,128,0.12)",
      glowBorder: "rgba(74,222,128,0.28)",
    },
  },
  {
    icon: "clipboard-list",
    theme: {
      accent: "#60a5fa",
      glow: "rgba(96,165,250,0.12)",
      glowBorder: "rgba(96,165,250,0.28)",
    },
  },
  {
    icon: "shield-check",
    theme: {
      accent: "#a78bfa",
      glow: "rgba(167,139,250,0.12)",
      glowBorder: "rgba(167,139,250,0.28)",
    },
  },
  {
    icon: "shield-check",
    theme: {
      accent: "#60a5fa",
      glow: "rgba(96,165,250,0.12)",
      glowBorder: "rgba(96,165,250,0.28)",
    },
  },
  {
    icon: "truck",
    theme: {
      accent: "#22d3ee",
      glow: "rgba(34,211,238,0.12)",
      glowBorder: "rgba(34,211,238,0.28)",
    },
  },
];

type ProcessStepMessage = {
  title: string;
  description: string;
};

type ProcessPageMessages = {
  hero: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    lead: string;
    stats: { experience: string; clients: string; containers: string };
  };
  stepsAriaLabel: string;
  ctaBand: { eyebrow: string; title: string; body: string };
  cta: {
    primary: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
};

export function getProcesLayout(messages: Messages, locale: Locale) {
  const page = getMessageObject<ProcessPageMessages>(messages, "process.page");
  const steps = getMessageArray<ProcessStepMessage>(
    messages,
    "process.section.steps",
  );
  const stats = getMessageObject<{
    experience: { value: string };
    clients: { value: string };
    containers: { value: string };
  }>(messages, "home.stats");

  if (!page) {
    throw new Error("Missing process.page translations");
  }

  const heroStats: ProcesStat[] = [
    {
      value: `${stats?.experience?.value ?? "17"}`,
      label: page.hero.stats.experience,
    },
    {
      value: stats?.clients?.value ?? "275+",
      label: page.hero.stats.clients,
    },
    {
      value: stats?.containers?.value ?? "110+",
      label: page.hero.stats.containers,
    },
  ];

  const procesSteps: ProcesStep[] = steps.map((step, index) => {
    const meta = stepMeta[index] ?? stepMeta[0];
    return {
      num: String(index + 1).padStart(2, "0"),
      icon: meta.icon,
      theme: meta.theme,
      title: step.title,
      tagline: step.title,
      body: step.description,
      bullets: [],
    };
  });

  return {
    hero: {
      eyebrow: page.hero.eyebrow,
      titleLead: page.hero.titleLead,
      titleAccent: page.hero.titleAccent,
      lead: page.hero.lead,
      stats: heroStats,
    },
    stepsAriaLabel: page.stepsAriaLabel,
    steps: procesSteps,
    cta: {
      eyebrow: page.ctaBand.eyebrow,
      title: page.ctaBand.title,
      body: page.ctaBand.body,
      primary: {
        ...page.cta.primary,
        href: localizedPath(locale, page.cta.primary.href.replace(/^\//, "")),
      },
      secondary: page.cta.secondary
        ? {
            ...page.cta.secondary,
            href: localizedPath(
              locale,
              page.cta.secondary.href.replace(/^\//, ""),
            ),
          }
        : undefined,
    },
  };
}
