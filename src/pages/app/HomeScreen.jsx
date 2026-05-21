import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfWeek, addDays, eachDayOfInterval } from 'date-fns';
import { useMoodStore } from '../../store/moodStore';
import { PRIMARY_MOODS } from '../../data/moodData';
import { gratitudeMessages } from '../../data/gratitudeMessages';
import { ImagePlaceholder } from '../../components/shared/ImagePlaceholder';
import { MoodCard } from '../../components/shared/MoodCard';
import { StreakBadge } from '../../components/shared/StreakBadge';
import MoodDetailModal from '../../components/modals/MoodDetailModal';
import SOSConfirm from '../../components/modals/SOSConfirm';
import { db } from '../../db/db';

export default function HomeScreen() {
  const navigate = useNavigate();
  const { currentUser, streak, todayMoods, loadTodayMoods, loadStreak } = useMoodStore();
  const [selectedMood, setSelectedMood] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [sosOpen, setSosOpen] = useState(false);
  const [gratitudeMessage] = useState(() => gratitudeMessages[Math.floor(Math.random() * gratitudeMessages.length)]);

  useEffect(() => {
    loadTodayMoods();
    loadStreak();
  }, []);

  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: addDays(weekStart, 6) });

  const lastMood = todayMoods.length > 0 ? todayMoods[todayMoods.length - 1] : null;

  const firstName = currentUser?.fullName?.split(' ')[0] || '';
  const todayStr = format(today, 'yyyy-MM-dd');

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/profile')}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-green-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {currentUser?.avatarEmoji || '🧑‍🎓'}
        </motion.button>

        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>{currentUser?.fullName || 'User'}</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-sub)' }}>
            {format(today, 'EEEE, d MMMM')}
          </p>
        </div>

        <button
          onClick={() => navigate('/profile')}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <Menu size={24} color="var(--color-text-primary)" />
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          padding: '16px',
          borderRadius: 'var(--radius, 1.5rem)',
          backgroundColor: 'var(--color-blue-light)',
          boxShadow: 'var(--shadow-card)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <p style={{ fontSize: '0.875rem', fontWeight: 500, fontStyle: 'italic', maxWidth: '200px', lineHeight: 1.5 }}>
          {gratitudeMessage}
        </p>
        <ImagePlaceholder width={64} height={64} shape="rect" description="Ambient" />
      </motion.div>

      <div style={{ display: 'flex', justifyContent: 'space-between', overflowX: 'auto', gap: '4px', padding: '4px 0' }}>
        {weekDays.map((day, i) => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const isToday = dateStr === todayStr;
          const dayMood = todayMoods.find((m) => m.date === dateStr);
          return (
            <motion.div
              key={dateStr}
              whileTap={{ scale: 0.95 }}
              style={{
                width: '48px',
                height: '64px',
                borderRadius: '9999px',
                backgroundColor: isToday ? 'var(--color-nav-bg)' : dayMood ? 'var(--color-surface)' : 'transparent',
                border: dayMood && !isToday ? '1px solid var(--color-divider)' : 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2px',
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: '0.625rem', color: isToday ? '#FFFFFF' : 'var(--color-text-sub)', fontWeight: 500 }}>
                {format(day, 'EEE')}
              </span>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: isToday ? '#FFFFFF' : 'var(--color-text-primary)' }}>
                {format(day, 'd')}
              </span>
              {dayMood && <span style={{ fontSize: '0.875rem' }}>{dayMood.primaryEmoji}</span>}
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          padding: '24px',
          borderRadius: 'var(--radius, 1.5rem)',
          backgroundColor: 'var(--color-surface)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600 }}>How are you feeling?</h2>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-sub)' }}>
              {format(new Date(), 'h:mm a')}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
          {PRIMARY_MOODS.map((mood) => (
            <MoodCard
              key={mood.id}
              mood={mood}
              isSelected={selectedMood?.id === mood.id}
              onTap={(m) => {
                setSelectedMood(m);
                setModalOpen(true);
              }}
            />
          ))}
        </div>
      </motion.div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <div style={{ flex: 1 }}>
          <StreakBadge streak={streak} />
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setSosOpen(true)}
          style={{
            flex: 1,
            padding: '16px',
            borderRadius: 'var(--radius, 1.5rem)',
            backgroundColor: 'var(--color-blue-light)',
            boxShadow: 'var(--shadow-card)',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>🆘 SOS</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-sub)' }}>Reach a friend</p>
        </motion.button>
      </div>

      {lastMood && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-sub)' }}>Last logged:</span>
          <span style={{ fontSize: '1rem' }}>{lastMood.primaryEmoji}</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>{lastMood.primaryLabel}</span>
          <span style={{ fontSize: '0.625rem', color: 'var(--color-text-muted)' }}>
            {format(new Date(lastMood.timestamp), 'h:mm a')}
          </span>
        </div>
      )}

      <MoodDetailModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setSelectedMood(null); }}
        primaryMood={selectedMood}
      />
      <SOSConfirm isOpen={sosOpen} onClose={() => setSosOpen(false)} />
    </div>
  );
}
