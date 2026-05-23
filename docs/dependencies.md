# Dependency policy

## Pinning

- **Next.js / React**: match versions in `package.json`; upgrade via dedicated PR with full `build` + manual smoke test.
- **Prisma**: keep `@prisma/client` and `prisma` on the same minor version.
- **next-auth**: beta track — review release notes before bumping.

## Security

```bash
npm audit
npm audit fix   # only when changelog is reviewed
```

Fix **critical** vulnerabilities before production deploy. Document accepted risks for moderate/low issues in the PR.

## Optional tooling

| Package | Purpose |
|---------|---------|
| `@lhci/cli` | Lighthouse CI (installed in GitHub Actions workflow) |

## Runtime

- Node **20 LTS** (matches CI)
- PostgreSQL **16+**
