import { NextResponse } from "next/server";
import { releaseHoldByOrderId, confirmBookingFromPayment } from "@/lib/booking/confirm";
import { prisma } from "@/lib/db";
import { verifyWebhookSignature } from "@/lib/razorpay";

export const runtime = "nodejs";

type RazorpayWebhookPayload = {
  event: string;
  payload?: {
    payment?: {
      entity?: {
        id?: string;
        order_id?: string;
        amount?: number;
        status?: string;
      };
    };
  };
};

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("x-razorpay-signature") ?? "";

  if (!verifyWebhookSignature(body, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  let payload: RazorpayWebhookPayload;
  try {
    payload = JSON.parse(body) as RazorpayWebhookPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const eventId = request.headers.get("x-razorpay-event-id") ?? `${payload.event}-${Date.now()}`;

  const existing = await prisma.webhookEvent.findUnique({ where: { id: eventId } });
  if (existing?.processed) {
    return NextResponse.json({ ok: true, duplicate: true });
  }

  await prisma.webhookEvent.upsert({
    where: { id: eventId },
    create: { id: eventId, processed: false },
    update: {},
  });

  try {
    if (payload.event === "payment.captured") {
      const payment = payload.payload?.payment?.entity;
      const orderId = payment?.order_id;
      const paymentId = payment?.id;
      const amount = payment?.amount;

      if (!orderId || !paymentId || amount == null) {
        throw new Error("Missing payment fields");
      }

      await confirmBookingFromPayment({
        razorpayOrderId: orderId,
        razorpayPaymentId: paymentId,
        amountPaise: amount,
      });
    }

    if (payload.event === "payment.failed") {
      const orderId = payload.payload?.payment?.entity?.order_id;
      if (orderId) {
        await releaseHoldByOrderId(orderId);
      }
    }

    await prisma.webhookEvent.update({
      where: { id: eventId },
      data: { processed: true },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("webhook processing error", error);
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }
}
