import { prisma } from "@/lib/db";

export default async function AdminContactPage() {
  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-forest">Contact submissions</h1>
      <p className="mt-2 text-sm text-foreground/70">Messages from the public contact form.</p>

      <ul className="mt-8 space-y-4">
        {submissions.map((s) => (
          <li key={s.id} className="rounded-xl border border-sand bg-cream p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-medium text-forest">{s.name}</h2>
              <time className="text-xs text-foreground/50">{s.createdAt.toLocaleString("en-IN")}</time>
            </div>
            <p className="mt-1 text-sm">
              <a href={`mailto:${s.email}`} className="text-forest hover:underline">
                {s.email}
              </a>
              {s.phone ? <span className="text-foreground/60"> · {s.phone}</span> : null}
            </p>
            {s.subject ? <p className="mt-2 text-sm font-medium">{s.subject}</p> : null}
            <p className="mt-2 whitespace-pre-wrap text-sm text-foreground/85">{s.message}</p>
          </li>
        ))}
      </ul>
      {submissions.length === 0 ? <p className="mt-6 text-sm text-foreground/60">No submissions yet.</p> : null}
    </div>
  );
}
