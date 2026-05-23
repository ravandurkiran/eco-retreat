import type { Metadata } from "next";
import Link from "next/link";
import { ContentBlocks } from "@/components/content/content-blocks";
import { PageHero } from "@/components/content/page-hero";
import { PageLayout } from "@/components/content/page-layout";
import { karunashrayaContent, shantiDhamaContent } from "@/lib/content/pages";

export const metadata: Metadata = {
  title: "Our Impact",
  description:
    "Shanti Dhama and Karunashraya — community projects supported through The Eco Retreat and Anahata Charitable Trust.",
};

export default function ImpactPage() {
  return (
    <PageLayout>
      <PageHero
        kicker="Community"
        title="Retreats that support real change"
        intro="Your participation helps fund Shanti Dhama and Karunashraya in Ravandur."
        compact
      />
      <section className="mx-auto max-w-6xl space-y-16 px-4 py-12">
        <article>
          <h2 className="font-serif text-3xl font-semibold text-forest">{shantiDhamaContent.title}</h2>
          <p className="mt-2 text-lg text-foreground/80">{shantiDhamaContent.intro}</p>
          <div className="mt-6">
            <ContentBlocks blocks={shantiDhamaContent.blocks} />
          </div>
        </article>
        <article>
          <h2 className="font-serif text-3xl font-semibold text-forest">{karunashrayaContent.title}</h2>
          <p className="mt-2 text-lg text-foreground/80">{karunashrayaContent.intro}</p>
          <div className="mt-6">
            <ContentBlocks blocks={karunashrayaContent.blocks} />
          </div>
        </article>
        <div className="rounded-2xl border border-sand bg-sand/30 p-8 text-center">
          <p className="text-lg text-foreground/90">
            Learn more about Anahata Charitable Trust&apos;s work, donations, and volunteering.
          </p>
          <a
            href="https://anahata-trust.org"
            className="mt-4 inline-block rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Anahata Trust →
          </a>
        </div>
        <p className="text-center text-sm text-foreground/70">
          <Link href="/programs" className="text-forest underline">
            Join a retreat
          </Link>{" "}
          to support these projects directly.
        </p>
      </section>
    </PageLayout>
  );
}
