'use client';

import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { DayData, CSVRow } from '@/types';
import { parseCSVToData } from '@/lib/csvParser';
import { INITIAL_DATA, CSV_URL } from '@/constants/initialData';

interface UseItineraryReturn {
  data: DayData[];
  isLoading: boolean;
  dataSource: 'csv' | 'fallback';
}

export function useItinerary(): UseItineraryReturn {
  const [data, setData] = useState<DayData[]>(INITIAL_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState<'csv' | 'fallback'>('fallback');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(CSV_URL);
        if (!response.ok) throw new Error('Failed to fetch');

        const csvText = await response.text();
        const result = Papa.parse<CSVRow>(csvText, {
          header: true,
          skipEmptyLines: true,
        });

        if (result.data && result.data.length > 0) {
          const parsedData = parseCSVToData(result.data);
          if (parsedData.length > 0) {
            setData(parsedData);
            setDataSource('csv');
          }
        }
      } catch (error) {
        console.log('Using fallback data:', error);
        setDataSource('fallback');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, dataSource };
}
