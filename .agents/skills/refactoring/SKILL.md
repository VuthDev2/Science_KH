---
name: refactoring
description: >-
  Rules and discipline distilled from Martin Fowler's 'Refactoring'.
  Guides safe, incremental, behavior-preserving transformations and code smell elimination.
---

# Refactoring — Agent Skill
*Distilled from Martin Fowler's 'Refactoring: Improving the Design of Existing Code'.*

## Core Philosophy
**Refactoring is the process of changing a software system in a way that does not alter the external behavior of the code, yet improves its internal structure.**

---

## The Refactoring Discipline

### 1. Separate Refactoring from Adding New Features
- When refactoring, do NOT change behavior or add features at the same time.
- Wear the "Refactoring Hat" alone: clean the code, run tests, verify zero regression, and commit.
- Then put on the "Feature Hat": add new functionality onto the clean architecture.

### 2. Recognize Code Smells & Apply Exact Fixes
- **Duplicated Code**: Apply *Extract Function* or *Pull Up Method*. (Example: deduplicate redundant desktop search bars or grade labels).
- **Long Method / Large Component (>300 lines)**: Decompose into smaller, cohesive sub-components using *Extract Component*.
- **Primitive Obsession**: Replace raw strings with strongly typed enums or value objects (e.g., `SubjectSlug`, `GradeTier`).
- **Feature Envy**: If a function in Module A queries Module B extensively, move that logic into Module B.
- **Dead Code**: If code is unused or commented out, delete it immediately. Version control preserves history.

### 3. The Boy Scout Rule
- **Always leave the campground cleaner than you found it.**
- Every time an agent touches a file, fix at least one small smell, improve type safety (`npx tsc --noEmit`), and verify formatting.
