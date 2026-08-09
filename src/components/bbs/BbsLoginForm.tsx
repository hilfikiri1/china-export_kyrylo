"use client";

import { useActionState } from "react";
import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { loginBbs, type BbsLoginState } from "@/app/[locale]/bbs/actions";
import type { Locale } from "@/i18n/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: BbsLoginState = {};

export function BbsLoginForm({
  locale,
  configured,
}: {
  locale: Locale;
  configured: boolean;
}) {
  const [state, action, pending] = useActionState(loginBbs, initialState);
  const ru = locale === "ru";

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md items-center px-4 py-12 sm:px-6">
      <div className="w-full rounded-2xl border border-white/10 bg-navy-light p-6 shadow-2xl shadow-black/20 sm:p-8">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-light/10 text-accent-light">
            <LockKeyhole className="h-5 w-5" aria-hidden />
          </div>
          <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 p-1 text-xs">
            <Link href="/pl/bbs" className={`rounded-md px-2.5 py-1 ${!ru ? "bg-accent-light text-white" : "text-white/50 hover:text-white"}`}>PL</Link>
            <Link href="/ru/bbs" className={`rounded-md px-2.5 py-1 ${ru ? "bg-accent-light text-white" : "text-white/50 hover:text-white"}`}>RU</Link>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white">{ru ? "Внутренняя панель B&BS" : "Panel wewnętrzny B&BS"}</h1>
        <p className="mt-2 text-sm leading-relaxed text-white/50">
          {ru
            ? "Введите пароль администратора, чтобы открыть внутренние инструменты."
            : "Wpisz hasło administratora, aby przejść do narzędzi wewnętrznych."}
        </p>

        <form action={action} className="mt-7 space-y-4">
          <input type="hidden" name="locale" value={locale} />
          <div className="space-y-2">
            <Label htmlFor="bbs-password" className="text-white/80">
              {ru ? "Пароль" : "Hasło"}
            </Label>
            <Input
              id="bbs-password"
              name="password"
              type="password"
              required
              minLength={16}
              maxLength={256}
              autoComplete="current-password"
              autoFocus
              disabled={!configured || pending}
              className="border-white/15 bg-white/5 text-white placeholder:text-white/30"
            />
          </div>

          {state.error && (
            <div
              role="alert"
              className="rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-300"
            >
              {state.error}
            </div>
          )}

          {!configured && (
            <div
              role="status"
              className="rounded-lg border border-yellow-500/30 bg-yellow-500/5 px-4 py-3 text-sm text-yellow-300"
            >
              {ru ? "Панель временно недоступна." : "Panel jest chwilowo niedostępny."}
            </div>
          )}

          <Button
            type="submit"
            disabled={!configured || pending}
            className="w-full bg-accent-light text-white shadow-lg shadow-accent-light/25 hover:bg-[#dbaa47]"
          >
            {pending ? (ru ? "Вход…" : "Logowanie…") : ru ? "Войти" : "Zaloguj się"}
          </Button>
        </form>
      </div>
    </div>
  );
}
