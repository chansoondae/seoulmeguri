import Link from "next/link";
import { SITE_INSTAGRAM } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer
      className="mt-24 border-t border-line"
      style={{ background: "var(--paper-2)" }}
    >
      <div className="container-narrow py-10 space-y-6">
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className="t-display-m">Seoulmeguri</span>
          <span className="t-caption">ソウルめぐり</span>
          <a
            href={SITE_INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram @seoulmeguri"
            className="ml-auto inline-flex items-center gap-1.5 t-body-s no-underline hover:underline"
            style={{ color: "var(--ink)" }}
          >
            <svg
              aria-hidden
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            @seoulmeguri
          </a>
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
            href="/courses/bts-seoul"
            className="text-ink no-underline hover:underline"
          >
            BTS聖地巡礼
          </Link>
          <Link
            href="/guides/exchange"
            className="text-ink no-underline hover:underline"
          >
            両替ガイド
          </Link>
          <Link
            href="/guides/souvenir"
            className="text-ink no-underline hover:underline"
          >
            お土産ガイド
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
