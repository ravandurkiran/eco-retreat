---
name: eco-content-ia
description: Maps information architecture, navigation, page outlines, and CTA placement for Eco Retreat program pages, founder bio, impact/charity, gallery, and booking funnel. Use when structuring content or planning new pages.
---

# Eco Content IA

## Scope

- **In scope**: Nav structure, page outlines, heading hierarchy per route, internal linking, CTA placement, founder/impact page structure, FAQ outline.
- **Out of scope**: Rewriting migrated body copy; legal final text.

## Primary navigation (MVP)

- Home
- Programs (7-day, weekend, stay-with-us)
- Gallery
- Impact (charity)
- About → Founder
- Contact
- **Book now** (highlighted)

## Page outlines

### `/programs/[slug]`
- Hero + key facts (duration, location Ravandur/Mysore)
- Benefits (from migrated copy)
- Inline availability summary + **Book** CTA
- Link to impact / charity
- FAQ snippet + link to full FAQ

### `/impact`
- Intro tying retreats to Shanti Dhama / Karunashraya
- Cards per program with links to [anahata-trust.org](https://anahata-trust.org)
- Support CTA (donate/volunteer outbound)

### `/about/founder`
- Photo placeholder, short bio (Kiran Ravandur)
- Link to vision/history content (migrated or summarized)

## Workflow

1. Read [CONVENTIONS.md](../CONVENTIONS.md) and old `app.js` `NAV_GROUPS` / `PAGES` for parity.
2. Produce IA map: route → H1 → sections → CTAs.
3. Flag content gaps needing user input.
4. Coordinate blog topics with `eco-blog-writer` if in scope.

## Handoff

- [ ] Every MVP route has H1 and primary CTA defined.
- **Previous**: `eco-architect`  
- **Next**: `eco-implementer`, `eco-content-migration`
