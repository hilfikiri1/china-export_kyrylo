import {
  BROKER_BASE_PLN,
  BROKER_EXTRA_CN_PLN,
  CONTAINER_TARIFFS,
  INSURANCE_MIN_USD,
  INSURANCE_RATE,
  TRANSPORT_SCALE_MAX,
  TRANSPORT_SCALE_MIN,
  VAT_RATE,
} from "./tariffs";
import type {
  CalculatorInput,
  CalculatorOutput,
  CalculationResult,
  ShippingBreakdown,
  TransportMode,
} from "./types";

function goodsPln(input: CalculatorInput): number {
  const { goods, currency, usdPln, eurPln } = input;
  if (currency === "PLN") return goods;
  if (currency === "EUR") return goods * eurPln;
  return goods * usdPln;
}

export function shippingUsd(
  mode: TransportMode,
  cbm: number,
  kg: number,
): ShippingBreakdown {
  const volume = Math.max(0, cbm);
  const weight = Math.max(0, kg);
  const container = CONTAINER_TARIFFS[mode];

  if (container) {
    return { ...container };
  }

  if (mode === "sealcl") {
    const wm = Math.max(volume, weight / 1000);
    return {
      label: "Morze LCL",
      origin: Math.max(180, 45 * volume),
      main: 115 * wm,
      dest: Math.max(350, 90 * volume),
      last: Math.max(300, 75 * volume) + 150,
      days: "45-65 dni",
    };
  }

  if (mode === "raillcl") {
    return {
      label: "Kolej LCL",
      origin: 60 * volume,
      main: 200 * volume,
      dest: 60 * volume,
      last: Math.max(300, 75 * volume) + 150,
      minimum: 1000,
      days: "18-30 dni",
    };
  }

  const charge = Math.max(weight, volume * 167);
  const rate =
    charge < 100 ? 7 : charge < 300 ? 5.5 : charge < 500 ? 4.5 : 3.8;

  return {
    label: "Transport lotniczy",
    origin: Math.max(120, 0.45 * charge),
    main: rate * charge,
    dest: Math.max(180, 0.65 * charge),
    last: 230,
    days: "5-10 dni",
    charge,
  };
}

function resolveDutyRates(input: CalculatorInput): number[] {
  if (input.duty === "unknown") return [0, 5, 10];
  if (input.duty === "custom") return [input.customDuty];
  return [Number(input.duty)];
}

function calc(
  input: CalculatorInput,
  dutyRate: number,
  scale = 1,
): CalculationResult {
  const usd = input.usdPln;
  const g = goodsPln(input);
  const s = shippingUsd(input.mode, input.cbm, input.kg);

  let origin = s.origin * scale;
  let main = s.main * scale;
  let dest = s.dest * scale;
  let last = s.last * scale;

  if (s.minimum) {
    const totalUsd = origin + main + dest + last;
    if (totalUsd < s.minimum) {
      const factor = s.minimum / totalUsd;
      origin *= factor;
      main *= factor;
      dest *= factor;
      last *= factor;
    }
  }

  const border = (origin + main) * usd;
  const after = (dest + last) * usd;
  const internationalTransport = border;

  let ins = 0;
  if (input.incoterm !== "CIF" && input.insurance) {
    ins = Math.max(INSURANCE_MIN_USD * usd, INSURANCE_RATE * (g + border));
  }

  let customs: number;
  if (input.incoterm === "EXW") {
    customs = g + border + ins;
  } else if (input.incoterm === "FOB") {
    customs = g + main * usd + ins;
  } else {
    customs = g;
  }

  const duty = customs * (dutyRate / 100);
  const vat = (customs + duty + after) * VAT_RATE;
  const brokerDefault =
    BROKER_BASE_PLN + Math.max(0, input.cnCodes - 1) * BROKER_EXTRA_CN_PLN;
  const broker =
    input.customsBrokerCost && input.customsBrokerCost > 0
      ? input.customsBrokerCost
      : brokerDefault;

  let total: number;
  let transport: number;
  const customsHandling = Math.max(0, input.customsHandling ?? 0);
  const terminalCharges = Math.max(0, input.terminalCharges ?? 0);
  const finalDelivery = Math.max(0, input.finalDelivery ?? 0);
  const serviceCost = Math.max(0, input.serviceCost ?? 0);
  const additionalOrigin = Math.max(0, input.originCosts ?? 0);

  if (input.incoterm === "CIF") {
    total =
      g +
      after +
      additionalOrigin +
      duty +
      vat +
      broker +
      customsHandling +
      terminalCharges +
      finalDelivery +
      serviceCost;
    transport = after + additionalOrigin + finalDelivery;
  } else {
    total =
      g +
      border +
      after +
      additionalOrigin +
      ins +
      duty +
      vat +
      broker +
      customsHandling +
      terminalCharges +
      finalDelivery +
      serviceCost;
    transport = border + after + additionalOrigin + finalDelivery;
  }

  const landed = total - vat;

  return {
    g,
    s,
    origin,
    main,
    dest,
    last,
    border,
    after,
    ins,
    customs,
    duty,
    vat,
    broker,
    total,
    landed,
    transport,
    internationalTransport,
    dutyRate,
  };
}

export function calculateImportCost(input: CalculatorInput): CalculatorOutput {
  const dutyRates = resolveDutyRates(input);
  const mid = calc(input, dutyRates[0]);
  const low = calc(input, dutyRates[0], TRANSPORT_SCALE_MIN);
  const high = calc(input, dutyRates[0], TRANSPORT_SCALE_MAX);
  const scenarios = dutyRates.map((rate) => calc(input, rate));

  return { mid, low, high, dutyRates, scenarios };
}

export function needsVolumeWeight(mode: TransportMode): boolean {
  return mode === "sealcl" || mode === "raillcl" || mode === "air";
}
