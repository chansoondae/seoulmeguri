import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "このサイトについて",
  description:
    "Seoulmeguri は「いつ・どの順番で行くか」を教えてくれる日本語のソウル旅ガイドです。",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "このサイトについて",
    description:
      "Seoulmeguri は「いつ・どの順番で行くか」を教えてくれる日本語のソウル旅ガイドです。",
    url: "/about",
    type: "website",
    siteName: "Seoulmeguri",
    locale: "ja_JP",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Seoulmeguri｜ソウル、何曜日に行く？",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "このサイトについて",
    description:
      "Seoulmeguri は「いつ・どの順番で行くか」を教えてくれる日本語のソウル旅ガイドです。",
    images: ["/opengraph-image"],
  },
};

export default function AboutPage() {
  return (
    <>
      <section
        style={{
          background:
            "linear-gradient(160deg, var(--brand-ice) 0%, var(--paper) 60%)",
        }}
      >
        <div className="container-narrow py-12 md:py-16">
          <p className="t-caption">About</p>
          <h1 className="t-display-l mt-1">このサイトについて</h1>
          <p className="t-body mt-5 max-w-[36rem]">
            「どこに行くか」ではなく「いつ・どの順番で行くか」を教えてくれる、日本語のソウル旅ガイドです。
          </p>
        </div>
      </section>

      <section className="container-narrow py-12 md:py-16 space-y-8">
        <div>
          <h2 className="t-display-m">なぜ「曜日」なのか</h2>
          <p className="t-body mt-3">
            月曜日のソウルは、意外と閉まっています。市庁・貞洞は美術館も宮殿も休館で、
            守門将交代式もありません。漢南のギャラリーは日曜が弱く、江南だけがほぼ無休。
            この事実を最初に伝えるサイトが必要だと思って、Seoulmeguriを作りました。
          </p>
        </div>

        <div>
          <h2 className="t-display-m">情報の更新について</h2>
          <p className="t-body mt-3">
            営業時間・休館日は3ヶ月ごと、料金は半年ごと、
            商圏の状況(空室・閉店)は半年ごとに見直しています。
            各ページ下部の「更新日」が最新の確認日です。
          </p>
        </div>

        <div>
          <h2 className="t-display-m">歴史の話について</h2>
          <p className="t-body mt-3">
            貞洞や道山公園には、韓国と日本の近代史が交差する場所があります。
            事実は隠さず、連年と事実だけを短く記します。
            読み手の解釈に委ねる書き方を、このサイトの原則にしています。
          </p>
        </div>

        <div>
          <h2 className="t-display-m">連絡先</h2>
          <p className="t-body mt-3">
            Instagram の DM でお願いします。
            <br />
            <Link
              href="https://www.instagram.com/seoulmeguri/"
              target="_blank"
              rel="noopener noreferrer"
            >
              @seoulmeguri
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
