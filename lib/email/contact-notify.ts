/**
 * Contact form email via Resend HTTP API (optional).
 * If EMAIL_API_KEY is unset, notifications are skipped (DB storage still works).
 */

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
};

export async function sendContactNotification(data: ContactPayload): Promise<void> {
  const apiKey = process.env.EMAIL_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.EMAIL_FROM ?? "onboarding@resend.dev";

  if (!apiKey || !to) {
    if (process.env.NODE_ENV === "development") {
      console.info("[contact] Email skipped — set EMAIL_API_KEY and CONTACT_TO_EMAIL to notify inbox");
    }
    return;
  }

  const subjectLine = data.subject
    ? `[Eco Retreat] ${data.subject} — ${data.name}`
    : `[Eco Retreat] Contact from ${data.name}`;

  const html = `
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    ${data.phone ? `<p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>` : ""}
    ${data.subject ? `<p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>` : ""}
    <p><strong>Message:</strong></p>
    <pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(data.message)}</pre>
  `.trim();

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject: subjectLine,
      html,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("[contact] Resend error", res.status, text);
    throw new Error("Email delivery failed");
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
