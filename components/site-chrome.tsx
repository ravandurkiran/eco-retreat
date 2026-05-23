"use client";

import { AnalyticsLoader } from "@/components/consent/analytics-loader";
import { CookieBanner } from "@/components/consent/cookie-banner";

/** Client-only shell: consent banner + analytics (no server imports of trackers). */
export function SiteChrome() {
  return (
    <>
      <CookieBanner />
      <AnalyticsLoader />
    </>
  );
}
