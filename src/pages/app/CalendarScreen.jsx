import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, isSameMonth, isToday, isFuture, isPast } from 'date-fns';
import { useMoodHistory } from '../../hooks/useMoodHistory';
import { PRIMARY_MOODS } from '../../data/moodData';

function getMoodColor(emoji) {
  const mood = PRIMARY_MOODS.find((m) => m.emoji === emoji);
  return mood ? mood.color : 'var(--color-divider)';
}

export default function CalendarScreen() {
  const { moods, getMoodOnDate } = useMoodHistory();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const startDay = monthStart.getDay();
  const emptyDays = Array.from({ length: startDay === 0 ? 6 : startDay - 1 }, (_, i) => i);

  const goToPrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const goToNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const monthMoods = days.map((day) => {
    const dateStr = format(day, 'yyyy-MM-dd');
    const dayMoods = moods.filter((m) => m.date === dateStr);
    return { date: dateStr, moods: dayMoods };
  }).filter((d) => d.moods.length > 0);

  const moodCounts = {};
  monthMoods.forEach((d) => {
    d.moods.forEach((m) => {
      const key = m.primaryLabel || m.primaryEmoji;
      moodCounts[key] = (moodCounts[key] || 0) + 1;
    });
  });

  const yearDays = eachDayOfInterval({ start: new Date(new Date().getFullYear(), 0, 1), end: new Date() });

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>📅 Mood Calendar</h1>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <motion.button whileTap={{ scale: 0.9 }} onClick={goToPrevMonth} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <ChevronLeft size={24} color="var(--color-text-primary)" />
        </motion.button>
        <span style={{ fontSize: '1.125rem', fontWeight: 600 }}>{format(currentMonth, 'MMMM yyyy')}</span>
        <motion.button whileTap={{ scale: 0.9 }} onClick={goToNextMonth} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <ChevronRight size={24} color="var(--color-text-primary)" />
        </motion.button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d) => (
          <div key={d} style={{ textAlign: 'center', fontSize: '0.625rem', fontWeight: 500, color: 'var(--color-text-sub)', padding: '4px' }}>
            {d}
          </div>
        ))}
        {emptyDays.map((i) => (
          <div key={`empty-${i}`} />
        ))}
        <AnimatePresence mode="wait">
          {days.map((day) => {
            const dateStr = format(day, 'yyyy-MM-dd');
            const dayMood = getMoodOnDate(dateStr);
            const hasMood = dayMood !== undefined;
            const isTodayDate = isToday(day);
            const isFutureDate = isFuture(day);
            const isPastDate = isPast(day) && !isTodayDate;

            return (
              <motion.button
                key={dateStr}
                whileTap={hasMood ? { scale: 0.95 } : {}}
                onClick={() => hasMood && isPastDate ? setSelectedDay(day) : null}
                style={{
                  aspectRatio: '1',
                  borderRadius: 'var(--radius, 1rem)',
                  backgroundColor: hasMood ? getMoodColor(dayMood.primaryEmoji) : isFutureDate ? 'transparent' : 'var(--color-surface)',
                  border: isTodayDate ? '2px solid var(--color-blue-mid)' : (isPastDate && !hasMood) ? '1px solid var(--color-divider)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: hasMood && isPastDate ? 'pointer' : 'default',
                  opacity: isFutureDate ? 0.4 : 1,
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: hasMood ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                }}
              >
                <span style={{ fontSize: '0.625rem' }}>{format(day, 'd')}</span>
                {hasMood && <span style={{ fontSize: '0.875rem' }}>{dayMood.primaryEmoji}</span>}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {selectedDay && (
        <div style={{
          padding: '16px',
          borderRadius: 'var(--radius, 1rem)',
          backgroundColor: 'var(--color-surface)',
          boxShadow: 'var(--shadow-card)',
        }}>
          <p style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px' }}>
            {format(selectedDay, 'EEEE, d MMMM')}
          </p>
          {moods.filter((m) => m.date === format(selectedDay, 'yyyy-MM-dd')).map((m) => (
            <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0' }}>
              <span>{m.primaryEmoji}</span>
              <span style={{ fontSize: '0.75rem' }}>{m.primaryLabel}</span>
              <span style={{ fontSize: '0.625rem', color: 'var(--color-text-muted)' }}>
                {format(new Date(m.timestamp), 'h:mm a')}
              </span>
            </div>
          ))}
        </div>
      )}

      {Object.keys(moodCounts).length > 0 && (
        <div>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '12px' }}>This Month</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {Object.entries(moodCounts).map(([label, count]) => (
              <div key={label} style={{
                padding: '16px',
                borderRadius: 'var(--radius, 1rem)',
                backgroundColor: 'var(--color-surface)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{label}</span>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  backgroundColor: 'var(--color-blue-light)',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                }}>
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '12px' }}>Your Emotional Mosaic</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px' }}>
          {yearDays.map((day) => {
            const dateStr = format(day, 'yyyy-MM-dd');
            const dayMood = getMoodOnDate(dateStr);
            return (
              <motion.div
                key={dateStr}
                whileHover={{ scale: 1.5 }}
                title={`${format(day, 'd MMM')}: ${dayMood ? dayMood.primaryLabel : 'No mood'}`}
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '2px',
                  backgroundColor: dayMood ? getMoodColor(dayMood.primaryEmoji) : 'var(--color-divider)',
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
