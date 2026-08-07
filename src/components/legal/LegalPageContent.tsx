import Link from "next/link";

const legalPlaceholders: Record<string, string> = {
  uk: "Зміст цієї сторінки потребує професійної правової перевірки та буде доповнений після підтвердження даних юридичної особи.",
  ru: "Содержание этой страницы требует профессиональной правовой проверки и будет дополнено после подтверждения данных юридического лица.",
  de: "Der Inhalt dieser Seite bedarf einer professionellen rechtlichen Prüfung und wird nach Bestätigung der Unternehmensdaten ergänzt.",
  zh: "本页面内容须经专业法律审核，并在确认法律主体信息后补充完整。",
};

type LegalPageContentProps = {
  title: string;
  locale: string;
  slug: string;
};

type LegalSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

const controllerPlaceholder =
  "[UZUPEŁNIJ: pełna nazwa polskiej spółki/JDG, adres siedziby, NIP oraz ewentualnie KRS/REGON]";
const contactEmail = "buybringsolutionspol@gmail.com";
const updatedAt = "8 sierpnia 2026 r.";

const privacySections: LegalSection[] = [
  {
    title: "1. Administrator danych osobowych",
    paragraphs: [
      `Administratorem danych osobowych użytkowników serwisu jest ${controllerPlaceholder}, prowadzący działalność pod marką B&BS Poland / Buy & Bring Solutions (dalej: „Administrator”).`,
      `W sprawach dotyczących danych osobowych można skontaktować się z Administratorem pod adresem e-mail: ${contactEmail}.`,
    ],
  },
  {
    title: "2. Zakres zbieranych danych",
    paragraphs: [
      "Serwis ma charakter informacyjny i służy prezentacji działalności Administratora oraz nawiązywaniu kontaktu biznesowego. W zależności od sposobu korzystania z serwisu możemy przetwarzać dane podane dobrowolnie w formularzach, w szczególności: imię i nazwisko, nazwę firmy, adres e-mail, numer telefonu, wybraną usługę, opis projektu oraz inne informacje przekazane w treści zapytania.",
      "Podczas korzystania z serwisu mogą być również przetwarzane dane techniczne, takie jak adres IP, informacje o urządzeniu, przeglądarce, czasie żądania i podstawowe logi serwera — w zakresie niezbędnym do zapewnienia bezpieczeństwa i prawidłowego działania serwisu.",
    ],
  },
  {
    title: "3. Cele i podstawy przetwarzania",
    bullets: [
      "udzielenie odpowiedzi na zapytanie oraz prowadzenie komunikacji przed zawarciem umowy — art. 6 ust. 1 lit. b RODO lub, gdy zapytanie składa osoba działająca w imieniu firmy, prawnie uzasadniony interes Administratora z art. 6 ust. 1 lit. f RODO;",
      "prowadzenie dalszej obsługi projektu, przygotowanie oferty, sourcingu, audytu, kontroli jakości, logistyki lub innych usług — art. 6 ust. 1 lit. b RODO;",
      "prowadzenie dokumentacji biznesowej, dochodzenie lub obrona roszczeń oraz zabezpieczenie serwisu — art. 6 ust. 1 lit. f RODO;",
      "realizacja obowiązków podatkowych, księgowych i innych obowiązków wynikających z prawa — art. 6 ust. 1 lit. c RODO;",
      "marketing elektroniczny — wyłącznie jeżeli jest prowadzony na podstawie wymaganej prawem zgody albo innej właściwej podstawy prawnej.",
    ],
  },
  {
    title: "4. Odbiorcy danych i narzędzia wykorzystywane do obsługi zapytań",
    paragraphs: [
      "Dane mogą być powierzane podmiotom wspierającym Administratora w prowadzeniu serwisu i obsłudze klientów, w szczególności dostawcom hostingu i infrastruktury IT, poczty elektronicznej, CRM, komunikatorów, systemów zarządzania projektami, usług chmurowych, księgowych i prawnych.",
      "W aktualnym modelu technicznym dane z formularzy mogą być przekazywane do systemów używanych do obsługi leadów i projektów, w tym Kommo, Telegram oraz Notion. Dostęp do danych otrzymują wyłącznie osoby i podmioty, dla których jest to niezbędne do realizacji danego celu.",
    ],
  },
  {
    title: "5. Przekazywanie danych poza Europejski Obszar Gospodarczy",
    paragraphs: [
      "Niektórzy dostawcy narzędzi informatycznych lub podwykonawcy mogą przetwarzać dane poza Europejskim Obszarem Gospodarczym. W takim przypadku Administrator stosuje mechanizmy przewidziane w RODO, w szczególności decyzje Komisji Europejskiej stwierdzające odpowiedni stopień ochrony albo standardowe klauzule umowne, jeżeli są wymagane.",
      "Jeżeli realizacja konkretnego projektu wymaga przekazania danych do partnerów lub zespołu operacyjnego w Chinach, przekazywany jest wyłącznie zakres danych niezbędny do realizacji projektu i z zastosowaniem właściwych zabezpieczeń prawnych.",
    ],
  },
  {
    title: "6. Okres przechowywania danych",
    bullets: [
      "dane z zapytań, które nie doprowadziły do współpracy — przez okres niezbędny do obsługi zapytania, a następnie co do zasady nie dłużej niż 24 miesiące, chyba że istnieje dalsza podstawa do ich przechowywania;",
      "dane związane z realizacją umowy — przez czas trwania współpracy, a następnie przez okres wymagany przepisami lub do upływu terminów przedawnienia roszczeń;",
      "dane przetwarzane na podstawie zgody — do czasu jej wycofania, o ile brak jest innej podstawy prawnej do dalszego przetwarzania;",
      "logi techniczne — przez okres uzasadniony bezpieczeństwem i utrzymaniem serwisu.",
    ],
  },
  {
    title: "7. Prawa osoby, której dane dotyczą",
    paragraphs: [
      "Na zasadach określonych w RODO przysługuje prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia danych, wniesienia sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie oraz wycofania zgody w dowolnym momencie, jeżeli przetwarzanie odbywa się na podstawie zgody.",
      "Przysługuje również prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych, jeżeli użytkownik uzna, że jego dane są przetwarzane niezgodnie z przepisami.",
    ],
  },
  {
    title: "8. Dobrowolność podania danych i profilowanie",
    paragraphs: [
      "Podanie danych w formularzu jest dobrowolne, lecz brak danych koniecznych do kontaktu może uniemożliwić udzielenie odpowiedzi lub przygotowanie oferty.",
      "Serwis nie podejmuje wobec użytkowników decyzji wywołujących skutki prawne wyłącznie w sposób zautomatyzowany i nie prowadzi profilowania w rozumieniu art. 22 RODO.",
    ],
  },
  {
    title: "9. Bezpieczeństwo i zmiany polityki",
    paragraphs: [
      "Administrator stosuje adekwatne środki techniczne i organizacyjne służące ochronie danych, w tym ograniczenie dostępu do systemów i zabezpieczenia transmisji danych.",
      "Polityka może być aktualizowana w przypadku zmiany funkcjonalności serwisu, dostawców technologicznych albo przepisów prawa. Aktualna wersja jest publikowana na tej stronie.",
    ],
  },
];

const cookieSections: LegalSection[] = [
  {
    title: "1. Czym są pliki cookies",
    paragraphs: [
      "Pliki cookies to niewielkie informacje zapisywane na urządzeniu użytkownika podczas korzystania z serwisu. Podobną funkcję mogą pełnić inne mechanizmy pamięci przeglądarki, np. localStorage lub sessionStorage.",
    ],
  },
  {
    title: "2. Jakie cookies wykorzystuje serwis",
    paragraphs: [
      "Na moment aktualizacji niniejszej polityki serwis nie korzysta z Google Analytics, Meta Pixel ani innych narzędzi reklamowych wymagających profilowania użytkowników. Serwis może korzystać z technicznych mechanizmów niezbędnych do zapewnienia bezpieczeństwa, zapamiętania ustawień interfejsu, utrzymania sesji lub prawidłowego działania funkcji serwisu.",
      "Jeżeli w przyszłości zostaną wdrożone cookies analityczne, reklamowe lub inne technologie, które nie są niezbędne do działania serwisu, zostaną uruchomione dopiero po uzyskaniu wymaganej zgody użytkownika, a polityka zostanie odpowiednio zaktualizowana.",
    ],
  },
  {
    title: "3. Podstawa prawna",
    paragraphs: [
      "Przechowywanie informacji lub uzyskiwanie dostępu do informacji zapisanej w urządzeniu końcowym odbywa się zgodnie z art. 399 ustawy z dnia 12 lipca 2024 r. — Prawo komunikacji elektronicznej. Mechanizmy niezbędne do świadczenia funkcji wyraźnie żądanej przez użytkownika mogą być używane bez dodatkowej zgody; pozostałe wymagają uprzedniej zgody.",
    ],
  },
  {
    title: "4. Zarządzanie cookies",
    paragraphs: [
      "Użytkownik może zmienić ustawienia cookies w swojej przeglądarce, usunąć zapisane pliki cookies albo zablokować ich zapisywanie. Ograniczenie cookies technicznych może spowodować, że część funkcji serwisu nie będzie działać prawidłowo.",
      "Jeżeli serwis wprowadzi panel zarządzania zgodami, użytkownik będzie mógł w nim w każdej chwili zmienić lub wycofać zgodę na cookies inne niż niezbędne.",
    ],
  },
  {
    title: "5. Dane techniczne i dostawcy infrastruktury",
    paragraphs: [
      "Niezależnie od cookies dostawca hostingu i infrastruktury może przetwarzać standardowe logi techniczne, w tym adres IP, datę i czas żądania, informacje o przeglądarce i urządzeniu. Dane te są wykorzystywane w celach bezpieczeństwa, diagnostyki i utrzymania serwisu.",
    ],
  },
  {
    title: "6. Zmiany polityki cookies",
    paragraphs: [
      "Lista wykorzystywanych technologii może zmieniać się wraz z rozwojem serwisu. W przypadku wdrożenia nowych narzędzi polityka cookies oraz — jeżeli będzie to wymagane — mechanizm zbierania zgód zostaną zaktualizowane.",
    ],
  },
];

const termsSections: LegalSection[] = [
  {
    title: "1. Informacje ogólne",
    paragraphs: [
      `Serwis internetowy jest prowadzony przez ${controllerPlaceholder}, działający pod marką B&BS Poland / Buy & Bring Solutions (dalej: „Usługodawca”). Kontakt z Usługodawcą: ${contactEmail}.`,
      "Serwis ma przede wszystkim charakter informacyjny i prezentacyjny. Przedstawia zakres usług związanych m.in. z sourcingiem, weryfikacją producentów, audytami fabryk, kontrolą jakości, organizacją produkcji, importem i logistyką z Chin.",
    ],
  },
  {
    title: "2. Korzystanie z serwisu",
    bullets: [
      "użytkownik zobowiązany jest korzystać z serwisu zgodnie z prawem, dobrymi obyczajami i jego przeznaczeniem;",
      "zabronione jest przekazywanie treści bezprawnych, szkodliwego kodu, podejmowanie prób nieautoryzowanego dostępu oraz działań zakłócających funkcjonowanie serwisu;",
      "do korzystania z serwisu potrzebne jest urządzenie z dostępem do Internetu i aktualna przeglądarka internetowa.",
    ],
  },
  {
    title: "3. Formularze kontaktowe i zapytania",
    paragraphs: [
      "Wysłanie formularza, wiadomości e-mail lub innego zapytania nie oznacza automatycznego zawarcia umowy ani złożenia przez Usługodawcę wiążącej oferty. Zapytanie stanowi rozpoczęcie kontaktu biznesowego.",
      "Zakres, cena, terminy, odpowiedzialność, warunki płatności, Incoterms, parametry towaru oraz pozostałe warunki konkretnego projektu są ustalane indywidualnie w ofercie, zamówieniu, umowie lub innej zaakceptowanej przez strony formie.",
    ],
  },
  {
    title: "4. Charakter informacji publikowanych w serwisie",
    paragraphs: [
      "Treści dotyczące cen, czasu transportu, stawek, ceł, podatków, parametrów dostaw, dostępności producentów lub produktów mają charakter orientacyjny, chyba że wyraźnie wskazano inaczej w indywidualnej ofercie skierowanej do konkretnego klienta.",
      "Informacje rynkowe i materiały edukacyjne nie stanowią porady prawnej, podatkowej, celnej ani finansowej. Przed podjęciem decyzji użytkownik powinien zweryfikować dane właściwe dla konkretnej transakcji.",
    ],
  },
  {
    title: "5. Kalkulatory i narzędzia pomocnicze",
    paragraphs: [
      "Wyniki kalkulatorów dostępnych w serwisie mają charakter szacunkowy i informacyjny. Nie stanowią oferty handlowej, gwarancji ceny ani wiążącego wyliczenia kosztów importu. Ostateczne koszty zależą m.in. od bieżących stawek transportowych, kursów walut, klasyfikacji taryfowej, podatków, parametrów przesyłki i warunków dostawcy.",
    ],
  },
  {
    title: "6. Prawa autorskie i materiały",
    paragraphs: [
      "Układ serwisu, teksty, grafiki, znaki towarowe, zdjęcia, materiały ofertowe i inne elementy mogą podlegać ochronie prawnej. Bez uprzedniej zgody właściciela praw nie wolno ich kopiować ani wykorzystywać w sposób wykraczający poza dozwolony użytek.",
    ],
  },
  {
    title: "7. Odpowiedzialność",
    paragraphs: [
      "Usługodawca dokłada należytej staranności, aby informacje w serwisie były aktualne i poprawne, jednak dynamiczny charakter rynku chińskiego, logistyki, kursów walut, przepisów celnych i ofert producentów może powodować ich szybką zmianę.",
      "W zakresie dopuszczalnym przez bezwzględnie obowiązujące przepisy prawa Usługodawca nie odpowiada za decyzje biznesowe podjęte wyłącznie na podstawie ogólnych informacji opublikowanych w serwisie, bez indywidualnej weryfikacji warunków projektu.",
    ],
  },
  {
    title: "8. Reklamacje dotyczące działania serwisu",
    paragraphs: [
      `Uwagi lub reklamacje dotyczące technicznego działania serwisu można przesłać na adres ${contactEmail}. Zgłoszenie powinno zawierać opis problemu oraz dane umożliwiające kontakt. Usługodawca odpowie bez zbędnej zwłoki, co do zasady w terminie do 14 dni.`,
    ],
  },
  {
    title: "9. Prawo właściwe i zmiany regulaminu",
    paragraphs: [
      "Do korzystania z serwisu stosuje się prawo polskie, z uwzględnieniem bezwzględnie obowiązujących przepisów właściwych dla użytkownika. Ewentualne spory związane z konkretną usługą lub transakcją podlegają zasadom wskazanym w odrębnej umowie zawartej z klientem.",
      "Regulamin może być aktualizowany wraz ze zmianą funkcjonalności serwisu, modelu świadczenia usług lub przepisów prawa. Aktualna wersja jest publikowana na tej stronie.",
    ],
  },
];

function LegalSections({ sections }: { sections: LegalSection[] }) {
  return (
    <div className="space-y-9">
      {sections.map((section) => (
        <section key={section.title}>
          <h2 className="text-xl font-semibold text-white">{section.title}</h2>
          {section.paragraphs?.map((paragraph) => (
            <p key={paragraph} className="mt-3 text-sm leading-7 text-white/70 sm:text-base">
              {paragraph}
            </p>
          ))}
          {section.bullets ? (
            <ul className="mt-3 list-disc space-y-2 pl-6 text-sm leading-7 text-white/70 sm:text-base">
              {section.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </div>
  );
}

export function LegalPageContent({ title, locale, slug }: LegalPageContentProps) {
  if (locale !== "pl") {
    const text = legalPlaceholders[locale] ?? legalPlaceholders.ru;
    return (
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <div className="mt-8 text-white/70">
          <p>{text}</p>
        </div>
      </article>
    );
  }

  const sections =
    slug === "polityka-prywatnosci"
      ? privacySections
      : slug === "polityka-cookies"
        ? cookieSections
        : slug === "regulamin"
          ? termsSections
          : null;

  if (!sections) {
    return (
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <p className="mt-8 text-white/70">
          Wyniki kalkulatora mają charakter orientacyjny i nie stanowią oferty handlowej ani
          wiążącej kalkulacji kosztów importu. Ostateczne warunki są ustalane indywidualnie.
        </p>
      </article>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      <p className="mt-3 text-sm text-white/40">Ostatnia aktualizacja: {updatedAt}</p>

      <div className="mt-6 rounded-xl border border-amber-400/25 bg-amber-400/5 px-4 py-3 text-sm leading-6 text-amber-100/80">
        Przed publikacją uzupełnij pełne dane rejestrowe polskiego administratora w miejscu
        oznaczonym „UZUPEŁNIJ”. Po ich wpisaniu dokument powinien przejść końcową weryfikację
        prawną.
      </div>

      <div className="mt-10">
        <LegalSections sections={sections} />
      </div>

      <div className="mt-12 border-t border-white/10 pt-6 text-sm leading-6 text-white/45">
        <p>
          Powiązane dokumenty:{" "}
          <Link href="/pl/polityka-prywatnosci" className="text-accent-light hover:underline">
            Polityka prywatności
          </Link>
          {" · "}
          <Link href="/pl/polityka-cookies" className="text-accent-light hover:underline">
            Polityka cookies
          </Link>
          {" · "}
          <Link href="/pl/regulamin" className="text-accent-light hover:underline">
            Regulamin
          </Link>
        </p>
      </div>
    </article>
  );
}
