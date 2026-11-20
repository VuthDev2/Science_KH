# ScienceKH Node.js + Express Backend API 🚀

Dedicated TypeScript REST API for **ScienceKH (វិទ្យាសាស្ត្រ)**, supporting Grades 7–12 STEM education in Cambodia.

---

## 🛠️ Tech Stack
* **Runtime**: Node.js v24 + TypeScript (ESM)
* **Framework**: Express 4.21+ / Express 5
* **Dev Server**: `tsx watch` (instant TypeScript HMR without bundler lag)
* **Timezone**: `Asia/Phnom_Penh` (UTC+7) for daily midnight streak resets and weekly Sunday 23:59 Diamond League snapshots.

---

## 🚀 Quick Start

Run from the root of the project:
```bash
# Start backend in watch mode (runs on port 5001)
npm run dev:backend
# (or: npm run dev:server)

# Build TypeScript to dist/
npm run server:build

# Run production build
npm run server:start
```

---

## 📡 API Endpoints

### 1. Health & Server Info
* `GET /api/health`: Returns server status, uptime, and current Cambodia ICT time.

### 2. MoEYS STEM Curriculum (Grades 7–12)
* `GET /api/curriculum/grades`: List of all 6 grades (Junior High 7–9 Brevet & Senior High 10–12 BacII) and 4 STEM subjects.
* `GET /api/curriculum/grade/:gradeId`: Details for a specific grade.
* `GET /api/curriculum/lessons/:grade/:subject`: Units, micro-lessons, and exercises.

### 3. Gamification & Streak Engine
* `GET /api/quiz/gamification-status`: Live hearts, streak status, XP, coins, and passive heart recovery timer.
* `POST /api/quiz/submit`: Submits answers, validates accuracy, calculates Cambodia (UTC+7) streak, awards XP, and deducts hearts on failure.

### 4. National Exam Past Papers
* `GET /api/exams/papers`: Filter MoEYS past papers by `examType` (`brevet_grade_9` or `bacii_grade_12`), `subject`, and `year` (2018–2025).
* `GET /api/exams/paper/:paperId`: Detailed exam paper with verified step-by-step MoEYS solutions.

### 5. Diamond League Leaderboard
* `GET /api/leaderboard/current`: Current Diamond League weekly standings, Top 5 promotion zone, and Sunday 23:59 ICT countdown timer.

### 6. Bilingual STEM Vocabulary
* `GET /api/vocab/decks`: Bilingual STEM flashcard decks with Khmer terms, phonetic guides, and definitions.

### 7. Socratic AI Tutor ("លោកគ្រូ សុខា")
* `POST /api/tutor/chat`: Server-Sent Events (SSE) streaming endpoint guiding students Socratically.

### 8. Bakong KHQR Payments
* `POST /api/payments/generate-khqr`: Generates NBC-compliant dynamic Bakong KHQR for ABA / Bakong scan-to-pay.
* `POST /api/payments/webhook`: Webhook listener to verify transactions and activate premium perks.

