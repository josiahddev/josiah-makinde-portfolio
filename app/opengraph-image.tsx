import { ImageResponse } from "next/og";

export const alt = "Josiah Makinde — IT Support & Cybersecurity";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0e0f0e",
          color: "#ebe8e1",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: "#a3a69f" }}>
          <div style={{ width: 12, height: 12, borderRadius: 12, background: "#e5ac5c" }} />
          IT / SYSTEMS / SECURITY
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05 }}>Josiah Makinde</div>
          <div style={{ fontSize: 40, color: "#a3a69f", marginTop: 20 }}>
            IT Support & ICT — building toward cybersecurity.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#7f837c" }}>Kaduna, Nigeria</div>
      </div>
    ),
    size,
  );
}
