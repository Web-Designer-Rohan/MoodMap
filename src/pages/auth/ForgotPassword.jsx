import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';
import { db } from '../../db/db';

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [answer, setAnswer] = useState('');
  const [correct, setCorrect] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUser = async () => {
      const users = await db.user.toArray();
      if (users.length > 0) setUser(users[0]);
    };
    loadUser();
  }, []);

  const checkAnswer = () => {
    if (answer.toLowerCase().trim() === user?.securityAnswer?.toLowerCase().trim()) {
      setCorrect(true);
    } else {
      setError('Incorrect answer');
    }
  };

  const handleReset = async () => {
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    const hash = await hashPassword(newPassword);
    await db.user.update(user.id, { passwordHash: hash });
    navigate('/login');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)', padding: '20px' }}
    >
      <button onClick={() => navigate('/login')} style={{ background: 'none', border: 'none', cursor: 'pointer', marginBottom: '24px' }}>
        <ChevronLeft size={24} color="var(--color-text-primary)" />
      </button>

      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>Reset Password</h1>
      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-sub)', marginBottom: '24px' }}>
        Answer your security question to reset your password.
      </p>

      {!correct ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ padding: '16px', borderRadius: 'var(--radius, 1rem)', backgroundColor: 'var(--color-blue-light)' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-sub)', marginBottom: '4px' }}>Security Question:</p>
            <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>{user?.securityQuestion || 'Loading...'}</p>
          </div>
          <input
            type="text"
            placeholder="Your answer"
            value={answer}
            onChange={(e) => { setAnswer(e.target.value); setError(''); }}
            style={{
              height: '56px',
              padding: '0 20px',
              borderRadius: 'var(--radius, 1rem)',
              border: '1px solid var(--color-divider)',
              fontSize: '0.875rem',
              outline: 'none',
              backgroundColor: 'var(--color-surface)',
            }}
          />
          {error && <p style={{ fontSize: '0.75rem', color: 'var(--mood-stressed)' }}>{error}</p>}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={checkAnswer}
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
            Check Answer
          </motion.button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-green-deep)', fontWeight: 500 }}>Answer correct! Set a new password.</p>
          <div style={{ position: 'relative' }}>
            <input
              type={showNew ? 'text' : 'password'}
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{
                width: '100%',
                height: '56px',
                padding: '0 48px 0 20px',
                borderRadius: 'var(--radius, 1rem)',
                border: '1px solid var(--color-divider)',
                fontSize: '0.875rem',
                outline: 'none',
                backgroundColor: 'var(--color-surface)',
              }}
            />
            <button onClick={() => setShowNew(!showNew)} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}>
              {showNew ? <EyeOff size={20} color="var(--color-text-sub)" /> : <Eye size={20} color="var(--color-text-sub)" />}
            </button>
          </div>
          <div style={{ position: 'relative' }}>
            <input
              type={showConfirm ? 'text' : 'password'}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                width: '100%',
                height: '56px',
                padding: '0 48px 0 20px',
                borderRadius: 'var(--radius, 1rem)',
                border: '1px solid var(--color-divider)',
                fontSize: '0.875rem',
                outline: 'none',
                backgroundColor: 'var(--color-surface)',
              }}
            />
            <button onClick={() => setShowConfirm(!showConfirm)} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}>
              {showConfirm ? <EyeOff size={20} color="var(--color-text-sub)" /> : <Eye size={20} color="var(--color-text-sub)" />}
            </button>
          </div>
          {error && <p style={{ fontSize: '0.75rem', color: 'var(--mood-stressed)' }}>{error}</p>}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleReset}
            style={{
              width: '100%',
              height: '56px',
              borderRadius: '9999px',
              backgroundColor: 'var(--color-green-deep)',
              color: '#FFFFFF',
              fontSize: '1rem',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-button)',
            }}
          >
            Reset Password
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}
