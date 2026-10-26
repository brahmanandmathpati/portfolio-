import fs from "node:fs";
import path from "node:path";
import site from "@/content/site.json";
import projects from "@/content/projects.json";
import skills from "@/content/skills.json";
import experience from "@/content/experience.json";
import certifications from "@/content/certifications.json";

export type Project = (typeof projects)[number];

export { site, projects, skills, experience, certifications };

const PUBLIC_DIR = path.join(process.cwd(), "public");
const IMAGE_EXT = /\.(png|jpe?g|webp|avif)$/i;

/** True when a file referenced by a public URL path (e.g. "/resume.pdf") exists. */
export function publicFileExists(urlPath: string): boolean {
  return fs.existsSync(path.join(PUBLIC_DIR, urlPath));
}

export function hasPhoto(): boolean {
  return publicFileExists(site.photo);
}

export function hasResumePdf(): boolean {
  return publicFileExists(site.resumePdf);
}

/** Screenshots in /public/projects/<slug>/, sorted by file name. The first one is the card cover. */
export function projectImages(slug: string): string[] {
  const dir = path.join(PUBLIC_DIR, "projects", slug);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => IMAGE_EXT.test(f))
    .sort()
    .map((f) => `/projects/${slug}/${f}`);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjects = projects.filter((p) => p.featured).slice(0, 6);

// Neutral 8x8 blur used while photos and screenshots load.
export const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAEklEQVR4nGNgoBLgp4nKYQ4AAJcUAKFWbW0dAAAAAElFTkSuQmCC";
