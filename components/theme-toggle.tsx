"use client";

import { useTheme } from "next-themes";
import type { MouseEvent } from "react";
import { MoonIcon, SunIcon } from "./icons";

type ViewTransitionDoc = Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  function toggle(e: MouseEvent<HTMLButtonElement>) {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    const doc = document as ViewTransitionDoc;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!doc.startViewTransition || reduce) {
      setTheme(next);
      return;
    }

    // Circular reveal from the button, using the View Transitions API where supported.
    const x = e.clientX || window.innerWidth - 40;
    const y = e.clientY || 32;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const transition = doc.startViewTransition(() => {
      const root = document.documentElement;
      root.classList.toggle("dark", next === "dark");
      root.classList.toggle("light", next === "light");
      root.style.colorScheme = next;
      setTheme(next);
    });
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 450, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="grid size-11 place-items-center rounded-xl border border-border text-fg transition-colors hover:border-accent"
    >
      {/* Both icons render on the server; CSS picks one, so there's no hydration flash. */}
      <SunIcon className="hidden size-5 dark:block" />
      <MoonIcon className="size-5 dark:hidden" />
    </button>
  );
}
