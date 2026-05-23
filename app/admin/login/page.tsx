import { AuthError } from "next-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { seedAdminIfNeeded } from "@/lib/admin/actions";
import { clearFailedLogins, isLoginLocked, recordFailedLogin } from "@/lib/auth/login-lockout";
function clientIpFromHeaders(headerList: Headers): string {
  const forwarded = headerList.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return headerList.get("x-real-ip")?.trim() ?? "127.0.0.1";
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; callbackUrl?: string }>;
}) {
  await seedAdminIfNeeded();

  const { error } = await searchParams;

  async function login(formData: FormData) {
    "use server";
    const email = String(formData.get("email") ?? "")
      .toLowerCase()
      .trim();
    const password = String(formData.get("password") ?? "");
    const headerList = await headers();
    const ip = clientIpFromHeaders(headerList);

    const lock = isLoginLocked(email, ip);
    if (lock.locked) {
      redirect("/admin/login?error=locked");
    }

    try {
      await signIn("credentials", {
        email,
        password,
        redirectTo: "/admin",
      });
      clearFailedLogins(email, ip);
    } catch (e) {
      if (e instanceof AuthError) {
        recordFailedLogin(email, ip);
        redirect("/admin/login?error=invalid");
      }
      throw e;
    }
  }

  const errorMessage =
    error === "locked"
      ? "Too many failed attempts. Try again in about 15 minutes."
      : error === "invalid"
        ? "Invalid email or password."
        : null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-sand/40 px-4">
      <div className="w-full max-w-md rounded-2xl border border-sand bg-cream p-8 shadow-sm">
        <h1 className="font-serif text-2xl font-semibold text-forest">Admin sign in</h1>
        <p className="mt-2 text-sm text-foreground/70">
          Use credentials from <code className="text-xs">ADMIN_EMAIL</code> /{" "}
          <code className="text-xs">ADMIN_PASSWORD</code> in <code className="text-xs">.env</code> (created on
          first visit).
        </p>
        {errorMessage ? (
          <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
            {errorMessage}
          </p>
        ) : null}
        <form action={login} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="username"
              className="w-full rounded-lg border border-sand px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-sand px-3 py-2"
            />
          </div>
          <button type="submit" className="w-full rounded-full bg-forest py-3 text-sm font-semibold text-cream">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
