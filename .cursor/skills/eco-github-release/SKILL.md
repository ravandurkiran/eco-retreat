---
name: eco-github-release
description: Defines Eco Retreat Git branching, conventional commits, PR workflow, and semver release labels (release:major, release:minor, release:patch) using gh CLI and GitHub Actions. Use when creating branches, commits, pushes, PRs, or applying version labels before deploy.
---

# Eco GitHub — Branching, Commits & Releases

## Git safety (required)

Follow the user’s git rules:

- **Never** `git commit` or `git push` unless the user **explicitly** asks in the current message (e.g. “commit this”, “push and open PR”).
- **Never** `--no-verify`, force-push to `main`, or `git config` changes.
- **Never** commit `.env`, secrets, or `RAZORPAY_KEY_SECRET`.
- When asked to commit: run `git status`, `git diff`, draft message, commit with HEREDOC, then `git status`.

“Automatic” below means **prepare + suggest**, or run **only after explicit approval**, except CI on GitHub after merge.

---

## Branching strategy (GitHub Flow + release branches)

```text
main          ← production (protected; deploy from tags)
develop       ← integration (default PR target for features)
feature/*     ← e.g. feature/booking-hold
fix/*         ← e.g. fix/webhook-signature
release/*     ← e.g. release/1.2.0 (stabilization before main)
hotfix/*      ← urgent production fixes from main
```

| Branch | Purpose | Merges into |
|--------|---------|-------------|
| `main` | Live-ready code; tagged releases | — |
| `develop` | Next release integration | `main` via release PR |
| `feature/<name>` | New work | `develop` |
| `fix/<name>` | Bugfixes | `develop` or `main` (hotfix) |
| `release/x.y.z` | QA freeze, version bump | `main` + back-merge `develop` |
| `hotfix/<name>` | Production emergency | `main` + `develop` |

### Branch naming examples

- `feature/phase-1-marketing-pages`
- `feature/razorpay-webhook`
- `fix/gallery-cls`
- `release/1.0.0`
- `hotfix/booking-hold-expiry`

### Protection rules (configure on GitHub)

- `main`: require PR, 1 review, status checks (lint, test, Lighthouse CI)
- `develop`: require PR, status checks
- No direct pushes to `main` by bots without ruleset exception

---

## Conventional commits

Format: `<type>(<scope>): <subject>`

| Type | Use | Default release label |
|------|-----|-------------------------|
| `feat` | New feature | `release:minor` |
| `fix` | Bug fix | `release:patch` |
| `perf` | Performance | `release:patch` |
| `refactor` | Code change, no behavior | none |
| `docs` | Documentation only | none |
| `chore` | Tooling, deps | none |
| `test` | Tests only | none |
| `ci` | CI/CD | none |

**Breaking change** (any type): add `!` after type/scope OR footer `BREAKING CHANGE:` → **`release:major`**

Examples:

```text
feat(booking): add 15-minute hold before Razorpay checkout
fix(webhook): verify Razorpay signature on raw body
feat(admin)!: remove legacy booking export endpoints
chore(deps): bump prisma to 6.x
```

---

## GitHub labels (create once per repo)

Use `gh label create` if missing:

| Label | Color | Meaning |
|-------|-------|---------|
| `release:major` | `#d73a4a` | Breaking / 1.x → 2.0.0 |
| `release:minor` | `#0e8a16` | New features / 1.1.0 |
| `release:patch` | `#1d76db` | Fixes / 1.0.1 |
| `release:none` | `#cccccc` | No version bump (docs/chore) |
| `phase:0-bootstrap` … `phase:4-launch` | optional | Track plan phases on PRs |

---

## Agent workflow: commit → push → PR → labels

Run **only when user explicitly requests** git operations.

### 1. Preflight

```bash
git status
git diff
git log -3 --oneline
git branch --show-current
```

### 2. Branch (if needed)

```bash
git checkout develop
git pull origin develop
git checkout -b feature/short-description
```

### 3. Stage & commit (after user approval)

```bash
git add <paths>
git commit -m "$(cat <<'EOF'
feat(scope): short subject

Optional body explaining why.
EOF
)"
```

### 4. Push & PR

```bash
git push -u origin HEAD
gh pr create --base develop --title "feat(scope): subject" --body "$(cat <<'EOF'
## Summary
- ...

## Test plan
- [ ] ...

## Release
Semver: patch | minor | major (see labels applied)
EOF
)"
```

### 5. Apply release label from commits

Inspect commits on the branch since `develop`:

```bash
git log develop..HEAD --oneline
```

**Label rules** (apply highest severity found):

1. Any `BREAKING CHANGE` or `feat!` / `fix!` → `release:major`
2. Else any `feat(` → `release:minor`
3. Else any `fix(` or `perf(` → `release:patch`
4. Else only `docs`, `chore`, `test`, `ci` → `release:none`

```bash
gh pr edit <number> --add-label "release:minor"
# remove wrong label if needed:
gh pr edit <number> --remove-label "release:patch"
```

### 6. Merge & tag (release to production)

After PR to `main` is merged and user approves release:

```bash
# On main, after merge
git checkout main && git pull
gh release list --limit 1  # check latest tag

# Patch example (if release:patch)
gh release create v1.0.1 --generate-notes --title "v1.0.1"

# Or explicit notes
gh release create v1.1.0 --notes "$(cat <<'EOF'
## Features
- Booking holds
EOF
)"
```

**Version bump source of truth**: highest `release:*` label on the merged PR, or GitHub Action (see [reference.md](./reference.md)).

---

## Integration with Eco skills

| When | Action |
|------|--------|
| End of Phase 1–3 gate pass | PR to `develop` with `phase:N` + `release:*` label |
| Before `eco-devops-deploy` | PR `develop` → `main` or `release/x.y.z` → `main` |
| Hotfix production | `hotfix/*` from `main`, PR to `main`, then cherry-pick/back-merge `develop` |

---

## Handoff

- [ ] Branch name follows convention.
- [ ] Commit messages conventional; release label matches.
- [ ] No secrets in diff.
- [ ] User explicitly approved commit/push.
- **Previous**: any implementation skill  
- **Next**: `eco-devops-deploy`, `eco-test-qa` (CI must pass before merge)

See [reference.md](./reference.md) for GitHub Actions semver automation.
