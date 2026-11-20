# ScienceKH — Agent Rules & Engineering Standards

Welcome to **ScienceKH**, Cambodia's leading MoEYS STEM national curriculum & gamified learning platform for Grades 7–12.

When modifying, designing, or refactoring any part of this repository, you **must** adhere to the following principles distilled from foundational software engineering books (*Clean Code*, *Refactoring*, *The Pragmatic Programmer*, *A Philosophy of Software Design*) and Apple/Duolingo product design standards.

---

## 1. Cross-Platform UI & Shared Design Tokens
Full specification: [cross-platform-engineering.md](file:///Users/macos/Desktop/Personal%20project/ScienceKH/.agents/rules/cross-platform-engineering.md)

1. **Design Tokens First**: Colors, theme tokens, and typography are defined in `src/index.css` and Tailwind config. Never hardcode arbitrary hex codes or magic margins.
2. **Platform Adaptation**:
   - **Desktop (Mouse/Keyboard)**: Wide horizontal layouts, left vertical navigation sidebar (`AppShell`), dual-column views with `LessonsRightSidebar`, hover states, and centered modal dialogs.
   - **Mobile (Touch/Thumb)**: Single-column scrollable stream, thumb-reachable `BottomNav`, slide-up bottom sheets (`GradePickerSheet`, Quick Peek Drawers), 3D tactile push-down buttons (`border-b-[6px] active:border-b-0 active:translate-y-1.5`), and strict **44×44px** minimum touch targets.
3. **Responsive Safety**:
   - Respect Safe Area insets (`pt-safe-top`, `pb-safe`, `header-safe-top`).
   - Mobile scroll clearance must always include `pb-32` to `pb-36` to prevent `BottomNav` overlap.
   - Khmer typography must use `leading-relaxed` or `leading-loose` to prevent subscript consonants (ជើង) and diacritics from clipping.

---

## 2. Software Craftsmanship & Architecture
Distilled from [ciembor/agent-rules-books](https://github.com/ciembor/agent-rules-books):

1. **Separation of Concerns (Clean Architecture)**:
   - Data & Supabase Queries: `src/services/supabase/`
   - Business Logic & Units: `src/lib/curriculum/`
   - Presentational UI Components: `src/components/`
   - Routes: `src/routes/_authenticated/`
2. **Deep Modules (A Philosophy of Software Design)**:
   - Provide simple, expressive component interfaces that encapsulate complex mechanics (e.g. `<LearningPath />`, `<MoeysSyllabusView />`).
3. **The Boy Scout Rule (Refactoring)**:
   - Always leave the file cleaner than you found it. Deduplicate copied blocks, remove dead code, and verify type safety with `npx tsc --noEmit`.
4. **Defensive Programming & Offline Resilience (Release It!)**:
   - Never let an offline or proxy failure break the app. Fall back gracefully to cached progress and local curriculum data.
   - Always provide sensible defaults (e.g., defaulting to the student's core track when landing on `/lessons`).

---

## 3. The 7 Foundational UI Principles
Full specification: [ui-ux-design-principles.md](file:///Users/macos/Desktop/Personal%20project/ScienceKH/.agents/rules/ui-ux-design-principles.md)

- **Hierarchy**: One clear primary CTA per view.
- **Progressive Disclosure**: Break complex formulas and curriculum trees into bite-sized steps.
- **Consistency**: Unified tactile push-down feel and card surface radiuses (`rounded-2xl` / `rounded-3xl`).
- **Contrast**: High contrast for primary learning actions; muted backgrounds for secondary chrome.
- **Accessibility**: Strict WCAG 2.1 AA compliance, full ARIA labelling, and generous Khmer vertical clearance.
- **Proximity**: Cohesive stat capsules (Streak 🔥, XP ⭐, Hearts ❤️) grouped together logically.
- **Alignment**: Math-exact 8pt grid alignment and consistent horizontal margins.
