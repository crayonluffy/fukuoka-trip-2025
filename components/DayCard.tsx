'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { DayData, Language } from '@/types';
import { TimelineItem } from '@/components/TimelineItem';

interface DayCardProps {
  dayData: DayData;
  isExpanded: boolean;
  onToggle: () => void;
  lang: Language;
}

export function DayCard({ dayData, isExpanded, onToggle, lang }: DayCardProps) {
  const day = lang === 'zh' ? dayData.day_zh : dayData.day;
  const dayTitle = lang === 'zh' ? dayData.dayTitle_zh : dayData.dayTitle;
  const dayHighlight = lang === 'zh' ? dayData.dayHighlight_zh : dayData.dayHighlight;
  const dayTips = lang === 'zh' ? dayData.dayTips_zh : dayData.dayTips;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (lang === 'zh') {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    }
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md">
      {/* Day Header */}
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center min-w-[48px]">
            <span className="text-xs font-medium text-teal-600">{day}</span>
            <span className="text-xs font-semibold text-slate-500">
              {formatDate(dayData.date)}
            </span>
          </div>
          <div className="text-left">
            <h2 className="text-base font-bold text-slate-800">{dayTitle}</h2>
            <p className="text-xs text-slate-500">{dayHighlight}</p>
          </div>
        </div>
        <div className="p-1.5 rounded-full bg-slate-100">
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-slate-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-500" />
          )}
        </div>
      </button>

      {/* Day Content */}
      {isExpanded && (
        <div className="px-4 pb-4">
          {/* Day Tips */}
          {dayTips && (
            <div className="mb-3 px-3 py-2 bg-sky-50 rounded-lg text-xs text-sky-700 border border-sky-100">
              {dayTips}
            </div>
          )}

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-teal-200 via-sky-200 to-teal-200" />

            {/* Items */}
            <div className="space-y-3">
              {dayData.items.map((item, idx) => (
                <TimelineItem key={idx} item={item} lang={lang} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
