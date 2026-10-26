import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRightIcon } from "@/components/icons";
import { ProjectCover } from "@/components/project-card";
import { ButtonLink, Chip } from "@/components/ui";
import { BLUR_DATA_URL, getProject, projectImages, projects } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.problem,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { default: Body } = await import(`@/content/case-studies/${slug}.mdx`);
  const screenshots = projectImages(slug);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Link href="/#projects" className="inline-flex min-h-11 items-center text-sm text-muted hover:text-fg">
        ← All projects
      </Link>
      <p className="mt-6 text-sm font-medium text-accent">{project.context}</p>
      <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">{project.title}</h1>
      <p className="mt-4 text-lg text-muted">{project.summary}</p>
      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tech used">
        {project.tags.map((t) => (
          <li key={t}>
            <Chip>{t}</Chip>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {project.live && (
          <ButtonLink href={project.live} target="_blank" rel="noopener noreferrer" variant="primary">
            Live demo <ArrowUpRightIcon />
          </ButtonLink>
        )}
        <ButtonLink href={project.github} target="_blank" rel="noopener noreferrer">
          GitHub <ArrowUpRightIcon />
        </ButtonLink>
      </div>

      {screenshots.length > 0 && (
        <div className="mt-10 overflow-hidden rounded-2xl border border-border">
          <ProjectCover project={project} sizes="(min-width: 768px) 720px, 100vw" />
        </div>
      )}

      <Body />

      {screenshots.length > 1 && (
        <section aria-labelledby="screens" className="mt-12">
          <h2 id="screens" className="font-display text-2xl font-semibold tracking-tight">
            Screenshots
          </h2>
          <div className="mt-6 grid gap-6">
            {screenshots.slice(1).map((src, i) => (
              <div key={src} className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-surface">
                <Image
                  src={src}
                  alt={`${project.title} screenshot ${i + 2}`}
                  fill
                  sizes="(min-width: 768px) 720px, 100vw"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
