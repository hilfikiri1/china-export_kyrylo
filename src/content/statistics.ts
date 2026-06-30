import type { Locale } from "@/i18n/config";

export type LocalizedString = Record<Locale, string>;

export type LocalizedStringArray = Record<Locale, string[]>;

export const statistics = {
  experience: {
    value: "17",
    suffix: {
      pl: "lat",
      uk: "років",
      ru: "лет",
      de: "Jahre",
      zh: "年",
    } satisfies LocalizedString,
    label: {
      pl: "doświadczenia we współpracy z Chinami",
      uk: "досвіду співпраці з Китаєм",
      ru: "опыта работы с Китаем",
      de: "Erfahrung in der Zusammenarbeit mit China",
      zh: "与中国合作的经验",
    } satisfies LocalizedString,
  },
  clients: {
    value: "275+",
    label: {
      pl: "obsłużonych klientów",
      uk: "обслугованих клієнтів",
      ru: "обслуженных клиентов",
      de: "betreute Kunden",
      zh: "服务客户",
    } satisfies LocalizedString,
  },
  containers: {
    value: "110+",
    label: {
      pl: "dostarczonych kontenerów",
      uk: "доставлених контейнерів",
      ru: "доставленных контейнеров",
      de: "gelieferte Container",
      zh: "交付集装箱",
    } satisfies LocalizedString,
  },
  foshan: {
    value: "Foshan",
    label: {
      pl: "operacje i wsparcie na miejscu w Chinach",
      uk: "операції та підтримка на місці в Китаї",
      ru: "операции и поддержка на месте в Китае",
      de: "Operative Präsenz und Support vor Ort in China",
      zh: "中国本地运营与支持",
    } satisfies LocalizedString,
  },
} as const;

export function getStatistics(locale: Locale) {
  return [
    {
      id: "experience",
      value: `${statistics.experience.value} ${statistics.experience.suffix[locale]}`,
      label: statistics.experience.label[locale],
    },
    {
      id: "clients",
      value: statistics.clients.value,
      label: statistics.clients.label[locale],
    },
    {
      id: "containers",
      value: statistics.containers.value,
      label: statistics.containers.label[locale],
    },
    {
      id: "foshan",
      value: statistics.foshan.value,
      label: statistics.foshan.label[locale],
    },
  ];
}
