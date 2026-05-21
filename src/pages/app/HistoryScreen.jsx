import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useMoodHistory } from '../../hooks/useMoodHistory';
import { PRIMARY_MOODS } from '../../data/moodData';

const containerVariants = {
  animate: { transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.25, ease: 'easeOut' } },
};

function getMoodColor(emoji) {
  const mood = PRIMARY_MOODS.find((m) => m.emoji === emoji);
  return mood ? mood.color : 'var(--color-divider)';
}

export default function HistoryScreen() {
  const { getTodayMoods, getWeekMoods, getTopTriggers, getMoodDistribution } = useMoodHistory();
  const todayMoods = getTodayMoods();
  const weekMoods = getWeekMoods();
  const topTriggers = getTopTriggers();
  const distribution = getMoodDistribution();

  const chartData = weekMoods.map((d) => {
    const dominantMood = d.moods.length > 0 ? d.moods[0].primaryEmoji : null;
    return {
      day: d.dayName,
      count: d.moods.length,
      color: getMoodColor(dominantMood),
      emoji: dominantMood,
      label: d.moods.length > 0 ? d.moods[0].primaryLabel : '',
    };
  });

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{
          padding: '8px 12px',
          borderRadius: 'var(--radius, 0.75rem)',
          backgroundColor: 'var(--color-surface)',
          boxShadow: 'var(--shadow-card)',
          fontSize: '0.75rem',
        }}>
          <p style={{ fontWeight: 600 }}>{data.day}</p>
          {data.emoji && <p>{data.emoji} {data.label}</p>}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>History & Insights</h1>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 600 }}>Today</h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-sub)' }}>
            {format(new Date(), 'EEEE, d MMM')}
          </span>
        </div>

        <motion.div variants={containerVariants} initial="initial" animate="animate" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {todayMoods.length === 0 ? (
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', textAlign: 'center', padding: '24px' }}>
              No moods logged today. Tap a mood on Home to get started.
            </p>
          ) : (
            todayMoods.map((mood, i) => (
              <motion.div
                key={mood.id}
                variants={itemVariants}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius, 1rem)',
                  backgroundColor: 'var(--color-surface)',
                  boxShadow: 'var(--shadow-card)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: getMoodColor(mood.primaryEmoji),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  flexShrink: 0,
                }}>
                  {mood.primaryEmoji}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>{mood.primaryLabel}</p>
                  {mood.secondaryLabel && (
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-sub)' }}>
                      {mood.secondaryEmoji} {mood.secondaryLabel} · Intensity {mood.intensity}/5
                    </p>
                  )}
                  {mood.tags && mood.tags.length > 0 && (
                    <div style={{ display: 'flex', gap: '4px', marginTop: '4px', flexWrap: 'wrap' }}>
                      {mood.tags.map((tag) => (
                        <span key={tag} style={{
                          fontSize: '0.625rem',
                          padding: '2px 8px',
                          borderRadius: '9999px',
                          backgroundColor: 'var(--color-green-light)',
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <span style={{ fontSize: '0.625rem', color: 'var(--color-text-muted)' }}>
                  {format(new Date(mood.timestamp), 'h:mm a')}
                </span>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>

      <div style={{
        padding: '20px',
        borderRadius: 'var(--radius, 1.5rem)',
        backgroundColor: 'var(--color-surface)',
        boxShadow: 'var(--shadow-card)',
      }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '16px' }}>This Week</h2>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={chartData}>
            <XAxis dataKey="day" tick={{ fontSize: 10, fill: 'var(--color-text-sub)' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
            <Bar dataKey="count" radius={[8, 8, 0, 0]} fill="var(--color-blue-mid)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {topTriggers.length > 0 && (
        <div>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '12px' }}>Your Triggers This Month</h2>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
            {topTriggers.slice(0, 6).map((trigger) => (
              <div key={trigger.tag} style={{
                padding: '8px 16px',
                borderRadius: '9999px',
                backgroundColor: 'var(--color-blue-light)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                flexShrink: 0,
              }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{trigger.tag}</span>
                <span style={{
                  fontSize: '0.625rem',
                  fontWeight: 700,
                  backgroundColor: 'var(--color-blue-mid)',
                  color: '#FFFFFF',
                  padding: '2px 6px',
                  borderRadius: '9999px',
                }}>
                  {trigger.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {distribution.length > 0 && (
        <div>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '12px' }}>Weekly Report</h2>
          <div style={{
            padding: '16px',
            borderRadius: 'var(--radius, 1.5rem)',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-divider)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}>
            {distribution.map((item) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1rem', width: '24px' }}>{item.label.split(' ')[0]}</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 500, flex: 1 }}>{item.label}</span>
                <div style={{ flex: 2, height: '8px', borderRadius: '9999px', backgroundColor: 'var(--color-divider)', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    style={{ height: '100%', borderRadius: '9999px', backgroundColor: 'var(--color-blue-mid)' }}
                  />
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, width: '36px', textAlign: 'right' }}>{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
