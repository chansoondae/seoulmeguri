import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { guides, getGuideBySlug } from "@/content/guides";
import type {
  Guide,
  GuideSection,
  SouvenirItem,
  GuideTable,
  GuideCallout,
  FaqEntry,
} from "@/content/types";
import { UpdatedAt } from "@/components/ui/UpdatedAt";
import { RelatedLinks } from "@/components/related/RelatedLinks";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { hasGuideOgImage } from "@/lib/guideOg";

type Params = { slug: string };

const CATEGORY_LABEL: Record<string, string> = {
  money: "お金 / 両替",
  transport: "移動",
  entry: "入国",
  manner: "マナー",
  shopping: "お土産 / 買い物",
};

const CATEGORY_SECTION: Record<string, string> = {
  money: "お金",
  transport: "移動",
  entry: "入国",
  manner: "マナー",
  shopping: "お土産",
};

// SEO-tuned title/description overrides per guide slug.
// Falls back to the guide's own title/summary when not listed.
const SEO_OVERRIDES: Record<
  string,
  { title: string; description: string; keywords: string[] }
> = {
  souvenir: {
    title:
      "韓国のお土産、本当に買うべき10選｜日本人向け・2026年版",
    description:
      "コスメもラーメンも日本で買える時代。それでも韓国で買う意味があるお土産10個(薬菓・韓国のり・MU:DS・伝統工芸ほか)と、「買わなくていいもの」を日本人向けに正直にまとめました。",
    keywords: [
      "韓国 お土産",
      "ソウル お土産",
      "薬菓 ヤックァ",
      "韓国のり おすすめ",
      "オリーブヤング お土産",
      "韓国ダイソー",
      "MU:DS 국립중앙박물관",
      "ソウル ばらまき土産",
      "日本人 韓国 お土産",
    ],
  },
  exchange: {
    title:
      "ソウルの両替、どこがいちばん得？｜明洞・弘大・WOWPASS 比較",
    description:
      "「明洞がいちばん安い」は必ずしも正解じゃない。場所別レート・カード・WOWPASSまで、日本人向けに判断材料をまとめた両替ガイド。",
    keywords: [
      "韓国 両替",
      "ソウル 両替 明洞",
      "WOWPASS 比較",
      "韓国 ATM 引き出し",
      "トラベルウォレット 韓国",
      "ウォン 両替 レート",
    ],
  },
};

export function generateStaticParams(): Params[] {
  return guides.map((g) => ({ slug: g.slug }));
}

function getSeo(guide: Guide) {
  const override = SEO_OVERRIDES[guide.slug];
  return {
    title: override?.title ?? guide.title,
    description: override?.description ?? guide.summary,
    keywords: override?.keywords,
  };
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
  const { title, description, keywords } = getSeo(guide);
  const publishedTime = new Date(guide.updatedAt).toISOString();
  const ogImage = hasGuideOgImage(guide.slug)
    ? `${path}/opengraph-image`
    : "/opengraph-image";

  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "article",
      siteName: SITE_NAME,
      locale: "ja_JP",
      publishedTime,
      modifiedTime: publishedTime,
      section: CATEGORY_SECTION[guide.category] ?? "旅の準備",
      tags: keywords,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          type: "image/png",
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

function Bullets({ bullets }: { bullets: string[] }) {
  return (
    <ul className="mt-4 space-y-2">
      {bullets.map((b) => (
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
  );
}

function ItemCard({ item }: { item: SouvenirItem }) {
  return (
    <article
      className="rounded-2xl border p-5 md:p-6"
      style={{ borderColor: "var(--line)", background: "var(--paper)" }}
    >
      <div className="flex items-baseline gap-3">
        <span
          className="t-data shrink-0"
          aria-hidden
          style={{ color: "var(--ink-3)" }}
        >
          {String(item.rank).padStart(2, "0")}
        </span>
        <div className="min-w-0">
          <h3 className="t-title">{item.nameJa}</h3>
          {item.nameKo ? (
            <p className="t-caption mt-0.5" style={{ color: "var(--ink-2)" }}>
              {item.nameKo}
            </p>
          ) : null}
        </div>
      </div>
      <p className="t-body-s mt-3">{item.body}</p>
      {item.bullets && item.bullets.length > 0 ? (
        <Bullets bullets={item.bullets} />
      ) : null}
      {item.tip ? <Callout callout={{ kind: "tip", body: item.tip }} /> : null}
      {item.caution ? (
        <Callout callout={{ kind: "warn", body: item.caution }} />
      ) : null}
    </article>
  );
}

function Callout({ callout }: { callout: GuideCallout }) {
  const isTip = callout.kind === "tip";
  return (
    <div
      className="mt-4 rounded-2xl border p-4"
      style={{
        borderColor: isTip ? "var(--brand-ice)" : "var(--brand-petal)",
        background: isTip
          ? "color-mix(in oklab, var(--brand-ice) 30%, var(--paper))"
          : "color-mix(in oklab, var(--brand-petal) 30%, var(--paper))",
      }}
    >
      <div className="flex items-start gap-2">
        <span aria-hidden className="t-data shrink-0">
          {isTip ? "💡" : "⚠️"}
        </span>
        <div>
          {callout.title ? (
            <p className="t-caption font-bold mb-1">{callout.title}</p>
          ) : null}
          <p className="t-body-s">{callout.body}</p>
        </div>
      </div>
    </div>
  );
}

function Table({ table }: { table: GuideTable }) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table
        className="w-full border-collapse"
        style={{ borderColor: "var(--line)" }}
      >
        {table.caption ? (
          <caption
            className="t-caption text-left mb-2"
            style={{ color: "var(--ink-2)" }}
          >
            {table.caption}
          </caption>
        ) : null}
        <thead>
          <tr>
            {table.headers.map((h) => (
              <th
                key={h}
                scope="col"
                className="t-caption text-left px-3 py-2 border-b"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--paper-2)",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="t-body-s px-3 py-3 border-b align-top"
                  style={{ borderColor: "var(--line)" }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Faq({ faq }: { faq: FaqEntry[] }) {
  return (
    <dl className="mt-4 space-y-4">
      {faq.map((entry) => (
        <div
          key={entry.q}
          className="rounded-2xl border p-4"
          style={{ borderColor: "var(--line)", background: "var(--paper)" }}
        >
          <dt className="t-title">
            <span
              aria-hidden
              className="t-data mr-2"
              style={{ color: "var(--accent)" }}
            >
              Q.
            </span>
            {entry.q}
          </dt>
          <dd className="t-body-s mt-2" style={{ color: "var(--ink-2)" }}>
            <span
              aria-hidden
              className="t-data mr-2"
              style={{ color: "var(--link)" }}
            >
              A.
            </span>
            {entry.a}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Section({
  section,
  headingNumber,
}: {
  section: GuideSection;
  headingNumber: number | null;
}) {
  return (
    <section>
      {section.heading ? (
        <h2 className="t-display-m">
          {headingNumber !== null ? (
            <span className="t-data mr-3" style={{ color: "var(--ink-3)" }}>
              {String(headingNumber).padStart(2, "0")}
            </span>
          ) : null}
          {section.heading}
        </h2>
      ) : null}
      {section.body ? <p className="t-body mt-4">{section.body}</p> : null}
      {section.bullets && section.bullets.length > 0 ? (
        <Bullets bullets={section.bullets} />
      ) : null}
      {section.items && section.items.length > 0 ? (
        <div className="mt-6 space-y-4">
          {section.items.map((it) => (
            <ItemCard key={it.rank} item={it} />
          ))}
        </div>
      ) : null}
      {section.table ? <Table table={section.table} /> : null}
      {section.callout ? <Callout callout={section.callout} /> : null}
      {section.faq && section.faq.length > 0 ? (
        <Faq faq={section.faq} />
      ) : null}
    </section>
  );
}

function collectFaq(guide: Guide): FaqEntry[] {
  return guide.sections.flatMap((s) => s.faq ?? []);
}

function buildJsonLd(guide: Guide) {
  const url = `${SITE_URL}/guides/${guide.slug}`;
  const { title, description, keywords } = getSeo(guide);
  const publishedTime = new Date(guide.updatedAt).toISOString();
  const ogImageUrl = hasGuideOgImage(guide.slug)
    ? `${SITE_URL}/guides/${guide.slug}/opengraph-image`
    : `${SITE_URL}/opengraph-image`;

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: [ogImageUrl],
    datePublished: publishedTime,
    dateModified: publishedTime,
    inLanguage: "ja",
    keywords: keywords?.join(", "),
    articleSection: CATEGORY_SECTION[guide.category],
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "トップ",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: guide.title,
        item: url,
      },
    ],
  };

  const faqEntries = collectFaq(guide);
  const faq =
    faqEntries.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqEntries.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return { article, breadcrumb, faq };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const jsonLd = buildJsonLd(guide);
  let headingCounter = 0;

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
            {CATEGORY_LABEL[guide.category] ?? "旅の準備"}
          </p>
          <h1 className="t-display-l mt-1">{guide.title}</h1>
          <p className="t-body mt-5 max-w-[36rem]">{guide.summary}</p>
        </div>
      </section>

      <article className="container-narrow py-12 md:py-16 space-y-12">
        {guide.sections.map((s, i) => {
          const num = s.heading ? ++headingCounter : null;
          return <Section key={i} section={s} headingNumber={num} />;
        })}
      </article>

      <RelatedLinks
        guideSlugs={guide.relatedGuides}
        areaSlugs={guide.relatedAreas}
        courseSlugs={guide.relatedCourses}
      />

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
            価格・営業時間・取扱店舗は変わることがあります。訪問前に最新情報の確認をおすすめします。
          </p>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.article) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.breadcrumb) }}
      />
      {jsonLd.faq ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.faq) }}
        />
      ) : null}
    </>
  );
}
