import { Avatar } from "@/components/avatar";
import { ContactForm } from "@/components/contact-form";
import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { ButtonLink, Chip, Section } from "@/components/ui";
import { certifications, experience, featuredProjects, hasResumePdf, site, skills } from "@/lib/content";

const socialLink =
  "inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm text-muted transition-colors hover:text-fg";

export default function Home() {
  const resumeHref = hasResumePdf() ? site.resumePdf : "/resume";

  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-[1120px] items-center gap-10 px-4 pb-16 pt-12 sm:px-6 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] md:gap-16 md:pt-20">
        {/* Photo first in the DOM so it stacks above the intro on mobile; moved right on desktop. */}
        <Avatar
          className="aspect-square w-40 sm:w-56 md:order-2 md:w-full md:max-w-sm md:justify-self-end"
          sizes="(min-width: 768px) 384px, 224px"
          priority
        />
        <div className="md:order-1">
          <p className="text-sm font-medium text-accent">{site.role}</p>
          <h1 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-[56px]">
            {site.name}
          </h1>
          <p className="mt-5 font-display text-xl text-fg sm:text-2xl">{site.valueLine}.</p>
          <p className="mt-4 max-w-prose text-muted">{site.intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/#projects" variant="primary">
              View Projects
            </ButtonLink>
            <ButtonLink href={resumeHref} {...(hasResumePdf() ? { download: true } : {})}>
              <DownloadIcon /> Download Resume
            </ButtonLink>
          </div>
          <div className="-mx-2 mt-6 flex flex-wrap gap-x-2">
            <a href={site.links.github} target="_blank" rel="noopener noreferrer" className={socialLink}>
              <GitHubIcon /> GitHub
            </a>
            <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className={socialLink}>
              <LinkedInIcon /> LinkedIn
            </a>
            <a href={`mailto:${site.links.email}`} className={socialLink}>
              <MailIcon /> {site.links.email}
            </a>
          </div>
        </div>
      </section>

      <Section id="projects" kicker="Selected work" title="Featured projects">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((p, i) => (
            <li key={p.slug}>
              <Reveal delay={(i % 3) * 0.05}>
                <ProjectCard project={p} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="about" kicker="About" title="How I work">
        <div className="grid items-start gap-10 md:grid-cols-[200px_1fr]">
          <Avatar className="aspect-square w-32 md:w-full" sizes="200px" shape="circle" />
          <div className="max-w-prose space-y-4 text-muted">
            {site.about.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
            <p className="text-fg">
              Looking for: <strong>{site.lookingFor}</strong>. {site.relocation}.
            </p>
          </div>
        </div>
      </Section>

      <Section id="skills" kicker="Toolkit" title="Skills">
        <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((g) => (
            <div key={g.group}>
              <dt className="font-display text-lg font-semibold">{g.group}</dt>
              <dd className="mt-3 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="experience" kicker="Experience" title="Where I've worked">
        <ol className="space-y-10 border-l border-border pl-6">
          {experience.map((job) => (
            <li key={job.role + job.org} className="relative">
              <span aria-hidden="true" className="absolute -left-[31px] top-2 size-2.5 rounded-full bg-accent" />
              <h3 className="font-display text-xl font-semibold">{job.role}</h3>
              <p className="text-muted">
                {job.org}
                {job.dates && ` · ${job.dates}`}
                {job.location && ` · ${job.location}`}
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted">
                {job.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="certifications" kicker="Credentials" title="Certifications">
        <ul className="grid gap-4 sm:grid-cols-2">
          {certifications.map((c) => (
            <li key={c.name} className="rounded-2xl border border-border p-5">
              <p className="font-semibold">
                {c.url ? (
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                    {c.name}
                  </a>
                ) : (
                  c.name
                )}
              </p>
              <p className="mt-1 text-sm text-muted">
                {c.issuer} · {c.year}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="education" kicker="Education" title="Education">
        <div className="rounded-2xl border border-border p-6">
          <h3 className="font-display text-xl font-semibold">{site.education.degree}</h3>
          <p className="mt-1 text-muted">
            {site.education.school} · {site.education.university}
          </p>
          <p className="mt-1 text-sm text-muted">{site.education.years}</p>
          <p className="mt-4 text-sm text-muted">
            <span className="font-medium text-fg">Coursework: </span>
            {site.education.coursework.join(", ")}
          </p>
        </div>
      </Section>

      <Section id="contact" kicker="Contact" title="Let's talk">
        <div className="grid gap-12 md:grid-cols-[1fr_1.3fr]">
          <div className="space-y-4 text-muted">
            <p>
              I&apos;m looking for {site.lookingFor.toLowerCase()}. <strong className="text-fg">{site.relocation}.</strong>
            </p>
            <ul className="-mx-2 space-y-1">
              <li>
                <a href={`mailto:${site.links.email}`} className={socialLink}>
                  <MailIcon /> {site.links.email}
                </a>
              </li>
              <li>
                <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className={socialLink}>
                  <LinkedInIcon /> LinkedIn
                </a>
              </li>
              <li>
                <a href={site.links.github} target="_blank" rel="noopener noreferrer" className={socialLink}>
                  <GitHubIcon /> GitHub
                </a>
              </li>
            </ul>
          </div>
          <ContactForm email={site.links.email} />
        </div>
      </Section>
    </>
  );
}
