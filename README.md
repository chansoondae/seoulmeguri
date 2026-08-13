# Seoulmeguri (ソウルめぐり)

> 日本人旅行者のためのソウル旅行ガイド
> **「どこに行くか」ではなく「いつ・どの順番で行くか」を教えてくれる日本語サイト**

- Instagram: [@seoulmeguri](https://www.instagram.com/seoulmeguri/)
- Live: https://seoulmeguri.com
- 対象: ソウル旅行を計画中の日本人女性、20〜30代中心
- 言語: **日本語単一** (韓国語・英語対応なし)

---

## なぜこのサイトか

日本語のソウル情報は飽和状態です。同じ土俵では勝てません。競合分析から見えた **構造的な空白** は2つ:

1. **「曜日」軸がない** — 「月曜日に行くと半分閉まっている」を正面から扱う日本語ページがほぼない
2. **情報が古い** — カロスキルの空室率が43.9%なのに、日本語ガイドは今もカロスキルを一番に紹介する

Seoulmeguri のポジション: **「行ける日・行けない日」と「今の正しい情報」を言い切るサイト**

---

## v1 スコープ

**含む**
- ランディング (トップ)
- エリアコース 3つ: 市庁・貞洞 / 漢南 / 江南
- 旅の準備記事 1本: 両替ガイド
- 曜日チェッカー (シグネチャ機能)
- Instagram バナー

**含まない** (v2 以降)
- 聖水・弘大・汝矣島・三清コース
- 美容(ヘア・パーソナルカラー)ページ
- 検索 / フィルタ UI
- CMS / ログイン / 予約

詳細は [`spec.md`](./spec.md) を参照。

---

## Tech Stack

| 分野 | 採用 |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (`@theme inline` でトークン定義) |
| Fonts | Zen Maru Gothic / Zen Kaku Gothic New / Outfit |
| Content | TypeScript files (`src/content/**`) — CMS なし |
| OG Image | `next/og` (satori) + ローカル JP フォント |
| Deploy | Vercel |

---

## Getting Started

```bash
npm install
npm run dev       # http://localhost:3000
npm run build
npm start
```

Node 20+ を推奨。

---

## Directory

```
src/
  app/
    layout.tsx                       lang="ja" / metadata / fonts / JSON-LD
    page.tsx                         トップ
    areas/[slug]/page.tsx            エリア詳細
    areas/[slug]/opengraph-image.tsx エリア別動的 OG 画像
    guides/[slug]/page.tsx           旅の準備記事
    about/page.tsx
    opengraph-image.tsx              トップの OG 画像
    sitemap.ts / robots.ts
    favicon.ico                      ライト
  components/
    weekday/WeekdayChecker.tsx       ← シグネチャ (KST 基準)
    course/MeguriLine.tsx            ← シグネチャ (SVG stroke アニメーション)
    ...
  content/
    types.ts
    areas/{city-hall,hannam,gangnam}.ts
    guides/exchange.ts
  lib/
    weekday.ts    KST 基準の曜日判定
    og.ts         ImageResponse ヘルパ
    site.ts       サイト URL / 名前
public/
  fonts/ZenMaruGothic-Bold.ttf       OG 画像用 (satori)
  og/{top,cityhall,hannam,gangnam}.jpg
  icon-dark.ico                      ダークモード favicon
```

---

## デザインシステム

**カラー**: Pastel Dreamland Adventure パレットをブランド 5色として採用。5色すべて明度が高いため、
文字用の派生トークン (`--ink`, `--accent`, `--link`, `--warn`) を CSS 変数として追加。ブランド 5色の
上には `--ink` のみを配置し、白文字は禁止。

**タイポグラフィ**: 日本語サイトなので JP フォント選定が肝。

| 役割 | フォント |
|---|---|
| Display (見出し) | Zen Maru Gothic 700 |
| Body (本文) | Zen Kaku Gothic New 400/500 |
| Utility (時刻・数字) | Outfit 500 |

- 本文 `line-height: 1.9` (日本語は行間を広めに)
- 太字乱用禁止 — 日本語ゴシックのボールドはページを騒がしくする

**シグネチャは 2つだけ**: めぐりライン (SVG) と 曜日チェッカー。
それ以外の装飾アニメーションは入れない (パステル + 過剰モーションは即「AI 製サイト」に見える)。

---

## 文体

20代女性が友達に教えるトーン。「私」の視点、断定的な広告文句は避け、
数字と時刻は具体的に。1文 40字以内が目標。

避けたい表現: 「〜しちゃう♡」「〜すぎる件」「〜しか勝たん」

---

## コンテンツ運用ルール

- 営業時間・休館日は3ヶ月ごと、料金は半年ごと、商圏状況(空室・閉店)は半年ごとに見直す
- 各ページに `更新日` を表示
- 歴史情報 (乙巳条約・安昌浩など) は **年と事実のみ短く記す**。解釈・感情は付けない
- 数字は必ず出典とセットで (例: 「空室率43.9%」)
- 競合媒体の文章は翻訳・転載しない。事実情報のみを新しい文章で書く

---

## SEO

- 全ページ SSG プリレンダー、ページ別 `title` / `description` / `canonical` / `og:url`
- `next/og` で全ページ動的 OG 画像 (エリアはキーカラー反映)
- `Organization` / `WebSite` JSON-LD (layout)
- 狙うキーワード: `ソウル 月曜日 休み`, `北村 韓屋村 過怠料`, `カロスキル 今`, `漢南 ギャラリー 曜日`, `韓国 両替 WOWPASS 比較`
- ライト / ダーク両対応 favicon (`prefers-color-scheme`)

---

## 品質基準 (Definition of Done)

- モバイル 375px 幅で横スクロールなし
- Lighthouse: Performance ≥ 90 / Accessibility ≥ 95 (モバイル)
- LCP < 2.5s (4G スロットル)
- 全テキストが WCAG AA 対応
- キーボードのみで曜日チェッカー操作可能。フォーカスリング可視
- `prefers-reduced-motion` を尊重 (めぐりライン アニメーションスキップ)
- 全スポットに NAVER マップリンク (Google マップは韓国で経路検索が使えないため)
- 各ページ下部に `更新日` 表示
- Footer に免責文 (営業時間・料金は変動 / 訪問前確認推奨)

---

## Roadmap

| バージョン | 内容 |
|---|---|
| **v1** (現在) | トップ + 3エリア + 両替ガイド + 曜日チェッカー |
| v1.1 | Instagram API 連携 |
| v2 | 聖水 (ポップアップカレンダー) / 弘大 / 汝矣島 / 三清 |
| v2.1 | 「今週のポップアップ」週次更新コーナー |
| v3 | 美容予約ガイド / 韓国語フレーズ集 / 曜日から探す検索 |

---

## License

Private (v1). コンテンツの無断転載はお断りします。
