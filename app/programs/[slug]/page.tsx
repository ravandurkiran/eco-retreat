import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookCta } from "@/components/book-cta";
import { ContentBlocks } from "@/components/content/content-blocks";
import { PageHero } from "@/components/content/page-hero";
import { PageLayout } from "@/components/content/page-layout";
import { getProgram, programs } from "@/lib/content/programs";
import { ProgramOfferJsonLd } from "@/lib/seo/program-json-ld";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) return {};
  return {
    title: program.title,
    description: program.intro,
  };
}

export default async function ProgramPage({ params }: Props) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();

  return (
    <PageLayout>
      <ProgramOfferJsonLd program={program} />
      <PageHero kicker={program.kicker} title={program.title} intro={program.intro} compact />
      <section className="mx-auto max-w-3xl px-4 py-12">
        {program.priceInr ? (
          <p className="mb-8 rounded-lg bg-sand/50 px-4 py-3 text-sm font-medium text-earth">
            Investment: ₹{program.priceInr.toLocaleString("en-IN")} (includes accommodation, meals, and activities as
            described on our legacy program information)
          </p>
        ) : null}
        <ContentBlocks blocks={program.blocks} />
        <div className="mt-10 flex flex-wrap gap-4">
          {program.bookable ? <BookCta programSlug={program.slug} /> : null}
          <a href="/contact" className="rounded-full border border-forest/30 px-6 py-3 text-sm font-semibold text-forest">
            Enquire by email
          </a>
        </div>
      </section>
    </PageLayout>
  );
}
