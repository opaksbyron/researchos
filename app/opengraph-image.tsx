import { ImageResponse } from "next/og";

export const alt = "ResearchOS, research that shows its working";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "#f5f7fa",
          color: "#172033",
          display: "flex",
          height: "100%",
          padding: "58px",
          width: "100%",
        }}
      >
        <div
          style={{
            border: "2px solid #d8e0eb",
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "48px",
          }}
        >
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700 }}>
            Research<span style={{ color: "#0058cc" }}>OS</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                color: "#0058cc",
                display: "flex",
                fontSize: 22,
                fontWeight: 600,
                marginBottom: 20,
              }}
            >
              SOURCE-GROUNDED AI RESEARCH
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 72,
                fontWeight: 700,
                letterSpacing: "-3px",
                lineHeight: 1.02,
                maxWidth: 900,
              }}
            >
              Research that shows its working.
            </div>
          </div>
          <div style={{ color: "#5c6677", display: "flex", fontSize: 22 }}>
            Evidence · Analysis · Memory · Projects
          </div>
        </div>
      </div>
    ),
    size,
  );
}
