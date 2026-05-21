import Dexie from 'dexie';

export const db = new Dexie('MoodMapDB');

db.version(1).stores({
  user: '++id, email, username, fullName, avatarEmoji, academicLevel, passwordHash, securityQuestion, securityAnswer, trustedContacts, createdAt',
  moods: '++id, primaryEmoji, primaryLabel, secondaryEmoji, secondaryLabel, intensity, note, tags, date, timestamp',
  grief: '++id, category, description, startDate, status, unsentLetter, voiceNoteRef',
  sleep: '++id, date, quality, note',
  badges: '++id, badgeId, unlockedAt',
});
