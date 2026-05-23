interface Window {
  plausible?: (event: string, options?: { props?: Record<string, string | number> }) => void;
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
}
