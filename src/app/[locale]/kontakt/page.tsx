import type { Metadata } from "next";
import { KontaktPageContent } from "@/components/kontakt/KontaktPageContent";
import { DedicatedPageShell } from "@/components/pages/DedicatedPageShell";
import { kontaktPage } from "@/content/pages/kontakt";

export const metadata: Metadata = {
  title: kontaktPage.meta.title,
  description: kontaktPage.meta.description,
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
