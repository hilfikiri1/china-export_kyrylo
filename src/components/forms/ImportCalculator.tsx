"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useState } from "react";
import { FieldHelp, HelpTooltip, ResultHelp } from "@/components/forms/FieldHelp";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useLocale, useT } from "@/i18n/LocaleProvider";
import { localeHref } from "@/i18n/routing";
import {
  calculatorFormIntro,
  fieldHelp,
  getGoodsHelp,
  getInsuranceHelp,
  resultHelp,
} from "@/content/calculator/field-help";
import {
  calculateImportCost,
  formatMoney,
  formatRateDate,
  needsVolumeWeight,
  TARIFF_LAST_UPDATED,
  type CalculatorInput,
  type CalculatorOutput,
  type Currency,
  type DutyOption,
  type Incoterm,
  type NbpRates,
  type TransportMode,
} from "@/lib/calculator";

const inputClassName =
  "w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white [color-scheme:dark] focus:border-accent-light focus:outline-none focus:ring-1 focus:ring-accent-light";

const buttonClassName =
  "mt-[18px] w-full cursor-pointer rounded-lg border border-accent-light/20 bg-accent-light px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent-light/25 transition-colors duration-200 hover:bg-[#dbaa47] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light focus-visible:ring-offset-2 focus-visible:ring-offset-navy-light";

const defaultInput: CalculatorInput = {
  goods: 25000,
  currency: "USD",
  mode: "sea20",
  cbm: 5,
  kg: 1000,
  incoterm: "EXW",
  cnCodes: 1,
  duty: "5",
  customDuty: 5,
  usdPln: 3.81,
  eurPln: 4.33,
  insurance: true,
};

function BreakdownRow({
  label,
  help,
  value,
}: {
  label: string;
  help?: string;
  value: string;
}) {
  return (
    <div className="flex justify-between gap-4 border-b border-white/10 px-3 py-2.5 text-[13px] text-white/70 last:border-b-0">
      {help ? <ResultHelp label={label} help={help} /> : <span>{label}</span>}
      <b className="text-right text-white">{value}</b>
    </div>
  );
}

export function ImportCalculator() {
  const t = useT();
  const locale = useLocale();
  const insuranceId = useId();
  const [input, setInput] = useState<CalculatorInput>(defaultInput);
  const [result, setResult] = useState<CalculatorOutput | null>(null);
  const [rateDate, setRateDate] = useState(TARIFF_LAST_UPDATED);
  const [ratesSource, setRatesSource] = useState<"nbp" | "manual">("manual");

  useEffect(() => {
    let cancelled = false;

    async function loadRates() {
      try {
        const response = await fetch("/api/nbp-rates");
        if (!response.ok) return;

        const data = (await response.json()) as NbpRates;
        if (cancelled) return;

        setInput((prev) => ({
          ...prev,
          usdPln: data.usdPln,
          eurPln: data.eurPln,
        }));
        setRateDate(data.effectiveDate);
        setRatesSource("nbp");
      } catch {
        // Keep default manual rates.
      }
    }

    void loadRates();

    return () => {
      cancelled = true;
    };
  }, []);

  const showVolumeWeight = needsVolumeWeight(input.mode);
  const showCustomDuty = input.duty === "custom";
  const isCif = input.incoterm === "CIF";
  const insuranceLabel = isCif
    ? t("calculator.insuranceCif")
    : t("calculator.insuranceAdd");

  const update = useCallback(
    <K extends keyof CalculatorInput>(key: K, value: CalculatorInput[K]) => {
      setInput((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const handleCalculate = () => {
    if (input.goods <= 0 || input.usdPln <= 0 || input.eurPln <= 0) return;
    if (showVolumeWeight && (input.cbm <= 0 || input.kg <= 0)) return;
    setResult(calculateImportCost(input));
  };

  const mid = result?.mid;
  const showScenarios = result != null && result.dutyRates.length > 1;

  return (
    <TooltipProvider>
      <div className="mx-auto max-w-[1180px] px-4 pb-8 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-navy-light">
          <div className="absolute top-0 right-0 left-0 h-[2px] bg-accent-light" aria-hidden />

          <header className="flex flex-col items-start justify-between gap-5 border-b border-white/10 px-[18px] py-6 sm:flex-row sm:items-end sm:px-[30px]">
            <div>
              <h2 className="text-[28px] leading-[1.12] font-semibold text-white">
                {t("calculator.title")}
              </h2>
              <p className="mt-2 text-sm text-white/70">
                {t("calculator.subtitle")}
              </p>
              <p className="mt-1 text-xs text-accent-light">B&amp;BS Poland</p>
            </div>
            <div className="rounded-full border border-white/20 px-3 py-2 text-xs whitespace-normal text-white/60 sm:whitespace-nowrap">
              {t("calculator.planningBadge").replace(
                "{date}",
                formatRateDate(rateDate),
              )}
              {ratesSource === "nbp" ? t("calculator.ratesNbp") : ""}
            </div>
          </header>

          <div className="grid lg:grid-cols-[minmax(0,1.02fr)_minmax(380px,0.98fr)]">
            <section className="border-b border-white/10 px-[18px] py-6 lg:border-r lg:border-b-0 sm:px-[30px]">
              <h3 className="text-xl text-white">{t("calculator.shipmentData")}</h3>
              <p className="mb-[18px] mt-1.5 text-xs leading-snug text-white/50">
                {calculatorFormIntro}
              </p>

              <div className="grid gap-3.5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <FieldHelp
                    htmlFor="goods"
                    label={t("calculator.fields.goods")}
                    help={getGoodsHelp(input.incoterm)}
                  />
                  <input
                    id="goods"
                    type="number"
                    min={0}
                    step={100}
                    value={input.goods}
                    onChange={(e) => update("goods", Number(e.target.value))}
                    className={inputClassName}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <FieldHelp
                    htmlFor="currency"
                    label={t("calculator.fields.currency")}
                    help={fieldHelp.currency}
                  />
                  <select
                    id="currency"
                    value={input.currency}
                    onChange={(e) => update("currency", e.target.value as Currency)}
                    className={inputClassName}
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="PLN">PLN</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <FieldHelp
                    htmlFor="mode"
                    label={t("calculator.fields.mode")}
                    help={fieldHelp.mode}
                  />
                  <select
                    id="mode"
                    value={input.mode}
                    onChange={(e) => update("mode", e.target.value as TransportMode)}
                    className={inputClassName}
                  >
                    <option value="sea20">{t("calculator.modes.sea20")}</option>
                    <option value="sea40">{t("calculator.modes.sea40")}</option>
                    <option value="sea40hc">{t("calculator.modes.sea40hc")}</option>
                    <option value="sealcl">{t("calculator.modes.sealcl")}</option>
                    <option value="rail20">{t("calculator.modes.rail20")}</option>
                    <option value="rail40">{t("calculator.modes.rail40")}</option>
                    <option value="raillcl">{t("calculator.modes.raillcl")}</option>
                    <option value="air">{t("calculator.modes.air")}</option>
                  </select>
                </div>

                {showVolumeWeight && (
                  <>
                    <div className="flex flex-col gap-1.5">
                      <FieldHelp
                        htmlFor="cbm"
                        label={t("calculator.fields.cbm")}
                        help={fieldHelp.cbm}
                      />
                      <input
                        id="cbm"
                        type="number"
                        min={0.01}
                        step={0.1}
                        value={input.cbm}
                        onChange={(e) => update("cbm", Number(e.target.value))}
                        className={inputClassName}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <FieldHelp
                        htmlFor="kg"
                        label={t("calculator.fields.kg")}
                        help={fieldHelp.kg}
                      />
                      <input
                        id="kg"
                        type="number"
                        min={1}
                        step={10}
                        value={input.kg}
                        onChange={(e) => update("kg", Number(e.target.value))}
                        className={inputClassName}
                      />
                    </div>
                  </>
                )}

                <div className="flex flex-col gap-1.5">
                  <FieldHelp
                    htmlFor="incoterm"
                    label={t("calculator.fields.incoterm")}
                    help={fieldHelp.incoterm}
                  />
                  <select
                    id="incoterm"
                    value={input.incoterm}
                    onChange={(e) => update("incoterm", e.target.value as Incoterm)}
                    className={inputClassName}
                  >
                    <option value="EXW">EXW</option>
                    <option value="FOB">FOB</option>
                    <option value="CIF">CIF</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <FieldHelp
                    htmlFor="cncodes"
                    label={t("calculator.fields.cnCodes")}
                    help={fieldHelp.cnCodes}
                  />
                  <input
                    id="cncodes"
                    type="number"
                    min={1}
                    step={1}
                    value={input.cnCodes}
                    onChange={(e) => update("cnCodes", Number(e.target.value))}
                    className={inputClassName}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <FieldHelp
                    htmlFor="duty"
                    label={t("calculator.fields.duty")}
                    help={fieldHelp.duty}
                  />
                  <select
                    id="duty"
                    value={input.duty}
                    onChange={(e) => update("duty", e.target.value as DutyOption)}
                    className={inputClassName}
                  >
                    <option value="unknown">{t("calculator.duty.unknown")}</option>
                    <option value="0">0%</option>
                    <option value="3">3%</option>
                    <option value="5">5%</option>
                    <option value="10">10%</option>
                    <option value="custom">{t("calculator.duty.custom")}</option>
                  </select>
                </div>

                {showCustomDuty && (
                  <div className="flex flex-col gap-1.5">
                    <FieldHelp
                      htmlFor="customDuty"
                      label={t("calculator.fields.customDuty")}
                      help={fieldHelp.customDuty}
                    />
                    <input
                      id="customDuty"
                      type="number"
                      min={0}
                      max={100}
                      step={0.1}
                      value={input.customDuty}
                      onChange={(e) => update("customDuty", Number(e.target.value))}
                      className={inputClassName}
                    />
                  </div>
                )}

                <div className="flex flex-col gap-1.5">
                  <FieldHelp
                    htmlFor="usdpln"
                    label={t("calculator.fields.usdPln")}
                    help={fieldHelp.usdPln}
                  />
                  <input
                    id="usdpln"
                    type="number"
                    min={0.1}
                    step={0.0001}
                    value={input.usdPln}
                    onChange={(e) => {
                      setRatesSource("manual");
                      update("usdPln", Number(e.target.value));
                    }}
                    className={inputClassName}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <FieldHelp
                    htmlFor="eurpln"
                    label={t("calculator.fields.eurPln")}
                    help={fieldHelp.eurPln}
                  />
                  <input
                    id="eurpln"
                    type="number"
                    min={0.1}
                    step={0.0001}
                    value={input.eurPln}
                    onChange={(e) => {
                      setRatesSource("manual");
                      update("eurPln", Number(e.target.value));
                    }}
                    className={inputClassName}
                  />
                </div>

                <div className="flex items-center gap-2.5 pt-1 sm:col-span-2">
                  <input
                    id={insuranceId}
                    type="checkbox"
                    checked={input.insurance}
                    disabled={isCif}
                    onChange={(e) => update("insurance", e.target.checked)}
                    className="h-4 w-4 accent-accent-light"
                  />
                  <label htmlFor={insuranceId} className="text-sm text-white/70">
                    {insuranceLabel}
                  </label>
                  <HelpTooltip
                    label={t("calculator.insuranceLabel")}
                    help={getInsuranceHelp(input.incoterm)}
                  />
                </div>
              </div>

              <button type="button" onClick={handleCalculate} className={buttonClassName}>
                {t("calculator.calculate")}
              </button>

              <p className="mt-3.5 border-l-[3px] border-accent-light pl-3 text-xs leading-snug text-white/50">
                {t("calculator.ratesNote")}
              </p>
            </section>

            <section
              className="bg-surface-deep/50 px-[18px] py-6 sm:px-[30px]"
              aria-live="polite"
              aria-atomic="true"
            >
              <h3 className="mb-[18px] text-xl text-white">{t("calculator.resultTitle")}</h3>

              {!result ? (
                <div className="rounded-xl border border-dashed border-white/20 p-[22px] text-center text-white/40">
                  {t("calculator.empty")}
                </div>
              ) : (
                <div>
                  <div className="mb-3.5 rounded-xl border border-white/10 bg-surface-deep p-[18px] shadow-xl shadow-black/30">
                    <small className="mb-1.5 flex items-center gap-1 text-white/60">
                      <span>{t("calculator.totalCash")}</span>
                      <HelpTooltip
                        label={t("calculator.totalCash")}
                        help={resultHelp.totalCash}
                        size="sm"
                        className="text-white/50 hover:text-accent-light"
                      />
                    </small>
                    <strong className="text-[29px] text-accent-light">
                      {formatMoney(mid!.total)}
                    </strong>
                    <div className="mt-1 text-xs text-white/50">
                      {t("calculator.rangeLabel")
                        .replace("{low}", formatMoney(result.low.total))
                        .replace("{high}", formatMoney(result.high.total))
                        .replace("{days}", mid!.s.days)}
                    </div>
                  </div>

                  <div className="mb-3.5 grid gap-2.5 sm:grid-cols-2">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <small className="mb-1.5 flex items-center gap-1 text-white/50">
                        <span>{t("calculator.landed")}</span>
                        <HelpTooltip
                          label={t("calculator.landed")}
                          help={resultHelp.landed}
                          size="sm"
                        />
                      </small>
                      <strong className="text-[17px] text-white">
                        {formatMoney(mid!.landed)}
                      </strong>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <small className="mb-1.5 flex items-center gap-1 text-white/50">
                        <span>{t("calculator.transport")}</span>
                        <HelpTooltip label={t("calculator.transport")} help={resultHelp.transport} size="sm" />
                      </small>
                      <strong className="text-[17px] text-white">
                        {formatMoney(mid!.transport)} (
                        {formatMoney(result.low.transport)}-
                        {formatMoney(result.high.transport)})
                      </strong>
                      {isCif && (
                        <span className="mt-1 block text-[11px] text-white/50">
                          {t("calculator.cifFreight")}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-xl border border-white/10">
                    <BreakdownRow label={t("calculator.rows.goods")} value={formatMoney(mid!.g)} />
                    <BreakdownRow
                      label={isCif ? t("calculator.rows.transportLocal") : t("calculator.rows.transport")}
                      help={resultHelp.transport}
                      value={formatMoney(mid!.transport)}
                    />
                    <BreakdownRow
                      label={t("calculator.rows.insurance")}
                      value={formatMoney(mid!.ins)}
                    />
                    <BreakdownRow
                      label={t("calculator.rows.customsValue")}
                      help={resultHelp.customsValue}
                      value={formatMoney(mid!.customs)}
                    />
                    <BreakdownRow
                      label={t("calculator.rows.dutyRate").replace(
                        "{rate}",
                        String(result.dutyRates[0]),
                      )}
                      help={resultHelp.duty}
                      value={formatMoney(mid!.duty)}
                    />
                    <BreakdownRow
                      label={t("calculator.rows.vat")}
                      help={resultHelp.vat}
                      value={formatMoney(mid!.vat)}
                    />
                    <BreakdownRow
                      label={t("calculator.rows.broker")}
                      help={resultHelp.broker}
                      value={formatMoney(mid!.broker)}
                    />
                  </div>

                  {showScenarios && (
                    <div className="mt-[15px]">
                      <div className="grid grid-cols-[70px_1fr_1fr] gap-2.5 border-b border-white/10 pb-2.5 text-xs font-bold text-white/70 max-[520px]:grid-cols-[55px_1fr_1fr]">
                        <span>{t("calculator.scenarios.duty")}</span>
                        <ResultHelp label={t("calculator.scenarios.landed")} help={resultHelp.landed} />
                        <ResultHelp
                          label={t("calculator.scenarios.totalCash")}
                          help={resultHelp.totalCash}
                        />
                      </div>
                      {result.scenarios.map((scenario) => (
                        <div
                          key={scenario.dutyRate}
                          className="grid grid-cols-[70px_1fr_1fr] gap-2.5 border-b border-white/10 py-2.5 text-[13px] text-white/70 last:border-b-0 max-[520px]:grid-cols-[55px_1fr_1fr]"
                        >
                          <span>{scenario.dutyRate}%</span>
                          <strong className="text-white">
                            {formatMoney(scenario.landed)}
                          </strong>
                          <strong className="text-white">
                            {formatMoney(scenario.total)}
                          </strong>
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="mt-3.5 text-[11px] leading-snug text-white/50">
                    {t("calculator.resultNote")}
                  </p>

                  <Link
                    href={localeHref(locale, "/kontakt")}
                    className="mt-4 inline-flex w-full justify-center rounded-lg border border-accent-light/20 bg-accent-light px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#dbaa47]"
                  >
                    {t("calculator.transferCta")}
                  </Link>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
