---
name: eco-booking-availability
description: Designs and implements retreat booking availability, capacity limits, timed holds, and anti-overbooking transactions for Eco Retreat. Use for ProgramDate capacity, hold TTL, availability API, or booking race conditions.
---

# Eco Booking & Availability

## Data model (Prisma)

```prisma
model Program { id, slug, title, description, pricePaise, ... }
model ProgramDate { id, programId, startDate, endDate, capacity, ... }
model BookingHold { id, programDateId, guestEmail, seats, expiresAt, razorpayOrderId? }
model Booking { id, programDateId, holdId, status, paymentId, seats, ... }
```

## Core rules

1. **Available seats** = `capacity - SUM(confirmed.seats) - SUM(active_holds.seats)` where `expiresAt > now()` or status active.
2. **Hold TTL**: 15 minutes default; cron or scheduled job releases expired holds.
3. **Confirm** only inside Razorpay webhook handler after signature verification — never from client callback alone.
4. Use **Serializable** or `SELECT FOR UPDATE` transaction when creating hold.

## API routes

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/availability?programSlug=&month=` | Calendar grid of available dates |
| POST | `/api/bookings/hold` | Create hold; return order payload for Razorpay |
| POST | `/api/webhooks/razorpay` | Confirm/cancel (see `eco-payment-razorpay`) |

## Workflow

1. Read architect brief and [CONVENTIONS.md](../CONVENTIONS.md).
2. Implement Prisma models + migration.
3. Implement availability query with efficient indexes on `programDateId`, `startDate`.
4. Add integration test: N concurrent holds on last seat → only one succeeds.
5. Admin sets capacity via `eco-admin-panel`.

## Handoff

- [ ] Overbooking integration test passes.
- [ ] Hold expiry documented for ops.
- **Previous**: `eco-content-migration` or `eco-implementer`  
- **Next**: `eco-payment-razorpay`, `eco-test-qa`
