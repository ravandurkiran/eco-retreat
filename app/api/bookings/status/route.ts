import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const querySchema = z.object({
  holdId: z.string().min(1),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = querySchema.safeParse({ holdId: searchParams.get("holdId") });
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid holdId" }, { status: 400 });
  }

  const hold = await prisma.bookingHold.findUnique({
    where: { id: parsed.data.holdId },
    include: {
      booking: true,
      programDate: { include: { program: true } },
    },
  });

  if (!hold) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    status: hold.booking?.status ?? "pending",
    confirmed: hold.booking?.status === "CONFIRMED",
    programTitle: hold.programDate.program.title,
    startDate: hold.programDate.startDate.toISOString().slice(0, 10),
    seats: hold.seats,
    guestEmail: hold.guestEmail,
  });
}
