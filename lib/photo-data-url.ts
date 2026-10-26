import fs from "node:fs";
import path from "node:path";
import { hasPhoto, site } from "./content";

/** The profile photo as a data URL for generated images (OG image, favicon), or null if not added yet. */
export function photoDataUrl(): string | null {
  if (!hasPhoto()) return null;
  const file = path.join(process.cwd(), "public", site.photo);
  const ext = path.extname(file).slice(1).toLowerCase();
  const mime = ext === "png" ? "image/png" : "image/jpeg";
  return `data:${mime};base64,${fs.readFileSync(file).toString("base64")}`;
}
