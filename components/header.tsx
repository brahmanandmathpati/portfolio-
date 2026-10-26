import Link from "next/link";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="no-print sticky top-0 z-40 border-b border-border/70 bg-bg/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex min-h-11 items-center font-display text-lg font-bold tracking-tight">
          BM<span className="text-accent">.</span>
        </Link>
        <nav aria-label="Main" className="isolate flex items-center gap-1 sm:gap-2">
          <NavLinks />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
