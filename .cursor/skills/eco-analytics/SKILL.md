---
name: eco-analytics
description: Implements consent-gated analytics and conversion tracking for Eco Retreat — GA4 or Plausible, booking funnel events. Use when adding tracking, conversion measurement, or cookie banner integration.
---

# Eco Analytics

## Principles

- **No analytics before consent** (coordinate with `eco-legal-privacy`).
- **No PII** in event params (no email, phone in GA custom dimensions).
- Load scripts only after `analytics_consent === true`.

## Provider choice

| Provider | Pros |
|----------|------|
| Plausible | Privacy-friendly, simple, lightweight |
| GA4 | Rich funnels, Search Console linking |

Document choice in `.env.example` as `NEXT_PUBLIC_ANALYTICS_PROVIDER`.

## Events

| Event | When |
|-------|------|
| `page_view` | Automatic (provider default) |
| `cta_click` | Book, WhatsApp |
| `begin_checkout` | Hold created / checkout opened |
| `purchase` | Webhook confirmed booking (server-side Measurement Protocol for GA4 optional) |

## Implementation

```typescript
// lib/analytics.ts — no-op until consent
export function track(event: string, props?: Record<string, string | number>) { ... }
```

- Cookie banner sets `localStorage` or cookie `eco_consent=analytics`.
- Server Components do not import analytics scripts.

## CSP

Add analytics domains to CSP only when enabled:

- Plausible: `https://plausible.io`
- GA4: `https://www.googletagmanager.com`, `https://www.google-analytics.com`

## Handoff

- [ ] Verified no network calls before consent.
- [ ] Conversion events fire in test mode booking.
- **Previous**: `eco-legal-privacy`  
- **Next**: `eco-devops-deploy`, `eco-security-privacy`
