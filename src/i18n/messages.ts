import pl from "@/i18n/messages/pl.json";
import uk from "@/i18n/messages/uk.json";
import ru from "@/i18n/messages/ru.json";
import de from "@/i18n/messages/de.json";
import zh from "@/i18n/messages/zh.json";
import type { Locale } from "@/i18n/config";

export type Messages = typeof pl;

const messages = { pl, uk, ru, de, zh } satisfies Record<Locale, Messages>;

export function getMessages(locale: Locale): Messages {
  return messages[locale];
}

export function formatMessage(template: string, values: Record<string, string | number>): string {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replaceAll(`{{${key}}}`, String(value)),
    template,
  );
}
