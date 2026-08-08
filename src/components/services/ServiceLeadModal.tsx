"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { getServiceById } from "@/content/i18n/services";
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
import { useTranslation } from "@/i18n/LocaleProvider";

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
  const { messages, t } = useTranslation();
  const service = serviceId ? getServiceById(messages, serviceId) : null;
  const [submitted, setSubmitted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      setSubmitted(false);
    }
    onOpenChange(nextOpen);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="border-white/10 bg-navy-light text-white ring-white/10 sm:max-w-lg">
        {submitted ? (
          <div className="py-4 text-center">
            <DialogHeader className="items-center text-center">
              <DialogTitle className="text-white">
                {t("forms.serviceLead.success.title")}
              </DialogTitle>
              <DialogDescription className="text-white/60">
                {t("forms.serviceLead.successWithService", {
                  service: service?.title ?? "",
                })}
              </DialogDescription>
            </DialogHeader>
            <Button
              type="button"
              className="mt-6 border-accent-light/20 bg-accent-light text-white hover:bg-[#dbaa47]"
              onClick={() => handleOpenChange(false)}
            >
              {t("forms.serviceLead.close")}
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-white">
                {t("forms.serviceLead.title")}
              </DialogTitle>
              <DialogDescription className="text-white/60">
                {t("forms.serviceLead.description")}
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
                  {t("forms.serviceLead.selectedService")}
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
                    {t("forms.serviceLead.fields.name")}
                  </Label>
                  <Input
                    id="lead-name"
                    name="name"
                    required
                    placeholder={t("forms.serviceLead.placeholders.name")}
                    className="border-white/15 bg-white/5 text-white placeholder:text-white/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lead-company" className="text-white/80">
                    {t("forms.serviceLead.fields.company")}
                  </Label>
                  <Input
                    id="lead-company"
                    name="company"
                    placeholder={t("forms.serviceLead.placeholders.company")}
                    className="border-white/15 bg-white/5 text-white placeholder:text-white/30"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="lead-email" className="text-white/80">
                    {t("forms.serviceLead.fields.email")}
                  </Label>
                  <Input
                    id="lead-email"
                    name="email"
                    type="email"
                    required
                    placeholder={t("forms.serviceLead.placeholders.email")}
                    className="border-white/15 bg-white/5 text-white placeholder:text-white/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lead-phone" className="text-white/80">
                    {t("forms.serviceLead.fields.phone")}
                  </Label>
                  <Input
                    id="lead-phone"
                    name="phone"
                    type="tel"
                    placeholder={t("forms.serviceLead.placeholders.phone")}
                    className="border-white/15 bg-white/5 text-white placeholder:text-white/30"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lead-message" className="text-white/80">
                  {t("forms.serviceLead.fields.message")}
                </Label>
                <Textarea
                  id="lead-message"
                  name="message"
                  rows={3}
                  required
                  placeholder={t("forms.serviceLead.placeholders.message")}
                  className="border-white/15 bg-white/5 text-white placeholder:text-white/30"
                />
              </div>

              <Button
                type="submit"
                className="w-full border-accent-light/20 bg-accent-light text-white hover:bg-[#dbaa47]"
              >
                {t("forms.serviceLead.submit")}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
