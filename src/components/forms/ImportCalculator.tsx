"use client";

import { useCallback, useEffect, useId, useState } from "react";
import Link from "next/link";
import { FieldHelp, HelpTooltip, ResultHelp } from "@/components/forms/FieldHelp";
import { TooltipProvider } from "@/components/ui/tooltip";
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
import { useCurrentLocale } from "@/i18n/use-current-locale";
import { prefixPathWithLocale } from "@/i18n/routing";

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
  originCosts: 0,
  customsHandling: 0,
  customsBrokerCost: 0,
  terminalCharges: 0,
  finalDelivery: 0,
  serviceCost: 0,
  units: 1,
  packages: 1,
  dimensions: "",
  destinationCountry: "Polska",
  destinationPostcode: "",
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
  const locale = useCurrentLocale();
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
    ? "Ubezpieczenie wliczone w wartość CIF"
    : "Dodać ubezpieczenie 0,5% (min. 50 USD)";

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
                Kalkulator kosztu importu z Chin
              </h2>
              <p className="mt-2 text-sm text-white/70">
                Oblicz orientacyjny koszt zakupu, transportu, cła i podatku VAT
              </p>
              <p className="mt-1 text-xs text-accent-light">B&amp;BS Poland</p>
            </div>
            <div className="rounded-full border border-white/20 px-3 py-2 text-xs whitespace-normal text-white/60 sm:whitespace-nowrap">
              Dane planistyczne: {formatRateDate(rateDate)} · wynik ma charakter informacyjny
              {ratesSource === "nbp" ? " · kursy NBP" : ""}
            </div>
          </header>

          <div className="grid lg:grid-cols-[minmax(0,1.02fr)_minmax(380px,0.98fr)]">
            <section className="border-b border-white/10 px-[18px] py-6 lg:border-r lg:border-b-0 sm:px-[30px]">
              <h3 className="text-xl text-white">Dane przesyłki</h3>
              <p className="mb-[18px] mt-1.5 text-xs leading-snug text-white/50">
                {calculatorFormIntro}
              </p>

              <div className="grid gap-3.5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <FieldHelp
                    htmlFor="goods"
                    label="Wartość towaru"
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
                    label="Waluta towaru"
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
                    label="Sposób transportu"
                    help={fieldHelp.mode}
                  />
                  <select
                    id="mode"
                    value={input.mode}
                    onChange={(e) => update("mode", e.target.value as TransportMode)}
                    className={inputClassName}
                  >
                    <option value="sea20">Morze - kontener 20 ft</option>
                    <option value="sea40">Morze - kontener 40 ft</option>
                    <option value="sea40hc">Morze - kontener 40 HC</option>
                    <option value="sealcl">Morze - LCL</option>
                    <option value="rail20">Kolej - kontener 20 ft</option>
                    <option value="rail40">Kolej - kontener 40 HQ</option>
                    <option value="raillcl">Kolej - LCL</option>
                    <option value="air">Lotniczy</option>
                  </select>
                </div>

                {showVolumeWeight && (
                  <>
                    <div className="flex flex-col gap-1.5">
                      <FieldHelp
                        htmlFor="cbm"
                        label="Objętość (m³)"
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
                        label="Waga brutto (kg)"
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
                    <div className="flex flex-col gap-1.5">
                      <FieldHelp
                        htmlFor="packages"
                        label="Liczba paczek"
                        help="Liczba kartonów lub opakowań transportowych."
                      />
                      <input
                        id="packages"
                        type="number"
                        min={1}
                        step={1}
                        value={input.packages ?? 1}
                        onChange={(e) => update("packages", Number(e.target.value))}
                        className={inputClassName}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <FieldHelp
                        htmlFor="dimensions"
                        label="Wymiary (opcjonalnie)"
                        help="Format przykładowy: 120x80x140 cm."
                      />
                      <input
                        id="dimensions"
                        type="text"
                        value={input.dimensions ?? ""}
                        onChange={(e) => update("dimensions", e.target.value)}
                        className={inputClassName}
                      />
                    </div>
                  </>
                )}

                <div className="flex flex-col gap-1.5">
                  <FieldHelp
                    htmlFor="incoterm"
                    label="Incoterm"
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
                    label="Liczba kodów CN"
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
                    htmlFor="destinationCountry"
                    label="Kraj docelowy"
                    help="Kraj dostawy końcowej."
                  />
                  <input
                    id="destinationCountry"
                    type="text"
                    value={input.destinationCountry ?? ""}
                    onChange={(e) => update("destinationCountry", e.target.value)}
                    className={inputClassName}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <FieldHelp
                    htmlFor="destinationPostcode"
                    label="Kod pocztowy docelowy"
                    help="Kod pocztowy miejsca dostawy."
                  />
                  <input
                    id="destinationPostcode"
                    type="text"
                    value={input.destinationPostcode ?? ""}
                    onChange={(e) => update("destinationPostcode", e.target.value)}
                    className={inputClassName}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <FieldHelp
                    htmlFor="units"
                    label="Liczba sztuk"
                    help="Umożliwia obliczenie orientacyjnego kosztu landed na sztukę."
                  />
                  <input
                    id="units"
                    type="number"
                    min={1}
                    step={1}
                    value={input.units ?? 1}
                    onChange={(e) => update("units", Number(e.target.value))}
                    className={inputClassName}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <FieldHelp
                    htmlFor="serviceCost"
                    label="Koszt usługi B&BS (opcjonalnie)"
                    help="Opcjonalny koszt wsparcia projektowego."
                  />
                  <input
                    id="serviceCost"
                    type="number"
                    min={0}
                    step={10}
                    value={input.serviceCost ?? 0}
                    onChange={(e) => update("serviceCost", Number(e.target.value))}
                    className={inputClassName}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <FieldHelp
                    htmlFor="originCosts"
                    label="Koszty pochodzenia (opcjonalnie)"
                    help="Dodatkowe koszty po stronie kraju nadania."
                  />
                  <input
                    id="originCosts"
                    type="number"
                    min={0}
                    step={10}
                    value={input.originCosts ?? 0}
                    onChange={(e) => update("originCosts", Number(e.target.value))}
                    className={inputClassName}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <FieldHelp
                    htmlFor="customsHandling"
                    label="Obsługa celna (opcjonalnie)"
                    help="Dodatkowa opłata za obsługę celną."
                  />
                  <input
                    id="customsHandling"
                    type="number"
                    min={0}
                    step={10}
                    value={input.customsHandling ?? 0}
                    onChange={(e) => update("customsHandling", Number(e.target.value))}
                    className={inputClassName}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <FieldHelp
                    htmlFor="customsBrokerCost"
                    label="Koszt agencji celnej (opcjonalnie)"
                    help="Ręczne nadpisanie domyślnego kosztu brokera."
                  />
                  <input
                    id="customsBrokerCost"
                    type="number"
                    min={0}
                    step={10}
                    value={input.customsBrokerCost ?? 0}
                    onChange={(e) => update("customsBrokerCost", Number(e.target.value))}
                    className={inputClassName}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <FieldHelp
                    htmlFor="terminalCharges"
                    label="Opłaty terminalowe (opcjonalnie)"
                    help="Koszty terminalowe i portowe po stronie odbioru."
                  />
                  <input
                    id="terminalCharges"
                    type="number"
                    min={0}
                    step={10}
                    value={input.terminalCharges ?? 0}
                    onChange={(e) => update("terminalCharges", Number(e.target.value))}
                    className={inputClassName}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <FieldHelp
                    htmlFor="finalDelivery"
                    label="Dostawa końcowa (opcjonalnie)"
                    help="Koszt dostawy od terminala do magazynu."
                  />
                  <input
                    id="finalDelivery"
                    type="number"
                    min={0}
                    step={10}
                    value={input.finalDelivery ?? 0}
                    onChange={(e) => update("finalDelivery", Number(e.target.value))}
                    className={inputClassName}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <FieldHelp
                    htmlFor="duty"
                    label="Stawka cła"
                    help={fieldHelp.duty}
                  />
                  <select
                    id="duty"
                    value={input.duty}
                    onChange={(e) => update("duty", e.target.value as DutyOption)}
                    className={inputClassName}
                  >
                    <option value="unknown">Nie znam - pokaż 0/5/10%</option>
                    <option value="0">0%</option>
                    <option value="3">3%</option>
                    <option value="5">5%</option>
                    <option value="10">10%</option>
                    <option value="custom">Inna</option>
                  </select>
                </div>

                {showCustomDuty && (
                  <div className="flex flex-col gap-1.5">
                    <FieldHelp
                      htmlFor="customDuty"
                      label="Własna stawka (%)"
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
                    label="Kurs USD/PLN"
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
                    label="Kurs EUR/PLN"
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
                    label="Ubezpieczenie"
                    help={getInsuranceHelp(input.incoterm)}
                  />
                </div>
              </div>

              <button type="button" onClick={handleCalculate} className={buttonClassName}>
                Oblicz orientacyjny koszt
              </button>

              <p className="mt-3.5 border-l-[3px] border-accent-light pl-3 text-xs leading-snug text-white/50">
                Stawki są orientacyjne i wymagają aktualizacji dla konkretnego
                projektu. Wynik nie stanowi oferty handlowej ani porady podatkowej.
              </p>
            </section>

            <section
              className="bg-surface-deep/50 px-[18px] py-6 sm:px-[30px]"
              aria-live="polite"
              aria-atomic="true"
            >
              <h3 className="mb-[18px] text-xl text-white">Wynik</h3>

              {!result ? (
                <div className="rounded-xl border border-dashed border-white/20 p-[22px] text-center text-white/40">
                  Uzupełnij dane i kliknij „Oblicz”.
                </div>
              ) : (
                <div>
                  <div className="mb-3.5 rounded-xl border border-white/10 bg-surface-deep p-[18px] shadow-xl shadow-black/30">
                    <small className="mb-1.5 flex items-center gap-1 text-white/60">
                      <span>Środki potrzebne przy imporcie (z VAT)</span>
                      <HelpTooltip
                        label="Środki potrzebne przy imporcie (z VAT)"
                        help={resultHelp.totalCash}
                        size="sm"
                        className="text-white/50 hover:text-accent-light"
                      />
                    </small>
                    <strong className="text-[29px] text-accent-light">
                      {formatMoney(mid!.total)}
                    </strong>
                    <div className="mt-1 text-xs text-white/50">
                      Zakres przy tej stawce cła: {formatMoney(result.low.total)} -{" "}
                      {formatMoney(result.high.total)} · {mid!.s.days}
                    </div>
                    {(input.units ?? 0) > 0 ? (
                      <div className="mt-1 text-xs text-white/50">
                        Orientacyjny landed cost / szt.:{" "}
                        {formatMoney(mid!.landed / Math.max(1, input.units ?? 1))}
                      </div>
                    ) : null}
                  </div>

                  <div className="mb-3.5 grid gap-2.5 sm:grid-cols-2">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <small className="mb-1.5 flex items-center gap-1 text-white/50">
                        <span>Koszt landed bez VAT</span>
                        <HelpTooltip
                          label="Koszt landed bez VAT"
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
                        <span>Transport</span>
                        <HelpTooltip label="Transport" help={resultHelp.transport} size="sm" />
                      </small>
                      <strong className="text-[17px] text-white">
                        {formatMoney(mid!.transport)} (
                        {formatMoney(result.low.transport)}-
                        {formatMoney(result.high.transport)})
                      </strong>
                      {isCif && (
                        <span className="mt-1 block text-[11px] text-white/50">
                          Międzynarodowy fracht wliczony w wartość CIF
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-xl border border-white/10">
                    <BreakdownRow label="Wartość towaru" value={formatMoney(mid!.g)} />
                    <BreakdownRow
                      label={isCif ? "Transport (lokalny PL)" : "Transport"}
                      help={resultHelp.transport}
                      value={formatMoney(mid!.transport)}
                    />
                    <BreakdownRow
                      label="Ubezpieczenie"
                      value={formatMoney(mid!.ins)}
                    />
                    <BreakdownRow
                      label="Wartość celna"
                      help={resultHelp.customsValue}
                      value={formatMoney(mid!.customs)}
                    />
                    <BreakdownRow
                      label={`Cło ${result.dutyRates[0]}%`}
                      help={resultHelp.duty}
                      value={formatMoney(mid!.duty)}
                    />
                    <BreakdownRow
                      label="VAT importowy 23%"
                      help={resultHelp.vat}
                      value={formatMoney(mid!.vat)}
                    />
                    <BreakdownRow
                      label="Agencja celna"
                      help={resultHelp.broker}
                      value={formatMoney(mid!.broker)}
                    />
                  </div>

                  {showScenarios && (
                    <div className="mt-[15px]">
                      <div className="grid grid-cols-[70px_1fr_1fr] gap-2.5 border-b border-white/10 pb-2.5 text-xs font-bold text-white/70 max-[520px]:grid-cols-[55px_1fr_1fr]">
                        <span>Cło</span>
                        <ResultHelp label="Landed bez VAT" help={resultHelp.landed} />
                        <ResultHelp
                          label="Środki z VAT"
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
                    VAT 23%. Cło zależy od kodu CN/TARIC. Odprawa brokera: 250 PLN + 20
                    PLN za dodatkowy kod CN. Zakres transportu: ±15%. Wartość VAT jest
                    pokazywana osobno, ponieważ dla czynnego podatnika może podlegać
                    rozliczeniu.
                  </p>
                  <div className="mt-4">
                    <Link
                      href={prefixPathWithLocale("/kontakt", locale)}
                      className="inline-flex rounded-lg border border-accent-light/20 bg-accent-light px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-accent-light/25 hover:bg-[#dbaa47]"
                    >
                      Prześlij dane do weryfikacji
                    </Link>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
