import Image from "next/image";
import Link from "next/link";
import { BLUR_DATA_URL, projectImages, type Project } from "@/lib/content";
import { ArrowUpRightIcon } from "./icons";
import { RevealGroup, RevealItem } from "./reveal";
import { TiltCard } from "./tilt-card";
import { Chip } from "./ui";

export function ProjectCover({ project, sizes, tall = false }: { project: Project; sizes: string; tall?: boolean }) {
  const cover = projectImages(project.slug)[0];
  return (
    <div className={`relative overflow-hidden border-b border-border bg-surface ${tall ? "aspect-[16/10] lg:aspect-[16/9]" : "aspect-[16/10]"}`}>
      {cover ? (
        <Image
          src={cover}
          alt={`Screenshot of ${project.title}`}
          fill
          sizes={sizes}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        // Placeholder until a screenshot is added to /public/projects/<slug>/
        <div
          aria-hidden="true"
          className="flex h-full items-end bg-[radial-gradient(circle_at_20%_20%,color-mix(in_srgb,var(--accent)_18%,transparent),transparent_55%),radial-gradient(circle_at_85%_80%,color-mix(in_srgb,var(--secondary)_16%,transparent),transparent_55%)] p-5 transition-transform duration-700 ease-out group-hover:scale-105"
        >
          <span className="font-display text-xl font-semibold leading-tight text-muted">{project.title}</span>
        </div>
      )}
    </div>
  );
}

const linkStyle =
  "inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2 text-sm font-semibold text-accent hover:underline underline-offset-4";

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <TiltCard>
      <article className="glass flex h-full flex-col overflow-hidden rounded-2xl transition-colors group-hover:border-accent/60">
        <ProjectCover
          project={project}
          tall={featured}
          sizes={featured ? "(min-width: 1024px) 680px, (min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"}
        />
        <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted">{project.context}</p>
            <h3 className={`mt-1 font-display font-semibold tracking-tight ${featured ? "text-2xl" : "text-xl"}`}>
              <Link href={`/projects/${project.slug}`} className="-my-2.5 block py-2.5 hover:text-accent">
                {project.title}
              </Link>
            </h3>
          </div>
          <p className="flex-1 text-sm text-muted">{project.problem}</p>
          <RevealGroup as="ul" className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <RevealItem as="li" key={t}>
                <Chip>{t}</Chip>
              </RevealItem>
            ))}
          </RevealGroup>
          <div className="-mx-2 flex flex-wrap items-center gap-x-2 border-t border-border pt-2">
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className={linkStyle}>
                Live <ArrowUpRightIcon />
                <span className="sr-only">(opens {project.title} demo in a new tab)</span>
              </a>
            )}
            <a href={project.github} target="_blank" rel="noopener noreferrer" className={linkStyle}>
              GitHub <ArrowUpRightIcon />
              <span className="sr-only">(opens {project.title} repository in a new tab)</span>
            </a>
            <Link href={`/projects/${project.slug}`} className={linkStyle}>
              Case study<span className="sr-only">: {project.title}</span>
            </Link>
          </div>
        </div>
      </article>
    </TiltCard>
  );
}
