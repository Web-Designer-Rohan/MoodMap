import { useState, useEffect } from 'react';
import { db } from '../db/db';
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';

export function useMoodHistory() {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoods = async () => {
      const allMoods = await db.moods.orderBy('timestamp').reverse().toArray();
      setMoods(allMoods);
      setLoading(false);
    };
    fetchMoods();
  }, []);

  const getTodayMoods = () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    return moods.filter((m) => m.date === today);
  };

  const getWeekMoods = () => {
    const start = startOfWeek(new Date(), { weekStartsOn: 1 });
    const end = endOfWeek(new Date(), { weekStartsOn: 1 });
    const days = eachDayOfInterval({ start, end });
    return days.map((day) => {
      const dateStr = format(day, 'yyyy-MM-dd');
      const dayMoods = moods.filter((m) => m.date === dateStr);
      return { date: dateStr, dayName: format(day, 'EEE'), moods: dayMoods };
    });
  };

  const getMoodOnDate = (dateStr) => {
    return moods.find((m) => m.date === dateStr);
  };

  const getTopTriggers = () => {
    const tagCounts = {};
    moods.forEach((m) => {
      if (m.tags && Array.isArray(m.tags)) {
        m.tags.forEach((tag) => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });
    return Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([tag, count]) => ({ tag, count }));
  };

  const getMoodDistribution = () => {
    const counts = {};
    moods.forEach((m) => {
      const label = m.primaryLabel || m.primaryEmoji;
      counts[label] = (counts[label] || 0) + 1;
    });
    const total = moods.length;
    return Object.entries(counts).map(([label, count]) => ({
      label,
      count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0,
    }));
  };

  return {
    moods,
    loading,
    getTodayMoods,
    getWeekMoods,
    getMoodOnDate,
    getTopTriggers,
    getMoodDistribution,
  };
}
