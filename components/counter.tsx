"use client";

import { useEffect, useRef } from "react";

const DURATION = 1200;

/** Counts up from 0 when visible. Server HTML holds the final value; width is reserved so nothing shifts. */
export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const final = `${value}${suffix}`;

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    el.textContent = `0${suffix}`;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / DURATION, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = `${Math.round(eased * value)}${suffix}`;
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = final;
    };
  }, [final, suffix, value]);

  return (
    <span ref={ref} className="inline-block tabular-nums" style={{ minWidth: `${final.length}ch` }}>
      {final}
    </span>
  );
}
