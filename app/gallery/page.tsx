import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/content/page-hero";
import { PageLayout } from "@/components/content/page-layout";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from The Eco Retreat and our natural healing space in Ravandur, Mysore.",
};

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const images = await prisma.galleryImage.findMany({ orderBy: { sortOrder: "asc" } });
  const hasDbImages = images.length > 0;

  const placeholders = Array.from({ length: 9 }, (_, i) => ({
    id: `placeholder-${i + 1}`,
    alt: `The Eco Retreat — gallery photo ${i + 1}`,
  }));

  return (
    <PageLayout>
      <PageHero
        kicker="Gallery"
        title="Moments at Anahata"
        intro={
          hasDbImages
            ? "Photos from our retreat and community."
            : "Photos from our retreat — upload images in admin to replace placeholders."
        }
        compact
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {hasDbImages
            ? images.map((item) => (
                <li key={item.id} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-sand">
                  <Image
                    src={item.url}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                    loading="lazy"
                  />
                </li>
              ))
            : placeholders.map((item) => (
                <li key={item.id} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-sand">
                  <Image
                    src="/images/placeholders/hero.svg"
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                    loading="lazy"
                  />
                </li>
              ))}
        </ul>
      </section>
    </PageLayout>
  );
}
