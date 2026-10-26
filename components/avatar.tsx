import Image from "next/image";
import { BLUR_DATA_URL, hasPhoto, site } from "@/lib/content";

type AvatarProps = { className: string; sizes: string; priority?: boolean; shape?: "circle" | "rounded" };

/** Profile photo from content/site.json, or a "BM" placeholder until the file exists. */
export function Avatar({ className, sizes, priority = false, shape = "rounded" }: AvatarProps) {
  const radius = shape === "circle" ? "rounded-full" : "rounded-3xl";
  const frame = `relative overflow-hidden border-2 border-accent shadow-lg shadow-black/10 ${radius} ${className}`;

  if (!hasPhoto()) {
    return (
      <div role="img" aria-label={site.name} className={`${frame} grid place-items-center bg-surface`}>
        <span className="font-display text-5xl font-bold tracking-tight text-accent sm:text-6xl">{site.shortName}</span>
      </div>
    );
  }

  return (
    <div className={frame}>
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
    </div>
  );
}
