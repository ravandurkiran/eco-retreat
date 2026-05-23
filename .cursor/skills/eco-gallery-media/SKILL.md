---
name: eco-gallery-media
description: Manages Eco Retreat photo gallery with placeholder images, next/image optimization, blur placeholders, and admin upload replacement flow. Use for gallery page, placeholder assets, or media performance.
---

# Eco Gallery & Media

## Placeholders (Phase 1)

- Directory: `public/images/placeholders/`
- Naming: `retreat-01.webp` … `retreat-12.webp` (nature/retreat themed stock or neutral placeholders).
- Consistent aspect ratio: **4:3** or **3:2** for grid uniformity.
- `alt` text: descriptive e.g. "Eco Retreat garden — photo coming soon".

## Public page `/gallery`

- Responsive grid (2 col mobile, 3–4 desktop).
- `next/image` with `placeholder="blur"` and `blurDataURL` or static blur.
- Below-fold: `loading="lazy"`.
- Lightbox optional Phase 2 (`yet-another-react-lightbox` — evaluate bundle size).

## Admin integration

- Replace placeholder slot with uploaded image URL.
- Preserve `sortOrder` for manual sequencing.
- Do not serve original 10MB uploads — resize on upload.

## Workflow

1. Seed placeholders in repo.
2. Implement `GalleryGrid` Server Component reading DB or static manifest `gallery.json`.
3. Wire admin upload per `eco-admin-panel`.
4. Pass image domains to `next.config.js` `images.remotePatterns`.

## Handoff

- [ ] All gallery images use `next/image`.
- [ ] CLS reserved via width/height.
- **Previous**: `eco-implementer`  
- **Next**: `eco-performance`, `eco-seo` (image alt audit)
