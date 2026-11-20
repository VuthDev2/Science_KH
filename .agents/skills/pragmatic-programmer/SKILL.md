---
name: pragmatic-programmer
description: >-
  Rules and pragmatic heuristics distilled from Andrew Hunt and David Thomas's 'The Pragmatic Programmer'.
  Enforces DRY, orthogonality, broken windows prevention, and tracer bullets.
---

# The Pragmatic Programmer — Agent Skill
*Distilled from Andrew Hunt and David Thomas's classic book.*

## Core Philosophy
**Care about your craft. Don't live with broken windows.**

---

## The Pragmatic Directives

### 1. DRY (Don't Repeat Yourself)
- Every piece of knowledge must have a single, unambiguous, authoritative representation within a system.
- Shared constants (like MoEYS grade tiers, subjects list, theme tokens) must live in a single source of truth, never duplicated across mobile and desktop files.

### 2. Orthogonality
- Eliminate effects between unrelated things.
- Changing a mobile layout style must never break desktop layout logic.
- Changing an SEO JSON-LD schema generator must never break quiz evaluation mechanics.

### 3. Fix Broken Windows Early
- Never leave bad designs, wrong decisions, or broken tests unaddressed.
- Neglected code breeds further neglect. Fix compile warnings, dead imports, and broken layout constraints as soon as discovered.

### 4. Tracer Bullets & Defensive Coding
- When building new features, build an end-to-end tracer bullet first (from database to UI) to verify the architectural path works in real conditions.
- Code defensively against crashes: guard against offline states, null profiles, and network timeouts with sensible fallback defaults.
