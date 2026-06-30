import { companyConfig } from "@/config/company";
import { contactConfig } from "@/config/contacts";
import { siteUrl } from "@/config/seo";

export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: companyConfig.brandName,
    alternateName: companyConfig.shortName,
    url: siteUrl,
    logo: `${siteUrl}/brand/bbs-logo.svg`,
    email: contactConfig.email,
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: companyConfig.addresses.ukraine,
        addressCountry: "UA",
      },
      {
        "@type": "PostalAddress",
        streetAddress: companyConfig.addresses.china,
        addressCountry: "CN",
      },
    ],
    contactPoint: Object.values(contactConfig.phones).map((phone) => ({
      "@type": "ContactPoint",
      telephone: phone.e164,
      contactType: "customer service",
      areaServed: phone.countryLabel.pl,
      availableLanguage: ["pl", "uk", "ru", "de", "zh-CN"],
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
