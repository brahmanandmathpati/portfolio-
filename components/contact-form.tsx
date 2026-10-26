"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { CheckIcon, SendIcon } from "./icons";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "mt-1.5 block w-full rounded-xl border border-border bg-bg/70 px-3.5 py-3 text-base text-fg placeholder:text-muted/70 transition-colors focus:border-accent";

const buttonContent: Record<"idle" | "sending" | "sent", { label: string }> = {
  idle: { label: "Send message" },
  sending: { label: "Sending…" },
  sent: { label: "Sent" },
};

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
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
    }
  }

  const visual = status === "error" ? "idle" : status;

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
          className="group relative inline-flex min-h-11 min-w-44 items-center justify-center overflow-hidden rounded-xl border border-accent bg-accent px-5 text-sm font-semibold text-accent-fg transition-shadow hover:shadow-[0_8px_30px_-8px_var(--accent)] disabled:opacity-80"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={visual}
              className="inline-flex items-center gap-2"
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {visual === "idle" && <SendIcon className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
              {visual === "sending" && (
                <motion.span animate={{ x: [0, 4, 0], y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}>
                  <SendIcon />
                </motion.span>
              )}
              {visual === "sent" && <CheckIcon />}
              {buttonContent[visual].label}
            </motion.span>
          </AnimatePresence>
        </button>
        <p role="status" aria-live="polite" className="text-sm text-muted">
          {status === "sent" && "Thanks! I'll reply within a couple of days."}
          {status === "error" && `Something went wrong. Please email ${email} directly.`}
        </p>
      </div>
    </form>
  );
}
