import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { rupeesToPaise } from "../lib/razorpay";

const prisma = new PrismaClient();

function addMonths(base: Date, months: number) {
  const d = new Date(base);
  d.setUTCMonth(d.getUTCMonth() + months);
  return d;
}

function utcDate(y: number, m: number, day: number) {
  return new Date(Date.UTC(y, m - 1, day));
}

/** Generate 7-day retreats: 1st–7th of each month for next 6 months */
function sevenDayDates(from: Date, months: number) {
  const out: { start: Date; end: Date }[] = [];
  for (let i = 0; i < months; i++) {
    const ref = addMonths(from, i);
    const y = ref.getUTCFullYear();
    const m = ref.getUTCMonth() + 1;
    out.push({ start: utcDate(y, m, 1), end: utcDate(y, m, 7) });
  }
  return out;
}

/** 2nd and 4th Saturday–Sunday weekends in each month */
function weekendDates(from: Date, months: number) {
  const out: { start: Date; end: Date }[] = [];
  for (let i = 0; i < months; i++) {
    const ref = addMonths(from, i);
    const y = ref.getUTCFullYear();
    const m = ref.getUTCMonth() + 1;
    const saturdays: Date[] = [];
    for (let day = 1; day <= 31; day++) {
      const d = utcDate(y, m, day);
      if (d.getUTCMonth() !== m - 1) break;
      if (d.getUTCDay() === 6) saturdays.push(d);
    }
    if (saturdays[1]) {
      out.push({ start: saturdays[1], end: new Date(saturdays[1].getTime() + 86400000) });
    }
    if (saturdays[3]) {
      out.push({ start: saturdays[3], end: new Date(saturdays[3].getTime() + 86400000) });
    }
  }
  return out;
}

async function main() {
  const programs = [
    {
      slug: "7-day",
      title: "7-Day Program",
      description:
        "A small-group retreat for deeper reconnection through yoga, mindful living, and community participation.",
      pricePaise: rupeesToPaise(20000),
      durationDays: 7,
      capacity: 12,
      dates: sevenDayDates(new Date(), 8),
    },
    {
      slug: "weekend",
      title: "Weekend Program",
      description: "For busy schedules, with space to pause, breathe, and reset.",
      pricePaise: rupeesToPaise(8000),
      durationDays: 2,
      capacity: 12,
      dates: weekendDates(new Date(), 8),
    },
  ];

  for (const p of programs) {
    const program = await prisma.program.upsert({
      where: { slug: p.slug },
      create: {
        slug: p.slug,
        title: p.title,
        description: p.description,
        pricePaise: p.pricePaise,
        durationDays: p.durationDays,
        isActive: true,
      },
      update: {
        title: p.title,
        description: p.description,
        pricePaise: p.pricePaise,
        durationDays: p.durationDays,
        isActive: true,
      },
    });

    for (const d of p.dates) {
      await prisma.programDate.upsert({
        where: {
          programId_startDate: {
            programId: program.id,
            startDate: d.start,
          },
        },
        create: {
          programId: program.id,
          startDate: d.start,
          endDate: d.end,
          capacity: p.capacity,
        },
        update: { endDate: d.end, capacity: p.capacity },
      });
    }
  }

  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim();
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminEmail && adminPassword) {
    const passwordHash = await hash(adminPassword, 12);
    await prisma.adminUser.upsert({
      where: { email: adminEmail },
      create: { email: adminEmail, passwordHash, role: "ADMIN" },
      update: { passwordHash, role: "ADMIN" },
    });
    console.log(`Seeded admin user: ${adminEmail}`);
  } else {
    console.log("Skip admin user — set ADMIN_EMAIL and ADMIN_PASSWORD to seed");
  }

  console.log("Seeded programs and dates");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
