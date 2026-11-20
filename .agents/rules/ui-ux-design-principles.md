# ScienceKH — Core UI/UX Design System & Architectural Principles
> Synthesized from Figma's 7 Foundational UI Principles, Apple HIG, Linear, Stripe, Duolingo, and Khan Academy.

---

## 🏛️ The 7 Foundational UI Principles for ScienceKH

### 1. Hierarchy (ឋានានុក្រមព័ត៌មាន)
Help students recognize key information and distinguish primary actions from supporting details at a glance.
- **The "One Primary Action" Rule**: Every screen must have one undeniable visual focal point (e.g. Hero Resume Lesson button, Check Answer CTA).
- **Typographic Weight & Scale**:
  - Screen Page Header: `text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white`
  - Section Label: `text-xs font-bold uppercase tracking-wider text-slate-500`
  - Card Title: `text-sm sm:text-base font-bold text-slate-900 dark:text-white`
  - Body & Formulas: `text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300`
- **Spatial Prioritization**: High-priority interactive elements live above the fold; contextual metadata and secondary links follow below.

### 2. Progressive Disclosure (ការបង្ហាញព័ត៌មានជាដំណាក់កាល)
Never overwhelm students with all complexity at once. Sequence flows into bite-sized, digestible steps:
- **Interactive Labs & Quizzes**: Reveal formula derivations step-by-step (`Step 1 of 5`), rather than dumping a full 10-step proof.
- **Multi-Grade / Subject Selection**: Use clean bottom sheets or segmented tabs instead of a massive table of 50 lessons.
- **Orientation Cues**: Always provide progress indicators (`1 / 5 សំណួរ`, breadcrumbs, percentage pills) so students know exactly where they are and how many steps remain.

### 3. Consistency (ភាពស៊ីសង្វាក់គ្នានៃប្រព័ន្ធ)
Build effortless familiarity. A button or card must look, feel, and behave the same everywhere across the product:
- **Button Standards**:
  - Primary CTA: `h-12 sm:h-13 rounded-2xl font-black uppercase tracking-wider text-white border-b-[5px] active:border-b-0 active:translate-y-1 transition-all`
  - Secondary Button: `h-11 sm:h-12 rounded-2xl font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200`
  - Icon Touch Target: strict minimum `44×44px` bounding box for all mobile tap zones.
- **Surface Elevation**: Consistent card radius (`rounded-2xl`), subtle border (`border-slate-200/90 dark:border-slate-800`), and restrained shadows (`shadow-xs`).

### 4. Contrast (ភាពផ្ទុយគ្នាយុទ្ធសាស្ត្រ)
Direct the student’s gaze intentionally using high-contrast anchors:
- **Primary Affirmative**: Fresh STEM Emerald (`#059669` / `#58CC02`) stands out vividly against light backgrounds.
- **Destructive / Error**: Crimson (`#EA2B2B` / `#DC2626`) reserved strictly for wrong answers, reset actions, and critical alerts.
- **Neutral / Dismissive**: Slate grays (`bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400`) for secondary or cancel actions so they never compete with primary goals.

### 5. Accessibility (ភាពងាយស្រួលប្រើប្រាស់សម្រាប់មនុស្សគ្រប់គ្នា)
Engineered for inclusive learning across Cambodia:
- **Color Luminosity**: Strict WCAG 2.1 AA compliance (minimum 4.5:1 contrast ratio for all readable text).
- **Khmer Typographic Clearance**: Always apply `leading-relaxed` or `leading-loose` to prevent Khmer subscript consonants (ជើងអក្សរ) and upper vowel markers (ស្រៈលើ) from being clipped.
- **Assistive Technology**: Proper `aria-label` on icon-only buttons, descriptive SVGs, and semantic HTML tags (`<main>`, `<nav>`, `<header>`, `<article>`).

### 6. Proximity (ភាពជិតស្និទ្ធនៃធាតុពាក់ព័ន្ធ - Gestalt Law)
UI elements that belong together logically must stay together physically:
- **Gamification Capsule**: XP, streak flame, coins, and hearts live together in a single top header bar.
- **Quiz Controls**: Hint, Audio Speaker, and Formula help stay clustered together in the question toolzone, isolated from the bottom "CHECK" button to avoid accidental taps.
- **Subject Cards**: Icon, subject name, grade tag, and lesson completion count live grouped inside a single unified card container.

### 7. Alignment (តម្រឹមក្បួនក្រឡាចត្រង្គ - Grid & Rhythm)
Clean mathematical lines make interfaces feel calm, credible, and academic:
- **Consistent Page Bounds**: `mx-auto w-full max-w-md px-4 sm:px-6` for mobile viewport shell.
- **Vertical Rhythm**: Systematized spacing using 4px/8px grid (`gap-2`, `gap-3`, `gap-4`, `gap-6`).
- **Safe Area Insets**: Always reserve `pb-32` to `pb-36` on scrollable screens so content is never obscured by the fixed `BottomNav`.

---

## 🚫 Critical Anti-Patterns to Ban
1. **"Card Soup" Syndrome**: Stacking identical white boxes with no contrast or hierarchy variation.
2. **Raw Database Dumps**: Showing unparsed strings like `U = R·I, resistance in Ohms (Ω)...` as title copy.
3. **Gratuitous Gradients**: Bright rainbow gradient buttons that look like AI placeholders.
4. **Scattered Floating Stats**: Loose icons without cohesive capsules or visual grouping.
5. **Awkward Text Truncation**: Truncating titles with ellipses because card padding wasn't budgeted for Khmer script.
6. **Bottom Nav Overlap**: Forgetting bottom viewport clearance and hiding buttons under fixed bars.
