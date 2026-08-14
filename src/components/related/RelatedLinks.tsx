import Link from "next/link";
import { areas } from "@/content/areas";
import { courses } from "@/content/courses";
import { guides } from "@/content/guides";
import { KEY_COLOR_SOFT_VAR, KEY_COLOR_VAR } from "@/lib/keyColor";
import { isRecent } from "@/lib/isRecent";
import type { Area, Course, Guide } from "@/content/types";

type Props = {
  areaSlugs?: string[];
  courseSlugs?: string[];
  guideSlugs?: string[];
  heading?: string;
  eyebrow?: string;
};

const GUIDE_CATEGORY_LABEL: Record<Guide["category"], string> = {
  money: "お金",
  transport: "交通",
  entry: "入国",
  manner: "マナー",
  shopping: "お土産",
};

const COURSE_CATEGORY_LABEL: Record<Course["category"], string> = {
  kpop: "K-POP",
  history: "歴史",
  cafe: "カフェ",
  shopping: "買い物",
};

function NewBadge() {
  return (
    <span
      className="t-caption inline-flex items-center rounded-full px-2 py-0.5"
      style={{
        background: "var(--accent)",
        color: "var(--accent-ink)",
        lineHeight: 1,
      }}
    >
      NEW
    </span>
  );
}

function AreaMini({ area }: { area: Area }) {
  return (
    <Link
      href={`/areas/${area.slug}`}
      className="block rounded-2xl border p-4 no-underline transition-transform hover:-translate-y-0.5"
      style={{
        borderColor: "var(--line)",
        background: `linear-gradient(120deg, ${KEY_COLOR_VAR[area.keyColor]} 0%, ${KEY_COLOR_SOFT_VAR[area.keyColor]} 60%, var(--paper) 100%)`,
      }}
    >
      <p className="t-caption">エリア</p>
      <div className="mt-1 flex items-baseline gap-2 flex-wrap">
        <h3 className="t-title text-ink">{area.nameJa}</h3>
        {isRecent(area.updatedAt) ? <NewBadge /> : null}
      </div>
      <p className="t-body-s mt-2" style={{ color: "var(--ink)" }}>
        {area.tagline}
      </p>
    </Link>
  );
}

function CourseMini({ course }: { course: Course }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="block rounded-2xl border p-4 no-underline transition-transform hover:-translate-y-0.5"
      style={{
        borderColor: "var(--line)",
        background: `linear-gradient(120deg, ${KEY_COLOR_VAR[course.keyColor]} 0%, ${KEY_COLOR_SOFT_VAR[course.keyColor]} 60%, var(--paper) 100%)`,
      }}
    >
      <p className="t-caption">テーマ・{COURSE_CATEGORY_LABEL[course.category]}</p>
      <div className="mt-1 flex items-baseline gap-2 flex-wrap">
        <h3 className="t-title text-ink">{course.tagline}</h3>
        {isRecent(course.updatedAt) ? <NewBadge /> : null}
      </div>
      <p className="t-body-s mt-2" style={{ color: "var(--ink)" }}>
        {course.intro.slice(0, 80)}
        {course.intro.length > 80 ? "…" : ""}
      </p>
    </Link>
  );
}

function GuideMini({ guide }: { guide: Guide }) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="block rounded-2xl border p-4 no-underline transition-transform hover:-translate-y-0.5"
      style={{
        borderColor: "var(--line)",
        background: "var(--paper)",
      }}
    >
      <p className="t-caption">ガイド・{GUIDE_CATEGORY_LABEL[guide.category]}</p>
      <div className="mt-1 flex items-baseline gap-2 flex-wrap">
        <h3 className="t-title text-ink">{guide.title}</h3>
        {isRecent(guide.updatedAt) ? <NewBadge /> : null}
      </div>
      <p className="t-body-s mt-2" style={{ color: "var(--ink-2)" }}>
        {guide.summary}
      </p>
    </Link>
  );
}

export function RelatedLinks({
  areaSlugs = [],
  courseSlugs = [],
  guideSlugs = [],
  heading = "関連リンク",
  eyebrow = "あわせて読む",
}: Props) {
  const relatedAreas = areaSlugs
    .map((slug) => areas.find((a) => a.slug === slug))
    .filter((a): a is Area => Boolean(a));
  const relatedCourses = courseSlugs
    .map((slug) => courses.find((c) => c.slug === slug))
    .filter((c): c is Course => Boolean(c));
  const relatedGuides = guideSlugs
    .map((slug) => guides.find((g) => g.slug === slug))
    .filter((g): g is Guide => Boolean(g));

  const total = relatedAreas.length + relatedCourses.length + relatedGuides.length;
  if (total === 0) return null;

  return (
    <section className="container-narrow py-10 md:py-14">
      <header className="mb-5">
        <p className="t-caption">{eyebrow}</p>
        <h2 className="t-display-m mt-1">{heading}</h2>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {relatedCourses.map((c) => (
          <CourseMini key={`course-${c.slug}`} course={c} />
        ))}
        {relatedAreas.map((a) => (
          <AreaMini key={`area-${a.slug}`} area={a} />
        ))}
        {relatedGuides.map((g) => (
          <GuideMini key={`guide-${g.slug}`} guide={g} />
        ))}
      </div>
    </section>
  );
}
