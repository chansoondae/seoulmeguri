import { ImageResponse } from "next/og";
import {
  OG_SIZE,
  OG_CONTENT_TYPE,
  readPublicDataUrl,
  loadJpFont,
} from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Seoulmeguri｜ソウル、何曜日に行く？";

export default async function OGImage() {
  const [bg, font] = await Promise.all([
    readPublicDataUrl("og/top.jpg"),
    loadJpFont(),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          fontFamily: "ZenMaru",
          background: "#FFFCFE",
        }}
      >
        {/* Background photo (right 45%) */}
        <img
          src={bg}
          alt=""
          width={OG_SIZE.width}
          height={OG_SIZE.height}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        {/* Left 55% gradient overlay so type is readable */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, #FFFCFE 0%, #FFFCFE 45%, rgba(255,252,254,0.85) 55%, rgba(255,252,254,0) 70%)",
          }}
        />
        {/* Text safe zone: x 64–600, y 120–510 */}
        <div
          style={{
            position: "absolute",
            left: 64,
            top: 120,
            width: 536,
            height: 390,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            color: "#2B2130",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontSize: 28,
                color: "#6E6377",
              }}
            >
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 999,
                  background: "#FFAFCC",
                  display: "flex",
                }}
              />
              <div style={{ display: "flex" }}>Seoulmeguri</div>
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 88,
                lineHeight: 1.15,
                marginTop: 24,
                letterSpacing: "0.02em",
              }}
            >
              ソウル、何曜日に行く？
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 26,
              padding: "12px 20px",
              borderRadius: 999,
              background: "#F8F3F9",
              color: "#2B2130",
              alignSelf: "flex-start",
            }}
          >
            <div style={{ display: "flex" }}>⚠</div>
            <div style={{ display: "flex" }}>
              月曜のソウル、けっこう閉まってます
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "ZenMaru",
          data: font,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
