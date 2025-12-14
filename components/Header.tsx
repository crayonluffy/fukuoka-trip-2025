'use client';

import { MapPin } from 'lucide-react';
import { Translations } from '@/types';

interface HeaderProps {
  t: Translations;
}

export function Header({ t }: HeaderProps) {
  return (
    <header className="text-center mb-6">
      <div className="inline-flex items-center gap-2 mb-2 text-sky-500">
        <MapPin className="w-5 h-5" />
        <span className="text-sm font-medium tracking-wide uppercase">Kyushu Trip</span>
      </div>
      <h1 className="text-2xl font-bold text-slate-800 mb-1">
        {t.title}
      </h1>
      <p className="text-base text-slate-600 font-medium">{t.dates}</p>
      <p className="text-sm text-slate-500 mt-1">{t.subtitle}</p>
    </header>
  );
}
