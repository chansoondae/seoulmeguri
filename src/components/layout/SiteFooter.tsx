import Link from "next/link";

export function SiteFooter() {
  return (
    <footer
      className="mt-24 border-t border-line"
      style={{ background: "var(--paper-2)" }}
    >
      <div className="container-narrow py-10 space-y-6">
        <div className="flex items-baseline gap-3">
          <span className="t-display-m">Seoulmeguri</span>
          <span className="t-caption">ソウルめぐり</span>
        </div>
        <p className="t-body-s" style={{ color: "var(--ink-2)" }}>
          「どこに行くか」ではなく「いつ・どの順番で行くか」を教えてくれる、日本語のソウル旅ガイドです。
        </p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 t-body-s">
          <Link href="/areas/city-hall" className="text-ink no-underline hover:underline">
            市庁・貞洞
          </Link>
          <Link href="/areas/hannam" className="text-ink no-underline hover:underline">
            漢南
          </Link>
          <Link href="/areas/gangnam" className="text-ink no-underline hover:underline">
            江南
          </Link>
          <Link
            href="/guides/exchange"
            className="text-ink no-underline hover:underline"
          >
            両替ガイド
          </Link>
          <Link href="/about" className="text-ink no-underline hover:underline">
            このサイトについて
          </Link>
        </nav>
        <p className="t-caption">
          営業時間・料金・休館日は変動します。訪問前に公式情報の確認をおすすめします。
          <br />
          © {new Date().getFullYear()} Seoulmeguri
        </p>
      </div>
    </footer>
  );
}
