import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { areas, getAreaBySlug } from "@/content/areas";
import type { KeyColor } from "@/content/types";
import {
  OG_SIZE,
  OG_CONTENT_TYPE,
  readPublicDataUrl,
  loadJpFont,
} from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const SLUG_TO_FILE: Record<string, string> = {
  "city-hall": "og/cityhall.jpg",
  hannam: "og/hannam.jpg",
  gangnam: "og/gangnam.jpg",
};

const KEY_COLOR_HEX: Record<KeyColor, string> = {
  sky: "#A2D2FF",
  orchid: "#CDB4DB",
  blush: "#FFAFCC",
};

export async function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  const file = SLUG_TO_FILE[slug];
  if (!area || !file) notFound();

  const [bg, font] = await Promise.all([
    readPublicDataUrl(file),
    loadJpFont(),
  ]);
  const accent = KEY_COLOR_HEX[area.keyColor];

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
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, #FFFCFE 0%, #FFFCFE 45%, rgba(255,252,254,0.85) 55%, rgba(255,252,254,0) 70%)",
          }}
        />
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
                fontSize: 26,
                color: "#6E6377",
              }}
            >
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 999,
                  background: accent,
                  display: "flex",
                }}
              />
              <div style={{ display: "flex" }}>
                Seoulmeguri ／ エリアガイド
              </div>
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 84,
                lineHeight: 1.15,
                marginTop: 20,
                letterSpacing: "0.02em",
              }}
            >
              {area.nameJa}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 34,
                lineHeight: 1.4,
                marginTop: 20,
                color: "#2B2130",
              }}
            >
              {area.tagline}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 24,
              padding: "12px 20px",
              borderRadius: 999,
              background: "#F8F3F9",
              color: "#2B2130",
              alignSelf: "flex-start",
            }}
          >
            <div style={{ display: "flex" }}>⚠</div>
            <div style={{ display: "flex" }}>{area.weekdayNote}</div>
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
