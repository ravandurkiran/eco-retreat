import { publishPrivacyPolicy } from "@/lib/admin/actions";
import { prisma } from "@/lib/db";

export default async function AdminPrivacyPage() {
  const latest = await prisma.privacyPolicyVersion.findFirst({
    orderBy: { publishedAt: "desc" },
  });
  const versions = await prisma.privacyPolicyVersion.findMany({
    orderBy: { publishedAt: "desc" },
    take: 10,
  });

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-forest">Privacy policy</h1>
      <p className="mt-2 text-sm text-foreground/70">Publishing creates a new version shown on the public privacy page.</p>

      {latest ? (
        <p className="mt-4 text-sm text-foreground/60">
          Live version: <strong>{latest.version}</strong> (published {latest.publishedAt.toLocaleDateString("en-IN")})
        </p>
      ) : (
        <p className="mt-4 text-sm text-amber-800">No published version — public page shows the static template.</p>
      )}

      <form action={publishPrivacyPolicy} className="mt-8 space-y-4 rounded-xl border border-sand bg-cream p-6">
        <label className="block text-sm">
          Version label
          <input name="version" required placeholder="May 2026" className="mt-1 w-full max-w-xs rounded-lg border border-sand px-3 py-2" />
        </label>
        <label className="block text-sm">
          Content (HTML or plain text)
          <textarea
            name="content"
            required
            rows={16}
            defaultValue={latest?.content ?? ""}
            className="mt-1 w-full rounded-lg border border-sand px-3 py-2 font-mono text-sm"
          />
        </label>
        <button type="submit" className="rounded-full bg-forest px-5 py-2 text-sm font-semibold text-cream">
          Publish new version
        </button>
      </form>

      {versions.length > 0 ? (
        <section className="mt-10">
          <h2 className="font-serif text-xl text-forest">Previous versions</h2>
          <ul className="mt-4 space-y-2 text-sm text-foreground/70">
            {versions.map((v) => (
              <li key={v.id}>
                {v.version} — {v.publishedAt.toLocaleDateString("en-IN")}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
