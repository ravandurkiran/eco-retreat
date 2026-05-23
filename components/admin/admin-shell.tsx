import Link from "next/link";
import { signOut } from "@/auth";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/programs", label: "Programs" },
  { href: "/admin/dates", label: "Dates & capacity" },
  { href: "/admin/bookings", label: "Bookings" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/contact", label: "Contact" },
  { href: "/admin/legal/privacy", label: "Privacy policy" },
];

export function AdminShell({
  children,
  email,
}: {
  children: React.ReactNode;
  email: string;
}) {
  return (
    <div className="min-h-screen bg-sand/30">
      <header className="border-b border-sand bg-cream">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <div>
            <Link href="/admin" className="font-serif text-xl font-semibold text-forest">
              Eco Retreat Admin
            </Link>
            <p className="text-xs text-foreground/60">{email}</p>
          </div>
          <nav className="flex flex-wrap gap-3 text-sm">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="text-forest/80 hover:text-forest hover:underline">
                {l.label}
              </Link>
            ))}
          </nav>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button type="submit" className="text-sm text-foreground/70 hover:text-forest">
              Sign out
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
