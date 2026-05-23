"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics/track";

export function BookingSuccess({ holdId }: { holdId: string }) {
  const [status, setStatus] = useState<"loading" | "confirmed" | "pending" | "error">("loading");
  const [details, setDetails] = useState<{
    programTitle?: string;
    startDate?: string;
    seats?: number;
    guestEmail?: string;
  }>({});
  const purchaseTracked = useRef(false);

  useEffect(() => {
    let attempts = 0;
    const poll = async () => {
      attempts += 1;
      try {
        if (process.env.NODE_ENV === "development" && attempts === 1) {
          await fetch("/api/bookings/simulate-capture", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ holdId }),
          }).catch(() => undefined);
        }
        const res = await fetch(`/api/bookings/status?holdId=${encodeURIComponent(holdId)}`);
        const json = (await res.json()) as {
          confirmed?: boolean;
          status?: string;
          programTitle?: string;
          startDate?: string;
          seats?: number;
          guestEmail?: string;
          error?: string;
        };
        if (!res.ok) throw new Error(json.error);
        setDetails(json);
        if (json.confirmed) {
          setStatus("confirmed");
          if (!purchaseTracked.current) {
            purchaseTracked.current = true;
            track("purchase", {
              program: json.programTitle ?? "retreat",
              seats: json.seats ?? 1,
              currency: "INR",
            });
          }
          return;
        }
        if (attempts < 12) {
          setStatus("pending");
          setTimeout(poll, 2500);
        } else {
          setStatus("pending");
        }
      } catch {
        setStatus("error");
      }
    };
    poll();
  }, [holdId]);

  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-sand bg-white p-8 text-center shadow-sm">
      {status === "loading" || status === "pending" ? (
        <>
          <h1 className="font-serif text-2xl font-semibold text-forest">Payment received</h1>
          <p className="mt-4 text-foreground/80">
            {status === "loading"
              ? "Confirming your booking…"
              : "We are waiting for payment confirmation. This usually takes a few seconds."}
          </p>
          <p className="mt-2 text-sm text-foreground/60">Reference: {holdId}</p>
        </>
      ) : null}

      {status === "confirmed" ? (
        <>
          <h1 className="font-serif text-2xl font-semibold text-forest">Booking confirmed</h1>
          <p className="mt-4 text-foreground/80">
            Thank you! Your place is reserved for <strong>{details.programTitle}</strong> starting{" "}
            <strong>{details.startDate}</strong> ({details.seats} guest{details.seats === 1 ? "" : "s"}).
          </p>
          <p className="mt-2 text-sm text-foreground/70">Confirmation sent to {details.guestEmail}</p>
          <Link href="/" className="mt-8 inline-block rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream">
            Back to home
          </Link>
        </>
      ) : null}

      {status === "error" ? (
        <>
          <h1 className="font-serif text-2xl font-semibold text-forest">Check your email</h1>
          <p className="mt-4 text-foreground/80">
            Payment may have succeeded but confirmation is delayed. Please contact us with reference{" "}
            <strong>{holdId}</strong>.
          </p>
          <Link href="/contact" className="mt-6 inline-block text-forest underline">
            Contact us
          </Link>
        </>
      ) : null}
    </div>
  );
}
