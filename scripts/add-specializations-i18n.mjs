#!/usr/bin/env node
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const dir = join(process.cwd(), "src/i18n/messages");

const categoryTranslations = {
  pl: {
    machinery: {
      title: "Maszyny i urządzenia przemysłowe",
      shortDescription:
        "Wyszukujemy producentów maszyn przemysłowych, organizujemy wizyty techniczne, kontrolę jakości przed wysyłką i dostawę do Europy.",
      extendedDescription:
        "Wspieramy firmy w imporcie maszyn i linii produkcyjnych z Chin — od identyfikacji odpowiedniego producenta po inspekcję przed wysyłką, dokumentację eksportową i transport. Mamy doświadczenie w branży opakowaniowej, spożywczej, medycznej i budowlanej.",
      examples: "m.in. linie opakowaniowe, urządzenia SPA, maszyny budowlane",
      items: [
        "maszyny dla branży opakowaniowej i papierniczej",
        "maszyny spożywcze",
        "linie do przetwórstwa i produkcji",
        "urządzenia medyczne i SPA",
        "maszyny budowlane",
      ],
    },
    battery: {
      title: "Technologie akumulatorowe i rozwiązania energetyczne",
      shortDescription:
        "Łączymy firmy z producentami ogniw, pakietów akumulatorowych i systemów magazynowania energii w Chinach.",
      extendedDescription:
        "Pomagamy w zakupie komponentów akumulatorowych — od ogniw LFP i NMC po systemy BMS, pakiety przemysłowe i stacje ładowania. Weryfikujemy specyfikacje techniczne, organizujemy próbki i kontrolę jakości zgodnie z wymaganiami rynku docelowego.",
      examples: "ESS, pakiety do magazynów energii, infrastruktura ładowania",
      items: [
        "ogniwa LFP i NMC",
        "ogniwa pryzmatyczne i cylindryczne",
        "systemy BMS",
        "pakiety akumulatorowe",
        "akumulatory przemysłowe",
        "magazyny energii ESS",
        "stacje ładowania",
      ],
    },
    emobility: {
      title: "Elektromobilność i komponenty",
      shortDescription:
        "Sourcing komponentów i pojazdów elektrycznych — od silników i sterowników po gotowe produkty.",
      extendedDescription:
        "Wspieramy projekty związane z elektromobilnością: motocykle elektryczne, drony, komponenty napędu, akumulatory oraz części samochodowe. Pomagamy dopasować producenta do specyfikacji technicznej i norm rynku docelowego.",
      examples: "e-motocykle, kontrolery, opony, części zamienne",
      items: [
        "motocykle elektryczne",
        "silniki i sterowniki",
        "rozwiązania akumulatorowe",
        "drony",
        "pojazdy",
        "opony",
        "części samochodowe",
      ],
    },
    chemistry: {
      title: "Chemia i surowce",
      shortDescription:
        "Import surowców chemicznych i dodatków dla przemysłu — z weryfikacją dokumentacji i zgodności.",
      extendedDescription:
        "Wyszukujemy dostawców chemii przemysłowej, dodatków paszowych, polimerów i materiałów funkcjonalnych. Wspieramy weryfikację certyfikatów, próbek laboratoryjnych i logistyki materiałów niebezpiecznych tam, gdzie jest to wymagane.",
      examples: "LLDPE/LDPE/HDPE, dodatki paszowe, kleje przemysłowe",
      items: [
        "dodatki paszowe",
        "składniki funkcjonalne",
        "surowce dla przemysłu",
        "LLDPE, LDPE i HDPE",
        "chemia przemysłowa",
        "materiały klejące",
      ],
    },
    packaging: {
      title: "Papier, opakowania i materiały",
      shortDescription:
        "Papier, karton, folie i surowce opakowaniowe bezpośrednio od chińskich producentów.",
      extendedDescription:
        "Pomagamy w zakupie materiałów opakowaniowych — od papieru kraft i kartonów GC/FBB po folie PET i specjalistyczne papiery termoodporne. Organizujemy próbki, kontrolę jakości i dostawę partii produkcyjnych.",
      examples: "kubki papierowe, folia PET, kartony GC1/GC2",
      items: [
        "papier kraft",
        "karton GC1, GC2 i FBB",
        "papier do produkcji kubków",
        "folia PET",
        "surowce opakowaniowe",
        "papiery specjalistyczne i termoodporne",
      ],
    },
    textiles: {
      title: "Tekstylia i materiały techniczne",
      shortDescription:
        "Tkaniny techniczne i produkty tekstylne — sourcing, próbki i kontrola partii produkcyjnych.",
      extendedDescription:
        "Wspieramy import tkanin bawełnianych, syntetycznych i technicznych oraz produktów gotowych. Pomagamy w doborze gramatury, składu, kolorów i organizujemy kontrolę jakości przed wysyłką.",
      examples: "polar, tkaniny techniczne, odzież na zamówienie",
      items: [
        "polar",
        "tkaniny bawełniane i syntetyczne",
        "tkaniny mieszane",
        "tkaniny techniczne",
        "materiały specjalistyczne",
        "produkty tekstylne",
      ],
    },
    construction: {
      title: "Budownictwo i wyposażenie specjalistyczne",
      shortDescription:
        "Materiały budowlane, konstrukcje modułowe i wyposażenie specjalistyczne z Chin.",
      extendedDescription:
        "Importujemy materiały budowlane, domy kontenerowe i modułowe oraz specjalistyczne wyposażenie — np. dla infrastruktury kolejowej. Weryfikujemy producentów, organizujemy inspekcje i kompletujemy dokumentację transportową.",
      examples: "domy modułowe, wyposażenie kolejowe, materiały wykończeniowe",
      items: [
        "domy kontenerowe i modułowe",
        "wyposażenie kolejowe",
        "materiały budowlane",
        "maszyny i wyposażenie specjalistyczne",
      ],
    },
    consumer: {
      title: "Produkty konsumenckie i Private Label",
      shortDescription:
        "Produkty konsumenckie i produkcja Private Label według specyfikacji klienta.",
      extendedDescription:
        "Pomagamy w produkcji i imporcie artykułów codziennego użytku — od naczyń i odzieży po zabawki i artykuły dla zwierząt. Organizujemy próbki, kontrolę jakości i produkcję pod marką klienta.",
      examples: "naczynia, zabawki, artykuły dla zwierząt",
      items: [
        "naczynia",
        "odzież",
        "zabawki",
        "wyroby żeliwne",
        "folie",
        "artykuły dla zwierząt",
        "inne produkty wykonywane pod marką klienta",
      ],
    },
  },
  uk: {
    machinery: {
      title: "Промислові машини та обладнання",
      shortDescription:
        "Шукаємо виробників промислового обладнання, організовуємо технічні візити, контроль якості перед відправленням і доставку до Європи.",
      extendedDescription:
        "Підтримуємо компанії в імпорті машин і виробничих ліній з Китаю — від ідентифікації виробника до інспекції перед відправленням, експортної документації та транспортування. Маємо досвід у пакувальній, харчовій, медичній та будівельній галузях.",
      examples: "зокрема пакувальні лінії, SPA-обладнання, будівельна техніка",
      items: [
        "машини для пакувальної та паперової галузі",
        "харчове обладнання",
        "лінії переробки та виробництва",
        "медичне та SPA-обладнання",
        "будівельна техніка",
      ],
    },
    battery: {
      title: "Акумуляторні технології та енергетичні рішення",
      shortDescription:
        "З'єднуємо компанії з виробниками елементів, акумуляторних пакетів і систем накопичення енергії в Китаї.",
      extendedDescription:
        "Допомагаємо у закупівлі акумуляторних компонентів — від елементів LFP і NMC до систем BMS, промислових пакетів і зарядних станцій. Перевіряємо технічні специфікації, організовуємо зразки та контроль якості відповідно до вимог цільового ринку.",
      examples: "ESS, пакети для накопичувачів енергії, зарядна інфраструктура",
      items: [
        "елементи LFP та NMC",
        "призматичні та циліндричні елементи",
        "системи BMS",
        "акумуляторні пакети",
        "промислові акумулятори",
        "системи накопичення енергії ESS",
        "зарядні станції",
      ],
    },
    emobility: {
      title: "Електромобільність та компоненти",
      shortDescription:
        "Сорсинг компонентів і електротранспорту — від двигунів і контролерів до готової продукції.",
      extendedDescription:
        "Підтримуємо проєкти електромобільності: електромотоцикли, дрони, компоненти приводу, акумулятори та автозапчастини. Допомагаємо підібрати виробника відповідно до технічних специфікацій і норм цільового ринку.",
      examples: "е-мотоцикли, контролери, шини, запчастини",
      items: [
        "електромотоцикли",
        "електродвигуни та контролери",
        "акумуляторні рішення",
        "дрони",
        "транспортні засоби",
        "шини",
        "автозапчастини",
      ],
    },
    chemistry: {
      title: "Хімія та сировина",
      shortDescription:
        "Імпорт хімічної сировини та добавок для промисловості — з перевіркою документації та відповідності.",
      extendedDescription:
        "Шукаємо постачальників промислової хімії, кормових добавок, полімерів і функціональних матеріалів. Підтримуємо перевірку сертифікатів, лабораторних зразків і логістики небезпечних матеріалів, де це потрібно.",
      examples: "LLDPE/LDPE/HDPE, кормові добавки, промислові клеї",
      items: [
        "кормові добавки",
        "функціональні інгредієнти",
        "сировина для промисловості",
        "LLDPE, LDPE та HDPE",
        "промислова хімія",
        "клейові матеріали",
      ],
    },
    packaging: {
      title: "Папір, упаковка та матеріали",
      shortDescription:
        "Папір, картон, плівки та упаковочна сировина безпосередньо від китайських виробників.",
      extendedDescription:
        "Допомагаємо у закупівлі упаковочних матеріалів — від крафт-паперу та картону GC/FBB до плівки PET і спеціалізованих термостійких паперів. Організовуємо зразки, контроль якості та доставку виробничих партій.",
      examples: "паперові стаканчики, плівка PET, картон GC1/GC2",
      items: [
        "крафт-папір",
        "картон GC1, GC2 та FBB",
        "папір для виробництва стаканчиків",
        "плівка PET",
        "упаковочна сировина",
        "спеціалізовані та термостійкі папери",
      ],
    },
    textiles: {
      title: "Текстиль та технічні матеріали",
      shortDescription:
        "Технічні тканини та текстильні вироби — сорсинг, зразки та контроль виробничих партій.",
      extendedDescription:
        "Підтримуємо імпорт бавовняних, синтетичних і технічних тканин, а також готової продукції. Допомагаємо з вибором граматури, складу, кольорів і організовуємо контроль якості перед відправленням.",
      examples: "фліс, технічні тканини, одяг на замовлення",
      items: [
        "фліс",
        "бавовняні та синтетичні тканини",
        "змішані тканини",
        "технічні тканини",
        "спеціалізовані матеріали",
        "текстильні вироби",
      ],
    },
    construction: {
      title: "Будівництво та спеціалізоване обладнання",
      shortDescription:
        "Будівельні матеріали, модульні конструкції та спеціалізоване обладнання з Китаю.",
      extendedDescription:
        "Імпортуємо будівельні матеріали, контейнерні та модульні будинки, а також спеціалізоване обладнання — наприклад для залізничної інфраструктури. Перевіряємо виробників, організовуємо інспекції та транспортну документацію.",
      examples: "модульні будинки, залізничне обладнання, оздоблювальні матеріали",
      items: [
        "контейнерні та модульні будинки",
        "залізничне обладнання",
        "будівельні матеріали",
        "спеціалізовані машини та обладнання",
      ],
    },
    consumer: {
      title: "Споживчі товари та Private Label",
      shortDescription:
        "Споживчі товари та виробництво Private Label за специфікацією клієнта.",
      extendedDescription:
        "Допомагаємо у виробництві та імпорті товарів повсякденного вжитку — від посуду та одягу до іграшок і товарів для тварин. Організовуємо зразки, контроль якості та виробництво під маркою клієнта.",
      examples: "посуд, іграшки, товари для тварин",
      items: [
        "посуд",
        "одяг",
        "іграшки",
        "чавунні вироби",
        "плівки",
        "товари для тварин",
        "інші продукти під маркою клієнта",
      ],
    },
  },
  ru: {
    machinery: {
      title: "Промышленные машины и оборудование",
      shortDescription:
        "Ищем производителей промышленного оборудования, организуем технические визиты, контроль качества перед отгрузкой и доставку в Европу.",
      extendedDescription:
        "Поддерживаем компании в импорте машин и производственных линий из Китая — от идентификации производителя до инспекции перед отгрузкой, экспортной документации и транспорта. Имеем опыт в упаковочной, пищевой, медицинской и строительной отраслях.",
      examples: "в т.ч. упаковочные линии, SPA-оборудование, строительная техника",
      items: [
        "машины для упаковочной и бумажной отрасли",
        "пищевое оборудование",
        "линии переработки и производства",
        "медицинское и SPA-оборудование",
        "строительная техника",
      ],
    },
    battery: {
      title: "Аккумуляторные технологии и энергетические решения",
      shortDescription:
        "Связываем компании с производителями элементов, аккумуляторных пакетов и систем накопления энергии в Китае.",
      extendedDescription:
        "Помогаем в закупке аккумуляторных компонентов — от элементов LFP и NMC до систем BMS, промышленных пакетов и зарядных станций. Проверяем технические спецификации, организуем образцы и контроль качества в соответствии с требованиями целевого рынка.",
      examples: "ESS, пакеты для накопителей энергии, зарядная инфраструктура",
      items: [
        "элементы LFP и NMC",
        "призматические и цилиндрические элементы",
        "системы BMS",
        "аккумуляторные пакеты",
        "промышленные аккумуляторы",
        "системы накопления энергии ESS",
        "зарядные станции",
      ],
    },
    emobility: {
      title: "Электромобильность и компоненты",
      shortDescription:
        "Сорсинг компонентов и электротранспорта — от двигателей и контроллеров до готовой продукции.",
      extendedDescription:
        "Поддерживаем проекты электромобильности: электромотоциклы, дроны, компоненты привода, аккумуляторы и автозапчасти. Помогаем подобрать производителя в соответствии с техническими спецификациями и нормами целевого рынка.",
      examples: "э-мотоциклы, контроллеры, шины, запчасти",
      items: [
        "электромотоциклы",
        "электродвигатели и контроллеры",
        "аккумуляторные решения",
        "дроны",
        "транспортные средства",
        "шины",
        "автозапчасти",
      ],
    },
    chemistry: {
      title: "Химия и сырьё",
      shortDescription:
        "Импорт химического сырья и добавок для промышленности — с проверкой документации и соответствия.",
      extendedDescription:
        "Ищем поставщиков промышленной химии, кормовых добавок, полимеров и функциональных материалов. Поддерживаем проверку сертификатов, лабораторных образцов и логистики опасных материалов, где это требуется.",
      examples: "LLDPE/LDPE/HDPE, кормовые добавки, промышленные клеи",
      items: [
        "кормовые добавки",
        "функциональные ингредиенты",
        "сырьё для промышленности",
        "LLDPE, LDPE и HDPE",
        "промышленная химия",
        "клеевые материалы",
      ],
    },
    packaging: {
      title: "Бумага, упаковка и материалы",
      shortDescription:
        "Бумага, картон, плёнки и упаковочное сырьё напрямую от китайских производителей.",
      extendedDescription:
        "Помогаем в закупке упаковочных материалов — от крафт-бумаги и картона GC/FBB до плёнки PET и специализированных термостойких бумаг. Организуем образцы, контроль качества и поставку производственных партий.",
      examples: "бумажные стаканчики, плёнка PET, картон GC1/GC2",
      items: [
        "крафт-бумага",
        "картон GC1, GC2 и FBB",
        "бумага для производства стаканчиков",
        "плёнка PET",
        "упаковочное сырьё",
        "специализированные и термостойкие бумаги",
      ],
    },
    textiles: {
      title: "Текстиль и технические материалы",
      shortDescription:
        "Технические ткани и текстильные изделия — сорсинг, образцы и контроль производственных партий.",
      extendedDescription:
        "Поддерживаем импорт хлопковых, синтетических и технических тканей, а также готовой продукции. Помогаем с выбором плотности, состава, цветов и организуем контроль качества перед отгрузкой.",
      examples: "флис, технические ткани, одежда на заказ",
      items: [
        "флис",
        "хлопковые и синтетические ткани",
        "смешанные ткани",
        "технические ткани",
        "специализированные материалы",
        "текстильные изделия",
      ],
    },
    construction: {
      title: "Строительство и специализированное оборудование",
      shortDescription:
        "Строительные материалы, модульные конструкции и специализированное оборудование из Китая.",
      extendedDescription:
        "Импортируем строительные материалы, контейнерные и модульные дома, а также специализированное оборудование — например для железнодорожной инфраструктуры. Проверяем производителей, организуем инспекции и транспортную документацию.",
      examples: "модульные дома, железнодорожное оборудование, отделочные материалы",
      items: [
        "контейнерные и модульные дома",
        "железнодорожное оборудование",
        "строительные материалы",
        "специализированные машины и оборудование",
      ],
    },
    consumer: {
      title: "Потребительские товары и Private Label",
      shortDescription:
        "Потребительские товары и производство Private Label по спецификации клиента.",
      extendedDescription:
        "Помогаем в производстве и импорте товаров повседневного спроса — от посуды и одежды до игрушек и товаров для животных. Организуем образцы, контроль качества и производство под маркой клиента.",
      examples: "посуда, игрушки, товары для животных",
      items: [
        "посуда",
        "одежда",
        "игрушки",
        "чугунные изделия",
        "плёнки",
        "товары для животных",
        "другие продукты под маркой клиента",
      ],
    },
  },
  de: {
    machinery: {
      title: "Industriemaschinen und Anlagen",
      shortDescription:
        "Wir finden Hersteller von Industriemaschinen, organisieren technische Besuche, Qualitätskontrolle vor Versand und Lieferung nach Europa.",
      extendedDescription:
        "Wir unterstützen Unternehmen beim Import von Maschinen und Produktionslinien aus China — von der Identifikation des passenden Herstellers bis zur Inspektion vor Versand, Exportdokumentation und Transport. Erfahrung in Verpackungs-, Lebensmittel-, Medizin- und Bauindustrie.",
      examples: "u.a. Verpackungslinien, SPA-Geräte, Baumaschinen",
      items: [
        "Maschinen für Verpackungs- und Papierindustrie",
        "Lebensmittelmaschinen",
        "Verarbeitungs- und Produktionslinien",
        "Medizin- und SPA-Geräte",
        "Baumaschinen",
      ],
    },
    battery: {
      title: "Batterietechnologien und Energielösungen",
      shortDescription:
        "Wir verbinden Unternehmen mit Herstellern von Zellen, Batteriepaketen und Energiespeichersystemen in China.",
      extendedDescription:
        "Wir helfen beim Einkauf von Batteriekomponenten — von LFP- und NMC-Zellen über BMS-Systeme und Industriepakete bis zu Ladestationen. Technische Spezifikationen werden geprüft, Muster und Qualitätskontrolle nach Zielmarktanforderungen organisiert.",
      examples: "ESS, Pakete für Energiespeicher, Ladeinfrastruktur",
      items: [
        "LFP- und NMC-Zellen",
        "prismatische und zylindrische Zellen",
        "BMS-Systeme",
        "Batteriepakete",
        "Industriebatterien",
        "Energiespeichersysteme ESS",
        "Ladestationen",
      ],
    },
    emobility: {
      title: "Elektromobilität und Komponenten",
      shortDescription:
        "Sourcing von E-Mobility-Komponenten und Fahrzeugen — von Motoren und Steuerungen bis zu Fertigprodukten.",
      extendedDescription:
        "Wir unterstützen E-Mobility-Projekte: Elektromotorräder, Drohnen, Antriebskomponenten, Batterien und Autoteile. Wir helfen, den Hersteller an technische Spezifikationen und Zielmarktnormen anzupassen.",
      examples: "E-Motorräder, Controller, Reifen, Ersatzteile",
      items: [
        "Elektromotorräder",
        "Motoren und Steuerungen",
        "Batterielösungen",
        "Drohnen",
        "Fahrzeuge",
        "Reifen",
        "Autoteile",
      ],
    },
    chemistry: {
      title: "Chemie und Rohstoffe",
      shortDescription:
        "Import chemischer Rohstoffe und Zusatzstoffe für die Industrie — mit Dokumentenprüfung und Compliance.",
      extendedDescription:
        "Wir finden Lieferanten für Industriechemie, Futtermittelzusätze, Polymere und funktionelle Materialien. Wir unterstützen Zertifikatsprüfung, Labormuster und Gefahrgutlogistik, wo erforderlich.",
      examples: "LLDPE/LDPE/HDPE, Futtermittelzusätze, Industrieklebstoffe",
      items: [
        "Futtermittelzusätze",
        "funktionelle Inhaltsstoffe",
        "Industrierohstoffe",
        "LLDPE, LDPE und HDPE",
        "Industriechemie",
        "Klebstoffe",
      ],
    },
    packaging: {
      title: "Papier, Verpackungen und Materialien",
      shortDescription:
        "Papier, Karton, Folien und Verpackungsrohstoffe direkt von chinesischen Herstellern.",
      extendedDescription:
        "Wir helfen beim Einkauf von Verpackungsmaterialien — von Kraftpapier und GC/FBB-Karton bis PET-Folie und speziellen hitzebeständigen Papieren. Muster, Qualitätskontrolle und Lieferung von Produktionschargen werden organisiert.",
      examples: "Pappbecher, PET-Folie, GC1/GC2-Karton",
      items: [
        "Kraftpapier",
        "Karton GC1, GC2 und FBB",
        "Papier für Becherproduktion",
        "PET-Folie",
        "Verpackungsrohstoffe",
        "Spezial- und hitzebeständige Papiere",
      ],
    },
    textiles: {
      title: "Textilien und technische Materialien",
      shortDescription:
        "Technische Textilien und Textilprodukte — Sourcing, Muster und Chargenkontrolle.",
      extendedDescription:
        "Wir unterstützen den Import von Baumwoll-, Synthetik- und technischen Stoffen sowie Fertigprodukten. Wir helfen bei Grammatur, Zusammensetzung, Farben und organisieren Qualitätskontrolle vor Versand.",
      examples: "Fleece, technische Textilien, Bekleidung nach Maß",
      items: [
        "Fleece",
        "Baumwoll- und Synthetikstoffe",
        "Mischgewebe",
        "Technische Textilien",
        "Spezialmaterialien",
        "Textilprodukte",
      ],
    },
    construction: {
      title: "Bauwesen und Spezialausrüstung",
      shortDescription:
        "Baumaterialien, Modulkonstruktionen und Spezialausrüstung aus China.",
      extendedDescription:
        "Wir importieren Baumaterialien, Container- und Modulhäuser sowie Spezialausrüstung — z.B. für Schieneninfrastruktur. Hersteller werden geprüft, Inspektionen und Transportdokumentation organisiert.",
      examples: "Modulhäuser, Schienenausrüstung, Ausbaumaterialien",
      items: [
        "Container- und Modulhäuser",
        "Schienenausrüstung",
        "Baumaterialien",
        "Spezialmaschinen und -ausrüstung",
      ],
    },
    consumer: {
      title: "Konsumgüter und Private Label",
      shortDescription:
        "Konsumgüter und Private-Label-Produktion nach Kundenspezifikation.",
      extendedDescription:
        "Wir helfen bei Produktion und Import von Alltagsartikeln — von Geschirr und Bekleidung bis Spielzeug und Tierbedarf. Muster, Qualitätskontrolle und Produktion unter Kundenmarke werden organisiert.",
      examples: "Geschirr, Spielzeug, Tierbedarf",
      items: [
        "Geschirr",
        "Bekleidung",
        "Spielzeug",
        "Gusseiserzeugnisse",
        "Folien",
        "Tierbedarf",
        "weitere Produkte unter Kundenmarke",
      ],
    },
  },
  zh: {
    machinery: {
      title: "工业机械与设备",
      shortDescription:
        "搜寻工业机械制造商，组织技术访厂、出货前质量检验及欧洲交付。",
      extendedDescription:
        "支持企业从中国进口机械与生产线——从识别合适制造商到出货前检验、出口单证与运输。在包装、食品、医疗与建筑行业拥有丰富经验。",
      examples: "如包装线、SPA设备、工程机械",
      items: [
        "包装与造纸机械",
        "食品机械",
        "加工与生产线",
        "医疗与SPA设备",
        "工程机械",
      ],
    },
    battery: {
      title: "电池技术与能源解决方案",
      shortDescription:
        "对接中国电芯、电池包与储能系统制造商。",
      extendedDescription:
        "协助采购电池组件——从LFP与NMC电芯到BMS系统、工业电池包与充电站。核实技术规格，按目标市场要求组织样品与质量检验。",
      examples: "ESS、储能电池包、充电基础设施",
      items: [
        "LFP与NMC电芯",
        "方形与圆柱电芯",
        "BMS系统",
        "电池包",
        "工业电池",
        "ESS储能系统",
        "充电站",
      ],
    },
    emobility: {
      title: "电动出行与零部件",
      shortDescription:
        "电动出行零部件与整车采购——从电机控制器到成品。",
      extendedDescription:
        "支持电动摩托车、无人机、驱动组件、电池及汽车零部件等项目。帮助按技术规格与目标市场标准匹配合适制造商。",
      examples: "电动摩托车、控制器、轮胎、备件",
      items: [
        "电动摩托车",
        "电机与控制器",
        "电池解决方案",
        "无人机",
        "车辆",
        "轮胎",
        "汽车零部件",
      ],
    },
    chemistry: {
      title: "化工与原材料",
      shortDescription:
        "工业化学品与添加剂进口——含文件审核与合规核查。",
      extendedDescription:
        "搜寻工业化学品、饲料添加剂、聚合物与功能性材料供应商。支持证书核查、实验室样品及必要的危险品物流。",
      examples: "LLDPE/LDPE/HDPE、饲料添加剂、工业胶粘剂",
      items: [
        "饲料添加剂",
        "功能性成分",
        "工业原料",
        "LLDPE、LDPE与HDPE",
        "工业化学品",
        "粘合材料",
      ],
    },
    packaging: {
      title: "纸张、包装与材料",
      shortDescription:
        "纸、纸板、薄膜与包装原材料，直接对接中国生产商。",
      extendedDescription:
        "协助采购包装材料——从牛皮纸与GC/FBB纸板到PET薄膜及特种耐热纸。组织样品、质量检验与生产批次交付。",
      examples: "纸杯、PET薄膜、GC1/GC2纸板",
      items: [
        "牛皮纸",
        "GC1、GC2与FBB纸板",
        "纸杯用纸",
        "PET薄膜",
        "包装原材料",
        "特种及耐热纸",
      ],
    },
    textiles: {
      title: "纺织品与工程材料",
      shortDescription:
        "技术织物与纺织成品——采购、打样与批次检验。",
      extendedDescription:
        "支持棉质、合成与技术织物及成品进口。协助克重、成分、配色选择，并组织出货前质量检验。",
      examples: "摇粒绒、技术织物、定制服装",
      items: [
        "摇粒绒",
        "棉质与合成面料",
        "混纺面料",
        "技术织物",
        "特种材料",
        "纺织制品",
      ],
    },
    construction: {
      title: "建筑与专业设备",
      shortDescription:
        "建筑材料、模块化建筑及专业设备中国采购。",
      extendedDescription:
        "进口建筑材料、集装箱与模块化房屋及专业设备——如铁路基础设施装备。核实制造商，组织检验与运输单证。",
      examples: "模块化房屋、铁路设备、装修材料",
      items: [
        "集装箱与模块化房屋",
        "铁路设备",
        "建筑材料",
        "专业机械与设备",
      ],
    },
    consumer: {
      title: "消费品与自有品牌",
      shortDescription:
        "消费品及按客户规格进行的自有品牌生产。",
      extendedDescription:
        "协助餐具、服装、玩具及宠物用品等日用品的生产与进口。组织样品、质量检验及客户品牌定制生产。",
      examples: "餐具、玩具、宠物用品",
      items: [
        "餐具",
        "服装",
        "玩具",
        "铸铁制品",
        "薄膜",
        "宠物用品",
        "其他客户品牌产品",
      ],
    },
  },
};

const ids = [
  "machinery",
  "battery",
  "emobility",
  "chemistry",
  "packaging",
  "textiles",
  "construction",
  "consumer",
];

const localeUi = {
  pl: {
    commonSpecializations: "Specjalizacje",
    navSpecializations: "Specjalizacje",
    viewDetails: "Zobacz szczegóły",
    productsHeading: "Zakres produktów",
    examplesHeading: "Przykłady",
    home: {
      eyebrow: "OBSZARY SPECJALIZACJI",
      title: "Produkty i branże, w których się specjalizujemy",
      lead: "Wyszukujemy producentów, organizujemy produkcję i kontrolę jakości w ośmiu kluczowych obszarach — od maszyn przemysłowych po produkty konsumenckie.",
      closing:
        "Nie widzisz swojej kategorii? Opisz produkt — sprawdzimy możliwości produkcji i importu.",
      ctaLabel: "Zobacz wszystkie specjalizacje",
      ariaLabel: "Obszary specjalizacji",
    },
    page: {
      metaTitle: "Specjalizacje — Buy & Bring Solutions",
      metaDescription:
        "Obszary specjalizacji: maszyny przemysłowe, baterie, elektromobilność, chemia, opakowania, tekstylia, budownictwo i produkty konsumenckie.",
      eyebrow: "OBSZARY SPECJALIZACJI",
      title: "Produkty i branże, w których się specjalizujemy",
      lead: "Wspieramy firmy w zakupie maszyn, surowców, komponentów i produktów gotowych bezpośrednio od producentów w Chinach. Poniżej przedstawiamy główne obszary, w których posiadamy doświadczenie w wyszukiwaniu dostawców, organizacji produkcji, kontroli jakości i dostaw.",
      secondaryLead:
        "Nie oznacza to, że ograniczamy się wyłącznie do tych kategorii. Jeżeli poszukujesz innego produktu, opisz swój projekt — sprawdzimy możliwości produkcji i importu.",
      ctaPrimary: "Opisz swój projekt",
      ctaSecondary: "Zobacz realizacje",
    },
  },
  uk: {
    commonSpecializations: "Спеціалізації",
    navSpecializations: "Спеціалізації",
    viewDetails: "Детальніше",
    productsHeading: "Асортимент продукції",
    examplesHeading: "Приклади",
    home: {
      eyebrow: "ОБЛАСТІ СПЕЦІАЛІЗАЦІЇ",
      title: "Продукти та галузі, у яких ми спеціалізуємося",
      lead: "Шукаємо виробників, організовуємо виробництво та контроль якості у восьми ключових напрямках — від промислового обладнання до споживчих товарів.",
      closing:
        "Не бачите своєї категорії? Опишіть продукт — перевіримо можливості виробництва та імпорту.",
      ctaLabel: "Переглянути всі спеціалізації",
      ariaLabel: "Області спеціалізації",
    },
    page: {
      metaTitle: "Спеціалізації — Buy & Bring Solutions",
      metaDescription:
        "Області спеціалізації: промислове обладнання, батареї, електромобільність, хімія, упаковка, текстиль, будівництво та споживчі товари.",
      eyebrow: "ОБЛАСТІ СПЕЦІАЛІЗАЦІЇ",
      title: "Продукти та галузі, у яких ми спеціалізуємося",
      lead: "Підтримуємо компанії у закупівлі машин, сировини, компонентів і готової продукції безпосередньо у виробників у Китаї. Нижче наведено основні напрямки, де ми маємо досвід у пошуку постачальників, організації виробництва, контролю якості та доставки.",
      secondaryLead:
        "Це не означає, що ми обмежуємося лише цими категоріями. Якщо вам потрібен інший продукт, опишіть свій проєкт — ми перевіримо можливості виробництва та імпорту.",
      ctaPrimary: "Опишіть свій проєкт",
      ctaSecondary: "Переглянути реалізації",
    },
  },
  ru: {
    commonSpecializations: "Специализации",
    navSpecializations: "Специализации",
    viewDetails: "Подробнее",
    productsHeading: "Ассортимент продукции",
    examplesHeading: "Примеры",
    home: {
      eyebrow: "ОБЛАСТИ СПЕЦИАЛИЗАЦИИ",
      title: "Продукты и отрасли, в которых мы специализируемся",
      lead: "Ищем производителей, организуем производство и контроль качества в восьми ключевых направлениях — от промышленного оборудования до потребительских товаров.",
      closing:
        "Не видите свою категорию? Опишите продукт — проверим возможности производства и импорта.",
      ctaLabel: "Все специализации",
      ariaLabel: "Области специализации",
    },
    page: {
      metaTitle: "Специализации — Buy & Bring Solutions",
      metaDescription:
        "Области специализации: промышленное оборудование, батареи, электромобильность, химия, упаковка, текстиль, строительство и потребительские товары.",
      eyebrow: "ОБЛАСТИ СПЕЦИАЛИЗАЦИИ",
      title: "Продукты и отрасли, в которых мы специализируемся",
      lead: "Поддерживаем компании в закупке машин, сырья, компонентов и готовой продукции напрямую у производителей в Китае. Ниже представлены основные направления, где у нас есть опыт в поиске поставщиков, организации производства, контроля качества и доставки.",
      secondaryLead:
        "Это не означает, что мы ограничиваемся только этими категориями. Если вам нужен другой продукт, опишите свой проект — мы проверим возможности производства и импорта.",
      ctaPrimary: "Опишите свой проект",
      ctaSecondary: "Смотреть реализованные проекты",
    },
  },
  de: {
    commonSpecializations: "Spezialisierungen",
    navSpecializations: "Spezialisierungen",
    viewDetails: "Details ansehen",
    productsHeading: "Produktumfang",
    examplesHeading: "Beispiele",
    home: {
      eyebrow: "SPEZIALISIERUNGSBEREICHE",
      title: "Produkte und Branchen, auf die wir uns spezialisiert haben",
      lead: "Wir finden Hersteller, organisieren Produktion und Qualitätskontrolle in acht Schlüsselbereichen — von Industriemaschinen bis zu Konsumgütern.",
      closing:
        "Ihre Kategorie fehlt? Beschreiben Sie das Produkt — wir prüfen Produktions- und Importmöglichkeiten.",
      ctaLabel: "Alle Spezialisierungen ansehen",
      ariaLabel: "Spezialisierungsbereiche",
    },
    page: {
      metaTitle: "Spezialisierungen — Buy & Bring Solutions",
      metaDescription:
        "Spezialisierungsbereiche: Industriemaschinen, Batterien, E-Mobilität, Chemie, Verpackungen, Textilien, Bauwesen und Konsumgüter.",
      eyebrow: "SPEZIALISIERUNGSBEREICHE",
      title: "Produkte und Branchen, auf die wir uns spezialisiert haben",
      lead: "Wir unterstützen Unternehmen beim Einkauf von Maschinen, Rohstoffen, Komponenten und Fertigprodukten direkt bei Herstellern in China. Nachfolgend die Hauptbereiche, in denen wir Erfahrung bei der Lieferantensuche, Produktionsorganisation, Qualitätskontrolle und Lieferung haben.",
      secondaryLead:
        "Das bedeutet nicht, dass wir uns ausschließlich auf diese Kategorien beschränken. Wenn Sie ein anderes Produkt suchen, beschreiben Sie Ihr Projekt — wir prüfen Produktions- und Importmöglichkeiten.",
      ctaPrimary: "Projekt beschreiben",
      ctaSecondary: "Referenzen ansehen",
    },
  },
  zh: {
    commonSpecializations: "专业领域",
    navSpecializations: "专业领域",
    viewDetails: "查看详情",
    productsHeading: "产品范围",
    examplesHeading: "示例",
    home: {
      eyebrow: "专业领域",
      title: "我们专注的产品与行业",
      lead: "在八个核心领域为客户搜寻制造商、组织生产与质量检验——涵盖工业机械至消费品。",
      closing: "未找到您的品类？描述产品需求——我们将评估生产与进口可行性。",
      ctaLabel: "查看全部专业领域",
      ariaLabel: "专业领域",
    },
    page: {
      metaTitle: "专业领域 — Buy & Bring Solutions",
      metaDescription:
        "专业领域：工业机械、电池、电动出行、化工、包装、纺织品、建筑及消费品。",
      eyebrow: "专业领域",
      title: "我们专注的产品与行业",
      lead: "支持企业直接从中国制造商采购机械、原材料、零部件及成品。以下是我们拥有供应商搜寻、生产组织、质量检验与交付经验的主要领域。",
      secondaryLead:
        "这并不意味着我们仅限于这些品类。若您需要其他产品，请描述项目——我们将评估生产与进口可行性。",
      ctaPrimary: "描述您的项目",
      ctaSecondary: "查看案例",
    },
  },
};

function buildCategories(locale) {
  const data = categoryTranslations[locale];
  return ids.map((id) => ({ id, ...data[id] }));
}

function patchLocale(locale) {
  const file = join(dir, `${locale}.json`);
  const json = JSON.parse(readFileSync(file, "utf8"));
  const ui = localeUi[locale];

  json.common.specializations = ui.commonSpecializations;
  json.nav.specializations = ui.navSpecializations;

  json.home.specializations = {
    ...ui.home,
  };

  json.specializations = {
    ui: {
      viewDetails: ui.viewDetails,
      productsHeading: ui.productsHeading,
      examplesHeading: ui.examplesHeading,
    },
    categories: buildCategories(locale),
  };

  json.pages.specializations = {
    meta: {
      title: ui.page.metaTitle,
      description: ui.page.metaDescription,
    },
    hero: {
      eyebrow: ui.page.eyebrow,
      title: ui.page.title,
      lead: ui.page.lead,
    },
    secondaryLead: ui.page.secondaryLead,
    sections: [],
    cta: {
      primary: { label: ui.page.ctaPrimary, href: "/kontakt" },
      secondary: { label: ui.page.ctaSecondary, href: "/realizacje" },
    },
  };

  writeFileSync(file, `${JSON.stringify(json, null, 2)}\n`);
  console.log(`Patched ${locale}.json`);
}

for (const locale of ["pl", "uk", "ru", "de", "zh"]) {
  patchLocale(locale);
}
