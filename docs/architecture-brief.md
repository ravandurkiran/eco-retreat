# Eco Retreat — architecture brief (Phase 0)

## Stack

- Next.js 16 App Router, TypeScript, Tailwind CSS v4
- PostgreSQL + Prisma
- Razorpay (INR)
- Admin auth: NextAuth (Phase 3)

## Booking flow (Phase 2)

1. `GET /api/availability` — seats per program date
2. `POST /api/bookings/hold` — transactional hold (15 min TTL)
3. Razorpay Checkout with server-created order
4. `POST /api/webhooks/razorpay` — verify signature → confirm booking

## Security (Phase 0 baseline)

- Security headers + enforced CSP + HSTS (production) in `middleware.ts` via `lib/security/headers.ts`
- Secrets in `.env` only (see `.env.example`)

## Routes (Phase 0 shells)

Public: `/`, `/programs`, `/book`, `/gallery`, `/impact`, `/about/founder`, `/contact`, `/privacy`

Admin: `/admin/*` (Phase 3, noindex)

## Legacy redirects

Configured in `next.config.ts` from old `.html` paths.
