import Link from "next/link";

export function BookCta({ programSlug }: { programSlug?: string }) {
  const href = programSlug ? `/book?program=${programSlug}` : "/book";
  return (
    <Link
      href={href}
      className="inline-flex rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream hover:bg-forest/90"
    >
      Book your retreat
    </Link>
  );
}
