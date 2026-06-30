export type Currency = "USD" | "EUR" | "PLN";

export type TransportMode =
  | "sea20"
  | "sea40"
  | "sea40hc"
  | "sealcl"
  | "rail20"
  | "rail40"
  | "raillcl"
  | "air";

export type Incoterm = "EXW" | "FOB" | "CIF";

export type DutyOption = "unknown" | "0" | "3" | "5" | "10" | "custom";

export type ContainerTariff = {
  label: string;
  origin: number;
  main: number;
  dest: number;
  last: number;
  days: string;
};

export type ShippingBreakdown = {
  label: string;
  origin: number;
  main: number;
  dest: number;
  last: number;
  days: string;
  minimum?: number;
  charge?: number;
};

export type CalculatorInput = {
  goods: number;
  currency: Currency;
  mode: TransportMode;
  cbm: number;
  kg: number;
  incoterm: Incoterm;
  cnCodes: number;
  duty: DutyOption;
  customDuty: number;
  usdPln: number;
  eurPln: number;
  insurance: boolean;
  originCosts?: number;
  customsHandling?: number;
  customsBrokerCost?: number;
  terminalCharges?: number;
  finalDelivery?: number;
  serviceCost?: number;
  units?: number;
  packages?: number;
  dimensions?: string;
  destinationCountry?: string;
  destinationPostcode?: string;
};

export type CalculationResult = {
  g: number;
  s: ShippingBreakdown;
  origin: number;
  main: number;
  dest: number;
  last: number;
  border: number;
  after: number;
  ins: number;
  customs: number;
  duty: number;
  vat: number;
  broker: number;
  total: number;
  landed: number;
  transport: number;
  internationalTransport: number;
  dutyRate: number;
};

export type CalculatorOutput = {
  mid: CalculationResult;
  low: CalculationResult;
  high: CalculationResult;
  dutyRates: number[];
  scenarios: CalculationResult[];
};

export type NbpRates = {
  usdPln: number;
  eurPln: number;
  effectiveDate: string;
};
