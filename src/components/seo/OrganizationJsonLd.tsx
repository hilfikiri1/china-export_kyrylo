import { company } from "@/config/company";
import { allPhones, contactEmail } from "@/config/contacts";
import { siteUrl, seo } from "@/config/seo";

const areaByRegion: Record<string, string> = {
  pl: "PL",
  ua: "UA",
  cn: "CN",
};

/**
 * Organization + ContactPoint structured data.
 * No AggregateRating / review markup is emitted (unverified).
 */
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    alternateName: company.shortName,
    url: siteUrl,
    logo: `${siteUrl}${seo.ogImage}`,
    email: contactEmail,
    description: company.descriptorPl,
    contactPoint: allPhones.map((phone) => ({
      "@type": "ContactPoint",
      telephone: phone.tel,
      email: contactEmail,
      contactType: "sales",
      areaServed: areaByRegion[phone.region],
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
