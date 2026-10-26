"use client";

import { useState, type FormEvent } from "react";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "mt-1.5 block w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-base text-fg placeholder:text-muted/70 focus:border-accent";

export function ContactForm({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Without a Formspree ID, fall back to the visitor's email app.
    if (!FORMSPREE_ID) {
      const subject = encodeURIComponent(`Portfolio message from ${data.get("name")}`);
      const body = encodeURIComponent(`${data.get("message")}\n\n${data.get("name")} <${data.get("email")}>`);
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium">
          Name
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="text-sm font-medium">
          Email
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
      </div>
      <label className="text-sm font-medium">
        Message
        <textarea name="message" required rows={5} className={field} />
      </label>
      {/* Honeypot for bots; Formspree ignores submissions that fill it. */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-accent bg-accent px-5 text-sm font-semibold text-accent-fg transition hover:opacity-90 disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        <p role="status" aria-live="polite" className="text-sm text-muted">
          {status === "sent" && "Thanks! I'll reply within a couple of days."}
          {status === "error" && `Something went wrong. Please email ${email} directly.`}
        </p>
      </div>
    </form>
  );
}
