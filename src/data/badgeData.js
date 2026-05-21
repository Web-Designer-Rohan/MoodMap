export const BADGES = [
  { id: 'first_mood', emoji: '🌱', label: 'First Mood', description: 'Logged your first mood', condition: (stats) => stats.totalLogs >= 1 },
  { id: 'streak_7', emoji: '🔥', label: '7-Day Streak', description: 'Logged mood for 7 days in a row', condition: (stats) => stats.streak >= 7 },
  { id: 'streak_30', emoji: '💪', label: '30-Day Streak', description: 'Logged mood for 30 days in a row', condition: (stats) => stats.streak >= 30 },
  { id: 'first_journal', emoji: '📖', label: 'First Journal', description: 'Wrote your first mood note', condition: (stats) => stats.journalEntries >= 1 },
  { id: 'entered_heal', emoji: '💚', label: 'Healing Journey', description: 'Entered the Heal section', condition: (stats) => stats.healVisited },
  { id: 'first_closure', emoji: '🕊️', label: 'First Closure', description: 'Released your first grief entry', condition: (stats) => stats.closures >= 1 },
  { id: 'all_five_moods', emoji: '🌈', label: 'Full Spectrum', description: 'Logged all 5 moods in one week', condition: (stats) => stats.allFiveInWeek },
  { id: 'seven_calm', emoji: '🧘', label: 'Peaceful Week', description: '7 consecutive calm days', condition: (stats) => stats.consecutiveCalm >= 7 },
];
