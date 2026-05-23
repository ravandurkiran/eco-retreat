---
name: eco-orchestrator
description: Sequences Eco Retreat website build phases, enforces QUALITY_GATES between phases, and coordinates eco-* skills for Next.js, Razorpay booking, and admin. Use for full-site builds, multi-phase work, or resolving scope conflicts between SEO, security, and implementer.
---

# Eco Orchestrator

Entry point for building The Eco Retreat full-stack business website.

## Before any work

1. Read [CONVENTIONS.md](../CONVENTIONS.md), [HANDOFFS.md](../HANDOFFS.md), [QUALITY_GATES.md](../QUALITY_GATES.md).
2. Confirm stack: Next.js 15, PostgreSQL/Prisma, Razorpay, admin auth.
3. Do **not** skip `[GATE]` steps in [HANDOFFS.md](../HANDOFFS.md).

## Inputs (ask if missing)

- Production domain (canonicals, sitemap).
- Deploy target (Vercel, Hostinger VPS, other).
- WhatsApp number for CTAs (default from CONVENTIONS / Anahata).
- Whether blog is Phase 1 or Phase 2.

## Execution order

| Phase | Skills / agents | Gate |
|-------|-----------------|------|
| 0 Bootstrap | `eco-cursor-tooling` → `eco-architect` → `eco-implementer` (scaffold) | QUALITY_GATES Phase 0 |
| 1 Marketing | `eco-ux-ui`, `eco-content-ia`, `eco-implementer`, `eco-content-migration`, `eco-gallery-media`, `eco-charity-impact`, `eco-forms-crm`, `eco-social-embeds`, `eco-legal-privacy` | Phase 1 + `eco-seo`, `eco-performance`, `eco-security-privacy` |
| 2 Booking | `eco-booking-availability`, `eco-payment-razorpay`, `eco-ux-conversion` agent | Phase 2 + `eco-security-reviewer` |
| 3 Admin | `eco-admin-panel`, `eco-admin-builder` agent | Phase 3 |
| 4 Launch | `eco-accessibility`, `eco-test-qa`, `eco-analytics`, `eco-devops-deploy`, `eco-seo-perf-guardian` | Phase 4 |

## Definition of Done (full project)

- [ ] All MVP routes live per CONVENTIONS.
- [ ] Legacy 301 redirects configured.
- [ ] Booking cannot overbook; Razorpay webhook verified.
- [ ] Admin noindex; auth enforced.
- [ ] QUALITY_GATES Phase 4 signed off.
- [ ] Content migrated from old site without unapproved copy rewrites.

## Conflict resolution

| Conflict | Resolution |
|----------|--------------|
| SEO wants more JS vs performance | Prefer Server Components; defer client booking bundle |
| UX wants embeds vs CSP | Use server-cached oEmbed per `eco-social-embeds` |
| New marketing copy vs migration | User must approve copy changes |

## Handoff

**Previous**: User request  
**Next**: `eco-architect`
