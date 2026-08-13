import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { guides, getGuideBySlug } from "@/content/guides";
import { UpdatedAt } from "@/components/ui/UpdatedAt";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  const path = `/guides/${guide.slug}`;
  return {
    title: guide.title,
    description: guide.summary,
    alternates: { canonical: path },
    openGraph: {
      title: guide.title,
      description: guide.summary,
      url: path,
      type: "article",
      siteName: "Seoulmeguri",
      locale: "ja_JP",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          type: "image/png",
          alt: "Seoulmeguri｜ソウル、何曜日に行く？",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.summary,
      images: ["/opengraph-image"],
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  return (
    <>
      <section
        style={{
          background:
            "linear-gradient(160deg, var(--brand-petal) 0%, var(--brand-ice) 60%, var(--paper) 100%)",
        }}
      >
        <div className="container-narrow py-12 md:py-16">
          <nav aria-label="パンくず" className="t-caption mb-4">
            <Link href="/" className="text-ink no-underline hover:underline">
              トップ
            </Link>
            <span aria-hidden> / </span>
            <span>旅の準備</span>
          </nav>
          <p className="t-caption">
            {guide.category === "money"
              ? "お金 / 両替"
              : guide.category === "transport"
              ? "移動"
              : guide.category === "entry"
              ? "入国"
              : "マナー"}
          </p>
          <h1 className="t-display-l mt-1">{guide.title}</h1>
          <p className="t-body mt-5 max-w-[36rem]">{guide.summary}</p>
        </div>
      </section>

      <article className="container-narrow py-12 md:py-16 space-y-12">
        {guide.sections.map((s, i) => (
          <section key={i}>
            <h2 className="t-display-m">
              <span
                className="t-data mr-3"
                style={{ color: "var(--ink-3)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {s.heading}
            </h2>
            {s.body ? <p className="t-body mt-4">{s.body}</p> : null}
            {s.bullets && s.bullets.length > 0 ? (
              <ul className="mt-4 space-y-2">
                {s.bullets.map((b) => (
                  <li key={b} className="t-body-s pl-5 relative">
                    <span
                      aria-hidden
                      className="absolute left-0 top-2.5 w-2 h-2 rounded-full"
                      style={{ background: "var(--brand-blush)" }}
                    />
                    {b}
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </article>

      <section className="container-narrow py-12">
        <div
          className="rounded-2xl border p-5"
          style={{
            borderColor: "var(--line)",
            background: "var(--paper-2)",
          }}
        >
          <UpdatedAt date={guide.updatedAt} />
          <p className="t-caption mt-2">
            レート・営業時間は日々変動します。訪問前に最新情報の確認をおすすめします。
          </p>
        </div>
      </section>
    </>
  );
}
