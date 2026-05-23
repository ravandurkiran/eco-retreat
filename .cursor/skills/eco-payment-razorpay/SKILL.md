---
name: eco-payment-razorpay
description: Integrates Razorpay Orders and Checkout with server-only secrets, webhook HMAC verification, and idempotent booking confirmation for Eco Retreat. Use for payment flows, refunds documentation, or PCI-safe checkout.
---

# Eco Payment — Razorpay

## Scope

- **In scope**: Server-side order creation, Checkout.js or hosted flow, webhook handler, idempotency, env docs, test mode verification.
- **Out of scope**: Storing card numbers; trusting client-side payment success.

## Environment

| Variable | Where |
|----------|--------|
| `RAZORPAY_KEY_ID` | Server + `NEXT_PUBLIC_RAZORPAY_KEY_ID` for Checkout |
| `RAZORPAY_KEY_SECRET` | Server only |
| `RAZORPAY_WEBHOOK_SECRET` | Webhook route only |

## Flow

1. Client requests hold via `eco-booking-availability`.
2. Server creates Razorpay Order (amount in **paise**, currency `INR`).
3. Client opens Checkout with `order_id`, `key_id`.
4. Webhook `payment.captured` → verify signature → confirm booking → email guest.
5. `payment.failed` → release hold.

## Webhook handler (`app/api/webhooks/razorpay/route.ts`)

- Verify `X-Razorpay-Signature` using `RAZORPAY_WEBHOOK_SECRET`.
- Upsert `WebhookEvent` by `event.id` for idempotency.
- Map `order_id` → `BookingHold` → create `Booking` status `CONFIRMED`.

## Security checklist

- [ ] Secret never in client bundle
- [ ] Webhook raw body used for signature (not re-parsed JSON)
- [ ] Rate limit order creation per IP/email
- [ ] Log payment IDs, not full PII

## Reference

See [reference.md](./reference.md) for test cards, dashboard setup, refund notes.

## Handoff

- [ ] Test mode flow documented.
- [ ] `eco-security-reviewer` sign-off before live keys.
- **Previous**: `eco-booking-availability`  
- **Next**: `eco-test-qa`, `eco-security-privacy`
