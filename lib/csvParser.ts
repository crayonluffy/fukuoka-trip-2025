import { CSVRow, DayData } from '@/types';

export function parseCSVToData(rows: CSVRow[]): DayData[] {
  const dayMap = new Map<string, DayData>();

  rows.forEach((row) => {
    if (!row.Date || !row.Time) return;

    const key = row.Date;
    if (!dayMap.has(key)) {
      dayMap.set(key, {
        date: row.Date,
        day: row.Day,
        day_zh: row.Day_zh || row.Day,
        dayTitle: row.DayTitle,
        dayTitle_zh: row.DayTitle_zh || row.DayTitle,
        dayHighlight: row.DayHighlight,
        dayHighlight_zh: row.DayHighlight_zh || row.DayHighlight,
        dayTips: row.DayTips,
        dayTips_zh: row.DayTips_zh || row.DayTips,
        items: [],
      });
    }

    const dayData = dayMap.get(key)!;
    dayData.items.push({
      time: row.Time,
      activity: row.Activity,
      activity_zh: row.Activity_zh || row.Activity,
      location: row.Location,
      location_zh: row.Location_zh || row.Location,
      icon: row.Icon,
      link: row.Link || undefined,
      linkLabel: row.LinkLabel || undefined,
      mapLink: row.MapLink || undefined,
    });
  });

  return Array.from(dayMap.values()).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}
