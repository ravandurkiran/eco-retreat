---
name: eco-performance
description: Optimizes Core Web Vitals for Eco Retreat — next/image, fonts, bundle size, ISR, and Lighthouse budgets. Use for LCP/CLS/INP improvements or performance regression checks.
---

# Eco Performance

## Targets (mobile)

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| CLS | < 0.1 |
| INP | < 200ms |
| Lighthouse Performance | ≥ 85 on `/`, one `/programs/*`, `/book` |

## Checklist

### Images
- [ ] All images via `next/image` with dimensions or `fill` + `sizes`
- [ ] Hero: `priority` on LCP image only
- [ ] WebP/AVIF formats; placeholders in `public/images/placeholders/`
- [ ] Gallery lazy below fold

### JavaScript
- [ ] Marketing pages mostly Server Components
- [ ] Dynamic `import()` for booking picker, lightbox
- [ ] Run `@next/bundle-analyzer` on production build

### Fonts
- [ ] `next/font` only — no external stylesheet links
- [ ] ≤ 2 font families, limited weights

### Data
- [ ] ISR `revalidate` on program pages (e.g. 3600s) if content stable
- [ ] Availability API indexed; avoid N+1 queries

### Third parties
- [ ] Defer social embeds; no render-blocking scripts
- [ ] Analytics gated behind consent (`eco-analytics`)

## Workflow

1. Run Lighthouse CI or local Lighthouse on key URLs.
2. Document regressions vs previous phase baseline.
3. File issues to `eco-implementer` with specific fixes.

## Handoff

- [ ] QUALITY_GATES performance section pass/fail documented.
- **Previous**: `eco-implementer`, `eco-social-embeds`  
- **Next**: `eco-security-privacy`, `eco-test-qa`, `eco-devops-deploy`
