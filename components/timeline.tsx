"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";

/** Vertical timeline whose accent line draws as you scroll through it. Items render as <li>. */
export function Timeline({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px bg-border" />
      <motion.div aria-hidden="true" style={{ scaleY }} className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-accent" />
      <ol ref={ref} className="space-y-10 pl-10">
        {children}
      </ol>
    </div>
  );
}

export function TimelineItem({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <li id={id} className="relative scroll-mt-24">
      <span aria-hidden="true" className="absolute -left-10 top-1.5 grid size-[15px] place-items-center rounded-full border border-accent bg-bg">
        <span className="size-[7px] rounded-full bg-accent" />
      </span>
      {children}
    </li>
  );
}
