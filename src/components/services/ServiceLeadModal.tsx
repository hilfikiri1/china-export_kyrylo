"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { getServiceById } from "@/content/services";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ServiceLeadModalProps = {
  serviceId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ServiceLeadModal({
  serviceId,
  open,
  onOpenChange,
}: ServiceLeadModalProps) {
  const service = serviceId ? getServiceById(serviceId) : null;
  const [submitted, setSubmitted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSubmitted(false);
    }
  }, [open]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire to API / Formspree / email service
    setSubmitted(true);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-white/10 bg-navy-light text-white ring-white/10 sm:max-w-lg">
        {submitted ? (
          <div className="py-4 text-center">
            <DialogHeader className="items-center text-center">
              <DialogTitle className="text-white">
                Dziękujemy za zapytanie
              </DialogTitle>
              <DialogDescription className="text-white/60">
                Skontaktujemy się w ciągu 24 godzin roboczych w sprawie usługi:{" "}
                <span className="font-medium text-accent-light">
                  {service?.title}
                </span>
                .
              </DialogDescription>
            </DialogHeader>
            <Button
              type="button"
              className="mt-6 border-accent-light/20 bg-accent-light text-white hover:bg-[#dbaa47]"
              onClick={() => onOpenChange(false)}
            >
              Zamknij
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-white">
                Zapytanie o wybraną usługę
              </DialogTitle>
              <DialogDescription className="text-white/60">
                Opisz krótko swoje potrzeby — odpowiemy z wyceną wybranego
                modułu, bez konieczności wykupu pełnego pakietu.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="serviceId" value={serviceId ?? ""} />
              <input
                type="hidden"
                name="serviceTitle"
                value={service?.title ?? ""}
              />

              <div className="overflow-hidden rounded-lg border border-accent-light/20 bg-accent-light/10 px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-wider text-white/50">
                  Wybrana usługa
                </p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={serviceId}
                    initial={{ opacity: 0, ...(prefersReducedMotion ? {} : { y: 8 }) }}
                    animate={{ opacity: 1, ...(prefersReducedMotion ? {} : { y: 0 }) }}
                    exit={{ opacity: 0, ...(prefersReducedMotion ? {} : { y: -8 }) }}
                    transition={{ duration: prefersReducedMotion ? 0.15 : 0.25 }}
                    className="mt-1 text-sm font-semibold text-accent-light"
                  >
                    {service?.title}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="lead-name" className="text-white/80">
                    Imię i nazwisko
                  </Label>
                  <Input
                    id="lead-name"
                    name="name"
                    required
                    placeholder="Jan Kowalski"
                    className="border-white/15 bg-white/5 text-white placeholder:text-white/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lead-company" className="text-white/80">
                    Firma
                  </Label>
                  <Input
                    id="lead-company"
                    name="company"
                    placeholder="Nazwa firmy"
                    className="border-white/15 bg-white/5 text-white placeholder:text-white/30"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="lead-email" className="text-white/80">
                    E-mail
                  </Label>
                  <Input
                    id="lead-email"
                    name="email"
                    type="email"
                    required
                    placeholder="jan@firma.pl"
                    className="border-white/15 bg-white/5 text-white placeholder:text-white/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lead-phone" className="text-white/80">
                    Telefon
                  </Label>
                  <Input
                    id="lead-phone"
                    name="phone"
                    type="tel"
                    placeholder="+48 600 000 000"
                    className="border-white/15 bg-white/5 text-white placeholder:text-white/30"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lead-message" className="text-white/80">
                  Opis potrzeb
                </Label>
                <Textarea
                  id="lead-message"
                  name="message"
                  rows={3}
                  required
                  placeholder="Krótko opisz produkt, ilość lub zakres usługi..."
                  className="border-white/15 bg-white/5 text-white placeholder:text-white/30"
                />
              </div>

              <Button
                type="submit"
                className="w-full border-accent-light/20 bg-accent-light text-white hover:bg-[#dbaa47]"
              >
                Wyślij zapytanie
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
