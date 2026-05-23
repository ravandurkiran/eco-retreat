---
name: eco-charity-impact
description: Builds Eco Retreat impact pages linking retreat participation to Anahata Trust charity work (Karunashraya, Shanthidhama) with curated copy and outbound CTAs. Use for /impact page or charity sections on program pages.
---

# Eco Charity & Impact

## Scope

- **In scope**: `/impact` page, program-page charity callouts, links to [anahata-trust.org](https://anahata-trust.org), support/donate CTAs.
- **Out of scope**: Scraping or mirroring entire Anahata site; handling donations on Anahata's behalf (link out).

## Content blocks

1. **Intro** — retreat fees support community work (from migrated Eco Retreat copy).
2. **Karunashraya** — elderly day-care; 2–3 sentences + “Learn more” → Anahata.
3. **Shanthidhama** — specially-abled sanctuary; same pattern.
4. **Founder connection** — Kiran’s vision; link to `/about/founder`.
5. **Support CTA** — WhatsApp or Anahata donate page (UPI/80G on their site).

## Sources

- Migrated: `shanti-dhama.html`, `karunashraya.html`, `support-us.html` from `the-eco-retreat-old`.
- Reference only: anahata-trust.org for fact-checking, not bulk copy.

## Workflow

1. Import migrated paragraphs verbatim.
2. Add structured cards with icons/photos (placeholders OK).
3. Ensure outbound links `rel="noopener noreferrer"` open in new tab where appropriate.
4. Optional: JSON-LD `NGO` on impact page only if legally accurate — confirm with user.

## Handoff

- [ ] No unapproved new charity claims.
- [ ] Anahata links verified live.
- **Previous**: `eco-content-migration`  
- **Next**: `eco-seo`, `eco-content-ia`
