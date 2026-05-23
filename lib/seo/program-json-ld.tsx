import { siteConfig } from "@/lib/site";
import type { ProgramContent } from "@/lib/content/types";

export function ProgramOfferJsonLd({ program }: { program: ProgramContent }) {
  const url = `${siteConfig.url}/programs/${program.slug}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: program.title,
    description: program.intro,
    url,
    price: program.priceInr,
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    seller: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
