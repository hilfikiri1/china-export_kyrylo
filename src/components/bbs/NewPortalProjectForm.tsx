"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import {
  createPortalProjectAction,
  type PortalProjectActionState,
} from "@/app/[locale]/bbs/projekty/actions";
import { INTERNAL_PROJECT_STATUSES, PORTAL_STAGES } from "@/lib/portal/constants";
import { CopyButton } from "@/components/portal/CopyButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialState: PortalProjectActionState = {};
const fieldClassName = "border-white/15 bg-white/5 text-white placeholder:text-white/30";
const selectClassName =
  "flex h-9 w-full rounded-md border border-white/15 bg-white/5 px-3 py-1 text-sm text-white shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50";

export function NewPortalProjectForm({ locale }: { locale: Locale }) {
  const [state, action, pending] = useActionState(createPortalProjectAction, initialState);
  const ru = locale === "ru";

  if (state.status === "success" && state.pageId && state.accessUrl) {
    return (
      <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5 sm:p-6">
        <p className="font-semibold text-white">{ru ? "Проект и ссылка клиента готовы" : "Projekt i link klienta są gotowe"}</p>
        <p className="mt-2 text-sm text-white/60">{state.message}</p>

        <div className="mt-5">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-white/40">
            {ru ? "Ссылка клиента" : "Link klienta"}
          </p>
          <div className="flex items-start rounded-lg border border-white/10 bg-white/5 px-3 py-2">
            <code className="min-w-0 flex-1 break-all font-mono text-xs text-accent-light/90">
              {state.accessUrl}
            </code>
            <CopyButton value={state.accessUrl} label={ru ? "Копировать ссылку клиента" : "Kopiuj link klienta"} />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-4 text-sm">
          <Link href={`/${locale}/bbs/projekty/${state.pageId}`} className="font-medium text-accent-light underline">
            {ru ? "Редактировать проект" : "Edytuj projekt"}
          </Link>
          <a href={state.accessUrl} target="_blank" rel="noreferrer" className="text-white/60 underline hover:text-white">
            {ru ? "Открыть кабинет клиента" : "Otwórz panel klienta"}
          </a>
          {state.notionUrl && (
            <a href={state.notionUrl} target="_blank" rel="noreferrer" className="text-white/60 underline hover:text-white">
              {ru ? "Открыть в Notion" : "Otwórz w Notion"}
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-6">
      <input type="hidden" name="locale" value={locale} />

      <div className="rounded-lg border border-accent-light/20 bg-accent-light/5 px-4 py-3 text-xs leading-relaxed text-white/60">
        {ru ? "Проект будет сохранён в базе " : "Projekt zostanie zapisany w bazie "}
        <strong className="text-white/80">Klienci i projekty</strong> {ru ? "в Notion. Система создаст постоянную безопасную ссылку на кабинет клиента." : "w Notion. System utworzy stały, bezpieczny link do panelu klienta."}
      </div>

      <div className="space-y-2">
        <Label htmlFor="portal-name" className="text-white/80">
          {ru ? "Название проекта / продукта" : "Nazwa projektu / produktu"} <span className="text-accent-light">*</span>
        </Label>
        <Input id="portal-name" name="name" required maxLength={200} placeholder={ru ? "например, упаковочная линия" : "np. Linia pakująca do produkcji"} className={fieldClassName} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="portal-number" className="text-white/80">{ru ? "Номер проекта" : "Numer projektu"}</Label>
          <Input id="portal-number" name="projectNumber" maxLength={100} placeholder={ru ? "Автоматически, если пусто" : "Automatyczny, jeśli puste"} className={fieldClassName} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="portal-kommo" className="text-white/80">Kommo ID</Label>
          <Input id="portal-kommo" name="kommoId" type="number" min={1} step={1} placeholder="np. 16800607" className={fieldClassName} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="portal-company" className="text-white/80">{ru ? "Компания" : "Firma"}</Label>
          <Input id="portal-company" name="company" maxLength={200} placeholder={ru ? "Название компании клиента" : "Nazwa firmy klienta"} className={fieldClassName} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="portal-contact" className="text-white/80">{ru ? "Контактное лицо" : "Osoba kontaktowa"}</Label>
          <Input id="portal-contact" name="contactName" maxLength={200} placeholder={ru ? "Имя и фамилия" : "Imię i nazwisko"} className={fieldClassName} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="portal-email" className="text-white/80">{ru ? "E-mail клиента" : "E-mail klienta"}</Label>
          <Input id="portal-email" name="email" type="email" maxLength={320} placeholder="klient@firma.pl" className={fieldClassName} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="portal-phone" className="text-white/80">{ru ? "Телефон клиента" : "Telefon klienta"}</Label>
          <Input id="portal-phone" name="phone" type="tel" maxLength={80} placeholder="+48 ..." className={fieldClassName} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="portal-description" className="text-white/80">{ru ? "Описание / спецификация" : "Opis / specyfikacja"}</Label>
        <Textarea id="portal-description" name="description" rows={4} maxLength={2000} placeholder={ru ? "Краткий объём проекта и договорённости" : "Krótki zakres projektu i ustalenia"} className={fieldClassName} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="portal-status" className="text-white/80">{ru ? "Внутренний статус" : "Status wewnętrzny"}</Label>
          <select id="portal-status" name="internalStatus" defaultValue="Новый" className={selectClassName}>
            {INTERNAL_PROJECT_STATUSES.map((status) => (
              <option key={status} value={status} className="bg-navy-light text-white">{status}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="portal-stage" className="text-white/80">{ru ? "Этап, видимый клиенту" : "Etap widoczny dla klienta"}</Label>
          <select id="portal-stage" name="currentStage" defaultValue={PORTAL_STAGES[0]} className={selectClassName}>
            {PORTAL_STAGES.map((stage) => (
              <option key={stage} value={stage} className="bg-navy-light text-white">{stage}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="portal-next" className="text-white/80">{ru ? "Следующий шаг" : "Następny krok"}</Label>
          <Input id="portal-next" name="nextStep" maxLength={700} placeholder={ru ? "например, подтверждение образца" : "np. Potwierdzenie próbki"} className={fieldClassName} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="portal-date" className="text-white/80">{ru ? "Плановая дата" : "Planowana data"}</Label>
          <Input id="portal-date" name="plannedDate" type="date" className={fieldClassName} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="portal-manager" className="text-white/80">{ru ? "Менеджер проекта" : "Opiekun projektu"}</Label>
        <Input id="portal-manager" name="managerName" maxLength={200} defaultValue="Buy & Bring Solutions" className={fieldClassName} />
      </div>

      {state.status === "error" && state.message && (
        <div role="alert" className="rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-300">
          {state.message}
        </div>
      )}

      <Button type="submit" disabled={pending} className="w-full bg-accent-light text-white shadow-lg shadow-accent-light/25 hover:bg-[#dbaa47]">
        {pending ? (ru ? "Создание проекта…" : "Tworzenie projektu…") : ru ? "Создать проект и ссылку клиента" : "Utwórz projekt i link klienta"}
      </Button>
    </form>
  );
}
