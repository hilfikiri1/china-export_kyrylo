import type { Locale } from "@/i18n/config";

export type HomeContent = {
  hero: {
    ariaLabel: string;
    eyebrow: string;
    title: string;
    lead: string;
    supportingLine: string;
    primaryCta: string;
    secondaryCta: string;
    calculatorCta: string;
    trustHeading: string;
  };
  servicesHeading: string;
  servicesLead: string;
  processEyebrow: string;
  processTitle: string;
  processLead: string;
};

export const homeContent: Record<Locale, HomeContent> = {
  pl: {
    hero: {
      ariaLabel: "Strona główna",
      eyebrow: "Buy & Bring Solutions · Polska — Chiny",
      title: "Import z Chin dla firm — od sprawdzonego producenta do Twojego magazynu",
      lead:
        "Wyszukujemy i weryfikujemy producentów, kontrolujemy produkcję i jakość, organizujemy eksport, transport, odprawę celną oraz dostawę do Polski i innych krajów Europy.",
      supportingLine: "Możesz powierzyć nam cały proces albo zlecić tylko wybrany etap.",
      primaryCta: "Opisz swój projekt",
      secondaryCta: "Umów konsultację",
      calculatorCta: "Oblicz orientacyjny koszt importu",
      trustHeading: "Dlaczego firmy wybierają Buy & Bring Solutions",
    },
    servicesHeading: "Usługi dopasowane do etapu Twojego projektu",
    servicesLead:
      "Możemy przeprowadzić cały proces importu albo wesprzeć Cię tylko na wybranym etapie.",
    processEyebrow: "Proces importu",
    processTitle: "Twój import krok po kroku",
    processLead: "Sześć etapów — od briefu i specyfikacji po odprawę i dostawę.",
  },
  uk: {
    hero: {
      ariaLabel: "Головна сторінка",
      eyebrow: "Buy & Bring Solutions · Україна — Китай",
      title: "Імпорт з Китаю для бізнесу — від перевіреного виробника до вашого складу",
      lead:
        "Ми шукаємо й перевіряємо виробників, контролюємо виробництво та якість, організовуємо експорт, транспорт, митне оформлення і доставку в Україну та країни Європи.",
      supportingLine: "Ви можете доручити нам увесь процес або лише окремий етап.",
      primaryCta: "Описати проєкт",
      secondaryCta: "Замовити консультацію",
      calculatorCta: "Розрахувати орієнтовну вартість імпорту",
      trustHeading: "Чому компанії обирають Buy & Bring Solutions",
    },
    servicesHeading: "Послуги під етап вашого проєкту",
    servicesLead:
      "Ми можемо провести весь імпортний процес або допомогти лише на потрібному етапі.",
    processEyebrow: "Процес імпорту",
    processTitle: "Ваш імпорт крок за кроком",
    processLead: "Шість етапів — від брифу та специфікації до митниці й доставки.",
  },
  ru: {
    hero: {
      ariaLabel: "Главная страница",
      eyebrow: "Buy & Bring Solutions · Европа — Китай",
      title: "Импорт из Китая для бизнеса — от проверенного производителя до вашего склада",
      lead:
        "Мы ищем и проверяем производителей, контролируем производство и качество, организуем экспорт, транспорт, таможенное оформление и доставку в Европу и Украину.",
      supportingLine: "Вы можете поручить нам весь процесс или только отдельный этап.",
      primaryCta: "Описать проект",
      secondaryCta: "Запросить консультацию",
      calculatorCta: "Рассчитать ориентировочную стоимость импорта",
      trustHeading: "Почему компании выбирают Buy & Bring Solutions",
    },
    servicesHeading: "Услуги под этап вашего проекта",
    servicesLead:
      "Мы можем провести весь импортный процесс или подключиться только на нужном этапе.",
    processEyebrow: "Процесс импорта",
    processTitle: "Ваш импорт шаг за шагом",
    processLead: "Шесть этапов — от брифа и спецификации до таможни и доставки.",
  },
  de: {
    hero: {
      ariaLabel: "Startseite",
      eyebrow: "Buy & Bring Solutions · Europa — China",
      title: "Import aus China für Unternehmen — vom geprüften Hersteller bis zu Ihrem Lager",
      lead:
        "Wir suchen und prüfen Hersteller, begleiten Produktion und Qualität, organisieren Export, Transport, Zollabwicklung und Lieferung nach Polen sowie in andere europäische Länder.",
      supportingLine: "Sie können den gesamten Prozess oder nur einzelne Schritte an uns übergeben.",
      primaryCta: "Projekt beschreiben",
      secondaryCta: "Beratung anfragen",
      calculatorCta: "Importkosten grob berechnen",
      trustHeading: "Warum Unternehmen Buy & Bring Solutions wählen",
    },
    servicesHeading: "Leistungen passend zur Phase Ihres Projekts",
    servicesLead:
      "Wir übernehmen den kompletten Importprozess oder unterstützen gezielt in einer einzelnen Phase.",
    processEyebrow: "Importprozess",
    processTitle: "Ihr Import Schritt für Schritt",
    processLead: "Sechs Phasen — vom Briefing und der Spezifikation bis zu Zoll und Lieferung.",
  },
  zh: {
    hero: {
      ariaLabel: "首页",
      eyebrow: "Buy & Bring Solutions · 欧洲 — 中国",
      title: "面向企业的中国进口服务 — 从可靠制造商到您的仓库",
      lead:
        "我们寻找并核验制造商，跟进生产和质量，组织出口、运输、清关以及运往波兰和其他欧洲国家的交付。",
      supportingLine: "您可以委托我们处理整个流程，也可以只选择某一个阶段。",
      primaryCta: "描述项目",
      secondaryCta: "预约咨询",
      calculatorCta: "估算进口成本",
      trustHeading: "为什么企业选择 Buy & Bring Solutions",
    },
    servicesHeading: "匹配项目阶段的服务",
    servicesLead: "我们可以负责完整进口流程，也可以只在您需要的阶段提供支持。",
    processEyebrow: "进口流程",
    processTitle: "一步一步完成进口",
    processLead: "六个阶段：从需求说明和规格确认，到清关与交付。",
  },
};

export function getHomeContent(locale: Locale): HomeContent {
  return homeContent[locale];
}
