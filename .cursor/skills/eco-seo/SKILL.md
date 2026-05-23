---
name: eco-seo
description: Optimizes technical and on-page SEO for Eco Retreat Next.js site — metadata, canonicals, Open Graph, JSON-LD, sitemap, robots, and 301 redirects. Use for SEO audits, structured data, or Search Console prep.
---

# Eco SEO

## Scope

- **In scope**: `generateMetadata`, `app/sitemap.ts`, `app/robots.ts`, JSON-LD components, redirects, heading audit, `alt` text, internal links.
- **Out of scope**: Rewriting migrated body copy; fake reviews/schema.

## Per-route checklist

- [ ] Unique `<title>` (50–60 chars)
- [ ] Meta description (~150–155 chars) from existing intro, not invented claims
- [ ] `alternates.canonical` absolute URL
- [ ] Open Graph + Twitter card
- [ ] One H1; logical H2–H3

## Structured data (`lib/seo/json-ld.tsx`)

| Page | Schema |
|------|--------|
| Home | `Organization`, `LodgingBusiness` or `LocalBusiness` |
| Contact | Address, `telephone` matching NAP |
| Program | `Event` or `Offer` with price, dates |
| Blog post | `BlogPosting` |

## Technical

- `metadataBase` in root layout from `NEXT_PUBLIC_SITE_URL`
- `robots.ts`: disallow `/admin`, `/api`
- Dynamic sitemap: programs, blog, static pages
- 301 redirects: see [CONVENTIONS.md](../CONVENTIONS.md)

## Advanced audit

If available, invoke personal skill `seo-advanced-review` before launch.

## Workflow

1. Run after each phase per [QUALITY_GATES.md](../QUALITY_GATES.md).
2. Output SEO matrix CSV or markdown table per URL.
3. Validate with Google Rich Results Test (manual).

## Handoff

- [ ] No duplicate titles; sitemap validates.
- **Previous**: `eco-implementer`, `eco-content-migration`  
- **Next**: `eco-accessibility`, `eco-performance`, `eco-devops-deploy`
