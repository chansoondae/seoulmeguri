import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { guides, getGuideBySlug } from "@/content/guides";
import type { GuideCategory } from "@/content/types";
import {
  OG_SIZE,
  OG_CONTENT_TYPE,
  readPublicDataUrl,
  loadJpFont,
} from "@/lib/og";
import { GUIDE_OG_FILE } from "@/lib/guideOg";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const CATEGORY_LABEL: Record<GuideCategory, string> = {
  money: "旅の準備 ／ お金",
  transport: "旅の準備 ／ 移動",
  entry: "旅の準備 ／ 入国",
  manner: "旅の準備 ／ マナー",
  shopping: "旅の準備 ／ お土産",
};

const CATEGORY_ACCENT: Record<GuideCategory, string> = {
  money: "#A2D2FF",
  transport: "#BDE0FE",
  entry: "#CDB4DB",
  manner: "#FFC8DD",
  shopping: "#FFAFCC",
};

export async function generateStaticParams() {
  return guides
    .filter((g) => GUIDE_OG_FILE[g.slug])
    .map((g) => ({ slug: g.slug }));
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  const file = GUIDE_OG_FILE[slug];
  if (!guide || !file) notFound();

  const [bg, font] = await Promise.all([
    readPublicDataUrl(file),
    loadJpFont(),
  ]);
  const accent = CATEGORY_ACCENT[guide.category];

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
                Seoulmeguri ／ {CATEGORY_LABEL[guide.category]}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 68,
                lineHeight: 1.2,
                marginTop: 20,
                letterSpacing: "0.01em",
              }}
            >
              {guide.title}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 22,
              padding: "12px 20px",
              borderRadius: 999,
              background: "#F8F3F9",
              color: "#2B2130",
              alignSelf: "flex-start",
              maxWidth: 500,
            }}
          >
            <div style={{ display: "flex" }}>💡</div>
            <div style={{ display: "flex" }}>{guide.summary}</div>
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
