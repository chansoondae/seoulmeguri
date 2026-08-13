import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-paper/90 backdrop-blur sticky top-0 z-40">
      <div className="container-narrow flex items-center justify-between h-14">
        <Link
          href="/"
          className="t-title text-ink no-underline flex items-center gap-2"
          aria-label="Seoulmeguri トップへ"
        >
          <span
            aria-hidden
            className="inline-block w-3 h-3 rounded-full"
            style={{ background: "var(--brand-blush)" }}
          />
          <span>Seoulmeguri</span>
          <span className="t-caption ml-1" style={{ color: "var(--ink-2)" }}>
            ソウルめぐり
          </span>
        </Link>
        <nav className="flex items-center gap-4 t-body-s">
          <Link href="/#areas" className="text-ink no-underline hover:underline">
            エリア
          </Link>
          <Link
            href="/guides/exchange"
            className="text-ink no-underline hover:underline"
          >
            旅の準備
          </Link>
          <Link href="/about" className="text-ink no-underline hover:underline">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
