import { NextResponse } from "next/server";
import { z } from "zod";
import { confirmBookingFromPayment } from "@/lib/booking/confirm";
import { prisma } from "@/lib/db";
const bodySchema = z.object({
  holdId: z.string().min(1),
});

/** Development only — simulates Razorpay webhook when tunnel is not set up */
export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid holdId" }, { status: 400 });
  }

  const hold = await prisma.bookingHold.findUnique({
    where: { id: parsed.data.holdId },
    include: { programDate: { include: { program: true } }, booking: true },
  });

  if (!hold?.razorpayOrderId) {
    return NextResponse.json({ error: "Hold not found" }, { status: 404 });
  }
  if (hold.booking) {
    return NextResponse.json({ ok: true, alreadyConfirmed: true });
  }

  const amountPaise = hold.programDate.program.pricePaise * hold.seats;

  await confirmBookingFromPayment({
    razorpayOrderId: hold.razorpayOrderId,
    razorpayPaymentId: `dev_sim_${hold.id}`,
    amountPaise,
  });

  return NextResponse.json({ ok: true, simulated: true });
}
