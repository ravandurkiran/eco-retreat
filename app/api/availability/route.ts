import { NextResponse } from "next/server";
import { z } from "zod";
import { getAvailableSeats, releaseExpiredHolds } from "@/lib/booking/availability";
import { prisma } from "@/lib/db";

const querySchema = z.object({
  programSlug: z.string().min(1),
  month: z.string().regex(/^\d{4}-\d{2}$/).optional(),
});

export async function GET(request: Request) {
  try {
    await releaseExpiredHolds();
    const { searchParams } = new URL(request.url);
    const parsed = querySchema.safeParse({
      programSlug: searchParams.get("programSlug"),
      month: searchParams.get("month") ?? undefined,
    });
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid query" }, { status: 400 });
    }

    const program = await prisma.program.findFirst({
      where: { slug: parsed.data.programSlug, isActive: true },
    });
    if (!program) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 });
    }

    let monthStart: Date | undefined;
    let monthEnd: Date | undefined;
    if (parsed.data.month) {
      const [y, m] = parsed.data.month.split("-").map(Number);
      monthStart = new Date(Date.UTC(y, m - 1, 1));
      monthEnd = new Date(Date.UTC(y, m, 1));
    } else {
      const now = new Date();
      monthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
      monthEnd = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 4, 1));
    }

    const dates = await prisma.programDate.findMany({
      where: {
        programId: program.id,
        startDate: { gte: monthStart, lt: monthEnd },
      },
      orderBy: { startDate: "asc" },
    });

    const result = await Promise.all(
      dates.map(async (d) => {
        const available = await getAvailableSeats(d.id);
        return {
          id: d.id,
          startDate: d.startDate.toISOString().slice(0, 10),
          endDate: d.endDate?.toISOString().slice(0, 10) ?? null,
          capacity: d.capacity,
          available,
          priceInr: program.pricePaise / 100,
          programTitle: program.title,
        };
      }),
    );

    return NextResponse.json({
      program: { slug: program.slug, title: program.title, pricePaise: program.pricePaise },
      dates: result.filter((d) => d.available > 0),
    });
  } catch (error) {
    console.error("availability error", error);
    return NextResponse.json(
      { error: "Availability service unavailable. Configure DATABASE_URL and run migrations." },
      { status: 503 },
    );
  }
}
