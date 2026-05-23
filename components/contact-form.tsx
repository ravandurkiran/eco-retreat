"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone") || undefined,
          subject: data.get("subject") || undefined,
          message: data.get("message"),
          website: data.get("website"),
        }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        throw new Error(json.error ?? "Something went wrong");
      }
      setStatus("success");
      setMessage("Thank you. We will get back to you soon.");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Failed to send message");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium">
          Name *
        </label>
        <input
          id="name"
          name="name"
          required
          className="w-full rounded-lg border border-sand bg-white px-4 py-2"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium">
          Email *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-sand bg-white px-4 py-2"
        />
      </div>
      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium">
          Phone
        </label>
        <input id="phone" name="phone" type="tel" className="w-full rounded-lg border border-sand bg-white px-4 py-2" />
      </div>
      <div>
        <label htmlFor="subject" className="mb-1 block text-sm font-medium">
          Subject
        </label>
        <select id="subject" name="subject" className="w-full rounded-lg border border-sand bg-white px-4 py-2">
          <option value="general">General enquiry</option>
          <option value="booking">Booking question</option>
          <option value="stay">Stay with us</option>
          <option value="support">Support / donate</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-lg border border-sand bg-white px-4 py-2"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send message"}
      </button>
      {message ? (
        <p className={`text-sm ${status === "error" ? "text-red-700" : "text-forest"}`} role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}
