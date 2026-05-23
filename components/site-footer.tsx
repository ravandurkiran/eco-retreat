import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-sand bg-sand/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-foreground/80 md:flex-row md:justify-between">
        <div>
          <p className="font-serif text-lg font-semibold text-forest">{siteConfig.name}</p>
          <p className="mt-1">{siteConfig.tagline}</p>
          <p className="mt-2">{siteConfig.contact.address.street}</p>
          <p>
            {siteConfig.contact.address.locality}, {siteConfig.contact.address.postalCode}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/faq" className="hover:text-forest">
            Guidelines
          </Link>
          <Link href="/privacy" className="hover:text-forest">
            Privacy Policy
          </Link>
          <Link href="/contact" className="hover:text-forest">
            Contact
          </Link>
          <a
            href="https://anahata-trust.org"
            className="hover:text-forest"
            target="_blank"
            rel="noopener noreferrer"
          >
            Anahata Charitable Trust
          </a>
        </div>
      </div>
      <p className="border-t border-sand px-4 py-4 text-center text-xs text-foreground/60">
        © {year} {siteConfig.name}. All rights reserved.
      </p>
    </footer>
  );
}
