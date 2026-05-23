"use client";

import Script from "next/script";
import { useCallback, useEffect, useMemo, useState } from "react";
import { track } from "@/lib/analytics/track";

type BookableProgram = {
  slug: string;
  label: string;
  priceInr?: number;
};

type DateOption = {
  id: string;
  startDate: string;
  endDate: string | null;
  available: number;
  capacity: number;
  priceInr: number;
};

export function BookingWizard({
  programs,
  initialProgramSlug,
}: {
  programs: BookableProgram[];
  initialProgramSlug?: string;
}) {
  const [programSlug, setProgramSlug] = useState(initialProgramSlug ?? programs[0]?.slug ?? "");
  const [dates, setDates] = useState<DateOption[]>([]);
  const [selectedDateId, setSelectedDateId] = useState("");
  const [seats, setSeats] = useState(1);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [loadingDates, setLoadingDates] = useState(false);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");
  const [razorpayReady, setRazorpayReady] = useState(false);

  const selectedDate = useMemo(() => dates.find((d) => d.id === selectedDateId), [dates, selectedDateId]);
  const selectedProgram = useMemo(
    () => programs.find((p) => p.slug === programSlug),
    [programs, programSlug],
  );

  const loadDates = useCallback(async (slug: string) => {
    setLoadingDates(true);
    setError("");
    setSelectedDateId("");
    try {
      const res = await fetch(`/api/availability?programSlug=${encodeURIComponent(slug)}`);
      const json = (await res.json()) as { dates?: DateOption[]; error?: string };
      if (!res.ok) throw new Error(json.error ?? "Could not load dates");
      setDates(json.dates ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load availability");
      setDates([]);
    } finally {
      setLoadingDates(false);
    }
  }, []);

  useEffect(() => {
    if (!programSlug) return;
    const timer = window.setTimeout(() => void loadDates(programSlug), 0);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function startPayment() {
    if (!selectedDateId || !guestName || !guestEmail) {
      setError("Please complete all fields and select a date.");
      return;
    }
    if (!razorpayReady || !window.Razorpay) {
      setError("Payment system is loading. Please try again.");
      return;
    }

    setPaying(true);
    setError("");

    try {
      const res = await fetch("/api/bookings/hold", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          programDateId: selectedDateId,
          guestName,
          guestEmail,
          seats,
        }),
      });
      const data = (await res.json()) as {
        error?: string;
        orderId?: string;
        amount?: number;
        keyId?: string;
        holdId?: string;
        programTitle?: string;
      };

      if (!res.ok || !data.orderId || !data.amount || !data.keyId || !data.holdId) {
        throw new Error(data.error ?? "Could not start checkout");
      }

      track("begin_checkout", {
        program_slug: programSlug,
        value: data.amount / 100,
        currency: "INR",
        seats,
      });

      const rzp = new window.Razorpay({
        key: data.keyId,
        amount: data.amount,
        currency: "INR",
        name: "The Eco Retreat",
        description: data.programTitle ?? "Retreat booking",
        order_id: data.orderId,
        prefill: { name: guestName, email: guestEmail },
        theme: { color: "#2d4a3e" },
        handler: () => {
          window.location.href = `/book/success?hold=${encodeURIComponent(data.holdId!)}`;
        },
        modal: {
          ondismiss: () => setPaying(false),
        },
      });
      rzp.open();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Payment failed to start");
      setPaying(false);
    }
  }

  const totalInr = selectedDate ? selectedDate.priceInr * seats : selectedProgram?.priceInr;

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" onReady={() => setRazorpayReady(true)} />

      <div className="mx-auto max-w-lg rounded-2xl border border-sand bg-white p-6 shadow-sm text-left">
        <div className="space-y-4">
          <div>
            <label htmlFor="program" className="mb-1 block text-sm font-medium">
              Program
            </label>
            <select
              id="program"
              value={programSlug}
              onChange={(e) => {
                const slug = e.target.value;
                setProgramSlug(slug);
                void loadDates(slug);
              }}
              className="w-full rounded-lg border border-sand px-3 py-2"
            >
              {programs.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.label}
                  {p.priceInr ? ` — ₹${p.priceInr.toLocaleString("en-IN")}` : ""}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="date" className="mb-1 block text-sm font-medium">
              Start date
            </label>
            {loadingDates ? (
              <p className="text-sm text-foreground/70">Loading available dates…</p>
            ) : dates.length === 0 ? (
              <p className="text-sm text-foreground/70">
                No dates available. Run <code className="text-xs">npm run db:push && npm run db:seed</code> if
                setting up locally.
              </p>
            ) : (
              <select
                id="date"
                value={selectedDateId}
                onChange={(e) => setSelectedDateId(e.target.value)}
                className="w-full rounded-lg border border-sand px-3 py-2"
              >
                <option value="">Select a date</option>
                {dates.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.startDate}
                    {d.endDate ? ` → ${d.endDate}` : ""} ({d.available} seats left)
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label htmlFor="seats" className="mb-1 block text-sm font-medium">
              Guests
            </label>
            <input
              id="seats"
              type="number"
              min={1}
              max={Math.min(4, selectedDate?.available ?? 4)}
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
              className="w-full rounded-lg border border-sand px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="guestName" className="mb-1 block text-sm font-medium">
              Full name
            </label>
            <input
              id="guestName"
              required
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full rounded-lg border border-sand px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="guestEmail" className="mb-1 block text-sm font-medium">
              Email
            </label>
            <input
              id="guestEmail"
              type="email"
              required
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              className="w-full rounded-lg border border-sand px-3 py-2"
            />
          </div>

          {totalInr ? (
            <p className="rounded-lg bg-sand/40 px-3 py-2 text-sm font-medium text-earth">
              Total: ₹{(totalInr * seats).toLocaleString("en-IN")} (secure payment via Razorpay)
            </p>
          ) : null}

          {error ? (
            <p className="text-sm text-red-700" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="button"
            onClick={startPayment}
            disabled={paying || !selectedDateId || dates.length === 0}
            className="w-full rounded-full bg-forest py-3 text-sm font-semibold text-cream disabled:opacity-50"
          >
            {paying ? "Opening secure checkout…" : "Pay with Razorpay"}
          </button>

          <p className="text-xs text-foreground/60">
            Test mode: use Razorpay test keys. Booking confirms after payment webhook (use Razorpay dashboard
            webhook relay or deploy URL for production).
          </p>
        </div>
      </div>
    </>
  );
}
