"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex min-h-11 items-center rounded-lg border border-accent bg-accent px-5 text-sm font-semibold text-accent-fg hover:opacity-90"
    >
      Print / Save as PDF
    </button>
  );
}
