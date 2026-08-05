import type { ProjectPayment } from "@/lib/portal/types";

function formatAmount(amount: number, currency: string): string {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function FinanceCard({ payment }: { payment: ProjectPayment }) {
  const paidPct =
    payment.totalValue > 0
      ? Math.round((payment.paid / payment.totalValue) * 100)
      : 0;

  return (
    <div className="rounded-2xl border border-white/10 bg-navy-light p-5 sm:p-6">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/40">
        Płatności
      </h3>

      <div className="space-y-3">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-sm text-white/60">Wartość projektu</span>
          <span className="font-semibold text-white">
            {formatAmount(payment.totalValue, payment.currency)}
          </span>
        </div>

        <div className="flex items-baseline justify-between gap-4">
          <span className="text-sm text-white/60">Opłacono</span>
          <span className="font-semibold text-green-400">
            {formatAmount(payment.paid, payment.currency)}
          </span>
        </div>

        <div className="flex items-baseline justify-between gap-4">
          <span className="text-sm text-white/60">Pozostało</span>
          <span className="font-semibold text-accent-light">
            {formatAmount(payment.remaining, payment.currency)}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="mb-1.5 flex justify-between text-xs text-white/40">
          <span>Postęp płatności</span>
          <span>{paidPct}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-accent-light transition-all"
            style={{ width: `${paidPct}%` }}
          />
        </div>
      </div>

      {payment.entries.length > 0 && (
        <div className="mt-4 border-t border-white/8 pt-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-white/30">
            Historia płatności
          </p>
          <ul className="space-y-1.5">
            {payment.entries.map((entry) => (
              <li
                key={entry.id}
                className="flex items-start justify-between gap-3 text-sm"
              >
                <span className="text-white/50">
                  {entry.date} — {entry.note}
                </span>
                <span className="shrink-0 font-medium text-white/70">
                  {formatAmount(entry.amount, payment.currency)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
