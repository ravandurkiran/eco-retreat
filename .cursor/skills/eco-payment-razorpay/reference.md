# Razorpay reference — Eco Retreat

## Dashboard setup

1. Create Razorpay account (test mode first).
2. Generate API keys: Settings → API Keys.
3. Add webhook URL: `https://YOUR_DOMAIN/api/webhooks/razorpay`
4. Subscribe to: `payment.captured`, `payment.failed`, `order.paid` (as needed).
5. Copy webhook secret to `RAZORPAY_WEBHOOK_SECRET`.

## Amounts

- Always integer **paise** (₹100 = `10000`).
- Pass `receipt` linking to internal `bookingHoldId`.

## Test mode

- Use test API keys in `.env.local`.
- Razorpay test cards: see [Razorpay docs](https://razorpay.com/docs/payments/payments/test-card-details/).

## Signature verification (Node)

```typescript
import crypto from "crypto";

function verifyWebhookSignature(body: string, signature: string, secret: string) {
  const expected = crypto.createHmac("sha256", secret).update(body).digest("hex");
  return expected === signature;
}
```

## CSP domains (checkout)

Allow in CSP when enforcing:

- `https://checkout.razorpay.com`
- `https://api.razorpay.com`

## Refunds (Phase 2)

- Document policy on `/terms` and program pages.
- Admin-initiated refund via Razorpay API server-side only.
- Update `Booking.status` to `REFUNDED`.

## Go-live checklist

- [ ] Switch to live keys in production env only
- [ ] Webhook URL HTTPS
- [ ] `eco-security-reviewer` completed
