import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMoodStore } from '../../store/moodStore';

export default function SOSConfirm({ isOpen, onClose }) {
  const { currentUser } = useMoodStore();
  const [sending, setSending] = useState(false);

  const trustedContacts = currentUser?.trustedContacts
    ? JSON.parse(currentUser.trustedContacts || '[]')
    : [];

  const handleSend = () => {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.3)',
              zIndex: 999,
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              maxWidth: '340px',
              width: '90%',
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius, 1.5rem)',
              padding: '24px',
              zIndex: 1000,
              boxShadow: 'var(--shadow-nav)',
            }}
          >
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '8px' }}>
              Reach out to a friend 🆘
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-sub)', marginBottom: '16px' }}>
              This will send a pre-written message to your trusted contact.
            </p>

            {trustedContacts.length > 0 && (
              <div
                style={{
                  padding: '12px',
                  borderRadius: 'var(--radius, 1rem)',
                  backgroundColor: 'var(--color-blue-light)',
                  marginBottom: '16px',
                }}
              >
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-sub)', marginBottom: '4px' }}>
                  Sending to:
                </p>
                <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                  {trustedContacts[0].name} ({trustedContacts[0].email})
                </p>
              </div>
            )}

            <div
              style={{
                padding: '12px',
                borderRadius: 'var(--radius, 1rem)',
                backgroundColor: 'var(--color-bg)',
                marginBottom: '20px',
                fontSize: '0.875rem',
                lineHeight: 1.5,
              }}
            >
              "Hey, I am going through a tough time right now and could use someone to talk to. Would you be available?"
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleSend}
                disabled={sending}
                style={{
                  width: '100%',
                  height: '48px',
                  borderRadius: '9999px',
                  backgroundColor: sending ? 'var(--color-green-mid)' : 'var(--color-green-deep)',
                  color: '#FFFFFF',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {sending ? 'Sending...' : 'Send Message'}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={onClose}
                style={{
                  width: '100%',
                  height: '48px',
                  borderRadius: '9999px',
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text-sub)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  border: '1px solid var(--color-divider)',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
