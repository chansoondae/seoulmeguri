import type { Course } from "@/content/types";

export const btsSeoul: Course = {
  slug: "bts-seoul",
  category: "kpop",
  nameJa: "舞台になったソウル｜BTS聖地巡礼 1日コース",
  tagline: "舞台になったソウル",
  intro:
    "BTSがステージにしてきた場所って、じつはソウルの真ん中に固まっています。景福宮、光化門広場、崇礼門。地図で並べてみると、ぜんぶ歩ける距離。だから今回は、朝から夜まで一本でつながるコースにしました。",
  keyColor: "orchid",
  updatedAt: "2026-08-13",

  access: {
    start: {
      line: "地下鉄3号線",
      name: "景福宮駅",
      exit: "5番出口",
    },
    end: {
      line: "地下鉄7号線",
      name: "論峴駅",
      exit: "ユジョン食堂まで徒歩",
    },
  },

  headline: {
    severity: "danger",
    title:
      "BTS聖地巡礼コースは、景福宮が休宮の火曜日には成立しません",
    body: "コースいちばんの見どころである景福宮（慶会楼・勤政殿）が火曜は終日閉まっているため、火曜日はこの1日コース全体が成立しません。ベストは水曜〜日曜。月曜は崇礼門の城郭内部に入れませんが、外から見るぶんには問題ありません。",
  },

  weekdayNote:
    "BTS聖地巡礼コースは、景福宮（慶会楼）が休宮の火曜日は成立しません。月曜は崇礼門の城郭内部に入れませんが、外観は24時間見られます。ベストは水〜日。",
  weekdayTable: [
    {
      facility: "景福宮（慶会楼）",
      states: {
        mon: "good",
        tue: "closed",
        wed: "good",
        thu: "good",
        fri: "good",
        sat: "good",
        sun: "good",
      },
    },
    {
      facility: "光化門広場",
      states: {
        mon: "good",
        tue: "good",
        wed: "good",
        thu: "good",
        fri: "good",
        sat: "good",
        sun: "good",
      },
    },
    {
      facility: "乙支茶房",
      states: {
        mon: "good",
        tue: "good",
        wed: "good",
        thu: "good",
        fri: "good",
        sat: "good",
        sun: "good",
      },
    },
    {
      facility: "崇礼門（城郭内部）",
      states: {
        mon: "closed",
        tue: "good",
        wed: "good",
        thu: "good",
        fri: "good",
        sat: "good",
        sun: "good",
      },
      note: "月曜は内部観覧休み。外観は24時間可",
    },
    {
      facility: "ユジョン食堂",
      states: {
        mon: "good",
        tue: "good",
        wed: "good",
        thu: "good",
        fri: "good",
        sat: "good",
        sun: "good",
      },
    },
  ],

  stops: [
    {
      time: "09:30",
      nameJa: "景福宮（慶会楼・勤政殿）",
      nameKo: "경복궁 (경회루·근정전)",
      eyebrow: "ジミー・ファロンショー「BTSウィーク」の舞台",
      story:
        "2020年10月、ジミー・ファロンショーの「BTSウィーク」4日目。その舞台になったのが、勤政殿の北西にある池に建てられた慶会楼でした。「IDOL」と「Mikrokosmos（小宇宙）」を、ここで披露しています。水面に浮かんでいるように見える楼閣と、朝鮮王朝の正殿。あの映像で世界中が「これが韓国の宮殿か」と知った場所です。",
      blurb:
        "朝いちばんに行くのがおすすめ。9時半ならまだ空いていて、10時を過ぎるとどんどん人が増えます。",
      hours: "09:00〜18:00（火曜休宮）",
      fee: "大人3,000ウォン（韓服着用なら無料）",
      closedDays: ["tue"],
      tips: [
        "慶会楼の内部は特別観覧のみ。外からの眺めがメインです",
        "守門将交代式は10:00と14:00。時間が合えば足を止める価値あり",
      ],
      naverMapUrl: "https://map.naver.com/p/search/경복궁",
      placeType: "LandmarksOrHistoricalBuildings",
      address: "ソウル特別市鍾路区社稷路161",
      geo: { latitude: 37.5796, longitude: 126.9770 },
      structuredHours: [
        {
          dayOfWeek: ["mon", "wed", "thu", "fri", "sat", "sun"],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      specialClosedDays: ["tue"],
    },
    {
      time: "11:30",
      nameJa: "光化門広場",
      nameKo: "광화문 광장",
      eyebrow: "《ARIRANG》カムバックライブ会場（2026.3.21）",
      story:
        "2026年3月21日。ここでBTSが帰ってきました。正規5集《ARIRANG》のカムバックライブ。Netflixで190を超える国と地域に生中継されて、光化門の3つの門がすべて開かれ、メンバーはその門をくぐって登場しました。",
      blurb:
        "いま行っても、当日の痕跡は何も残っていません。ただの広い広場です。でも、光化門を背にして立ってみてください。その向きが、あの日ステージがあった方向。知っているかどうかで、同じ景色がまったく別のものに見えます。",
      walkFromPrev: "景福宮から徒歩5分（南へまっすぐ）",
      naverMapUrl: "https://map.naver.com/p/search/광화문광장",
      placeType: "TouristAttraction",
      address: "ソウル特別市鍾路区世宗大路175",
      geo: { latitude: 37.5720, longitude: 126.9769 },
    },
    {
      time: "12:40",
      nameJa: "乙支茶房",
      nameKo: "을지다방",
      eyebrow: "2021シーズングリーティング撮影地",
      story:
        "2021シーズングリーティングのレトロ撮影地。入口には「BTS聖地」の看板が出ていて、店のあちこちにメンバーの写真が貼られています。迷いようがありません。",
      blurb:
        "名物は、卵の黄身がまるごと浮かんだ双和茶（サンファチャ）。Vが飲んでいたのがこれです。ナッツの香ばしさと、シナモンに似た甘さ。黄身は先に食べてから、お茶を飲むのが定番だそうです。1970〜80年代のインテリアがそのまま残っていて、日本人の目には昭和の喫茶店に見えると思います。そこが逆に落ち着くかも。",
      hours: "06:00開店（日曜は9:00）",
      tips: [
        "食事メニューはラーメン程度。ランチは近くの乙支路で別に済ませてください",
      ],
      naverMapUrl: "https://map.naver.com/p/search/을지다방",
    },
    {
      time: "13:20",
      nameJa: "乙支路レトロ散歩（30分）",
      nameKo: "을지로·충무로 일대",
      eyebrow: "シーズングリーティング撮影エリア",
      story:
        "シーズングリーティングの撮影は、乙支路・忠武路一帯でまとめて行われました。茶房だけで帰るのはもったいないので、周辺を軽く一周。",
      blurb:
        "チョンジュチプ（忠武路11ギル18-8）／礼智洞 時計横丁（昌慶宮路13ギル30）／ウリ・ビリヤード場（忠武路53-1）。どれも徒歩5〜10分圏内。写真を撮りながら歩いて30分くらいです。この路地の空気そのものが、けっこういい。",
      walkFromPrev: "乙支茶房から徒歩すぐ",
    },
    {
      time: "14:30",
      nameJa: "崇礼門（南大門）",
      nameKo: "숭례문 (남대문)",
      eyebrow: "Global Citizen Live オープニング（2021.9）",
      story:
        "2021年9月、国際チャリティーコンサート「Global Citizen Live」の舞台。「Permission to Dance」でこのコンサートの幕を開けました。アメリカ、フランス、ブラジルなど世界中に配信された、その最初の1分がここです。景福宮 → 光化門 → 崇礼門。気づけば、ソウルを代表する史跡を順番にステージにしてきたことになります。このコースが成立するのは、そのおかげ。",
      blurb:
        "外から見るだけなら24時間いつでも、無料。城郭内部の観覧は月曜休み。",
      walkFromPrev: "乙支路から地下鉄で2駅、または徒歩20分",
      fee: "無料",
      closedDays: ["mon"],
      naverMapUrl: "https://map.naver.com/p/search/숭례문",
      placeType: "LandmarksOrHistoricalBuildings",
      address: "ソウル特別市中区世宗大路40",
      geo: { latitude: 37.5601, longitude: 126.9753 },
      structuredHours: [
        {
          dayOfWeek: ["tue", "wed", "thu", "fri", "sat", "sun"],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      specialClosedDays: ["mon"],
    },
    {
      time: "16:00",
      nameJa: "HYBE社屋",
      nameKo: "하이브 사옥",
      eyebrow: "1階常設ポップアップ（2026.3〜）",
      story:
        "ソウル駅から地下鉄で2駅。龍山にあります。2026年3月、1階ロビーの一部を改装して常設のポップアップ空間ができました。幅17.5m・高さ4mの大型メディアウォールがあって、ミュージックビデオやコンセプトフィルム、ビハインド映像が流れています。アルバムの世界観に合わせて、展示ごと組み替える仕組み。公式グッズもここで買えます。",
      blurb:
        "ここは働いている人がいるオフィスです。出退勤の時間帯にエントランスへカメラを向けるのは避けましょう。ポップアップの運営状況は変わることがあるので、行く前に公式チャンネルで確認を。",
      walkFromPrev: "ソウル駅から地下鉄で2駅（龍山）",
      naverMapUrl: "https://map.naver.com/p/search/하이브",
      placeType: "Store",
      address: "ソウル特別市龍山区漢江大路42",
      geo: { latitude: 37.5265, longitude: 126.9642 },
    },
    {
      time: "17:30",
      nameJa: "漢江大橋・ノドゥル島",
      nameKo: "한강대교·노들섬",
      eyebrow: "「Run」MV撮影地／2021シーズングリーティング",
      story:
        "「花様年華」シリーズのフィナーレ、「Run」のミュージックビデオ撮影地。漢江大橋を背景に、メンバーが思いきり走って叫んでいた、あの開けた場所です。5年後、同じ場所で2021シーズングリーティングを撮影しました。1990年代風の衣装で、63スクエアを背景にしたあの写真です。",
      blurb:
        "夕暮れに合わせて行ってください。川の向こうに63スクエアが立っていて、水面が金色になる時間があります。あの写真の光が、実際どういうものだったかが分かります。",
      naverMapUrl: "https://map.naver.com/p/search/노들섬",
    },
    {
      time: "19:00",
      nameJa: "ユジョン食堂",
      nameKo: "유정식당",
      eyebrow: "練習生時代の行きつけ／夕食",
      story:
        "練習生時代、メンバーが通っていたごはん屋さん。天井まで含めて店じゅうがBTSの写真で埋まっています。初めて入ると、ちょっと圧倒されるかも。",
      blurb:
        "料理は石焼ビビンバとスンドゥブが中心の、ごく普通の韓国の家庭料理。でもこれが素直においしくて、ファンじゃない人と行っても成立します。ビーガン対応のメニューがはっきり表示されているのも、地味にありがたいポイント。",
      walkFromPrev: "漢江からタクシーで20分",
      tips: [
        "待ち時間はふだん短めですが、コンサート期間中は行列になります",
        "2階にトイレあり",
      ],
      naverMapUrl: "https://map.naver.com/p/search/유정식당 논현",
      placeType: "Restaurant",
      address: "ソウル特別市江南区論峴一帯",
      geo: { latitude: 37.5115, longitude: 127.0261 },
    },
  ],

  extras: [
    {
      time: "半日別枠",
      nameJa: "文化備蓄基地（麻浦）",
      nameKo: "문화비축기지",
      eyebrow: "Run BTS! 86〜88話撮影地",
      story:
        "「Run BTS!」86〜88話、ハングルの日スペシャルの撮影地。石油タンクを文化空間に変えた場所で、メンバーはT1からT6まで走り回って鬼ごっこをしていました。",
      blurb:
        "都心から少し離れているので、半日を別に取るつもりで。月曜休館です。",
      closedDays: ["mon"],
      naverMapUrl: "https://map.naver.com/p/search/문화비축기지",
    },
    {
      time: "予約制",
      nameJa: "韓国家具博物館（城北洞）",
      nameKo: "한국가구박물관",
      eyebrow: "You Quiz on the Block BTS編ロケ地",
      story:
        "「You Quiz on the Block」BTS編で、RMとVのインタビューが行われた東屋と中庭。韓屋10棟と古家具2,550点あまりが並ぶ、CNNが「ソウルでいちばん美しい博物館」と紹介した場所です。",
      blurb:
        "ハードルは高めです。完全予約制で当日ふらっとは入れません。英語ツアーは毎日あるわけではなく、撮影はほとんど禁止。それでも、行った人の満足度がいちばん高いのはここかもしれません。",
      reservation: "required",
      naverMapUrl: "https://map.naver.com/p/search/한국가구박물관",
    },
  ],

  outOfSeoul: [
    {
      time: "1泊必要",
      nameJa: "チュムンジン海岸のバス停・三陟",
      nameKo: "주문진·삼척",
      eyebrow: "You Never Walk Alone ジャケット撮影地",
      story:
        "チュムンジン海岸のバス停（You Never Walk Aloneのジャケット）と三陟。江原道なので日帰りは無理です。",
      blurb: "行くなら1泊を別に組んでください。",
    },
  ],

  exclusion: {
    title: "このページに載せていないもの",
    intro:
      "BTS聖地巡礼として紹介されることがあっても、私たちが載せないものがあります。",
    items: [
      "メンバーの自宅、実家、ご家族が営むお店",
      "通っているジム、病院、美容室",
      "宿泊先の前で待つ場所、空港のゲート情報",
    ],
    outro:
      "このコースに入れたのは、公開されている場所と、お店の側が歓迎してくれている場所だけです。好きだからこそ、行っていい場所とそうでない場所があると思っています。",
  },

  pitfalls: [
    {
      severity: "warn",
      title: "HYBE社屋はオフィス。マナー最優先",
      body: "働いている人がいる場所です。出退勤の時間帯にエントランスへカメラを向けるのは避けましょう。撮っても引きの外観までで、社員の方が写り込まないように配慮を。",
    },
    {
      severity: "info",
      title: "コンサート期間中は行列に",
      body: "ユジョン食堂は普段は待ち時間短めですが、公演期間中は行列になります。時間に余裕を持って。",
    },
  ],

  faq: [
    {
      q: "半日でも回れますか？",
      a: "景福宮 → 光化門広場 → 乙支茶房まで。ここまでなら3時間くらいです。午後から予定がある日でも、午前中だけで気持ちよくまとまります。",
    },
    {
      q: "何曜日がいちばんいいですか？",
      a: "水曜から日曜。火曜は景福宮が閉まるので避けてください。",
    },
    {
      q: "コンサートの前後に組み込めますか？",
      a: "はい。むしろそういう日程の方が多いと思います。公演当日は移動を減らしたいので、前日か翌日に入れるのがおすすめです。",
    },
    {
      q: "ファンじゃない友達と一緒でも大丈夫？",
      a: "たぶん大丈夫です。景福宮も崇礼門も漢江も、そもそもソウルの定番観光地なので。BTSの話をどれくらいするかは、そのとき決めればいいと思います。",
    },
    {
      q: "写真を撮るときに気をつけることは？",
      a: "HYBE社屋だけ気をつけてください。働いている人がいる場所です。それ以外は普通の観光地なので、いつも通りで大丈夫。",
    },
  ],
  relatedAreas: ["city-hall", "gangnam"],
  relatedGuides: ["souvenir", "exchange"],
};
