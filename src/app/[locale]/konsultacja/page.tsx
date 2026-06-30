import type { Metadata } from "next";
import { KonsultacjaPageContent } from "@/components/konsultacja/KonsultacjaPageContent";
import { DedicatedPageShell } from "@/components/pages/DedicatedPageShell";
import { konsultacjaLayout } from "@/content/konsultacja-layout";

type Props = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Umów bezpłatną konsultację | Buy & Bring Solutions",
  description: konsultacjaLayout.meta.description,
};

export default async function KonsultacjaPage({ params }: Props) {
  const { locale } = await params;
  return (
    <DedicatedPageShell
      breadcrumbs={[
        { label: "Strona główna", href: `/${locale}` },
        { label: "Konsultacja" },
      ]}
    >
      <KonsultacjaPageContent />
    </DedicatedPageShell>
  );
}
