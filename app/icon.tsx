import { ImageResponse } from "next/og";
import { site } from "@/lib/content";
import { photoDataUrl } from "@/lib/photo-data-url";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  const photo = photoDataUrl();
  return new ImageResponse(
    photo ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={photo} alt="" width={64} height={64} style={{ borderRadius: 32, objectFit: "cover" }} />
    ) : (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 14,
          background: "#0f766e",
          color: "#ffffff",
          fontSize: 30,
          fontWeight: 700,
        }}
      >
        {site.shortName}
      </div>
    ),
    size,
  );
}
