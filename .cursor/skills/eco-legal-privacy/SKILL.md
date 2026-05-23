---
name: eco-legal-privacy
description: Drafts and implements Eco Retreat privacy policy, terms, cookie consent, and cancellation policy pages with version tracking. Use for legal pages, GDPR/DPDP-aware templates, or cookie banner — not legal advice.
---

# Eco Legal & Privacy

## Disclaimer

Generated text is a **template only**. User must have a qualified lawyer review before production, especially for India DPDP 2023 and Razorpay data processing.

## Pages

| Route | Content |
|-------|---------|
| `/privacy` | Data collected, Razorpay processor, cookies, retention, contact |
| `/terms` | Booking terms, cancellation, liability limits |
| `/faq` | Practical guest info (link from programs) |

## Privacy policy must mention

- Identity: The Eco Retreat / Anahata Healing Arts Center, Ravandur address
- Data: name, email, phone, booking details, payment via Razorpay (no card storage on site)
- Purpose: bookings, contact replies, analytics (if consented)
- Retention periods
- User rights and contact email
- `lastUpdated` date in footer

## Cookie banner

- Essential cookies only until consent.
- Block `eco-analytics` scripts until accept.
- Link to `/privacy#cookies`.

## Admin

- `PrivacyPolicyVersion` model: `content`, `publishedAt`, `version`.
- Public page renders latest published version.

## Workflow

1. Generate draft markdown from template.
2. Implement page + footer links.
3. Wire cookie banner component.
4. Flag “LAWYER REVIEW REQUIRED” in PR description.

## Handoff

- [ ] Cookie banner blocks analytics pre-consent.
- [ ] Policy linked from footer and checkout.
- **Previous**: `eco-implementer`  
- **Next**: `eco-security-privacy`, `eco-test-qa`
