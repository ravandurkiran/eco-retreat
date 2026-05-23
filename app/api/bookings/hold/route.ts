import { NextResponse } from "next/server";
import { z } from "zod";
import { HOLD_TTL_MINUTES, MAX_SEATS_PER_BOOKING } from "@/lib/booking/constants";
import { getAvailableSeats, getAvailableSeatsInTx, releaseExpiredHolds } from "@/lib/booking/availability";
import { prisma } from "@/lib/db";
import { getPublicKeyId, getRazorpayClient, isRazorpayConfigured } from "@/lib/razorpay";
import { checkRateLimit, getClientIp, rateLimitResponse } from "@/lib/rate-limit";

const bodySchema = z.object({
  programDateId: z.string().min(1),
  guestEmail: z.string().email(),
  guestName: z.string().min(1).max(200),
  seats: z.number().int().min(1).max(MAX_SEATS_PER_BOOKING),
});

const HOLD_LIMIT = 10;
const HOLD_WINDOW_MS = 60 * 60 * 1000;

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limited = checkRateLimit("booking-hold", ip, HOLD_LIMIT, HOLD_WINDOW_MS);
  if (!limited.ok) {
    return rateLimitResponse(limited.retryAfterSec);
  }

  if (!isRazorpayConfigured()) {
    return NextResponse.json(
      { error: "Online payment is not configured. Please contact us via WhatsApp." },
      { status: 503 },
    );
  }

  try {
    const json = await request.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid booking data" }, { status: 400 });
    }

    await releaseExpiredHolds();

    const { programDateId, guestEmail, guestName, seats } = parsed.data;

    const emailLimited = checkRateLimit(
      "booking-hold-email",
      guestEmail.toLowerCase(),
      5,
      HOLD_WINDOW_MS,
    );
    if (!emailLimited.ok) {
      return rateLimitResponse(emailLimited.retryAfterSec);
    }

    const available = await getAvailableSeats(programDateId);
    if (seats > available) {
      return NextResponse.json({ error: "Not enough seats available" }, { status: 409 });
    }

    const programDate = await prisma.programDate.findUnique({
      where: { id: programDateId },
      include: { program: true },
    });
    if (!programDate || !programDate.program.isActive) {
      return NextResponse.json({ error: "Program date not found" }, { status: 404 });
    }

    const amountPaise = programDate.program.pricePaise * seats;
    const expiresAt = new Date(Date.now() + HOLD_TTL_MINUTES * 60 * 1000);

    const hold = await prisma.$transaction(
      async (tx) => {
        const freshAvailable = await getAvailableSeatsInTx(tx, programDateId);
        if (seats > freshAvailable) {
          throw new Error("SEATS_UNAVAILABLE");
        }

        const created = await tx.bookingHold.create({
          data: {
            programDateId,
            guestEmail,
            guestName,
            seats,
            expiresAt,
          },
        });

        try {
          const razorpay = getRazorpayClient();
          const order = await razorpay.orders.create({
            amount: amountPaise,
            currency: "INR",
            receipt: created.id,
            notes: {
              holdId: created.id,
              programSlug: programDate.program.slug,
            },
          });

          return tx.bookingHold.update({
            where: { id: created.id },
            data: { razorpayOrderId: order.id },
          });
        } catch (orderError) {
          await tx.bookingHold.delete({ where: { id: created.id } });
          throw orderError;
        }
      },
      { isolationLevel: "Serializable" },
    );

    return NextResponse.json({
      holdId: hold.id,
      orderId: hold.razorpayOrderId,
      amount: amountPaise,
      currency: "INR",
      keyId: getPublicKeyId(),
      expiresAt: hold.expiresAt.toISOString(),
      programTitle: programDate.program.title,
      guestName,
      guestEmail,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "SEATS_UNAVAILABLE") {
      return NextResponse.json({ error: "Not enough seats available" }, { status: 409 });
    }
    console.error("hold error", error);
    return NextResponse.json({ error: "Unable to create booking hold" }, { status: 500 });
  }
}
