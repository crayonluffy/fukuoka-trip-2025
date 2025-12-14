"use client";

import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { 
  MapPin, Heart, Coffee, AlertCircle, Camera, Utensils, Calendar, 
  ExternalLink, Plane, Train, Ship, Link as LinkIcon, Loader2 
} from 'lucide-react';

// --- 設定區 ---

// 👇 把你的 Google Sheet CSV 連結貼在這裡。如果填錯或讀不到，會自動顯示下方的 INITIAL_DATA
const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRE1LpePw6cB0XBCg-gzVVHVCRmR3ywb5mxiCVKOw8FTRYDBnAk9n0WJ1ocwIhnIdGeuvYJfEj7C4f0/pub?gid=0&single=true&output=csv";

// --- 型別定義 ---

type CsvRow = {
  Date: string;
  Day: string;
  DayTitle: string;
  DayHighlight: string;
  DayTips: string;
  Time: string;
  Activity: string;
  Location: string;
  Icon: string;
  Link: string;
  LinkLabel: string;
};

type Activity = {
  time: string;
  activity: string;
  locationQuery: string;
  icon: React.ReactNode;
  url?: string;
  urlLabel?: string;
};

type ItineraryItem = {
  date: string;
  day: string;
  title: string;
  highlight: string;
  details: Activity[];
  tips: string;
};

// --- Helper Functions ---

const getMapLink = (query: string) => {
  if (!query) return "";
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
};

const getIconComponent = (iconName: string) => {
  const className = "w-4 h-4";
  switch (iconName?.toLowerCase().trim()) {
    case 'food': return <Utensils className={className} />;
    case 'train': return <Train className={className} />;
    case 'plane': return <Plane className={className} />;
    case 'map': return <MapPin className={className} />;
    case 'coffee': return <Coffee className={className} />;
    case 'camera': return <Camera className={className} />;
    case 'heart': return <Heart className={`${className} text-red-500`} />;
    case 'ship': return <Ship className={className} />;
    case 'alert': return <AlertCircle className={`${className} text-yellow-600`} />;
    default: return <MapPin className={className} />;
  }
};

// --- 預設資料 (Fallback Data) ---
// 當 Google Sheet 讀取失敗時，會顯示這份資料
const INITIAL_DATA: ItineraryItem[] = [
  {
    date: "12/26 (五)",
    day: "Day 1",
    title: "抵達福岡：時尚鍋物夜",
    highlight: "不去擠鰻魚飯，改吃福岡靈魂鍋物",
    details: [
      { time: "13:00", activity: "抵達福岡機場 (FUK)", locationQuery: "Fukuoka Airport", icon: <Plane className="w-4 h-4" /> },
      { time: "14:30", activity: "飯店 Check-in (博多站周邊)", locationQuery: "Hakata Station", icon: <MapPin className="w-4 h-4" /> },
      { time: "16:00", activity: "博多車站頂樓花園 & 聖誕燈飾", locationQuery: "JR Hakata City", icon: <Camera className="w-4 h-4" /> },
      { time: "18:30", activity: "晚餐：牛腸鍋 一藤 (博多店)", locationQuery: "Motsunabe Ichifuji Hakata", icon: <Utensils className="w-4 h-4" />, url: "https://www.ichifuji-f.jp/hakata/", urlLabel: "官網預約" },
      { time: "20:30", activity: "中洲屋台散步 (感受氣氛)", locationQuery: "Nakasu Yatai", icon: <Coffee className="w-4 h-4" /> },
    ],
    tips: "「一藤」的味噌口味是經典。博多站聖誕燈飾非常美，記得幫女朋友拍照！",
  },
  {
    date: "12/27 (六)",
    day: "Day 2",
    title: "熊本：古城與黑豚豬排",
    highlight: "入住熊本一晚，行程更優雅",
    details: [
      { time: "10:00", activity: "搭新幹線 -> 熊本 (約40分)", locationQuery: "Kumamoto Station", icon: <Train className="w-4 h-4" /> },
      { time: "12:30", activity: "午餐：勝烈亭 炸豬排 (新市街本店)", locationQuery: "Katsuretsu Tei Shinshigai", icon: <Utensils className="w-4 h-4" />, url: "http://hayashi-sangyo.jp/shop/shop-1", urlLabel: "店家資訊" },
      { time: "14:30", activity: "熊本城 & 城彩苑 (搭車上山)", locationQuery: "Kumamoto Castle", icon: <Camera className="w-4 h-4" /> },
      { time: "18:30", activity: "晚餐：菅乃屋 (馬肉料理) 或 燒肉", locationQuery: "Suganoya Kamitori", icon: <Utensils className="w-4 h-4" />, url: "https://service.suganoya.com/", urlLabel: "預約連結" },
    ],
    tips: "勝烈亭不接受預約，建議避開 12:00 尖峰。如果不敢吃馬肉，熊本的「黑毛和牛」也非常有名！",
  },
  {
    date: "12/28 (日)",
    day: "Day 3",
    title: "熊本熊 -> 回福岡",
    highlight: "超萌部長 & 膠原蛋白雞湯",
    details: [
      { time: "10:30", activity: "水前寺成趣園 (平坦好走)", locationQuery: "Suizenji Jojuen Garden", icon: <Camera className="w-4 h-4" /> },
      { time: "12:30", activity: "午餐：黑亭拉麵 (蒜味豚骨)", locationQuery: "Kokutei Ramen", icon: <Utensils className="w-4 h-4" /> },
      { time: "14:00", activity: "熊本熊部長辦公室 (鶴屋百貨)", locationQuery: "Kumamon Square", icon: <Heart className="w-4 h-4 text-red-500" />, url: "https://www.kumamon-sq.jp/", urlLabel: "表演時間表" },
      { time: "17:00", activity: "搭新幹線返回福岡", locationQuery: "Hakata Station", icon: <Train className="w-4 h-4" /> },
      { time: "19:30", activity: "晚餐：博多華味鳥 (水炊雞肉鍋)", locationQuery: "Hakata Hanamidori", icon: <Utensils className="w-4 h-4" />, url: "https://www.hanamidori.net/store/archives/6", urlLabel: "訂位連結" },
    ],
    tips: "華味鳥的雞湯富含膠原蛋白，是女生最愛。記得最後要煮「雜炊 (粥)」，那是精華所在。",
  },
  {
    date: "12/29 (一)",
    day: "Day 4",
    title: "柳川暖桌船 & 太宰府",
    highlight: "冬季限定體驗，不吃鰻魚吃和牛",
    details: [
      { time: "09:30", activity: "天神站搭西鐵 -> 柳川 (買套票)", locationQuery: "Nishitetsu Fukuoka (Tenjin) Station", icon: <Train className="w-4 h-4" />, url: "https://www.nishitetsu.jp/zh_tw/ticket/", urlLabel: "套票資訊" },
      { time: "11:00", activity: "柳川遊船 (暖被桌)", locationQuery: "Yanagawa River Cruising", icon: <Ship className="w-4 h-4" /> },
      { time: "12:30", activity: "午餐：立花烏龍麵 (肉牛蒡天婦羅)", locationQuery: "Tachibana Udon Yanagawa", icon: <Utensils className="w-4 h-4" />, urlLabel: "在地NO.1" },
      { time: "15:00", activity: "太宰府天滿宮 & 表參道", locationQuery: "Dazaifu Tenmangu", icon: <MapPin className="w-4 h-4" /> },
      { time: "16:00", activity: "下午茶：梅枝餅 & 星巴克", locationQuery: "Starbucks Coffee Dazaifu Tenmangu Omotesando", icon: <Coffee className="w-4 h-4" /> },
    ],
    tips: "如果不吃鰻魚，「立花烏龍麵」是當地人排隊名店！或者在柳川找一家有賣「和牛蒸籠飯」的餐廳。",
  },
  {
    date: "12/30 (二)",
    day: "Day 5",
    title: "門司港 & 唐戶市場",
    highlight: "跨海吃壽司 & 復古散策",
    details: [
      { time: "10:00", activity: "搭 Sonic 音速號 -> 門司港", locationQuery: "Mojiko Station", icon: <Train className="w-4 h-4" /> },
      { time: "11:30", activity: "搭船至唐戶市場 (吃壽司)", locationQuery: "Karato Market", icon: <Utensils className="w-4 h-4" />, url: "https://www.karatoichiba.com/", urlLabel: "市場官網" },
      { time: "14:00", activity: "門司港散策 & 藍翼橋", locationQuery: "Mojiko Retro", icon: <Camera className="w-4 h-4" /> },
      { time: "16:00", activity: "點心：Mooon 水果聖代", locationQuery: "Fruit Factory Mooon de Retro", icon: <Coffee className="w-4 h-4" /> },
      { time: "19:00", activity: "晚餐：博多鐵鍋餃子 (鉄なべ)", locationQuery: "Hakata Gion Tetsunabe", icon: <Utensils className="w-4 h-4" /> },
    ],
    tips: "唐戶市場一樓平日可能沒開，建議去二樓食堂。門司港風大，請務必多帶一件外套。",
  },
  {
    date: "12/31 (三)",
    day: "Day 6",
    title: "跨年夜：放鬆與美食",
    highlight: "再見2025，準備跨年",
    details: [
      { time: "11:00", activity: "天神地下街購物 & 睡到飽", locationQuery: "Tenjin Underground Shopping Center", icon: <MapPin className="w-4 h-4" /> },
      { time: "13:00", activity: "午餐：ShinShin 拉麵 (天神店)", locationQuery: "Hakata Ramen ShinShin Tenjin", icon: <Utensils className="w-4 h-4" /> },
      { time: "15:00", activity: "大濠公園 & 美術館", locationQuery: "Ohori Park", icon: <Coffee className="w-4 h-4" /> },
      { time: "18:00", activity: "晚餐：Nikuchi 燒肉 (需預約)", locationQuery: "Yakiniku Nikuichi Hakata", icon: <Utensils className="w-4 h-4" />, url: "https://www.hotpepper.jp/strJ001028712/", urlLabel: "必搶預約" },
      { time: "23:00", activity: "住吉神社 跨年參拜", locationQuery: "Sumiyoshi Shrine Fukuoka", icon: <Heart className="w-4 h-4 text-red-500" /> },
    ],
    tips: "如果不幸沒訂到燒肉，去超市買 A5 和牛片回飯店燙一下也是很棒的跨年！",
  },
  {
    date: "01/01 (四)",
    day: "Day 7",
    title: "元旦：返回香港",
    highlight: "新年快樂，平安回家",
    details: [
      { time: "09:00", activity: "飯店 Check-out", locationQuery: "Hakata Station", icon: <MapPin className="w-4 h-4" /> },
      { time: "09:30", activity: "搭計程車前往福岡機場", locationQuery: "Fukuoka Airport", icon: <Plane className="w-4 h-4" /> },
      { time: "10:00", activity: "機場報到 & 最後伴手禮", locationQuery: "Fukuoka Airport International Terminal", icon: <Utensils className="w-4 h-4" /> },
      { time: "13:00", activity: "飛機起飛 -> 香港", locationQuery: "Hong Kong International Airport", icon: <Heart className="w-4 h-4" /> },
    ],
    tips: "元旦市區幾乎都沒開，直接去機場是最安全的選擇。",
  },
];

export default function FukuokaTrip() {
  const [activeTab, setActiveTab] = useState(0);
  const [itinerary, setItinerary] = useState<ItineraryItem[]>(INITIAL_DATA); // 預設使用內建資料
  const [useGoogleSheet, setUseGoogleSheet] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // 簡單的檢查：如果連結看起來不像真的，就直接不抓了，節省時間
      if (!GOOGLE_SHEET_CSV_URL || !GOOGLE_SHEET_CSV_URL.includes('docs.google.com')) {
        console.log("Using built-in data (No CSV URL provided)");
        return;
      }

      try {
        const response = await fetch(GOOGLE_SHEET_CSV_URL);
        if (!response.ok) throw new Error("Network response was not ok");
        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const rows = results.data as CsvRow[];
            if (rows.length > 0) {
              processData(rows);
              setUseGoogleSheet(true);
            }
          },
          error: (err: Error) => {
             console.warn("CSV Parse Error, using fallback data:", err);
          }
        });
      } catch (err) {
        console.warn("Fetch Error, using fallback data:", err);
      }
    };

    fetchData();
  }, []);

  const processData = (rows: CsvRow[]) => {
    const groupedData: ItineraryItem[] = [];
    const dates = Array.from(new Set(rows.map(r => r.Date)));

    dates.forEach(date => {
      const dayRows = rows.filter(r => r.Date === date);
      if (dayRows.length === 0) return;
      const firstRow = dayRows[0];
      groupedData.push({
        date: firstRow.Date,
        day: firstRow.Day,
        title: firstRow.DayTitle,
        highlight: firstRow.DayHighlight,
        tips: firstRow.DayTips,
        details: dayRows.map(row => ({
          time: row.Time,
          activity: row.Activity,
          locationQuery: row.Location,
          icon: getIconComponent(row.Icon),
          url: row.Link || undefined,
          urlLabel: row.LinkLabel || undefined
        }))
      });
    });
    setItinerary(groupedData);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-10">
      {/* Header */}
      <div className="bg-rose-600 text-white p-6 shadow-lg sticky top-0 z-20">
        <h1 className="text-2xl font-bold mb-1">福岡 & 熊本 跨年之旅 🇯🇵</h1>
        <p className="opacity-90 flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4" /> 2025.12.26 - 2026.01.01
        </p>
        <div className="mt-3 flex gap-2">
           <span className="text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">For Couple ❤️</span>
           {useGoogleSheet ? (
             <span className="text-xs bg-green-500/80 px-2 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                Live Data
             </span>
           ) : (
             <span className="text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">Offline Mode</span>
           )}
        </div>
      </div>

      {/* Date Tabs */}
      <div className="flex overflow-x-auto p-4 gap-2 bg-white border-b border-slate-200 scrollbar-hide">
        {itinerary.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${
              activeTab === index
                ? 'bg-rose-600 text-white border-rose-600 shadow-md transform scale-105'
                : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span className="block text-xs opacity-70 mb-0.5">{item.date}</span>
            <span>{item.day}</span>
          </button>
        ))}
      </div>

      {/* Content Card */}
      <div className="max-w-md mx-auto px-4 mt-6 animate-fadeIn">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Day Header */}
          <div className="p-6 bg-rose-50/50">
            <h2 className="text-xl font-bold text-slate-800">{itinerary[activeTab].title}</h2>
            <p className="text-rose-600 mt-2 text-sm font-medium flex items-center gap-2">
              ✨ {itinerary[activeTab].highlight}
            </p>
          </div>

          {/* Timeline */}
          <div className="p-6">
            <div className="space-y-8 relative">
              {/* Vertical Line */}
              <div className="absolute left-[17px] top-2 bottom-4 w-0.5 bg-slate-100" />
              
              {itinerary[activeTab].details.map((detail, idx) => (
                <div key={idx} className="flex gap-4 group relative z-10">
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center text-slate-400 group-hover:border-rose-500 group-hover:text-rose-500 transition-colors shadow-sm">
                      {detail.icon}
                    </div>
                  </div>
                  <div className="pb-1 flex-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <span className="text-xs font-bold text-slate-400 tracking-wide bg-white pr-2">{detail.time}</span>
                            <p className="text-slate-800 mt-0.5 font-medium text-base">{detail.activity}</p>
                        </div>
                    </div>
                    
                    <div className="flex gap-2 mt-2 flex-wrap">
                        {/* Google Maps Button */}
                        {detail.locationQuery && (
                          <a 
                          href={getMapLink(detail.locationQuery)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-600 px-2 py-1.5 rounded-md hover:bg-slate-200 transition-colors"
                          >
                          <MapPin className="w-3 h-3" />
                          地圖
                          </a>
                        )}

                        {/* Reservation/Official Link Button */}
                        {detail.url && (
                        <a 
                            href={detail.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs bg-rose-100 text-rose-700 px-2 py-1.5 rounded-md hover:bg-rose-200 transition-colors font-medium"
                        >
                            <LinkIcon className="w-3 h-3" />
                            {detail.urlLabel || "相關連結"}
                        </a>
                        )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips Section */}
          <div className="mx-4 mb-6 p-4 bg-amber-50 border border-amber-100 rounded-xl">
            <div className="flex gap-3 items-start text-amber-800">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" />
              <div>
                <span className="font-bold text-sm block mb-1 text-amber-700">筆記：</span>
                <p className="text-sm leading-relaxed opacity-90">{itinerary[activeTab].tips}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 pb-8">
            <p className="text-xs text-slate-400">Powered by Gemini & Next.js 🚀</p>
        </div>
      </div>
    </div>
  );
}