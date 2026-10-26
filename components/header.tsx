import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

const nav = [
  { href: "/#projects", label: "Projects", mobile: true },
  { href: "/#skills", label: "Skills", mobile: false },
  { href: "/#experience", label: "Experience", mobile: false },
  { href: "/resume", label: "Resume", mobile: false },
  { href: "/#contact", label: "Contact", mobile: true },
];

export function Header() {
  return (
    <header className="no-print sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex min-h-11 items-center font-display text-lg font-bold tracking-tight">
          BM<span className="text-accent">.</span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1 sm:gap-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${item.mobile ? "flex" : "hidden md:flex"} min-h-11 items-center rounded-lg px-3 text-sm text-muted transition-colors hover:text-fg`}
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
