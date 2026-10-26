"use client";

import { useEffect, useRef, useState } from "react";

const SIZE = 480;

/** Soft accent glow that trails the mouse. Desktop with a fine pointer only; off for reduced motion and low-end CPUs. */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const capable =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      (navigator.hardwareConcurrency ?? 8) >= 4;
    if (!capable) return;
    setOn(true);

    let frame = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (ref.current) ref.current.style.transform = `translate3d(${e.clientX - SIZE / 2}px, ${e.clientY - SIZE / 2}px, 0)`;
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (!on) return null;
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 rounded-full opacity-[0.12] blur-3xl will-change-transform"
      style={{ width: SIZE, height: SIZE, transform: "translate3d(-999px,-999px,0)", background: "radial-gradient(circle, var(--accent), transparent 65%)" }}
    />
  );
}
