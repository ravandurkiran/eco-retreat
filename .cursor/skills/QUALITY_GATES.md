# Eco Retreat — quality gates

Run the relevant checklist after each implementation phase. **Block the next phase** if any critical item fails.

## Phase 0 — Bootstrap

### SEO (smoke)
- [ ] `app/layout.tsx` exports root `metadata` (title template, description, `metadataBase`)
- [ ] `app/sitemap.ts` and `app/robots.ts` exist
- [ ] `.env.example` documents public vs secret vars

### Performance (smoke)
- [ ] `next/font` configured; no external Google Fonts `<link>` in layout
- [ ] Default `next/image` remote patterns documented if using CDN

### Security (smoke)
- [ ] No secrets in `NEXT_PUBLIC_*` except Razorpay key_id and site URL
- [ ] `middleware.ts` sets baseline security headers (or `next.config` headers)
- [ ] CSP draft in report-only mode documented

---

## Phase 1 — Public marketing site

### SEO
- [ ] Unique `title` + `description` on `/`, `/programs`, `/programs/[slug]`, `/contact`, `/gallery`, `/about/founder`, `/impact`, `/privacy`
- [ ] Canonical URLs absolute and correct
- [ ] Open Graph tags on shareable pages
- [ ] JSON-LD `Organization` + `LodgingBusiness` on home
- [ ] `sitemap.xml` includes all public routes; excludes `/admin`, `/api`
- [ ] 301 redirects from legacy `.html` paths configured
- [ ] One H1 per page; logical heading order
- [ ] All images have descriptive `alt` (including placeholders)

### Performance
- [ ] Lighthouse Performance ≥ **85** (mobile) on `/` and one `/programs/*` page
- [ ] LCP element uses `priority` + explicit dimensions
- [ ] Gallery below fold uses lazy loading
- [ ] No render-blocking third-party scripts on home

### Security
- [ ] Contact form: Zod validation, honeypot, rate limit
- [ ] CSP report-only reviewed; no critical violations on marketing pages
- [ ] External links to WhatsApp/maps use `https://` only
- [ ] No user input reflected without escaping

---

## Phase 2 — Booking + Razorpay

### SEO
- [ ] Program pages include `Event` or `Offer` JSON-LD where applicable
- [ ] Booking confirmation/thank-you: `noindex` if thin content

### Performance
- [ ] Booking UI does not block LCP on program pages (load client bundle only on `/book` or inline picker)
- [ ] API `/api/availability` responds < 500ms p95 under normal load

### Security
- [ ] `RAZORPAY_KEY_SECRET` never in client bundle (`grep .next` after build)
- [ ] Webhook verifies `X-Razorpay-Signature` with `RAZORPAY_WEBHOOK_SECRET`
- [ ] Idempotency table prevents duplicate confirmations
- [ ] Booking hold expires; cannot confirm without `payment.captured`
- [ ] `@eco-security-reviewer` sign-off documented before live keys

### Functional
- [ ] Concurrent hold test: capacity not exceeded
- [ ] Failed payment releases hold

---

## Phase 3 — Admin

### SEO
- [ ] All `/admin/*` routes: `robots: noindex, nofollow`
- [ ] Admin excluded from sitemap

### Security
- [ ] Auth middleware on all admin routes and mutating APIs
- [ ] RBAC: only admin role can change capacity/pricing
- [ ] Session cookies: `httpOnly`, `secure`, `sameSite`
- [ ] File upload: type whitelist, max size, no SVG script uploads
- [ ] Failed login rate limit

---

## Phase 4 — Launch

### SEO
- [ ] Full route audit: no duplicate titles/descriptions
- [ ] `sitemap.xml` validates (Google Search Console)
- [ ] NAP on contact matches Google Business Profile
- [ ] Optional: `seo-advanced-review` personal skill run

### Performance
- [ ] Lighthouse Performance ≥ 85 on `/`, `/programs/*`, `/book`
- [ ] Bundle analyzer: no accidental large client deps on marketing pages

### Security
- [ ] CSP enforced (not report-only)
- [ ] HSTS enabled in production
- [ ] `npm audit` — no critical unfixed vulnerabilities
- [ ] Privacy policy published; cookie consent before analytics
- [ ] Dependency pins documented

### Accessibility
- [ ] WCAG 2.1 AA spot-check: keyboard nav, focus visible, form labels, contrast

### Analytics
- [ ] Analytics loads only after consent
- [ ] Conversion events: `begin_checkout`, `purchase` (or equivalent)

---

## Sign-off

| Role | Agent / skill | Date | Pass |
|------|---------------|------|------|
| SEO + perf + headers | `eco-seo-perf-guardian` | | |
| Payments security | `eco-security-reviewer` | | |
| Full QA | `eco-test-qa` | | |
