import type { Locale } from "@/i18n/config";

export const contacts = {
  email: "contact@buybringsolutions.com",
  social: {
    instagram: "https://www.instagram.com/buybring_solutions",
    facebook: "https://www.facebook.com/profile.php?id=61585041982322",
    whatsapp: "https://wa.me/48783232971",
  },
  phones: {
    poland: {
      display: "+48 783 232 971",
      tel: "+48783232971",
      country: {
        pl: "Polska",
        uk: "Польща",
        ru: "Польша",
        de: "Polen",
        zh: "波兰",
      },
      whatsapp: "https://wa.me/48783232971",
    },
    ukraine: {
      display: "+380 66 496 38 81",
      tel: "+380664963881",
      country: {
        pl: "Ukraina",
        uk: "Україна",
        ru: "Украина",
        de: "Ukraine",
        zh: "乌克兰",
      },
      whatsapp: "https://wa.me/380664963881",
    },
    china: {
      display: "+86 139 2994 3320",
      tel: "+8613929943320",
      country: {
        pl: "Chiny",
        uk: "Китай",
        ru: "Китай",
        de: "China",
        zh: "中国",
      },
      whatsapp: "https://wa.me/8613929943320",
    },
  },
  addresses: {
    ukraine: {
      pl: "65074, M. Babadzhanyana 25B, Odesa, Ukraine",
      uk: "65074, вул. М. Бабаджаняна 25Б, Одеса, Україна",
      ru: "65074, ул. М. Бабаджаняна 25Б, Одесса, Украина",
      de: "65074, M. Babadzhanyana 25B, Odessa, Ukraine",
      zh: "65074，乌克兰敖德萨市 M. Babadzhanyana 街 25B",
    },
    china: {
      pl: "4th floor, B lift, Block D8, Core District of Guangdong New Lighting Base, Shishan Town, Foshan City, Guangdong Province, China, 528200",
      uk: "4-й поверх, ліфт B, блок D8, Core District of Guangdong New Lighting Base, Shishan Town, Foshan City, Guangdong Province, China, 528200",
      ru: "4-й этаж, лифт B, блок D8, Core District of Guangdong New Lighting Base, Shishan Town, Foshan City, Guangdong Province, China, 528200",
      de: "4. Etage, Aufzug B, Block D8, Core District of Guangdong New Lighting Base, Shishan Town, Foshan City, Guangdong Province, China, 528200",
      zh: "中国广东省佛山市狮山镇广东新光源产业基地核心区D8栋B梯4楼，528200",
    },
  },
} as const;

/** Primary phone shown in header/mobile nav per locale */
export function getPrimaryPhone(locale: Locale) {
  switch (locale) {
    case "uk":
    case "ru":
      return contacts.phones.ukraine;
    case "zh":
      return contacts.phones.china;
    case "pl":
    case "de":
    default:
      return contacts.phones.poland;
  }
}

export type RegionalContactPerson = {
  name: string;
  role: Record<Locale, string>;
  region: Record<Locale, string>;
  photo: string;
  phone: string;
  whatsapp?: string;
  email: string;
  introduction: Record<Locale, string>;
  languages: string[];
};

/** Leave empty until verified — component hides when no person configured */
export const regionalContactPersons: RegionalContactPerson[] = [
  // TODO: Add verified contact person data when available
  // Example structure for Kyrylo Podolskyi:
  // {
  //   name: "Kyrylo Podolskyi",
  //   role: { pl: "...", uk: "...", ... },
  //   ...
  // },
];
