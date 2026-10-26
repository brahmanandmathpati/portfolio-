"use client";

import { stagger, useAnimate, useReducedMotion } from "motion/react";
import { useLayoutEffect, type ReactNode } from "react";
import { introPlaying, onIntroDone } from "@/lib/intro";

/**
 * Staggers in descendants marked `data-reveal` once the intro finishes.
 * Only hides them while the intro overlay covers the page, so the hero text is never invisible otherwise
 * (keeps LCP fast and content readable without JS).
 */
export function IntroReveal({ children, className }: { children: ReactNode; className?: string }) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const reduce = useReducedMotion();

  useLayoutEffect(() => {
    if (reduce || !introPlaying()) return;
    const items = scope.current.querySelectorAll("[data-reveal]");
    animate(items, { opacity: 0, y: 24 }, { duration: 0 });
    return onIntroDone(() => {
      animate(items, { opacity: 1, y: 0 }, { duration: 0.55, delay: stagger(0.07, { startDelay: 0.15 }), ease: [0.22, 1, 0.36, 1] });
    });
  }, [animate, reduce, scope]);

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
