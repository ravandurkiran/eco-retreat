import type { Metadata } from "next";
import { ContentBlocks } from "@/components/content/content-blocks";
import { PageHero } from "@/components/content/page-hero";
import { PageLayout } from "@/components/content/page-layout";
import { sacredPlaceContent } from "@/lib/content/pages";

export const metadata: Metadata = {
  title: "Our Sacred Place",
  description: "Anahata — a sacred land near Mysore where nature, simplicity, and healing come together.",
};

export default function SacredPlacePage() {
  return (
    <PageLayout>
      <PageHero
        kicker={sacredPlaceContent.kicker}
        title={sacredPlaceContent.title}
        intro={sacredPlaceContent.intro}
        compact
      />
      <section className="mx-auto max-w-3xl px-4 py-12">
        <ContentBlocks blocks={sacredPlaceContent.blocks} />
      </section>
    </PageLayout>
  );
}
