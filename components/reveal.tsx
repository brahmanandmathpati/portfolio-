"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/** Subtle fade-up once when scrolled into view. Disabled for prefers-reduced-motion via MotionConfig. */
export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
