"use server";

import { revalidatePath } from "next/cache";
import { hash } from "bcryptjs";
import { z } from "zod";
import { requireAdminRole } from "@/lib/admin/auth";
import { prisma } from "@/lib/db";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const programSchema = z.object({
  id: z.string().optional(),
  slug: z.string().min(1).max(80),
  title: z.string().min(1).max(200),
  description: z.string().min(1),
  priceInr: z.coerce.number().positive(),
  durationDays: z.coerce.number().int().positive().optional(),
  isActive: z.coerce.boolean(),
});

const dateSchema = z.object({
  id: z.string().optional(),
  programId: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().optional(),
  capacity: z.coerce.number().int().min(1).max(100),
});

const privacySchema = z.object({
  version: z.string().min(1).max(40),
  content: z.string().min(10),
});

export async function upsertProgram(formData: FormData) {
  await requireAdminRole();
  const parsed = programSchema.parse({
    id: formData.get("id") || undefined,
    slug: formData.get("slug"),
    title: formData.get("title"),
    description: formData.get("description"),
    priceInr: formData.get("priceInr"),
    durationDays: formData.get("durationDays") || undefined,
    isActive: formData.get("isActive") === "on",
  });

  const data = {
    slug: parsed.slug,
    title: parsed.title,
    description: parsed.description,
    pricePaise: Math.round(parsed.priceInr * 100),
    durationDays: parsed.durationDays ?? null,
    isActive: parsed.isActive,
  };

  if (parsed.id) {
    await prisma.program.update({ where: { id: parsed.id }, data });
  } else {
    await prisma.program.create({ data });
  }

  revalidatePath("/admin/programs");
  revalidatePath("/programs");
}

export async function deleteProgram(formData: FormData) {
  await requireAdminRole();
  const id = z.string().parse(formData.get("id"));
  await prisma.program.delete({ where: { id } });
  revalidatePath("/admin/programs");
}

export async function upsertProgramDate(formData: FormData) {
  await requireAdminRole();
  const parsed = dateSchema.parse({
    id: formData.get("id") || undefined,
    programId: formData.get("programId"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate") || undefined,
    capacity: formData.get("capacity"),
  });

  const startDate = new Date(parsed.startDate);
  const endDate = parsed.endDate ? new Date(parsed.endDate) : null;

  if (parsed.id) {
    await prisma.programDate.update({
      where: { id: parsed.id },
      data: { capacity: parsed.capacity, endDate },
    });
  } else {
    await prisma.programDate.create({
      data: {
        programId: parsed.programId,
        startDate,
        endDate,
        capacity: parsed.capacity,
      },
    });
  }

  revalidatePath("/admin/dates");
  revalidatePath("/book");
}

export async function deleteProgramDate(formData: FormData) {
  await requireAdminRole();
  const id = z.string().parse(formData.get("id"));
  await prisma.programDate.delete({ where: { id } });
  revalidatePath("/admin/dates");
}

export async function updateBookingStatus(formData: FormData) {
  await requireAdminRole();
  const id = z.string().parse(formData.get("id"));
  const status = z.enum(["PENDING", "CONFIRMED", "CANCELLED", "REFUNDED"]).parse(formData.get("status"));
  await prisma.booking.update({ where: { id }, data: { status } });
  revalidatePath("/admin/bookings");
}

export async function publishPrivacyPolicy(formData: FormData) {
  await requireAdminRole();
  const parsed = privacySchema.parse({
    version: formData.get("version"),
    content: formData.get("content"),
  });
  await prisma.privacyPolicyVersion.create({
    data: { version: parsed.version, content: parsed.content },
  });
  revalidatePath("/admin/legal/privacy");
  revalidatePath("/privacy");
}

export async function uploadGalleryImage(formData: FormData) {
  await requireAdminRole();
  const file = formData.get("file");
  const alt = z.string().min(1).max(300).parse(formData.get("alt") ?? "Eco Retreat photo");

  if (!(file instanceof File) || file.size === 0) {
    throw new Error("No file provided");
  }
  if (file.size > 2 * 1024 * 1024) {
    throw new Error("File must be under 2MB");
  }
  const allowed = ["image/jpeg", "image/png", "image/webp"];
  if (!allowed.includes(file.type)) {
    throw new Error("Only JPEG, PNG, and WebP allowed");
  }

  const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const filename = `${randomUUID()}.${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", "gallery");
  await mkdir(uploadDir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadDir, filename), buffer);

  const maxOrder = await prisma.galleryImage.aggregate({ _max: { sortOrder: true } });
  const url = `/uploads/gallery/${filename}`;

  await prisma.galleryImage.create({
    data: { url, alt, sortOrder: (maxOrder._max.sortOrder ?? 0) + 1 },
  });

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

export async function deleteGalleryImage(formData: FormData) {
  await requireAdminRole();
  const id = z.string().parse(formData.get("id"));
  await prisma.galleryImage.delete({ where: { id } });
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

export async function seedAdminIfNeeded() {
  const email = process.env.ADMIN_EMAIL?.toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) return { created: false };

  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (existing) return { created: false };

  const passwordHash = await hash(password, 12);
  await prisma.adminUser.create({
    data: { email, passwordHash, role: "ADMIN" },
  });
  return { created: true };
}
