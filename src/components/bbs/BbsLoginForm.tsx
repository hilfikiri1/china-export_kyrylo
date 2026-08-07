"use client";

import { useActionState } from "react";
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

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md items-center px-4 py-12 sm:px-6">
      <div className="w-full rounded-2xl border border-white/10 bg-navy-light p-6 shadow-2xl shadow-black/20 sm:p-8">
        <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-accent-light/10 text-accent-light">
          <LockKeyhole className="h-5 w-5" aria-hidden />
        </div>
        <h1 className="text-2xl font-bold text-white">Panel wewnętrzny B&amp;BS</h1>
        <p className="mt-2 text-sm leading-relaxed text-white/50">
          Wpisz hasło administratora, aby przejść do narzędzi wewnętrznych.
        </p>

        <form action={action} className="mt-7 space-y-4">
          <input type="hidden" name="locale" value={locale} />
          <div className="space-y-2">
            <Label htmlFor="bbs-password" className="text-white/80">
              Hasło
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
              Panel jest chwilowo niedostępny.
            </div>
          )}

          <Button
            type="submit"
            disabled={!configured || pending}
            className="w-full bg-accent-light text-white shadow-lg shadow-accent-light/25 hover:bg-[#dbaa47]"
          >
            {pending ? "Logowanie…" : "Zaloguj się"}
          </Button>
        </form>
      </div>
    </div>
  );
}
