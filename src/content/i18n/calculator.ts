import type { Messages } from "@/i18n/get-dictionary";
import type { Incoterm } from "@/lib/calculator";
import { getMessageObject } from "@/i18n/translate";

type FieldHelpMessages = {
  goods: string;
  goodsCif: string;
  currency: string;
  mode: string;
  cbm: string;
  kg: string;
  incoterm: string;
  cnCodes: string;
  duty: string;
  customDuty: string;
  usdPln: string;
  eurPln: string;
  insurance: string;
  insuranceCif: string;
};

type ResultHelpMessages = {
  totalCash: string;
  landed: string;
  transport: string;
  customsValue: string;
  duty: string;
  vat: string;
  broker: string;
};

export function getCalculatorFieldHelp(messages: Messages) {
  return getMessageObject<FieldHelpMessages>(messages, "calculator.fieldHelp");
}

export function getCalculatorResultHelp(messages: Messages) {
  return getMessageObject<ResultHelpMessages>(messages, "calculator.results");
}

export function getGoodsHelp(messages: Messages, incoterm: Incoterm): string {
  const help = getCalculatorFieldHelp(messages);
  return incoterm === "CIF"
    ? (help?.goodsCif ?? "")
    : (help?.goods ?? "");
}

export function getInsuranceHelp(messages: Messages, incoterm: Incoterm): string {
  const help = getCalculatorFieldHelp(messages);
  return incoterm === "CIF"
    ? (help?.insuranceCif ?? "")
    : (help?.insurance ?? "");
}

export function getTransportModes(messages: Messages) {
  return getMessageObject<Record<string, string>>(
    messages,
    "calculator.transportModes",
  );
}

export function getDutyOptions(messages: Messages) {
  return getMessageObject<Record<string, string>>(
    messages,
    "calculator.dutyOptions",
  );
}
