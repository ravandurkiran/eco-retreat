import type { Metadata } from "next";
import { ContentBlocks } from "@/components/content/content-blocks";
import { PageHero } from "@/components/content/page-hero";
import { PageLayout } from "@/components/content/page-layout";
import { founderContent } from "@/lib/content/pages";

export const metadata: Metadata = {
  title: "Founder — Vision and History",
  description:
    "Kiran Ravandur and the vision behind The Eco Retreat and Anahata Healing Arts Center near Mysore.",
};

export default function FounderPage() {
  return (
    <PageLayout>
      <PageHero
        kicker={founderContent.kicker}
        title="Kiran Ravandur"
        intro="Founder of The Eco Retreat — vision, history, and community work in Ravandur."
        compact
      />
      <section className="mx-auto max-w-3xl px-4 py-12">
        <ContentBlocks blocks={founderContent.blocks} />
      </section>
    </PageLayout>
  );
}
