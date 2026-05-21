import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { ImagePlaceholder } from '../../components/shared/ImagePlaceholder';
import { GreetingBanner } from '../../components/shared/GreetingBanner';
import { db } from '../../db/db';
import { useMoodStore } from '../../store/moodStore';

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export default function LoginScreen() {
  const navigate = useNavigate();
  const { setCurrentUser, setAuthenticated } = useMoodStore();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);

  React.useEffect(() => {
    const loadUser = async () => {
      const users = await db.user.toArray();
      if (users.length > 0) {
        setUser(users[0]);
      }
    };
    loadUser();
  }, []);

  const handleLogin = async () => {
    if (!user) return;
    const inputHash = await hashPassword(password);
    if (inputHash === user.passwordHash) {
      setCurrentUser(user);
      setAuthenticated(true);
      navigate('/home');
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  const firstName = user?.fullName?.split(' ')[0] || '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '32px' }}
    >
      <ImagePlaceholder width={80} height={80} shape="circle" description="MoodMap logo" />

      <GreetingBanner firstName={firstName} />

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <motion.div
          animate={error ? { x: [0, -8, 8, -8, 8, 0] } : {}}
          transition={{ duration: 0.4 }}
          style={{ position: 'relative' }}
        >
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            style={{
              width: '100%',
              height: '56px',
              padding: '0 48px 0 20px',
              borderRadius: 'var(--radius, 1rem)',
              border: error ? '2px solid var(--mood-stressed)' : '1px solid var(--color-divider)',
              fontSize: '0.875rem',
              outline: 'none',
              backgroundColor: 'var(--color-surface)',
            }}
            onFocus={(e) => { if (!error) e.target.style.borderColor = 'var(--color-blue-mid)'; }}
            onBlur={(e) => { if (!error) e.target.style.borderColor = 'var(--color-divider)'; }}
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {showPassword ? <EyeOff size={20} color="var(--color-text-sub)" /> : <Eye size={20} color="var(--color-text-sub)" />}
          </button>
        </motion.div>

        <button
          onClick={() => navigate('/forgot-password')}
          style={{
            alignSelf: 'flex-end',
            background: 'none',
            border: 'none',
            fontSize: '0.75rem',
            color: 'var(--color-blue-mid)',
            cursor: 'pointer',
          }}
        >
          Forgot password?
        </button>
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handleLogin}
        style={{
          width: '100%',
          height: '56px',
          borderRadius: '9999px',
          backgroundColor: 'var(--color-blue-mid)',
          color: '#FFFFFF',
          fontSize: '1rem',
          fontWeight: 600,
          border: 'none',
          cursor: 'pointer',
          boxShadow: 'var(--shadow-button)',
        }}
      >
        Enter App
      </motion.button>
    </motion.div>
  );
}
