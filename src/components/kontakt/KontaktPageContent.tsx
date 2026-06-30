import { ContactForm } from "@/components/forms/ContactForm";
import { KontaktSidebar } from "@/components/kontakt/KontaktSidebar";
import { RegionalContactCard } from "@/components/kontakt/RegionalContactCard";

export function KontaktPageContent() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pb-20 lg:px-8 lg:pt-12">
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_minmax(320px,420px)] lg:gap-14 xl:grid-cols-[1fr_440px]">
        <div>
          <KontaktSidebar />
          <RegionalContactCard />
        </div>
        <div className="lg:sticky lg:top-24">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
