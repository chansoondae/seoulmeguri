import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { courses, getCourseBySlug } from "@/content/courses";
import type { Course, FaqEntry, CourseExclusion } from "@/content/types";
import { KEY_COLOR_VAR, KEY_COLOR_SOFT_VAR } from "@/lib/keyColor";
import { WeekdayTable } from "@/components/weekday/WeekdayTable";
import { MeguriLine } from "@/components/course/MeguriLine";
import { StopCard } from "@/components/course/StopCard";
import { PitfallBox } from "@/components/ui/PitfallBox";
import { UpdatedAt } from "@/components/ui/UpdatedAt";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { hasCourseOgImage } from "@/lib/courseOg";
import { stopToPlaceJsonLd } from "@/lib/placeJsonLd";

type Params = { slug: string };

const CATEGORY_LABEL: Record<Course["category"], string> = {
  kpop: "テーマ別コース ／ K-POP",
  history: "テーマ別コース ／ 歴史",
  cafe: "テーマ別コース ／ カフェ",
  shopping: "テーマ別コース ／ 買い物",
};

const SEO_OVERRIDES: Record<
  string,
  { title: string; description: string; keywords: string[] }
> = {
  "bts-seoul": {
    title:
      "BTS聖地巡礼 in ソウル 1日コース｜景福宮・光化門・崇礼門・HYBEを歩いてつなぐ",
    description:
      "景福宮、光化門広場、崇礼門。BTSが実際にステージにした場所を朝から夜まで歩いてつなぐ1日コース。曜日別の「行ける日」と、載せない場所の基準まで日本人向けにまとめました。",
    keywords: [
      "BTS 聖地巡礼",
      "BTS ソウル コース",
      "景福宮 BTS",
      "光化門 BTS ライブ",
      "崇礼門 Permission to Dance",
      "HYBE 社屋 ポップアップ",
      "ユジョン食堂",
      "乙支茶房 BTS",
      "노들섬 Run",
    ],
  },
};

export function generateStaticParams(): Params[] {
  return courses.map((c) => ({ slug: c.slug }));
}

function getSeo(course: Course) {
  const override = SEO_OVERRIDES[course.slug];
  return {
    title: override?.title ?? course.nameJa,
    description: override?.description ?? course.intro,
    keywords: override?.keywords,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return {};
  const path = `/courses/${course.slug}`;
  const { title, description, keywords } = getSeo(course);
  const publishedTime = new Date(course.updatedAt).toISOString();
  const ogImage = hasCourseOgImage(course.slug)
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
      section: "テーマ別コース",
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

function buildJsonLd(course: Course) {
  const url = `${SITE_URL}/courses/${course.slug}`;
  const { title, description, keywords } = getSeo(course);
  const publishedTime = new Date(course.updatedAt).toISOString();
  const ogImageUrl = hasCourseOgImage(course.slug)
    ? `${SITE_URL}/courses/${course.slug}/opengraph-image`
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
    articleSection: "テーマ別コース",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: course.stops.length,
    itemListElement: course.stops.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.nameJa,
      description: s.blurb,
    })),
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
        name: course.nameJa,
        item: url,
      },
    ],
  };

  const faq =
    course.faq && course.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: course.faq.map((f: FaqEntry) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return { article, itemList, breadcrumb, faq };
}

function Exclusion({ exclusion }: { exclusion: CourseExclusion }) {
  return (
    <section className="container-narrow py-12 md:py-16">
      <div
        className="rounded-2xl border p-5 md:p-7"
        style={{
          borderColor: "var(--line)",
          background: "var(--paper-2)",
        }}
      >
        <p className="t-caption" style={{ color: "var(--ink-2)" }}>
          このサイトの方針
        </p>
        <h2 className="t-display-m mt-1">{exclusion.title}</h2>
        {exclusion.intro ? (
          <p className="t-body-s mt-3">{exclusion.intro}</p>
        ) : null}
        <ul className="mt-4 space-y-2">
          {exclusion.items.map((it) => (
            <li key={it} className="t-body-s pl-5 relative">
              <span
                aria-hidden
                className="absolute left-0 top-2.5 w-2 h-2 rounded-full"
                style={{ background: "var(--brand-orchid)" }}
              />
              {it}
            </li>
          ))}
        </ul>
        {exclusion.outro ? (
          <p className="t-body-s mt-4">{exclusion.outro}</p>
        ) : null}
      </div>
    </section>
  );
}

function Faq({ faq }: { faq: FaqEntry[] }) {
  return (
    <section className="container-narrow py-12 md:py-16">
      <header className="mb-5">
        <p className="t-caption">よくある質問</p>
        <h2 className="t-display-m mt-1">気になるところを、先に</h2>
      </header>
      <dl className="space-y-4">
        {faq.map((entry) => (
          <div
            key={entry.q}
            className="rounded-2xl border p-4 md:p-5"
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
    </section>
  );
}

export default async function CoursePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const color = KEY_COLOR_VAR[course.keyColor];
  const softColor = KEY_COLOR_SOFT_VAR[course.keyColor];
  const jsonLd = buildJsonLd(course);

  const placesJsonLd = [
    ...course.stops,
    ...(course.extras ?? []),
    ...(course.outOfSeoul ?? []),
  ]
    .map((s) => stopToPlaceJsonLd(s, course.updatedAt))
    .filter((v): v is Record<string, unknown> => v !== null);

  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: `linear-gradient(160deg, ${color} 0%, ${softColor} 60%, var(--paper) 100%)`,
        }}
      >
        <div className="container-narrow py-12 md:py-16">
          <nav aria-label="パンくず" className="t-caption mb-4">
            <Link href="/" className="text-ink no-underline hover:underline">
              トップ
            </Link>
            <span aria-hidden> / </span>
            <span>テーマ別コース</span>
          </nav>
          <p className="t-caption">{CATEGORY_LABEL[course.category]}</p>
          <h1 className="t-display-l mt-1">{course.nameJa}</h1>
          <p className="t-display-m mt-3">{course.tagline}</p>
          <p className="t-body mt-5 max-w-[36rem]">{course.intro}</p>
          <p
            className="t-caption mt-6 inline-flex items-center gap-1 rounded-full px-3 py-1"
            style={{ background: "var(--paper)", color: "var(--ink)" }}
          >
            <span aria-hidden>🚇</span>
            {course.access.start.line} {course.access.start.name}{" "}
            {course.access.start.exit}
          </p>
        </div>
      </section>

      {/* Headline warning (e.g. 火曜日は成立しません) */}
      {course.headline ? (
        <section className="container-narrow pt-8">
          <PitfallBox pitfall={course.headline} />
        </section>
      ) : null}

      {/* 曜日表 */}
      <section className="container-narrow py-12 md:py-16">
        <header className="mb-5">
          <p className="t-caption">まず、曜日をチェック</p>
          <h2 className="t-display-m mt-1">
            このコース、行ける日 / 行けない日
          </h2>
          <p className="t-body-s mt-2" style={{ color: "var(--ink-2)" }}>
            {course.weekdayNote}
          </p>
        </header>
        <WeekdayTable rows={course.weekdayTable} />
      </section>

      {/* 1日の流れ */}
      <section className="container-narrow py-12 md:py-16">
        <header className="mb-6">
          <p className="t-caption">1日の流れ</p>
          <h2 className="t-display-m mt-1">
            この順番で回ると、いちばん自然
          </h2>
        </header>
        <MeguriLine stops={course.stops} keyColor={course.keyColor} />
      </section>

      {/* Pitfalls */}
      {course.pitfalls && course.pitfalls.length > 0 ? (
        <section className="container-narrow py-12 md:py-16">
          <header className="mb-5">
            <p className="t-caption">気をつけたいこと</p>
            <h2 className="t-display-m mt-1">
              知っておくと、残念な思いをせずにすむこと
            </h2>
          </header>
          <div className="space-y-4">
            {course.pitfalls.map((p, i) => (
              <PitfallBox key={i} pitfall={p} />
            ))}
          </div>
        </section>
      ) : null}

      {/* Extras */}
      {course.extras && course.extras.length > 0 ? (
        <section className="container-narrow py-12 md:py-16">
          <header className="mb-5">
            <p className="t-caption">時間があれば</p>
            <h2 className="t-display-m mt-1">別日に組み込みたい場所</h2>
          </header>
          <div className="grid gap-4 md:grid-cols-2">
            {course.extras.map((s, i) => (
              <StopCard key={`${s.nameJa}-${i}`} stop={s} index={i + 1} />
            ))}
          </div>
        </section>
      ) : null}

      {/* Out of Seoul */}
      {course.outOfSeoul && course.outOfSeoul.length > 0 ? (
        <section className="container-narrow py-12 md:py-16">
          <header className="mb-5">
            <p className="t-caption">ソウルの外</p>
            <h2 className="t-display-m mt-1">
              日帰りは無理。行くなら1泊を別枠で
            </h2>
          </header>
          <div className="grid gap-4">
            {course.outOfSeoul.map((s, i) => (
              <StopCard key={`out-${s.nameJa}-${i}`} stop={s} index={i + 1} />
            ))}
          </div>
        </section>
      ) : null}

      {/* Exclusion (載せないもの) */}
      {course.exclusion ? <Exclusion exclusion={course.exclusion} /> : null}

      {/* FAQ */}
      {course.faq && course.faq.length > 0 ? <Faq faq={course.faq} /> : null}

      {/* Updated & Sources */}
      <section className="container-narrow py-12">
        <div
          className="rounded-2xl border p-5"
          style={{
            borderColor: "var(--line)",
            background: "var(--paper-2)",
          }}
        >
          <UpdatedAt date={course.updatedAt} />
          <p className="t-caption mt-2">
            営業時間・料金・展示内容は変わることがあります。訪問前に最新情報の確認をおすすめします。
          </p>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.article) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.itemList) }}
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
      {placesJsonLd.map((p, i) => (
        <script
          key={`place-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(p) }}
        />
      ))}
    </>
  );
}
