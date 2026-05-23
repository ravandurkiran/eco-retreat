# Local testing guide

Run the full site on your machine before deploying.

## 1. Prerequisites

- **Node.js 20+**
- **PostgreSQL 16** running locally (or Docker):

```bash
docker run --name eco-pg -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=eco_retreat -p 5432:5432 -d postgres:16
```

## 2. Environment

```bash
cp .env.example .env
```

Edit `.env`:

| Variable | Local value |
|----------|-------------|
| `DATABASE_URL` | `postgresql://postgres:postgres@localhost:5432/eco_retreat?schema=public` |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | Run `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `http://localhost:3000` |
| `ADMIN_EMAIL` | `admin@localhost.test` |
| `ADMIN_PASSWORD` | Any strong password for dev |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Razorpay **test** key from [dashboard](https://dashboard.razorpay.com) |
| `RAZORPAY_KEY_ID` | Same test key |
| `RAZORPAY_KEY_SECRET` | Test secret |
| `RAZORPAY_WEBHOOK_SECRET` | Optional locally — dev uses simulate-capture |

Optional:

- `EMAIL_API_KEY` + `CONTACT_TO_EMAIL` + `EMAIL_FROM` — Resend for contact notifications
- `NEXT_PUBLIC_ANALYTICS_PROVIDER` — leave empty to hide cookie banner while testing

## 3. Database & seed

```bash
npm install
npx prisma db push
npm run db:seed
```

## 4. Start dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 5. What to test

### Marketing

- [ ] Home, programs, founder, sacred place, impact, gallery, FAQ, privacy, contact
- [ ] Legacy redirects: `/index.html` → `/`, `/7-day-program.html` → `/programs/7-day`

### Contact

- [ ] Submit form — appears in `/admin/contact`
- [ ] Honeypot: hidden `website` field left empty
- [ ] Rate limit: 6+ rapid submits from same IP → HTTP 429

### Booking

- [ ] `/book` — select program, date, pay with Razorpay **test card**
- [ ] Success page confirms booking (dev auto-simulates webhook on first poll)
- [ ] Admin `/admin/bookings` shows CONFIRMED

Razorpay test card: `4111 1111 1111 1111`, any future expiry, any CVV.

### Admin

- [ ] `/admin/login` with `ADMIN_EMAIL` / `ADMIN_PASSWORD`
- [ ] Lockout: 5 wrong passwords → “Too many failed attempts”
- [ ] Programs, dates, gallery upload, privacy publish

### Security smoke

- [ ] `/admin` redirects to login when logged out
- [ ] View response headers in DevTools — `Content-Security-Policy` present (not Report-Only)

## 6. Quality commands

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## 7. Production webhook (later)

When you deploy, configure Razorpay webhook to `https://YOUR_DOMAIN/api/webhooks/razorpay`. Until then, localhost booking uses the dev simulate endpoint on the success page.
