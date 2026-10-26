"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { ComponentProps, PointerEvent } from "react";
import { buttonClass } from "./ui";

const MotionLink = motion.create(Link);

type Props = ComponentProps<typeof Link> & { variant?: "primary" | "ghost" };

/** Button-styled link that leans toward the mouse (fine pointers only). Put an icon with `group-hover:translate-x-1` inside for the arrow slide. */
export function MagneticButton({ variant = "ghost", className = "", children, ...props }: Props) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 15, mass: 0.4 });

  function onPointerMove(e: PointerEvent<HTMLAnchorElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <MotionLink
      {...(props as ComponentProps<typeof MotionLink>)}
      style={{ x: sx, y: sy }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      className={`group ${buttonClass(variant)} ${className}`}
    >
      {children}
    </MotionLink>
  );
}
