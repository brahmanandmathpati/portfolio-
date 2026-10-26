"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/** Vertical-slide rotating roles. Every role is laid out invisibly to reserve the widest width (no layout shift). */
export function RoleRotator({ roles }: { roles: string[] }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((v) => (v + 1) % roles.length), 2400);
    return () => clearInterval(id);
  }, [reduce, roles.length]);

  return (
    <span className="relative inline-grid align-bottom">
      <span className="sr-only">{roles.join(", ")}</span>
      {roles.map((r) => (
        <span key={r} aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-nowrap">
          {r}
        </span>
      ))}
      <span aria-hidden="true" className="col-start-1 row-start-1 overflow-hidden pb-[0.12em]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={roles[i]}
            className="block whitespace-nowrap text-accent"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {roles[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
