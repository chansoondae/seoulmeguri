export function UpdatedAt({ date }: { date: string }) {
  return (
    <p className="t-caption">
      <span aria-hidden>🕓 </span>
      更新日：<time dateTime={date}>{date}</time>
    </p>
  );
}
