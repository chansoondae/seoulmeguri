import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-narrow py-24 text-center">
      <p className="t-caption">404</p>
      <h1 className="t-display-l mt-2">見つかりませんでした</h1>
      <p className="t-body mt-4">
        URL が変わったか、削除された可能性があります。
      </p>
      <p className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full px-5 py-3 no-underline"
          style={{
            background: "var(--accent)",
            color: "var(--accent-ink)",
          }}
        >
          トップへ戻る
        </Link>
      </p>
    </section>
  );
}
