import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function buttonClass(variant: "primary" | "ghost" = "ghost") {
  const styles =
    variant === "primary"
      ? "bg-accent text-accent-fg border-accent hover:shadow-[0_8px_30px_-8px_var(--accent)]"
      : "glass text-fg hover:border-accent";
  return `inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-5 text-sm font-semibold transition-[border-color,box-shadow] ${styles}`;
}

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: "primary" | "ghost" };

export function ButtonLink({ variant = "ghost", className = "", ...props }: ButtonLinkProps) {
  return <Link className={`${buttonClass(variant)} ${className}`} {...props} />;
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-bg/60 px-2.5 py-1 text-xs text-muted">
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
    <section id={id} aria-labelledby={`${id}-title`} className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24">
      {kicker && <p className="mb-3 font-display text-sm font-medium uppercase tracking-[0.2em] text-accent">{kicker}</p>}
      <h2 id={`${id}-title`} className="mb-10 max-w-3xl font-display text-3xl font-bold tracking-tight sm:mb-12 sm:text-5xl">
        {title}
      </h2>
      {children}
    </section>
  );
}
