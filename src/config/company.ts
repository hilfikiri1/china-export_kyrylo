export const company = {
  name: "Buy & Bring Solutions",
  shortName: "B&BS",
  regionalName: "B&BS Poland",
  tagline: {
    pl: "Import, sourcing i produkcja w Chinach dla firm",
    en: "Import, sourcing and production in China for businesses",
    uk: "Імпорт, сорсинг і виробництво в Китаї для бізнесу",
    ru: "Импорт, сорсинг и производство в Китае для компаний",
    de: "Import, Sourcing und Produktion in China für Unternehmen",
    zh: "面向企业的中国进口、采购与生产服务",
  },
  experienceYears: 17,
  clientsCount: "275+",
  containersCount: "110+",
  chinaOperationsCity: "Foshan",
  website: "https://global.buybringsolutions.com",
  copyright: (year: number) =>
    `© ${year} Buy & Bring Solutions. Wszelkie prawa zastrzeżone.`,
} as const;
