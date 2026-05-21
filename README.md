<div align="center">

# 🌿 MoodMap

### Your Daily Emotional Companion

A beautifully designed, fully private mood tracking web app built for students who carry too much on their shoulders. Track your emotions, understand your patterns, and heal at your own pace — all without a single byte of your data ever leaving your device.

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-A8CBA8?style=flat-square)](LICENSE)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel)](https://vercel.com)

[Live Demo](#) · [Report a Bug](https://github.com/Web-Designer-Rohan/MoodMap/issues) · [Request a Feature](https://github.com/Web-Designer-Rohan/MoodMap/issues)

</div>

---

## 📖 Table of Contents

- [About The Project](#-about-the-project)
- [Key Features](#-key-features)
- [Design Philosophy](#-design-philosophy)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Database Schema](#-database-schema)
- [Color System](#-color-system)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Deployment](#-deployment)
- [Privacy Model](#-privacy-model)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌱 About The Project

MoodMap was built from a simple observation: students are overwhelmed, emotionally exhausted, and have very few private, judgment-free spaces to process what they are feeling. Most mood apps are either too clinical, too social, or require you to hand over your most personal data to a server somewhere.

MoodMap is different. It is:

- **Completely private** — your data never leaves your device, ever
- **Beautifully designed** — an iPhone-native aesthetic built to calm, not stimulate
- **Emotionally intelligent** — a vocabulary of 28+ emotions because five emojis are not enough
- **Built to heal** — not just to track, but to guide you through grief, heartbreak, and recovery

---

## ✨ Key Features

### Core Mood Tracking
- **5 primary moods** with **28 secondary emotions** — from 😌 Calm and 🫠 Drained to 🌀 Spiraling and 😮‍💨 Relieved
- **Mood intensity slider** (1–5 scale) — because how strongly you feel matters
- **Micro-journal** — optional 1–2 line note attached to each mood log
- **Trigger tagging** — tag what caused your mood (`exam`, `sleep-deprived`, `social`, `exercise`, and more)
- **Study session check-in** — log mood before and after study blocks to track mental fatigue

### Insights & Analytics
- **Today's mood timeline** — a chronological log of everything you felt today
- **Weekly mood chart** — visualize your emotional week at a glance
- **Top triggers report** — discover your personal stress patterns from real data
- **Weekly mood report card** — styled like a school report, designed for students
- **Best time of day insight** — "You are usually calm between 8–10am"

### Heal — The Grief Journal
- **Private grief entries** — log heartbreak, friendship loss, academic failure, loneliness, and self-doubt
- **Unsent letters** — write everything you wanted to say. It never gets sent. It exists for you.
- **Healing timeline** — a visual journey showing your emotional recovery since the grief started
- **Closure prompt system** — the app detects when you are in a better place and gently surfaces old grief
- **Three closure paths** — Forgive & Release 🕊️, Keep & Move On 📦, or Not Ready Yet 🔒
- **Mood before vs after** — data-driven proof of your own healing

### Calendar & History
- **Monthly mood calendar** — every day colored by your dominant emotion
- **Mood color mosaic** — a growing tile grid of every day you have logged, colored by mood. A personal emotional artifact that becomes more beautiful over time.
- **Streak tracker** — consecutive days of logging

### Profile & Gamification
- **Mood personality type** — unlocked after 30 days: `The Quiet Resilient`, `The Overthinker`, `The Emotional Processor`, `The Steady One`
- **Milestone badges** — 🌱 First log, 🔥 7-day streak, 💚 Entered Heal, 🕊️ First closure, and more
- **Monthly mood color** — each month assigned a color from your emotional data

### Safety & Support
- **Trusted contact system** — add up to 3 friends, family, or mentors during signup
- **SOS button** — one tap sends a pre-written personal message to your trusted contacts
- **Daily gratitude message** — a rotating library of 40 original messages written for stressed students, shown every time you open the app

### Privacy & Security
- **Local-first architecture** — 100% IndexedDB, zero server
- **SHA-256 password hashing** — via Web Crypto API, no plain text stored ever
- **Security question recovery** — forgot password flow without needing email
- **Privacy lock** — optional PIN lock before entering the app
- **Data reset with mood eulogy** — before wiping, the app shows a beautiful summary of your entire emotional journey

---

## 🎨 Design Philosophy

MoodMap follows a strict design language called **Soft Minimalism meets iPhone-Native**.

Every design decision answers one question: *Does this make a stressed student feel safer?*

### The Rules
- **Zero sharp edges** — `border-radius: 24px` on cards, `border-radius: 999px` on all interactive elements
- **Whitespace is sacred** — generous padding, breathing room, nothing cramped
- **No glassmorphism** — frosted glass creates visual noise that undermines calm
- **Shadows are whispers** — `box-shadow: 0 4px 24px rgba(125, 200, 227, 0.10)` only
- **Animations are gentle** — fade + slide up transitions, 300ms, nothing bouncy or elastic
- **Mobile-first** — 390px max content width, designed for a phone screen
- **Bottom navigation only** — floating dark pill, 4 tabs, never a hamburger menu

### Typography
**Plus Jakarta Sans** — chosen for its soft rounded letterforms that carry the same warmth as Apple's SF Pro without licensing restrictions.

| Role | Weight | Size |
|---|---|---|
| Page titles | 700 Bold | 24px |
| Section headers | 600 Semibold | 18px |
| Body text | 400 Regular | 14px |
| Labels & timestamps | 500 Medium | 12px |

---

## 🛠 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Framework | React 18 + Vite | Fast, lightweight SPA |
| Styling | Tailwind CSS v3 | Utility-first, mobile-first |
| Components | shadcn/ui | iPhone-style UI primitives |
| State | Zustand | Zero-boilerplate global state |
| Database | Dexie.js (IndexedDB) | Local-first persistent storage |
| Animation | Framer Motion | Page transitions and micro-interactions |
| Charts | Recharts | Mood trend visualizations |
| Date Utils | date-fns | Calendar and timestamp handling |
| Icons | Lucide React | Consistent, lightweight icon set |
| Fonts | Plus Jakarta Sans | Via Google Fonts |

---

## 🏗 Architecture

MoodMap is a **local-first single page application**. There is no backend, no server, no API, and no cloud database. The entire data layer lives inside the user's browser via IndexedDB.

```
┌─────────────────────────────────────────┐
│              React + Vite               │
│                                         │
│  ┌──────────┐    ┌───────────────────┐  │
│  │  Zustand │    │   React Router v6 │  │
│  │  Store   │    │   (8 routes)      │  │
│  └────┬─────┘    └────────┬──────────┘  │
│       │                   │             │
│  ┌────▼───────────────────▼──────────┐  │
│  │           Components              │  │
│  │  Pages · Shared · Modals · Layout │  │
│  └────────────────┬──────────────────┘  │
│                   │                     │
│  ┌────────────────▼──────────────────┐  │
│  │         Dexie.js (IndexedDB)      │  │
│  │  users · moods · grief · sleep    │  │
│  │  badges                           │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
         ↕ No network requests ever
```

### Data Flow
```
User interaction
      ↓
Zustand (in-memory live state)
      ↓
Dexie.js write to IndexedDB
      ↓
Component re-renders from Zustand
      ↓
Dexie.js reads for history/calendar
```

---

## 🗄 Database Schema

Defined via Dexie.js in `src/db/db.js`.

```js
// User profile — single record, id always 1
user: '++id, email, username, fullName, avatarEmoji,
       academicLevel, passwordHash, securityQuestion,
       securityAnswer, trustedContacts, createdAt'

// Every mood log
moods: '++id, primaryEmoji, primaryLabel, secondaryEmoji,
        secondaryLabel, intensity, note, tags, date, timestamp'

// Grief and healing entries
grief: '++id, category, description, startDate,
        status, unsentLetter, voiceNoteRef'

// Daily sleep quality logs
sleep: '++id, date, quality, note'

// Earned badges
badges: '++id, badgeId, unlockedAt'
```

**Key conventions:**
- `date` is always `'YYYY-MM-DD'` string for calendar grouping
- `timestamp` is always `Date.now()` integer for precise timeline ordering
- `passwordHash` is SHA-256 via Web Crypto API — plain text passwords are never stored
- `trustedContacts` is a JSON stringified array of `{ name, email, phone, role }`
- `grief.status` is one of `'active'` | `'archived'` | `'released'`

---

## 🎨 Color System

All colors are defined as CSS custom properties in `src/index.css` and consumed globally.

```css
:root {
  --color-bg:           #F7F9FB;   /* App canvas */
  --color-surface:      #FFFFFF;   /* Card surfaces */
  --color-blue-light:   #BDDFF7;   /* Backgrounds, tags */
  --color-blue-mid:     #7EC8E3;   /* Primary actions */
  --color-blue-deep:    #4A9DBF;   /* Pressed states */
  --color-green-light:  #C8E6C4;   /* Chips, placeholders */
  --color-green-mid:    #A8CBA8;   /* Success, streak */
  --color-green-deep:   #4A8C6F;   /* Secondary actions */
  --color-text-primary: #2C3E50;   /* Headings, body */
  --color-text-sub:     #7F8C9A;   /* Labels, timestamps */
  --color-nav-bg:       #1B3A2D;   /* Bottom nav pill */

  /* Mood accent colors */
  --mood-happy:         #FFE0A3;
  --mood-calm:          #BDDFF7;
  --mood-neutral:       #D9E0E8;
  --mood-stressed:      #D4CBE5;
  --mood-low:           #B8C9D9;
}
```

**Color ratio:** White/soft backgrounds 60% · Blues 30% · Greens 10%

**Forbidden colors:** Red, orange, hot pink, deep purple, pure black — all cortisol or arousal triggers avoided by design.

---

## 📁 Project Structure

```
MoodMap/
├── public/
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── db/
│   │   └── db.js                    # Dexie.js schema
│   ├── store/
│   │   └── moodStore.js             # Zustand global state
│   ├── data/
│   │   ├── gratitudeMessages.js     # 40 original gratitude messages
│   │   ├── moodData.js              # Emoji definitions and colors
│   │   └── badgeData.js             # Badge definitions
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppLayout.jsx
│   │   │   └── BottomNav.jsx
│   │   ├── shared/
│   │   │   ├── MoodCard.jsx
│   │   │   ├── StreakBadge.jsx
│   │   │   ├── GreetingBanner.jsx
│   │   │   ├── ConfirmToast.jsx
│   │   │   └── ImagePlaceholder.jsx
│   │   └── modals/
│   │       ├── MoodDetailModal.jsx
│   │       ├── IntensitySlider.jsx
│   │       ├── TagSelector.jsx
│   │       ├── MoodNote.jsx
│   │       ├── SleepPrompt.jsx
│   │       ├── StudyCheckIn.jsx
│   │       └── SOSConfirm.jsx
│   ├── pages/
│   │   ├── SplashScreen.jsx
│   │   ├── auth/
│   │   │   ├── SignupStep1.jsx
│   │   │   ├── SignupStep2.jsx
│   │   │   ├── SignupStep3.jsx
│   │   │   ├── LoginScreen.jsx
│   │   │   └── ForgotPassword.jsx
│   │   ├── onboarding/
│   │   │   └── OnboardingSlides.jsx
│   │   └── app/
│   │       ├── HomeScreen.jsx
│   │       ├── HistoryScreen.jsx
│   │       ├── HealScreen.jsx
│   │       ├── CalendarScreen.jsx
│   │       └── ProfileScreen.jsx
│   └── hooks/
│       ├── useGreeting.js
│       ├── useMoodHistory.js
│       └── useHealJourney.js
├── .gitignore
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- npm `v9+`

### Installation

```bash
# Clone the repository
git clone https://github.com/Web-Designer-Rohan/MoodMap.git

# Navigate into the project
cd MoodMap

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### First Time Setup

On first launch, MoodMap will:
1. Show the **Splash Screen** with a gratitude message
2. Detect no existing user and redirect to **Signup**
3. Walk you through the **3-step signup flow**
4. Show the **3-slide onboarding**
5. Land you on the **Home Screen**

From the second launch onwards, you go directly to the Login screen.

---

## 📜 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint the codebase
npm run lint
```

---

## 🌐 Deployment

### Vercel (Recommended)

MoodMap is optimized for Vercel deployment. Since it is a fully static app with no backend, deployment is zero-configuration.

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Confirm settings:
   - **Framework:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**

Your app will be live at `your-project.vercel.app` in under 60 seconds.

### Local Network Testing

To expose your local dev server for mobile testing:

```bash
# Start Vite on all network interfaces
npm run dev

# In a second terminal, create a public tunnel
cloudflared tunnel --url http://localhost:5173
```

---

## 🔒 Privacy Model

MoodMap is built on a **zero-knowledge, local-first architecture**. This is not a marketing claim — it is a technical guarantee.

| What happens to your data | Answer |
|---|---|
| Is it sent to a server? | Never |
| Is it stored in the cloud? | Never |
| Can the developer see it? | Impossible |
| What happens if you clear browser data? | All data is deleted |
| Is your password stored in plain text? | Never — SHA-256 hashed via Web Crypto API |
| Does the app make any network requests? | No — except loading fonts from Google Fonts |

**Important:** Because data is local, it does not sync across devices. If you switch browsers or devices, you start fresh. This is the intentional tradeoff for complete privacy.

---

## 🗺 Roadmap

### Version 1.0 — Current
- [x] Local authentication system
- [x] 5 primary + 28 secondary emotions
- [x] Mood logging with intensity, tags, and notes
- [x] Today's history timeline
- [x] Weekly mood chart
- [x] Monthly mood calendar
- [x] Heal grief journal
- [x] Unsent letters
- [x] Closure prompt system
- [x] Trusted contacts + SOS
- [x] Streak tracker
- [x] Milestone badges
- [x] Mood color mosaic

### Version 1.1 — Planned
- [ ] HD image assets replacing all placeholders
- [ ] Frame-sequence animations (Apple-style scroll cinematics)
- [ ] Voice note support for unsent letters
- [ ] Sleep quality correlation insights
- [ ] Mood export as PDF report

### Version 2.0 — Future
- [ ] Optional Supabase sync for cross-device support
- [ ] Anonymous community mood pulse
- [ ] Mood personality type system (after 30 days)
- [ ] Weekly mood report card
- [ ] Seasonal calendar themes

---

## 🤝 Contributing

Contributions are welcome. Please open an issue first to discuss what you would like to change.

```bash
# Fork the repository
# Create your feature branch
git checkout -b feature/your-feature-name

# Commit your changes
git commit -m "feat: add your feature"

# Push to your branch
git push origin feature/your-feature-name

# Open a Pull Request
```

Please follow the existing code style and component structure. All new components go in the appropriate subdirectory under `src/components/` or `src/pages/`.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">

Built with 🌿 by [Rohan Biswas](https://github.com/Web-Designer-Rohan)

*For every student who needed a safe space and couldn't find one.*

</div>
