import type { Metadata } from "next";
import { DedicatedPageShell } from "@/components/pages/DedicatedPageShell";
import { PageCtaBand } from "@/components/pages/PageCtaBand";
import { MyWChinachPageContent } from "@/components/my-w-chinach/MyWChinachPageContent";
import { myWChinachLayout } from "@/content/my-w-chinach-layout";

type Props = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Działamy na miejscu w Chinach | Buy & Bring Solutions",
  description:
    "Wsparcie operacyjne w Foshan: kontakt z producentami, kontrole jakości, konsolidacja i przygotowanie wysyłek.",
};

export default async function DzialamyWChinachPage({ params }: Props) {
  const { locale } = await params;
  return (
    <DedicatedPageShell
      breadcrumbs={[
        { label: "Strona główna", href: `/${locale}` },
        { label: "Działamy w Chinach" },
      ]}
    >
      <MyWChinachPageContent />
      <PageCtaBand
        primary={myWChinachLayout.cta.primary}
        secondary={myWChinachLayout.cta.secondary}
      />
    </DedicatedPageShell>
  );
}
