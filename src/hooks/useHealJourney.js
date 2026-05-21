import { useState, useEffect } from 'react';
import { db } from '../db/db';
import { differenceInDays } from 'date-fns';

export function useHealJourney() {
  const [griefEntries, setGriefEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      const entries = await db.grief.toArray();
      setGriefEntries(entries);
      setLoading(false);
    };
    fetchEntries();
  }, []);

  const getActiveEntries = () => {
    return griefEntries.filter((e) => e.status === 'active');
  };

  const getDaysHealing = (entry) => {
    if (!entry.startDate) return 0;
    return differenceInDays(new Date(), new Date(entry.startDate));
  };

  const getHealingProgress = (entry) => {
    if (!entry.startDate) return 0;
    const daysSince = getDaysHealing(entry);
    const maxDays = 90;
    return Math.min(Math.round((daysSince / maxDays) * 100), 100);
  };

  const addGriefEntry = async (entryData) => {
    const id = await db.grief.add({
      ...entryData,
      startDate: new Date().toISOString().split('T')[0],
      status: 'active',
    });
    const entries = await db.grief.toArray();
    setGriefEntries(entries);
    return id;
  };

  const updateGriefStatus = async (id, status) => {
    await db.grief.update(id, { status });
    const entries = await db.grief.toArray();
    setGriefEntries(entries);
  };

  return {
    griefEntries,
    loading,
    getActiveEntries,
    getDaysHealing,
    getHealingProgress,
    addGriefEntry,
    updateGriefStatus,
  };
}
