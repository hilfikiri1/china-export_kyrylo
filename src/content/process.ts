import type { Locale } from "@/i18n/config";

export type ProcessStep = {
  id: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
};

export const processSteps: ProcessStep[] = [
  {
    id: "brief",
    title: {
      pl: "Brief i specyfikacja",
      en: "Brief and specification",
      uk: "Бриф і специфікація",
      ru: "Бриф и спецификация",
      de: "Briefing und Spezifikation",
      zh: "需求简报与规格",
    },
    description: {
      pl: "Poznajemy produkt, jego zastosowanie, wymagania techniczne, planowaną ilość, budżet, termin oraz kraj docelowy.",
      en: "We define the product, its application, technical requirements, planned quantity, budget, timeline and destination market.",
      uk: "Дізнаємося про продукт, його застосування, технічні вимоги, планову кількість, бюджет, терміни та країну призначення.",
      ru: "Изучаем продукт, его применение, технические требования, планируемый объём, бюджет, сроки и страну назначения.",
      de: "Wir klären Produkt, Einsatzzweck, technische Anforderungen, geplante Menge, Budget, Termin und Zielland.",
      zh: "了解产品、用途、技术要求、计划数量、预算、交期及目的国。",
    },
  },
  {
    id: "sourcing",
    title: {
      pl: "Wyszukiwanie i porównanie producentów",
      en: "Supplier sourcing and comparison",
      uk: "Пошук і порівняння виробників",
      ru: "Поиск и сравнение производителей",
      de: "Suche und Vergleich von Herstellern",
      zh: "寻找与比较生产商",
    },
    description: {
      pl: "Wyszukujemy odpowiednie fabryki, zbieramy oferty oraz porównujemy konfiguracje, ceny, terminy produkcji, MOQ i warunki handlowe.",
      en: "We identify suitable factories, collect quotations and compare configurations, prices, lead times, MOQs and commercial terms.",
      uk: "Шукаємо відповідні фабрики, збираємо пропозиції та порівнюємо конфігурації, ціни, терміни виробництва, MOQ і торгові умови.",
      ru: "Ищем подходящие фабрики, собираем предложения и сравниваем конфигурации, цены, сроки производства, MOQ и коммерческие условия.",
      de: "Wir identifizieren passende Fabriken, sammeln Angebote und vergleichen Konfigurationen, Preise, Produktionszeiten, MOQ und Konditionen.",
      zh: "筛选合适工厂，收集报价，比较配置、价格、生产周期、MOQ及商务条件。",
    },
  },
  {
    id: "verification",
    title: {
      pl: "Weryfikacja fabryki i próbek",
      en: "Factory and sample verification",
      uk: "Верифікація фабрики та зразків",
      ru: "Верификация фабрики и образцов",
      de: "Fabrik- und Musterprüfung",
      zh: "工厂与样品验证",
    },
    description: {
      pl: "Sprawdzamy producenta, dokumentację, możliwości produkcyjne oraz — gdy jest to potrzebne — organizujemy próbki, wideoweryfikację lub audyt.",
      en: "We verify the manufacturer, documentation and production capabilities and, when needed, arrange samples, video verification or an audit.",
      uk: "Перевіряємо виробника, документацію, виробничі можливості та — за потреби — організовуємо зразки, відеоверифікацію або аудит.",
      ru: "Проверяем производителя, документацию, производственные возможности и при необходимости организуем образцы, видеоверификацию или аудит.",
      de: "Wir prüfen Hersteller, Dokumentation und Kapazitäten und organisieren bei Bedarf Muster, Videoverifizierung oder ein Audit.",
      zh: "核查生产商、文件与生产能力；必要时安排样品、视频核验或审计。",
    },
  },
  {
    id: "production",
    title: {
      pl: "Zamówienie i nadzór nad produkcją",
      en: "Order and production supervision",
      uk: "Замовлення та нагляд за виробництвом",
      ru: "Заказ и контроль производства",
      de: "Bestellung und Produktionsbegleitung",
      zh: "下单与生产跟进",
    },
    description: {
      pl: "Pomagamy uzgodnić specyfikację, warunki płatności, harmonogram i sposób odbioru. Koordynujemy komunikację z producentem podczas realizacji zamówienia.",
      en: "We help agree the specification, payment terms, schedule and acceptance method, and coordinate communication with the manufacturer during production.",
      uk: "Допомагаємо узгодити специфікацію, умови оплати, графік і спосіб приймання. Координуємо комунікацію з виробником під час виконання замовлення.",
      ru: "Помогаем согласовать спецификацию, условия оплаты, график и способ приёмки. Координируем общение с производителем в ходе выполнения заказа.",
      de: "Wir unterstützen bei Spezifikation, Zahlungsbedingungen, Zeitplan und Abnahme und koordinieren die Kommunikation mit dem Hersteller.",
      zh: "协助确认规格、付款条件、时间表与验收方式，并在订单执行期间协调与工厂沟通。",
    },
  },
  {
    id: "qc",
    title: {
      pl: "Kontrola jakości i dokumentów",
      en: "Quality and document control",
      uk: "Контроль якості та документів",
      ru: "Контроль качества и документов",
      de: "Qualitäts- und Dokumentenprüfung",
      zh: "质量与文件检查",
    },
    description: {
      pl: "Sprawdzamy zgodność towaru z ustaleniami, ilość, opakowanie, oznakowanie, działanie oraz dostępne dokumenty przed wysyłką.",
      en: "Before shipment, we verify conformity, quantity, packaging, labeling, operation and the available documentation.",
      uk: "Перевіряємо відповідність товару домовленостям, кількість, упаковку, маркування, роботу та наявні документи перед відправленням.",
      ru: "Проверяем соответствие товара договорённостям, количество, упаковку, маркировку, работоспособность и документы перед отгрузкой.",
      de: "Vor dem Versand prüfen wir Übereinstimmung, Menge, Verpackung, Kennzeichnung, Funktion und verfügbare Dokumente.",
      zh: "发货前核查货物是否符合约定、数量、包装、标识、功能及相关文件。",
    },
  },
  {
    id: "delivery",
    title: {
      pl: "Transport, odprawa i dostawa",
      en: "Freight, customs clearance and delivery",
      uk: "Транспорт, митне оформлення та доставка",
      ru: "Транспорт, таможня и доставка",
      de: "Transport, Zoll und Lieferung",
      zh: "运输、清关与交付",
    },
    description: {
      pl: "Organizujemy eksport z Chin, fracht, odprawę celną i dostawę pod wskazany adres w Polsce, Ukrainie lub innym kraju europejskim.",
      en: "We organize export from China, freight, customs clearance and delivery to the specified address in Poland, Ukraine or another European country.",
      uk: "Організовуємо експорт з Китаю, фрахт, митне оформлення та доставку за вказаною адресою в Польщі, Україні або іншій європейській країні.",
      ru: "Организуем экспорт из Китая, фрахт, таможенное оформление и доставку по указанному адресу в Польше, Украине или другой европейской стране.",
      de: "Wir organisieren Export aus China, Fracht, Zollabfertigung und Lieferung an die angegebene Adresse in Polen, der Ukraine oder einem anderen europäischen Land.",
      zh: "安排中国出口、运费、清关，并送达波兰、乌克兰或其他欧洲指定地址。",
    },
  },
];

export function getProcessSteps(locale: Locale) {
  return processSteps.map((step) => ({
    id: step.id,
    title: step.title[locale],
    description: step.description[locale],
  }));
}
