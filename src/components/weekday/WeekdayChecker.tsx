"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Weekday, OpenState } from "@/content/types";
import { areas } from "@/content/areas";
import {
  WEEKDAYS,
  WEEKDAY_JA,
  WEEKDAY_JA_FULL,
  OPEN_STATE_SYMBOL,
  OPEN_STATE_LABEL,
  getSeoulWeekday,
} from "@/lib/weekday";
import { KEY_COLOR_VAR } from "@/lib/keyColor";

const STATE_COLOR: Record<OpenState, string> = {
  good: "var(--brand-ice)",
  partial: "var(--brand-petal)",
  closed: "var(--brand-orchid)",
};

function pickHeadline(day: Weekday | null): string {
  if (!day) return "今日は何曜日？";
  const map: Record<Weekday, string> = {
    mon: "月曜日のソウル、けっこう閉まってます",
    tue: "火曜日、ほぼ全エリアが開いてます",
    wed: "水曜日、いちばん動きやすい日かも",
    thu: "木曜日、静かで狙い目",
    fri: "金曜日、夜まで活気がある日",
    sat: "土曜日、どのエリアも動くけど混みます",
    sun: "日曜日、ギャラリー系は要注意",
  };
  return map[day];
}

export function WeekdayChecker() {
  const [selected, setSelected] = useState<Weekday | null>(null);

  useEffect(() => {
    setSelected(getSeoulWeekday());
  }, []);

  return (
    <section
      aria-labelledby="weekday-checker-heading"
      className="rounded-3xl border p-5 md:p-7"
      style={{
        borderColor: "var(--line)",
        background:
          "linear-gradient(180deg, var(--paper) 0%, color-mix(in oklab, var(--brand-ice) 30%, var(--paper)) 100%)",
      }}
    >
      <div className="flex items-baseline justify-between gap-3 flex-wrap">
        <h2 id="weekday-checker-heading" className="t-display-m">
          {pickHeadline(selected)}
        </h2>
        <span className="t-caption">曜日チェッカー（韓国時間 KST 基準）</span>
      </div>

      <div
        role="radiogroup"
        aria-label="曜日を選ぶ"
        className="mt-4 grid grid-cols-7 gap-1.5 md:gap-2"
      >
        {WEEKDAYS.map((day) => {
          const active = selected === day;
          const isSun = day === "sun";
          const isSat = day === "sat";
          return (
            <button
              key={day}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setSelected(day)}
              className="rounded-full py-2 t-title transition-all"
              style={{
                background: active ? "var(--ink)" : "var(--paper)",
                color: active
                  ? "var(--accent-ink)"
                  : isSun
                  ? "var(--accent)"
                  : isSat
                  ? "var(--link)"
                  : "var(--ink)",
                border: `1px solid ${
                  active ? "var(--ink)" : "var(--line)"
                }`,
              }}
            >
              {WEEKDAY_JA[day]}
            </button>
          );
        })}
      </div>

      {selected ? (
        <p className="t-body-s mt-4" style={{ color: "var(--ink-2)" }}>
          <strong className="text-ink">{WEEKDAY_JA_FULL[selected]}</strong>{" "}
          → 各エリアはこうなります
        </p>
      ) : (
        <p className="t-body-s mt-4" style={{ color: "var(--ink-2)" }}>
          曜日を選ぶと、3エリアの「行ける／行けない」がわかります。
        </p>
      )}

      <ul className="mt-3 space-y-2">
        {areas.map((area) => {
          const state = selected ? area.weekday[selected] : null;
          return (
            <li key={area.slug}>
              <Link
                href={`/areas/${area.slug}`}
                className="flex items-center gap-2 sm:gap-3 rounded-2xl border p-3 md:p-4 no-underline transition-colors"
                style={{
                  borderColor: "var(--line)",
                  background: state
                    ? `color-mix(in oklab, ${STATE_COLOR[state]} 30%, var(--paper))`
                    : "var(--paper)",
                }}
              >
                <span
                  aria-hidden
                  className="shrink-0 inline-block w-2.5 h-8 rounded-full"
                  style={{ background: KEY_COLOR_VAR[area.keyColor] }}
                />
                <span
                  aria-hidden
                  className="shrink-0 t-data text-lg w-6 text-center"
                  style={{ color: "var(--ink)" }}
                >
                  {state ? OPEN_STATE_SYMBOL[state] : "―"}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="t-title block text-ink">{area.nameJa}</span>
                  <span
                    className="t-body-s block"
                    style={{ color: "var(--ink-2)" }}
                  >
                    {selected ? OPEN_STATE_LABEL[state!] : area.tagline}
                    {selected && state === "closed"
                      ? "。今日は別エリアへ"
                      : selected && state === "partial"
                      ? "。目的次第"
                      : selected && state === "good"
                      ? "。ほぼ全部開いてます"
                      : ""}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="shrink-0 t-body-s"
                  style={{ color: "var(--ink-2)" }}
                >
                  →
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {selected === "mon" ? (
        <p
          className="mt-4 t-body-s rounded-2xl p-3"
          style={{
            background: "color-mix(in oklab, var(--brand-petal) 40%, var(--paper))",
            color: "var(--ink)",
          }}
        >
          月曜日は、正直おすすめできる日じゃないです。
          でも江南と聖水なら大丈夫。そっちに振りましょう。
        </p>
      ) : null}
    </section>
  );
}
