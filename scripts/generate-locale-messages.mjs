#!/usr/bin/env node
import { writeFileSync } from "fs";
import { join } from "path";

const dir = join(process.cwd(), "src/i18n/messages");

const roadmapStages = [
  {
    id: "brief",
    title: "Brief i specyfikacja",
    description:
      "Poznajemy produkt, jego zastosowanie, wymagania techniczne, planowaną ilość, budżet, termin oraz kraj docelowy.",
    ctaLabel: "Wyślij brief",
    ctaId: "contact",
    imageAlt: "Spotkanie biznesowe i planowanie projektu importu",
  },
  {
    id: "sourcing",
    title: "Wyszukiwanie i porównanie producentów",
    description:
      "Wyszukujemy odpowiednie fabryki, zbieramy oferty oraz porównujemy konfiguracje, ceny, terminy produkcji, MOQ i warunki handlowe.",
    ctaLabel: "Zobacz jak szukamy",
    ctaId: "sourcing",
    imageAlt: "Magazyn z towarami — wyszukiwanie dostawców",
  },
  {
    id: "verification",
    title: "Weryfikacja fabryki i próbek",
    description:
      "Sprawdzamy producenta, dokumentację, możliwości produkcyjne oraz — gdy jest to potrzebne — organizujemy próbki, wideoweryfikację lub audyt.",
    ctaLabel: "Umów weryfikację",
    ctaId: "audit",
    imageAlt: "Hala produkcyjna — weryfikacja fabryki w Chinach",
  },
  {
    id: "production",
    title: "Zamówienie i nadzór nad produkcją",
    description:
      "Pomagamy uzgodnić specyfikację, warunki płatności, harmonogram i sposób odbioru. Koordynujemy komunikację z producentem podczas realizacji zamówienia.",
    ctaLabel: "Wyślij zapytanie",
    ctaId: "contact",
    imageAlt: "Nadzór nad produkcją w fabryce",
  },
  {
    id: "qc",
    title: "Kontrola jakości i dokumentów",
    description:
      "Sprawdzamy zgodność towaru z ustaleniami, ilość, opakowanie, oznakowanie, działanie oraz dostępne dokumenty przed wysyłką.",
    ctaLabel: "Kontrola jakości",
    ctaId: "qc",
    imageAlt: "Kontrola jakości i dokumentacja przed wysyłką",
  },
  {
    id: "delivery",
    title: "Transport, odprawa i dostawa",
    description:
      "Organizujemy eksport z Chin, fracht, odprawę celną i dostawę pod wskazany adres w Polsce, Ukrainie lub innym kraju europejskim.",
    ctaLabel: "Oblicz transport",
    ctaId: "freight",
    imageAlt: "Transport i dostawa door-to-door",
  },
];

const processSteps = [
  {
    title: "Brief i specyfikacja",
    description:
      "Poznajemy produkt, jego zastosowanie, wymagania techniczne, planowaną ilość, budżet, termin oraz kraj docelowy.",
  },
  {
    title: "Wyszukiwanie i porównanie producentów",
    description:
      "Wyszukujemy odpowiednie fabryki, zbieramy oferty oraz porównujemy konfiguracje, ceny, terminy produkcji, MOQ i warunki handlowe.",
  },
  {
    title: "Weryfikacja fabryki i próbek",
    description:
      "Sprawdzamy producenta, dokumentację, możliwości produkcyjne oraz — gdy jest to potrzebne — organizujemy próbki, wideoweryfikację lub audyt.",
  },
  {
    title: "Zamówienie i nadzór nad produkcją",
    description:
      "Pomagamy uzgodnić specyfikację, warunki płatności, harmonogram i sposób odbioru. Koordynujemy komunikację z producentem podczas realizacji zamówienia.",
  },
  {
    title: "Kontrola jakości i dokumentów",
    description:
      "Sprawdzamy zgodność towaru z ustaleniami, ilość, opakowanie, oznakowanie, działanie oraz dostępne dokumenty przed wysyłką.",
  },
  {
    title: "Transport, odprawa i dostawa",
    description:
      "Organizujemy eksport z Chin, fracht, odprawę celną i dostawę pod wskazany adres w Polsce, Ukrainie lub innym kraju europejskim.",
  },
];

function pageBlock(meta, hero, sections, cta) {
  return { meta, hero, sections, cta };
}

function buildPl() {
  return {
    common: {
      brand: "Buy & Bring Solutions",
      brandShort: "B&BS",
      brandRegional: "B&BS Poland",
      home: "Strona główna",
      services: "Usługi",
      process: "Jak pracujemy",
      cases: "Realizacje",
      about: "O nas",
      china: "Działamy w Chinach",
      calculator: "Kalkulator",
      contact: "Kontakt",
      consultation: "Konsultacja",
      describeProject: "Opisz projekt",
      describeYourProject: "Opisz swój projekt",
      bookConsultation: "Umów konsultację",
      calculateImport: "Oblicz orientacyjny koszt importu",
      sendInquiry: "Wyślij zapytanie",
      learnMore: "Dowiedz się więcej",
      viewAll: "Zobacz wszystkie",
      close: "Zamknij",
      openMenu: "Otwórz menu",
      closeMenu: "Zamknij menu",
      previousSlide: "Poprzedni slajd",
      nextSlide: "Następny slajd",
      language: "Język",
      loading: "Ładowanie…",
      error: "Wystąpił błąd",
      tryAgain: "Spróbuj ponownie",
      ok: "OK",
      required: "Pole wymagane",
      optional: "Opcjonalne",
      privacyConsent:
        "Wyrażam zgodę na przetwarzanie danych osobowych zgodnie z",
      privacyPolicy: "polityką prywatności",
      cookiePolicy: "polityką cookies",
      terms: "regulamin",
      calculatorDisclaimer: "zastrzeżenie kalkulatora",
      footerPages: "Strony",
      footerServices: "Usługi",
      footerContact: "Kontakt",
      footerLegal: "Informacje prawne",
      email: "E-mail",
      phone: "Telefon",
      whatsapp: "WhatsApp",
      allRightsReserved: "Wszelkie prawa zastrzeżone.",
      modularServices: "Usługi modułowe",
      importCalculator: "Kalkulator importu",
      bookConsultationNav: "Umów konsultację",
      company: "Firma",
      tools: "Narzędzia",
      helpAtThisStage: "Pomoc na tym etapie?",
      submitForVerification: "Prześlij dane do weryfikacji",
      requestContact: "Poproś o kontakt",
      sendAnotherInquiry: "Wyślij kolejne zapytanie",
    },
    nav: {
      home: "Strona główna",
      services: "Usługi",
      process: "Jak pracujemy",
      cases: "Realizacje",
      about: "O nas",
      china: "Działamy w Chinach",
      calculator: "Kalkulator",
      contact: "Kontakt",
      cta: "Opisz projekt",
    },
    layout: {
      breadcrumb: { ariaLabel: "Nawigacja okruszkowa" },
    },
    home: {
      hero: {
        eyebrow: "Buy & Bring Solutions · Polska — Chiny",
        title:
          "Import z Chin dla firm — od sprawdzonego producenta do Twojego magazynu",
        paragraph:
          "Wyszukujemy i weryfikujemy producentów, kontrolujemy produkcję i jakość, organizujemy eksport, transport, odprawę celną oraz dostawę do Polski i innych krajów Europy.",
        supporting:
          "Możesz powierzyć nam cały proces albo zlecić tylko wybrany etap.",
        trustHeading: "Dlaczego firmy wybierają Buy & Bring Solutions",
        ariaLabel: "Strona główna",
      },
      stats: {
        ariaLabel: "Kluczowe wskaźniki firmy",
        experience: {
          value: "17 lat",
          label: "doświadczenia we współpracy z Chinami",
        },
        clients: { value: "275+", label: "obsłużonych klientów" },
        containers: { value: "110+", label: "dostarczonych kontenerów" },
        foshan: {
          value: "Foshan",
          label: "operacje i wsparcie na miejscu w Chinach",
        },
      },
      trust: {
        localChina: {
          title: "Działamy na miejscu w Chinach",
          description:
            "Nasz zespół operacyjny w Foshan kontaktuje się z producentami, koordynuje zamówienia oraz organizuje kontrole i wysyłki.",
        },
        verification: {
          title: "Weryfikujemy producentów",
          description:
            "Sprawdzamy dane firmy, możliwości produkcyjne, dokumentację oraz zgodność oferty z wymaganiami projektu.",
        },
        quality: {
          title: "Kontrolujemy towar przed wysyłką",
          description:
            "W zależności od projektu organizujemy kontrolę przedprodukcyjną, kontrolę w trakcie produkcji lub inspekcję przed wysyłką.",
        },
        logistics: {
          title: "Organizujemy dostawę od fabryki do magazynu",
          description:
            "Koordynujemy eksport, transport morski, kolejowy, lotniczy lub drogowy, odprawę celną i dostawę końcową.",
        },
        flexible: {
          title: "Pełny proces lub wybrana usługa",
          description:
            "Możesz zlecić nam kompleksową obsługę albo tylko wyszukanie producenta, kontrolę jakości, konsolidację lub transport.",
        },
      },
      roadmap: {
        heading: "Jak przebiega import z Chin",
        stages: roadmapStages,
      },
      casesTeaser: {
        eyebrow: "Realizacje",
        title: "Wybrane projekty importu z Chin",
        lead: "Poniżej przykłady współpracy w różnych branżach. Ze względu na poufność nie publikujemy danych klientów — na stronie Realizacje znajdziesz zakres, proces i rezultaty.",
        imageAlt:
          "Kontenery cargo — logistyka i realizacje importu z Chin",
        ctaLabel: "Zobacz realizacje",
        highlights: {
          projects: "Projektów w portfolio",
          categories: "Branż w realizacjach",
          clients: "Obsłużonych klientów",
        },
      },
      industries: {
        heading: "Branże i kategorie produktów",
        closing:
          "Nie widzisz swojej kategorii? Opisz produkt — sprawdzimy możliwości produkcji i dostawy.",
      },
      seo: {
        title: "Import z Chin dla firm | Buy & Bring Solutions",
        description:
          "Wyszukiwanie i weryfikacja producentów, kontrola jakości, produkcja pod marką własną, transport, odprawa celna i dostawa z Chin do Polski i Europy.",
      },
    },
    services: {
      section: {
        heading: "Usługi dopasowane do etapu Twojego projektu",
        supporting:
          "Możemy przeprowadzić cały proces importu albo wesprzeć Cię tylko na wybranym etapie.",
      },
      phases: {
        "pre-production": {
          label: "Przed produkcją",
          description:
            "Od wyszukiwania producenta po kontrolę jakości i OEM.",
        },
        logistics: {
          label: "Logistyka",
          description:
            "Od fabryki do portu — płatności, konsolidacja i fracht.",
        },
        delivery: {
          label: "Dostawa w UE",
          description:
            "Transport, odprawa celna i dostawa pod wskazany adres.",
        },
      },
      modules: {
        sourcing: {
          title: "Wyszukiwanie producentów i organizacja zakupu",
          scope:
            "Wyszukujemy producentów, zbieramy i porównujemy oferty, analizujemy MOQ, terminy, konfiguracje oraz warunki płatności i dostawy.",
        },
        verification: {
          title: "Weryfikacja dostawców i audyty fabryk",
          scope:
            "Sprawdzamy dane rejestrowe, zakres działalności, możliwości produkcyjne, dokumentację i zgodność fabryki z wymaganiami projektu.",
        },
        qc: {
          title: "Kontrola jakości towarów",
          scope:
            "Organizujemy kontrolę jakości na podstawie uzgodnionej specyfikacji, checklisty, próbek referencyjnych i wymagań klienta.",
        },
        oem: {
          title: "Produkcja pod marką własną — Private Label i OEM",
          scope:
            "Pomagamy dostosować produkt, logo, opakowanie, etykiety i instrukcję do wymagań marki oraz rynku docelowego.",
        },
        "payment-export": {
          title: "Koordynacja płatności i eksportu z Chin",
          scope:
            "Koordynujemy dokumentację handlową i eksportową oraz uzgodniony model współpracy z producentem.",
        },
        consolidation: {
          title: "Konsolidacja towarów od wielu producentów",
          scope:
            "Organizujemy odbiór towarów z kilku fabryk, magazynowanie, kontrolę kompletności, przeładunek i przygotowanie wspólnej wysyłki.",
        },
        freight: {
          title: "Transport, odprawa celna i dostawa",
          scope:
            "Dobieramy sposób transportu, koordynujemy fracht, dokumentację, odprawę celną oraz dostawę końcową.",
        },
      },
      card: {
        relatedStage: "Powiązany etap",
        helpCta: "Pomoc na tym etapie?",
      },
    },
    process: {
      section: {
        heading: "Jak przebiega import z Chin",
        steps: processSteps,
      },
      page: pageBlock(
        {
          title: "Proces importu — Buy & Bring Solutions",
          description:
            "Poznaj pełną ścieżkę importu z Chin — od briefu i weryfikacji dostawcy po fracht, odprawę celną i dostawę door-to-door.",
        },
        {
          eyebrow: "Mapa współpracy",
          title: "Import z Chin krok po kroku",
          lead: "Każdy projekt przechodzi przez przewidywalne etapy. Wiesz, co dzieje się teraz, co będzie dalej i kto za to odpowiada — po stronie polskiej i chińskiej.",
        },
        [
          {
            title: "Od briefu do planu działania",
            body: "Zaczynamy od krótkiego briefu: produkt, wolumen, budżet i harmonogram. Na tej podstawie proponujemy zakres — pełny import end-to-end albo wybrane moduły wraz z propozycją kolejnych kroków.",
            bullets: [
              "Analiza produktu i wymagań rynku UE",
              "Wstępna ocena ryzyk i harmonogramu",
              "Propozycja modułów i transparentny kosztorys",
            ],
          },
          {
            title: "Transparentność na każdym etapie",
            body: "Nie znikamy między etapami. Utrzymujemy kontakt i informujemy o postępach — w zależności od fazy projektu otrzymujesz dokumenty, zdjęcia lub podsumowania. Możesz wejść w proces w dowolnym momencie albo powierzyć nam całość.",
            bullets: [
              "Stały opiekun projektu po stronie PL",
              "Zespół operacyjny na miejscu w Chinach",
              "Aktualizacje zgodnie z ustaleniami projektu",
            ],
          },
        ],
        {
          primary: { label: "Wyślij zapytanie", href: "/kontakt" },
          secondary: { label: "Umów konsultację", href: "/konsultacja" },
        },
      ),
    },
    forms: {
      validation: {
        required: "To pole jest wymagane",
        email: "Podaj prawidłowy adres e-mail",
        phone: "Podaj prawidłowy numer telefonu",
      },
      contact: {
        title: "Wyślij zapytanie",
        description:
          "Opisz projekt — odpowiemy z propozycją zakresu i kolejnych kroków.",
        fields: {
          name: "Imię i nazwisko",
          company: "Firma",
          email: "E-mail",
          phone: "Telefon",
          scope: "Zakres potrzebnej pomocy",
          message: "Opis projektu",
        },
        placeholders: {
          name: "Jan Kowalski",
          company: "Nazwa firmy Sp. z o.o.",
          email: "jan@firma.pl",
          phone: "+48 783 232 971",
          message:
            "Produkt, ilość, harmonogram, preferowany zakres usług...",
        },
        scopeOptions: {
          sourcing: "Wyszukiwanie producenta",
          audit: "Weryfikacja lub audyt fabryki",
          qc: "Kontrola jakości",
          oem: "Private Label / OEM",
          consolidation: "Konsolidacja",
          freight: "Transport i odprawa",
          full: "Kompleksowa obsługa importu",
          other: "Inne",
        },
        submit: "Wyślij zapytanie",
        sendAnother: "Wyślij kolejne zapytanie",
        success: {
          title: "Dziękujemy za zapytanie",
          description:
            "Otrzymaliśmy Twoją wiadomość. Skontaktujemy się wkrótce z propozycją dalszych kroków.",
        },
        error: {
          title: "Nie udało się wysłać formularza",
          description:
            "Spróbuj ponownie później lub skontaktuj się z nami bezpośrednio.",
        },
      },
      consultation: {
        title: "Zarezerwuj termin",
        description:
          "Podaj dane kontaktowe i temat rozmowy — odezwiemy się, aby ustalić dogodny termin.",
        fields: {
          name: "Imię i nazwisko",
          email: "E-mail",
          topic: "Temat konsultacji",
          notes: "Krótki opis (opcjonalnie)",
        },
        placeholders: {
          name: "Jan Kowalski",
          email: "jan@firma.pl",
          notes: "Czego dotyczy projekt?",
        },
        topicOptions: {
          sourcing: "Wyszukiwanie dostawcy",
          audit: "Audyt fabryki",
          qc: "Kontrola jakości",
          logistics: "Logistyka i transport",
          full: "Pełny proces importu",
        },
        submit: "Umów konsultację",
        footnote: "Wolisz napisać zamiast rozmawiać?",
        footnoteLink: "Wyślij zapytanie",
        sendAnother: "Wyślij kolejne zgłoszenie",
        success: {
          title: "Dziękujemy — termin w drodze",
          description:
            "Otrzymaliśmy zgłoszenie. Skontaktujemy się, aby ustalić termin konsultacji.",
        },
      },
      serviceLead: {
        title: "Zapytanie o wybraną usługę",
        description:
          "Opisz krótko swoje potrzeby — odpowiemy z wyceną wybranego modułu, bez konieczności wykupu pełnego pakietu.",
        selectedService: "Wybrana usługa",
        fields: {
          name: "Imię i nazwisko",
          company: "Firma",
          email: "E-mail",
          phone: "Telefon",
          message: "Opis potrzeb",
        },
        placeholders: {
          name: "Jan Kowalski",
          company: "Nazwa firmy Sp. z o.o.",
          email: "jan@firma.pl",
          phone: "+48 501 234 567",
          message: "Krótko opisz produkt, ilość lub zakres usługi...",
        },
        submit: "Wyślij zapytanie",
        close: "Zamknij",
        success: {
          title: "Dziękujemy za zapytanie",
          description:
            "Skontaktujemy się w sprawie wybranej usługi z propozycją kolejnych kroków.",
        },
      },
    },
    calculator: {
      title: "Orientacyjny kalkulator importu z Chin",
      supporting:
        "Transport, cło, VAT i koszt dostawy do Polski. Wynik ma charakter orientacyjny i nie stanowi oferty handlowej.",
      brandNote: "Buy & Bring Solutions",
      fields: {
        sectionTitle: "Dane przesyłki",
        intro:
          "Najedź lub kliknij (?) przy polu, jeśli nie wiesz co wpisać.",
        goods: "Wartość towaru",
        currency: "Waluta towaru",
        mode: "Sposób transportu",
        cbm: "Objętość (m³)",
        kg: "Waga brutto (kg)",
        incoterm: "Incoterm",
        cnCodes: "Liczba kodów CN",
        duty: "Stawka cła",
        customDuty: "Własna stawka (%)",
        usdPln: "Kurs USD/PLN",
        eurPln: "Kurs EUR/PLN",
        insurance: "Dodać ubezpieczenie 0,5% (min. 50 USD)",
        insuranceCif: "Ubezpieczenie wliczone w wartość CIF",
        calculate: "Oblicz orientacyjny koszt",
      },
      fieldHelp: {
        goods:
          "Wpisz kwotę z faktury proforma lub oferty dostawcy. Przy EXW i FOB to cena samego towaru — bez transportu i cła.",
        goodsCif:
          "Wpisz kwotę z faktury CIF — cena towaru już z transportem morskim do portu docelowego. Nie dodawaj frachtu osobno.",
        currency:
          "Waluta, w której wystawiona jest faktura od chińskiego dostawcy. Najczęściej USD lub EUR.",
        mode: "Wybierz sposób wysyłki. Cały kontener (20/40 ft) = duża regularna dostawa. LCL = mniejsza ilość w współdzielonym kontenerze. Lotniczy = szybko, ale drożej.",
        cbm: "Objętość zapakowanego towaru w metrach sześciennych. Znajdziesz ją na liście pakowej albo oblicz: długość × szerokość × wysokość w metrach.",
        kg: "Waga całego ładunku z opakowaniem i paletami, w kilogramach. Na liście pakowej szukaj „gross weight” lub „waga brutto”.",
        incoterm:
          "Warunki dostawy — sprawdź na fakturze proforma. EXW = odbiór z fabryki w Chinach. FOB = dostarczone do portu w Chinach. CIF = cena obejmuje transport morski do portu docelowego.",
        cnCodes:
          "Ile różnych rodzajów towarów jest w przesyłce. Jeden produkt → wpisz 1. Mix produktów → liczba różnych kodów celnych.",
        duty: "Podatek celny od importu — zależy od rodzaju produktu. Jeśli nie znasz stawki, wybierz „Nie znam” — zobaczysz trzy scenariusze: 0%, 5% i 10%.",
        customDuty:
          "Wpisz stawkę cła z bazy TARIC lub podaną przez brokera celnego, np. 3,5%.",
        usdPln:
          "Kurs wymiany dolara na złotówkę. Domyślnie pobierany automatycznie z NBP (tabela A). Możesz go zmienić ręcznie.",
        eurPln:
          "Kurs wymiany euro na złotówkę. Domyślnie pobierany automatycznie z NBP (tabela A). Możesz go zmienić ręcznie.",
        insurance:
          "Ubezpieczenie ładunku na czas transportu — 0,5% wartości towaru, minimum 50 USD. Zazwyczaj warto je doliczyć.",
        insuranceCif:
          "Przy CIF ubezpieczenie jest już wliczone w cenę towaru — nie trzeba dodawać osobno.",
      },
      transportModes: {
        sea20: "Morze — kontener 20 ft",
        sea40: "Morze — kontener 40 ft",
        sea40hc: "Morze — kontener 40 HC",
        sealcl: "Morze — LCL",
        rail20: "Kolej — kontener 20 ft",
        rail40: "Kolej — kontener 40 HQ",
        raillcl: "Kolej — LCL",
        air: "Lotniczy",
      },
      dutyOptions: {
        unknown: "Nie znam — pokaż 0/5/10%",
        "0": "0%",
        "3": "3%",
        "5": "5%",
        "10": "10%",
        custom: "Inna",
      },
      results: {
        title: "Wynik",
        emptyState: "Uzupełnij dane i kliknij „Oblicz”.",
        totalCash: "Środki potrzebne przy imporcie (z VAT)",
        landed: "Koszt landed bez VAT",
        transport: "Transport",
        transportCifNote:
          "Międzynarodowy fracht wliczony w wartość CIF",
        transportLocal: "Transport (lokalny PL)",
        goods: "Wartość towaru",
        insurance: "Ubezpieczenie",
        customsValue: "Wartość celna",
        duty: "Cło",
        vat: "VAT importowy 23%",
        broker: "Agencja celna",
        dutyRange: "Zakres przy tej stawce cła",
        scenarios: {
          duty: "Cło",
          landed: "Landed bez VAT",
          total: "Środki z VAT",
        },
        ratesBadge: "Dane planistyczne",
        ratesNotOffer: "wynik nie jest ofertą",
        ratesNbp: "kursy NBP",
        footerDisclaimer:
          "VAT 23%. Cło zależy od kodu CN/TARIC. Odprawa brokera: 250 PLN + 20 PLN za dodatkowy kod CN. Zakres transportu: ±15%. Wartość VAT jest pokazywana osobno, ponieważ dla czynnego podatnika może podlegać rozliczeniu.",
      },
      disclaimers: {
        form: "Stawki są przykładowe i wymagają regularnej aktualizacji. Kalkulator nie obsługuje automatycznie towarów niebezpiecznych, baterii, chemii, żywności, akcyzy ani ceł antydumpingowych.",
        freight:
          "Dokładna wycena frachtu wymaga wagi, objętości, adresu załadunku i miejsca dostawy.",
        general:
          "Wynik ma charakter orientacyjny i nie stanowi oferty handlowej ani porady podatkowej.",
      },
    },
    pages: {
      proces: pageBlock(
        {
          title: "Proces importu — Buy & Bring Solutions",
          description:
            "Poznaj pełną ścieżkę importu z Chin — od briefu i weryfikacji dostawcy po fracht, odprawę celną i dostawę door-to-door.",
        },
        {
          eyebrow: "Mapa współpracy",
          title: "Import z Chin krok po kroku",
          lead: "Każdy projekt przechodzi przez przewidywalne etapy. Wiesz, co dzieje się teraz, co będzie dalej i kto za to odpowiada — po stronie polskiej i chińskiej.",
        },
        [
          {
            title: "Od briefu do planu działania",
            body: "Zaczynamy od krótkiego briefu: produkt, wolumen, budżet i harmonogram. Na tej podstawie proponujemy zakres — pełny import end-to-end albo wybrane moduły wraz z propozycją kolejnych kroków.",
            bullets: [
              "Analiza produktu i wymagań rynku UE",
              "Wstępna ocena ryzyk i harmonogramu",
              "Propozycja modułów i transparentny kosztorys",
            ],
          },
          {
            title: "Transparentność na każdym etapie",
            body: "Nie znikamy między etapami. Utrzymujemy kontakt i informujemy o postępach — w zależności od fazy projektu otrzymujesz dokumenty, zdjęcia lub podsumowania. Możesz wejść w proces w dowolnym momencie albo powierzyć nam całość.",
            bullets: [
              "Stały opiekun projektu po stronie PL",
              "Zespół operacyjny na miejscu w Chinach",
              "Aktualizacje zgodnie z ustaleniami projektu",
            ],
          },
        ],
        {
          primary: { label: "Wyślij zapytanie", href: "/kontakt" },
          secondary: { label: "Umów konsultację", href: "/konsultacja" },
        },
      ),
      about: pageBlock(
        {
          title: "O nas — Buy & Bring Solutions",
          description:
            "Buy & Bring Solutions wspiera firmy w wyszukiwaniu producentów, organizacji produkcji, kontroli jakości i dostawach z Chin do Polski, Ukrainy i Europy.",
        },
        {
          eyebrow: "Kim jesteśmy",
          title: "Most między rynkiem chińskim a Twoją firmą w Europie",
          lead: "17 lat doświadczenia we współpracy z Chinami. Nie jesteśmy pośrednikiem z katalogu — jesteśmy operatorem, który bierze odpowiedzialność za każdy etap.",
        },
        [
          {
            title: "Europa i Chiny — jeden zespół",
            body: "Obsługujemy klientów w Polsce, Ukrainie i innych krajach europejskich. Operacje w Chinach koordynujemy z Foshan — sourcing, audyty, kontrola jakości i eksport. Dzięki temu nie polegamy na przypadkowych agentach — mamy własną obecność na miejscu.",
            bullets: [
              "Obsługa klientów w Polsce, Ukrainie i Europie",
              "Operacje w Foshan, prowincja Guangdong",
              "Komunikacja w języku polskim, angielskim i mandaryńskim",
            ],
          },
          {
            title: "Dlaczego klienci zostają z nami",
            body: "Większość współprac zaczyna się od jednego modułu — np. audytu fabryki lub pierwszej wysyłki próbnej. Gdy widzą, jak pracujemy, powierzają kolejne etapy. Nie wiążemy umową długoterminową — zostajesz, bo proces działa.",
            bullets: [
              "Modułowa współpraca bez sztywnego pakietu",
              "Weryfikacja dostawcy przed płatnością",
              "Pełna dokumentacja zgodna z wymogami UE",
            ],
          },
        ],
        {
          primary: {
            label: "Poznaj nasz zespół w Chinach",
            href: "/zespol-w-chinach",
          },
          secondary: { label: "Wyślij zapytanie", href: "/kontakt" },
        },
      ),
      contact: pageBlock(
        {
          title: "Kontakt — Buy & Bring Solutions",
          description:
            "Wyślij zapytanie o import z Chin — opisz projekt, a odpowiemy z propozycją kolejnych kroków.",
        },
        {
          eyebrow: "Kontakt",
          title: "Opowiedz nam o swoim projekcie",
          lead: "Im więcej szczegółów podasz na starcie, tym szybciej przygotujemy sensowną propozycję.",
        },
        [
          {
            title: "Co warto napisać",
            body: "Nie musisz mieć gotowej specyfikacji — wystarczy opis produktu, planowany wolumen i harmonogram. Resztę doprecyzujemy na konsultacji.",
            bullets: [
              "Produkt — co importujesz, do czego służy",
              "Wolumen — MOQ, planowana ilość, częstotliwość zamówień",
              "Harmonogram — kiedy potrzebujesz dostawy",
              "Zakres — pełny import czy wybrane moduły (np. tylko QC)",
            ],
          },
          {
            title: "Dane kontaktowe",
            body: "Preferujesz rozmowę telefoniczną? Zadzwoń lub napisz — umówimy termin konsultacji.",
            bullets: [
              "E-mail: contact@buybringsolutions.com",
              "Telefon (PL): +48 783 232 971",
              "Telefon (UA): +380 66 496 38 81",
              "Telefon (CN): +86 139 2994 3320",
            ],
          },
        ],
        {
          primary: { label: "Umów konsultację", href: "/konsultacja" },
          secondary: { label: "Zobacz usługi", href: "/uslugi" },
        },
      ),
      consultation: pageBlock(
        {
          title: "Umów konsultację — Buy & Bring Solutions",
          description:
            "Bezpłatna 30-minutowa konsultacja z specjalistą ds. importu z Chin — omówimy Twój projekt, ryzyka i rekomendowany plan.",
        },
        {
          eyebrow: "Narzędzia",
          title: "Bezpłatna konsultacja 30 minut",
          lead: "Porozmawiaj z naszym specjalistą ds. importu — bez zobowiązań. Omówimy produkt, ryzyka, harmonogram i rekomendowany zakres usług.",
        },
        [
          {
            title: "Jak wygląda rozmowa",
            body: "Konsultacja trwa ok. 30 minut online (Zoom / Google Meet) lub telefonicznie. Przygotuj krótki opis produktu, planowany wolumen i to, na czym najbardziej zależy Ci w imporcie.",
            bullets: [
              "Analiza produktu i wymagań rynku UE",
              "Ocena ryzyk (dostawca, certyfikaty, logistyka)",
              "Rekomendacja modułów i orientacyjny harmonogram",
              "Odpowiedzi na pytania o proces i koszty",
            ],
          },
          {
            title: "Z kim rozmawiasz",
            body: "Konsultacje prowadzą doświadczeni koordynatorzy projektów — osoby, które na co dzień nadzorują importy w różnych branżach.",
          },
        ],
        {
          primary: { label: "Wyślij zapytanie", href: "/kontakt" },
          secondary: { label: "Zobacz proces importu", href: "/proces" },
        },
      ),
      calculator: pageBlock(
        {
          title: "Kalkulator importu — Buy & Bring Solutions",
          description:
            "Orientacyjny kalkulator importu z Chin: transport, cło, VAT i koszt dostawy do Polski. Narzędzie planistyczne Buy & Bring Solutions.",
        },
        {
          eyebrow: "Narzędzia",
          title: "Orientacyjny kalkulator importu z Chin",
          lead: "Oszacuj pełny koszt importu — fracht, cło, VAT i obsługę celną — zanim wyślesz zapytanie. Wynik ma charakter orientacyjny i nie stanowi oferty handlowej.",
        },
        [
          {
            title: "Co uwzględnia kalkulator",
            body: "Kalkulator łączy szacunkowy koszt transportu z podstawową kalkulacją celną i podatkową po stronie polskiej.",
            bullets: [
              "Wartość towaru w USD, EUR lub PLN z aktualnymi kursami NBP",
              "Tryby: FCL morski/kolejowy, LCL oraz transport lotniczy",
              "Incoterms EXW, FOB i CIF z odpowiednią wartością celną",
              "Cło, VAT importowy 23% oraz koszt agencji celnej",
              "Opcjonalne ubezpieczenie ładunku (poza CIF)",
            ],
          },
          {
            title: "Czego kalkulator nie obejmuje",
            body: "To narzędzie planistyczne oparte na przykładowych stawkach frachtowych. Dokładna wycena wymaga weryfikacji kodu CN/TARIC, trasy i specyfiki ładunku.",
            bullets: [
              "Towary niebezpieczne, baterie litowe, chemia i żywność",
              "Akcyza, cła antydumpingowe i procedury specjalne",
              "Door-to-door z odbiorem z fabryki (poza wybranym incotermem)",
              "Indywidualne stawki portowe dla konkretnych portów załadunku",
            ],
          },
        ],
        {
          primary: { label: "Wyślij zapytanie o wycenę", href: "/kontakt" },
          secondary: { label: "Umów konsultację", href: "/konsultacja" },
        },
      ),
      cases: pageBlock(
        {
          title: "Realizacje — Buy & Bring Solutions",
          description:
            "Case studies importów z Chin — maszyny przemysłowe, materiały budowlane, EV, opakowania i produkty na zamówienie.",
        },
        {
          eyebrow: "Realizacje i branże",
          title: "Case studies — udane importy z Chin",
          lead: "Wybrane projekty z różnych branż. Ze względu na poufność nie publikujemy danych klientów ani brandingów — pokazujemy zakres, proces i rezultaty.",
        },
        [],
        {
          primary: { label: "Opisz swój projekt", href: "/kontakt" },
          secondary: { label: "Zobacz proces importu", href: "/proces" },
        },
      ),
      services: pageBlock(
        {
          title: "Usługi modułowe — Buy & Bring Solutions",
          description:
            "Każdy etap importu jako osobna usługa — sourcing, audyty, QC, spedycja i dostawa door-to-door. Wybierz moduły, których potrzebujesz.",
        },
        {
          eyebrow: "Usługi modułowe",
          title: "Kupujesz dokładnie to, czego potrzebujesz",
          lead: "Nie musisz wykupywać pełnego pakietu end-to-end. Każdy etap mapy współpracy działa jako samodzielny moduł — od wyszukiwania dostawcy po dostawę pod Twój adres.",
        },
        [
          {
            title: "Jak wybrać moduły",
            body: "Jeśli masz już dostawcę — potrzebujesz może tylko QC i spedycji. Jeśli zaczynasz od zera — zaczynamy od sourcingu i audytu. Na konsultacji pomożemy dobrać minimalny, sensowny zakres.",
            bullets: [
              "Przed produkcją — sourcing, audyty, QC, OEM",
              "Logistyka — płatności, konsolidacja, fracht",
              "Dostawa w UE — odprawa celna, door-to-door",
            ],
          },
        ],
        {
          primary: { label: "Wyślij zapytanie", href: "/kontakt" },
          secondary: { label: "Umów konsultację", href: "/konsultacja" },
        },
      ),
      china: pageBlock(
        {
          title: "Zespół w Chinach — Buy & Bring Solutions",
          description:
            "Operacje w Foshan: wyszukiwanie producentów, komunikacja z fabrykami, kontrole jakości, konsolidacja i przygotowanie wysyłek.",
        },
        {
          eyebrow: "My w Chinach",
          title:
            "Wsparcie operacyjne w Foshan — bliżej producentów i procesu realizacji",
          lead: "Zespół Buy & Bring Solutions w Chinach wspiera wyszukiwanie producentów, komunikację z fabrykami, organizację kontroli, konsolidację oraz przygotowanie wysyłek.",
        },
        [
          {
            title: "Kto jest w zespole",
            body: "Zespół terenowy to specjaliści ds. sourcingu, inżynierowie QC, koordynatorzy logistyczni i tłumacze techniczni. W zależności od rodzaju projektu angażujemy odpowiednich specjalistów technicznych i inspekcyjnych.",
            bullets: [
              "Sourcing i negocjacje — identyfikacja i weryfikacja fabryk",
              "Inżynierowie QC — inspekcje na linii produkcyjnej",
              "Logistyka — odbiór z fabryki, magazyn, konsolidacja",
              "Tłumacze techniczni — specyfikacje, umowy, raporty",
            ],
          },
          {
            title: "Gdzie działamy",
            body: "Nasze operacje w Chinach są koordynowane z Foshan w prowincji Guangdong — blisko producentów i portów eksportowych. Z tej bazy kontaktujemy się z fabrykami, organizujemy inspekcje i przygotowujemy wysyłki.",
            bullets: [
              "Foshan — kontakt z producentami i koordynacja zamówień",
              "Inspekcje jakości i audyty fabryk",
              "Magazynowanie, konsolidacja i dokumentacja eksportowa",
            ],
          },
        ],
        {
          primary: { label: "Poznaj nasz zespół", href: "/kontakt" },
          secondary: {
            label: "Wyjazdy biznesowe do Chin",
            href: "/wyjazdy-do-chin",
          },
        },
      ),
      servicesSourcing: pageBlock(
        {
          title: "Wyszukiwanie dostawców — Buy & Bring Solutions",
          description:
            "Sourcing i negocjacje z fabrykami w Chinach — identyfikacja producentów, porównanie ofert i negocjacja warunków handlowych.",
        },
        {
          eyebrow: "Przed produkcją",
          title: "Wyszukiwanie dostawców i negocjacje",
          lead: "Znajdujemy fabryki dopasowane do Twojej specyfikacji, weryfikujemy wstępnie i negocjujemy warunki — zanim podejmiesz decyzję o współpracy.",
        },
        [
          {
            title: "Co otrzymujesz",
            body: "Na koniec fazy sourcingu masz rekomendowanych dostawców z uzasadnieniem, wyceną próbek i propozycją warunków handlowych do negocjacji.",
            bullets: [
              "Raport porównawczy dostawców",
              "Wycena próbek i MOQ",
              "Rekomendacja z uzasadnieniem ryzyk",
            ],
          },
          {
            title: "Typowy harmonogram",
            stat: "7–14 dni",
            body: "Czas sourcingu zależy od złożoności produktu, liczby wymaganych certyfikatów i dostępności producentów.",
          },
        ],
        {
          primary: { label: "Wyślij zapytanie", href: "/kontakt" },
          secondary: { label: "Umów konsultację", href: "/konsultacja" },
        },
      ),
      servicesAudit: pageBlock(
        {
          title: "Audyty fabryk — Buy & Bring Solutions",
          description:
            "Weryfikacja dostawców i audyty fabryk w Chinach — wizyta na miejscu, ocena mocy produkcyjnych i raport z rekomendacją.",
        },
        {
          eyebrow: "Przed produkcją",
          title: "Audyty fabryk i weryfikacja dostawców",
          lead: "Sprawdzamy producenta zanim zlecisz produkcję — prawnie, operacyjnie i jakościowo. Fizyczna wizyta w fabryce to standard, nie opcja.",
        },
        [
          {
            title: "Rodzaje audytów",
            body: "Dobieramy zakres do ryzyka produktu i wartości zamówienia — od weryfikacji wideo po pełny audit on-site z inspekcją linii produkcyjnej.",
            bullets: [
              "Weryfikacja prawna — licencje, rejestr, księgi handlowe",
              "Audit wideo na żywo — hala, magazyn, próbki produkcji",
              "Wizyta on-site — pełna inspekcja fabryki z raportem foto/wideo",
              "Re-audit — kontrola przed zleceniem dużej serii",
            ],
          },
          {
            title: "Deliverables",
            body: "Raport PDF z oceną ryzyka (zielony / żółty / czerwony), zdjęciami, rekomendacją i listą pytań do negocjacji.",
          },
        ],
        {
          primary: { label: "Zamów audyt fabryki", href: "/kontakt" },
          secondary: { label: "Umów konsultację", href: "/konsultacja" },
        },
      ),
      servicesQc: pageBlock(
        {
          title: "Kontrola jakości — Buy & Bring Solutions",
          description:
            "Inspekcje QC przed wysyłką z Chin — weryfikacja ilości, wymiarów, opakowania i testy funkcjonalne z raportem.",
        },
        {
          eyebrow: "Przed produkcją",
          title: "Kontrola jakości przed wysyłką",
          lead: "Inspekcja towaru zanim opuści fabrykę — sprawdzamy zgodność ze specyfikacją, ilość, opakowanie i działanie. Płacisz dopiero, gdy wiesz, co wysyłasz.",
        },
        [
          {
            title: "Etapy kontroli",
            body: "QC może obejmować inspekcję w trakcie produkcji (DUPRO), przed wysyłką (PSI) lub oba — w zależności od produktu i ryzyka.",
            bullets: [
              "DUPRO — kontrola w trakcie produkcji",
              "PSI — inspekcja przed wysyłką (pre-shipment)",
              "Losowanie próbek według AQL (ISO 2859-1)",
              "Pomiary wymiarowe i testy funkcjonalne",
            ],
          },
          {
            title: "Co sprawdzamy",
            body: "Każda inspekcja ma checklistę dopasowaną do produktu — od elektroniki po materiały budowlane. Raport zawiera zdjęcia każdej usterki.",
            bullets: [
              "Zgodność z approved sample i specyfikacją",
              "Ilość, etykietowanie, instrukcje i opakowanie",
              "Testy działania i wytrzymałości (wg specyfikacji)",
              "Raport Pass / Fail z rekomendacją",
            ],
          },
        ],
        {
          primary: { label: "Zamów inspekcję QC", href: "/kontakt" },
          secondary: { label: "Umów konsultację", href: "/konsultacja" },
        },
      ),
      servicesFreight: pageBlock(
        {
          title: "Spedycja i logistyka — Buy & Bring Solutions",
          description:
            "Spedycja i transport z Chin — fracht morski i lotniczy, konsolidacja ładunków, śledzenie i optymalizacja trasy.",
        },
        {
          eyebrow: "Logistyka",
          title: "Spedycja i transport z Chin do Europy",
          lead: "Rezerwujemy fracht, optymalizujemy trasę i śledzimy ładunek w czasie rzeczywistym — morskim, lotniczym i multimodalnym.",
        },
        [
          {
            title: "Tryby transportu",
            body: "Dobieramy tryb do pilności, wagi i budżetu. Dla większości ładunków B2B optymalny jest fracht morski FCL/LCL; lotniczy stosujemy przy próbkach i pilnych dostawach.",
            bullets: [
              "FCL — pełny kontener (20'/40'/40'HC)",
              "LCL — ładunek drobnica, konsolidacja w portcie",
              "Lotniczy — express i standard air freight",
              "Multimodal — morski + kolej + droga (Chiny–Europa)",
            ],
          },
          {
            title: "Co robimy po stronie logistycznej",
            body: "Od odbioru z fabryki po załadunek w porcie — koordynujemy cały łańcuch po stronie chińskiej, a po dotarciu do UE przejmujemy odprawę i last mile.",
            bullets: [
              "Odbiór z fabryki i transport do portu / lotniska",
              "Konsolidacja ładunków z wielu dostawców",
              "Rezerwacja frachtu i dokumentacja B/L / AWB",
              "Tracking ładunku i alerty o opóźnieniach",
            ],
          },
        ],
        {
          primary: { label: "Wyceń transport", href: "/kalkulator" },
          secondary: { label: "Wyślij zapytanie", href: "/kontakt" },
        },
      ),
    },
    cases: {
      heading: "Realizacje",
      viewCase: "Zobacz realizację",
      category: "Kategoria",
      scope: "Zakres prac",
      result: "Rezultat",
      challenge: "Wyzwanie",
      requirements: "Wymagania",
    },
    cookie: {
      message:
        "Ta strona używa plików cookie w celach niezbędnych do działania oraz — za Twoją zgodą — analitycznych.",
      accept: "Akceptuję",
      reject: "Tylko niezbędne",
      settings: "Ustawienia",
    },
    legal: {
      placeholder:
        "Treść dokumentu prawnego jest w przygotowaniu. W razie pytań skontaktuj się z nami: contact@buybringsolutions.com",
    },
  };
}

// Translation helper: deep clone and apply string map by dot path
function applyTranslations(obj, map) {
  function walk(value, path) {
    if (Array.isArray(value)) {
      return value.map((item, i) => walk(item, `${path}.${i}`));
    }
    if (value && typeof value === "object") {
      const out = {};
      for (const [k, v] of Object.entries(value)) {
        const p = path ? `${path}.${k}` : k;
        out[k] = walk(v, p);
      }
      return out;
    }
    if (typeof value === "string" && map[path]) {
      return map[path];
    }
    return value;
  }
  return walk(obj, "");
}

// Import translations from separate module would be ideal; inline key paths for other locales
// For maintainability we build locale-specific objects

function deepMerge(base, patch) {
  if (!patch) return base;
  if (Array.isArray(patch)) return patch;
  const out = { ...base };
  for (const [k, v] of Object.entries(patch)) {
    if (
      v &&
      typeof v === "object" &&
      !Array.isArray(v) &&
      base[k] &&
      typeof base[k] === "object" &&
      !Array.isArray(base[k])
    ) {
      out[k] = deepMerge(base[k], v);
    } else {
      out[k] = v;
    }
  }
  return out;
}

function migrateOld(old, stages, steps) {
  const p = (k) => old.process[k];
  return {
    common: {
      ...old.common,
      brandRegional:
        old.common.brandRegional === "B&BS Poland"
          ? old.common.brandRegional
          : old.common.brandRegional,
      cookiePolicy: old.common.cookiePolicy,
    },
    nav: old.nav,
    home: {
      hero: old.hero,
      stats: {
        ariaLabel: old.stats.ariaLabel,
        experience: {
          value: old.stats.experienceValue,
          label: old.stats.experienceLabel,
        },
        clients: {
          value: old.stats.clientsValue,
          label: old.stats.clientsLabel,
        },
        containers: {
          value: old.stats.containersValue,
          label: old.stats.containersLabel,
        },
        foshan: {
          value: old.stats.foshanValue,
          label: old.stats.foshanLabel,
        },
      },
      trust: old.trust,
      roadmap: { heading: old.process.heading, stages },
      casesTeaser: {
        eyebrow: old.cases.heading,
        title: old.seo.homeTitle.split(" | ")[0],
        lead: old.seo.homeDescription,
        imageAlt: old.cases.heading,
        ctaLabel: old.cases.viewCase,
        highlights: {
          projects: old.cases.heading,
          categories: old.cases.category,
          clients: old.stats.clientsLabel,
        },
      },
      industries: old.industries,
      seo: { title: old.seo.homeTitle, description: old.seo.homeDescription },
    },
    services: {
      section: {
        heading: old.services.heading,
        supporting: old.services.supporting,
      },
      phases: {
        "pre-production": {
          label: old.services.phasePreProduction,
          description: old.services.sourcing?.description?.slice(0, 60) ?? "",
        },
        logistics: {
          label: old.services.phaseLogistics,
          description: old.services.export?.description?.slice(0, 60) ?? "",
        },
        delivery: {
          label: old.services.phaseDelivery,
          description: old.services.freight?.description?.slice(0, 60) ?? "",
        },
      },
      modules: {
        sourcing: {
          title: old.services.sourcing.title,
          scope: old.services.sourcing.description,
        },
        verification: {
          title: old.services.verification.title,
          scope: old.services.verification.description,
        },
        qc: {
          title: old.services.qc.title,
          scope: old.services.qc.description,
        },
        oem: {
          title: old.services.oem.title,
          scope: old.services.oem.description,
        },
        "payment-export": {
          title: old.services.export.title,
          scope: old.services.export.description,
        },
        consolidation: {
          title: old.services.consolidation.title,
          scope: old.services.consolidation.description,
        },
        freight: {
          title: old.services.freight.title,
          scope: old.services.freight.description,
        },
      },
    },
    process: {
      section: {
        heading: old.process.heading,
        steps: [
          p("step1"),
          p("step2"),
          p("step3"),
          p("step4"),
          p("step5"),
          p("step6"),
        ],
      },
    },
    forms: {
      validation: {
        required: old.forms.validationRequired,
        email: old.forms.validationEmail,
        phone: old.forms.validationPhone,
      },
      contact: {
        title: old.contact.formTitle,
        description: old.contact.formDescription,
        fields: {
          name: old.contact.name,
          company: old.contact.company,
          email: old.contact.email,
          phone: old.contact.phone,
          scope: old.contact.scope,
          message: old.contact.description,
        },
        scopeOptions: old.contact.scopeOptions,
        submit: old.contact.submit,
        success: {
          title: old.contact.successTitle,
          description: old.contact.successDescription,
        },
        error: {
          title: old.contact.errorTitle,
          description: old.contact.errorDescription,
        },
      },
      consultation: {
        fields: {
          topic: old.consultation.projectCategory,
          notes: old.consultation.shortDescription,
        },
      },
    },
    calculator: {
      title: old.calculator.title,
      supporting: old.calculator.supporting,
      fields: {
        goods: old.calculator.productValue,
        currency: old.calculator.currency,
        mode: old.calculator.transportMode,
        cbm: old.calculator.volume,
        kg: old.calculator.grossWeight,
        incoterm: old.calculator.incoterm,
        calculate: old.calculator.calculate,
      },
      disclaimers: { general: old.calculator.disclaimer },
    },
    cases: old.cases,
    cookie: old.cookie,
  };
}

const localePatches = {
  uk: {
    common: {
      brandRegional: "B&BS Ukraine",
      home: "Головна",
      services: "Послуги",
      process: "Як ми працюємо",
      cases: "Реалізації",
      about: "Про нас",
      china: "Працюємо в Китаї",
      calculator: "Калькулятор",
      contact: "Контакти",
      consultation: "Консультація",
      describeProject: "Опишіть проєкт",
      describeYourProject: "Опишіть свій проєкт",
      bookConsultation: "Записатися на консультацію",
      calculateImport: "Розрахувати орієнтовну вартість імпорту",
      sendInquiry: "Надіслати запит",
      learnMore: "Докладніше",
      viewAll: "Переглянути всі",
      close: "Закрити",
      openMenu: "Відкрити меню",
      closeMenu: "Закрити меню",
      previousSlide: "Попередній слайд",
      nextSlide: "Наступний слайд",
      language: "Мова",
      loading: "Завантаження…",
      error: "Сталася помилка",
      tryAgain: "Спробувати знову",
      required: "Обов'язкове поле",
      optional: "Необов'язково",
      privacyConsent:
        "Я погоджуюся на обробку персональних даних відповідно до",
      privacyPolicy: "політики конфіденційності",
      cookiePolicy: "політики cookies",
      terms: "умов використання",
      calculatorDisclaimer: "застереження калькулятора",
      footerPages: "Сторінки",
      footerServices: "Послуги",
      footerContact: "Контакти",
      footerLegal: "Правова інформація",
      allRightsReserved: "Усі права захищені.",
      modularServices: "Модульні послуги",
      importCalculator: "Калькулятор імпорту",
      bookConsultationNav: "Записатися на консультацію",
      company: "Компанія",
      tools: "Інструменти",
      helpAtThisStage: "Потрібна допомога на цьому етапі?",
      submitForVerification: "Надіслати дані на перевірку",
      requestContact: "Запросити контакт",
      sendAnotherInquiry: "Надіслати ще один запит",
    },
    nav: {
      home: "Головна",
      services: "Послуги",
      process: "Як ми працюємо",
      cases: "Реалізації",
      about: "Про нас",
      china: "Працюємо в Китаї",
      calculator: "Калькулятор",
      contact: "Контакти",
      cta: "Опишіть проєкт",
    },
    layout: { breadcrumb: { ariaLabel: "Навігація сторінкою" } },
  },
  ru: {
    common: {
      brandRegional: "B&BS",
      home: "Главная",
      services: "Услуги",
      process: "Как мы работаем",
      cases: "Кейсы",
      about: "О нас",
      china: "Работа в Китае",
      calculator: "Калькулятор",
      contact: "Контакты",
      consultation: "Консультация",
      describeProject: "Опишите проект",
      describeYourProject: "Опишите свой проект",
      bookConsultation: "Записаться на консультацию",
      calculateImport: "Рассчитать ориентировочную стоимость импорта",
      sendInquiry: "Отправить запрос",
      learnMore: "Подробнее",
      viewAll: "Смотреть все",
      close: "Закрыть",
      openMenu: "Открыть меню",
      closeMenu: "Закрыть меню",
      previousSlide: "Предыдущий слайд",
      nextSlide: "Следующий слайд",
      language: "Язык",
      loading: "Загрузка…",
      error: "Произошла ошибка",
      tryAgain: "Попробовать снова",
      required: "Обязательное поле",
      optional: "Необязательно",
      privacyConsent:
        "Я соглашаюсь на обработку персональных данных в соответствии с",
      privacyPolicy: "политикой конфиденциальности",
      cookiePolicy: "политикой cookies",
      terms: "условиями использования",
      calculatorDisclaimer: "ограничением ответственности калькулятора",
      footerPages: "Страницы",
      footerServices: "Услуги",
      footerContact: "Контакты",
      footerLegal: "Правовая информация",
      allRightsReserved: "Все права защищены.",
      modularServices: "Модульные услуги",
      importCalculator: "Калькулятор импорта",
      bookConsultationNav: "Записаться на консультацию",
      company: "Компания",
      tools: "Инструменты",
      helpAtThisStage: "Нужна помощь на этом этапе?",
      submitForVerification: "Отправить данные на проверку",
      requestContact: "Запросить контакт",
      sendAnotherInquiry: "Отправить ещё один запрос",
    },
    nav: {
      home: "Главная",
      services: "Услуги",
      process: "Как мы работаем",
      cases: "Кейсы",
      about: "О нас",
      china: "Работа в Китае",
      calculator: "Калькулятор",
      contact: "Контакты",
      cta: "Опишите проект",
    },
    layout: { breadcrumb: { ariaLabel: "Навигация по странице" } },
  },
  de: {
    common: {
      brandRegional: "B&BS Germany",
      home: "Startseite",
      services: "Leistungen",
      process: "So arbeiten wir",
      cases: "Referenzen",
      about: "Über uns",
      china: "Wir sind in China aktiv",
      calculator: "Rechner",
      contact: "Kontakt",
      consultation: "Beratung",
      describeProject: "Projekt beschreiben",
      describeYourProject: "Beschreiben Sie Ihr Projekt",
      bookConsultation: "Beratung vereinbaren",
      calculateImport: "Orientierungskosten des Imports berechnen",
      sendInquiry: "Anfrage senden",
      learnMore: "Mehr erfahren",
      viewAll: "Alle ansehen",
      close: "Schließen",
      openMenu: "Menü öffnen",
      closeMenu: "Menü schließen",
      previousSlide: "Vorherige Folie",
      nextSlide: "Nächste Folie",
      language: "Sprache",
      loading: "Laden…",
      error: "Ein Fehler ist aufgetreten",
      tryAgain: "Erneut versuchen",
      required: "Pflichtfeld",
      optional: "Optional",
      privacyConsent:
        "Ich stimme der Verarbeitung personenbezogener Daten gemäß der",
      privacyPolicy: "Datenschutzerklärung",
      cookiePolicy: "Cookie-Richtlinie",
      terms: "Nutzungsbedingungen",
      calculatorDisclaimer: "Rechner-Haftungsausschluss",
      footerPages: "Seiten",
      footerServices: "Leistungen",
      footerContact: "Kontakt",
      footerLegal: "Rechtliche Informationen",
      allRightsReserved: "Alle Rechte vorbehalten.",
      modularServices: "Modulare Leistungen",
      importCalculator: "Importrechner",
      bookConsultationNav: "Beratung vereinbaren",
      company: "Unternehmen",
      tools: "Tools",
      helpAtThisStage: "Hilfe in dieser Phase?",
      submitForVerification: "Daten zur Prüfung senden",
      requestContact: "Kontakt anfragen",
      sendAnotherInquiry: "Weitere Anfrage senden",
    },
    nav: {
      home: "Startseite",
      services: "Leistungen",
      process: "So arbeiten wir",
      cases: "Referenzen",
      about: "Über uns",
      china: "Wir sind in China aktiv",
      calculator: "Rechner",
      contact: "Kontakt",
      cta: "Projekt beschreiben",
    },
    layout: { breadcrumb: { ariaLabel: "Brotkrumen-Navigation" } },
  },
  zh: {
    common: {
      brandRegional: "B&BS China",
      home: "首页",
      services: "服务",
      process: "工作流程",
      cases: "案例",
      about: "关于我们",
      china: "中国业务",
      calculator: "计算器",
      contact: "联系",
      consultation: "咨询",
      describeProject: "描述项目",
      describeYourProject: "描述您的项目",
      bookConsultation: "预约咨询",
      calculateImport: "估算进口成本",
      sendInquiry: "发送询盘",
      learnMore: "了解更多",
      viewAll: "查看全部",
      close: "关闭",
      openMenu: "打开菜单",
      closeMenu: "关闭菜单",
      previousSlide: "上一张",
      nextSlide: "下一张",
      language: "语言",
      loading: "加载中…",
      error: "发生错误",
      tryAgain: "重试",
      required: "必填项",
      optional: "选填",
      privacyConsent: "我同意根据",
      privacyPolicy: "隐私政策",
      cookiePolicy: "Cookie 政策",
      terms: "使用条款",
      calculatorDisclaimer: "计算器免责声明",
      footerPages: "页面",
      footerServices: "服务",
      footerContact: "联系",
      footerLegal: "法律信息",
      allRightsReserved: "版权所有。",
      modularServices: "模块化服务",
      importCalculator: "进口计算器",
      bookConsultationNav: "预约咨询",
      company: "公司",
      tools: "工具",
      helpAtThisStage: "此阶段需要帮助？",
      submitForVerification: "提交资料核验",
      requestContact: "请求联系",
      sendAnotherInquiry: "再次发送询盘",
    },
    nav: {
      home: "首页",
      services: "服务",
      process: "工作流程",
      cases: "案例",
      about: "关于我们",
      china: "中国业务",
      calculator: "计算器",
      contact: "联系",
      cta: "描述项目",
    },
    layout: { breadcrumb: { ariaLabel: "面包屑导航" } },
  },
};

// Full translation builders per locale using migrated old files + pl structure
import { readFileSync } from "fs";
import { localeFullOverrides } from "./locale-overrides.mjs";
import { localePageOverrides } from "./locale-pages.mjs";
import { localeCore } from "./locale-core.mjs";

function translateStages(stages, locale) {
  const maps = {
    uk: [
      {
        title: "Бриф і специфікація",
        description:
          "Дізнаємося про продукт, його застосування, технічні вимоги, планову кількість, бюджет, терміни та країну призначення.",
        ctaLabel: "Надіслати бриф",
        imageAlt: "Ділова зустріч і планування проєкту імпорту",
      },
      {
        title: "Пошук і порівняння виробників",
        description:
          "Шукаємо відповідні фабрики, збираємо пропозиції та порівнюємо конфігурації, ціни, терміни виробництва, MOQ і комерційні умови.",
        ctaLabel: "Як ми шукаємо",
        imageAlt: "Склад з товарами — пошук постачальників",
      },
      {
        title: "Перевірка фабрики та зразків",
        description:
          "Перевіряємо виробника, документацію, виробничі можливості та за потреби організовуємо зразки, відеоперевірку або аудит.",
        ctaLabel: "Замовити перевірку",
        imageAlt: "Виробничий цех — перевірка фабрики в Китаї",
      },
      {
        title: "Замовлення та нагляд за виробництвом",
        description:
          "Допомагаємо узгодити специфікацію, умови оплати, графік і спосіб відвантаження. Координуємо комунікацію з виробником під час виконання замовлення.",
        ctaLabel: "Надіслати запит",
        imageAlt: "Нагляд за виробництвом на фабриці",
      },
      {
        title: "Контроль якості та документів",
        description:
          "Перевіряємо відповідність товару домовленостям, кількість, упаковку, маркування, функціональність і наявні документи перед відправленням.",
        ctaLabel: "Контроль якості",
        imageAlt: "Контроль якості та документація перед відправленням",
      },
      {
        title: "Транспорт, митниця та доставка",
        description:
          "Організовуємо експорт з Китаю, фрахт, митне оформлення та доставку за вказаною адресою в Польщі, Україні або іншій європейській країні.",
        ctaLabel: "Розрахувати транспорт",
        imageAlt: "Транспорт і доставка door-to-door",
      },
    ],
    ru: [
      {
        title: "Бриф и спецификация",
        description:
          "Выясняем продукт, сферу применения, технические требования, плановый объём, бюджет, сроки и страну назначения.",
        ctaLabel: "Отправить бриф",
        imageAlt: "Деловая встреча и планирование проекта импорта",
      },
      {
        title: "Поиск и сравнение производителей",
        description:
          "Подбираем подходящие заводы, собираем предложения и сравниваем конфигурации, цены, сроки производства, MOQ и коммерческие условия.",
        ctaLabel: "Как мы ищем",
        imageAlt: "Склад с товарами — поиск поставщиков",
      },
      {
        title: "Проверка завода и образцов",
        description:
          "Проверяем производителя, документацию, производственные возможности, а при необходимости организуем образцы, видеопроверку или аудит.",
        ctaLabel: "Заказать проверку",
        imageAlt: "Производственный цех — проверка завода в Китае",
      },
      {
        title: "Заказ и контроль производства",
        description:
          "Помогаем согласовать спецификацию, условия оплаты, график и способ отгрузки. Координируем коммуникацию с производителем в ходе выполнения заказа.",
        ctaLabel: "Отправить запрос",
        imageAlt: "Надзор за производством на заводе",
      },
      {
        title: "Контроль качества и документов",
        description:
          "Проверяем соответствие товара договорённостям, количество, упаковку, маркировку, функциональность и наличие документов перед отгрузкой.",
        ctaLabel: "Контроль качества",
        imageAlt: "Контроль качества и документация перед отгрузкой",
      },
      {
        title: "Транспортировка, таможня и доставка",
        description:
          "Организуем экспорт из Китая, фрахт, таможенное оформление и доставку по указанному адресу в Польше, Украине или другой европейской стране.",
        ctaLabel: "Рассчитать транспорт",
        imageAlt: "Транспорт и доставка door-to-door",
      },
    ],
    de: [
      {
        title: "Briefing und Spezifikation",
        description:
          "Wir klären Produkt, Einsatzzweck, technische Anforderungen, geplante Menge, Budget, Termin und Zielland.",
        ctaLabel: "Briefing senden",
        imageAlt: "Geschäftstreffen und Planung eines Importprojekts",
      },
      {
        title: "Suche und Vergleich von Herstellern",
        description:
          "Wir finden passende Fabriken, sammeln Angebote und vergleichen Konfigurationen, Preise, Produktionszeiten, MOQ und Handelsbedingungen.",
        ctaLabel: "So suchen wir",
        imageAlt: "Lager mit Waren — Lieferantensuche",
      },
      {
        title: "Fabrik- und Musterprüfung",
        description:
          "Wir prüfen den Hersteller, die Dokumentation und Produktionskapazitäten und organisieren bei Bedarf Muster, Videoprüfung oder Audit.",
        ctaLabel: "Prüfung vereinbaren",
        imageAlt: "Produktionshalle — Fabrikprüfung in China",
      },
      {
        title: "Bestellung und Produktionsüberwachung",
        description:
          "Wir helfen bei Spezifikation, Zahlungsbedingungen, Zeitplan und Abholung. Wir koordinieren die Kommunikation mit dem Hersteller während der Auftragsabwicklung.",
        ctaLabel: "Anfrage senden",
        imageAlt: "Produktionsüberwachung in der Fabrik",
      },
      {
        title: "Qualitätskontrolle und Dokumente",
        description:
          "Wir prüfen Übereinstimmung mit Vereinbarungen, Menge, Verpackung, Kennzeichnung, Funktion und verfügbare Dokumente vor dem Versand.",
        ctaLabel: "Qualitätskontrolle",
        imageAlt: "Qualitätskontrolle und Dokumentation vor dem Versand",
      },
      {
        title: "Transport, Zoll und Lieferung",
        description:
          "Wir organisieren Export aus China, Fracht, Zollabfertigung und Lieferung an die angegebene Adresse in Polen, der Ukraine oder einem anderen europäischen Land.",
        ctaLabel: "Transport berechnen",
        imageAlt: "Transport und Door-to-Door-Lieferung",
      },
    ],
    zh: [
      {
        title: "简报与规格",
        description:
          "了解产品、用途、技术要求、计划数量、预算、交期及目的国。",
        ctaLabel: "发送简报",
        imageAlt: "商务会议与进口项目规划",
      },
      {
        title: "搜寻与比较生产商",
        description:
          "寻找合适工厂，收集报价并比较配置、价格、生产周期、MOQ 与贸易条件。",
        ctaLabel: "了解我们如何搜寻",
        imageAlt: "仓库货物——供应商搜寻",
      },
      {
        title: "工厂与样品核验",
        description:
          "核查生产商、文件与生产能力；必要时安排样品、视频核验或审厂。",
        ctaLabel: "预约核验",
        imageAlt: "生产车间——在华工厂核验",
      },
      {
        title: "下单与生产监督",
        description:
          "协助确认规格、付款条件、时间表与提货方式，并在订单执行期间协调与工厂沟通。",
        ctaLabel: "发送询盘",
        imageAlt: "工厂生产监督",
      },
      {
        title: "质量检验与文件",
        description:
          "发货前核查货物是否符合约定、数量、包装、标识、功能及相关文件。",
        ctaLabel: "质量检验",
        imageAlt: "发货前质量检验与文件",
      },
      {
        title: "运输、清关与交付",
        description:
          "安排中国出口、运费、清关及送达波兰、乌克兰或其他欧洲指定地址。",
        ctaLabel: "估算运输",
        imageAlt: "运输与门到门交付",
      },
    ],
  };
  return stages.map((s, i) => ({ ...s, ...maps[locale][i] }));
}

function buildLocale(locale) {
  const pl = buildPl();
  if (locale === "pl") return pl;

  const stages = translateStages(roadmapStages, locale);
  const patch = deepMerge(localePatches[locale] ?? {}, {
    home: { roadmap: { stages } },
    process: { section: { steps: processSteps.map((s, i) => ({
      title: stages[i]?.title ?? s.title,
      description: stages[i]?.description ?? s.description,
    })) } },
  });
  const core = localeCore[locale] ?? {};
  const full = localeFullOverrides[locale] ?? {};
  const pages = localePageOverrides[locale] ?? {};
  return deepMerge(
    deepMerge(deepMerge(deepMerge(pl, core), patch), full),
    { pages },
  );
}

function flattenKeys(obj, prefix = "") {
  const keys = [];
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) {
      keys.push(...flattenKeys(v, path));
    } else {
      keys.push(path);
    }
  }
  return keys.sort();
}

const pl = buildPl();
writeFileSync(join(dir, "pl.json"), JSON.stringify(pl, null, 2) + "\n");

for (const locale of ["uk", "ru", "de", "zh"]) {
  const data = buildLocale(locale);
  writeFileSync(join(dir, `${locale}.json`), JSON.stringify(data, null, 2) + "\n");
}

const count = flattenKeys(pl).length;
console.log(`Generated 5 locale files. pl.json: ${count} keys total`);
