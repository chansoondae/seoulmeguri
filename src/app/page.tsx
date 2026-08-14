import { AreaCard } from "@/components/area/AreaCard";
import { WeekdayChecker } from "@/components/weekday/WeekdayChecker";
import { WeekdayMatrixSummary } from "@/components/weekday/WeekdayMatrixSummary";
import { InstagramBanner } from "@/components/instagram/InstagramBanner";
import { areas } from "@/content/areas";
import { guides } from "@/content/guides";
import { courses } from "@/content/courses";
import { KEY_COLOR_VAR, KEY_COLOR_SOFT_VAR } from "@/lib/keyColor";
import { buildWeekdayDatasetJsonLd } from "@/lib/weekdayDatasetJsonLd";
import Link from "next/link";

export default function HomePage() {
  const weekdayDatasetJsonLd = buildWeekdayDatasetJsonLd();
  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, var(--brand-sky) 0%, var(--brand-ice) 40%, var(--paper) 100%)",
        }}
      >
        <div className="container-narrow py-14 md:py-20">
          <p
            className="t-caption mb-4 inline-block rounded-full px-3 py-1"
            style={{ background: "var(--paper)", color: "var(--ink-2)" }}
          >
            ソウルめぐり ／ 日本人のための曜日別ソウル
          </p>
          <h1 className="t-display-l">
            ソウル、
            <br />
            何曜日に行く？
          </h1>
          <p className="t-body mt-6 max-w-[36rem]">
            行きたいお店が休みだった。
            <br />
            そんな残念な一日をなくすために作りました。
            <br />
            エリアごとの「行ける日」と「行けない日」、ぜんぶ書いてます。
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#weekday"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 t-title no-underline"
              style={{
                background: "var(--accent)",
                color: "var(--accent-ink)",
              }}
            >
              曜日から見る
              <span aria-hidden>↓</span>
            </Link>
            <Link
              href="#areas"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 t-title no-underline"
              style={{
                background: "var(--paper)",
                color: "var(--ink)",
                border: "1px solid var(--line)",
              }}
            >
              エリアを選ぶ
            </Link>
          </div>
        </div>

        {/* Decorative meguri ribbon */}
        <svg
          aria-hidden
          className="absolute right-[-20px] bottom-[-40px] opacity-70"
          width="220"
          height="220"
          viewBox="0 0 220 220"
          fill="none"
        >
          <path
            d="M 20 200 C 60 140, 120 180, 160 120 C 200 60, 140 40, 200 20"
            stroke="var(--brand-blush)"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="20" cy="200" r="6" fill="var(--brand-orchid)" />
          <circle cx="160" cy="120" r="6" fill="var(--brand-sky)" />
          <circle cx="200" cy="20" r="6" fill="var(--brand-blush)" />
        </svg>
      </section>

      {/* Weekday checker — signature */}
      <section id="weekday" className="container-narrow py-14 md:py-20">
        <WeekdayChecker />
        <WeekdayMatrixSummary />
      </section>

      {/* Areas */}
      <section id="areas" className="container-narrow py-8 md:py-12">
        <header className="mb-6 md:mb-8">
          <p className="t-caption">エリアを選ぶ</p>
          <h2 className="t-display-m mt-1">
            半日〜1日で、無理なく回れる3エリア
          </h2>
        </header>
        <div className="grid gap-5 md:grid-cols-3">
          {areas.map((a) => (
            <AreaCard key={a.slug} area={a} />
          ))}
        </div>
      </section>

      {/* Theme courses */}
      {courses.length > 0 ? (
        <section id="courses" className="container-narrow py-14 md:py-20">
          <header className="mb-6 md:mb-8">
            <p className="t-caption">テーマ別コース</p>
            <h2 className="t-display-m mt-1">
              目的から選ぶ、歩いてつながる1日
            </h2>
          </header>
          <ul className="grid gap-4">
            {courses.map((c) => {
              const color = KEY_COLOR_VAR[c.keyColor];
              const soft = KEY_COLOR_SOFT_VAR[c.keyColor];
              return (
                <li key={c.slug}>
                  <Link
                    href={`/courses/${c.slug}`}
                    className="block rounded-2xl border p-5 md:p-6 no-underline overflow-hidden relative"
                    style={{
                      borderColor: "var(--line)",
                      background: `linear-gradient(120deg, ${color} 0%, ${soft} 40%, var(--paper) 100%)`,
                    }}
                  >
                    <p className="t-caption">
                      {c.category === "kpop"
                        ? "K-POP"
                        : c.category === "history"
                        ? "歴史"
                        : c.category === "cafe"
                        ? "カフェ"
                        : "買い物"}
                    </p>
                    <h3 className="t-display-m mt-1 text-ink">{c.tagline}</h3>
                    <p
                      className="t-body-s mt-2 max-w-[36rem]"
                      style={{ color: "var(--ink)" }}
                    >
                      {c.intro}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      {/* Guides */}
      <section className="container-narrow py-14 md:py-20">
        <header className="mb-6 md:mb-8">
          <p className="t-caption">旅の準備</p>
          <h2 className="t-display-m mt-1">
            出発前に、これだけ読んでおけば安心
          </h2>
        </header>
        <ul className="grid gap-4">
          {guides.map((g) => (
            <li key={g.slug}>
              <Link
                href={`/guides/${g.slug}`}
                className="block rounded-2xl border p-5 md:p-6 no-underline"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--paper)",
                }}
              >
                <p className="t-caption">
                  {g.category === "money"
                    ? "お金"
                    : g.category === "shopping"
                    ? "お土産"
                    : "準備"}
                </p>
                <h3 className="t-title mt-1 text-ink">{g.title}</h3>
                <p
                  className="t-body-s mt-2"
                  style={{ color: "var(--ink-2)" }}
                >
                  {g.summary}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Instagram */}
      <section className="container-narrow py-8 md:py-12">
        <InstagramBanner />
      </section>

      {/* Google Maps notice */}
      <section className="container-narrow py-14 md:py-20">
        <div
          className="rounded-2xl border p-5 md:p-6"
          style={{
            borderColor: "var(--line)",
            background: "var(--paper-2)",
          }}
        >
          <p className="t-caption">はじめてのソウルへ</p>
          <h2 className="t-title mt-1">
            韓国では Google マップの経路検索が使えません
          </h2>
          <p className="t-body-s mt-3">
            NAVERマップかカカオマップの利用が前提になります。
            当サイトでは各スポットに NAVERマップリンクを載せているので、
            出発前にブックマークしておくとスムーズです。
          </p>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(weekdayDatasetJsonLd),
        }}
      />
    </>
  );
}
