export type Language = 'en' | 'zh';

export interface ItineraryItem {
  time: string;
  activity: string;
  activity_zh: string;
  location: string;
  location_zh: string;
  icon: string;
  link?: string;
  linkLabel?: string;
  mapLink?: string;
}

export interface DayData {
  date: string;
  day: string;
  day_zh: string;
  dayTitle: string;
  dayTitle_zh: string;
  dayHighlight: string;
  dayHighlight_zh: string;
  dayTips: string;
  dayTips_zh: string;
  items: ItineraryItem[];
}

export interface CSVRow {
  Date: string;
  Day: string;
  Day_zh: string;
  DayTitle: string;
  DayTitle_zh: string;
  DayHighlight: string;
  DayHighlight_zh: string;
  DayTips: string;
  DayTips_zh: string;
  Time: string;
  Activity: string;
  Activity_zh: string;
  Location: string;
  Location_zh: string;
  Icon: string;
  Link: string;
  LinkLabel: string;
  MapLink: string;
}

export interface Translations {
  title: string;
  dates: string;
  subtitle: string;
  tripReminders: string;
  tip1: string;
  tip2: string;
  tip3: string;
  liveData: string;
  offlineData: string;
  expandAll: string;
  collapseAll: string;
  loading: string;
}
