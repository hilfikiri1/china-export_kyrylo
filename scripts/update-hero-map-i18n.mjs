#!/usr/bin/env node
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const dir = join(process.cwd(), "src/i18n/messages");

const localeData = {
  pl: {
    instructions: {
      hover: "Najedź na zaznaczony kraj, aby zobaczyć szczegóły",
      tap: "Dotknij zaznaczonego kraju, aby zobaczyć szczegóły",
    },
    badges: {
      operations: "Operacje w Chinach",
      "company-presence": "Baza firmy",
      "client-market": "Rynek klientów",
    },
    countries: [
      {
        id: "CN",
        name: "Chiny",
        role: "Operacje w Chinach",
        description:
          "Operacje w Foshan: kontakt z producentami, inspekcje, konsolidacja i dokumentacja eksportowa.",
        hubs: ["Foshan"],
        metrics: [
          { label: "Doświadczenie", value: "lat" },
          { label: "Obsłużeni klienci", value: "275+" },
          { label: "Baza operacyjna", value: "Foshan" },
        ],
      },
      {
        id: "UA",
        name: "Ukraina",
        role: "Baza firmy",
        description:
          "Reprezentacja Buy & Bring Solutions na Ukrainie — wsparcie klientów, koordynacja projektów i komunikacja z zespołem w Chinach.",
        hubs: ["Kijów", "Lwów", "Odessa"],
        metrics: [
          { label: "Obsługa", value: "Pełna" },
          { label: "Języki", value: "UK / PL / EN" },
          { label: "Wsparcie", value: "Door-to-door" },
        ],
      },
      {
        id: "PL",
        name: "Polska",
        role: "Baza firmy",
        description:
          "Siedziba Buy & Bring Solutions w Polsce — koordynacja importu, odprawa celna i dostawa do magazynu klienta.",
        hubs: ["Gdańsk", "Gdynia", "Wrocław"],
        metrics: [
          { label: "Dostarczone kontenery", value: "110+" },
          { label: "Obsługa celna", value: "Pełna" },
          { label: "Dostawa", value: "Door-to-door" },
        ],
      },
      {
        id: "DE",
        name: "Niemcy",
        role: "Rynek klientów",
        description:
          "Tranzyt i konsolidacja ładunków dla klientów w Niemczech z dostawą door-to-door.",
        hubs: ["Hamburg", "Frankfurt", "Monachium", "Berlin"],
        metrics: [
          { label: "Tryby transportu", value: "Morski / kolej / lotniczy" },
          { label: "Obsługa FCL / LCL", value: "Tak" },
          { label: "Dostawa", value: "Door-to-door" },
        ],
      },
      {
        id: "EE",
        name: "Estonia",
        role: "Rynek klientów",
        description: "Dostawy B2B dla firm w Estonii z pełną obsługą importu z Chin.",
        hubs: ["Tallinn", "Tartu"],
        metrics: [
          { label: "Tryby transportu", value: "Morski / kolej / lotniczy" },
          { label: "Obsługa importu", value: "Pełna" },
          { label: "Dostawa", value: "Door-to-door" },
        ],
      },
      {
        id: "LV",
        name: "Łotwa",
        role: "Rynek klientów",
        description: "Import towarów i komponentów B2B dla klientów na Łotwie.",
        hubs: ["Ryga", "Liepāja"],
        metrics: [
          { label: "Tryby transportu", value: "Morski / kolej / lotniczy" },
          { label: "Obsługa importu", value: "Pełna" },
          { label: "Dostawa", value: "Door-to-door" },
        ],
      },
      {
        id: "LT",
        name: "Litwa",
        role: "Rynek klientów",
        description: "Wsparcie firm litewskich w imporcie produktów i komponentów z Chin.",
        hubs: ["Wilno", "Kłajpeda"],
        metrics: [
          { label: "Tryby transportu", value: "Morski / kolej / lotniczy" },
          { label: "Obsługa importu", value: "Pełna" },
          { label: "Dostawa", value: "Door-to-door" },
        ],
      },
      {
        id: "BG",
        name: "Bułgaria",
        role: "Rynek klientów",
        description:
          "Dostawy B2B dla producentów i dystrybutorów w Bułgarii z pełną obsługą importu.",
        hubs: ["Sofia", "Płowdiw", "Warna"],
        metrics: [
          { label: "Tryby transportu", value: "Morski / kolej / lotniczy" },
          { label: "Obsługa importu", value: "Pełna" },
          { label: "Dostawa", value: "Door-to-door" },
        ],
      },
    ],
    routes: [
      { id: "cn-pl-rail", label: "Kolej: Chiny → Polska", volumeLabel: "Fracht kolejowy", transitDays: "Zależnie od trasy" },
      { id: "cn-de-rail", label: "Kolej: Chiny → Niemcy", volumeLabel: "Fracht kolejowy", transitDays: "Zależnie od trasy" },
      { id: "cn-ua-rail", label: "Kolej: Chiny → Ukraina", volumeLabel: "Fracht kolejowy", transitDays: "Zależnie od trasy" },
      { id: "cn-pl-air", label: "Lotniczy: Chiny → Polska", volumeLabel: "Fracht lotniczy", transitDays: "Zależnie od trasy" },
      { id: "cn-de-air", label: "Lotniczy: Chiny → Niemcy", volumeLabel: "Fracht lotniczy", transitDays: "Zależnie od trasy" },
      { id: "cn-ua-air", label: "Lotniczy: Chiny → Ukraina", volumeLabel: "Fracht lotniczy", transitDays: "Zależnie od trasy" },
      { id: "cn-ee-air", label: "Lotniczy: Chiny → Estonia", volumeLabel: "Fracht lotniczy", transitDays: "Zależnie od trasy" },
      { id: "cn-lv-air", label: "Lotniczy: Chiny → Łotwa", volumeLabel: "Fracht lotniczy", transitDays: "Zależnie od trasy" },
      { id: "cn-lt-air", label: "Lotniczy: Chiny → Litwa", volumeLabel: "Fracht lotniczy", transitDays: "Zależnie od trasy" },
      { id: "cn-bg-air", label: "Lotniczy: Chiny → Bułgaria", volumeLabel: "Fracht lotniczy", transitDays: "Zależnie od trasy" },
    ],
  },
  uk: {
    instructions: {
      hover: "Наведіть на позначену країну, щоб переглянути деталі",
      tap: "Торкніться позначеної країни, щоб переглянути деталі",
    },
    badges: {
      operations: "Операції в Китаї",
      "company-presence": "База компанії",
      "client-market": "Ринок клієнтів",
    },
    countries: [
      { id: "CN", name: "Китай", role: "Операції в Китаї", description: "Операції у Фошані: контакт із виробниками, інспекції, консолідація та експортна документація.", hubs: ["Фошань"], metrics: [{ label: "Досвід", value: "років" }, { label: "Обслуговані клієнти", value: "275+" }, { label: "Операційна база", value: "Фошань" }] },
      { id: "UA", name: "Україна", role: "База компанії", description: "Представництво Buy & Bring Solutions в Україні — підтримка клієнтів, координація проєктів і зв'язок із командою в Китаї.", hubs: ["Київ", "Львів", "Одеса"], metrics: [{ label: "Обслуговування", value: "Повне" }, { label: "Мови", value: "UK / PL / EN" }, { label: "Підтримка", value: "Door-to-door" }] },
      { id: "PL", name: "Польща", role: "База компанії", description: "Офіс Buy & Bring Solutions у Польщі — координація імпорту, митне оформлення та доставка на склад клієнта.", hubs: ["Гданськ", "Гдиня", "Вроцлав"], metrics: [{ label: "Доставлені контейнери", value: "110+" }, { label: "Митне оформлення", value: "Повне" }, { label: "Доставка", value: "Door-to-door" }] },
      { id: "DE", name: "Німеччина", role: "Ринок клієнтів", description: "Транзит і консолідація вантажів для клієнтів у Німеччині з доставкою door-to-door.", hubs: ["Гамбург", "Франкфурт", "Мюнхен", "Берлін"], metrics: [{ label: "Види транспорту", value: "Морський / залізниця / авіа" }, { label: "FCL / LCL", value: "Так" }, { label: "Доставка", value: "Door-to-door" }] },
      { id: "EE", name: "Естонія", role: "Ринок клієнтів", description: "B2B-поставки для компаній в Естонії з повним супроводом імпорту з Китаю.", hubs: ["Таллінн", "Тарту"], metrics: [{ label: "Види транспорту", value: "Морський / залізниця / авіа" }, { label: "Імпорт", value: "Повний" }, { label: "Доставка", value: "Door-to-door" }] },
      { id: "LV", name: "Латвія", role: "Ринок клієнтів", description: "Імпорт товарів і компонентів B2B для клієнтів у Латвії.", hubs: ["Рига", "Лієпая"], metrics: [{ label: "Види транспорту", value: "Морський / залізниця / авіа" }, { label: "Імпорт", value: "Повний" }, { label: "Доставка", value: "Door-to-door" }] },
      { id: "LT", name: "Литва", role: "Ринок клієнтів", description: "Підтримка литовських компаній в імпорті продукції та компонентів з Китаю.", hubs: ["Вільнюс", "Клайпеда"], metrics: [{ label: "Види транспорту", value: "Морський / залізниця / авіа" }, { label: "Імпорт", value: "Повний" }, { label: "Доставка", value: "Door-to-door" }] },
      { id: "BG", name: "Болгарія", role: "Ринок клієнтів", description: "B2B-поставки для виробників і дистриб'юторів у Болгарії з повним супроводом імпорту.", hubs: ["Софія", "Пловдив", "Варна"], metrics: [{ label: "Види транспорту", value: "Морський / залізниця / авіа" }, { label: "Імпорт", value: "Повний" }, { label: "Доставка", value: "Door-to-door" }] },
    ],
    routes: [
      { id: "cn-pl-rail", label: "Залізниця: Китай → Польща", volumeLabel: "Залізничний фрахт", transitDays: "Залежить від маршруту" },
      { id: "cn-de-rail", label: "Залізниця: Китай → Німеччина", volumeLabel: "Залізничний фрахт", transitDays: "Залежить від маршруту" },
      { id: "cn-ua-rail", label: "Залізниця: Китай → Україна", volumeLabel: "Залізничний фрахт", transitDays: "Залежить від маршруту" },
      { id: "cn-pl-air", label: "Авіа: Китай → Польща", volumeLabel: "Авіафрахт", transitDays: "Залежить від маршруту" },
      { id: "cn-de-air", label: "Авіа: Китай → Німеччина", volumeLabel: "Авіафрахт", transitDays: "Залежить від маршруту" },
      { id: "cn-ua-air", label: "Авіа: Китай → Україна", volumeLabel: "Авіафрахт", transitDays: "Залежить від маршруту" },
      { id: "cn-ee-air", label: "Авіа: Китай → Естонія", volumeLabel: "Авіафрахт", transitDays: "Залежить від маршруту" },
      { id: "cn-lv-air", label: "Авіа: Китай → Латвія", volumeLabel: "Авіафрахт", transitDays: "Залежить від маршруту" },
      { id: "cn-lt-air", label: "Авіа: Китай → Литва", volumeLabel: "Авіафрахт", transitDays: "Залежить від маршруту" },
      { id: "cn-bg-air", label: "Авіа: Китай → Болгарія", volumeLabel: "Авіафрахт", transitDays: "Залежить від маршруту" },
    ],
  },
  ru: {
    instructions: {
      hover: "Наведите на отмеченную страну, чтобы увидеть подробности",
      tap: "Коснитесь отмеченной страны, чтобы увидеть подробности",
    },
    badges: {
      operations: "Операции в Китае",
      "company-presence": "База компании",
      "client-market": "Рынок клиентов",
    },
    countries: [
      { id: "CN", name: "Китай", role: "Операции в Китае", description: "Операции в Фошане: контакт с производителями, инспекции, консолидация и экспортная документация.", hubs: ["Фошань"], metrics: [{ label: "Опыт", value: "лет" }, { label: "Обслуженные клиенты", value: "275+" }, { label: "Операционная база", value: "Фошань" }] },
      { id: "UA", name: "Украина", role: "База компании", description: "Представительство Buy & Bring Solutions в Украине — поддержка клиентов, координация проектов и связь с командой в Китае.", hubs: ["Киев", "Львов", "Одесса"], metrics: [{ label: "Обслуживание", value: "Полное" }, { label: "Языки", value: "UK / PL / EN" }, { label: "Поддержка", value: "Door-to-door" }] },
      { id: "PL", name: "Польша", role: "База компании", description: "Офис Buy & Bring Solutions в Польше — координация импорта, таможня и доставка на склад клиента.", hubs: ["Гданьск", "Гдыня", "Вроцлав"], metrics: [{ label: "Доставленные контейнеры", value: "110+" }, { label: "Таможня", value: "Полная" }, { label: "Доставка", value: "Door-to-door" }] },
      { id: "DE", name: "Германия", role: "Рынок клиентов", description: "Транзит и консолидация грузов для клиентов в Германии с доставкой door-to-door.", hubs: ["Гамбург", "Франкфурт", "Мюнхен", "Берлин"], metrics: [{ label: "Виды транспорта", value: "Морской / ж/д / авиа" }, { label: "FCL / LCL", value: "Да" }, { label: "Доставка", value: "Door-to-door" }] },
      { id: "EE", name: "Эстония", role: "Рынок клиентов", description: "B2B-поставки для компаний в Эстонии с полным сопровождением импорта из Китая.", hubs: ["Таллин", "Тарту"], metrics: [{ label: "Виды транспорта", value: "Морской / ж/д / авиа" }, { label: "Импорт", value: "Полный" }, { label: "Доставка", value: "Door-to-door" }] },
      { id: "LV", name: "Латвия", role: "Рынок клиентов", description: "Импорт товаров и компонентов B2B для клиентов в Латвии.", hubs: ["Рига", "Лиепая"], metrics: [{ label: "Виды транспорта", value: "Морской / ж/д / авиа" }, { label: "Импорт", value: "Полный" }, { label: "Доставка", value: "Door-to-door" }] },
      { id: "LT", name: "Литва", role: "Рынок клиентов", description: "Поддержка литовских компаний в импорте продукции и компонентов из Китая.", hubs: ["Вильнюс", "Клайпеда"], metrics: [{ label: "Виды транспорта", value: "Морской / ж/д / авиа" }, { label: "Импорт", value: "Полный" }, { label: "Доставка", value: "Door-to-door" }] },
      { id: "BG", name: "Болгария", role: "Рынок клиентов", description: "B2B-поставки для производителей и дистрибьюторов в Болгарии с полным сопровождением импорта.", hubs: ["София", "Пловдив", "Варна"], metrics: [{ label: "Виды транспорта", value: "Морской / ж/д / авиа" }, { label: "Импорт", value: "Полный" }, { label: "Доставка", value: "Door-to-door" }] },
    ],
    routes: [
      { id: "cn-pl-rail", label: "Ж/д: Китай → Польша", volumeLabel: "Ж/д фрахт", transitDays: "Зависит от маршрута" },
      { id: "cn-de-rail", label: "Ж/д: Китай → Германия", volumeLabel: "Ж/д фрахт", transitDays: "Зависит от маршрута" },
      { id: "cn-ua-rail", label: "Ж/д: Китай → Украина", volumeLabel: "Ж/д фрахт", transitDays: "Зависит от маршрута" },
      { id: "cn-pl-air", label: "Авиа: Китай → Польша", volumeLabel: "Авиафрахт", transitDays: "Зависит от маршрута" },
      { id: "cn-de-air", label: "Авиа: Китай → Германия", volumeLabel: "Авиафрахт", transitDays: "Зависит от маршрута" },
      { id: "cn-ua-air", label: "Авиа: Китай → Украина", volumeLabel: "Авиафрахт", transitDays: "Зависит от маршрута" },
      { id: "cn-ee-air", label: "Авиа: Китай → Эстония", volumeLabel: "Авиафрахт", transitDays: "Зависит от маршрута" },
      { id: "cn-lv-air", label: "Авиа: Китай → Латвия", volumeLabel: "Авиафрахт", transitDays: "Зависит от маршрута" },
      { id: "cn-lt-air", label: "Авиа: Китай → Литва", volumeLabel: "Авиафрахт", transitDays: "Зависит от маршрута" },
      { id: "cn-bg-air", label: "Авиа: Китай → Болгария", volumeLabel: "Авиафрахт", transitDays: "Зависит от маршрута" },
    ],
  },
  de: {
    instructions: {
      hover: "Bewegen Sie den Mauszeiger über ein markiertes Land, um Details anzuzeigen",
      tap: "Tippen Sie auf ein markiertes Land, um Details anzuzeigen",
    },
    badges: {
      operations: "Operationen in China",
      "company-presence": "Firmenstandort",
      "client-market": "Kundenmarkt",
    },
    countries: [
      { id: "CN", name: "China", role: "Operationen in China", description: "Operationen in Foshan: Herstellerkontakt, Inspektionen, Konsolidierung und Exportdokumentation.", hubs: ["Foshan"], metrics: [{ label: "Erfahrung", value: "Jahre" }, { label: "Betreute Kunden", value: "275+" }, { label: "Operationsbasis", value: "Foshan" }] },
      { id: "UA", name: "Ukraine", role: "Firmenstandort", description: "Vertretung von Buy & Bring Solutions in der Ukraine — Kundenbetreuung, Projektkoordination und Anbindung an das Team in China.", hubs: ["Kiew", "Lemberg", "Odessa"], metrics: [{ label: "Betreuung", value: "Vollständig" }, { label: "Sprachen", value: "UK / PL / EN" }, { label: "Support", value: "Door-to-door" }] },
      { id: "PL", name: "Polen", role: "Firmenstandort", description: "Sitz von Buy & Bring Solutions in Polen — Importkoordination, Zollabfertigung und Lieferung zum Kundenlager.", hubs: ["Danzig", "Gdingen", "Breslau"], metrics: [{ label: "Gelieferte Container", value: "110+" }, { label: "Zollabfertigung", value: "Vollständig" }, { label: "Lieferung", value: "Door-to-door" }] },
      { id: "DE", name: "Deutschland", role: "Kundenmarkt", description: "Transit und Konsolidierung von Ladungen für Kunden in Deutschland mit Door-to-door-Lieferung.", hubs: ["Hamburg", "Frankfurt", "München", "Berlin"], metrics: [{ label: "Transportarten", value: "See / Bahn / Luft" }, { label: "FCL / LCL", value: "Ja" }, { label: "Lieferung", value: "Door-to-door" }] },
      { id: "EE", name: "Estland", role: "Kundenmarkt", description: "B2B-Lieferungen für Unternehmen in Estland mit vollem Import-Support aus China.", hubs: ["Tallinn", "Tartu"], metrics: [{ label: "Transportarten", value: "See / Bahn / Luft" }, { label: "Import", value: "Vollständig" }, { label: "Lieferung", value: "Door-to-door" }] },
      { id: "LV", name: "Lettland", role: "Kundenmarkt", description: "Import von Waren und Komponenten B2B für Kunden in Lettland.", hubs: ["Riga", "Liepāja"], metrics: [{ label: "Transportarten", value: "See / Bahn / Luft" }, { label: "Import", value: "Vollständig" }, { label: "Lieferung", value: "Door-to-door" }] },
      { id: "LT", name: "Litauen", role: "Kundenmarkt", description: "Unterstützung litauischer Unternehmen beim Import von Produkten und Komponenten aus China.", hubs: ["Vilnius", "Klaipėda"], metrics: [{ label: "Transportarten", value: "See / Bahn / Luft" }, { label: "Import", value: "Vollständig" }, { label: "Lieferung", value: "Door-to-door" }] },
      { id: "BG", name: "Bulgarien", role: "Kundenmarkt", description: "B2B-Lieferungen für Hersteller und Distributoren in Bulgarien mit vollem Import-Support.", hubs: ["Sofia", "Plowdiw", "Warna"], metrics: [{ label: "Transportarten", value: "See / Bahn / Luft" }, { label: "Import", value: "Vollständig" }, { label: "Lieferung", value: "Door-to-door" }] },
    ],
    routes: [
      { id: "cn-pl-rail", label: "Bahn: China → Polen", volumeLabel: "Schienenfracht", transitDays: "Je nach Route" },
      { id: "cn-de-rail", label: "Bahn: China → Deutschland", volumeLabel: "Schienenfracht", transitDays: "Je nach Route" },
      { id: "cn-ua-rail", label: "Bahn: China → Ukraine", volumeLabel: "Schienenfracht", transitDays: "Je nach Route" },
      { id: "cn-pl-air", label: "Luft: China → Polen", volumeLabel: "Luftfracht", transitDays: "Je nach Route" },
      { id: "cn-de-air", label: "Luft: China → Deutschland", volumeLabel: "Luftfracht", transitDays: "Je nach Route" },
      { id: "cn-ua-air", label: "Luft: China → Ukraine", volumeLabel: "Luftfracht", transitDays: "Je nach Route" },
      { id: "cn-ee-air", label: "Luft: China → Estland", volumeLabel: "Luftfracht", transitDays: "Je nach Route" },
      { id: "cn-lv-air", label: "Luft: China → Lettland", volumeLabel: "Luftfracht", transitDays: "Je nach Route" },
      { id: "cn-lt-air", label: "Luft: China → Litauen", volumeLabel: "Luftfracht", transitDays: "Je nach Route" },
      { id: "cn-bg-air", label: "Luft: China → Bulgarien", volumeLabel: "Luftfracht", transitDays: "Je nach Route" },
    ],
  },
  zh: {
    instructions: {
      hover: "将鼠标悬停在标记的国家上以查看详细信息",
      tap: "点击标记的国家以查看详细信息",
    },
    badges: {
      operations: "中国运营",
      "company-presence": "公司据点",
      "client-market": "客户市场",
    },
    countries: [
      { id: "CN", name: "中国", role: "中国运营", description: "佛山运营：对接生产商、检验、拼箱及出口单证。", hubs: ["佛山"], metrics: [{ label: "经验", value: "年" }, { label: "服务客户", value: "275+" }, { label: "运营基地", value: "佛山" }] },
      { id: "UA", name: "乌克兰", role: "公司据点", description: "Buy & Bring Solutions 乌克兰代表处——客户支持、项目协调及与中国团队沟通。", hubs: ["基辅", "利沃夫", "敖德萨"], metrics: [{ label: "服务", value: "全程" }, { label: "语言", value: "UK / PL / EN" }, { label: "支持", value: "门到门" }] },
      { id: "PL", name: "波兰", role: "公司据点", description: "Buy & Bring Solutions 波兰总部——进口协调、清关及交付至客户仓库。", hubs: ["格但斯克", "格丁尼亚", "弗罗茨瓦夫"], metrics: [{ label: "已交付集装箱", value: "110+" }, { label: "清关", value: "全程" }, { label: "交付", value: "门到门" }] },
      { id: "DE", name: "德国", role: "客户市场", description: "为德国客户提供货物中转、拼箱及门到门交付。", hubs: ["汉堡", "法兰克福", "慕尼黑", "柏林"], metrics: [{ label: "运输方式", value: "海运 / 铁路 / 空运" }, { label: "FCL / LCL", value: "是" }, { label: "交付", value: "门到门" }] },
      { id: "EE", name: "爱沙尼亚", role: "客户市场", description: "为爱沙尼亚企业提供B2B交付及完整中国进口支持。", hubs: ["塔林", "塔尔图"], metrics: [{ label: "运输方式", value: "海运 / 铁路 / 空运" }, { label: "进口", value: "全程" }, { label: "交付", value: "门到门" }] },
      { id: "LV", name: "拉脱维亚", role: "客户市场", description: "为拉脱维亚客户提供B2B货物与零部件进口。", hubs: ["里加", "利耶帕亚"], metrics: [{ label: "运输方式", value: "海运 / 铁路 / 空运" }, { label: "进口", value: "全程" }, { label: "交付", value: "门到门" }] },
      { id: "LT", name: "立陶宛", role: "客户市场", description: "支持立陶宛企业进口中国产品与零部件。", hubs: ["维尔纽斯", "克莱佩达"], metrics: [{ label: "运输方式", value: "海运 / 铁路 / 空运" }, { label: "进口", value: "全程" }, { label: "交付", value: "门到门" }] },
      { id: "BG", name: "保加利亚", role: "客户市场", description: "为保加利亚生产商与分销商提供B2B交付及完整进口支持。", hubs: ["索非亚", "普罗夫迪夫", "瓦尔纳"], metrics: [{ label: "运输方式", value: "海运 / 铁路 / 空运" }, { label: "进口", value: "全程" }, { label: "交付", value: "门到门" }] },
    ],
    routes: [
      { id: "cn-pl-rail", label: "铁路：中国 → 波兰", volumeLabel: "铁路货运", transitDays: "视路线而定" },
      { id: "cn-de-rail", label: "铁路：中国 → 德国", volumeLabel: "铁路货运", transitDays: "视路线而定" },
      { id: "cn-ua-rail", label: "铁路：中国 → 乌克兰", volumeLabel: "铁路货运", transitDays: "视路线而定" },
      { id: "cn-pl-air", label: "空运：中国 → 波兰", volumeLabel: "空运", transitDays: "视路线而定" },
      { id: "cn-de-air", label: "空运：中国 → 德国", volumeLabel: "空运", transitDays: "视路线而定" },
      { id: "cn-ua-air", label: "空运：中国 → 乌克兰", volumeLabel: "空运", transitDays: "视路线而定" },
      { id: "cn-ee-air", label: "空运：中国 → 爱沙尼亚", volumeLabel: "空运", transitDays: "视路线而定" },
      { id: "cn-lv-air", label: "空运：中国 → 拉脱维亚", volumeLabel: "空运", transitDays: "视路线而定" },
      { id: "cn-lt-air", label: "空运：中国 → 立陶宛", volumeLabel: "空运", transitDays: "视路线而定" },
      { id: "cn-bg-air", label: "空运：中国 → 保加利亚", volumeLabel: "空运", transitDays: "视路线而定" },
    ],
  },
};

const transportModes = {
  pl: { rail: "Kolej", air: "Lotniczy" },
  uk: { rail: "Залізниця", air: "Авіа" },
  ru: { rail: "Ж/д", air: "Авиа" },
  de: { rail: "Bahn", air: "Luft" },
  zh: { rail: "铁路", air: "空运" },
};

for (const locale of Object.keys(localeData)) {
  const file = join(dir, `${locale}.json`);
  const json = JSON.parse(readFileSync(file, "utf8"));
  const data = localeData[locale];

  json.home.heroMap = {
    transportModes: transportModes[locale],
    instructions: data.instructions,
    badges: data.badges,
    countries: data.countries,
    routes: data.routes,
  };

  writeFileSync(file, `${JSON.stringify(json, null, 2)}\n`);
  console.log(`Updated ${locale}.json heroMap`);
}
