import type { Metadata } from "next";
import { KontaktPageContent } from "@/components/kontakt/KontaktPageContent";
import { DedicatedPageShell } from "@/components/pages/DedicatedPageShell";
import { kontaktLayout } from "@/content/kontakt-layout";

type Props = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Opowiedz nam o swoim projekcie | Buy & Bring Solutions",
  description: kontaktLayout.meta.description,
};

export default async function KontaktPage({ params }: Props) {
  const { locale } = await params;
  return (
    <DedicatedPageShell
      breadcrumbs={[
        { label: "Strona główna", href: `/${locale}` },
        { label: "Kontakt" },
      ]}
    >
      <KontaktPageContent />
    </DedicatedPageShell>
  );
}
