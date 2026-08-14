import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { courses, getCourseBySlug } from "@/content/courses";
import type { KeyColor } from "@/content/types";
import {
  OG_SIZE,
  OG_CONTENT_TYPE,
  readPublicDataUrl,
  loadJpFont,
} from "@/lib/og";
import { COURSE_OG_FILE } from "@/lib/courseOg";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const KEY_COLOR_HEX: Record<KeyColor, string> = {
  sky: "#A2D2FF",
  orchid: "#CDB4DB",
  blush: "#FFAFCC",
};

// Optional per-slug label override for the top eyebrow. Falls back to a
// generic "テーマ別コース" label when not listed.
const SLUG_LABEL: Record<string, string> = {
  "bts-seoul": "BTS聖地巡礼",
};

export async function generateStaticParams() {
  return courses
    .filter((c) => COURSE_OG_FILE[c.slug])
    .map((c) => ({ slug: c.slug }));
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  const file = COURSE_OG_FILE[slug];
  if (!course || !file) notFound();

  const [bg, font] = await Promise.all([
    readPublicDataUrl(file),
    loadJpFont(),
  ]);
  const accent = KEY_COLOR_HEX[course.keyColor];

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
        {/* Background photo placed on the right half only, so the left text
            safe zone (x 0-600) is always clean paper regardless of how dark
            the source image is. Avoids the fragile approach of overlaying a
            white gradient on top of a full-bleed image. */}
        <img
          src={bg}
          alt=""
          width={720}
          height={OG_SIZE.height}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 720,
            height: "100%",
            objectFit: "cover",
          }}
        />
        {/* Soft fade from paper to transparent, blending the image's left edge
            into the paper background so the seam isn't hard. */}
        <div
          style={{
            position: "absolute",
            left: 480,
            top: 0,
            width: 240,
            height: "100%",
            background:
              "linear-gradient(90deg, #FFFCFE 0%, rgba(255,252,254,0) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 64,
            top: 120,
            width: 420,
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
                Seoulmeguri ／ {SLUG_LABEL[slug] ?? "テーマ別コース"}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 72,
                lineHeight: 1.2,
                marginTop: 20,
                letterSpacing: "0.02em",
              }}
            >
              {course.tagline}
            </div>
          </div>
          {course.headline ? (
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
                maxWidth: 500,
              }}
            >
              <div style={{ display: "flex" }}>⚠</div>
              <div style={{ display: "flex" }}>{course.headline.title}</div>
            </div>
          ) : null}
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
