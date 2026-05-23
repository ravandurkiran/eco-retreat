import Link from "next/link";
import { BookCta } from "@/components/book-cta";
import { ContentBlocks } from "@/components/content/content-blocks";
import { PageHero } from "@/components/content/page-hero";
import { PageLayout } from "@/components/content/page-layout";
import { homeContent } from "@/lib/content/pages";
import { programs } from "@/lib/content/programs";
import { SocialLinks } from "@/components/social-links";
import { whatsAppUrl } from "@/lib/site";

export default function Home() {
  return (
    <PageLayout>
      <PageHero
        kicker={homeContent.kicker}
        title={homeContent.title}
        intro={homeContent.intro}
        imageAlt="The Eco Retreat — natural healing space in Ravandur, Mysore"
      />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <ContentBlocks blocks={homeContent.blocks} />
        <div className="mt-12 flex flex-wrap gap-4">
          <BookCta />
          <a
            href={whatsAppUrl("Hello The Eco Retreat, I would like to learn about your programs.")}
            className="rounded-full border border-forest/30 px-6 py-3 text-sm font-semibold text-forest hover:bg-sand/50"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat on WhatsApp
          </a>
        </div>
      </section>

      <section className="bg-sand/40 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-serif text-3xl font-semibold text-forest">Retreat programs</h2>
          <p className="mt-2 max-w-2xl text-foreground/80">
            Choose the path that fits your schedule and calling.
          </p>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {programs.map((p) => (
              <li key={p.slug} className="rounded-2xl border border-sand bg-cream p-6 shadow-sm">
                <h3 className="font-serif text-xl font-semibold text-forest">{p.label}</h3>
                <p className="mt-2 text-sm text-foreground/80">{p.intro}</p>
                {p.priceInr ? (
                  <p className="mt-3 text-sm font-medium text-earth">From ₹{p.priceInr.toLocaleString("en-IN")}</p>
                ) : null}
                <Link href={`/programs/${p.slug}`} className="mt-4 inline-block text-sm font-medium text-forest underline">
                  Learn more →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <SocialLinks />
    </PageLayout>
  );
}
