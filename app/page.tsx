"use client";

import React, { useState } from 'react';
import { MapPin, Heart, Coffee, AlertCircle, Camera, Utensils, Calendar, ExternalLink, Plane, Train, Ship } from 'lucide-react';

// 定義資料型態
type Activity = {
  time: string;
  activity: string;
  locationQuery: string; // 用於 Google Maps 搜尋
  icon: React.ReactNode;
};

type ItineraryItem = {
  date: string;
  day: string;
  title: string;
  highlight: string;
  details: Activity[];
  tips: string;
};

// Google Maps Link Generator
const getMapLink = (query: string) => {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
};

const itinerary: ItineraryItem[] = [
  {
    date: "12/26 (五)",
    day: "Day 1",
    title: "抵達福岡：博多美食夜",
    highlight: "一下飛機就是美食天堂",
    details: [
      { time: "13:00", activity: "抵達福岡機場 (FUK)", locationQuery: "Fukuoka Airport", icon: <Plane className="w-4 h-4" /> },
      { time: "14:30", activity: "飯店 Check-in (博多站周邊)", locationQuery: "Hakata Station", icon: <MapPin className="w-4 h-4" /> },
      { time: "16:00", activity: "博多車站頂樓花園 & 逛街", locationQuery: "JR Hakata City", icon: <Coffee className="w-4 h-4" /> },
      { time: "18:30", activity: "晚餐：博多名代 吉塚鰻魚屋 (必吃!)", locationQuery: "Yoshizuka Unagiya", icon: <Utensils className="w-4 h-4" /> },
      { time: "20:30", activity: "中洲屋台散步 (體驗氣氛即可)", locationQuery: "Nakasu Yatai", icon: <Camera className="w-4 h-4" /> },
    ],
    tips: "吉塚鰻魚屋非常熱門，若沒訂位建議 17:30 前就去排隊。博多站到中洲很近，搭計程車約 1000 円，不用走路。",
  },
  {
    date: "12/27 (六)",
    day: "Day 2",
    title: "移動日：熊本城與炸豬排",
    highlight: "新幹線 40 分鐘直達熊本",
    details: [
      { time: "10:00", activity: "博多站搭新幹線 -> 熊本站", locationQuery: "Kumamoto Station", icon: <Train className="w-4 h-4" /> },
      { time: "11:30", activity: "熊本飯店寄放行李", locationQuery: "Kumamoto Station", icon: <MapPin className="w-4 h-4" /> },
      { time: "12:30", activity: "午餐：勝烈亭 炸豬排 (新市街本店)", locationQuery: "Katsuretsu Tei Shinshigai", icon: <Utensils className="w-4 h-4" /> },
      { time: "14:30", activity: "熊本城 & 城彩苑 (搭車上山免走路)", locationQuery: "Kumamoto Castle", icon: <Camera className="w-4 h-4" /> },
      { time: "18:30", activity: "晚餐：馬櫻 (馬肉料理) 或 壽司", locationQuery: "Ma-Zakura Kumamoto", icon: <Utensils className="w-4 h-4" /> },
    ],
    tips: "在熊本市區移動建議直接用 Uber 或 GO App 叫計程車，省去等路面電車的時間和體力。",
  },
  {
    date: "12/28 (日)",
    day: "Day 3",
    title: "熊本慢遊 -> 回福岡",
    highlight: "部長辦公室 & 膠原蛋白鍋",
    details: [
      { time: "10:30", activity: "水前寺成趣園 (優雅日式庭園)", locationQuery: "Suizenji Jojuen Garden", icon: <Camera className="w-4 h-4" /> },
      { time: "12:30", activity: "午餐：黑亭拉麵 或 桂花拉麵", locationQuery: "Kokutei Ramen", icon: <Utensils className="w-4 h-4" /> },
      { time: "14:00", activity: "熊本熊部長辦公室 (鶴屋百貨)", locationQuery: "Kumamon Square", icon: <Heart className="w-4 h-4 text-red-500" /> },
      { time: "17:00", activity: "搭新幹線返回福岡", locationQuery: "Hakata Station", icon: <Train className="w-4 h-4" /> },
      { time: "19:30", activity: "晚餐：博多華味鳥 (水炊雞肉鍋)", locationQuery: "Hakata Hanamidori", icon: <Utensils className="w-4 h-4" /> },
    ],
    tips: "華味鳥是福岡名產，雞湯富含膠原蛋白，女朋友一定會喜歡。記得先上網預約博多站附近的店。",
  },
  {
    date: "12/29 (一)",
    day: "Day 4",
    title: "柳川遊船 & 太宰府",
    highlight: "冬季限定：暖被桌遊船",
    details: [
      { time: "09:30", activity: "天神站搭西鐵電車 -> 柳川", locationQuery: "Nishitetsu Fukuoka (Tenjin) Station", icon: <Train className="w-4 h-4" /> },
      { time: "11:00", activity: "柳川遊船 (坐在船上蓋暖被)", locationQuery: "Yanagawa River Cruising", icon: <Ship className="w-4 h-4" /> },
      { time: "12:30", activity: "午餐：元祖本吉屋 (蒸籠鰻魚飯)", locationQuery: "Ganso Motoyoshiya", icon: <Utensils className="w-4 h-4" /> },
      { time: "15:00", activity: "移動至太宰府天滿宮", locationQuery: "Dazaifu Tenmangu", icon: <MapPin className="w-4 h-4" /> },
      { time: "16:00", activity: "下午茶：隈研吾星巴克 & 梅枝餅", locationQuery: "Starbucks Coffee Dazaifu Tenmangu Omotesando", icon: <Coffee className="w-4 h-4" /> },
    ],
    tips: "買「太宰府柳川觀光套票」最划算。柳川遊船全程坐著，完全不用走路，非常適合休息。",
  },
  {
    date: "12/30 (二)",
    day: "Day 5",
    title: "門司港 & 唐戶市場",
    highlight: "跨海吃壽司與復古洋房",
    details: [
      { time: "10:00", activity: "搭 Sonic 音速號 -> 門司港", locationQuery: "Mojiko Station", icon: <Train className="w-4 h-4" /> },
      { time: "11:30", activity: "搭船至唐戶市場 (吃新鮮壽司)", locationQuery: "Karato Market", icon: <Utensils className="w-4 h-4" /> },
      { time: "14:00", activity: "門司港散策 & 藍翼橋", locationQuery: "Mojiko Retro", icon: <Camera className="w-4 h-4" /> },
      { time: "16:00", activity: "點心：Mooon 水果聖代", locationQuery: "Fruit Factory Mooon de Retro", icon: <Coffee className="w-4 h-4" /> },
      { time: "19:00", activity: "晚餐：博多鐵鍋餃子 (鉄なべ)", locationQuery: "Hakata Gion Tetsunabe", icon: <Utensils className="w-4 h-4" /> },
    ],
    tips: "門司港風大，請務必幫女朋友多帶一件外套或圍巾。唐戶市場若人多，買了去二樓吃比較舒服。",
  },
  {
    date: "12/31 (三)",
    day: "Day 6",
    title: "跨年夜：大濠公園 & 休息",
    highlight: "再見2025，迎接新年",
    details: [
      { time: "11:00", activity: "睡飽飽 & 天神地下街最後購物", locationQuery: "Tenjin Underground Shopping Center", icon: <MapPin className="w-4 h-4" /> },
      { time: "13:00", activity: "午餐：ShinShin 拉麵 (天神店)", locationQuery: "Hakata Ramen ShinShin Tenjin", icon: <Utensils className="w-4 h-4" /> },
      { time: "15:00", activity: "大濠公園散步 & 咖啡廳", locationQuery: "Ohori Park", icon: <Coffee className="w-4 h-4" /> },
      { time: "18:00", activity: "外帶豪華便當/壽司回飯店", locationQuery: "Hakata Station", icon: <Utensils className="w-4 h-4" /> },
      { time: "23:00", activity: "住吉神社/櫛田神社 跨年參拜", locationQuery: "Sumiyoshi Shrine Fukuoka", icon: <Heart className="w-4 h-4 text-red-500" /> },
    ],
    tips: "12/31 晚上很多餐廳不營業，日本人習慣在家吃蕎麥麵。建議去博多阪急百貨地下街買好吃的熟食回飯店慶祝。",
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
    tips: "元旦市區幾乎都沒開，直接去機場是最安全的選擇。機場免稅店通常人很多，建議早點進去排隊。",
  },
];

export default function FukuokaTrip() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-10">
      {/* Header */}
      <div className="bg-rose-500 text-white p-6 shadow-lg sticky top-0 z-20">
        <h1 className="text-2xl font-bold mb-1">福岡 & 熊本 跨年之旅 🇯🇵</h1>
        <p className="opacity-90 flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4" /> 2025.12.26 - 2026.01.01
        </p>
        <div className="mt-3 flex gap-2">
          <span className="text-xs bg-white/20 backdrop-blur-md px-2 py-1 rounded-full">For Couple ❤️</span>
          <span className="text-xs bg-white/20 backdrop-blur-md px-2 py-1 rounded-full">少走一點路版 🚶‍♂️</span>
        </div>
      </div>

      {/* Date Tabs */}
      <div className="flex overflow-x-auto p-4 gap-2 bg-white border-b border-gray-200 scrollbar-hide">
        {itinerary.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${
              activeTab === index
                ? 'bg-rose-500 text-white border-rose-500 shadow-md transform scale-105'
                : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50'
            }`}
          >
            <span className="block text-xs opacity-80 mb-0.5">{item.date}</span>
            <span className="font-bold">{item.day}</span>
          </button>
        ))}
      </div>

      {/* Content Card */}
      <div className="max-w-md mx-auto px-4 mt-6 animate-fadeIn">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Day Header */}
          <div className="p-6 bg-gradient-to-b from-rose-50 to-white">
            <h2 className="text-xl font-bold text-gray-800">{itinerary[activeTab].title}</h2>
            <div className="mt-2 flex items-start gap-2">
              <span className="px-2 py-1 bg-rose-100 text-rose-600 text-xs font-bold rounded-md whitespace-nowrap">Highlights</span>
              <p className="text-sm text-gray-600 leading-relaxed">
                {itinerary[activeTab].highlight}
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="px-6 pb-6">
            <div className="space-y-6 relative">
              {/* Vertical Line */}
              <div className="absolute left-[17px] top-2 bottom-2 w-0.5 bg-gray-100" />
              
              {itinerary[activeTab].details.map((detail, idx) => (
                <div key={idx} className="flex gap-4 group relative z-10">
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center text-gray-400 group-hover:border-rose-400 group-hover:text-rose-500 transition-colors shadow-sm">
                      {detail.icon}
                    </div>
                  </div>
                  <div className="pb-1 flex-1">
                    <span className="text-xs font-bold text-gray-400 tracking-wide bg-white pr-2">{detail.time}</span>
                    <p className="text-gray-800 mt-0.5 font-medium text-base">{detail.activity}</p>
                    
                    {/* Google Maps Link */}
                    <a 
                      href={getMapLink(detail.locationQuery)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-2 text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 transition-colors"
                    >
                      <MapPin className="w-3 h-3" />
                      在 Google Maps 查看
                      <ExternalLink className="w-3 h-3 ml-0.5 opacity-50" />
                    </a>
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
                <span className="font-bold text-sm block mb-1 text-amber-700">給男友的筆記：</span>
                <p className="text-sm leading-relaxed opacity-90">{itinerary[activeTab].tips}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-8 text-xs text-gray-400 pb-8">
        Have a wonderful trip! ✈️
      </div>
    </div>
  );
}