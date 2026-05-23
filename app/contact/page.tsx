import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/content/page-hero";
import { PageLayout } from "@/components/content/page-layout";
import { contactContent } from "@/lib/content/pages";
import { siteConfig, whatsAppUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact The Eco Retreat in Ravandur, Mysore — enquiries, bookings, and directions.",
};

export default function ContactPage() {
  return (
    <PageLayout>
      <PageHero kicker="Get in Touch" title="Contact" intro="Reach out for retreat details, participation, and support." compact />
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-12 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-forest">Contact information</h2>
          <ul className="mt-4 space-y-3 text-foreground/90">
            <li>
              <span className="font-medium">Email:</span>{" "}
              <a href={`mailto:${contactContent.email}`} className="text-forest underline">
                {contactContent.email}
              </a>
            </li>
            <li>
              <span className="font-medium">Phone:</span>{" "}
              <a href={`tel:${siteConfig.contact.phone}`} className="text-forest underline">
                {contactContent.phone}
              </a>
            </li>
            <li>
              <span className="font-medium">Location:</span> {contactContent.location}
            </li>
            <li>
              <a
                href={contactContent.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-forest underline"
              >
                Open in Google Maps
              </a>
            </li>
          </ul>
          <a
            href={whatsAppUrl("Hello The Eco Retreat, I would like to get in touch.")}
            className="mt-6 inline-block rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat on WhatsApp
          </a>
          <p className="mt-8 text-sm text-foreground/70">{siteConfig.name} — {siteConfig.tagline}</p>
        </div>
        <div className="rounded-2xl border border-sand bg-white p-6 shadow-sm">
          <h2 className="font-serif text-xl font-semibold text-forest">Send a message</h2>
          <div className="mt-4">
            <ContactForm />
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
