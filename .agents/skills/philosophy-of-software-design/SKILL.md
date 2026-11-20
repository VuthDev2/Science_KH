---
name: philosophy-of-software-design
description: >-
  Rules and design heuristics distilled from John Ousterhout's 'A Philosophy of Software Design'.
  Enforces deep modules, information hiding, pulling complexity down, and reducing cognitive load.
---

# A Philosophy of Software Design — Agent Skill
*Distilled from John Ousterhout's foundational software design book.*

## Core Philosophy
**Complexity is the enemy.** Complexity is anything related to the structure of a system that makes it hard to understand and modify.

### The Three Symptoms of Complexity
1. **Change Amplification**: A seemingly simple change requires code modifications in many different places.
2. **Cognitive Load**: How much knowledge a developer must have to complete a task. High cognitive load means higher bug probability.
3. **Unknown Unknowns**: It is not obvious which pieces of code must be modified, or what information a developer must have to make the modification.

---

## The 4 Golden Directives

### 1. Build Deep Modules, Avoid Shallow Ones
- **Deep Module**: Has a simple, elegant interface that hides significant underlying implementation complexity. (High value, low mental overhead).
  - *Example in ScienceKH:* `<LearningPath lessons={lessons} completedIds={ids} />` is deep. The caller provides raw lessons, while the module encapsulates the winding trigonometry, alternating stepping stone coordinates, milestone chests, and tactile audio feedback.
- **Shallow Module**: Has a complex interface relative to the tiny functionality it provides. It adds indirection without reducing cognitive load. Avoid creating 5-line wrapper functions that merely pass arguments through.

### 2. Information Hiding (Deep Hiding)
- Knowledge about design decisions (e.g., Supabase table schema, local storage key format, audio playback engines) must be encapsulated inside a single module.
- Never let low-level implementation details leak into view layer routes.

### 3. Pull Complexity Down
- If complexity cannot be eliminated, it is almost always better to handle it **inside** the module rather than pushing it onto the caller.
- Do not burden consumers with 15 configuration flags or boilerplate setup. Provide sensible defaults.

### 4. Design for General-Purpose, Specialize in Use
- Build abstractions that solve general categories of problems cleanly rather than brittle, ad-hoc one-off patches.
