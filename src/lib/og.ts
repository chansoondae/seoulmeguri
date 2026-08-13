import fs from "node:fs/promises";
import path from "node:path";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png" as const;

/**
 * Reads a file from public/ as a Uint8Array (for ImageResponse background images).
 * Path is relative to public/ — e.g. "og/top.jpg".
 */
export async function readPublic(rel: string): Promise<Uint8Array> {
  const p = path.join(process.cwd(), "public", rel);
  const buf = await fs.readFile(p);
  return new Uint8Array(buf);
}

/**
 * Reads and returns as a data URL, which is what ImageResponse's <img src>
 * accepts most reliably during build.
 */
export async function readPublicDataUrl(
  rel: string,
  mime = "image/jpeg",
): Promise<string> {
  const p = path.join(process.cwd(), "public", rel);
  const buf = await fs.readFile(p);
  return `data:${mime};base64,${buf.toString("base64")}`;
}

/**
 * Loads Zen Maru Gothic Bold TTF from public/fonts/ for use in ImageResponse.
 * The file covers the full JP charset (satori cannot use Google Fonts'
 * unicode-range splitting, so we need the full TTF locally).
 */
export async function loadJpFont(): Promise<Buffer> {
  const p = path.join(process.cwd(), "public/fonts/ZenMaruGothic-Bold.ttf");
  return fs.readFile(p);
}
