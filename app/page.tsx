'use client';

import { useState } from 'react';
import { Language } from '@/types';
import { translations } from '@/constants/translations';
import { useItinerary } from '@/hooks/useItinerary';
import { Header } from '@/components/Header';
import { TripTips } from '@/components/TripTips';
import { LanguageToggle } from '@/components/LanguageToggle';
import { DayCard } from '@/components/DayCard';

export default function FukuokaTrip() {
  const { data, isLoading, dataSource } = useItinerary();
  const [expandedDays, setExpandedDays] = useState<Set<string>>(new Set(['Day 1']));
  const [lang, setLang] = useState<Language>('zh');

  const t = translations[lang];

  const toggleDay = (day: string) => {
    setExpandedDays((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(day)) {
        newSet.delete(day);
      } else {
        newSet.add(day);
      }
      return newSet;
    });
  };

  const expandAll = () => setExpandedDays(new Set(data.map((d) => d.day)));
  const collapseAll = () => setExpandedDays(new Set());
  const toggleLanguage = () => setLang((prev) => (prev === 'en' ? 'zh' : 'en'));

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-slate-50 to-teal-50">
      <div className="max-w-lg mx-auto px-4 py-6 pb-20">
        {/* Top Bar */}
        <div className="flex justify-end mb-4">
          <LanguageToggle lang={lang} onToggle={toggleLanguage} />
        </div>

        <Header t={t} />
        <TripTips t={t} />

        {/* Data Source Badge */}
        {!isLoading && (
          <div className="flex justify-center mb-4">
            <span
              className={`text-xs px-3 py-1 rounded-full ${
                dataSource === 'csv'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {dataSource === 'csv' ? t.liveData : t.offlineData}
            </span>
          </div>
        )}

        {/* Controls */}
        <div className="flex justify-center gap-2 mb-5">
          <button
            onClick={expandAll}
            className="text-xs px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-600 rounded-full border border-slate-200 transition-all shadow-sm"
          >
            {t.expandAll}
          </button>
          <button
            onClick={collapseAll}
            className="text-xs px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-600 rounded-full border border-slate-200 transition-all shadow-sm"
          >
            {t.collapseAll}
          </button>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="text-center py-10">
            <div className="inline-flex items-center gap-2 text-slate-500">
              <div className="w-4 h-4 border-2 border-slate-300 border-t-teal-500 rounded-full animate-spin" />
              <span className="text-sm">{t.loading}</span>
            </div>
          </div>
        )}

        {/* Day Cards */}
        <div className="space-y-3">
          {data.map((dayData) => (
            <DayCard
              key={dayData.day}
              dayData={dayData}
              isExpanded={expandedDays.has(dayData.day)}
              onToggle={() => toggleDay(dayData.day)}
              lang={lang}
            />
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-10 text-center text-xs text-slate-400">
          Fukuoka & Kumamoto 2025-2026
        </footer>
      </div>
    </main>
  );
}
