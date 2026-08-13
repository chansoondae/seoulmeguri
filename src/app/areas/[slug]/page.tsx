import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { areas, getAreaBySlug } from "@/content/areas";
import { KEY_COLOR_VAR, KEY_COLOR_SOFT_VAR } from "@/lib/keyColor";
import { WeekdayTable } from "@/components/weekday/WeekdayTable";
import { FitFilter } from "@/components/area/FitFilter";
import { MeguriLine } from "@/components/course/MeguriLine";
import { StopCard } from "@/components/course/StopCard";
import { PitfallBox } from "@/components/ui/PitfallBox";
import { UpdatedAt } from "@/components/ui/UpdatedAt";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) return {};
  const title = `ソウル ${area.nameJa}の1日コース｜曜日別の「行ける日」つき`;
  const description = `${area.nameJa}(${area.reading})の1日コースと曜日別の休館情報。${area.weekdayNote}。日本人向けにNAVERマップリンクつき。`;
  const path = `/areas/${area.slug}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "article",
      siteName: "Seoulmeguri",
      locale: "ja_JP",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function AreaPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) notFound();

  const color = KEY_COLOR_VAR[area.keyColor];
  const softColor = KEY_COLOR_SOFT_VAR[area.keyColor];

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
            <span>{area.nameJa}</span>
          </nav>
          <p className="t-caption">
            {area.nameKo}（{area.reading}）
          </p>
          <h1 className="t-display-l mt-1">{area.nameJa}</h1>
          <p className="t-display-m mt-3">{area.tagline}</p>
          <p className="t-body mt-5 max-w-[36rem]">{area.intro}</p>
          <p
            className="t-caption mt-6 inline-flex items-center gap-1 rounded-full px-3 py-1"
            style={{ background: "var(--paper)", color: "var(--ink)" }}
          >
            <span aria-hidden>🚇</span>
            {area.station.line} {area.station.name} {area.station.exit}
          </p>
        </div>
      </section>

      {/* こんな人におすすめ */}
      <section className="container-narrow py-12 md:py-16">
        <header className="mb-5">
          <p className="t-caption">Fit check</p>
          <h2 className="t-display-m mt-1">こんな人におすすめ / しない</h2>
        </header>
        <FitFilter goodFor={area.goodFor} notFor={area.notFor} />
      </section>

      {/* 曜日表 */}
      <section className="container-narrow py-12 md:py-16">
        <header className="mb-5">
          <p className="t-caption">曜日表</p>
          <h2 className="t-display-m mt-1">
            このエリア、行ける日 / 行けない日
          </h2>
          <p className="t-body-s mt-2" style={{ color: "var(--ink-2)" }}>
            {area.weekdayNote}
          </p>
        </header>
        <WeekdayTable rows={area.weekdayTable} />
      </section>

      {/* 行き方 */}
      <section className="container-narrow py-6">
        <header className="mb-3">
          <p className="t-caption">行き方</p>
          <h2 className="t-title mt-1">最寄駅から</h2>
        </header>
        <p className="t-body-s">
          {area.station.line}「{area.station.name}」{area.station.exit}が起点。
          コースは徒歩で回れる順に並べています。
        </p>
      </section>

      {/* 1日コース */}
      <section className="container-narrow py-12 md:py-16">
        <header className="mb-6">
          <p className="t-caption">1日コース</p>
          <h2 className="t-display-m mt-1">この順番で回ると、いちばん自然</h2>
        </header>
        <MeguriLine stops={area.stops} keyColor={area.keyColor} />
      </section>

      {/* Pitfalls */}
      <section className="container-narrow py-12 md:py-16">
        <header className="mb-5">
          <p className="t-caption">このエリアの落とし穴</p>
          <h2 className="t-display-m mt-1">
            知っておくと、残念な思いをせずにすむこと
          </h2>
        </header>
        <div className="space-y-4">
          {area.pitfalls.map((p, i) => (
            <PitfallBox key={i} pitfall={p} />
          ))}
        </div>
      </section>

      {/* Extras */}
      {area.extras.length > 0 ? (
        <section className="container-narrow py-12 md:py-16">
          <header className="mb-5">
            <p className="t-caption">時間が余ったら</p>
            <h2 className="t-display-m mt-1">代わりに寄れる場所</h2>
          </header>
          <div className="grid gap-4 md:grid-cols-2">
            {area.extras.map((s, i) => (
              <StopCard key={`${s.nameJa}-${i}`} stop={s} index={i + 1} />
            ))}
          </div>
        </section>
      ) : null}

      {/* Updated & Sources */}
      <section className="container-narrow py-12">
        <div
          className="rounded-2xl border p-5"
          style={{
            borderColor: "var(--line)",
            background: "var(--paper-2)",
          }}
        >
          <UpdatedAt date={area.updatedAt} />
          <p className="t-caption mt-2">
            出典：各施設の公式サイト・現地確認。営業時間・料金は変動するため、
            訪問前に最新情報の確認をおすすめします。
          </p>
        </div>
      </section>
    </>
  );
}
