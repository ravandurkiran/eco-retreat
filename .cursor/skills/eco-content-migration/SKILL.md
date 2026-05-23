---
name: eco-content-migration
description: Imports content from the-eco-retreat-old static site (app.js PAGES, HTML) into Eco Retreat database seeds or MDX without rewriting marketing copy. Use when migrating programs, about pages, or charity text from the legacy site.
---

# Eco Content Migration

## Scope

- **In scope**: Parse `../the-eco-retreat-old/app.js` (`PAGES`, `PAGE_META`), HTML files; seed Prisma or MDX; redirect map; migration report of unmapped blocks.
- **Out of scope**: Paraphrasing paragraphs; scraping full anahata-trust.org.

## Source files

| Source | Content |
|--------|---------|
| `the-eco-retreat-old/app.js` | Structured page blocks |
| `the-eco-retreat-old/*.html` | Shell + `data-page` |
| Live site | Verification only |

## Slug mapping

| Legacy key / file | New slug |
|-------------------|----------|
| `seven-day-program` / `7-day-program.html` | `7-day` |
| `weekend-program` | `weekend` |
| `stay-with-us` | `stay-with-us` |
| `vision-history` | fold into founder or `/about` |
| `shanti-dhama`, `karunashraya` | `/impact` sections |
| `contact` | `/contact` |

## Workflow

1. Read [CONVENTIONS.md](../CONVENTIONS.md).
2. Extract text blocks verbatim into seed JSON or MDX frontmatter.
3. Mark each block `migrationStatus: review` in seed metadata.
4. Generate `scripts/seed-content.ts` or Prisma seed.
5. Configure 301 redirects in `next.config.ts` per CONVENTIONS table.
6. Output migration report: mapped / skipped / needs user input.

## Handoff

- [ ] No silent copy rewrites.
- [ ] Redirects documented.
- **Previous**: `eco-implementer` (shell exists)  
- **Next**: `eco-seo` (metadata for all routes), `eco-content-migrator` agent
