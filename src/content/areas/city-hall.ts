import type { Area } from "@/content/types";

export const cityHall: Area = {
  slug: "city-hall",
  nameJa: "市庁・貞洞",
  nameKo: "시청·정동",
  reading: "シチョン・チョンドン",
  tagline: "歩いて回れる、100年前のソウル",
  intro:
    "宮殿とレンガの洋館が同じ道に並んでる不思議なエリア。半日あれば十分だから、明洞に泊まる人の「午前中どうしよう」にちょうどいいです。",
  keyColor: "sky",
  station: {
    line: "地下鉄1・2号線",
    name: "市庁駅",
    exit: "2番出口",
  },
  goodFor: [
    "明洞に泊まっていて、午前中に近場をぶらつきたい人",
    "宮殿と近代建築、両方見たい人",
    "半日でぎゅっと回りたい人",
  ],
  notFor: [
    "月曜しか予定が空いていない人（ほぼ全滅です）",
    "最新のカフェ・ショッピングが目当ての人",
    "夜まで長く遊びたい人（19時以降は静かです）",
  ],
  weekday: {
    mon: "closed",
    tue: "good",
    wed: "good",
    thu: "good",
    fri: "good",
    sat: "good",
    sun: "good",
  },
  weekdayNote: "月曜はほぼ全滅。火〜日に行ってね",
  weekdayTable: [
    {
      facility: "徳寿宮",
      states: {
        mon: "closed",
        tue: "good",
        wed: "good",
        thu: "good",
        fri: "good",
        sat: "good",
        sun: "good",
      },
    },
    {
      facility: "守門将交代式",
      states: {
        mon: "closed",
        tue: "good",
        wed: "good",
        thu: "good",
        fri: "good",
        sat: "good",
        sun: "good",
      },
      note: "11:00 / 14:00 / 15:30・雨天中止",
    },
    {
      facility: "ソウル市立美術館",
      states: {
        mon: "closed",
        tue: "good",
        wed: "good",
        thu: "good",
        fri: "good",
        sat: "good",
        sun: "good",
      },
    },
    {
      facility: "ソウル図書館",
      states: {
        mon: "closed",
        tue: "good",
        wed: "good",
        thu: "good",
        fri: "good",
        sat: "good",
        sun: "good",
      },
    },
    {
      facility: "貞洞展望台",
      states: {
        mon: "partial",
        tue: "partial",
        wed: "partial",
        thu: "partial",
        fri: "partial",
        sat: "good",
        sun: "good",
      },
      note: "平日13:30〜 / 土日9:00〜 / 祝日休み",
    },
  ],
  stops: [
    {
      time: "10:00",
      nameJa: "徳寿宮",
      nameKo: "덕수궁",
      blurb:
        "李朝末期の宮殿。石造殿(旧西洋館)がフォトジェニックで、朝いちなら空いてます。",
      fee: "大人1,000ウォン（韓服着用で無料）",
      hours: "9:00-21:00 / 月曜休み",
      naverMapUrl: "https://map.naver.com/p/search/덕수궁",
    },
    {
      time: "11:00",
      nameJa: "大漢門 守門将交代式",
      nameKo: "대한문 수문장 교대식",
      blurb: "20分ほどの儀式。無料で見られます。真横で撮っても大丈夫。",
      hours: "11:00 / 14:00 / 15:30",
      tips: ["雨天・猛暑日は中止", "月曜は徳寿宮ごと休みなので開催なし"],
      walkFromPrev: "徒歩1分",
      naverMapUrl: "https://map.naver.com/p/search/덕수궁 대한문",
    },
    {
      time: "11:40",
      nameJa: "聖公会ソウル大聖堂",
      nameKo: "성공회 서울주교좌성당",
      blurb: "レンガ造りの聖公会大聖堂。内部は11:00-16:00のみ開放されます。",
      hours: "内部見学 11:00-16:00",
      walkFromPrev: "徒歩5分",
      naverMapUrl: "https://map.naver.com/p/search/성공회 서울주교좌성당",
    },
    {
      time: "12:20",
      nameJa: "北倉洞スンドゥブ 本店",
      nameKo: "북창동 순두부 본점",
      blurb:
        "白いおぼろ豆腐鍋の代表格。生卵を落として食べます。英語メニューあり。",
      spiceLevel: 2,
      walkFromPrev: "徒歩10分",
      naverMapUrl: "https://map.naver.com/p/search/북창동 순두부 본점",
    },
    {
      time: "13:40",
      nameJa: "貞洞展望台",
      nameKo: "정동전망대",
      blurb:
        "市の建物の中にある無料展望台。徳寿宮を上から見おろせる、隠れスポット。",
      fee: "無料",
      hours: "平日13:30〜 / 土日9:00〜 / 祝日休み",
      walkFromPrev: "徒歩8分",
      naverMapUrl: "https://map.naver.com/p/search/정동전망대",
    },
    {
      time: "14:40",
      nameJa: "徳寿宮石垣道・貞洞キル",
      nameKo: "덕수궁 돌담길·정동길",
      blurb:
        "石垣沿いのゆったりした散歩道。11月上旬の銀杏並木がいちばん有名です。",
      walkFromPrev: "徒歩2分",
      naverMapUrl: "https://map.naver.com/p/search/덕수궁 돌담길",
    },
    {
      time: "15:10",
      nameJa: "ソウル市立美術館",
      nameKo: "서울시립미술관",
      blurb:
        "旧最高裁判所の建物を使った市立美術館。企画展が良質で、しかも入場無料。",
      fee: "無料（企画展は別料金の場合あり）",
      hours: "10:00-20:00 / 月曜休み",
      walkFromPrev: "徒歩5分",
      naverMapUrl: "https://map.naver.com/p/search/서울시립미술관",
    },
    {
      time: "16:30",
      nameJa: "貞洞第一教会",
      nameKo: "정동제일교회",
      blurb:
        "韓国最初のプロテスタント教会(1897年)。外観だけでも歴史の重みが十分。",
      walkFromPrev: "徒歩3分",
      naverMapUrl: "https://map.naver.com/p/search/정동제일교회",
    },
    {
      time: "17:10",
      nameJa: "ソウル図書館（旧市庁舎）",
      nameKo: "서울도서관 (구 서울시청)",
      blurb: "1926年築の旧市庁舎。3階に旧市長室がそのまま保存されています。",
      hours: "火〜金 9:00-21:00 / 土日 9:00-18:00 / 月曜休み",
      walkFromPrev: "徒歩8分",
      naverMapUrl: "https://map.naver.com/p/search/서울도서관",
    },
    {
      time: "18:30",
      nameJa: "乙支路ノガリ横丁",
      nameKo: "을지로 노가리 골목",
      blurb:
        "干しスケトウダラをつまみに生ビール。21時以降は路上まで椅子が出ます。",
      walkFromPrev: "徒歩20分（またはタクシー5分）",
      naverMapUrl: "https://map.naver.com/p/search/을지로 노가리 골목",
    },
  ],
  extras: [
    {
      time: "予備",
      nameJa: "ソウル市庁 9階 空展望台",
      nameKo: "서울시청 9층 하늘광장",
      blurb:
        "月曜など貞洞展望台が閉まっている日の代わりに。平日午前が空いてます。",
      hours: "平日 9:00-18:00（要確認）",
      naverMapUrl: "https://map.naver.com/p/search/서울시청",
    },
    {
      time: "予備",
      nameJa: "武橋洞タコ通り",
      nameKo: "무교동 낙지",
      blurb:
        "小ダコ炒めの本場。真っ赤で本気で辛いので、辛いのが得意でも覚悟して。",
      spiceLevel: 5,
      naverMapUrl: "https://map.naver.com/p/search/무교동 낙지",
    },
  ],
  pitfalls: [
    {
      severity: "danger",
      title: "月曜日はこのコースが成立しません",
      body: "徳寿宮・守門将交代式・ソウル市立美術館・ソウル図書館がすべて休館。月曜しかスケジュールが空いていない日は、江南か聖水に振ってください。",
    },
    {
      severity: "info",
      title: "展望台は曜日で使い分け",
      body: "貞洞展望台は平日13:30オープン。午前中に見たいときはソウル市庁9階の空展望台がおすすめです。",
    },
    {
      severity: "warn",
      title: "武橋洞のタコは相当辛い",
      body: "「辛いの平気」な人でもけっこうやられます。心配なら「덜 맵게 해주세요(トル メッケ ヘジュセヨ / 辛さ控えめでお願いします)」を。",
    },
  ],
  updatedAt: "2026-08-13",
};
