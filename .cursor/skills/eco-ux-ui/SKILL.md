---
name: eco-ux-ui
description: Defines Eco Retreat design tokens, Tailwind theme, component specs, and conversion-focused layout patterns (sticky Book CTA, WhatsApp FAB) for a natural retreat aesthetic. Use for visual design, mobile booking funnel UX, or UI polish.
---

# Eco UX / UI

## Scope

- **In scope**: `globals.css` CSS variables, Tailwind `theme.extend`, typography (`next/font`), color palette, spacing, component specs (header, hero, program card, gallery grid, footer, booking bar).
- **Out of scope**: Implementing API routes; changing migrated copy without approval.

## Design direction

- **Mood**: Natural, calm, trustworthy — forest, earth, morning light.
- **Colors**: `--color-forest`, `--color-earth`, `--color-cream`, `--color-sage` (document hex values in spec).
- **Type**: Serif display + sans body; generous line-height for readability.
- **Conversion**: Primary CTA “Book your retreat”; secondary “Chat on WhatsApp”; sticky mobile book bar.

## Workflow

1. Read architect brief and [CONVENTIONS.md](../CONVENTIONS.md).
2. Audit existing styles if scaffold exists; else define tokens from scratch.
3. Spec components with Tailwind class patterns for `eco-implementer`.
4. Document touch targets ≥ 44px, focus ring utilities, reduced-motion respect.
5. Hero: full-bleed image, overlay gradient for text contrast (WCAG AA).

## Outputs

- UI spec markdown: tokens table + component checklist.
- Optional direct edits to `app/globals.css` and `tailwind.config.ts`.

## Handoff

- [ ] Contrast notes for `eco-accessibility`.
- [ ] CTA placement notes for `eco-content-ia`.
- **Previous**: `eco-architect`  
- **Next**: `eco-implementer`, `eco-ux-conversion` agent
