---
name: eco-cursor-tooling
description: Maps advanced Cursor IDE features (rules, hooks, MCP, subagents, browser QA, loops, Composer) to Eco Retreat development phases. Use at Phase 0 setup or when choosing how to run agents, gates, and automation during the build.
---

# Eco Cursor Tooling — Advanced Features During Development

Use this skill to **configure and invoke** Cursor capabilities alongside the `eco-*` pipeline. Read [CONVENTIONS.md](../CONVENTIONS.md) and [QUALITY_GATES.md](../QUALITY_GATES.md) first.

---

## Feature matrix (what to use when)

| Cursor feature | Use during Eco Retreat for | Phase |
|----------------|----------------------------|-------|
| **Agent / Composer** | Multi-file scaffold, Phase 1 pages, refactors | 0–4 |
| **Project skills (`eco-*`)** | Domain playbooks (SEO, Razorpay, admin) | All |
| **Subagents (`.cursor/agents/`)** | Long isolated tasks (migration, booking, security) | 1–4 |
| **Project rules (`.cursor/rules/`)** | Always-on stack, git safety, file patterns | 0+ |
| **Hooks (`.cursor/hooks.json`)** | Lint after edit, block secret commits | 0+ |
| **MCP: Browser** | Visual QA, booking flow, responsive check | 1–4 |
| **MCP: GitHub** (add) | PRs, issues, CI status from chat | 0+ |
| **MCP: Postgres/Supabase** (add) | Inspect DB, verify bookings | 2+ |
| **@ file / folder** | Pin `prisma/schema.prisma`, skill files | All |
| **Task / parallel agents** | Migration + SEO audit in parallel | 1, 4 |
| **Plan → Execute** | Lock architecture before codegen | 0 |
| **`/loop`** | Poll CI or Lighthouse until green | 4 |
| **Background / Cloud agent** | Long Phase 1 build while away | 1–2 |
| **Canvas** | Architecture diagram, IA map (optional) | 0 |
| **Bugbot** | PR review for security regressions | 2+ |
| **Personal skills** | `seo-advanced-review`, Hostinger verify | 4 |

---

## Phase 0 — Wire Cursor once (checklist)

Create these in the repo when scaffolding (or before first real code):

### 1. Project rules — `.cursor/rules/`

| File | `alwaysApply` | Purpose |
|------|---------------|---------|
| `eco-stack.mdc` | true | Next.js 15, Prisma, Razorpay, Tailwind, no secrets client-side |
| `eco-git-safety.mdc` | true | Commit/push only when user asks; no force-push main |
| `eco-api-routes.mdc` | `app/api/**` | Zod validation, rate limits |
| `eco-admin.mdc` | `app/admin/**` | Auth middleware, noindex |
| `eco-content.mdc` | false | Don’t rewrite migrated copy |

See [rules-templates.md](./rules-templates.md) for copy-paste frontmatter.

### 2. Hooks — `.cursor/hooks.json`

| Event | Action |
|-------|--------|
| `afterFileEdit` | Run `npm run lint` (if package exists) |
| `beforeShellExecution` | Deny `git push --force` to main; deny committing `.env` |
| `sessionStart` | Inject reminder: check QUALITY_GATES for current phase |

See [hooks-templates.md](./hooks-templates.md).

### 3. MCP servers (Cursor Settings → MCP)

**Enabled now (workspace):**

- `cursor-ide-browser` — E2E and visual QA
- `cursor-app-control` — open files, move workspace

**Add when repo + accounts exist:**

```json
"github": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-github"], "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "..." } }
```

Optional: Supabase MCP, Figma MCP, Sentry MCP (post-launch).

### 4. `.cursorignore`

```
.env
.env.*
!.env.example
node_modules
.next
```

### 5. `AGENTS.md` + skills README

Already at `.cursor/AGENTS.md` — keep updated when adding agents.

---

## How to run each development phase in Cursor

### Phase 0 — Bootstrap

```
Use eco-orchestrator: Phase 0 only.
Use eco-architect then eco-implementer.
Use eco-cursor-tooling: apply rules and hooks templates.
```

- **Mode**: Agent (Composer), full folder context.
- **After**: `@eco-seo-perf-guardian` smoke gate.

### Phase 1 — Marketing pages

```
Use eco-orchestrator Phase 1.
@eco-content-migrator parallel with eco-ux-ui.
```

- **Browser MCP**: snapshot home + program page at 360px / 1280px width.
- **Parallel Task**: `explore` agent maps old `app.js` while implementer scaffolds layout.

### Phase 2 — Booking + Razorpay

```
@eco-booking-engineer
Use eco-payment-razorpay.
```

- **Browser MCP**: test booking path in Razorpay test mode.
- **Subagent**: `eco-security-reviewer` before live keys.
- **Never** paste live secrets in chat — use `.env.local` only.

### Phase 3 — Admin

```
@eco-admin-builder
Use eco-admin-panel.
```

- **Rule**: `eco-admin.mdc` auto-applies under `app/admin/`.

### Phase 4 — Launch

```
Use eco-seo-perf-guardian full gate.
Use eco-github-release: open PR to develop with release:minor.
/loop 5m check GitHub Actions until green
Use eco-devops-deploy.
```

- **Personal skill**: `seo-advanced-review` if available.
- **Bugbot**: enable on repo for PRs to `main`.

---

## Composer vs Chat vs Subagent

| Situation | Best tool |
|-----------|-----------|
| 5+ files changed (scaffold, layout) | **Composer / Agent** |
| Single skill workflow (SEO audit) | **Chat** + `Use eco-seo` |
| Deep booking debug | **@eco-booking-engineer** subagent |
| Explore legacy `app.js` | **Task explore** subagent |
| Repeat CI check | **`/loop 5m`** |

---

## Browser MCP workflow (QA)

1. `browser_navigate` → `http://localhost:3000`
2. `browser_snapshot` → get refs
3. Click Book CTA, fill form, verify Razorpay redirect (test mode)
4. `browser_take_screenshot` for visual regression notes
5. `browser_console_messages` — no errors on load

Lock browser before interactions; unlock when done (per MCP instructions).

---

## Parallel agents pattern

One message, multiple Tasks:

- Agent A: `eco-content-migration` — seed programs
- Agent B: `eco-seo` — metadata audit on existing routes
- Agent C: `explore` — list all images in old site

Merge results in orchestrator handoff.

---

## Cloud / background agents

Use when:

- Phase 1 is large and you want progress while offline.
- Running full test suite + Lighthouse repeatedly.

**Not for**: commits (user must approve), live Razorpay keys, production deploy.

---

## Integration with other eco skills

| Skill | Cursor feature |
|-------|----------------|
| `eco-github-release` | `gh` CLI + optional Actions; user-approved commits |
| `eco-test-qa` | Browser MCP + Playwright + Lighthouse CI |
| `eco-orchestrator` | Chooses which Cursor features per phase |
| `eco-devops-deploy` | After GitHub PR merge; not Cursor-specific |

---

## Handoff

- [ ] Rules + hooks templates applied or scheduled for Phase 0.
- [ ] MCP list documented in README.
- [ ] Team knows: commits only on explicit request.
- **Previous**: `eco-architect` (Phase 0)  
- **Next**: `eco-implementer`, `eco-orchestrator`
