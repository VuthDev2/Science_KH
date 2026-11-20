---
name: ui-ux-design
description: >-
  Senior Product Design and UI/UX engineering system for ScienceKH. Use whenever building,
  redesigning, or refining interfaces, components, navigation flows, and mobile layouts.
  Enforces modern design tokens, accessibility, tactile interactions, and eliminates AI anti-patterns.
---

# UI/UX Engineering & Design System Skill

When designing or revising any page, component, or interaction in ScienceKH, audit against the **7 Foundational UI Principles**:

## 1. Hierarchy Check
- [ ] Is there **one clear primary CTA** on this screen?
- [ ] Does typography guide the eye: large bold headers (`text-xl font-black`), subtle section markers (`text-xs uppercase font-bold text-slate-500`), and clear body copy?
- [ ] Is high-value student information (current lesson, quest goal, rank) positioned before secondary archives?

## 2. Progressive Disclosure Check
- [ ] Are complex interactions (multi-step formulas, grade switching, quizzes) broken into sequenced steps?
- [ ] Does the student always know their current step and total progress (e.g. `Step 2 of 5` or `40%`)?
- [ ] Are advanced details (explanations, hints, formulas) hidden behind interactive toggles/drawers until requested?

## 3. Consistency Check
- [ ] Do buttons share the identical physical click feel (`border-b-[5px] active:border-b-0 active:translate-y-1` or `rounded-2xl`)?
- [ ] Are surfaces, border colors (`border-slate-200/90 dark:border-slate-800`), and radius (`rounded-2xl`) consistent across all pages?
- [ ] Are icon sets and semantic color meanings strictly maintained (Emerald = success/progress, Crimson = error/danger, Amber = XP/trophies, Orange = streak flame)?

## 4. Contrast Check
- [ ] Is the primary action immediately identifiable from 3 feet away through high contrast?
- [ ] Are secondary or destructive actions appropriately subdued to avoid cognitive friction?
- [ ] Does dark mode maintain distinct contrast boundaries between Surface 0 (`bg-background`) and Surface 1 (`bg-slate-900`)?

## 5. Accessibility Check
- [ ] Does all text meet WCAG 2.1 AA contrast standards (minimum 4.5:1 ratio)?
- [ ] Are all touch targets at least **44×44px**?
- [ ] Does Khmer typography have generous vertical line-height (`leading-relaxed` / `leading-loose`) so subscripts (ជើង) and upper diacritics are crisp and unclipped?
- [ ] Are screen reader attributes (`aria-label`, semantic landmarks) present on all interactive elements?

## 6. Proximity Check
- [ ] Are related stats grouped into unified capsules (e.g., the top streak/XP/heart header)?
- [ ] Are question tools (speaker audio, hints, notes) grouped together, and separated from the confirmation action?
- [ ] Are list items spaced so that item-internal elements are tighter than the space between distinct items?

## 7. Alignment & Grid Check
- [ ] Is the screen aligned within the standard container: `mx-auto w-full max-w-md px-4 sm:px-6`?
- [ ] Is vertical spacing adhering to the 4px/8px rhythm (`gap-2`, `gap-3`, `gap-4`, `gap-6`, `gap-8`)?
- [ ] Is bottom scroll clearance guaranteed with `pb-32` to `pb-36` to completely prevent overlap with `BottomNav`?
