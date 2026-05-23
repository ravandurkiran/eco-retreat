import Link from "next/link";
import { siteConfig, whatsAppUrl } from "@/lib/site";

const nav = [
  { href: "/programs", label: "Programs" },
  { href: "/about/sacred-place", label: "Our Place" },
  { href: "/gallery", label: "Gallery" },
  { href: "/impact", label: "Impact" },
  { href: "/about/founder", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-sand/80 bg-cream/95 backdrop-blur">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="font-serif text-xl font-semibold text-forest">
          <span className="block leading-tight">{siteConfig.name}</span>
          <span className="block text-xs font-normal text-foreground/60">{siteConfig.tagline}</span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium lg:flex" aria-label="Main">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-foreground/80 hover:text-forest">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/book"
            className="rounded-full bg-forest px-4 py-2 text-sm font-semibold text-cream hover:bg-forest/90"
          >
            Book now
          </Link>
          <a
            href={whatsAppUrl("Hello The Eco Retreat, I would like to enquire about a retreat.")}
            className="hidden rounded-full border border-forest/30 px-3 py-2 text-sm font-medium text-forest hover:bg-sand/50 sm:inline-block"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
