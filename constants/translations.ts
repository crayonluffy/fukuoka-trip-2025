import { Translations } from '@/types';

export const translations: Record<'en' | 'zh', Translations> = {
  en: {
    title: 'Fukuoka & Kumamoto',
    dates: 'Dec 26, 2025 — Jan 1, 2026',
    subtitle: '7 Days in Kyushu',
    tripReminders: 'Trip Reminders',
    tip1: '🚕 Minimal walking — use taxis & trains',
    tip2: '🚫 No Eel (Unagi) — Wagyu or chicken instead',
    tip3: '⭐ Restaurant links → Tabelog ratings',
    liveData: '✓ Synced with Google Sheet',
    offlineData: '📱 Offline Mode',
    expandAll: 'Expand All',
    collapseAll: 'Collapse All',
    loading: 'Loading...',
  },
  zh: {
    title: '福岡 & 熊本',
    dates: '2025/12/26 — 2026/01/01',
    subtitle: '九州七日遊',
    tripReminders: '行程提醒',
    tip1: '🚕 少走路 — 多搭計程車、電車',
    tip2: '🚫 不吃鰻魚 — 改吃和牛或雞肉',
    tip3: '⭐ 餐廳連結 → Tabelog 評分',
    liveData: '✓ 已同步 Google Sheet',
    offlineData: '📱 離線模式',
    expandAll: '全部展開',
    collapseAll: '全部收合',
    loading: '載入中...',
  },
};
