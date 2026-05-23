import { deleteProgram, upsertProgram } from "@/lib/admin/actions";
import { prisma } from "@/lib/db";

function formatInr(paise: number) {
  return (paise / 100).toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
}

export default async function AdminProgramsPage() {
  const programs = await prisma.program.findMany({ orderBy: { title: "asc" } });

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-forest">Programs</h1>
      <p className="mt-2 text-sm text-foreground/70">Prices are in INR. Public program pages use static content; booking uses these records.</p>

      <ul className="mt-8 space-y-4">
        {programs.map((p) => (
          <li key={p.id} className="rounded-xl border border-sand bg-cream p-6">
            <form action={upsertProgram} className="grid gap-4 md:grid-cols-2">
              <input type="hidden" name="id" value={p.id} />
              <label className="block text-sm">
                Slug
                <input name="slug" defaultValue={p.slug} required className="mt-1 w-full rounded-lg border border-sand px-3 py-2" />
              </label>
              <label className="block text-sm">
                Title
                <input name="title" defaultValue={p.title} required className="mt-1 w-full rounded-lg border border-sand px-3 py-2" />
              </label>
              <label className="block text-sm md:col-span-2">
                Description
                <textarea name="description" defaultValue={p.description} required rows={3} className="mt-1 w-full rounded-lg border border-sand px-3 py-2" />
              </label>
              <label className="block text-sm">
                Price (INR)
                <input name="priceInr" type="number" defaultValue={p.pricePaise / 100} required className="mt-1 w-full rounded-lg border border-sand px-3 py-2" />
              </label>
              <label className="block text-sm">
                Duration (days)
                <input name="durationDays" type="number" defaultValue={p.durationDays ?? ""} className="mt-1 w-full rounded-lg border border-sand px-3 py-2" />
              </label>
              <label className="flex items-center gap-2 text-sm md:col-span-2">
                <input type="checkbox" name="isActive" defaultChecked={p.isActive} />
                Active for booking
              </label>
              <div className="flex flex-wrap gap-3 md:col-span-2">
                <button type="submit" className="rounded-full bg-forest px-5 py-2 text-sm font-semibold text-cream">
                  Save
                </button>
              </div>
            </form>
            <form action={deleteProgram} className="mt-3">
              <input type="hidden" name="id" value={p.id} />
              <button type="submit" className="text-sm text-red-700 hover:underline">
                Delete program
              </button>
            </form>
            <p className="mt-2 text-xs text-foreground/50">Current price: {formatInr(p.pricePaise)}</p>
          </li>
        ))}
      </ul>

      <section className="mt-10 rounded-xl border border-dashed border-forest/30 bg-cream/80 p-6">
        <h2 className="font-serif text-xl text-forest">Add program</h2>
        <form action={upsertProgram} className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="block text-sm">
            Slug
            <input name="slug" required placeholder="new-program" className="mt-1 w-full rounded-lg border border-sand px-3 py-2" />
          </label>
          <label className="block text-sm">
            Title
            <input name="title" required className="mt-1 w-full rounded-lg border border-sand px-3 py-2" />
          </label>
          <label className="block text-sm md:col-span-2">
            Description
            <textarea name="description" required rows={3} className="mt-1 w-full rounded-lg border border-sand px-3 py-2" />
          </label>
          <label className="block text-sm">
            Price (INR)
            <input name="priceInr" type="number" required className="mt-1 w-full rounded-lg border border-sand px-3 py-2" />
          </label>
          <label className="block text-sm">
            Duration (days)
            <input name="durationDays" type="number" className="mt-1 w-full rounded-lg border border-sand px-3 py-2" />
          </label>
          <label className="flex items-center gap-2 text-sm md:col-span-2">
            <input type="checkbox" name="isActive" defaultChecked />
            Active for booking
          </label>
          <button type="submit" className="rounded-full bg-forest px-5 py-2 text-sm font-semibold text-cream md:col-span-2 md:w-fit">
            Create program
          </button>
        </form>
      </section>
    </div>
  );
}
