"use client";

import { useActionState } from "react";
import type { Locale } from "@/i18n/config";
import {
  updatePortalProjectAction,
  type PortalProjectActionState,
} from "@/app/[locale]/bbs/projekty/actions";
import { INTERNAL_PROJECT_STATUSES, PORTAL_STAGES } from "@/lib/portal/constants";
import type { PortalProjectSummary } from "@/lib/portal/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialState: PortalProjectActionState = {};
const fieldClassName = "border-white/15 bg-white/5 text-white placeholder:text-white/30";
const selectClassName =
  "flex h-9 w-full rounded-md border border-white/15 bg-white/5 px-3 py-1 text-sm text-white shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50";

type EditableProject = Pick<
  PortalProjectSummary,
  "pageId" | "internalStatus" | "currentStage" | "nextStep" | "plannedDate" | "managerName" | "active"
>;

export function PortalProjectEditor({ project, locale }: { project: EditableProject; locale: Locale }) {
  const [state, action, pending] = useActionState(updatePortalProjectAction, initialState);
  const ru = locale === "ru";

  return (
    <form action={action} className="space-y-7">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="pageId" value={project.pageId} />

      <section className="rounded-2xl border border-white/10 bg-navy-light p-5 sm:p-6">
        <div className="mb-5">
          <h2 className="font-semibold text-white">{ru ? "Состояние проекта" : "Stan projektu"}</h2>
          <p className="mt-1 text-xs leading-relaxed text-white/45">
            {ru
              ? "Внутренний статус видит команда. Этап, следующий шаг и дата отображаются в кабинете клиента."
              : "Status wewnętrzny jest dla zespołu. Etap, następny krok i data są widoczne w panelu klienta."}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="edit-status" className="text-white/80">{ru ? "Внутренний статус" : "Status wewnętrzny"}</Label>
            <select id="edit-status" name="internalStatus" defaultValue={project.internalStatus} className={selectClassName}>
              {INTERNAL_PROJECT_STATUSES.map((status) => (
                <option key={status} value={status} className="bg-navy-light text-white">{status}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-stage" className="text-white/80">{ru ? "Этап клиента" : "Etap klienta"}</Label>
            <select id="edit-stage" name="currentStage" defaultValue={project.currentStage} className={selectClassName}>
              {PORTAL_STAGES.map((stage) => (
                <option key={stage} value={stage} className="bg-navy-light text-white">{stage}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="edit-next" className="text-white/80">{ru ? "Следующий шаг" : "Następny krok"}</Label>
            <Input id="edit-next" name="nextStep" maxLength={700} defaultValue={project.nextStep} className={fieldClassName} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-date" className="text-white/80">{ru ? "Плановая дата" : "Planowana data"}</Label>
            <Input id="edit-date" name="plannedDate" type="date" defaultValue={project.plannedDate} className={fieldClassName} />
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <Label htmlFor="edit-manager" className="text-white/80">{ru ? "Менеджер проекта" : "Opiekun projektu"}</Label>
          <Input id="edit-manager" name="managerName" maxLength={200} defaultValue={project.managerName} className={fieldClassName} />
        </div>

        <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm text-white/70">
          <input name="active" type="checkbox" defaultChecked={project.active} className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 accent-accent-light" />
          <span>
            <strong className="font-medium text-white/80">{ru ? "Ссылка клиента активна" : "Link klienta aktywny"}</strong>
            <span className="mt-0.5 block text-xs text-white/40">
              {ru ? "Снятие отметки сразу отключит доступ по секретной ссылке клиента." : "Odznaczenie natychmiast wyłączy dostęp przez /pl/panel/[token]."}
            </span>
          </span>
        </label>
      </section>

      <section className="rounded-2xl border border-white/10 bg-navy-light p-5 sm:p-6">
        <div className="mb-5">
          <h2 className="font-semibold text-white">{ru ? "Обновление для клиента" : "Aktualizacja dla klienta"}</h2>
          <p className="mt-1 text-xs leading-relaxed text-white/45">
            {ru
              ? "Добавьте описание и фотографии. Обновление появится в истории клиента вместе с текущим этапом."
              : "Dodaj opis i zdjęcia z realizacji. Zapis pojawi się w historii klienta razem z aktualnym etapem."}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="edit-update" className="text-white/80">{ru ? "Описание обновления" : "Opis aktualizacji"}</Label>
          <Textarea id="edit-update" name="updateDescription" rows={4} maxLength={1500} placeholder={ru ? "например, проверка образца завершена, параметры соответствуют спецификации" : "np. Kontrola próbki zakończona. Parametry zgodne ze specyfikacją."} className={fieldClassName} />
        </div>

        <div className="mt-4 space-y-2">
          <Label htmlFor="edit-images" className="text-white/80">{ru ? "Фотографии" : "Zdjęcia"}</Label>
          <Input id="edit-images" name="images" type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple className={`${fieldClassName} file:text-white/70`} />
          <p className="text-xs text-white/35">
            {ru ? "До 3 фото за раз, максимум 2,5 МБ каждое и 3,2 МБ суммарно." : "Do 3 zdjęć naraz, maks. 2,5 MB każde i 3,2 MB łącznie."}
          </p>
        </div>

        <label className="mt-4 flex cursor-pointer items-center gap-3 text-sm text-white/70">
          <input name="visibleForClient" type="checkbox" defaultChecked className="h-4 w-4 rounded border-white/20 bg-white/5 accent-accent-light" />
          <span>{ru ? "Показать это обновление и фотографии клиенту" : "Pokaż tę aktualizację i zdjęcia klientowi"}</span>
        </label>
      </section>

      {state.message && (
        <div
          role={state.status === "error" ? "alert" : "status"}
          className={
            state.status === "error"
              ? "rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-300"
              : "rounded-lg border border-emerald-400/20 bg-emerald-400/5 px-4 py-3 text-sm text-emerald-200"
          }
        >
          {state.message}
        </div>
      )}

      <Button type="submit" disabled={pending} className="w-full bg-accent-light text-white shadow-lg shadow-accent-light/25 hover:bg-[#dbaa47]">
        {pending ? (ru ? "Сохранение и отправка фотографий…" : "Zapisywanie i wysyłanie zdjęć…") : ru ? "Сохранить и обновить кабинет клиента" : "Zapisz i odśwież panel klienta"}
      </Button>
    </form>
  );
}
