import { create } from 'zustand';
import { db } from '../db/db';

export const useMoodStore = create((set, get) => ({
  currentUser: null,
  isAuthenticated: false,
  selectedMood: null,
  selectedSecondaryMood: null,
  moodIntensity: 3,
  selectedTags: [],
  moodNote: '',
  todayMoods: [],
  streak: 0,
  activeGriefEntries: [],

  setCurrentUser: (user) => set({ currentUser: user }),
  setAuthenticated: (val) => set({ isAuthenticated: val }),
  setSelectedMood: (mood) => set({ selectedMood: mood }),
  setSelectedSecondaryMood: (mood) => set({ selectedSecondaryMood: mood }),
  setMoodIntensity: (intensity) => set({ moodIntensity: intensity }),
  toggleTag: (tag) => {
    const { selectedTags } = get();
    if (selectedTags.includes(tag)) {
      set({ selectedTags: selectedTags.filter((t) => t !== tag) });
    } else {
      set({ selectedTags: [...selectedTags, tag] });
    }
  },
  setMoodNote: (note) => set({ moodNote: note }),
  resetMoodForm: () => set({
    selectedMood: null,
    selectedSecondaryMood: null,
    moodIntensity: 3,
    selectedTags: [],
    moodNote: '',
  }),

  saveMood: async (moodData) => {
    const id = await db.moods.add({
      ...moodData,
      date: new Date().toISOString().split('T')[0],
      timestamp: Date.now(),
    });
    await get().loadTodayMoods();
    await get().loadStreak();
    return id;
  },

  loadTodayMoods: async () => {
    const today = new Date().toISOString().split('T')[0];
    const todayMoods = await db.moods.where('date').equals(today).toArray();
    set({ todayMoods });
  },

  loadStreak: async () => {
    const allMoods = await db.moods.toArray();
    const uniqueDates = [...new Set(allMoods.map((m) => m.date))].sort().reverse();
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < uniqueDates.length; i++) {
      const expectedDate = new Date(today);
      expectedDate.setDate(expectedDate.getDate() - i);
      const expectedStr = expectedDate.toISOString().split('T')[0];
      if (uniqueDates[i] === expectedStr) {
        streak++;
      } else {
        break;
      }
    }
    set({ streak });
  },

  loadActiveGriefEntries: async () => {
    const entries = await db.grief.where('status').equals('active').toArray();
    set({ activeGriefEntries: entries });
  },

  init: async () => {
    const users = await db.user.toArray();
    if (users.length > 0) {
      set({ currentUser: users[0] });
    }
    await get().loadTodayMoods();
    await get().loadStreak();
    await get().loadActiveGriefEntries();
  },
}));
