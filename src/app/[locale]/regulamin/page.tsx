import { DedicatedPageShell } from "@/components/pages/DedicatedPageShell";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <DedicatedPageShell
      breadcrumbs={[
        { label: "Strona główna", href: `/${locale}` },
        { label: "Regulamin" },
      ]}
    >
      <section className="mx-auto max-w-4xl px-4 py-12 text-white/80 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-white">Regulamin strony</h1>
        <p className="mt-4 text-sm text-white/60">
          Treść dokumentu wymaga uzupełnienia i przeglądu prawnego przed publikacją.
        </p>
      </section>
    </DedicatedPageShell>
  );
}
