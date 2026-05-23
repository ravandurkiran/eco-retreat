import { updateBookingStatus } from "@/lib/admin/actions";
import { prisma } from "@/lib/db";

const statuses = ["PENDING", "CONFIRMED", "CANCELLED", "REFUNDED"] as const;

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: {
      programDate: { include: { program: true } },
    },
  });

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-forest">Bookings</h1>
      <p className="mt-2 text-sm text-foreground/70">Status changes are for operations only — payment confirmation normally comes from Razorpay webhooks.</p>

      <div className="mt-8 overflow-x-auto rounded-xl border border-sand bg-cream">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-sand bg-sand/40">
            <tr>
              <th className="px-4 py-3 font-medium">Guest</th>
              <th className="px-4 py-3 font-medium">Program</th>
              <th className="px-4 py-3 font-medium">Start</th>
              <th className="px-4 py-3 font-medium">Seats</th>
              <th className="px-4 py-3 font-medium">Payment</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b border-sand/60 align-top last:border-0">
                <td className="px-4 py-3">
                  <div>{b.guestName ?? "—"}</div>
                  <div className="text-foreground/60">{b.guestEmail}</div>
                </td>
                <td className="px-4 py-3">{b.programDate.program.title}</td>
                <td className="px-4 py-3">{b.programDate.startDate.toISOString().slice(0, 10)}</td>
                <td className="px-4 py-3">{b.seats}</td>
                <td className="px-4 py-3 font-mono text-xs">{b.paymentId ?? "—"}</td>
                <td className="px-4 py-3">
                  <form action={updateBookingStatus} className="flex items-center gap-2">
                    <input type="hidden" name="id" value={b.id} />
                    <select name="status" defaultValue={b.status} className="rounded border border-sand px-2 py-1">
                      {statuses.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <button type="submit" className="text-forest hover:underline">
                      Update
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
