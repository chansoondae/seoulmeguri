import type { Stop } from "@/content/types";
import { WEEKDAY_SCHEMA } from "@/lib/weekday";

/**
 * Converts a Stop into a schema.org Place JSON-LD object, or returns null
 * when the stop lacks the minimum structured data (currently: geo
 * coordinates). Stops without geo are treated as narrative-only content
 * that shouldn't be emitted as machine-readable places.
 *
 * When present, structuredHours becomes openingHoursSpecification and
 * specialClosedDays becomes specialOpeningHoursSpecification entries with
 * opens=closes="00:00" (schema.org's convention for a full-day closure).
 */
export function stopToPlaceJsonLd(
  stop: Stop,
  fallbackLastVerified?: string,
): Record<string, unknown> | null {
  if (!stop.geo) return null;

  const placeType = stop.placeType ?? "TouristAttraction";
  const lastVerified = stop.lastVerified ?? fallbackLastVerified;

  const openingHoursSpecification = stop.structuredHours?.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.dayOfWeek.map((d) => WEEKDAY_SCHEMA[d]),
    opens: h.opens,
    closes: h.closes,
  }));

  // Regularly-closed weekdays: emit with opens=closes="00:00" so the entry
  // unambiguously signals "closed all day" per schema.org convention.
  const specialOpeningHoursSpecification = stop.specialClosedDays?.map((d) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: WEEKDAY_SCHEMA[d],
    opens: "00:00",
    closes: "00:00",
  }));

  return {
    "@context": "https://schema.org",
    "@type": placeType,
    name: stop.nameJa,
    alternateName: stop.nameKo,
    description: stop.blurb,
    ...(stop.address ? { address: stop.address } : {}),
    geo: {
      "@type": "GeoCoordinates",
      latitude: stop.geo.latitude,
      longitude: stop.geo.longitude,
    },
    ...(openingHoursSpecification
      ? { openingHoursSpecification }
      : {}),
    ...(specialOpeningHoursSpecification
      ? { specialOpeningHoursSpecification }
      : {}),
    ...(stop.fee ? { priceRange: stop.fee } : {}),
    ...(stop.naverMapUrl ? { url: stop.naverMapUrl } : {}),
    ...(lastVerified ? { dateModified: lastVerified } : {}),
    inLanguage: "ja",
  };
}
