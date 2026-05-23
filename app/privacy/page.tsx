import type { Metadata } from "next";
import { PageLayout } from "@/components/content/page-layout";
import { prisma } from "@/lib/db";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for The Eco Retreat website — bookings, contact, and payments.",
};

export const dynamic = "force-dynamic";

export default async function PrivacyPage() {
  const published = await prisma.privacyPolicyVersion.findFirst({
    orderBy: { publishedAt: "desc" },
  });

  if (published) {
    return (
      <PageLayout>
        <main className="mx-auto max-w-3xl px-4 py-16">
          <h1 className="font-serif text-4xl font-semibold text-forest">Privacy Policy</h1>
          <p className="mt-2 text-sm text-foreground/70">
            Version {published.version} · Last updated:{" "}
            {published.publishedAt.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
          </p>
          <div
            className="prose prose-neutral mt-8 max-w-none text-foreground/90"
            dangerouslySetInnerHTML={{ __html: published.content }}
          />
        </main>
      </PageLayout>
    );
  }

  const updated = "May 2026";
  return (
    <PageLayout>
      <main className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="font-serif text-4xl font-semibold text-forest">Privacy Policy</h1>
        <p className="mt-2 text-sm text-foreground/70">Last updated: {updated}</p>
        <div className="mt-8 space-y-6 text-foreground/90">
          <p className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            This is a draft template for review with a qualified lawyer before production use. Publish a version in
            admin to replace this page.
          </p>
          <section>
            <h2 className="font-serif text-xl text-forest">Who we are</h2>
            <p className="mt-2">
              {siteConfig.name} ({siteConfig.tagline}) operates this website. Contact: theecoretreat@gmail.com.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-forest">Data we collect</h2>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Contact form: name, email, phone (optional), message</li>
              <li>Booking: guest details needed to reserve and confirm your retreat</li>
              <li>Payments: processed by Razorpay — we do not store card numbers on our servers</li>
              <li>Analytics (if enabled with consent): anonymised usage data</li>
            </ul>
          </section>
          <section id="cookies">
            <h2 className="font-serif text-xl text-forest">Cookies</h2>
            <p className="mt-2">
              Essential cookies support sign-in, booking, and security. Optional analytics (Plausible or Google Analytics)
              load only after you choose &quot;Accept analytics&quot; in the cookie banner. You can decline and still use
              the site.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-forest">Your rights</h2>
            <p className="mt-2">
              You may request access, correction, or deletion of your personal data by emailing us at
              theecoretreat@gmail.com.
            </p>
          </section>
        </div>
      </main>
    </PageLayout>
  );
}
