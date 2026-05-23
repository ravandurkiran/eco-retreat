import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function AdminDashboardPage() {
  const [programs, upcomingDates, bookings, contacts, galleryCount] = await Promise.all([
    prisma.program.count(),
    prisma.programDate.count({
      where: { startDate: { gte: new Date() } },
    }),
    prisma.booking.count({ where: { status: "CONFIRMED" } }),
    prisma.contactSubmission.count(),
    prisma.galleryImage.count(),
  ]);

  const recentBookings = await prisma.booking.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      programDate: { include: { program: true } },
    },
  });

  const cards = [
    { label: "Programs", value: programs, href: "/admin/programs" },
    { label: "Upcoming dates", value: upcomingDates, href: "/admin/dates" },
    { label: "Confirmed bookings", value: bookings, href: "/admin/bookings" },
    { label: "Contact messages", value: contacts, href: "/admin/contact" },
    { label: "Gallery images", value: galleryCount, href: "/admin/gallery" },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-forest">Dashboard</h1>
      <p className="mt-2 text-foreground/70">Manage programs, capacity, bookings, and site content.</p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <li key={c.href}>
            <Link
              href={c.href}
              className="block rounded-xl border border-sand bg-cream p-6 shadow-sm transition hover:border-forest/30"
            >
              <p className="text-sm text-foreground/60">{c.label}</p>
              <p className="mt-1 font-serif text-3xl font-semibold text-forest">{c.value}</p>
            </Link>
          </li>
        ))}
      </ul>

      <section className="mt-10">
        <h2 className="font-serif text-xl text-forest">Recent bookings</h2>
        {recentBookings.length === 0 ? (
          <p className="mt-4 text-sm text-foreground/60">No bookings yet.</p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-xl border border-sand bg-cream">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="border-b border-sand bg-sand/40">
                <tr>
                  <th className="px-4 py-3 font-medium">Guest</th>
                  <th className="px-4 py-3 font-medium">Program</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((b) => (
                  <tr key={b.id} className="border-b border-sand/60 last:border-0">
                    <td className="px-4 py-3">{b.guestName ?? b.guestEmail}</td>
                    <td className="px-4 py-3">{b.programDate.program.title}</td>
                    <td className="px-4 py-3">{b.status}</td>
                    <td className="px-4 py-3 text-foreground/70">
                      {b.programDate.startDate.toISOString().slice(0, 10)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
