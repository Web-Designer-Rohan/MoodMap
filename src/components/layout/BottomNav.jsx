import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BarChart2, Heart, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const tabs = [
  { path: '/home', icon: Home, label: 'Home' },
  { path: '/history', icon: BarChart2, label: 'History' },
  { path: '/heal', icon: Heart, label: 'Heal' },
  { path: '/calendar', icon: Calendar, label: 'Calendar' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const activeIndex = tabs.findIndex((tab) => location.pathname === tab.path);

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        bottom: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '280px',
        height: '64px',
        borderRadius: '9999px',
        backgroundColor: 'var(--color-nav-bg)',
        boxShadow: 'var(--shadow-nav)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 12px',
        zIndex: 1000,
      }}
    >
      {tabs.map((tab, index) => {
        const isActive = index === activeIndex;
        const Icon = tab.icon;
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px',
              padding: '8px 12px',
              position: 'relative',
            }}
          >
            <Icon
              size={22}
              style={{
                color: isActive ? 'var(--color-nav-active)' : 'rgba(255,255,255,0.5)',
                transition: 'color 0.2s ease',
              }}
            />
            {isActive && (
              <motion.div
                layoutId="navIndicator"
                style={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-nav-active)',
                }}
              />
            )}
          </button>
        );
      })}
    </motion.div>
  );
}
