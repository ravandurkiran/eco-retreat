import type { Metadata } from "next";
import Link from "next/link";
import { ContentBlocks } from "@/components/content/content-blocks";
import { PageHero } from "@/components/content/page-hero";
import { PageLayout } from "@/components/content/page-layout";
import { whatWeOfferContent } from "@/lib/content/pages";
import { programs } from "@/lib/content/programs";

export const metadata: Metadata = {
  title: "Retreat Programs",
  description:
    "7-day yoga retreat, weekend program, and stay-with-us options at The Eco Retreat near Mysore, Karnataka.",
};

export default function ProgramsPage() {
  return (
    <PageLayout>
      <PageHero
        kicker={whatWeOfferContent.kicker}
        title={whatWeOfferContent.title}
        intro={whatWeOfferContent.intro}
        compact
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <ContentBlocks blocks={whatWeOfferContent.blocks} />
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="font-serif text-2xl font-semibold text-forest">Programs</h2>
        <ul className="mt-6 grid gap-6 md:grid-cols-3">
          {programs.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/programs/${p.slug}`}
                className="block rounded-2xl border border-sand bg-white p-6 transition hover:border-forest/30 hover:shadow-md"
              >
                <h3 className="font-serif text-xl text-forest">{p.label}</h3>
                <p className="mt-2 text-sm text-foreground/80 line-clamp-3">{p.intro}</p>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/faq" className="mt-8 inline-block text-forest underline">
          Guidelines and rules →
        </Link>
      </section>
    </PageLayout>
  );
}
