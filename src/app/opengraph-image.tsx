import { ImageResponse } from "next/og";

/* Site-wide Open Graph image (app-root file convention — inherited by every
   route without its own opengraph-image). Generated once at build time. */

export const alt = "Nexara Global Solutions — Technology & Digital Transformation Partner";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0B1120 0%, #101B36 100%)",
          padding: "72px 84px",
          color: "#fff",
        }}
      >
        {/* top row: wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 16,
              height: 64,
              backgroundColor: "#315EFB",
              borderRadius: 8,
              display: "flex",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 40,
              fontWeight: 700,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            Nexara
          </div>
          <div style={{ display: "flex", fontSize: 20, color: "rgba(255,255,255,0.55)", letterSpacing: 3 }}>
            GLOBAL SOLUTIONS
          </div>
        </div>

        {/* middle: value proposition */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 74, fontWeight: 700, lineHeight: 1.15 }}>
            Build Better. Operate Smarter. Grow Faster.
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "rgba(255,255,255,0.72)", marginTop: 20 }}>
            Websites · Web apps · Mobile apps · CRM/ERP · AI software · Cloud
          </div>
        </div>

        {/* bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "rgba(255,255,255,0.55)",
          }}
        >
          <div style={{ display: "flex" }}>Technology &amp; Digital Transformation Partner</div>
          <div style={{ display: "flex" }}>Noida · India · nexara-web</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
