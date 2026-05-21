export const PRIMARY_MOODS = [
  { id: 'happy',   emoji: '😄', label: 'Happy',   color: '#FFE0A3', textColor: '#8A6A20' },
  { id: 'calm',    emoji: '😌', label: 'Calm',    color: '#BDDFF7', textColor: '#2C6E8A' },
  { id: 'neutral', emoji: '😐', label: 'Neutral', color: '#D9E0E8', textColor: '#4A5568' },
  { id: 'stressed',emoji: '😟', label: 'Stressed',color: '#D4CBE5', textColor: '#5A4A7A' },
  { id: 'low',     emoji: '😔', label: 'Low',     color: '#B8C9D9', textColor: '#3A5068' },
];

export const SECONDARY_MOODS = {
  happy: [
    { emoji: '🤩', label: 'Excited' },
    { emoji: '🥰', label: 'Grateful' },
    { emoji: '😁', label: 'Proud' },
    { emoji: '🤗', label: 'Supported' },
  ],
  calm: [
    { emoji: '🧘', label: 'At Peace' },
    { emoji: '😴', label: 'Sleepy' },
    { emoji: '🌿', label: 'Refreshed' },
    { emoji: '🤍', label: 'Soft' },
  ],
  neutral: [
    { emoji: '🫥', label: 'Disconnected' },
    { emoji: '🤔', label: 'Confused' },
    { emoji: '😶', label: 'Numb' },
    { emoji: '🫠', label: 'Drained' },
  ],
  stressed: [
    { emoji: '😤', label: 'Frustrated' },
    { emoji: '😰', label: 'Nervous' },
    { emoji: '🤯', label: 'Overwhelmed' },
    { emoji: '😠', label: 'Irritated' },
  ],
  low: [
    { emoji: '🥺', label: 'Vulnerable' },
    { emoji: '😞', label: 'Defeated' },
    { emoji: '😶‍🌫️', label: 'Lost' },
    { emoji: '💔', label: 'Heartbroken' },
  ],
};

export const TRIGGER_TAGS = [
  'exam', 'assignment', 'sleep-deprived', 'social',
  'exercise', 'family', 'friendship', 'self-doubt',
  'phone', 'food', 'weather', 'money'
];

export const UNIQUE_MOODS = [
  { emoji: '🫤', label: 'Meh' },
  { emoji: '😮‍💨', label: 'Relieved' },
  { emoji: '🥴', label: 'Scattered' },
  { emoji: '😑', label: 'Done' },
  { emoji: '🫶', label: 'Hopeful' },
  { emoji: '🌧️', label: 'Gloomy' },
  { emoji: '⚡', label: 'Restless' },
  { emoji: '🌀', label: 'Spiraling' },
];
