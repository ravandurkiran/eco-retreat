# Eco Retreat — Cursor skills

Twenty-four project skills for building the full-stack Eco Retreat business website (Next.js, PostgreSQL, Razorpay, admin, booking).

## Quick start

| Goal | Invoke |
|------|--------|
| Full pipeline | `eco-orchestrator` |
| Plan / architecture | `eco-architect` |
| Build UI & routes | `eco-implementer` |
| Migrate old site copy | `eco-content-migration` |
| Booking & capacity | `eco-booking-availability` |
| Razorpay | `eco-payment-razorpay` |
| Admin dashboard | `eco-admin-panel` |
| SEO | `eco-seo` |
| Performance | `eco-performance` |
| Security & privacy | `eco-security-privacy` |
| QA | `eco-test-qa` |
| Deploy | `eco-devops-deploy` |
| Git / PR / release labels | `eco-github-release` |
| Cursor rules, hooks, MCP | `eco-cursor-tooling` |

Shared docs: [CONVENTIONS.md](./CONVENTIONS.md) · [HANDOFFS.md](./HANDOFFS.md) · [QUALITY_GATES.md](./QUALITY_GATES.md)

## Subagents (`.cursor/agents/`)

| Agent | Use when |
|-------|----------|
| `eco-orchestrator` | Multi-phase full site build |
| `eco-content-migrator` | Old site → DB/MDX import |
| `eco-booking-engineer` | Availability, holds, webhooks |
| `eco-admin-builder` | Admin CRUD features |
| `eco-security-reviewer` | Pre-launch payment/auth audit |
| `eco-seo-perf-guardian` | End-of-phase quality gate |
| `eco-ux-conversion` | Booking CTA & visual polish |

## Skills index

| Folder | Focus |
|--------|--------|
| `eco-orchestrator` | Pipeline coordination |
| `eco-architect` | Architecture & phased brief |
| `eco-ux-ui` | Design tokens & components |
| `eco-content-ia` | Information architecture |
| `eco-implementer` | Next.js implementation |
| `eco-content-migration` | Legacy content import |
| `eco-booking-availability` | Capacity & holds |
| `eco-payment-razorpay` | Payments & webhooks |
| `eco-admin-panel` | Admin UI & RBAC |
| `eco-gallery-media` | Gallery & placeholders |
| `eco-forms-crm` | Contact & notifications |
| `eco-social-embeds` | YouTube, Facebook, Instagram |
| `eco-charity-impact` | Anahata Trust integration |
| `eco-legal-privacy` | Privacy, terms, cookies |
| `eco-blog-writer` | Blog posts & SEO content |
| `eco-seo` | Technical & on-page SEO |
| `eco-performance` | Core Web Vitals |
| `eco-security-privacy` | CSP, headers, audits |
| `eco-accessibility` | WCAG |
| `eco-test-qa` | Testing matrix |
| `eco-analytics` | GA4 / Plausible |
| `eco-devops-deploy` | Production deploy |
| `eco-github-release` | Branches, commits, PRs, semver labels |
| `eco-cursor-tooling` | Rules, hooks, MCP, Composer, browser QA |

Legacy reference: `../the-eco-retreat-old/.cursor/skills/` (static HTML skills — superseded by `eco-*`).
