import { companyConfig } from "@/config/company";
import type { Locale } from "@/i18n/config";

export type LocalizedStatistic = {
  id: string;
  value: string;
  label: string;
};

export const statistics: Record<Locale, LocalizedStatistic[]> = {
  pl: [
    { id: "experience", value: "17 lat", label: "doświadczenia we współpracy z Chinami" },
    { id: "clients", value: "275+", label: "obsłużonych klientów" },
    { id: "containers", value: "110+", label: "dostarczonych kontenerów" },
    { id: "china", value: companyConfig.stats.chinaOperationsCity, label: "operacje i wsparcie na miejscu w Chinach" },
  ],
  uk: [
    { id: "experience", value: "17 років", label: "досвіду роботи з Китаєм" },
    { id: "clients", value: "275+", label: "обслугованих клієнтів" },
    { id: "containers", value: "110+", label: "доставлених контейнерів" },
    { id: "china", value: companyConfig.stats.chinaOperationsCity, label: "операції та підтримка на місці в Китаї" },
  ],
  ru: [
    { id: "experience", value: "17 лет", label: "опыта работы с Китаем" },
    { id: "clients", value: "275+", label: "обслуженных клиентов" },
    { id: "containers", value: "110+", label: "доставленных контейнеров" },
    { id: "china", value: companyConfig.stats.chinaOperationsCity, label: "операции и поддержка на месте в Китае" },
  ],
  de: [
    { id: "experience", value: "17 Jahre", label: "Erfahrung in der Zusammenarbeit mit China" },
    { id: "clients", value: "275+", label: "betreute Kunden" },
    { id: "containers", value: "110+", label: "gelieferte Container" },
    { id: "china", value: companyConfig.stats.chinaOperationsCity, label: "operative Unterstützung vor Ort in China" },
  ],
  zh: [
    { id: "experience", value: "17 年", label: "中国业务协作经验" },
    { id: "clients", value: "275+", label: "已服务客户" },
    { id: "containers", value: "110+", label: "已交付集装箱" },
    { id: "china", value: companyConfig.stats.chinaOperationsCity, label: "中国本地运营与支持" },
  ],
};

export function getStatistics(locale: Locale): LocalizedStatistic[] {
  return statistics[locale];
}
