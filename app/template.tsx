"use client";

import { motion } from "motion/react";
import { useEffect, type ReactNode } from "react";

// The first page load renders without an entrance (keeps LCP fast); later route changes fade/slide in.
let hasNavigated = false;

export default function Template({ children }: { children: ReactNode }) {
  const animateIn = hasNavigated;
  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <motion.div
      initial={animateIn ? { opacity: 0, y: 10 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
