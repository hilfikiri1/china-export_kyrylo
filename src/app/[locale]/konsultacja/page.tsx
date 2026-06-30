import type { Metadata } from "next";
import { KonsultacjaPageContent } from "@/components/konsultacja/KonsultacjaPageContent";
import { DedicatedPageShell } from "@/components/pages/DedicatedPageShell";
import { konsultacjaLayout } from "@/content/konsultacja-layout";

export const metadata: Metadata = {
  title: konsultacjaLayout.meta.title,
  description: konsultacjaLayout.meta.description,
};

export default function KonsultacjaPage() {
  return (
    <DedicatedPageShell
      breadcrumbs={[
        { label: "Strona główna", href: "/" },
        { label: "Umów konsultację" },
      ]}
    >
      <KonsultacjaPageContent />
    </DedicatedPageShell>
  );
}
