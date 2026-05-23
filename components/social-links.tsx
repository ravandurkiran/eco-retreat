const links = [
  {
    name: "Anahata Trust",
    href: "https://anahata-trust.org",
    description: "Charity work — Karunashraya & Shanthidhama",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@oneearthonemindonehumanity",
    description: "Videos from our programs",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/freedomofthemovement/",
    description: "Community updates",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/p/CTKuL4aqHCg/",
    description: "Photos and moments",
  },
];

export function SocialLinks() {
  return (
    <section className="bg-forest py-16 text-cream">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-serif text-3xl font-semibold">Follow our journey</h2>
        <p className="mt-2 max-w-xl text-cream/80">
          Stories and updates from Ravandur — embeds can be added in a later phase; links work today.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl border border-cream/20 p-4 transition hover:bg-cream/10"
              >
                <span className="font-semibold">{link.name}</span>
                <span className="mt-1 block text-sm text-cream/70">{link.description}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
