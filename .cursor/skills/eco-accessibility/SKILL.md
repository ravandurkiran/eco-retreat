---
name: eco-accessibility
description: Ensures Eco Retreat meets WCAG 2.1 AA — keyboard navigation, focus states, contrast, form labels, and screen reader patterns. Use for a11y audits or before launch accessibility sign-off.
---

# Eco Accessibility

## Target

WCAG 2.1 Level **AA** for public marketing and booking flows.

## Checklist

### Perception
- [ ] Text contrast ≥ 4.5:1 (body), 3:1 (large text/UI)
- [ ] Images have meaningful `alt`; decorative `alt=""`
- [ ] No information conveyed by color alone (availability states use text/icons)

### Operation
- [ ] All interactive elements keyboard reachable
- [ ] Visible focus ring (match `eco-ux-ui` tokens)
- [ ] Mobile menu: `aria-expanded`, focus trap while open
- [ ] Skip link to main content
- [ ] WhatsApp FAB has accessible name

### Forms
- [ ] Labels associated with inputs (`htmlFor` / `id`)
- [ ] Errors announced (`aria-live` or `role="alert"`)
- [ ] Booking date picker keyboard usable

### Structure
- [ ] Landmarks: `header`, `nav`, `main`, `footer`
- [ ] One H1 per page
- [ ] Page `<title>` describes purpose

## Testing

- axe DevTools on home, program, book, contact
- Keyboard-only pass through booking funnel
- VoiceOver/NVDA spot check on forms

## Handoff

- [ ] Issues logged with severity; Critical fixed before launch.
- **Previous**: `eco-seo`  
- **Next**: `eco-test-qa`
