# ScienceKH (វិទ្យាសាស្ត្រ) 🇰🇭

> An interactive, bilingual STEM learning platform and AI-powered tutor designed for Cambodian Grade 7–12 students.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React 19](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TanStack Start](https://img.shields.io/badge/TanStack_Start-FF4154?style=flat-square&logo=tanstack&logoColor=white)](https://tanstack.com/start)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 📌 Overview

**ScienceKH** bridges the educational gap in STEM for secondary and high school students across Cambodia. By delivering curriculum-aligned content in both **Khmer (ភាសាខ្មែរ)** and **English**, students can master complex concepts in Physics, Chemistry, Biology, and Earth Science with interactive quizzes and an on-demand AI Science Tutor.

---

## ✨ Key Features

- 🌐 **Bilingual Support (Khmer & English)**: Easily toggle between Khmer and English to help students understand terminology in both languages.
- 📚 **Interactive Lessons**: Structured modules categorized by grades (Grade 7 through Grade 12) and scientific disciplines.
- 🤖 **AI Science Tutor**: An integrated intelligent tutor that answers student queries, breaks down difficult problems, and provides step-by-step guidance.
- 📝 **Quizzes & Knowledge Checks**: Test comprehension with interactive quizzes and immediate feedback.
- 📊 **Progress & Performance Tracking**: Real-time tracking of completed lessons, quiz scores, and learning streaks.
- 🔒 **Secure Authentication & Data Protection**: Powered by Supabase Auth with Row-Level Security (RLS) policies.
- 📱 **Mobile-First & Responsive Design**: Crafted for optimal experience on mobile devices, tablets, and desktops.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Framework & Routing**: [TanStack Start](https://tanstack.com/start) & [TanStack Router](https://tanstack.com/router)
- **Data Fetching & State**: [TanStack Query](https://tanstack.com/query)
- **Styling & UI**: [Tailwind CSS v4](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/)
- **Backend & Database**: [Supabase](https://supabase.com/) (PostgreSQL, Auth, Edge Functions)
- **Build Tool**: [Vite](https://vitejs.dev/)

---

## 📁 Project Structure

```text
ScienceKH/
├── src/
│   ├── components/         # Reusable UI components (buttons, dialogs, navs)
│   ├── hooks/              # Custom React hooks
│   ├── integrations/       # Backend & database clients (Supabase)
│   ├── lib/                # Utilities, i18n, auth context, AI functions
│   ├── routes/             # TanStack file-based routes
│   │   ├── _authenticated/ # Protected routes (dashboard, lessons, tutor, profile)
│   │   ├── auth.tsx        # Authentication page
│   │   └── index.tsx       # Landing page
│   ├── router.tsx          # Router configuration
│   ├── server.ts           # Server-side rendering handler
│   └── styles.css          # Global styling & Tailwind directives
├── supabase/
│   ├── migrations/         # PostgreSQL schema & RLS migrations
│   └── config.toml         # Supabase configuration
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later) or [Bun](https://bun.sh/)
- A [Supabase](https://supabase.com/) project

### 1. Clone the repository

```bash
git clone https://github.com/VuthDev2/Science_KH.git
cd Science_KH
```

### 2. Install dependencies

```bash
npm install
# or
bun install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
OPENAI_API_KEY=your-openai-api-key # Optional: For AI Tutor
```

### 4. Run the development server

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

### 5. Build for production

```bash
npm run build
```

---

## 👨‍💻 Author

**Saravuth (VuthDev2)**
- GitHub: [@VuthDev2](https://github.com/VuthDev2)
