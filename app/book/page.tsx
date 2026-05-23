import type { Metadata } from "next";
import Link from "next/link";
import { BookingWizard } from "@/components/booking/booking-wizard";
import { PageHero } from "@/components/content/page-hero";
import { PageLayout } from "@/components/content/page-layout";
import { programs } from "@/lib/content/programs";
import { isRazorpayConfigured } from "@/lib/razorpay";
import { whatsAppUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book your retreat",
  description: "Check availability and book your stay at The Eco Retreat near Mysore.",
};

type Props = { searchParams: Promise<{ program?: string }> };

export default async function BookPage({ searchParams }: Props) {
  const { program: programSlug } = await searchParams;
  const bookable = programs
    .filter((p) => p.bookable)
    .map((p) => ({ slug: p.slug, label: p.label, priceInr: p.priceInr }));

  const razorpayReady = isRazorpayConfigured();

  return (
    <PageLayout>
      <PageHero
        kicker="Reservations"
        title="Book your retreat"
        intro="Choose your program, pick an available date, and pay securely with Razorpay."
        compact
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        {razorpayReady ? (
          <BookingWizard programs={bookable} initialProgramSlug={programSlug} />
        ) : (
          <div className="mx-auto max-w-lg rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center">
            <p className="text-foreground/90">
              Online payment is not configured yet. Add Razorpay test keys to <code>.env</code> (see{" "}
              <code>.env.example</code>), then restart the server.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href={whatsAppUrl("Hello The Eco Retreat, I would like to book a retreat.")}
                className="rounded-full bg-[#25D366] px-5 py-2 text-sm font-semibold text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book via WhatsApp
              </a>
              <Link href="/contact" className="rounded-full border border-forest/30 px-5 py-2 text-sm font-semibold text-forest">
                Contact form
              </Link>
            </div>
          </div>
        )}
      </section>
    </PageLayout>
  );
}
