import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";

// Notes for the site owner: visible in `npm run dev`, never rendered in production.
function Todo({ children }: { children: ReactNode }) {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <p className="mt-4 rounded-lg border border-dashed border-accent p-3 text-sm text-accent">
      TODO: {children}
    </p>
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Todo,
    h2: (props) => <h2 className="mt-12 font-display text-2xl font-semibold tracking-tight" {...props} />,
    h3: (props) => <h3 className="mt-8 font-display text-xl font-semibold" {...props} />,
    p: (props) => <p className="mt-4 leading-relaxed text-muted" {...props} />,
    ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-6 text-muted" {...props} />,
    ol: (props) => <ol className="mt-4 list-decimal space-y-2 pl-6 text-muted" {...props} />,
    strong: (props) => <strong className="font-semibold text-fg" {...props} />,
    a: (props) => <a className="text-accent underline underline-offset-4" {...props} />,
    code: (props) => <code className="rounded bg-surface px-1.5 py-0.5 text-[0.9em]" {...props} />,
    ...components,
  };
}
