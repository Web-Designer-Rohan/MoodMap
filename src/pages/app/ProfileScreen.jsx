import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Bell, Users, Lock, Download, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { useMoodStore } from '../../store/moodStore';
import { useMoodHistory } from '../../hooks/useMoodHistory';
import { BADGES } from '../../data/badgeData';
import { ImagePlaceholder } from '../../components/shared/ImagePlaceholder';
import { db } from '../../db/db';

export default function ProfileScreen() {
  const navigate = useNavigate();
  const { currentUser, streak, todayMoods } = useMoodStore();
  const { moods } = useMoodHistory();
  const [unlockedBadges, setUnlockedBadges] = useState([]);

  useEffect(() => {
    const loadBadges = async () => {
      const earned = await db.badges.toArray();
      setUnlockedBadges(earned.map((b) => b.badgeId));
    };
    loadBadges();
  }, [moods]);

  const totalLogs = moods.length;
  const thisMonthLogs = moods.filter((m) => {
    const moodDate = new Date(m.date);
    const now = new Date();
    return moodDate.getMonth() === now.getMonth() && moodDate.getFullYear() === now.getFullYear();
  }).length;

  const firstName = currentUser?.fullName?.split(' ')[0] || '';
  const username = currentUser?.username || '';
  const academicLevel = currentUser?.academicLevel || '';

  const stats = {
    totalLogs,
    streak,
    journalEntries: moods.filter((m) => m.note).length,
    healVisited: true,
    closures: 0,
    allFiveInWeek: false,
    consecutiveCalm: 0,
  };

  const personalityTypes = [
    { name: 'The Observer', description: 'You notice patterns others miss. Your awareness is your strength.' },
    { name: 'The Healer', description: 'You process emotions deeply and emerge stronger each time.' },
    { name: 'The Reflector', description: 'You understand yourself through honest self-reflection.' },
    { name: 'The Resilient', description: 'You bounce back with grace, even after the hardest days.' },
  ];

  const personalityType = totalLogs >= 30 ? personalityTypes[totalLogs % personalityTypes.length] : null;

  const handleExport = () => {
    const data = moods.map((m) => ({
      date: m.date,
      mood: m.primaryLabel,
      intensity: m.intensity,
      note: m.note,
      tags: m.tags,
    }));
    const text = JSON.stringify(data, null, 2);
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `moodmap-export-${format(new Date(), 'yyyy-MM-dd')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = async () => {
    const confirmed = window.confirm('Are you sure? This will delete all your mood data permanently.');
    if (confirmed) {
      await db.moods.clear();
      await db.grief.clear();
      await db.sleep.clear();
      await db.badges.clear();
      navigate('/');
    }
  };

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ position: 'relative' }}>
        <div style={{
          width: '100%',
          height: '180px',
          borderRadius: 'var(--radius, 1.5rem)',
          backgroundColor: 'var(--color-green-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '48px',
        }}>
          <span style={{ fontSize: '3rem' }}>🖼️</span>
          {/* IMAGE PLACEHOLDER: Soft gradient mesh background — cool blue to mint green */}
        </div>
        <div style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '88px',
          height: '88px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-green-light)',
          border: '4px solid white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2.5rem',
          boxShadow: 'var(--shadow-card)',
        }}>
          {currentUser?.avatarEmoji || '🧑‍🎓'}
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{currentUser?.fullName || 'User'}</h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-sub)' }}>@{username}</p>
        {academicLevel && (
          <span style={{
            display: 'inline-block',
            marginTop: '8px',
            padding: '4px 12px',
            borderRadius: '9999px',
            backgroundColor: 'var(--color-blue-light)',
            fontSize: '0.75rem',
            fontWeight: 500,
          }}>
            {academicLevel}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        {[
          { label: 'Total logs', value: totalLogs },
          { label: 'Streak', value: `${streak} 🔥` },
          { label: 'This month', value: thisMonthLogs },
        ].map((stat) => (
          <div key={stat.label} style={{
            flex: 1,
            padding: '16px',
            borderRadius: 'var(--radius, 1rem)',
            backgroundColor: 'var(--color-surface)',
            boxShadow: 'var(--shadow-card)',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: '1.25rem', fontWeight: 700 }}>{stat.value}</p>
            <p style={{ fontSize: '0.625rem', color: 'var(--color-text-sub)' }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {personalityType ? (
        <div style={{
          padding: '20px',
          borderRadius: 'var(--radius, 1.5rem)',
          background: 'linear-gradient(135deg, var(--color-blue-light), var(--color-green-light))',
        }}>
          <p style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '4px' }}>{personalityType.name}</p>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-sub)' }}>{personalityType.description}</p>
        </div>
      ) : (
        <div style={{
          padding: '20px',
          borderRadius: 'var(--radius, 1.5rem)',
          backgroundColor: 'var(--color-surface)',
          boxShadow: 'var(--shadow-card)',
          textAlign: 'center',
        }}>
          <span style={{ fontSize: '1.5rem' }}>🔒</span>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-sub)', marginTop: '8px' }}>
            Keep logging to unlock your mood personality ({30 - totalLogs} more logs needed)
          </p>
        </div>
      )}

      <div>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '12px' }}>Your Badges</h2>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
          {BADGES.map((badge) => {
            const isUnlocked = unlockedBadges.includes(badge.id);
            return (
              <div key={badge.id} style={{
                width: '56px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                flexShrink: 0,
                opacity: isUnlocked ? 1 : 0.4,
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: 'var(--radius, 1rem)',
                  backgroundColor: isUnlocked ? 'var(--color-blue-light)' : 'var(--color-divider)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  position: 'relative',
                }}>
                  {badge.emoji}
                  {!isUnlocked && (
                    <span style={{ position: 'absolute', fontSize: '0.75rem' }}>🔒</span>
                  )}
                </div>
                <span style={{ fontSize: '0.5rem', color: 'var(--color-text-sub)', textAlign: 'center' }}>
                  {badge.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '12px' }}>Settings</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { icon: Bell, label: 'Daily Reminder', action: () => {} },
            { icon: Users, label: 'Trusted Contacts', action: () => navigate('/profile') },
            { icon: Lock, label: 'Privacy Lock', action: () => {} },
            { icon: Download, label: 'Export Mood Data', action: handleExport },
            { icon: Trash2, label: 'Reset All Data', action: handleReset, danger: true },
          ].map((item) => (
            <motion.button
              key={item.label}
              whileTap={{ scale: 0.98 }}
              onClick={item.action}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: 'var(--radius, 1rem)',
                backgroundColor: 'var(--color-surface)',
                boxShadow: 'var(--shadow-card)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <item.icon size={20} color={item.danger ? 'var(--mood-stressed)' : 'var(--color-text-primary)'} />
                <span style={{ fontSize: '0.875rem', fontWeight: 500, color: item.danger ? 'var(--mood-stressed)' : 'var(--color-text-primary)' }}>
                  {item.label}
                </span>
              </div>
              <ChevronRight size={16} color="var(--color-text-muted)" />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
