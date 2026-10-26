import { site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="no-print border-t border-border">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:justify-between sm:px-6">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <p>{site.relocation}</p>
      </div>
    </footer>
  );
}
