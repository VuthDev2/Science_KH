# ScienceKH Frontend Client 🎨

This folder contains the **React 19 + TanStack Router** frontend application for **ScienceKH (វិទ្យាសាស្ត្រ)**.

---

## 🛠️ Tech Stack
* **Framework**: React 19 + TypeScript
* **Routing**: TanStack Router (file-based routing in `src/routes/`)
* **State & Query**: TanStack Query
* **Styling**: Tailwind CSS v4 + Radix UI + Lucide Icons
* **Dev Server**: Vite (running on `http://localhost:8080`)

---

## 📁 Directory Structure

```text
src/
├── components/          # Reusable UI components
│   ├── auth/            # Authentication forms (login, signup, OTP forgot-password)
│   ├── landing/         # Landing page showcases & games
│   └── ui/              # Radix UI primitives (buttons, dialogs, inputs)
├── routes/              # TanStack file-based routes
│   ├── _authenticated/  # Protected student routes (home, lessons, quiz, exams, tutor)
│   ├── auth.tsx         # Auth gateway (login, signup, password reset)
│   └── index.tsx        # Public landing page
├── lib/                 # Utilities, AuthContext, Supabase hooks, and audio/confetti
├── integrations/        # Supabase client (`integrations/supabase/client.ts`)
└── styles.css           # Global Tailwind CSS directives & custom theme
```

---

## 🚀 How to Run

From the project root:
```bash
npm run dev:frontend
```
The frontend will start at **`http://localhost:8080`**.

