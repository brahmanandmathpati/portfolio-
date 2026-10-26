import Image from "next/image";
import Link from "next/link";
import { BLUR_DATA_URL, projectImages, type Project } from "@/lib/content";
import { ArrowUpRightIcon } from "./icons";
import { Chip } from "./ui";

export function ProjectCover({ project, sizes }: { project: Project; sizes: string }) {
  const cover = projectImages(project.slug)[0];
  return (
    <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-surface">
      {cover ? (
        <Image
          src={cover}
          alt={`Screenshot of ${project.title}`}
          fill
          sizes={sizes}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="object-cover object-top"
        />
      ) : (
        <div aria-hidden="true" className="flex h-full items-end p-5">
          <span className="font-display text-xl font-semibold leading-tight text-muted">{project.title}</span>
        </div>
      )}
    </div>
  );
}

const linkStyle =
  "inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2 text-sm font-semibold text-accent hover:underline underline-offset-4";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-bg transition-colors hover:border-accent">
      <ProjectCover project={project} sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw" />
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted">{project.context}</p>
          <h3 className="mt-1 font-display text-xl font-semibold tracking-tight">
            <Link href={`/projects/${project.slug}`} className="-my-2.5 block py-2.5 hover:text-accent">
              {project.title}
            </Link>
          </h3>
        </div>
        <p className="flex-1 text-sm text-muted">{project.problem}</p>
        <ul className="flex flex-wrap gap-2" aria-label="Tech used">
          {project.tags.map((t) => (
            <li key={t}>
              <Chip>{t}</Chip>
            </li>
          ))}
        </ul>
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
  );
}
