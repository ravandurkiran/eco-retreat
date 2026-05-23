# The Eco Retreat — website

Full-stack business website for [The Eco Retreat](https://the-eco-retreat.com): programs, booking, Razorpay payments, admin, and charity impact pages.

## Stack

- Next.js 16 · TypeScript · Tailwind CSS v4
- PostgreSQL · Prisma
- Razorpay

## Getting started

```bash
cp .env.example .env
# Edit DATABASE_URL and other vars

npm install
npx prisma generate
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Full local test checklist:** [docs/LOCAL_TESTING.md](docs/LOCAL_TESTING.md)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:migrate` | Run migrations (requires DB) |

## Cursor AI

- Skills: `.cursor/skills/` — invoke e.g. `eco-orchestrator`, `eco-implementer`
- Agents: `.cursor/agents/`
- Quality gates: `.cursor/skills/QUALITY_GATES.md`

## Booking setup (Phase 2)

```bash
cp .env.example .env
# Set DATABASE_URL and Razorpay TEST keys (dashboard.razorpay.com)

npx prisma db push
npm run db:seed

npm run dev
```

Visit `/book` to test checkout. In **development**, payment auto-confirms via simulate endpoint (no webhook tunnel required). In **production**, configure Razorpay webhook → `https://YOUR_DOMAIN/api/webhooks/razorpay` with events `payment.captured` and `payment.failed`.

## Admin setup (Phase 3)

```bash
# In .env (see .env.example)
NEXTAUTH_SECRET=$(openssl rand -base64 32)
NEXTAUTH_URL=http://localhost:3000
ADMIN_EMAIL=admin@the-eco-retreat.com
ADMIN_PASSWORD=your-secure-password

npx prisma db push
npm run db:seed   # also creates admin user when ADMIN_* are set
npm run dev
```

Sign in at [http://localhost:3000/admin/login](http://localhost:3000/admin/login). Admin routes are **noindex** and blocked in `robots.txt`.

Manage programs, dates/capacity, bookings, gallery uploads (`/public/uploads/gallery`), contact messages, and privacy policy versions.

## Analytics (optional)

Set `NEXT_PUBLIC_ANALYTICS_PROVIDER` to `plausible` or `ga4` and the matching ID in `.env`. Analytics scripts load **only after** cookie consent. Booking funnel events: `begin_checkout`, `purchase`, `cta_click`.

## Launch

See [docs/deploy.md](docs/deploy.md) for production checklist, env vars, and Search Console. Lighthouse CI runs on pull requests (`.github/workflows/lighthouse.yml`).

## Phases

- **Phase 0–3**: scaffold, marketing, booking, admin (done)
- **Phase 4**: CSP enforce, consent analytics, Lighthouse CI, deploy docs (done)

Legacy static site reference: `../the-eco-retreat-old/`
