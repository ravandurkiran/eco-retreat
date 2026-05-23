import { BookingStatus, type Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";

type Tx = Prisma.TransactionClient;

/** Remove expired holds that never completed payment */
export async function releaseExpiredHolds() {
  const now = new Date();
  await prisma.bookingHold.deleteMany({
    where: {
      expiresAt: { lt: now },
      booking: null,
    },
  });
}

async function countAvailableSeatsTx(tx: Tx, programDateId: string) {
  const programDate = await tx.programDate.findUnique({
    where: { id: programDateId },
    include: {
      bookings: { where: { status: BookingStatus.CONFIRMED } },
      holds: {
        where: {
          expiresAt: { gt: new Date() },
          booking: null,
        },
      },
    },
  });

  if (!programDate) return 0;

  const confirmed = programDate.bookings.reduce((sum, b) => sum + b.seats, 0);
  const held = programDate.holds.reduce((sum, h) => sum + h.seats, 0);

  return Math.max(0, programDate.capacity - confirmed - held);
}

export async function getAvailableSeats(programDateId: string): Promise<number> {
  await releaseExpiredHolds();
  return prisma.$transaction((tx) => countAvailableSeatsTx(tx, programDateId));
}

export async function getAvailableSeatsInTx(tx: Tx, programDateId: string) {
  return countAvailableSeatsTx(tx, programDateId);
}
