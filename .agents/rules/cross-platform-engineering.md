# ScienceKH — Cross-Platform UI Architecture & Engineering Rules
> Synthesizing Cross-Platform Responsive Adaptation with Foundational Software Engineering Principles (Clean Code, Refactoring, The Pragmatic Programmer, A Philosophy of Software Design).

---

## 1. 🎨 Shared Design Token System

Never hardcode arbitrary magic values in platform views. All styling derives from shared design tokens:

### A. Colors & Semantic Theme (Light / Dark)
- **Primary Brand / STEM Emerald**: `#059669` (Dark: `#34D399`) — Core learning actions, correct answers, mastery.
- **Streak & Habit Flame**: `#EA580C` (Dark: `#FB923C`) — Urgency, daily commitment, streak preservation.
- **Gamification & XP Amber**: `#D97706` (Dark: `#FBBF24`) — Rewards, level ups, chest unlocks.
- **Critical / Hearts Crimson**: `#DC2626` (Dark: `#F87171`) — Quiz mistakes, destructive operations, warnings.
- **Discipline Biome Palettes**:
  - Mathematics: Cobalt Blue (`#2563EB`)
  - Physics: Electric Violet (`#9333EA`)
  - Chemistry: Emerald / Teal (`#059669` / `#0D9488`)
  - Biology: Leaf Teal (`#0D9488`)
  - Khmer Literature: Rose / Coral (`#E11D48`)
  - Earth & Environment: Solar Amber (`#D97706`)

### B. Spacing & Typography Scale (8pt Grid)
- **Base Grid**: 4px micro-adjustments, 8px rhythm (`p-2`, `p-3`, `p-4`, `p-6`, `p-8`).
- **Khmer Typography Rule**: Always reserve vertical space with `leading-relaxed` or `leading-loose` to prevent Khmer subscript consonants (ជើងអក្សរ) and vowel diacritics from clipping.
- **Border Radii**: Small badges (`rounded-lg`), Interactive cards (`rounded-2xl`), Large containers & modals (`rounded-3xl`), Stepping stones & avatars (`rounded-full`).

---

## 2. 📱 Desktop vs. Mobile Touch Interaction Matrix

Rather than forcing mobile patterns onto wide desktops (or squishing desktop spreadsheets onto phones), adapt components to each device's input mode:

| UI Dimension | Web App (Desktop / Mouse & Keyboard) | Mobile App (Touch / Single-Hand Reach) |
|---|---|---|
| **Primary Navigation** | Fixed left vertical sidebar with collapsed state, top horizontal breadcrumb bar. | Fixed bottom tab bar (`BottomNav`) with 5 core thumb-reachable destinations. |
| **Curriculum Content** | Multi-column Bento Grid or dual-pane (Path on left, `LessonsRightSidebar` on right). | Single-column winding stepping-stone pathway or focused stacked cards. |
| **Touch & Click Feel** | Subtle hover states (`hover:border-emerald-500`, `hover:shadow-md`), mouse pointers. | 3D tactile push-down feel (`border-b-[6px] active:border-b-0 active:translate-y-1.5`), haptics, and audio. |
| **Touch Targets** | Standard mouse cursor targets (28–36px). | Strict minimum **44×44px** hit area for all touch elements. |
| **Menus & Overlays** | Centered modal dialogs, contextual dropdowns, hover tooltips. | Slide-up bottom sheets (`GradePickerSheet`, Quick Peek Drawers), full-screen modals. |
| **Forms & Search** | Multi-column inputs, keyboard shortcuts (`Cmd+K`, `Enter` to submit). | Single-column stacked fields with numeric/search native mobile keyboards. |
| **Scroll Clearance** | Normal container padding (`pb-8`). | Mandatory bottom inset clearance (`pb-32` to `pb-36`) so content never hides behind `BottomNav`. |

---

## 3. 📚 Core Software Engineering Rules (from `agent-rules-books`)

Adapted from foundational software literature:

### A. Clean Architecture & Separation of Concerns (Robert C. Martin)
- **Shared Core Logic**: State management, Supabase repository queries (`src/services/supabase`), and curriculum algorithms (`src/lib/curriculum`) are isolated from view markup.
- **Dumb / Presentational UI**: Components like `<LearningPath>` and `<MoeysSyllabusView>` receive data via explicit props; they do not trigger rogue side-effects or network queries internally.

### B. Deep Modules & Simple Interfaces (John Ousterhout, *A Philosophy of Software Design*)
- A module should have a simple interface that hides significant underlying complexity.
- Example: `<LearningPath lessons={lessons} completedIds={ids} />` encapsulates all stepping stone coordinates, alternating positions, unit grouping, chest unlocking, and sound triggers behind a clean, intuitive interface.

### C. The Boy Scout Rule & Refactoring (Martin Fowler)
- Always leave the code cleaner than you found it.
- When touching a file, remove dead code, deduplicate copy-pasted blocks (e.g. duplicate search blocks), and extract monolithic components into focused helpers.

### D. Defensive Design & Resilience (Michael Nygard, *Release It!*)
- **Offline / Local Fallbacks**: If Supabase network queries fail or are slow, the application falls back gracefully to `localStorage` caches and local curriculum banks without crashing.
- **Fail-Safe Defaults**: If a user lands on `/lessons` with no URL parameters, intelligently default to their core academic track (`mathematics`), never an empty or error state.

### E. The Pragmatic Programmer (Hunt & Thomas)
- **DRY (Don't Repeat Yourself)**: Eliminate duplicate schemas, repeated grade arrays, and hardcoded colors.
- **Orthogonality**: Changes to desktop layouts must never break mobile touch flows, and mobile responsive tweaks must never regress desktop sidebars.
