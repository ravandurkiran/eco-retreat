import { hasAnalyticsConsent } from "./consent";

export type AnalyticsEventProps = Record<string, string | number | boolean | undefined>;

/** No-op until the user accepts analytics cookies. Never pass PII (email, phone). */
export function track(event: string, props?: AnalyticsEventProps): void {
  if (typeof window === "undefined" || !hasAnalyticsConsent()) return;

  const provider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER;
  const payload = props
    ? Object.fromEntries(Object.entries(props).filter(([, v]) => v !== undefined))
    : undefined;

  if (provider === "plausible" && typeof window.plausible === "function") {
    window.plausible(event, payload ? { props: payload as Record<string, string | number> } : undefined);
    return;
  }

  if (provider === "ga4" && typeof window.gtag === "function") {
    window.gtag("event", event, payload);
  }
}
