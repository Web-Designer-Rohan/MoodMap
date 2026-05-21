Use the `frontend-design` skill and `shadcn` skill before writing a single line of code.

---

## ROLE

You are an elite full-stack web app developer and UI/UX engineer with 10+ years of professional experience. You specialize in building production-grade, pixel-perfect React web applications with a deep mastery of component architecture, design systems, animation, and local-first data persistence. You have shipped apps used by millions of users and you understand that great software is defined equally by its code quality and its emotional impact on the user. You never produce generic, template-looking interfaces. Every pixel you produce is intentional.

---

## PROJECT OVERVIEW

**App Name:** MoodMap
**Tagline:** Your daily emotional companion
**Primary Audience:** Students aged 14–25 who experience academic stress, anxiety, heartbreak, and emotional overwhelm in their daily lives.
**Core Purpose:** A fully local, private, beautifully designed mood tracking web app that helps students understand, process, and heal their emotions over time.
**Data Storage:** 100% local. All data is stored in the browser's IndexedDB using Dexie.js. No backend. No authentication server. No external API calls of any kind. Zero data leaves the device.

---

## TECH STACK — MANDATORY, DO NOT DEVIATE

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS v3
- **Component Library:** shadcn/ui — use it as the base for all UI primitives (cards, buttons, inputs, dialogs, sheets, badges, tabs)
- **State Management:** Zustand
- **Local Database:** Dexie.js (IndexedDB wrapper)
- **Charts:** Recharts
- **Date Utilities:** date-fns
- **Animations:** Framer Motion for all page transitions, micro-interactions, and component reveals
- **Icons:** Lucide React
- **Fonts:** Load via Google Fonts — `Plus Jakarta Sans` (weights: 300, 400, 500, 600, 700, 800)
- **No other dependencies** unless absolutely unavoidable. Keep the bundle lean.

---

## DESIGN PHILOSOPHY — READ THIS CAREFULLY BEFORE WRITING ANY CODE

This app is designed for emotionally vulnerable students. Every design decision must prioritize calm, safety, and emotional warmth. The design language is:

**Soft Minimalism meets iPhone-Native.**

Think of how Apple Health, Apple Mindfulness, and Headspace look and feel. Clean whitespace. Rounded everything. Gentle shadows. Soft colors. Nothing aggressive, nothing sharp, nothing loud.

### Core Design Rules

1. **Zero sharp edges.** Every component uses rounded corners. Cards: `rounded-3xl`. Buttons and pills: `rounded-full`. Inputs: `rounded-2xl`. Bottom nav: `rounded-full` as a floating pill.
2. **Whitespace is sacred.** Generous padding everywhere. Minimum `p-5` on cards. Sections breathe. Never feel cramped.
3. **No glassmorphism.** Do not use backdrop-blur frosted glass effects. They create visual noise that undermines the calm atmosphere. Keep surfaces clean and solid.
4. **No 3D transforms or perspective effects.** Subtle scale animations on tap are fine (`scale(0.97)`). No rotateX, rotateY, or perspective CSS on any component.
5. **Shadows are whispers, not shouts.** Use only: `box-shadow: 0 4px 24px rgba(125, 200, 227, 0.10)` for cards. Never use harsh dark shadows.
6. **Typography hierarchy is strict.** Page titles: `text-2xl font-bold`. Section headers: `text-lg font-semibold`. Body: `text-sm font-normal`. Timestamps/labels: `text-xs font-medium`. All in Plus Jakarta Sans.
7. **Animations are gentle.** Page transitions: fade + slide up, 300ms ease. Component reveals: staggered fade-in with 60ms delay between items. Tap feedback: scale 0.97, 150ms. Nothing bouncy, nothing elastic.
8. **Image and video placeholders:** Wherever an image or frame-sequence animation is specified, render a clean placeholder `div` with the exact dimensions, background color `#C8E6C4`, a centered 🖼️ emoji, and a comment in the code: `{/* IMAGE PLACEHOLDER: [description of what goes here] */}`. Do not use any stock images or external image URLs.
9. **Mobile-first layout.** Max content width: `390px`, centered on desktop. This is a mobile web app. Everything is designed for a phone screen.
10. **Bottom navigation floats.** The nav bar is a dark pill (`bg-[#1B3A2D]`) floating 16px above the bottom of the screen, fixed position, `rounded-full`, with 4 icon tabs inside it.

---

## COLOR PALETTE — MANDATORY CSS VARIABLES

Define these in your global CSS (`index.css`) as CSS custom properties. Use them everywhere via Tailwind's config or direct CSS. Never hardcode hex values outside of this definition.

```css
:root {
  /* Backgrounds */
  --color-bg:           #F7F9FB;   /* App canvas — soft cool white */
  --color-surface:      #FFFFFF;   /* Card and component surface */

  /* Primary Blue — 30% of UI */
  --color-blue-light:   #BDDFF7;   /* Section backgrounds, calendar cells, tags */
  --color-blue-mid:     #7EC8E3;   /* Primary buttons, active states, highlights */
  --color-blue-deep:    #4A9DBF;   /* Pressed states, focused input borders */

  /* Accent Green — 10% of UI */
  --color-green-light:  #C8E6C4;   /* Tag chips, placeholder backgrounds */
  --color-green-mid:    #A8CBA8;   /* Streak badges, success confirmations */
  --color-green-deep:   #4A8C6F;   /* Secondary action buttons, icons */

  /* Typography */
  --color-text-primary: #2C3E50;   /* All headings and primary body text */
  --color-text-sub:     #7F8C9A;   /* Timestamps, labels, placeholder text */
  --color-text-muted:   #B0BEC5;   /* Disabled states, very subtle labels */

  /* Structural */
  --color-divider:      #E8EFF5;   /* Separator lines, card borders */
  --color-nav-bg:       #1B3A2D;   /* Bottom navigation pill background */
  --color-nav-icon:     #FFFFFF;   /* Bottom nav icons */
  --color-nav-active:   #7EC8E3;   /* Active tab indicator */

  /* Mood Accent Colors — used ONLY on mood cards and emoji backgrounds */
  --mood-happy:         #FFE0A3;   /* Warm honey — 😄 Happy */
  --mood-calm:          #BDDFF7;   /* Sky mist — 😌 Calm */
  --mood-neutral:       #D9E0E8;   /* Pebble grey — 😐 Neutral */
  --mood-stressed:      #D4CBE5;   /* Dusty lavender — 😟 Stressed */
  --mood-low:           #B8C9D9;   /* Soft slate — 😔 Low */

  /* Shadows */
  --shadow-card:        0 4px 24px rgba(125, 200, 227, 0.10);
  --shadow-nav:         0 8px 32px rgba(27, 58, 45, 0.18);
  --shadow-button:      0 4px 16px rgba(126, 200, 227, 0.25);
}
```

**Forbidden colors — never use under any circumstance:**
- Any shade of red or orange (cortisol trigger)
- Hot pink or magenta (arousal trigger)
- Deep saturated purple (ego/pride trigger)
- Pure black `#000000` (too harsh, clinical)
- Bright saturated yellow (anxiety spike)

---

## PROJECT FILE STRUCTURE

Scaffold exactly this structure. No deviations.

```
src/
├── main.jsx
├── App.jsx
├── index.css
├── db/
│   └── db.js                    # Dexie.js IndexedDB schema
├── store/
│   └── moodStore.js             # Zustand global state
├── data/
│   ├── gratitudeMessages.js     # Array of 40 gratitude messages
│   ├── moodData.js              # Emoji definitions, labels, colors
│   └── badgeData.js             # Badge definitions and unlock conditions
├── components/
│   ├── layout/
│   │   ├── AppLayout.jsx        # Root wrapper with bottom nav
│   │   └── BottomNav.jsx        # Floating dark pill navigation
│   ├── shared/
│   │   ├── MoodCard.jsx         # Single emoji mood card component
│   │   ├── StreakBadge.jsx      # Streak counter display
│   │   ├── GreetingBanner.jsx   # Time-based greeting with username
│   │   ├── ConfirmToast.jsx     # Mood saved confirmation popup
│   │   └── ImagePlaceholder.jsx # Reusable HD image placeholder
│   └── modals/
│       ├── MoodDetailModal.jsx  # Secondary emotion picker (bottom sheet)
│       ├── IntensitySlider.jsx  # 1–5 intensity under mood
│       ├── TagSelector.jsx      # Trigger tag chips
│       ├── MoodNote.jsx         # Optional micro-journal input
│       ├── SleepPrompt.jsx      # Daily sleep quality popup
│       ├── StudyCheckIn.jsx     # Study session mood check-in
│       └── SOSConfirm.jsx       # SOS send confirmation dialog
├── pages/
│   ├── SplashScreen.jsx
│   ├── auth/
│   │   ├── SignupStep1.jsx      # Email + trusted contact
│   │   ├── SignupStep2.jsx      # Password + confirm
│   │   ├── SignupStep3.jsx      # Name, username, avatar, academic level
│   │   ├── LoginScreen.jsx
│   │   └── ForgotPassword.jsx
│   ├── onboarding/
│   │   └── OnboardingSlides.jsx # 3-slide intro after signup
│   └── app/
│       ├── HomeScreen.jsx
│       ├── HistoryScreen.jsx
│       ├── HealScreen.jsx
│       ├── CalendarScreen.jsx
│       └── ProfileScreen.jsx
└── hooks/
    ├── useGreeting.js           # Returns time-based greeting string
    ├── useMoodHistory.js        # Fetches mood logs from Dexie
    └── useHealJourney.js        # Fetches and monitors grief entries
```

---

## DATABASE SCHEMA — Dexie.js

Define in `src/db/db.js`. This is the single source of truth for all persisted data.

```js
import Dexie from 'dexie';

export const db = new Dexie('MoodMapDB');

db.version(1).stores({
  // User profile — only one record ever exists (id: 1)
  user: '++id, email, username, fullName, avatarEmoji, academicLevel, passwordHash, securityQuestion, securityAnswer, trustedContacts, createdAt',

  // Every mood log entry
  moods: '++id, primaryEmoji, primaryLabel, secondaryEmoji, secondaryLabel, intensity, note, tags, date, timestamp',

  // Grief / heal entries
  grief: '++id, category, description, startDate, status, unsentLetter, voiceNoteRef',

  // Daily sleep logs
  sleep: '++id, date, quality, note',

  // User-earned badges
  badges: '++id, badgeId, unlockedAt',
});
```

Field notes:
- `date` is always a `'YYYY-MM-DD'` string for easy calendar grouping
- `timestamp` is always `Date.now()` integer
- `trustedContacts` is a JSON stringified array of `{ name, email, phone, role }`
- `passwordHash` — hash the password client-side using the Web Crypto API SHA-256. Never store plain text.
- `status` on grief entries: `'active'` | `'archived'` | `'released'`

---

## ZUSTAND STORE

Define in `src/store/moodStore.js`:

```js
// State shape:
{
  currentUser: null,              // Loaded from Dexie on app init
  isAuthenticated: false,
  selectedMood: null,             // { emoji, label, color }
  selectedSecondaryMood: null,
  moodIntensity: 3,
  selectedTags: [],
  moodNote: '',
  todayMoods: [],                 // Array of today's mood logs
  streak: 0,
  activeGriefEntries: [],
  // Actions: setCurrentUser, setAuthenticated, setSelectedMood,
  //          setMoodIntensity, toggleTag, setMoodNote,
  //          saveMood, loadTodayMoods, loadStreak
}
```

---

## MOOD DATA — `src/data/moodData.js`

```js
export const PRIMARY_MOODS = [
  { id: 'happy',   emoji: '😄', label: 'Happy',   color: '#FFE0A3', textColor: '#8A6A20' },
  { id: 'calm',    emoji: '😌', label: 'Calm',    color: '#BDDFF7', textColor: '#2C6E8A' },
  { id: 'neutral', emoji: '😐', label: 'Neutral', color: '#D9E0E8', textColor: '#4A5568' },
  { id: 'stressed',emoji: '😟', label: 'Stressed',color: '#D4CBE5', textColor: '#5A4A7A' },
  { id: 'low',     emoji: '😔', label: 'Low',     color: '#B8C9D9', textColor: '#3A5068' },
];

export const SECONDARY_MOODS = {
  happy:   [
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
```

---

## PAGE-BY-PAGE SPECIFICATIONS

### PAGE 1 — SplashScreen.jsx

**Route:** `/` (shown only on first load, redirects after 3 seconds)

**Layout:**
- Full screen, background color `var(--color-bg)`
- Vertically and horizontally centered content
- Top section: `ImagePlaceholder` component, 120×120px, circular, for the MoodMap logo
- Below logo: App name "MoodMap" in `text-3xl font-bold` color `var(--color-text-primary)`
- Below name: A single gratitude message randomly selected from `gratitudeMessages.js`, displayed in `text-base font-normal italic` color `var(--color-text-sub)`, max-width `280px`, centered, line-height loose
- Below message: A subtle animated loading indicator — three dots pulsing sequentially using Framer Motion, color `var(--color-blue-mid)`
- Bottom: Version number `v1.0.0` in `text-xs` color `var(--color-text-muted)`

**Animation:**
- Entire page fades in over 600ms on mount
- Logo scales from `0.8` to `1.0` over 500ms with ease-out
- Gratitude message fades in with 300ms delay after logo
- After 3000ms total: fade entire page out, navigate to `/login`

**Logic:**
- On mount, check Dexie `user` table. If no user exists, redirect to `/signup/step1` instead of `/login`

---

### PAGE 2 — SignupStep1.jsx, SignupStep2.jsx, SignupStep3.jsx

**Route:** `/signup/step1`, `/signup/step2`, `/signup/step3`

**Shared Layout for all 3 steps:**
- Full screen, background `var(--color-bg)`
- Top bar: Back arrow (Lucide `ChevronLeft`) left-aligned + step progress indicator centered (three dots: active dot `var(--color-blue-mid)` 10px, inactive `var(--color-divider)` 8px, animated with Framer Motion layout animation)
- Below top bar: `ImagePlaceholder` 80×80px circular for step illustration
- Step title: `text-2xl font-bold` color `var(--color-text-primary)`
- Step subtitle: `text-sm font-normal` color `var(--color-text-sub)`
- Form fields: shadcn `Input` components, styled with `rounded-2xl`, border `var(--color-divider)`, focus border `var(--color-blue-mid)`, height `56px`, font size `text-sm`, padding `px-5`
- Primary button: full width, height `56px`, `rounded-full`, background `var(--color-blue-mid)`, text white `font-semibold`, shadow `var(--shadow-button)`, Framer Motion scale on tap `0.97`

**Step 1 — Email:**
- Title: "Let's get started"
- Subtitle: "Enter your email to create your MoodMap"
- Fields: Email address input, Trusted contact email input (labeled "A friend's email — optional"), Trusted contact name input (optional)
- Helper text below trusted contact: `text-xs` color `var(--color-text-muted)` — "We'll only message them if you choose to reach out during difficult moments."

**Step 2 — Password:**
- Title: "Secure your space"
- Subtitle: "Create a private password for your MoodMap"
- Fields: Password input (with show/hide toggle using Lucide `Eye`/`EyeOff`), Confirm password input
- Below fields: Security question dropdown (shadcn `Select`), Security answer input
- Validation: passwords must match, minimum 6 characters. Show inline error in `text-xs` color `var(--mood-stressed)` if mismatch

**Step 3 — Personal Touch:**
- Title: "Make it yours"
- Subtitle: "Tell us a little about yourself"
- Fields: Full name input, Username input (with `@` prefix inside input), Academic level shadcn `Select` (options: School, Undergraduate, Postgraduate, Working Student, Other)
- Avatar emoji picker: a horizontal scrollable row of 12 avatar emojis (🧑‍🎓 👩‍💻 🧑‍🎨 👨‍🔬 🧑‍🏫 👩‍🎤 🧑‍🚀 👩‍🍳 🧑‍💼 👩‍🌾 🧑‍🎮 🧘), displayed as circular `56px` tappable chips, selected one has border `2px solid var(--color-blue-mid)` and background `var(--color-blue-light)`
- On Continue: save all collected data to Dexie `user` table, hash password with Web Crypto SHA-256, navigate to `/onboarding`

---

### PAGE 3 — OnboardingSlides.jsx

**Route:** `/onboarding`

**Layout:**
- 3 horizontally swipeable slides using Framer Motion drag
- Each slide: full screen, centered content, `ImagePlaceholder` 200×200px, bold title, subtitle, colored accent dot indicator at bottom
- Slide 1: Title "Track your mood daily", Subtitle "Log how you feel in seconds. No judgment, just honesty."
- Slide 2: Title "Understand your patterns", Subtitle "See your emotional journey week by week and discover what affects your mood."
- Slide 3: Title "Heal at your own pace", Subtitle "Your private space to process grief, heartbreak, and tough emotions."
- Last slide has "Let's go →" button that navigates to `/home`
- Swipe gesture support via Framer Motion `drag="x"` with `dragConstraints`
- Dot indicators at bottom: `8px` circles, active `var(--color-blue-mid)`, inactive `var(--color-divider)`

---

### PAGE 4 — LoginScreen.jsx

**Route:** `/login`

**Layout:**
- Full screen background `var(--color-bg)`
- Top: `ImagePlaceholder` 80×80px circular for logo
- Time-based greeting: "Good morning ☀️", "Good afternoon 🌤️", "Good evening 🌙" based on current hour, followed by user's first name loaded from Dexie. Font: `text-2xl font-bold`
- Password input: same style as signup, with show/hide toggle
- "Forgot password?" link: `text-xs` color `var(--color-blue-mid)`, right-aligned
- "Enter App" button: full width, same style as signup primary button
- On successful password match: navigate to `/home`
- On fail: shake animation on the input using Framer Motion `animate` with keyframes `x: [0, -8, 8, -8, 0]`

**ForgotPassword.jsx:**
- Separate page at `/forgot-password`
- Shows the security question stored during signup
- User enters answer → if correct, show new password form
- On success: update hash in Dexie, redirect to `/login`

---

### PAGE 5 — HomeScreen.jsx

**Route:** `/home`

**This is the most important page. Build it with the most care.**

**Full layout top to bottom:**

**Header Row:**
- Left: circular avatar button `48px`, showing user's chosen avatar emoji on background `var(--color-green-light)`, tapping navigates to `/profile`
- Center: user's full name `text-base font-semibold`, below it today's date `text-xs font-normal` color `var(--color-text-sub)` formatted as "Thursday, 21 May"
- Right: hamburger menu icon (Lucide `Menu`) `24px` color `var(--color-text-primary)`, tapping opens a shadcn Sheet from right side with quick links to Settings

**Gratitude Banner:**
- Below header, full width card `rounded-3xl` background `var(--color-blue-light)` with `var(--shadow-card)`
- Left side: gratitude message text `text-sm font-medium italic` color `var(--color-text-primary)`, max 2 lines
- Right side: `ImagePlaceholder` 64×64px for a small ambient illustration
- New message shown every time home screen loads

**Week Strip:**
- Horizontal row of 7 day pills, each `48px` wide, `rounded-full`
- Each pill shows: 3-letter day name `text-xs`, date number `text-sm font-bold`
- Today's pill: background `var(--color-nav-bg)` text white
- Past days with logged mood: show the primary mood emoji `text-base` below the date number, pill background `var(--color-surface)` with border `var(--color-divider)`
- Future days: muted, `var(--color-text-muted)`

**Mood Picker Card:**
- Large card `rounded-3xl` background `var(--color-surface)` with `var(--shadow-card)` padding `p-6`
- Title: "How are you feeling?" `text-lg font-semibold`
- Subtitle: current time `text-xs` color `var(--color-text-sub)`
- 5 emoji mood cards in a horizontal row, each card:
  - `72px` width, `rounded-2xl`
  - Background: that mood's color from `moodData.js`
  - Large emoji `text-3xl` centered
  - Label below `text-xs font-medium`
  - On tap: scale to `0.95` (Framer Motion), selected state adds `border-2` in `var(--color-blue-deep)`, slight elevation
  - On tap: open `MoodDetailModal` bottom sheet

**MoodDetailModal (Bottom Sheet):**
- shadcn Sheet from bottom, `rounded-t-3xl`, drag handle at top
- Section 1: "Tell us more" — 4 secondary emoji chips in a 2×2 grid, same pill style as mood cards but smaller `56px`
- Section 2: Intensity slider 1–5, custom styled range input, track color `var(--color-blue-light)`, thumb `var(--color-blue-mid)` `20px` circle, 5 labeled tick marks: "Barely", "Mild", "Moderate", "Strong", "Intense"
- Section 3: Trigger tags — horizontal scrollable row of pill chips from `TRIGGER_TAGS`, each `rounded-full` `px-4 py-2` background `var(--color-green-light)` text `var(--color-text-primary)`, selected state background `var(--color-blue-mid)` text white
- Section 4: Optional note textarea, `rounded-2xl`, max 120 characters, character count shown `text-xs` bottom right
- Save button: full width `rounded-full` background `var(--color-green-deep)` text white

**Stats Row:**
- Two cards side by side, each `rounded-3xl` with `var(--shadow-card)`
- Left: Streak card — 🔥 icon, streak number `text-3xl font-bold`, "day streak" label `text-xs`
- Right: SOS card — background `var(--color-blue-light)`, 🆘 label `text-sm font-semibold`, subtitle "Reach a friend" `text-xs`
- SOS tap: opens `SOSConfirm` dialog showing the pre-written message and trusted contact name, with Send and Cancel buttons

**Last Mood Entry:**
- Simple single row: "Last logged:" label + primary emoji + label + timestamp
- `text-sm` color `var(--color-text-sub)`

---

### PAGE 6 — HistoryScreen.jsx

**Route:** `/history`

**Layout top to bottom:**

**Header:** Page title "History & Insights" `text-2xl font-bold`

**Today's Timeline:**
- Section header "Today" `text-base font-semibold` with today's date right-aligned `text-xs` color `var(--color-text-sub)`
- List of `MoodEntry` cards, each:
  - `rounded-2xl` background `var(--color-surface)` shadow `var(--shadow-card)` padding `p-4`
  - Left: circular `40px` badge with mood background color + emoji `text-xl`
  - Center: primary label `text-sm font-semibold`, secondary label + intensity `text-xs` color `var(--color-text-sub)`, tags as mini chips `text-xs rounded-full px-2`
  - Right: timestamp `text-xs` color `var(--color-text-muted)`
  - Framer Motion: each entry animates in with fade + slide from right, staggered 60ms

**Weekly Mood Chart:**
- Section header "This Week"
- Recharts `BarChart`, height `180px`
- X-axis: 7 day labels `text-xs`
- Y-axis: hidden
- Bars: colored by dominant mood of that day using mood color variables, `radius={[8,8,0,0]}` for rounded bar tops
- Tooltip: custom shadcn-styled tooltip showing day, dominant mood emoji + label
- No gridlines. Clean background `var(--color-surface)` card `rounded-3xl` padding `p-5`

**Top Triggers:**
- Section header "Your Triggers This Month"
- Horizontal scrollable row of trigger tags with a count badge on each
- Each pill: `rounded-full px-4 py-2` background `var(--color-blue-light)`, tag name + count `text-xs font-semibold`

**Mood Report Card:**
- Section header "Weekly Report"
- Card styled like a school report card: soft border `var(--color-divider)`, rows for each mood showing emoji, label, and percentage bar
- Percentage bar: `rounded-full` background `var(--color-divider)`, fill `var(--color-blue-mid)`, animated width on mount using Framer Motion

---

### PAGE 7 — HealScreen.jsx

**Route:** `/heal`

**Layout top to bottom:**

**Header:** Page title "💚 Heal" `text-2xl font-bold`, subtitle "Your private healing space" `text-sm` color `var(--color-text-sub)`

**Healing Status Card:**
- Large card `rounded-3xl` background `var(--color-green-light)` with `var(--shadow-card)` padding `p-6`
- `ImagePlaceholder` full width 200px height for ambient nature illustration
- `{/* IMAGE PLACEHOLDER: Soft watercolor nature scene — gentle greenery, morning light */}`
- Overlay text: "You have been healing for X days 🕊️" `text-lg font-semibold`

**Active Grief Entries:**
- Section header "Active Grief"
- List of grief cards, each `rounded-3xl` background `var(--color-surface)` shadow `var(--shadow-card)` padding `p-5`
- Shows: grief category emoji + label, start date, days since, a subtle linear progress bar showing healing momentum (calculated from mood improvement since grief start date)
- "View Journey" button: small `rounded-full` pill `text-xs` background `var(--color-blue-light)`
- Tapping opens a full-screen bottom sheet showing the `HealingTimeline` — a vertical timeline of mood logs since the grief entry date

**Unsent Letters:**
- Section header "Unsent Letters"
- List of letter cards: `rounded-2xl` background `var(--color-surface)` border `1px solid var(--color-divider)` padding `p-4`
- Shows: 📝 icon, "Letter #N", date written, first 40 characters preview `text-xs italic` color `var(--color-text-sub)`
- Tapping opens full-screen editor (shadcn Textarea, full page, minimal, no distractions, back button only)

**Closure Prompt:**
- Only shown when mood trend detection triggers it (user has logged 😄/😌/🥰 for 5+ consecutive days while having active grief)
- Large prominent card `rounded-3xl` background `var(--color-blue-light)` border `2px solid var(--color-blue-mid)` padding `p-6`
- Text: "You seem to be in a better place now ✨" title, old grief entry preview below
- Three buttons stacked: "🕊️ Forgive & Release" (background `var(--color-green-mid)`), "📦 Keep & Move On" (background `var(--color-blue-light)`), "🔒 Not Ready Yet" (background `var(--color-surface)` border)

**Add New Entry:**
- Full width dashed border button `rounded-3xl` `text-sm font-medium` color `var(--color-blue-mid)` — "+ Add a grief entry"
- Tapping opens a bottom sheet with: grief category selector (emoji grid of `Heartbreak 💔`, `Friendship 🫂`, `Family 🏠`, `Academic 📚`, `Loneliness 🌫️`, `Self-doubt 🪞`), description textarea, optional unsent letter toggle

---

### PAGE 8 — CalendarScreen.jsx

**Route:** `/calendar`

**Layout top to bottom:**

**Header:** Page title "📅 Mood Calendar" `text-2xl font-bold`

**Month Navigation:**
- Row with left/right chevron arrows and month + year label centered `text-lg font-semibold`
- Smooth Framer Motion slide transition when switching months (slide left/right)

**Calendar Grid:**
- 7-column grid (Mo–Su headers `text-xs font-medium` color `var(--color-text-sub)`)
- Each `CalendarCell`: `rounded-2xl` aspect-square
  - Has mood data: background is that day's primary mood color, shows emoji `text-lg` centered
  - No mood data (past): background `var(--color-surface)` border `1px solid var(--color-divider)`, date number `text-xs` color `var(--color-text-muted)`
  - No mood data (future): background transparent, date number `text-xs` color `var(--color-text-muted)` opacity 40%
  - Today: border `2px solid var(--color-blue-mid)`
  - Tapping a past cell: opens a small popover (shadcn `Popover`) showing all moods logged that day

**Monthly Summary:**
- Section header "This Month"
- Row list of each logged mood with emoji, label, and count: `rounded-2xl` background `var(--color-surface)` padding `p-4` with a mini horizontal bar

**Mood Color Mosaic:**
- Section header "Your Emotional Mosaic"
- A grid of small `16px` square tiles `rounded-sm`, one per day of the year so far, colored by that day's dominant mood color
- Missing days: `var(--color-divider)`
- Tooltip on hover/tap: date + mood
- This becomes a beautiful personal artifact over time

---

### PAGE 9 — ProfileScreen.jsx

**Route:** `/profile`

**Layout top to bottom:**

**Profile Hero:**
- `ImagePlaceholder` full width `180px` height for background texture
- `{/* IMAGE PLACEHOLDER: Soft gradient mesh background — cool blue to mint green */}`
- Overlaid: circular `88px` avatar with user's emoji on `var(--color-green-light)` background, border `4px solid white`
- Below: Full name `text-xl font-bold`, username `@handle text-sm` color `var(--color-text-sub)`, academic level pill chip

**Stats Row:**
- Three cards in a row: Total logs count, Current streak 🔥, Moods this month
- Each: `rounded-2xl` `p-4` background `var(--color-surface)` shadow `var(--shadow-card)`, number `text-2xl font-bold`, label `text-xs`

**Mood Personality:**
- Card `rounded-3xl` background gradient from `var(--color-blue-light)` to `var(--color-green-light)` padding `p-5`
- Only shown after 30+ mood logs. Before that: "Keep logging to unlock your mood personality" with lock icon
- Shows personality type name `text-lg font-bold` and one-line description

**Badges:**
- Section header "Your Badges"
- Horizontal scrollable row of badge chips `56px` each, `rounded-2xl`
- Unlocked: full color with emoji + label below
- Locked: grayscale opacity 40%, lock emoji overlay

**Milestone Badges List:**
- 🌱 First mood logged
- 🔥 7-day streak
- 💪 30-day streak
- 📖 First journal entry
- 💚 Entered the Heal section
- 🕊️ First closure
- 🌈 Logged all 5 moods in one week
- 🧘 7 consecutive calm days

**Settings Section:**
- Section header "Settings" `text-base font-semibold`
- List rows each `rounded-2xl` background `var(--color-surface)` shadow `var(--shadow-card)` padding `p-4` with Lucide icon left, label, chevron right:
  - 🔔 Daily Reminder → time picker (shadcn `Popover` with time input)
  - 👥 Trusted Contacts → edit contact name, email, phone, role
  - 🔒 Privacy Lock → toggle switch for PIN lock
  - 📤 Export Mood Data → downloads a plain text summary
  - 🗑️ Reset All Data → shadcn `AlertDialog` with confirmation, shows "mood eulogy" summary card before final confirm

---

## GLOBAL COMPONENTS

### AppLayout.jsx
- Wraps all `/home`, `/history`, `/heal`, `/calendar`, `/profile` routes
- Renders children + `BottomNav` fixed at bottom
- Adds `pb-24` padding to children so content is never hidden behind nav

### BottomNav.jsx
- Fixed position, bottom `16px`, horizontally centered
- Width `280px`, height `64px`, `rounded-full`
- Background `var(--color-nav-bg)` shadow `var(--shadow-nav)`
- 4 icon buttons equally spaced with `px-6`
- Icons (Lucide): `Home`, `BarChart2`, `Heart`, `Calendar`
- Active tab: icon color `var(--color-nav-active)`, small `4px` dot indicator below icon
- Inactive: icon color `rgba(255,255,255,0.5)`
- Framer Motion: active indicator dot slides between tabs with `layoutId="navIndicator"`

### GreetingBanner.jsx
- Returns: "Good morning ☀️" (5am–12pm), "Good afternoon 🌤️" (12pm–5pm), "Good evening 🌙" (5pm–9pm), "Still up? 🌃" (9pm–5am)
- Appends ", {firstName}" from Zustand store

### ImagePlaceholder.jsx
- Props: `width`, `height`, `shape` (`'rect'` | `'circle'`), `description`
- Renders a `div` with exact dimensions, background `var(--color-green-light)`, centered 🖼️ emoji `text-2xl`, `text-xs` description below in `var(--color-text-muted)`
- `shape='circle'`: `rounded-full`
- `shape='rect'`: `rounded-2xl`
- This is a placeholder. Real HD WebP images will replace these later.

---

## ANIMATIONS — FRAMER MOTION SPECIFICATIONS

```js
// Page transition — wrap every page in this
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.2 } }
};

// Staggered list reveal
const containerVariants = {
  animate: { transition: { staggerChildren: 0.06 } }
};
const itemVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } }
};

// Tap feedback for all interactive elements
whileTap={{ scale: 0.97 }}
transition={{ duration: 0.15 }}

// Login shake on wrong password
animate={wrongPassword ? { x: [0, -8, 8, -8, 8, 0] } : {}}
transition={{ duration: 0.4 }}
```

Wrap the entire router in `AnimatePresence mode="wait"` for page transitions.

---

## ROUTING

Use `react-router-dom v6`. Route structure:

```
/                    → SplashScreen
/signup/step1        → SignupStep1
/signup/step2        → SignupStep2
/signup/step3        → SignupStep3
/onboarding          → OnboardingSlides
/login               → LoginScreen
/forgot-password     → ForgotPassword
/home                → HomeScreen (protected)
/history             → HistoryScreen (protected)
/heal                → HealScreen (protected)
/calendar            → CalendarScreen (protected)
/profile             → ProfileScreen (protected)
```

Protected routes: create a `ProtectedRoute` wrapper component that checks Zustand `isAuthenticated`. If false, redirect to `/login`.

---

## GRATITUDE MESSAGES — `src/data/gratitudeMessages.js`

Write exactly 40 original messages. Tone: soft, human, non-toxic-positivity, written for stressed students. Examples of the correct tone:
- "You showed up for yourself today. That matters more than you know."
- "Whatever you are feeling right now, it is valid. All of it."
- "Small steps still move you forward. You are not falling behind."
- "You don't have to have it all figured out. Nobody does."
- "Rest is not giving up. Rest is how you keep going."

Avoid: generic motivational poster language, hustle culture language, anything that implies the user should be doing more.

---

## THINGS TO NEVER DO

- Never use `#FF0000`, `#FF4500`, `#FF69B4`, `#800080`, `#000000` or any warm red/orange anywhere
- Never use `font-family: Inter, Roboto, Arial` or any system font
- Never add glassmorphism (`backdrop-filter: blur`) on any component
- Never use `perspective`, `rotateX`, `rotateY` CSS transforms
- Never use external image URLs — all images are placeholders
- Never add social login buttons (Google, Apple, Facebook)
- Never add any network requests, API calls, or external data fetching
- Never use `localStorage` — all persistence is exclusively through Dexie.js IndexedDB
- Never make the layout wider than `390px` on the main content column
- Never use a bottom navigation with more than 4 tabs
- Never place navigation at the top — bottom nav only
- Never use harsh box shadows with dark opacity above `0.15`
- Never skip the `/* IMAGE PLACEHOLDER: */` comment on placeholder divs

---

## FINAL INSTRUCTION

Build the entire application in one complete pass. Start with:
1. `package.json` and Vite config
2. `tailwind.config.js` with color tokens mapped from CSS variables
3. `index.css` with all CSS custom properties defined
4. `src/db/db.js`
5. `src/store/moodStore.js`
6. All data files
7. All shared components
8. All pages in order
9. `App.jsx` with full router setup

Every component must be fully functional and wired — no placeholder logic, no `// TODO` comments, no empty functions. The app must run completely with `npm run dev` from first boot with zero errors.
```

---

That is the complete prompt. Paste it directly into OpenCode as your first message and it will have everything it needs to build MoodMap from scratch in a single pass.
