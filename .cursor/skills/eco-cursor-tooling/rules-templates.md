# Cursor rules templates — copy to `.cursor/rules/` at Phase 0

## eco-stack.mdc

```markdown
---
description: Eco Retreat stack and quality standards
alwaysApply: true
---

# Eco Retreat stack

- Next.js 15 App Router, TypeScript, Tailwind, Prisma, PostgreSQL, Razorpay.
- Server Components by default; client only for booking UI, nav, cookie banner.
- Never put RAZORPAY_KEY_SECRET or DATABASE_URL in client code or NEXT_PUBLIC_*.
- Run QUALITY_GATES for the current phase before marking work complete.
- Invoke eco-seo, eco-performance, eco-security-privacy after each phase.
- Prefer migrated copy from the-eco-retreat-old; do not rewrite marketing text without user approval.
```

## eco-git-safety.mdc

```markdown
---
description: Git commit and push safety
alwaysApply: true
---

# Git safety

- Only git commit or git push when the user explicitly requests it in the current message.
- Never git push --force to main or master.
- Never commit .env, .env.local, or files containing API secrets.
- Use conventional commits; apply release labels per eco-github-release skill.
- Before commit: git status, git diff, draft message, HEREDOC commit.
```

## eco-api-routes.mdc

```markdown
---
description: API route standards
globs: app/api/**/*
alwaysApply: false
---

# API routes

- Validate all inputs with Zod.
- Rate-limit public POST routes (contact, booking hold).
- Razorpay webhook: verify signature on raw body; idempotent by payment/event id.
- Return generic errors to clients; log details server-side without PII.
```

## eco-admin.mdc

```markdown
---
description: Admin panel standards
globs: app/admin/**/*
alwaysApply: false
---

# Admin

- All routes require auth middleware.
- Layout metadata: robots noindex, nofollow.
- Validate uploads: image types only, max 2MB, no executable content.
- RBAC: only ADMIN role changes pricing and capacity.
```

## eco-content.mdc

```markdown
---
description: Content migration rules
globs: content/**/*,prisma/seed*
alwaysApply: false
---

# Content

- Preserve migrated paragraphs verbatim from the-eco-retreat-old.
- Flag unmapped blocks for user review; do not invent marketing claims.
```
