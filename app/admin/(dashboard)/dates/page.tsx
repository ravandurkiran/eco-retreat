import { deleteProgramDate, upsertProgramDate } from "@/lib/admin/actions";
import { prisma } from "@/lib/db";

function toInputDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export default async function AdminDatesPage() {
  const cutoff = new Date();
  cutoff.setUTCDate(cutoff.getUTCDate() - 30);

  const [programs, dates] = await Promise.all([
    prisma.program.findMany({ orderBy: { title: "asc" } }),
    prisma.programDate.findMany({
      where: { startDate: { gte: cutoff } },
      orderBy: { startDate: "asc" },
      include: { program: true, bookings: true, holds: true },
    }),
  ]);

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-forest">Dates & capacity</h1>
      <p className="mt-2 text-sm text-foreground/70">Adjust capacity for upcoming retreats. Booked seats reduce availability on the public booking flow.</p>

      <section className="mt-8 rounded-xl border border-dashed border-forest/30 bg-cream/80 p-6">
        <h2 className="font-serif text-xl text-forest">Add date</h2>
        <form action={upsertProgramDate} className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="block text-sm md:col-span-2">
            Program
            <select name="programId" required className="mt-1 w-full rounded-lg border border-sand px-3 py-2">
              {programs.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            Start date
            <input name="startDate" type="date" required className="mt-1 w-full rounded-lg border border-sand px-3 py-2" />
          </label>
          <label className="block text-sm">
            End date (optional)
            <input name="endDate" type="date" className="mt-1 w-full rounded-lg border border-sand px-3 py-2" />
          </label>
          <label className="block text-sm">
            Capacity
            <input name="capacity" type="number" defaultValue={12} min={1} required className="mt-1 w-full rounded-lg border border-sand px-3 py-2" />
          </label>
          <button type="submit" className="rounded-full bg-forest px-5 py-2 text-sm font-semibold text-cream md:col-span-2 md:w-fit">
            Add date
          </button>
        </form>
      </section>

      <div className="mt-8 overflow-x-auto rounded-xl border border-sand bg-cream">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-sand bg-sand/40">
            <tr>
              <th className="px-4 py-3 font-medium">Program</th>
              <th className="px-4 py-3 font-medium">Start</th>
              <th className="px-4 py-3 font-medium">End</th>
              <th className="px-4 py-3 font-medium">Capacity</th>
              <th className="px-4 py-3 font-medium">Booked</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dates.map((d) => {
              const booked = d.bookings.filter((b) => b.status === "CONFIRMED").reduce((s, b) => s + b.seats, 0);
              return (
                <tr key={d.id} className="border-b border-sand/60 align-top last:border-0">
                  <td className="px-4 py-3">{d.program.title}</td>
                  <td className="px-4 py-3">{toInputDate(d.startDate)}</td>
                  <td className="px-4 py-3">{d.endDate ? toInputDate(d.endDate) : "—"}</td>
                  <td className="px-4 py-3">
                    <form action={upsertProgramDate} className="flex items-center gap-2">
                      <input type="hidden" name="id" value={d.id} />
                      <input type="hidden" name="programId" value={d.programId} />
                      <input type="hidden" name="startDate" value={toInputDate(d.startDate)} />
                      <input type="hidden" name="endDate" value={d.endDate ? toInputDate(d.endDate) : ""} />
                      <input name="capacity" type="number" defaultValue={d.capacity} min={1} className="w-20 rounded border border-sand px-2 py-1" />
                      <button type="submit" className="text-forest hover:underline">
                        Save
                      </button>
                    </form>
                  </td>
                  <td className="px-4 py-3">{booked}</td>
                  <td className="px-4 py-3">
                    <form action={deleteProgramDate}>
                      <input type="hidden" name="id" value={d.id} />
                      <button type="submit" className="text-red-700 hover:underline">
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
