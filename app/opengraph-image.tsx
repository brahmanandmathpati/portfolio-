import { ImageResponse } from "next/og";
import { site } from "@/lib/content";
import { photoDataUrl } from "@/lib/photo-data-url";

export const alt = `${site.name}: ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const photo = photoDataUrl();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 64,
          padding: 80,
          background: "#0b0d10",
          color: "#eceef1",
        }}
      >
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt="" width={340} height={340} style={{ borderRadius: 40, border: "6px solid #2dd4bf", objectFit: "cover" }} />
        ) : (
          <div
            style={{
              width: 340,
              height: 340,
              borderRadius: 40,
              border: "6px solid #2dd4bf",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 150,
              fontWeight: 700,
              color: "#2dd4bf",
              background: "#14171c",
            }}
          >
            {site.shortName}
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontSize: 30, color: "#2dd4bf" }}>{site.role}</div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, marginTop: 16 }}>{site.name}</div>
          <div style={{ fontSize: 34, color: "#a1a8b3", marginTop: 28 }}>{site.valueLine}</div>
        </div>
      </div>
    ),
    size,
  );
}
