---
name: eco-admin-panel
description: Builds protected Eco Retreat admin UI for programs, date capacity, bookings, gallery uploads, privacy policy versions, and contact submissions. Use for /admin CRUD, RBAC, or media management.
---

# Eco Admin Panel

## Routes (under `app/admin/`)

| Route | Function |
|-------|----------|
| `/admin` | Dashboard summary |
| `/admin/programs` | CRUD programs |
| `/admin/dates` | Capacity per ProgramDate |
| `/admin/bookings` | List/filter; view status; no arbitrary payment override |
| `/admin/gallery` | Upload/reorder images |
| `/admin/contact` | View submissions |
| `/admin/legal/privacy` | Edit policy version + publish |

## Auth & security

- Middleware: redirect unauthenticated users to `/admin/login`.
- Roles: `ADMIN` (full), optional `STAFF` (read-only bookings) — Phase 2.
- Session: httpOnly, secure, sameSite=lax.
- **SEO**: layout metadata `robots: { index: false, follow: false }`.
- CSRF: built-in for Server Actions or CSRF token on forms.

## Gallery upload rules

- Max 2 MB per file (configurable).
- Types: `image/jpeg`, `image/webp`, `image/png`.
- Strip EXIF if privacy concern; generate WebP variants.
- Store URL in `GalleryImage` table.

## Workflow

1. Read [CONVENTIONS.md](../CONVENTIONS.md) and architect brief.
2. Implement auth provider integration.
3. Build CRUD with validation (Zod).
4. Audit log for capacity/price changes (optional table `AdminAuditLog`).
5. Run QUALITY_GATES Phase 3 before merge.

## Handoff

- [ ] All admin routes behind auth.
- [ ] noindex verified.
- **Previous**: `eco-booking-availability`, `eco-implementer`  
- **Next**: `eco-gallery-media`, `eco-security-privacy`, `eco-admin-builder` agent
