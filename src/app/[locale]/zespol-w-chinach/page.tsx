import type { Metadata } from "next";
import { DedicatedPageShell } from "@/components/pages/DedicatedPageShell";
import { PageCtaBand } from "@/components/pages/PageCtaBand";
import { MyWChinachPageContent } from "@/components/my-w-chinach/MyWChinachPageContent";
import { myWChinachLayout } from "@/content/my-w-chinach-layout";

export const metadata: Metadata = {
  title: myWChinachLayout.meta.title,
  description: myWChinachLayout.meta.description,
};

export default function ZespolWChinachPage() {
  return (
    <DedicatedPageShell
      breadcrumbs={[
        { label: "Strona główna", href: "/" },
        { label: "My w Chinach" },
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
