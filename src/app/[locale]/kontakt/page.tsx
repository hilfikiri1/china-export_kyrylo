import type { Metadata } from "next";
import { KontaktPageContent } from "@/components/kontakt/KontaktPageContent";
import { DedicatedPageShell } from "@/components/pages/DedicatedPageShell";
import { kontaktLayout } from "@/content/kontakt-layout";

export const metadata: Metadata = {
  title: kontaktLayout.meta.title,
  description: kontaktLayout.meta.description,
};

export default function KontaktPage() {
  return (
    <DedicatedPageShell
      breadcrumbs={[
        { label: "Strona główna", href: "/" },
        { label: "Kontakt" },
      ]}
    >
      <KontaktPageContent />
    </DedicatedPageShell>
  );
}
