export function InstagramBanner() {
  return (
    <a
      href="https://www.instagram.com/seoulmeguri/"
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-3xl border p-6 md:p-8 no-underline"
      style={{
        borderColor: "var(--line)",
        background:
          "linear-gradient(135deg, var(--brand-orchid) 0%, var(--brand-petal) 60%, var(--brand-blush) 100%)",
        color: "var(--ink)",
      }}
    >
      <p className="t-caption">Instagram</p>
      <p className="t-display-m mt-1">@seoulmeguri</p>
      <p className="t-body-s mt-2">
        「今日のソウル」を、写真とキャプションで。フォローすると新着エリアの通知も届きます。
      </p>
    </a>
  );
}
