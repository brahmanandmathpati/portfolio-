import type { Metadata } from "next";
import { certifications, experience, featuredProjects, hasResumePdf, site, skills } from "@/lib/content";
import { PrintButton } from "./print-button";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${site.name}: ${site.role}.`,
  alternates: { canonical: "/resume" },
};

const h2 = "mt-8 border-b border-border pb-1 font-display text-lg font-semibold uppercase tracking-wide print:mt-5";

export default function Resume() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 text-[15px] sm:px-6 print:max-w-none print:p-0 print:text-[11pt]">
      <div className="no-print mb-8 flex flex-wrap gap-3">
        <PrintButton />
        {hasResumePdf() && (
          <a
            href={site.resumePdf}
            download
            className="inline-flex min-h-11 items-center rounded-lg border border-border px-5 text-sm font-semibold hover:border-accent"
          >
            Download PDF
          </a>
        )}
      </div>

      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight">{site.name}</h1>
        <p className="mt-1 text-muted">{site.role}</p>
        <p className="mt-2 text-sm text-muted">
          {site.location} · {site.links.email} · {site.links.github.replace("https://", "")} ·{" "}
          {site.links.linkedin.replace("https://www.", "")} · {site.url.replace("https://", "")}
        </p>
      </header>

      <h2 className={h2}>Summary</h2>
      <p className="mt-2">{site.intro}</p>

      <h2 className={h2}>Experience</h2>
      {experience.map((job) => (
        <div key={job.role + job.org} className="mt-3 break-inside-avoid">
          <p className="font-semibold">
            {job.role}, {job.org}
            {job.dates && <span className="font-normal text-muted"> · {job.dates}</span>}
          </p>
          <ul className="mt-1 list-disc pl-5">
            {job.points.map((pt) => (
              <li key={pt}>{pt}</li>
            ))}
          </ul>
        </div>
      ))}

      <h2 className={h2}>Projects</h2>
      {featuredProjects.map((p) => (
        <div key={p.slug} className="mt-3 break-inside-avoid">
          <p className="font-semibold">
            {p.title} <span className="font-normal text-muted">· {p.tags.join(", ")}</span>
          </p>
          <p>{p.summary}</p>
        </div>
      ))}

      <h2 className={h2}>Skills</h2>
      <ul className="mt-2 space-y-1">
        {skills.map((g) => (
          <li key={g.group}>
            <span className="font-semibold">{g.group}:</span> {g.items.join(", ")}
          </li>
        ))}
      </ul>

      <h2 className={h2}>Education</h2>
      <p className="mt-2 font-semibold">{site.education.degree}</p>
      <p>
        {site.education.school} ({site.education.university}) · {site.education.years}
      </p>

      <h2 className={h2}>Certifications</h2>
      <ul className="mt-2 list-disc pl-5">
        {certifications.map((c) => (
          <li key={c.name}>
            {c.name}, {c.issuer} ({c.year})
          </li>
        ))}
      </ul>
    </div>
  );
}
