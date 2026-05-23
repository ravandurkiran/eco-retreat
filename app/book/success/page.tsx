import type { Metadata } from "next";
import { BookingSuccess } from "@/components/booking/booking-success";
import { PageLayout } from "@/components/content/page-layout";

export const metadata: Metadata = {
  title: "Booking confirmation",
  description: "Your Eco Retreat booking status",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ hold?: string }> };

export default async function BookSuccessPage({ searchParams }: Props) {
  const { hold } = await searchParams;

  return (
    <PageLayout>
      <main className="mx-auto max-w-6xl px-4 py-16">
        {hold ? (
          <BookingSuccess holdId={hold} />
        ) : (
          <p className="text-center text-foreground/80">Missing booking reference.</p>
        )}
      </main>
    </PageLayout>
  );
}
