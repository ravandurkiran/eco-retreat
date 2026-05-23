import { contactContent } from "@/lib/content/pages";
import { siteConfig } from "@/lib/site";

export function OrganizationJsonLd() {
  const { name, description, url, contact } = siteConfig;
  const email = contactContent.email;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${url}/#organization`,
        name,
        description,
        url,
        telephone: contact.phone,
        email,
        address: {
          "@type": "PostalAddress",
          streetAddress: contact.address.street,
          addressLocality: contact.address.locality,
          addressRegion: contact.address.region,
          postalCode: contact.address.postalCode,
          addressCountry: contact.address.country,
        },
      },
      {
        "@type": "LodgingBusiness",
        "@id": `${url}/#lodging`,
        name,
        description,
        url,
        telephone: contact.phone,
        email,
        address: {
          "@type": "PostalAddress",
          streetAddress: contact.address.street,
          addressLocality: contact.address.locality,
          addressRegion: contact.address.region,
          postalCode: contact.address.postalCode,
          addressCountry: contact.address.country,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
