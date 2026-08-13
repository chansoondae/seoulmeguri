"use client";

import { useEffect, useRef } from "react";
import type { KeyColor, Stop } from "@/content/types";
import { KEY_COLOR_VAR } from "@/lib/keyColor";
import { StopCard } from "./StopCard";

/**
 * MeguriLine — signature scroll-animated pastel curve that threads through
 * the course stops. Uses stroke-dashoffset animation, respects
 * prefers-reduced-motion.
 */
export function MeguriLine({
  stops,
  keyColor,
}: {
  stops: Stop[];
  keyColor: KeyColor;
}) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;

    if (reduced) {
      path.style.strokeDashoffset = "0";
      return;
    }

    path.style.strokeDashoffset = `${length}`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            path.style.transition =
              "stroke-dashoffset 2.4s cubic-bezier(0.65, 0, 0.35, 1)";
            path.style.strokeDashoffset = "0";
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 },
    );
    observer.observe(path);

    return () => observer.disconnect();
  }, [stops.length]);

  const color = KEY_COLOR_VAR[keyColor];

  return (
    <div className="relative">
      {/* SVG curve behind the stops (mobile: hidden on very narrow screens for clarity) */}
      <svg
        aria-hidden
        className="absolute left-4 md:left-6 top-0 h-full pointer-events-none hidden sm:block"
        width="40"
        height="100%"
        viewBox="0 0 40 1000"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d="M 20 0 C 40 200, 0 400, 20 500 C 40 700, 0 900, 20 1000"
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>

      <ol className="relative space-y-6">
        {stops.map((stop, i) => (
          <li key={`${stop.time}-${stop.nameJa}`} className="relative">
            {/* Node dot on the line */}
            <span
              aria-hidden
              className="absolute left-3 md:left-5 top-4 w-4 h-4 rounded-full ring-4"
              style={{
                background: color,
                boxShadow: "0 0 0 4px var(--paper)",
              }}
            />
            <div className="pl-10 md:pl-14">
              <StopCard stop={stop} index={i + 1} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
