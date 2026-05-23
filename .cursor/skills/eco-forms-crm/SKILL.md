---
name: eco-forms-crm
description: Implements Eco Retreat contact forms with validation, honeypot, rate limiting, email notifications, and optional CRM handoff. Use for contact page, enquiry handling, or form security.
---

# Eco Forms & CRM

## Contact form (`/contact`)

**Fields** (adjust with user approval on labels):

- Name (required)
- Email (required)
- Phone (optional)
- Subject / intent: General, Booking question, Volunteer, Other
- Message (required)

## Server behavior

1. Validate with Zod.
2. Honeypot field `website` — reject if filled.
3. Rate limit: e.g. 5 submissions / hour / IP (Upstash Redis or in-memory dev).
4. Store in `ContactSubmission` table.
5. Send email to retreat inbox via Resend/SMTP.
6. Return generic success (no enumeration).

## Security

- Sanitize message body if displayed in admin (escape HTML).
- CSP `form-action 'self'`.
- CAPTCHA (Turnstile/hCaptcha) only if abuse detected.

## CRM (Phase 2)

- Export CSV from admin.
- Optional webhook to Google Sheet — document env `CONTACT_WEBHOOK_URL`.

## Handoff

- [ ] Labels match user-approved copy.
- [ ] Notifications tested.
- **Previous**: `eco-implementer`  
- **Next**: `eco-security-privacy`, `eco-test-qa`
