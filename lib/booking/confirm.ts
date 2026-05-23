import { BookingStatus } from "@prisma/client";
import { prisma } from "@/lib/db";
import { releaseExpiredHolds } from "./availability";

export async function confirmBookingFromPayment(params: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  amountPaise: number;
}) {
  await releaseExpiredHolds();

  const hold = await prisma.bookingHold.findUnique({
    where: { razorpayOrderId: params.razorpayOrderId },
    include: {
      programDate: { include: { program: true } },
      booking: true,
    },
  });

  if (!hold) {
    throw new Error("Hold not found for order");
  }

  if (hold.booking) {
    if (hold.booking.status === BookingStatus.CONFIRMED) {
      return hold.booking;
    }
    throw new Error("Hold already has a non-confirmed booking");
  }

  if (hold.expiresAt < new Date()) {
    throw new Error("Hold expired");
  }

  const expectedAmount = hold.programDate.program.pricePaise * hold.seats;
  if (params.amountPaise !== expectedAmount) {
    throw new Error("Payment amount mismatch");
  }

  return prisma.$transaction(async (tx) => {
    const booking = await tx.booking.create({
      data: {
        programDateId: hold.programDateId,
        holdId: hold.id,
        status: BookingStatus.CONFIRMED,
        paymentId: params.razorpayPaymentId,
        seats: hold.seats,
        guestEmail: hold.guestEmail,
        guestName: hold.guestName,
      },
    });
    return booking;
  });
}

export async function releaseHoldByOrderId(razorpayOrderId: string) {
  await prisma.bookingHold.deleteMany({
    where: { razorpayOrderId, booking: null },
  });
}
