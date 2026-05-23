---
name: eco-devops-deploy
description: Deploys Eco Retreat Next.js app to production with env secrets, database migrations, HTTPS, cache headers, and Search Console sitemap submission. Use for Vercel, VPS, or Hostinger Node hosting setup.
---

# Eco DevOps & Deploy

## Hosting options

| Target | Notes |
|--------|--------|
| **Vercel** | Easiest for Next.js; managed SSL; connect Postgres (Neon/Supabase) |
| **VPS** (Hostinger, etc.) | Node + PM2 + Nginx reverse proxy; full control |
| **Shared FTP only** | **Not suitable** for this full-stack app |

## Pre-deploy checklist

- [ ] Phase merged via `eco-github-release` (PR to `main`, `release:*` label documented)
- [ ] `prisma migrate deploy` on production DB
- [ ] All env vars set in host dashboard (never in git)
- [ ] Razorpay **live** keys only in production
- [ ] Webhook URL points to production domain
- [ ] `NEXT_PUBLIC_SITE_URL` correct

## Production config

- Force HTTPS redirect.
- Enable HSTS (see `eco-security-privacy`).
- Cache static assets `immutable`; short cache for HTML or use ISR.
- Run `npm run build` in CI; fail on TypeScript errors.

## Post-deploy

1. Smoke test MVP routes.
2. Submit `https://DOMAIN/sitemap.xml` to Google Search Console.
3. Test Razorpay live payment small amount (refund after).
4. Verify webhook delivery in Razorpay dashboard.

## CI pipeline (recommended)

```
install → lint → typecheck → test → build → (optional) lighthouse
```

## Rollback

- Document previous deployment ID (Vercel) or Docker image tag (VPS).
- DB migrations: forward-only; backup before migrate.

## Handoff

- [ ] Deploy log with URL and date.
- [ ] Env checklist completed.
- **Previous**: `eco-test-qa`, `eco-analytics`  
- **Next**: `eco-orchestrator`, `eco-seo-perf-guardian` agent
