import Image from "next/image";
import { BLUR_DATA_URL, hasPhoto, site } from "@/lib/content";

/** Profile photo from content/site.json filling its parent, or a "BM" placeholder until the file exists. */
export function ProfileImage({ sizes, priority = false }: { sizes: string; priority?: boolean }) {
  if (!hasPhoto()) {
    return (
      <div role="img" aria-label={site.name} className="grid size-full place-items-center bg-surface">
        <span className="font-display text-5xl font-bold tracking-tight text-accent sm:text-6xl">{site.shortName}</span>
      </div>
    );
  }
  return (
    <Image
      src={site.photo}
      alt={site.name}
      fill
      sizes={sizes}
      priority={priority}
      placeholder="blur"
      blurDataURL={BLUR_DATA_URL}
      className="object-cover"
    />
  );
}

type AvatarProps = { className: string; sizes: string; priority?: boolean; shape?: "circle" | "rounded" };

export function Avatar({ className, sizes, priority = false, shape = "rounded" }: AvatarProps) {
  const radius = shape === "circle" ? "rounded-full" : "rounded-3xl";
  return (
    <div className={`relative overflow-hidden border-2 border-accent shadow-lg shadow-black/10 ${radius} ${className}`}>
      <ProfileImage sizes={sizes} priority={priority} />
    </div>
  );
}
