# Production deployment

Eco Retreat is a full-stack Next.js app (PostgreSQL, Razorpay, admin auth). **Static FTP-only hosting is not suitable.**

## Pre-deploy checklist

- [ ] All [QUALITY_GATES.md](../.cursor/skills/QUALITY_GATES.md) Phase 4 items reviewed
- [ ] `npm run lint` and `npm run build` pass in CI
- [ ] Privacy policy published in admin (`/admin/legal/privacy`)
- [ ] `NEXT_PUBLIC_SITE_URL` set to production domain (HTTPS)
- [ ] `NEXTAUTH_SECRET` rotated; `NEXTAUTH_URL` matches production
- [ ] PostgreSQL provisioned; run `npx prisma migrate deploy` (or `db push` for first deploy)
- [ ] `npm run db:seed` on staging only — use admin UI for production data
- [ ] Razorpay **live** keys in production env only
- [ ] Webhook: `https://YOUR_DOMAIN/api/webhooks/razorpay` with `payment.captured` and `payment.failed`
- [ ] Analytics: set `NEXT_PUBLIC_ANALYTICS_PROVIDER` and consent banner tested

## Environment variables

Copy from [.env.example](../.env.example). Never commit `.env`.

| Variable | Required | Notes |
|----------|----------|--------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `NEXT_PUBLIC_SITE_URL` | Yes | `https://the-eco-retreat.com` |
| `NEXTAUTH_SECRET` | Yes | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Yes | Same as public URL |
| `RAZORPAY_*` | Yes | Live keys in production |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Seed only | Create admin via seed or first login |
| `NEXT_PUBLIC_ANALYTICS_PROVIDER` | Optional | `plausible` or `ga4` |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | If Plausible | Your domain |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | If GA4 | `G-XXXXXXXX` |

## Hosting options

| Target | Notes |
|--------|--------|
| **Vercel** | Simplest for Next.js; use Neon/Supabase for Postgres |
| **VPS** (Hostinger, etc.) | Node 20 + PM2 + Nginx reverse proxy; you manage SSL and Postgres |

### VPS quick outline

1. Install Node 20, PostgreSQL, Nginx.
2. Clone repo, `npm ci`, set `.env`, `npx prisma migrate deploy`, `npm run build`.
3. `pm2 start npm --name eco-retreat -- start`
4. Nginx `proxy_pass` to `127.0.0.1:3000`, TLS via Certbot.
5. Ensure HSTS is sent (middleware sets `Strict-Transport-Security` in production).

## Post-deploy smoke test

1. Home, `/programs/7-day`, `/book`, `/contact` return 200.
2. `/admin` redirects to login when logged out.
3. Legacy URLs 301 (see `next.config.ts` redirects).
4. Test Razorpay live payment (small amount; refund after).
5. Confirm webhook delivery in Razorpay dashboard.
6. Submit `https://YOUR_DOMAIN/sitemap.xml` in [Google Search Console](https://search.google.com/search-console).

## Rollback

- **Vercel**: promote previous deployment in dashboard.
- **VPS**: keep previous build folder or Docker tag; restore DB from backup before destructive migrations.

## Dependency updates

Pin major versions in `package.json`. Run `npm audit` before release; fix critical issues. See [dependencies.md](./dependencies.md).
