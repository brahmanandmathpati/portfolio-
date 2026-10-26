import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: "primary" | "ghost" };

export function ButtonLink({ variant = "ghost", className = "", ...props }: ButtonLinkProps) {
  const styles =
    variant === "primary"
      ? "bg-accent text-accent-fg border-accent hover:opacity-90"
      : "border-border text-fg hover:border-accent";
  return (
    <Link
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-5 text-sm font-semibold transition ${styles} ${className}`}
      {...props}
    />
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-border bg-surface px-2.5 py-1 text-xs text-muted">
      {children}
    </span>
  );
}

export function Section({
  id,
  title,
  kicker,
  children,
}: {
  id: string;
  title: string;
  kicker?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6 sm:py-24">
      {kicker && <p className="mb-2 text-sm font-medium text-accent">{kicker}</p>}
      <h2 id={`${id}-title`} className="mb-10 font-display text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {children}
    </section>
  );
}
