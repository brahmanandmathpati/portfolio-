"use client";

import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { INTRO_KEY, markIntroDone } from "@/lib/intro";

type Phase = "idle" | "draw" | "exit" | "done";

// Geometric "B" and "M" drawn as single strokes in a 100 x 60 box.
const B_PATH = "M12 8 V52 M12 8 H28 A11 11 0 0 1 28 30 H12 M12 30 H30 A11 11 0 0 1 30 52 H12";
const M_PATH = "M54 52 V8 L71 33 L88 8 V52";

const EXIT_AT = 1850;
const DONE_AT = 2450;
const panelEase = [0.76, 0, 0.24, 1] as const;

export function IntroLoader({ name }: { name: string }) {
  const [phase, setPhase] = useState<Phase>("idle");

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      // Private mode or blocked storage: the intro just plays again next time.
    }
    document.documentElement.classList.remove("intro-play");
    setPhase("done");
    markIntroDone();
  }, []);

  useEffect(() => {
    if (!document.documentElement.classList.contains("intro-play")) {
      setPhase("done");
      markIntroDone();
      return;
    }
    setPhase("draw");
    const exitTimer = setTimeout(() => setPhase("exit"), EXIT_AT);
    const doneTimer = setTimeout(finish, DONE_AT);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && finish();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      window.removeEventListener("keydown", onKey);
    };
  }, [finish]);

  if (phase === "done") return null;

  const run = phase !== "idle";
  const exiting = phase === "exit";

  return (
    <div className="intro-overlay fixed inset-0 z-[100] items-center justify-center">
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1/2 bg-bg"
        animate={{ y: exiting ? "-100%" : 0 }}
        transition={{ duration: 0.55, ease: panelEase }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/2 bg-bg"
        animate={{ y: exiting ? "100%" : 0 }}
        transition={{ duration: 0.55, ease: panelEase }}
      />

      <motion.div
        aria-hidden="true"
        className="relative flex flex-col items-center"
        animate={exiting ? { opacity: 0, scale: 0.96 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <svg
          viewBox="0 0 100 60"
          className="w-28 sm:w-36"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path d={B_PATH} initial={{ pathLength: 0 }} animate={run ? { pathLength: 1 } : {}} transition={{ duration: 0.8, ease: "easeInOut" }} />
          <motion.path d={M_PATH} initial={{ pathLength: 0 }} animate={run ? { pathLength: 1 } : {}} transition={{ duration: 0.7, ease: "easeInOut", delay: 0.25 }} />
        </svg>
        <div className="mt-6 h-px w-40 overflow-hidden bg-border">
          <motion.div
            className="h-full origin-left bg-accent"
            initial={{ scaleX: 0 }}
            animate={run ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeInOut" }}
          />
        </div>
        <p className="mt-5 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          {[...name].map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: 12 }}
              animate={run ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 + i * 0.025, duration: 0.3, ease: "easeOut" }}
            >
              {ch === " " ? " " : ch}
            </motion.span>
          ))}
        </p>
      </motion.div>

      <button
        type="button"
        onClick={finish}
        className="absolute bottom-6 right-6 inline-flex min-h-11 items-center rounded-lg px-4 text-sm text-muted hover:text-fg"
      >
        Skip intro
      </button>
    </div>
  );
}
