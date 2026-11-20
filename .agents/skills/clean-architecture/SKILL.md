---
name: clean-architecture
description: >-
  Rules and architectural boundaries distilled from Robert C. Martin's 'Clean Architecture'.
  Enforces the Dependency Rule, separation of concerns, and framework independence.
---

# Clean Architecture — Agent Skill
*Distilled from Robert C. Martin's 'Clean Architecture'.*

## Core Philosophy
The center of your application is not the database, nor is it the web framework. The center of your application is the **Use Cases** of your software.

---

## Directives & System Boundaries

### 1. The Dependency Rule
- **Dependencies must point strictly inward.**
- High-level domain logic (`src/lib/curriculum/`) must NEVER depend on low-level infrastructure or UI frameworks.
- UI components and database adapters depend on domain models, not vice versa.

### 2. Scream the Domain (Intent-Revealing Layout)
- File structures must communicate the business domain immediately:
  - `src/lib/curriculum/`: MoEYS syllabus definitions, grade tiers, units, and learning path rules.
  - `src/services/supabase/`: Pure data persistence and repository queries.
  - `src/components/`: Reusable presentational components.
  - `src/routes/`: Route declarations and page shells.

### 3. Persistence & Delivery Ignorance
- Business entities must remain agnostic of whether data is stored in Supabase Postgres, SQLite, or `localStorage`.
- Presentational components must remain pure: they receive data via props, emit user intents via callback handlers, and never initiate rogue network queries.

### 4. Boundary Economics
- Keep boundaries proportional. Do not introduce 6 layers of abstract interfaces for a simple 10-line calculation. Use boundaries strategically around volatile external dependencies (Auth, Database, Third-Party APIs).
