'use client';

import { Clock, MapPin, ExternalLink, Star, Navigation } from 'lucide-react';
import { ItineraryItem, Language } from '@/types';
import { iconMap, defaultIcon } from '@/lib/icons';

interface TimelineItemProps {
  item: ItineraryItem;
  lang: Language;
}

export function TimelineItem({ item, lang }: TimelineItemProps) {
  const activity = lang === 'zh' ? item.activity_zh : item.activity;
  const location = lang === 'zh' ? item.location_zh : item.location;

  return (
    <div className="relative flex items-start gap-3 group">
      {/* Icon */}
      <div className="relative z-10 flex-shrink-0 w-10 h-10 bg-gradient-to-br from-sky-100 to-teal-100 rounded-lg flex items-center justify-center text-teal-600 border border-sky-200/50 shadow-sm group-hover:scale-105 transition-transform">
        {iconMap[item.icon] || defaultIcon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pt-0.5">
        <div className="flex items-center gap-1.5 mb-0.5">
          <Clock className="w-3 h-3 text-slate-400" />
          <span className="text-sm font-semibold text-teal-600">{item.time}</span>
        </div>
        <h3 className="font-medium text-slate-800 text-sm leading-snug mb-0.5">
          {activity}
        </h3>
        <p className="text-xs text-slate-500 flex items-center gap-1">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          {location}
        </p>
        
        {/* Links */}
        <div className="flex flex-wrap gap-1.5 mt-1.5">
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-white bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-600 hover:to-sky-600 px-2.5 py-1 rounded-full transition-all shadow-sm"
            >
              {item.linkLabel?.includes('★') && (
                <Star className="w-3 h-3 fill-yellow-300 text-yellow-300" />
              )}
              {item.linkLabel || 'Link'}
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
          {item.mapLink && (
            <a
              href={item.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-white bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 px-2.5 py-1 rounded-full transition-all shadow-sm"
            >
              <Navigation className="w-3 h-3" />
              Map
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
