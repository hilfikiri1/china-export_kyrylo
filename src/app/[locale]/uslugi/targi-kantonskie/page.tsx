import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  ExternalLink,
  Factory,
  Languages,
  MapPin,
  Plane,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { CantonCountdown } from "@/components/canton-fair/CantonCountdown";
import { DedicatedPageShell } from "@/components/pages/DedicatedPageShell";
import {
  CANTON_FAIR_BUYER_URL,
  CANTON_FAIR_OFFICIAL_URL,
  cantonFairPhases,
} from "@/content/canton-fair";
import type { Locale } from "@/i18n/config";
import { getServerTranslation } from "@/i18n/server";
import { localizedPath } from "@/i18n/routing";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Canton Fair 2026 — terminy, fazy i wyjazd z B&BS",
  description:
    "140. Canton Fair w Guangzhou: terminy 15.10–04.11.2026, trzy fazy, pełny podział branż, rejestracja kupującego i organizacja wyjazdu z Buy & Bring Solutions.",
  keywords: [
    "Canton Fair 2026",
    "Targi Kantońskie 2026",
    "Canton Fair Guangzhou",
    "import z Chin",
    "wyjazd biznesowy do Chin",
  ],
};

const quickFacts = [
  {
    icon: CalendarDays,
    label: "140. edycja",
    value: "15.10–04.11.2026",
  },
  {
    icon: Clock3,
    label: "Godziny ekspozycji",
    value: "9:30–18:00",
  },
  {
    icon: MapPin,
    label: "Miejsce",
    value: "Guangzhou, Chiny",
  },
  {
    icon: Factory,
    label: "Format",
    value: "3 fazy branżowe",
  },
];

const productGuide = [
  {
    phase: "Faza 1",
    title: "Maszyny i przemysł",
    examples: "CNC, lasery, automatyka, generatory, maszyny rolnicze i budowlane",
  },
  {
    phase: "Faza 1",
    title: "EV, energia i elektronika",
    examples: "pojazdy elektryczne, części, baterie, PV, urządzenia elektryczne, AGD",
  },
  {
    phase: "Faza 2",
    title: "Budownictwo i wyposażenie",
    examples: "elewacje, materiały, ceramika, łazienki, meble, kamień, wyposażenie domu",
  },
  {
    phase: "Faza 2",
    title: "Dekoracje i prezenty",
    examples: "dekoracje 3D, artykuły sezonowe, szkło, ceramika, ogród, gadżety",
  },
  {
    phase: "Faza 3",
    title: "Moda, tekstylia i dzieci",
    examples: "odzież, obuwie, torby, tkaniny, tekstylia domowe, zabawki, produkty baby",
  },
  {
    phase: "Faza 3",
    title: "Zdrowie, sport, food i pet",
    examples: "wyroby medyczne, health & beauty, sport, żywność, artykuły dla zwierząt",
  },
];

const supportSteps = [
  {
    icon: SearchCheck,
    step: "Przed wyjazdem",
    title: "Wybieramy właściwą fazę i wystawców",
    text: "Analizujemy produkt, sprawdzamy listę wystawców, kontaktujemy wybrane firmy i układamy plan spotkań. Jeśli Canton Fair nie jest najlepszą wystawą dla danej niszy, mówimy o tym wprost i szukamy targów specjalistycznych.",
  },
  {
    icon: Languages,
    step: "Na miejscu",
    title: "Prowadzimy spotkania i negocjacje",
    text: "Pomagamy w komunikacji z dostawcami, zbieraniu ofert i specyfikacji oraz w szybkim porównaniu producentów. Zespół B&BS działa operacyjnie w Foshan, w prowincji Guangdong.",
  },
  {
    icon: ShieldCheck,
    step: "Po targach",
    title: "Oddzielamy stoisko od realnej fabryki",
    text: "Organizujemy wizyty w fabrykach, weryfikację dostawców, próbki i dalsze negocjacje. Następnie możemy poprowadzić zamówienie, kontrolę jakości, konsolidację i dostawę do Europy.",
  },
];

const faqs = [
  {
    question: "Czy trzeba jechać na wszystkie trzy fazy?",
    answer:
      "Zwykle nie. Fazy mają różne grupy produktowe, dlatego najpierw wybiera się fazę odpowiadającą branży. Przy bardzo szerokim asortymencie można połączyć dwie fazy, ale między nimi są dni przerwy.",
  },
  {
    question: "Czy każdy wystawca na Canton Fair jest fabryką?",
    answer:
      "Nie należy tego zakładać. Na targach spotkasz zarówno producentów, jak i firmy handlowe. Dlatego przed zamówieniem sprawdzamy podmiot, możliwości produkcyjne, dokumenty i — gdy projekt tego wymaga — jedziemy do zakładu.",
  },
  {
    question: "Czy Canton Fair ma sens dla bardzo specjalistycznego produktu?",
    answer:
      "Nie zawsze. To ogromne targi wielobranżowe. W wąskich sektorach lepsza może być wystawa specjalistyczna. Przed rezerwacją podróży możemy sprawdzić wystawców Canton Fair i porównać ich z innymi targami w Chinach.",
  },
  {
    question: "Czy można połączyć targi z wizytami w fabrykach?",
    answer:
      "Tak — i często właśnie wtedy wyjazd daje największą wartość. Po wcześniejszym umówieniu spotkań można po targach odwiedzić wybrane fabryki w Guangdong lub zaplanować dalszą trasę po innych klastrach produkcyjnych Chin.",
  },
  {
    question: "Jak wejść na targi jako zagraniczny kupujący?",
    answer:
      "Należy zarejestrować się w oficjalnym Buyer Service System i uzyskać Buyer Badge (IC Card), który jest oficjalnym identyfikatorem wejściowym dla kupujących. Jeśli dla Twojego paszportu potrzebna jest wiza, system organizatora umożliwia również złożenie wniosku o zaproszenie. Wymogi wjazdowe zawsze sprawdź dla swojej narodowości przed zakupem biletów.",
  },
];

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "140th China Import and Export Fair (Canton Fair)",
  startDate: "2026-10-15T09:30:00+08:00",
  endDate: "2026-11-04T18:00:00+08:00",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: "China Import and Export Fair Complex",
    address: {
      "@type": "PostalAddress",
      streetAddress: "No. 382, Yuejiang Zhong Road",
      addressLocality: "Guangzhou",
      postalCode: "510335",
      addressCountry: "CN",
    },
  },
  url: CANTON_FAIR_OFFICIAL_URL,
};

export default async function CantonFairPage({ params }: PageProps) {
  const { locale: localeParam } = await params;

  if (localeParam !== "pl") {
    notFound();
  }

  const locale = localeParam as Locale;
  const { t } = await getServerTranslation(locale);
  const contactHref = localizedPath(locale, "kontakt");

  return (
    <DedicatedPageShell
      breadcrumbAriaLabel={t("layout.breadcrumb.ariaLabel")}
      breadcrumbs={buildBreadcrumbs(t, locale, [
        { labelKey: "common.services", href: localizedPath(locale, "uslugi") },
        { label: "Canton Fair 2026" },
      ])}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(eventJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 sm:pb-24 sm:pt-12 lg:px-8">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
          <div
            aria-hidden="true"
            className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-red-500/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-accent-light/10 blur-3xl"
          />

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <div className="mb-5 flex flex-wrap items-center justify-center gap-2">
              <span className="rounded-full border border-red-400/25 bg-red-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-red-300">
                140. edycja · Jesień 2026
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/55">
                Guangzhou · 3 fazy
              </span>
            </div>

            <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Canton Fair 2026
              <span className="mt-2 block text-accent-light">
                zaplanuj targi, zanim zacznie się wyścig o terminy
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/65 sm:text-lg">
              Największa wielobranżowa platforma handlowa Chin w Guangzhou. Poniżej masz
              terminy, pełny podział trzech faz, zasady wejścia oraz praktyczny plan wyjazdu
              dla firmy szukającej producentów w Chinach.
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={contactHref}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-accent-light px-6 py-3 text-sm font-bold text-[#171b21] shadow-[0_12px_34px_rgba(200,146,42,0.22)] transition hover:bg-brand-primary-hover"
              >
                Zaplanuj wyjazd z B&BS
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <a
                href="#fazy"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Która faza jest dla mnie?
              </a>
            </div>
          </div>
        </section>

        <div className="relative z-20 -mt-5 grid gap-3 px-2 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {quickFacts.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-[color:var(--surface-secondary)] p-4 shadow-lg"
            >
              <div className="flex items-start gap-3">
                <span className="rounded-xl border border-accent-light/15 bg-accent-light/8 p-2 text-accent-light">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-white/40">{label}</p>
                  <p className="mt-1 text-sm font-semibold text-white">{value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 sm:mt-16">
          <CantonCountdown />
        </div>

        <section id="fazy" aria-labelledby="fazy-heading" className="scroll-mt-24 pt-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
              3 fazy · 3 różne grupy branż
            </p>
            <h2 id="fazy-heading" className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              Nie jedź na „Canton Fair”. Jedź na właściwą fazę.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/55 sm:text-base">
              Hale i wystawcy zmieniają się pomiędzy fazami. Bilet lotniczy na niewłaściwy
              tydzień może oznaczać, że nie zobaczysz swojej kategorii produktowej.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {cantonFairPhases.map((phase, index) => {
              const accent = [
                "border-red-400/25 bg-red-500/8 text-red-300",
                "border-accent-light/25 bg-accent-light/8 text-accent-light",
                "border-sky-400/25 bg-sky-500/8 text-sky-300",
              ][index];

              return (
                <article
                  key={phase.number}
                  className="flex h-full flex-col rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-5 sm:p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className={`rounded-full border px-3 py-1 text-xs font-bold ${accent}`}>
                      FAZA {phase.number}
                    </span>
                    <span className="text-right text-xs font-medium text-white/45">
                      {phase.dateLabel}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-white">{phase.polishName}</h3>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-white/35">
                    {phase.officialName}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-white/60">{phase.summary}</p>

                  <div className="mt-5 space-y-2">
                    {phase.groups.map((group) => (
                      <div
                        key={group.title}
                        className="flex items-start gap-2 text-sm text-white/70"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-light" aria-hidden />
                        <span>{group.title}</span>
                      </div>
                    ))}
                  </div>

                  <details className="group mt-6 border-t border-white/10 pt-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-white/75 marker:content-none">
                      Pełna lista kategorii
                      <ChevronDown
                        className="h-4 w-4 shrink-0 text-white/40 transition group-open:rotate-180"
                        aria-hidden
                      />
                    </summary>
                    <div className="mt-4 space-y-4">
                      {phase.groups.map((group) => (
                        <div key={group.title}>
                          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-white/50">
                            {group.title}
                          </p>
                          <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-white/50">
                            {group.items.map((item) => (
                              <li key={item} className="flex gap-2">
                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-light/70" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </details>
                </article>
              );
            })}
          </div>

          <p className="mx-auto mt-5 max-w-4xl text-center text-xs leading-relaxed text-white/35">
            Podział kategorii oparty na aktualnej klasyfikacji produktowej organizatora.
            Szczegółową lokalizację hal i konkretnych wystawców warto potwierdzić w systemie
            Canton Fair bezpośrednio przed wyjazdem.
          </p>
        </section>

        <section aria-labelledby="product-guide-heading" className="pt-20">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.6fr] lg:items-start">
            <div className="lg:sticky lg:top-24">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
                Szybki wybór
              </p>
              <h2 id="product-guide-heading" className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                Gdzie szukać Twojego produktu?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/55">
                To praktyczna mapa startowa. Przy projekcie klienta i tak sprawdzamy nie tylko
                nazwę branży, ale konkretnych wystawców i ich ofertę na daną edycję.
              </p>
              <div className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-4 text-sm leading-relaxed text-white/60">
                <strong className="text-amber-300">Ważne dla niszowych branż:</strong>{" "}
                maszyny rolnicze są w Fazie 1, ale np. specjalistyczne wyposażenie hodowlane
                może mieć lepszą reprezentację na targach branżowych. Sprawdzamy to przed
                rekomendacją wyjazdu.
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {productGuide.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] p-5"
                >
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-accent-light">
                    {item.phase}
                  </span>
                  <h3 className="mt-2 font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/50">{item.examples}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="practical-heading" className="pt-20">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 sm:p-8 lg:p-10">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
                  Logistyka wyjazdu
                </p>
                <h2 id="practical-heading" className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                  Co trzeba przygotować przed wylotem
                </h2>

                <div className="mt-7 space-y-5">
                  {[
                    {
                      icon: BadgeCheck,
                      title: "Rejestracja kupującego i Buyer Badge",
                      text: "Zarejestruj się w oficjalnym Buyer Service System. Buyer Badge (IC Card) jest oficjalnym identyfikatorem wejściowym dla zagranicznych kupujących.",
                    },
                    {
                      icon: Plane,
                      title: "Dokumenty wjazdowe",
                      text: "Wymogi zależą od paszportu i aktualnych przepisów. Jeśli potrzebujesz wizy, organizator umożliwia wniosek o oficjalne zaproszenie. Zweryfikuj zasady przed zakupem biletów.",
                    },
                    {
                      icon: UsersRound,
                      title: "Plan spotkań, nie tylko lista hal",
                      text: "Zapisz dostawców, numery stoisk, pytania techniczne, target cenowy i wymagane certyfikaty. Najcenniejsze spotkania warto umówić jeszcze przed targami.",
                    },
                  ].map(({ icon: Icon, title, text }) => (
                    <div key={title} className="flex gap-4">
                      <span className="mt-0.5 rounded-xl border border-accent-light/15 bg-accent-light/8 p-2.5 text-accent-light">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold text-white">{title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-white/50">{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[color:var(--surface-secondary)] p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
                  Informacje organizacyjne
                </p>
                <dl className="mt-5 space-y-5">
                  <div>
                    <dt className="text-xs text-white/40">Obiekt</dt>
                    <dd className="mt-1 text-sm font-semibold text-white">
                      China Import and Export Fair Complex
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-white/40">Adres</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-white/70">
                      No. 382, Yuejiang Zhong Road, Guangzhou 510335, China
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-white/40">Godziny</dt>
                    <dd className="mt-1 text-sm text-white/70">
                      9:30–18:00 czasu chińskiego — potwierdź komunikat organizatora przed
                      wejściem na daną fazę.
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-white/40">Terminy</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-white/70">
                      Faza 1: 15–19.10 · Faza 2: 23–27.10 · Faza 3: 31.10–04.11.2026
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 grid gap-2.5">
                  <a
                    href={CANTON_FAIR_BUYER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-between gap-3 rounded-xl border border-accent-light/20 bg-accent-light/8 px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent-light/15"
                  >
                    Oficjalna rejestracja Buyer
                    <ExternalLink className="h-4 w-4 text-accent-light" aria-hidden />
                  </a>
                  <a
                    href={CANTON_FAIR_OFFICIAL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-between gap-3 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-white/70 transition hover:bg-white/5"
                  >
                    Oficjalna strona Canton Fair
                    <ExternalLink className="h-4 w-4" aria-hidden />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="bbs-trip-heading" className="pt-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
              <Sparkles className="h-4 w-4" aria-hidden />
              Canton Fair z Buy & Bring Solutions
            </p>
            <h2 id="bbs-trip-heading" className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              Samo wejście na targi to dopiero początek
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/55 sm:text-base">
              Celem wyjazdu nie jest zebranie stu katalogów. Celem jest wrócić z krótką listą
              realnych dostawców, porównywalnymi ofertami i konkretnym następnym krokiem.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {supportSteps.map(({ icon: Icon, step, title, text }) => (
              <article
                key={step}
                className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-xl border border-accent-light/15 bg-accent-light/8 p-2.5 text-accent-light">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                    {step}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">{text}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-[1.75rem] border border-accent-light/25 bg-[linear-gradient(120deg,rgba(200,146,42,0.10),rgba(255,255,255,0.025),rgba(185,28,28,0.06))] p-6 sm:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold text-accent-light">Masz już produkt lub branżę?</p>
                <h3 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                  Najpierw sprawdzimy, czy warto poświęcić na Canton Fair Twój dzień.
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  Wyślij nam produkt, zdjęcie lub specyfikację. Sprawdzimy właściwą fazę,
                  wystawców i możliwość połączenia targów z wizytami w odpowiednich fabrykach.
                </p>
              </div>
              <Link
                href={contactHref}
                className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-accent-light px-6 py-3 text-sm font-bold text-[#171b21] transition hover:bg-brand-primary-hover"
              >
                Sprawdź mój produkt
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </section>

        <section aria-labelledby="faq-heading" className="pt-20">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
                FAQ
              </p>
              <h2 id="faq-heading" className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                Najczęstsze pytania przed wyjazdem
              </h2>
            </div>

            <div className="mt-8 divide-y divide-white/10 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.035]">
              {faqs.map((faq) => (
                <details key={faq.question} className="group px-5 py-1 sm:px-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-sm font-semibold text-white marker:content-none sm:text-base">
                    {faq.question}
                    <ChevronDown
                      className="h-4 w-4 shrink-0 text-white/40 transition group-open:rotate-180"
                      aria-hidden
                    />
                  </summary>
                  <p className="max-w-3xl pb-5 text-sm leading-relaxed text-white/55">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <footer className="mt-16 border-t border-white/10 pt-6 text-xs leading-relaxed text-white/35">
          <p>
            Dane dotyczące 140. edycji zaktualizowano 07.08.2026 na podstawie informacji
            organizatora China Import and Export Fair. Terminy: 15–19.10, 23–27.10 oraz
            31.10–04.11.2026. Przed podróżą sprawdź aktualne komunikaty organizatora, ponieważ
            szczegóły organizacyjne i przydział wystawców mogą ulec zmianie.
          </p>
          <p className="mt-2">
            Źródła:{" "}
            <a
              href={CANTON_FAIR_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-light/80 hover:text-accent-light"
            >
              oficjalna strona Canton Fair
            </a>{" "}
            ·{" "}
            <a
              href={CANTON_FAIR_BUYER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-light/80 hover:text-accent-light"
            >
              Buyer Service System
            </a>
          </p>
        </footer>
      </div>
    </DedicatedPageShell>
  );
}
