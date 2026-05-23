/**
 * Security headers for middleware — CSP includes Razorpay; analytics origins when configured.
 */

function analyticsScriptOrigins(): string[] {
  const provider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER;
  if (provider === "plausible") return ["https://plausible.io"];
  if (provider === "ga4") return ["https://www.googletagmanager.com"];
  return [];
}

function analyticsConnectOrigins(): string[] {
  const provider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER;
  if (provider === "plausible") return ["https://plausible.io"];
  if (provider === "ga4") {
    return ["https://www.google-analytics.com", "https://www.googletagmanager.com", "https://region1.google-analytics.com"];
  }
  return [];
}

export function buildContentSecurityPolicy(): string {
  const scriptSrc = ["'self'", "'unsafe-inline'", "https://checkout.razorpay.com", ...analyticsScriptOrigins()];
  const connectSrc = ["'self'", "https://api.razorpay.com", ...analyticsConnectOrigins()];

  return [
    "default-src 'self'",
    `script-src ${scriptSrc.join(" ")}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self'",
    `connect-src ${connectSrc.join(" ")}`,
    "frame-src 'self' https://checkout.razorpay.com https://www.youtube.com https://www.youtube-nocookie.com",
    "form-action 'self'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
  ].join("; ");
}

export function applySecurityHeaders(headers: Headers, isProduction: boolean): void {
  headers.set("X-Frame-Options", "DENY");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  headers.set("Content-Security-Policy", buildContentSecurityPolicy());

  if (isProduction) {
    headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  }
}
