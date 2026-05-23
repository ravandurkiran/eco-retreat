---
name: eco-blog-writer
description: Structures Eco Retreat blog with MDX posts, RSS, and SEO-friendly article templates for retreat news and yoga/wellness content. Use when adding /blog, writing posts, or blog migration from legacy site.
---

# Eco Blog Writer

## Scope

- **In scope**: `app/blog/`, MDX or CMS posts, listing page, `generateMetadata` per post, RSS feed, internal links to programs.
- **Out of scope**: Inventing medical claims; unapproved guest testimonials.

## Structure

```
content/blog/
  welcome-to-eco-retreat.mdx
  what-to-expect-7-day-program.mdx
app/blog/page.tsx
app/blog/[slug]/page.tsx
app/feed.xml/route.ts   # optional RSS
```

## Post frontmatter

```yaml
title: ""
description: ""
date: 2025-01-15
author: The Eco Retreat
image: /images/blog/placeholder.webp
tags: [yoga, retreat, mysore]
```

## SEO per post

- Unique title: `{post.title} | The Eco Retreat`
- Article JSON-LD (`BlogPosting`)
- Link to relevant `/programs/[slug]` with CTA

## Workflow

1. Confirm blog in scope with orchestrator (Phase 1 vs 2).
2. Scaffold routes and one sample post (placeholder content OK if marked draft).
3. Add blog URLs to `app/sitemap.ts`.
4. Migrate `the-eco-retreat-old/blog/` if posts exist.

## Handoff

- [ ] Sample post builds; listing paginated if >10 posts.
- **Previous**: `eco-implementer`  
- **Next**: `eco-seo`, `eco-content-ia`
