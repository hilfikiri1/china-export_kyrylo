import { cache } from "react";
import type { BlogPost } from "./types";
import {
  getNotionBlogPostBySlug,
  getNotionPublishedBlogPosts,
  isNotionBlogConfigured,
} from "./notion";

/**
 * Static blog posts. Replace with Notion/CMS fetch when persistence is available.
 * All posts are server-side only — never expose internal/supplier data here.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "import-z-chin-dla-polskich-firm",
    title: "Import z Chin dla polskich firm — jak działa Buy & Bring Solutions",
    excerpt:
      "Coraz więcej polskich przedsiębiorstw decyduje się na bezpośredni zakup towarów od chińskich producentów. Buy & Bring Solutions wspiera ten proces — od wyszukania fabryki po dostawę do magazynu.",
    date: "2025-08-05",
    author: "Buy & Bring Solutions",
    category: "Sourcing",
    locale: "pl",
    published: true,
    seoTitle: "Import z Chin dla polskich firm — Buy & Bring Solutions",
    seoDescription:
      "Jak polskie firmy mogą kupować bezpośrednio od chińskich producentów? Buy & Bring Solutions prowadzi cały proces — od weryfikacji fabryki po dostawę.",
    content: `## Dlaczego polskie firmy sięgają po produkty z Chin

Import z Chin przestał być domeną wyłącznie dużych korporacji. Polskie firmy z sektora MŚP — producenci, dystrybutorzy, importerzy — coraz częściej pytają o możliwość zakupu towarów bezpośrednio od chińskich dostawców, z pominięciem pośredników.

Powody są praktyczne: krótszy łańcuch dostaw, większa kontrola nad specyfikacją produktu i możliwość negocjacji warunków handlowych. Wyzwaniem jest jednak bariera językowa, odległość, różnice kulturowe i ryzyko trafienia na nierzetelnego producenta.

## Kim jest Buy & Bring Solutions

Buy & Bring Solutions to firma z doświadczeniem we współpracy z chińskim rynkiem. Prowadzimy spółkę eksportową w Chinach, dzięki czemu możemy działać lokalnie — weryfikować fabryki na miejscu, kontrolować towar przed wysyłką i koordynować eksport bezpośrednio z producentem.

Pracujemy z polskimi, ukraińskimi i europejskimi firmami, które chcą importować produkty z Chin w sposób zorganizowany i bezpieczny.

## Co obejmuje pełny proces importu

Zakres współpracy zależy od potrzeb klienta. Możemy prowadzić cały proces albo wesprzeć wybrany jego etap:

### Wyszukiwanie i weryfikacja producenta

Na podstawie specyfikacji klienta identyfikujemy odpowiednie fabryki w Chinach. Sprawdzamy dane firmy, możliwości produkcyjne, dokumentację eksportową i historię współpracy z rynkami europejskimi.

Nie ograniczamy się do katalogów online — korzystamy z lokalnych kontaktów i, gdy jest to uzasadnione, przeprowadzamy audyt na miejscu.

### Negocjacje i próbki

Po wyborze fabryki prowadzimy negocjacje cenowe i ustalamy warunki handlowe. Dla projektów wymagających precyzyjnej specyfikacji organizujemy próbki i ich ocenę przed złożeniem zamówienia produkcyjnego.

### Produkcja OEM i private label

Dla klientów zainteresowanych produktami pod własną marką lub z dostosowaną specyfikacją techniczną organizujemy produkcję OEM. Obejmuje to uzgodnienie parametrów, wzorów opakowań i dokumentacji.

### Kontrola jakości przed wysyłką

Inspekcja towaru w chińskim magazynie lub fabryce przed załadunkiem to kluczowy etap każdego projektu importowego. Sprawdzamy ilość, zgodność z zamówieniem, opakowanie i, w zależności od produktu, działanie i parametry techniczne.

### Konsolidacja ładunków

Klienci, którzy kupują od kilku dostawców jednocześnie, mogą skonsolidować towary w jednej przesyłce. Redukuje to koszty transportu i upraszcza logistykę.

### Organizacja transportu i odprawy celnej

Koordynujemy eksport z Chin, wybór środka transportu (morski, kolejowy, lotniczy lub drogowy), ubezpieczenie ładunku oraz odprawę celną w Polsce lub kraju docelowym. Współpracujemy ze sprawdzonymi agentami celnymi i spedytorami.

## Jakie produkty importują klienci B&BS

Zakres branżowy naszych projektów jest szeroki. Pracowaliśmy m.in. przy imporcie:

- maszyn przemysłowych i urządzeń produkcyjnych,
- maszyn budowlanych i osprzętu,
- komponentów elektrycznych i elektronicznych,
- pojazdów elektrycznych i części,
- materiałów opakowaniowych,
- wyposażenia gastronomicznego,
- surowców i materiałów przemysłowych.

Każdy projekt zaczynamy od rozmowy o produkcie, ilości i wymaganiach. Na tej podstawie określamy, co możemy zorganizować i na jakich warunkach.

## Podejście B&BS: nie najtaniej, ale kontrolowanie

Często słyszymy pytanie: "Czy z Chin zawsze będzie taniej?". Odpowiedź brzmi: niekoniecznie — i nie to jest celem. Celem jest zbudowanie powtarzalnego, kontrolowanego procesu zakupowego, który minimalizuje ryzyko i daje klientowi pewność co do jakości, terminu i kosztów.

Import z Chin może być tańszy, ale wymaga przygotowania. Weryfikacja producenta, kontrola jakości i sprawna logistyka to elementy, które decydują o tym, czy projekt zakończy się sukcesem.

## Jak zacząć współpracę

Jeśli Twoja firma rozważa import produktów z Chin i chcesz omówić możliwości, skontaktuj się z nami. Opisz produkt, planowane ilości i oczekiwania — zaproponujemy zakres wsparcia dopasowany do projektu.

Oferujemy również bezpłatną wstępną konsultację dla firm, które dopiero analizują opłacalność importu bezpośredniego.
`,
  },
];

export const getBlogPostBySlug = cache(
  async (slug: string, locale = "pl"): Promise<BlogPost | undefined> => {
    if (isNotionBlogConfigured()) {
      try {
        return await getNotionBlogPostBySlug(slug, locale);
      } catch (error) {
        console.error("[blog] Notion article fetch failed; using static fallback.", error);
      }
    }

    return blogPosts.find((p) => p.slug === slug && p.locale === locale && p.published);
  },
);

export const getPublishedBlogPosts = cache(async (locale = "pl"): Promise<BlogPost[]> => {
  if (isNotionBlogConfigured()) {
    try {
      return await getNotionPublishedBlogPosts(locale);
    } catch (error) {
      console.error("[blog] Notion index fetch failed; using static fallback.", error);
    }
  }

  return blogPosts.filter((p) => p.locale === locale && p.published);
});
