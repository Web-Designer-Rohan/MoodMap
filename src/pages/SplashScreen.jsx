import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { db } from '../db/db';
import { gratitudeMessages } from '../data/gratitudeMessages';
import { ImagePlaceholder } from '../components/shared/ImagePlaceholder';

export default function SplashScreen() {
  const navigate = useNavigate();
  const [message] = useState(() => {
    const idx = Math.floor(Math.random() * gratitudeMessages.length);
    return gratitudeMessages[idx];
  });
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const users = await db.user.toArray();
      const target = users.length > 0 ? '/login' : '/signup/step1';

      const fadeTimer = setTimeout(() => {
        setVisible(false);
      }, 2700);

      const navTimer = setTimeout(() => {
        navigate(target, { replace: true });
      }, 3000);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(navTimer);
      };
    };
    checkUser();
  }, [navigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.6 }}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-bg)',
        padding: '24px',
        gap: '24px',
      }}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <ImagePlaceholder width={120} height={120} shape="circle" description="MoodMap logo" />
      </motion.div>

      <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
        MoodMap
      </h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{
          fontSize: '1rem',
          fontWeight: 400,
          fontStyle: 'italic',
          color: 'var(--color-text-sub)',
          maxWidth: '280px',
          textAlign: 'center',
          lineHeight: 1.6,
        }}
      >
        {message}
      </motion.p>

      <motion.div
        style={{ display: 'flex', gap: '8px' }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-blue-mid)',
            }}
          />
        ))}
      </motion.div>

      <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
        v1.0.0
      </p>
    </motion.div>
  );
}
