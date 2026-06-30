import type { Locale } from "./config";
import { getDictionary } from "./get-dictionary";
import { createTranslator } from "./translate";

export async function getServerTranslation(locale: Locale) {
  const messages = await getDictionary(locale);
  return {
    locale,
    messages,
    t: createTranslator(messages),
  };
}
