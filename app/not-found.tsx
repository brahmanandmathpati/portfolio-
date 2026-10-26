import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-[1120px] flex-col items-start px-4 py-24 sm:px-6">
      <p className="font-display text-sm font-medium text-accent">404</p>
      <h1 className="mt-2 font-display text-4xl font-bold tracking-tight">This page doesn&apos;t exist.</h1>
      <p className="mt-4 text-muted">The link may be old, or the URL has a typo.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/" variant="primary">
          Go to homepage
        </ButtonLink>
        <ButtonLink href="/#projects">See projects</ButtonLink>
      </div>
    </section>
  );
}
