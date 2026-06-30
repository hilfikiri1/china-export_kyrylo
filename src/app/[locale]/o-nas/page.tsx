import type { Metadata } from "next";
import { DedicatedPageShell } from "@/components/pages/DedicatedPageShell";
import { ONasPageContent } from "@/components/o-nas/ONasPageContent";
import { oNasPage } from "@/content/pages/o-nas";

export const metadata: Metadata = {
  title: oNasPage.meta.title,
  description: oNasPage.meta.description,
};

export default function ONasPage() {
  return (
    <DedicatedPageShell
      breadcrumbs={[
        { label: "Strona główna", href: "/" },
        { label: "O nas" },
      ]}
    >
      <ONasPageContent />
    </DedicatedPageShell>
  );
}
