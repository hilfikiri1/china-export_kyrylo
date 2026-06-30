import type { DedicatedPageContent } from "@/content/pages/types";
import type { Locale } from "@/i18n/config";

const pages = {
  uk: {
    services: {
      title: "Послуги під етап вашого проєкту",
      lead: "Ми можемо провести весь імпортний процес або допомогти лише на потрібному етапі.",
    },
    process: {
      title: "Імпорт з Китаю крок за кроком",
      lead: "Шість етапів: бриф, пошук виробників, перевірка, виробництво, контроль якості, транспорт і доставка.",
    },
    cases: {
      title: "Кейси Buy & Bring Solutions",
      lead: "Реальні напрями проєктів: Private Label, акумулятори, консолідація, промислове обладнання та пошук виробників на виставках.",
    },
    about: {
      title: "Ми поєднуємо європейські компанії з виробниками в Китаї",
      lead: "Buy & Bring Solutions підтримує компанії у пошуку виробників, організації виробництва, контролі якості та доставках з Китаю.",
    },
    china: {
      title: "Працюємо на місці в Китаї",
      lead: "Операційна підтримка у Фошані допомагає бути ближче до виробників і процесу виконання замовлення.",
    },
    calculator: {
      title: "Калькулятор вартості імпорту з Китаю",
      lead: "Результат має інформаційний характер і не є комерційною пропозицією чи податковою консультацією.",
    },
    consultation: {
      title: "Замовити безкоштовну консультацію",
      lead: "Коротко опишіть проєкт і зручний час контакту. Ми зв'яжемося з вами, щоб підтвердити розмову.",
    },
    contact: {
      title: "Розкажіть нам про свій проєкт",
      lead: "Чим більше інформації ми отримаємо на початку, тим швидше зможемо оцінити проєкт і наступні кроки.",
    },
  },
  ru: {
    services: {
      title: "Услуги под этап вашего проекта",
      lead: "Мы можем провести весь импортный процесс или подключиться только на нужном этапе.",
    },
    process: {
      title: "Импорт из Китая шаг за шагом",
      lead: "Шесть этапов: бриф, поиск производителей, проверка, производство, контроль качества, транспорт и доставка.",
    },
    cases: {
      title: "Кейсы Buy & Bring Solutions",
      lead: "Реальные направления проектов: Private Label, аккумуляторы, консолидация, промышленное оборудование и поиск производителей на выставках.",
    },
    about: {
      title: "Мы соединяем европейские компании с производителями в Китае",
      lead: "Buy & Bring Solutions помогает компаниям искать производителей, организовывать производство, контроль качества и поставки из Китая.",
    },
    china: {
      title: "Работаем на месте в Китае",
      lead: "Операционная поддержка в Фошане помогает быть ближе к производителям и процессу выполнения заказа.",
    },
    calculator: {
      title: "Калькулятор стоимости импорта из Китая",
      lead: "Результат носит информационный характер и не является коммерческим предложением или налоговой консультацией.",
    },
    consultation: {
      title: "Запросить бесплатную консультацию",
      lead: "Кратко опишите проект и удобное время контакта. Мы свяжемся с вами, чтобы подтвердить разговор.",
    },
    contact: {
      title: "Расскажите нам о своем проекте",
      lead: "Чем больше информации мы получим в начале, тем быстрее сможем оценить проект и следующие шаги.",
    },
  },
  de: {
    services: {
      title: "Leistungen passend zur Phase Ihres Projekts",
      lead: "Wir übernehmen den kompletten Importprozess oder unterstützen gezielt in einer einzelnen Phase.",
    },
    process: {
      title: "Import aus China Schritt für Schritt",
      lead: "Sechs Phasen: Briefing, Herstellersuche, Prüfung, Produktion, Qualitätskontrolle, Transport und Lieferung.",
    },
    cases: {
      title: "Projekte von Buy & Bring Solutions",
      lead: "Praxisnahe Projektthemen: Private Label, Batterietechnologie, Konsolidierung, Industriemaschinen und Herstellersuche auf Messen.",
    },
    about: {
      title: "Wir verbinden europäische Unternehmen mit Herstellern in China",
      lead: "Buy & Bring Solutions unterstützt Unternehmen bei Herstellersuche, Produktion, Qualitätskontrolle und Lieferungen aus China.",
    },
    china: {
      title: "Vor Ort in China",
      lead: "Operative Unterstützung in Foshan bringt uns näher an Hersteller und den Umsetzungsprozess.",
    },
    calculator: {
      title: "Importkostenrechner für China",
      lead: "Das Ergebnis dient der Orientierung und ist weder ein kommerzielles Angebot noch steuerliche Beratung.",
    },
    consultation: {
      title: "Kostenlose Beratung anfragen",
      lead: "Beschreiben Sie kurz Ihr Projekt und einen passenden Kontaktzeitpunkt. Wir melden uns zur Bestätigung.",
    },
    contact: {
      title: "Erzählen Sie uns von Ihrem Projekt",
      lead: "Je mehr Informationen wir zu Beginn erhalten, desto schneller können wir Projekt und nächste Schritte einschätzen.",
    },
  },
  zh: {
    services: {
      title: "匹配项目阶段的服务",
      lead: "我们可以负责完整进口流程，也可以只在您需要的阶段提供支持。",
    },
    process: {
      title: "一步一步完成中国进口",
      lead: "六个阶段：需求说明、制造商搜索、核验、生产、质量检验、运输与交付。",
    },
    cases: {
      title: "Buy & Bring Solutions 案例",
      lead: "真实项目方向：Private Label、电池技术、货物整合、工业设备以及展会供应商开发。",
    },
    about: {
      title: "连接欧洲企业与中国制造商",
      lead: "Buy & Bring Solutions 支持企业寻找制造商、组织生产、质量检验和中国出口交付。",
    },
    china: {
      title: "我们在中国本地开展工作",
      lead: "佛山运营支持让我们更接近制造商和项目执行流程。",
    },
    calculator: {
      title: "中国进口成本计算器",
      lead: "结果仅供参考，不构成商业报价或税务建议。",
    },
    consultation: {
      title: "预约免费咨询",
      lead: "请简要描述项目并提供方便联系的时间。我们会与您确认沟通安排。",
    },
    contact: {
      title: "告诉我们您的项目",
      lead: "初期信息越完整，我们越能快速评估项目并准备下一步。",
    },
  },
} as const;

export type LocalizedPageKey = keyof (typeof pages)["uk"];

export function getLocalizedPage(locale: Locale, key: LocalizedPageKey): DedicatedPageContent | null {
  if (locale === "pl") return null;
  const copy = pages[locale][key];

  return {
    id: key,
    meta: {
      title: `${copy.title} | Buy & Bring Solutions`,
      description: copy.lead,
    },
    hero: {
      eyebrow: "Buy & Bring Solutions",
      title: copy.title,
      lead: copy.lead,
    },
    sections: [
      {
        title: copy.title,
        body: copy.lead,
      },
    ],
    cta: {
      primary: { label: locale === "zh" ? "联系" : locale === "de" ? "Kontakt" : locale === "uk" ? "Описати проєкт" : "Описать проект", href: "/kontakt" },
      secondary: { label: locale === "zh" ? "预约咨询" : locale === "de" ? "Beratung anfragen" : locale === "uk" ? "Консультація" : "Консультация", href: "/konsultacja" },
    },
  };
}
