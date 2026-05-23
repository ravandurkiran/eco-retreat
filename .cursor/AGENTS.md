# Eco Retreat — Cursor agents & skills

Skills and subagents are ready. **No application code** has been scaffolded yet.

**Git:** Commits/pushes only when you explicitly ask. Use `eco-github-release` for branch names, PRs, and `release:major|minor|patch` labels.

**Cursor advanced:** Use `eco-cursor-tooling` for rules, hooks, MCP browser QA, parallel agents, and `/loop` CI polling. Apply `.cursor/rules/` and hooks at Phase 0 (templates in `skills/eco-cursor-tooling/`).

## Subagents (`.cursor/agents/`)

| Invoke | Purpose |
|--------|---------|
| `@eco-orchestrator` | Full phased build coordinator |
| `@eco-content-migrator` | Legacy site content import |
| `@eco-booking-engineer` | Availability, holds, webhooks |
| `@eco-admin-builder` | Admin dashboard |
| `@eco-security-reviewer` | Pre-live security audit |
| `@eco-seo-perf-guardian` | Phase quality gates |
| `@eco-ux-conversion` | Booking CTA & UX polish |

## Skills (`.cursor/skills/`)

See [skills/README.md](./skills/README.md) for the full index (22 skills).

## Next step

When ready to build: *"Use eco-orchestrator to run Phase 0 bootstrap"* or *"execute the plan Phase 0"*.
