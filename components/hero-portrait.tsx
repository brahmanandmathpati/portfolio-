"use client";

import {
  motion,
  useAnimate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useLayoutEffect, useState, type PointerEvent, type ReactNode } from "react";
import { introPlaying, onIntroDone } from "@/lib/intro";

const CHIP_POSITIONS = [
  { className: "-left-[4%] top-[10%]", depth: 28, delay: "0s" },
  { className: "-right-[6%] top-[24%]", depth: -22, delay: "-1.5s" },
  { className: "-left-[8%] bottom-[18%]", depth: -18, delay: "-3s" },
  { className: "-right-[2%] bottom-[6%]", depth: 24, delay: "-4.5s" },
];

function FloatingChip({ label, x, y, depth, className, delay }: {
  label: string;
  x: MotionValue<number>;
  y: MotionValue<number>;
  depth: number;
  className: string;
  delay: string;
}) {
  const px = useTransform(x, (v) => v * depth);
  const py = useTransform(y, (v) => v * depth);
  return (
    <motion.span style={{ x: px, y: py }} className={`absolute z-10 ${className}`} data-intro-chip>
      <span
        className="chip-float glass inline-block rounded-full px-3 py-1.5 font-display text-xs font-semibold text-fg sm:text-sm"
        style={{ animationDelay: delay }}
      >
        {label}
      </span>
    </motion.span>
  );
}

/**
 * Animated profile picture: blur-to-sharp entrance with a drawn accent ring (first visit, after the intro),
 * idle float, rotating conic glow, mouse tilt + shine on desktop, and parallax tech chips.
 * The server-rendered children (the photo) are already in their final state for crawlers and no-JS.
 */
export function HeroPortrait({ children, chips }: { children: ReactNode; chips: string[] }) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const reduce = useReducedMotion();
  const [interactive, setInteractive] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 150, damping: 18 });
  const sy = useSpring(my, { stiffness: 150, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [10, -10]);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setInteractive(fine && !reduce);
  }, [reduce]);

  // Entrance only runs while the intro overlay hides the hero, so repeat visits never flicker.
  useLayoutEffect(() => {
    if (reduce || !introPlaying()) return;
    const photo = scope.current.querySelector("[data-photo]");
    const ring = scope.current.querySelector("[data-ring]");
    const chipEls = scope.current.querySelectorAll("[data-intro-chip]");
    if (!photo || !ring) return;
    animate(photo, { scale: 0.9, filter: "blur(12px)" }, { duration: 0 });
    animate(ring, { strokeDashoffset: 1 }, { duration: 0 });
    animate(chipEls, { opacity: 0 }, { duration: 0 });
    return onIntroDone(() => {
      animate(photo, { scale: 1, filter: "blur(0px)" }, { duration: 0.8, ease: [0.22, 1, 0.36, 1] });
      animate(ring, { strokeDashoffset: 0 }, { duration: 1.1, delay: 0.2, ease: "easeInOut" });
      animate(chipEls, { opacity: 1 }, { duration: 0.5, delay: 0.6 });
    });
  }, [animate, reduce, scope]);

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (!interactive || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  function onPointerLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div
      ref={scope}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative mx-auto size-[220px] [perspective:900px] sm:size-[300px] lg:size-[380px]"
    >
      <div aria-hidden="true" className="hero-glow absolute -inset-[12%] rounded-full" />
      <div className="hero-float absolute inset-0">
        <motion.div style={{ rotateX, rotateY }} className="group relative size-full">
          <div data-photo className="relative size-full overflow-hidden rounded-full border border-border bg-surface shadow-2xl">
            {children}
            <span aria-hidden="true" className="shine pointer-events-none absolute inset-0" />
          </div>
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            className="pointer-events-none absolute -inset-[3%] size-[106%]"
          >
            <circle
              data-ring
              cx="50"
              cy="50"
              r="49"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="0.7"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset="0"
              transform="rotate(-90 50 50)"
            />
          </svg>
        </motion.div>
      </div>
      {chips.slice(0, CHIP_POSITIONS.length).map((label, i) => (
        <FloatingChip key={label} label={label} x={sx} y={sy} {...CHIP_POSITIONS[i]} />
      ))}
    </div>
  );
}
