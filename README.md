# 福岡熊本行程 | Fukuoka Trip 2025

**Trip:** Dec 26, 2025 - Jan 1, 2026

## Features

- 🌐 Bilingual (EN / 繁中)
- 📊 Google Sheet sync
- 📱 Mobile-first
- 🔄 Offline fallback

## Project Structure

```
├── app/
│   ├── page.tsx          # Main page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Styles
├── components/
│   ├── Header.tsx
│   ├── TripTips.tsx
│   ├── LanguageToggle.tsx
│   ├── DayCard.tsx
│   └── TimelineItem.tsx
├── hooks/
│   └── useItinerary.ts   # Data fetching
├── lib/
│   ├── csvParser.ts      # CSV parsing
│   └── icons.tsx         # Icon mapping
├── constants/
│   ├── translations.ts   # i18n
│   └── initialData.ts    # Fallback data
├── types/
│   └── index.ts          # TypeScript types
└── fukuoka-trip-data.csv # CSV for Google Sheets
```

## Quick Start

```bash
npm install
npm run dev
```

## Google Sheet Setup

1. Import `fukuoka-trip-data.csv` to Google Sheets
2. File → Share → Publish to web → CSV
3. Update `CSV_URL` in `constants/initialData.ts`

## CSV Columns

| Column | EN | 中文 |
|--------|----|----|
| Day | Day 1 | 第一天 |
| Activity | Lunch: Makino Udon | 午餐：牧野烏龍麵 |
| Location | Hakata Station | 博多站 |

**Icons:** `plane`, `train`, `food`, `hotel`, `castle`, `park`, `boat`, `shrine`, `shopping`, `camera`, `walk`, `taxi`

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/crayonluffy/fukuoka-trip-2025)
