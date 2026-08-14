const RECENT_DAYS = 30;

export function isRecent(updatedAt: string, days: number = RECENT_DAYS): boolean {
  const updated = Date.parse(updatedAt);
  if (Number.isNaN(updated)) return false;
  const diffMs = Date.now() - updated;
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= days;
}
