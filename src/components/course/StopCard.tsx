import type { Stop } from "@/content/types";
import { MapButton } from "@/components/ui/MapButton";
import { SpiceMeter } from "@/components/ui/SpiceMeter";

export function StopCard({ stop, index }: { stop: Stop; index: number }) {
  return (
    <article
      className="rounded-2xl border p-4 md:p-5"
      style={{
        borderColor: "var(--line)",
        background: "var(--paper)",
      }}
    >
      {stop.eyebrow ? (
        <p
          className="t-caption mb-1"
          style={{ color: "var(--accent)", fontWeight: 700 }}
        >
          {stop.eyebrow}
        </p>
      ) : null}
      <header className="flex items-baseline gap-3 flex-wrap">
        <span
          className="t-data rounded-full px-2.5 py-1"
          style={{
            background: "var(--paper-2)",
            color: "var(--ink-2)",
          }}
        >
          {stop.time}
        </span>
        <h3 className="t-title">
          <span
            className="t-caption mr-2 align-middle"
            style={{ color: "var(--ink-3)" }}
          >
            {String(index).padStart(2, "0")}
          </span>
          {stop.nameJa}
        </h3>
      </header>

      <p className="t-caption mt-1">{stop.nameKo}</p>

      {stop.walkFromPrev ? (
        <p className="t-caption mt-1">
          <span aria-hidden>🚶 </span>
          前のスポットから {stop.walkFromPrev}
        </p>
      ) : null}

      {stop.story ? (
        <p
          className="t-body-s mt-3"
          style={{
            paddingLeft: "12px",
            borderLeft: "3px solid var(--brand-orchid)",
            color: "var(--ink-2)",
          }}
        >
          {stop.story}
        </p>
      ) : null}

      <p className="t-body-s mt-3">{stop.blurb}</p>

      {stop.address ? (
        <p
          className="t-caption mt-2"
          style={{ color: "var(--ink-2)" }}
        >
          <span aria-hidden>📍 </span>
          {stop.address}
        </p>
      ) : null}

      <dl className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 t-body-s">
        {stop.hours ? (
          <div className="flex gap-2">
            <dt className="t-caption" style={{ color: "var(--ink-2)" }}>
              営業時間
            </dt>
            <dd>{stop.hours}</dd>
          </div>
        ) : null}
        {stop.fee ? (
          <div className="flex gap-2">
            <dt className="t-caption" style={{ color: "var(--ink-2)" }}>
              料金
            </dt>
            <dd>{stop.fee}</dd>
          </div>
        ) : null}
        {stop.reservation ? (
          <div className="flex gap-2">
            <dt className="t-caption" style={{ color: "var(--ink-2)" }}>
              予約
            </dt>
            <dd>
              {stop.reservation === "required"
                ? "必須"
                : stop.reservation === "recommended"
                ? "できれば"
                : "不要"}
            </dd>
          </div>
        ) : null}
      </dl>

      {stop.tips && stop.tips.length > 0 ? (
        <ul className="mt-3 space-y-1">
          {stop.tips.map((t) => (
            <li
              key={t}
              className="t-body-s pl-4 relative"
              style={{ color: "var(--ink-2)" }}
            >
              <span
                aria-hidden
                className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--brand-blush)" }}
              />
              {t}
            </li>
          ))}
        </ul>
      ) : null}

      {stop.spiceLevel ? (
        <div className="mt-3">
          <SpiceMeter level={stop.spiceLevel} />
        </div>
      ) : null}

      {stop.naverMapUrl || stop.googleMapsUrl ? (
        <MapButton naver={stop.naverMapUrl} google={stop.googleMapsUrl} />
      ) : null}
    </article>
  );
}
