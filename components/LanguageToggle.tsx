'use client';

import { Globe } from 'lucide-react';
import { Language } from '@/types';

interface LanguageToggleProps {
  lang: Language;
  onToggle: () => void;
}

export function LanguageToggle({ lang, onToggle }: LanguageToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-600 rounded-full border border-slate-200 transition-all shadow-sm text-sm font-medium"
    >
      <Globe className="w-4 h-4" />
      {lang === 'en' ? '中文' : 'EN'}
    </button>
  );
}
