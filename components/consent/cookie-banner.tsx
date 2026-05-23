"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { analyticsEnabled, hasAnalyticsConsent, setAnalyticsConsent } from "@/lib/analytics/consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!analyticsEnabled()) return;
    const timer = window.setTimeout(() => {
      if (!hasAnalyticsConsent()) setVisible(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-sand bg-cream/98 p-4 shadow-lg backdrop-blur sm:p-6"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-foreground/85">
          <p id="cookie-banner-title" className="font-medium text-forest">
            Cookies & analytics
          </p>
          <p className="mt-1">
            We use essential cookies for the site and optional analytics to improve the experience — only if you
            accept. See our{" "}
            <Link href="/privacy#cookies" className="text-forest underline">
              privacy policy
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setAnalyticsConsent(false);
              setVisible(false);
            }}
            className="rounded-full border border-sand px-4 py-2 text-sm font-medium text-foreground/80 hover:bg-sand/50"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={() => {
              setAnalyticsConsent(true);
              setVisible(false);
            }}
            className="rounded-full bg-forest px-4 py-2 text-sm font-semibold text-cream hover:bg-forest/90"
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
}
