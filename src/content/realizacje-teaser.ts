import { caseStudies } from "@/content/cases";
import { statistics } from "@/content/statistics";
import type { Locale } from "@/i18n/config";

export type RealizacjeTeaserContent = {
  eyebrow: string;
  title: string;
  lead: string;
  highlights: { value: string; label: string }[];
  bullets: string[];
  image: string;
  imageAlt: string;
  cta: { label: string; href: string };
};

const copy = {
  eyebrow: {
    pl: "Realizacje",
    uk: "Реалізації",
    ru: "Реализованные проекты",
    de: "Referenzen",
    zh: "项目案例",
  },
  title: {
    pl: "Wybrane projekty importu z Chin",
    uk: "Обрані проєкти імпорту з Китаю",
    ru: "Избранные проекты импорта из Китая",
    de: "Ausgewählte Importprojekte aus China",
    zh: "精选中国进口项目",
  },
  lead: {
    pl: "Poniżej przykłady współpracy w różnych branżach. Ze względu na poufność nie publikujemy danych klientów — na stronie Realizacje znajdziesz zakres, proces i rezultaty.",
    uk: "Нижче — приклади співпраці в різних галузях. Через конфіденційність ми не публікуємо дані клієнтів — на сторінці Реалізації ви знайдете обсяг, процес і результати.",
    ru: "Ниже — примеры сотрудничества в разных отраслях. Из‑за конфиденциальности мы не публикуем данные клиентов — на странице Реализованные проекты вы найдёте объём, процесс и результаты.",
    de: "Nachfolgend Beispiele aus verschiedenen Branchen. Aus Vertraulichkeitsgründen veröffentlichen wir keine Kundendaten — auf der Seite Referenzen finden Sie Umfang, Ablauf und Ergebnisse.",
    zh: "以下为不同行业的合作示例。出于保密原因我们不公开客户信息——在案例页可查看范围、流程与结果。",
  },
  highlightProjects: {
    pl: "Projektów w portfolio",
    uk: "Проєктів у портфоліо",
    ru: "Проектов в портфолио",
    de: "Projekte im Portfolio",
    zh: "案例项目",
  },
  highlightCategories: {
    pl: "Branż w realizacjach",
    uk: "Галузей у реалізаціях",
    ru: "Отраслей в проектах",
    de: "Branchen in Referenzen",
    zh: "涉及行业",
  },
  imageAlt: {
    pl: "Kontenery cargo — logistyka i realizacje importu z Chin",
    uk: "Вантажні контейнери — логістика та реалізації імпорту з Китаю",
    ru: "Грузовые контейнеры — логистика и реализация импорта из Китая",
    de: "Frachtcontainer — Logistik und Importreferenzen aus China",
    zh: "货运集装箱——中国进口物流与项目交付",
  },
  ctaLabel: {
    pl: "Zobacz realizacje",
    uk: "Переглянути реалізації",
    ru: "Смотреть проекты",
    de: "Referenzen ansehen",
    zh: "查看案例",
  },
} as const;

const uniqueCategories = new Set(caseStudies.map((study) => study.category.pl));

export function getRealizacjeTeaser(locale: Locale): RealizacjeTeaserContent {
  return {
    eyebrow: copy.eyebrow[locale],
    title: copy.title[locale],
    lead: copy.lead[locale],
    highlights: [
      {
        value: String(caseStudies.length),
        label: copy.highlightProjects[locale],
      },
      {
        value: String(uniqueCategories.size),
        label: copy.highlightCategories[locale],
      },
      {
        value: statistics.clients.value,
        label: statistics.clients.label[locale],
      },
    ],
    bullets: caseStudies.map((study) => study.title[locale]),
    image: "/image/plane_shipment.jpg",
    imageAlt: copy.imageAlt[locale],
    cta: {
      label: copy.ctaLabel[locale],
      href: "/realizacje",
    },
  };
}
