# Eco Retreat — agent conventions

Shared rules for all `eco-*` project skills in this repository.

## Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 App Router |
| Language | TypeScript |
| Styling | Tailwind CSS + design tokens in `app/globals.css` |
| Database | PostgreSQL + Prisma |
| Payments | Razorpay (INR, paise) |
| Admin auth | NextAuth or Clerk (document choice in architect brief) |

## Content rules

- **Prefer migration** from `../the-eco-retreat-old/` (`app.js` `PAGES`, HTML files) and live [the-eco-retreat.com](https://the-eco-retreat.com).
- **Do not rewrite** migrated marketing paragraphs without explicit user approval.
- **Charity content**: Curate from [anahata-trust.org](https://anahata-trust.org); link out; do not copy entire pages.
- **Legal copy**: Templates only; flag “lawyer review required” for privacy/terms.

## Repo anchors (after scaffold)

| Concern | Location |
|---------|----------|
| Public routes | `app/(public)/` |
| Admin | `app/admin/` |
| API | `app/api/` |
| Components | `components/` |
| DB schema | `prisma/schema.prisma` |
| Razorpay | `lib/razorpay.ts`, `app/api/webhooks/razorpay/route.ts` |
| SEO | `app/sitemap.ts`, `app/robots.ts`, `lib/seo/` |
| Security headers | `middleware.ts` |
| Placeholders | `public/images/placeholders/` |
| Env template | `.env.example` |

## Public routes (MVP)

| Path | Purpose |
|------|---------|
| `/` | Home + primary Book CTA |
| `/programs`, `/programs/[slug]` | Retreat programs |
| `/book` | Booking funnel |
| `/gallery` | Photo gallery |
| `/about/founder` | Founder bio |
| `/impact` | Karunashraya / Shanthidhama + Anahata links |
| `/contact` | Form, map, WhatsApp |
| `/privacy`, `/terms`, `/faq` | Legal / help |
| `/blog`, `/blog/[slug]` | News (Phase 2+) |
| `/admin/*` | **noindex**, auth required |

## Legacy URL redirects (301)

Map old static paths to new routes in `next.config.ts` or middleware:

| Old | New |
|-----|-----|
| `/7-day-program.html` | `/programs/7-day` |
| `/weekend-program.html` | `/programs/weekend` |
| `/stay-with-us.html` | `/programs/stay-with-us` |
| `/contact.html` | `/contact` |
| `/vision-and-history.html` | `/about/founder` or dedicated page |
| (others) | Document in `eco-content-migration` |

## Secrets (never commit)

```
DATABASE_URL=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
NEXTAUTH_SECRET=
EMAIL_API_KEY=
```

Client bundle may only expose `NEXT_PUBLIC_RAZORPAY_KEY_ID`, `NEXT_PUBLIC_SITE_URL`.

## Theme

- Natural eco retreat: forest greens, earth browns, warm cream, soft shadows.
- Typography: one serif (headings) + one sans (body) via `next/font`.
- Mobile: sticky **Book now** CTA; WhatsApp floating action button.
- Photography-forward layouts; placeholders until admin upload.

## Quality gates

No phase is complete until the relevant section of [QUALITY_GATES.md](./QUALITY_GATES.md) passes.

## Handoff artifact

Each skill ends with **Handoff**: checklist + **Previous** / **Next** skill names.
