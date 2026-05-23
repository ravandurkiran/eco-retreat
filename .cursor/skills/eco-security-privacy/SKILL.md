---
name: eco-security-privacy
description: Audits Eco Retreat security — CSP, security headers, Razorpay webhooks, admin auth, form abuse, dependency vulnerabilities, and privacy alignment. Use before deploy or when adding APIs, analytics, or payments.
---

# Eco Security & Privacy

## Scope

- **In scope**: `middleware.ts` headers, CSP (report-only → enforce), secret scanning, Razorpay webhook review, admin auth, rate limits, `npm audit`, cookie consent alignment.
- **Out of scope**: Writing final legal policy text (`eco-legal-privacy`).

## Security headers (production)

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Content-Security-Policy: ... (see below)
```

## CSP (staged)

**Phase 1 — report-only** via `Content-Security-Policy-Report-Only`.

**Phase 4 — enforce** after zero critical violations.

Example directives:

- `default-src 'self'`
- `script-src 'self' 'nonce-{NONCE}' https://checkout.razorpay.com`
- `frame-src 'self' https://checkout.razorpay.com https://www.youtube.com https://www.google.com`
- `img-src 'self' data: https: blob:`
- `connect-src 'self' https://api.razorpay.com`
- `form-action 'self'`

Use Next.js nonce support for inline scripts if required.

## Razorpay audit

- [ ] Webhook signature verified on raw body
- [ ] Idempotency table
- [ ] No `key_secret` in client or logs
- [ ] Order amount matches server-side hold

## Admin audit

- [ ] All `/admin` routes protected
- [ ] Upload validation
- [ ] Session fixation mitigated (regenerate on login)

## Workflow

1. `grep -r` for `KEY_SECRET`, `password`, hardcoded tokens.
2. Run `npm audit`; document accepted risks.
3. Review [QUALITY_GATES.md](../QUALITY_GATES.md) for current phase.
4. Coordinate CSP origins with `eco-social-embeds`, `eco-payment-razorpay`, `eco-analytics`.

## Handoff

- [ ] Audit report with Critical / High / Medium.
- [ ] Delegate Critical fixes to `eco-implementer` or `eco-booking-engineer`.
- **Previous**: `eco-performance`, `eco-payment-razorpay`  
- **Next**: `eco-test-qa`, `eco-devops-deploy`, `eco-security-reviewer` agent
