import { Avatar, ProfileImage } from "@/components/avatar";
import { ContactForm } from "@/components/contact-form";
import { Counter } from "@/components/counter";
import { HeroPortrait } from "@/components/hero-portrait";
import { ArrowRightIcon, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";
import { IntroReveal } from "@/components/intro-reveal";
import { MagneticButton } from "@/components/magnetic-button";
import { Marquee } from "@/components/marquee";
import { ProjectCard } from "@/components/project-card";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { RoleRotator } from "@/components/role-rotator";
import { Timeline, TimelineItem } from "@/components/timeline";
import { Chip, Section } from "@/components/ui";
import { certifications, experience, featuredProjects, hasResumePdf, projects, site, skills } from "@/lib/content";

const socialLink =
  "inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm text-muted transition-colors hover:text-fg";

// Bento spans on the 12-column grid (desktop): 7 + 5, then 4 + 4 + 4.
const projectSpans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4", "lg:col-span-6"];
const skillSpans = ["lg:col-span-4", "lg:col-span-8", "lg:col-span-7", "lg:col-span-5", "lg:col-span-12"];

export default function Home() {
  const resumeHref = hasResumePdf() ? site.resumePdf : "/resume";
  const yearsStudying = new Date().getFullYear() - site.education.startYear;
  const stats = [
    { value: projects.length, label: "Projects shipped" },
    { value: certifications.length, label: "Certifications" },
    { value: yearsStudying, label: "Years studying CS + AI" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-[1200px] grid-cols-12 items-center gap-y-12 px-4 pb-12 pt-12 sm:px-6 md:pt-20 lg:gap-x-10 lg:pb-20">
        {/* Portrait first in the DOM so it stacks above the intro on mobile; moved right on desktop. */}
        <div className="col-span-12 lg:order-2 lg:col-span-5">
          <HeroPortrait chips={site.heroChips}>
            <ProfileImage sizes="(min-width: 1024px) 380px, (min-width: 640px) 300px, 220px" priority />
          </HeroPortrait>
        </div>
        <IntroReveal className="col-span-12 lg:order-1 lg:col-span-7">
          <p data-reveal className="font-display text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Hi, I&apos;m
          </p>
          <h1
            data-reveal
            className="mt-3 font-display text-[2.6rem] font-bold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-7xl"
          >
            {site.name}
          </h1>
          <p data-reveal className="mt-5 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Aspiring <RoleRotator roles={site.roles} />
          </p>
          <p data-reveal className="mt-4 text-lg text-fg/90">
            {site.valueLine}.
          </p>
          <p data-reveal className="mt-3 max-w-xl text-muted">
            {site.intro}
          </p>
          <div data-reveal className="mt-8 flex flex-col gap-3 sm:flex-row">
            <MagneticButton href="/#projects" variant="primary">
              View Projects <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton href={resumeHref} {...(hasResumePdf() ? { download: true } : {})}>
              <DownloadIcon className="size-4 transition-transform group-hover:translate-y-0.5" /> Download Resume
            </MagneticButton>
          </div>
          <div data-reveal className="-mx-2 mt-6 flex flex-wrap gap-x-2">
            <a href={site.links.github} target="_blank" rel="noopener noreferrer" className={socialLink}>
              <GitHubIcon /> GitHub
            </a>
            <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className={socialLink}>
              <LinkedInIcon /> LinkedIn
            </a>
            <a href={`mailto:${site.links.email}`} className={socialLink}>
              <MailIcon /> <span className="break-all">{site.links.email}</span>
            </a>
          </div>
        </IntroReveal>
      </section>

      {/* Stats */}
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <RevealGroup as="ul" className="grid grid-cols-3 gap-3 sm:gap-6">
          {stats.map((s) => (
            <RevealItem as="li" key={s.label} className="glass rounded-2xl p-4 sm:p-6">
              <p className="font-display text-3xl font-bold tracking-tight text-accent sm:text-5xl">
                <Counter value={s.value} />
              </p>
              <p className="mt-1 text-xs text-muted sm:text-sm">{s.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <Section id="projects" kicker="Selected work" title="Featured projects">
        <ul className="grid grid-cols-12 gap-5 sm:gap-6">
          {featuredProjects.map((p, i) => (
            <li
              key={p.slug}
              className={`col-span-12 md:col-span-6 ${projectSpans[i]} ${i === featuredProjects.length - 1 && featuredProjects.length % 2 === 1 ? "md:col-span-12" : ""}`}
            >
              <Reveal delay={(i % 3) * 0.06} className="h-full">
                <ProjectCard project={p} featured={i === 0} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="about" kicker="About" title="How I work">
        <div className="grid grid-cols-12 items-start gap-y-8 lg:gap-x-10">
          <Reveal className="col-span-12 sm:col-span-4 lg:col-span-3">
            <Avatar className="aspect-square w-32 sm:w-full" sizes="(min-width: 640px) 280px, 128px" shape="circle" />
          </Reveal>
          <Reveal delay={0.08} className="glass col-span-12 space-y-4 rounded-2xl p-6 text-muted sm:col-span-8 sm:p-8 lg:col-span-9">
            {site.about.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
            <p className="text-fg">
              Looking for: <strong>{site.lookingFor}</strong>. {site.relocation}.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section id="skills" kicker="Toolkit" title="Skills I can defend in an interview">
        <RevealGroup className="grid grid-cols-12 gap-5 sm:gap-6">
          {skills.map((g, i) => (
            <RevealItem
              key={g.group}
              className={`glass col-span-12 rounded-2xl p-6 md:col-span-6 ${skillSpans[i] ?? "lg:col-span-6"} ${i === skills.length - 1 ? "md:col-span-12" : ""}`}
            >
              <h3 className="font-display text-lg font-semibold">{g.group}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li key={s}>
                    <Chip>{s}</Chip>
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
        <div className="mt-8">
          <Marquee items={site.marquee} label="Tools I use" />
        </div>
      </Section>

      <Section id="experience" kicker="Journey" title="Experience & education">
        <Timeline>
          {experience.map((job) => (
            <TimelineItem key={job.role + job.org}>
              <Reveal>
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
              </Reveal>
            </TimelineItem>
          ))}
          <TimelineItem id="education">
            <Reveal>
              <h3 className="font-display text-xl font-semibold">{site.education.degree}</h3>
              <p className="text-muted">
                {site.education.school} · {site.education.university} · {site.education.years}
              </p>
              <p className="mt-3 text-sm text-muted">
                <span className="font-medium text-fg">Coursework: </span>
                {site.education.coursework.join(", ")}
              </p>
            </Reveal>
          </TimelineItem>
        </Timeline>
      </Section>

      <Section id="certifications" kicker="Credentials" title="Certifications">
        <RevealGroup as="ul" className="grid grid-cols-12 gap-5 sm:gap-6">
          {certifications.map((c) => (
            <RevealItem as="li" key={c.name} className="glass col-span-12 rounded-2xl p-6 sm:col-span-6">
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
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section id="contact" kicker="Contact" title="Let's talk">
        <div className="grid grid-cols-12 gap-y-10 lg:gap-x-10">
          <Reveal className="col-span-12 space-y-4 text-muted lg:col-span-5">
            <p>
              I&apos;m looking for {site.lookingFor.toLowerCase()}. <strong className="text-fg">{site.relocation}.</strong>
            </p>
            <ul className="-mx-2 space-y-1">
              <li>
                <a href={`mailto:${site.links.email}`} className={socialLink}>
                  <MailIcon /> <span className="break-all">{site.links.email}</span>
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
          </Reveal>
          <Reveal delay={0.08} className="glass col-span-12 rounded-2xl p-6 sm:p-8 lg:col-span-7">
            <ContactForm email={site.links.email} />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
