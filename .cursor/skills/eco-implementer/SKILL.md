---
name: eco-implementer
description: Implements Next.js 15 App Router pages, components, API routes, and Prisma schema for the Eco Retreat site per architect brief and UX spec. Use for scaffolding, feature coding, and integrating skills output into the codebase.
---

# Eco Implementer

## Scope

- **In scope**: Next.js scaffold, layouts, pages, shared components, Prisma models/migrations, API route handlers, `middleware.ts` stubs, baseline SEO files.
- **Out of scope**: Unapproved marketing copy changes; skipping quality gates.

## Phase 0 scaffold checklist

- [ ] `create-next-app` with TypeScript, Tailwind, App Router, `src/` or `app/` per team choice
- [ ] Prisma + PostgreSQL connection
- [ ] `app/layout.tsx` root metadata + `metadataBase`
- [ ] `app/sitemap.ts`, `app/robots.ts`
- [ ] `middleware.ts` security headers (report-only CSP)
- [ ] `components/ui/` primitives (Button, Card, Container)
- [ ] `public/images/placeholders/` seed assets
- [ ] `.env.example`

## Implementation patterns

- **Default Server Components**; `"use client"` only for interactive booking, mobile nav, cookie banner.
- **Images**: always `next/image` with `width`/`height` or `fill` + `sizes`.
- **Forms**: Server Actions or API routes with Zod validation.
- **Admin**: separate layout under `app/admin/` with auth check.

## Workflow

1. Read [CONVENTIONS.md](../CONVENTIONS.md), architect brief, UX spec.
2. Implement smallest vertical slice first (home + layout + header/footer).
3. Wire placeholders until `eco-content-migration` seeds real copy.
4. After each phase, notify orchestrator to run gate skills.

## Handoff

- [ ] App builds and runs locally.
- [ ] Repo anchors match CONVENTIONS.
- **Previous**: `eco-architect`, `eco-ux-ui`  
- **Next**: `eco-content-migration`, `eco-seo`, `eco-performance`, `eco-security-privacy`
