/** Public site configuration — safe for client import */
export const siteConfig = {
  name: "The Eco Retreat",
  tagline: "Anahata Healing Arts Center",
  description:
    "A natural healing retreat near Mysore in Ravandur — yoga, nature, and simple living for inner peace and renewal.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_IN",
  contact: {
    phone: "+918197799572",
    whatsapp: "918197799572",
    address: {
      street: "No. 74/75/2, Ravandur",
      locality: "Periyapatna Taluk, Mysore District",
      region: "Karnataka",
      postalCode: "571108",
      country: "IN",
    },
  },
} as const;

export function whatsAppUrl(text: string) {
  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(text)}`;
}
