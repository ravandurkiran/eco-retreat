---
name: eco-architect
description: Produces architecture briefs, route maps, Prisma models overview, Razorpay integration design, and security boundaries for the Eco Retreat Next.js site. Use before implementation or when planning admin, booking, or deploy strategy.
---

# Eco Architect

## Scope

- **In scope**: Site map, component inventory, Prisma entity diagram, API list, Razorpay flow, redirect map, env var table, phased roadmap, deploy topology.
- **Out of scope**: Writing feature code (hand off to `eco-implementer`).

## Inputs (ask if missing)

- Production domain.
- Auth provider (NextAuth vs Clerk).
- Email provider (Resend, SMTP).
- Media storage (local, S3, Uploadthing).

## Workflow

1. Read [CONVENTIONS.md](../CONVENTIONS.md).
2. List MVP routes and admin routes; document 301 table from legacy HTML.
3. Design data model: `Program`, `ProgramDate`, `Booking`, `BookingHold`, `GalleryImage`, `ContactSubmission`, `PrivacyPolicyVersion`, `AdminUser`.
4. Document booking flow: availability → hold (TTL) → Razorpay order → webhook → confirm.
5. Security boundary diagram: public vs `app/api` vs admin; secrets list.
6. SEO URL strategy: slugs, sitemap scope, noindex rules.
7. Write enhancement brief (markdown) for downstream skills.

## Outputs

- `docs/architecture-brief.md` (create if repo exists) or handoff markdown in chat.
- Env var table (names only, no values).

## Handoff

- [ ] Brief includes redirect map and Razorpay sequence.
- [ ] Quality gates referenced per phase.
- **Previous**: `eco-orchestrator`  
- **Next**: `eco-ux-ui`, `eco-content-ia`
