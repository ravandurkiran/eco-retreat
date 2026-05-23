import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { sendContactNotification } from "@/lib/email/contact-notify";
import { checkRateLimit, getClientIp, rateLimitResponse } from "@/lib/rate-limit";

const schema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  phone: z.string().max(40).optional(),
  subject: z.string().max(100).optional(),
  message: z.string().min(1).max(5000),
  website: z.string().max(0).optional(),
});

const CONTACT_LIMIT = 5;
const CONTACT_WINDOW_MS = 60 * 60 * 1000;

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limited = checkRateLimit("contact", ip, CONTACT_LIMIT, CONTACT_WINDOW_MS);
  if (!limited.ok) {
    return rateLimitResponse(limited.retryAfterSec);
  }

  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid form data" }, { status: 400 });
    }
    if (parsed.data.website) {
      return NextResponse.json({ ok: true });
    }

    await prisma.contactSubmission.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        subject: parsed.data.subject,
        message: parsed.data.message,
      },
    });

    try {
      await sendContactNotification(parsed.data);
    } catch (emailError) {
      console.error("contact email notify failed", emailError);
      /* submission saved — do not fail the user */
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("contact form error", error);
    if (error instanceof Error && error.message.includes("Can't reach database")) {
      return NextResponse.json(
        {
          ok: false,
          error: "Message service is not configured yet. Please email us or use WhatsApp.",
        },
        { status: 503 },
      );
    }
    return NextResponse.json({ ok: false, error: "Unable to send message" }, { status: 500 });
  }
}
