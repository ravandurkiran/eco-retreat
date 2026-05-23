import Image from "next/image";

export function PageHero({
  kicker,
  title,
  intro,
  imageSrc = "/images/placeholders/hero.svg",
  imageAlt,
  compact,
}: {
  kicker?: string;
  title: string;
  intro?: string;
  imageSrc?: string;
  imageAlt?: string;
  compact?: boolean;
}) {
  return (
    <section
      className={`relative bg-forest text-cream ${compact ? "min-h-[40vh]" : "min-h-[50vh] md:min-h-[60vh]"}`}
    >
      <Image
        src={imageSrc}
        alt={imageAlt ?? title}
        fill
        priority={!compact}
        className="object-cover opacity-45"
        sizes="100vw"
      />
      <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-28 md:pb-16 md:pt-32">
        {kicker ? (
          <p className="text-sm font-medium uppercase tracking-widest text-sage">{kicker}</p>
        ) : null}
        <h1 className="mt-2 max-w-3xl font-serif text-4xl font-semibold leading-tight md:text-5xl">{title}</h1>
        {intro ? <p className="mt-4 max-w-2xl text-lg text-cream/90">{intro}</p> : null}
      </div>
    </section>
  );
}
