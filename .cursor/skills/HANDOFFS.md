# Eco Retreat — agent handoff chain

Cross-reference for `eco-*` skills. See [CONVENTIONS.md](./CONVENTIONS.md) and [QUALITY_GATES.md](./QUALITY_GATES.md).

## Pipeline order

```
eco-orchestrator
  → eco-cursor-tooling (Phase 0: rules, hooks, MCP)
  → eco-architect
  → eco-ux-ui + eco-content-ia (parallel)
  → eco-implementer
  → [GATE] eco-seo + eco-performance + eco-security-privacy
  → eco-content-migration
  → [GATE] eco-seo (migrated routes metadata)
  → eco-booking-availability + eco-payment-razorpay
  → [GATE] eco-security-privacy (+ eco-security-reviewer agent)
  → eco-admin-panel + eco-gallery-media
  → [GATE] admin security checklist (QUALITY_GATES Phase 3)
  → eco-forms-crm + eco-social-embeds + eco-charity-impact
  → eco-legal-privacy
  → eco-accessibility
  → [GATE] eco-seo → eco-performance → eco-security-privacy → eco-test-qa
  → eco-analytics → eco-github-release (PR + labels) → eco-devops-deploy
  → eco-seo-perf-guardian (final sign-off)
```

Optional parallel: `eco-blog-writer` after Phase 1 public shell exists.

## Adjacent handoffs

| From | To | Artifact |
|------|-----|----------|
| orchestrator | architect | Scope, domain, Razorpay, deploy target |
| architect | ux-ui, content-ia | Enhancement brief, route map, redirect table |
| ux-ui, content-ia | implementer | Design tokens, IA map, CTA placement |
| implementer | content-migration | App shell, DB seed hooks |
| content-migration | booking, seo | Seeded content + slugs |
| booking | payment-razorpay | Hold API, Prisma models |
| payment-razorpay | test-qa, security | Webhook route, test vectors |
| implementer | gallery-media | Image component patterns |
| forms-crm | security-privacy | Form endpoints, CSP `form-action` |
| social-embeds | performance, security | oEmbed origins for CSP |
| legal-privacy | security-privacy | Policy URL for cookie banner |
| test-qa | github-release | QA report, Lighthouse baselines |
| github-release | devops-deploy | Merged PR, `release:*` label, tag optional |
| devops-deploy | orchestrator | Deploy log, production URL |

## Sample prompts

```
Use eco-orchestrator to run Phase 1 only with QUALITY_GATES Phase 1 checklist.
```

```
Use eco-content-migration to seed programs from ../the-eco-retreat-old/app.js without rewriting copy.
```

```
Use eco-payment-razorpay and eco-booking-availability together; run eco-security-reviewer before live keys.
```

```
Use eco-seo-perf-guardian after Phase 1 — report pass/fail against QUALITY_GATES.md.
```

```
Use eco-github-release: create feature/phase-1-marketing from develop, then commit and push (after I approve the message).
```
