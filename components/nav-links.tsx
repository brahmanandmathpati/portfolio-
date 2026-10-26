"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const items = [
  { href: "/#projects", label: "Projects", section: "projects", mobile: true },
  { href: "/#skills", label: "Skills", section: "skills", mobile: false },
  { href: "/#experience", label: "Experience", section: "experience", mobile: false },
  { href: "/resume", label: "Resume", section: null, mobile: false },
  { href: "/#contact", label: "Contact", section: "contact", mobile: true },
];

/** Nav links with a sliding pill under the section currently in view. */
export function NavLinks() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }
    const els = items
      .map((i) => (i.section ? document.getElementById(i.section) : null))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveSection(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <>
      {items.map((item) => {
        const active = item.section ? item.section === activeSection : pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? (item.section ? "location" : "page") : undefined}
            className={`${item.mobile ? "flex" : "hidden md:flex"} relative min-h-11 items-center rounded-lg px-3 text-sm transition-colors ${
              active ? "text-fg" : "text-muted hover:text-fg"
            }`}
          >
            {active && (
              <motion.span
                layoutId="nav-pill"
                aria-hidden="true"
                className="absolute inset-x-0 inset-y-1.5 -z-10 rounded-lg border border-border bg-surface"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            {item.label}
          </Link>
        );
      })}
    </>
  );
}
