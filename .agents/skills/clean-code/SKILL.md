---
name: clean-code
description: >-
  Rules and habits distilled from Robert C. Martin's 'Clean Code'.
  Enforces meaningful names, small focused functions, single responsibility, and readability.
---

# Clean Code — Agent Skill
*Distilled from Robert C. Martin's 'Clean Code'.*

## Core Philosophy
**Code is read 10 times more often than it is written.** Clean code reads like well-written prose.

---

## Directives

### 1. Meaningful Names
- Use intention-revealing names: `nextIncompleteLesson` is infinitely better than `currLes` or `temp`.
- Avoid mental mapping and cryptic abbreviations.
- Functions should have verb phrases (`handleGradeChange`, `groupLessonsIntoUnits`, `calculateMasteryPercent`).

### 2. Functions Do One Thing (Single Responsibility)
- Functions should be small and do only what their name implies.
- If a function has 4 levels of nested loops and conditionals, extract the inner loops into named helper routines.

### 3. Minimize Flag Arguments
- Passing boolean flags like `doWork(true)` creates invisible bifurcation. Prefer two separate expressive functions or an options object with clear keys.

### 4. Eliminate Comments by Writing Expressive Code
- Don't write a comment to explain bad code; refactor the code so it explains itself.
- Reserve comments for domain rationale ("why"), not mechanical narration ("what").
