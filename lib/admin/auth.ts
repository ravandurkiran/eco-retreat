import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }
  return session;
}

export async function requireAdminRole() {
  const session = await requireAdmin();
  if (session.user.role !== "ADMIN") {
    throw new Error("Admin role required");
  }
  return session;
}
