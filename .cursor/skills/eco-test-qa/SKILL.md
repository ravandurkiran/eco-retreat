---
name: eco-test-qa
description: Runs Eco Retreat QA matrix — unit tests, booking race tests, Razorpay webhook tests, Lighthouse assertions, and cross-browser checks. Use after each QUALITY_GATES phase or before deploy.
---

# Eco Test & QA

## Test layers

| Layer | Tool | Focus |
|-------|------|--------|
| Unit | Vitest | Zod schemas, signature verify, availability math |
| Integration | Vitest + test DB | Hold creation, webhook confirm, idempotency |
| E2E | Playwright | Contact form, booking happy path (test mode) |
| Performance | Lighthouse CI | Thresholds in QUALITY_GATES |
| SEO | Script | Unique titles per route |

## Critical test cases

### Booking
1. Last seat: two parallel holds → one succeeds.
2. Expired hold: payment webhook ignored or rejected.
3. Duplicate webhook: single booking row.

### Payments
1. Invalid signature → 400, no booking.
2. Amount mismatch → reject.

### Public
1. All MVP routes return 200.
2. `/admin` redirects to login when logged out.
3. Legacy URLs 301 to new paths.

### Forms
1. Honeypot filled → silent reject.
2. Rate limit → 429.

## Lighthouse CI (optional `.github/workflows/lighthouse.yml`)

```yaml
# Assert performance >= 0.85 on:
# - /
# - /programs/7-day
# - /book
```

## Workflow

1. Read [QUALITY_GATES.md](../QUALITY_GATES.md) for current phase.
2. Run test suite; record pass/fail matrix.
3. File bugs with repro steps for `eco-implementer`.

## Handoff

- [ ] QA report attached to phase gate.
- **Previous**: `eco-security-privacy`, `eco-accessibility`  
- **Next**: `eco-devops-deploy`, `eco-orchestrator`
