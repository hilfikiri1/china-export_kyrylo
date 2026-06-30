import type { Metadata } from "next";
import { DedicatedPageShell } from "@/components/pages/DedicatedPageShell";
import { ProcesPageContent } from "@/components/proces/ProcesPageContent";
import { procesPage } from "@/content/pages/proces";

export const metadata: Metadata = {
  title: procesPage.meta.title,
  description: procesPage.meta.description,
};

export default function ProcesPage() {
  return (
    <DedicatedPageShell
      breadcrumbs={[
        { label: "Strona główna", href: "/" },
        { label: "Proces" },
      ]}
    >
      <ProcesPageContent />
    </DedicatedPageShell>
  );
}
