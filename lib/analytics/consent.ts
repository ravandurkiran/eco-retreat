export const ANALYTICS_CONSENT_KEY = "eco_consent_analytics";
export const CONSENT_CHANGE_EVENT = "eco-consent-change";

export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(ANALYTICS_CONSENT_KEY) === "true";
  } catch {
    return false;
  }
}

export function setAnalyticsConsent(accepted: boolean): void {
  try {
    if (accepted) {
      localStorage.setItem(ANALYTICS_CONSENT_KEY, "true");
    } else {
      localStorage.removeItem(ANALYTICS_CONSENT_KEY);
    }
  } catch {
    /* private browsing */
  }
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

export function analyticsEnabled(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER);
}
