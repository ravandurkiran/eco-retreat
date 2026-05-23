import type { Metadata } from "next";
import { ContentBlocks } from "@/components/content/content-blocks";
import { PageHero } from "@/components/content/page-hero";
import { PageLayout } from "@/components/content/page-layout";
import { guidelinesContent } from "@/lib/content/pages";

export const metadata: Metadata = {
  title: "Guidelines & FAQ",
  description: "Guidelines and rules for guests at The Eco Retreat — peaceful, mindful Ashram atmosphere.",
};

export default function FaqPage() {
  return (
    <PageLayout>
      <PageHero
        kicker={guidelinesContent.kicker}
        title={guidelinesContent.title}
        intro={guidelinesContent.intro}
        compact
      />
      <section className="mx-auto max-w-3xl px-4 py-12">
        <ContentBlocks blocks={guidelinesContent.blocks} />
      </section>
    </PageLayout>
  );
}
