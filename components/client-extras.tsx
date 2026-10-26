"use client";

import dynamic from "next/dynamic";

// Desktop-only decoration: loaded after hydration so it never weighs on first load.
const CursorGlow = dynamic(() => import("./cursor-glow"), { ssr: false });

export function ClientExtras() {
  return <CursorGlow />;
}
