'use client';

import { Info } from 'lucide-react';
import { Translations } from '@/types';

interface TripTipsProps {
  t: Translations;
}

export function TripTips({ t }: TripTipsProps) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5">
      <div className="flex items-start gap-3">
        <div className="p-1.5 bg-amber-100 rounded-lg">
          <Info className="w-4 h-4 text-amber-600" />
        </div>
        <div>
          <h3 className="font-semibold text-amber-800 text-sm mb-1.5">{t.tripReminders}</h3>
          <ul className="text-sm text-amber-700 space-y-0.5">
            <li>{t.tip1}</li>
            <li>{t.tip2}</li>
            <li>{t.tip3}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
