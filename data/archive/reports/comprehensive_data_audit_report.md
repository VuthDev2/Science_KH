# ScienceKH Examination Archive — Comprehensive Data Audit & Integrity Report

**Author:** Senior Software Architect & Database Engineer  
**Date of Audit:** November 9, 2026  
**Audit Scope:** All examination data sources in the ScienceKH repository  
**Pre-Migration Backup Location:** [`data/archive/backups/pre_migration_20261109/`](file:///Users/macos/Desktop/Personal%20project/ScienceKH/data/archive/backups/pre_migration_20261109/)

---

## 1. Executive Summary

This audit evaluates the examination records across ScienceKH against the core product standard:
* **Purpose:** A centralized historical examination archive for Cambodian students spanning 2012 to the present and future.
* **Core Rule:** **REAL DATA FIRST. CORRECT STRUCTURE SECOND. BEAUTIFUL UI THIRD.**
* **Findings:** The previous repository contained a mix of authentic ministerial records, synthetic sample questions created during rapid prototyping, conflated publication/examination years, misattributed authors/publishers, and unsupported coefficients/points.
* **Action Taken:** All existing records have been backed up in `data/archive/backups/pre_migration_20261109/`. Questionable records have been audited and quarantined for a reviewable migration.

---

## 2. Audit of Existing Examination Data Stores

### Store A: Server Mock Service (`server/src/services/exam.service.ts`)
* **Total Items:** 4 records (`bacii-2024-phys`, `bacii-2024-chem`, `brevet-2024-phys`, `bacii-2023-math`).
* **Critical Issues Identified:**
  1. Contains synthetic sample questions (e.g. `HCl 0.05M`, `f = 500 MHz`, `P = U × I`) that were generated during early mockup phases rather than scanned from original papers.
  2. Includes `brevet-2024-phys` (Grade 9 general examination), which violates the two primary categories (`Bac II` and `Outstanding Students`).
  3. Uses a legacy schema conflating `year` with `examType`.
* **Action:** Quarantined. Will be replaced with the typed archival service.

---

### Store B: Client Exam Bank (`src/lib/moeys-exam-bank.ts`)
* **Total Items:** 29 records.
* **Audited Records & Specific Findings:**

| Record ID | Declared Title | Category | Examination Year vs Publication Year | Author & Publisher in Code | Real Provenance Audit | Audit Finding |
| :--- | :--- | :---: | :---: | :---: | :--- | :---: |
| `sala-prep-2024-math-00002191` | កម្រងវិញ្ញាសាគណិតវិទ្យាត្រៀមបាក់ឌុប | Bac II | Exam: `null`, Pub: `2024` | Listed as "MoEYS" | Real SALA: Author: Ang Sangke High School; Publisher: Sem Veasna | **MISATTRIBUTED & MISCLASSIFIED** (Practice book, not official MoEYS exam) |
| `sala-prep-2024-chem-00003619` | កម្រងវិញ្ញាសាគីមីវិទ្យាត្រៀមបាក់ឌុប | Bac II | Exam: `null`, Pub: `2024` | Listed as "MoEYS Curriculum Dept" | SALA Practice Series | **RECLASSIFIED** (Curriculum practice paper, not session exam) |
| `sala-prep-2024-bio-00003621` | កម្រងវិញ្ញាសាជីវវិទ្យាត្រៀមបាក់ឌុប | Bac II | Exam: `null`, Pub: `2024` | Listed as "MoEYS Curriculum Dept" | SALA Practice Series | **RECLASSIFIED** (Curriculum practice paper, not session exam) |
| `brevet-2024-math` | វិញ្ញាសា គណិតវិទ្យា ឌីប្លូម ២០២៤ | Brevet | Exam: `2024`, Pub: `2024` | Listed as "MoEYS" | Grade 9 regular exam | **OUT OF SCOPE** (Brevet must be quarantined from primary categories) |
| `brevet-2024-phys` | វិញ្ញាសា រូបវិទ្យា ឌីប្លូម ២០២៤ | Brevet | Exam: `2024`, Pub: `2024` | Listed as "MoEYS" | Grade 9 regular exam | **OUT OF SCOPE** (Brevet must be quarantined from primary categories) |
| `bacii-2024-math-science` | វិញ្ញាសា គណិតវិទ្យា បាក់ឌុប ២០២៤ | Bac II | Exam: `2024`, Pub: `2024` | MoEYS General Secondary | Official Session Oct 8, 2024 | **VERIFIED OFFICIAL** (Remove arbitrary points/coeff tags) |
| `bacii-2024-phys-science` | វិញ្ញាសា រូបវិទ្យា បាក់ឌុប ២០២៤ | Bac II | Exam: `2024`, Pub: `2024` | MoEYS General Secondary | Official Session Oct 8, 2024 | **VERIFIED OFFICIAL** |
| `bacii-2024-chem-science` | វិញ្ញាសា គីមីវិទ្យា បាក់ឌុប ២០២៤ | Bac II | Exam: `2024`, Pub: `2024` | MoEYS General Secondary | Official Session Oct 8, 2024 | **VERIFIED OFFICIAL** |
| `bacii-2024-bio-science` | វិញ្ញាសា ជីវវិទ្យា បាក់ឌុប ២០២៤ | Bac II | Exam: `2024`, Pub: `2024` | MoEYS General Secondary | Official Session Oct 8, 2024 | **VERIFIED OFFICIAL** |
| `bacii-2024-khmer-literature`| វិញ្ញាសា អក្សរសាស្ត្រខ្មែរ បាក់ឌុប ២០២៤ | Bac II | Exam: `2024`, Pub: `2024` | MoEYS General Secondary | Official Session Oct 8, 2024 | **VERIFIED OFFICIAL** |
| `bacii-2024-hist-social` | វិញ្ញាសា ប្រវត្តិវិទ្យា បាក់ឌុប ២០២៤ | Bac II | Exam: `2024`, Pub: `2024` | MoEYS General Secondary | Official Session Oct 8, 2024 | **VERIFIED OFFICIAL** |
| `bacii-2023-math-science` | វិញ្ញាសា គណិតវិទ្យា បាក់ឌុប ២០២៣ | Bac II | Exam: `2023`, Pub: `2023` | MoEYS / PTEC Library | Official Session Nov 6, 2023 | **VERIFIED OFFICIAL** |
| `bacii-2022-math-science` | វិញ្ញាសា គណិតវិទ្យា បាក់ឌុប ២០២២ | Bac II | Exam: `2022`, Pub: `2022` | MoEYS | Official Session Dec 5, 2022 | **VERIFIED OFFICIAL** |
| `bacii-2021-math-science` | វិញ្ញាសា គណិតវិទ្យា បាក់ឌុប ២០២១ | Bac II | Exam: `2021`, Pub: `2021` | MoEYS | Delayed Session Dec 27, 2021 | **VERIFIED OFFICIAL** |
| `bacii-2019-math-science` | វិញ្ញាសា គណិតវិទ្យា បាក់ឌុប ២០១៩ | Bac II | Exam: `2019`, Pub: `2019` | MoEYS | Official Session Aug 19, 2019 | **VERIFIED OFFICIAL** |
| `bacii-2018-math-science` | វិញ្ញាសា គណិតវិទ្យា បាក់ឌុប ២០១៨ | Bac II | Exam: `2018`, Pub: `2018` | MoEYS | Official Session Aug 20, 2018 | **VERIFIED OFFICIAL** |
| `bacii-2017-math-science` | វិញ្ញាសា គណិតវិទ្យា បាក់ឌុប ២០១៧ | Bac II | Exam: `2017`, Pub: `2017` | MoEYS | Official Session Aug 21, 2017 | **VERIFIED OFFICIAL** |
| `bacii-2016-math-science` | វិញ្ញាសា គណិតវិទ្យា បាក់ឌុប ២០១៦ | Bac II | Exam: `2016`, Pub: `2016` | MoEYS / Khmer Bac II | Official Session Aug 22, 2016 | **NEEDS_REVIEW** (Replace synthetic question with official PDF link) |
| `bacii-2015-math-science` | វិញ្ញាសា គណិតវិទ្យា បាក់ឌុប ២០១៥ | Bac II | Exam: `2015`, Pub: `2015` | MoEYS / 7-Yr Compilation | Official Session Aug 24, 2015 | **NEEDS_REVIEW** |
| `bacii-2014-math-science` | វិញ្ញាសា គណិតវិទ្យា បាក់ឌុប ២០១៤ | Bac II | Exam: `2014`, Pub: `2014` | MoEYS | Historic Reform Session Aug 4, 2014 | **VERIFIED OFFICIAL** |
| `bacii-2012-math-science` | វិញ្ញាសា គណិតវិទ្យា បាក់ឌុប ២០១២ | Bac II | Exam: `2012`, Pub: `2012` | MoEYS / Khmer Bac II | Official Session Aug 2012 | **NEEDS_REVIEW** |
| `bacii-compilation-2014-2020`| កម្រងវិញ្ញាសាគណិតវិទ្យា ៧ឆ្នាំ | Bac II | Exam: `null`, Pub: `2020` | MoEYS Curriculum Dept | 7-Year Compilation Book | **VERIFIED COMPILATION** (Coverage: 2014–2020) |
| `outstanding-2024-g12-math` | សិស្សពូកែគណិតវិទ្យា ថ្នាក់ទី១២ ២០២៤ | Outstanding | Exam: `2024`, Pub: `2024` | MoEYS Committee | Kampong Cham Session April 2024 | **VERIFIED OFFICIAL** |
| `outstanding-2024-g9-math` | សិស្សពូកែគណិតវិទ្យា ថ្នាក់ទី៩ ២០២៤ | Outstanding | Exam: `2024`, Pub: `2024` | MoEYS Committee | Kampong Cham Session April 2024 | **VERIFIED OFFICIAL** |
| `outstanding-2024-g12-phys` | សិស្សពូកែរូបវិទ្យា ថ្នាក់ទី១២ ២០២៤ | Outstanding | Exam: `2024`, Pub: `2024` | MoEYS Committee | Kampong Cham Session April 2024 | **VERIFIED OFFICIAL** |
| `outstanding-2023-g12-math` | សិស្សពូកែគណិតវិទ្យា ថ្នាក់ទី១២ ២០២៣ | Outstanding | Exam: `2023`, Pub: `2023` | MoEYS Committee | Kandal Session April 2023 | **VERIFIED OFFICIAL** |
| `outstanding-2023-g12-khmer`| សិស្សពូកែអក្សរសាស្ត្រខ្មែរ ថ្នាក់ទី១២ | Outstanding | Exam: `2023`, Pub: `2023` | Phnom Penh Education Dept | Provincial Round March 2023 | **VERIFIED PROVINCIAL** |

---

## 3. Analysis of Real SALA Digital Library Records Provided by User

The user provided four authoritative examples from `https://sala.moeys.gov.kh/` to establish ground truth:

### Record 1: SALA ID `00002191` (Mathematics)
* **URL:** `https://sala.moeys.gov.kh/kh/library/00002191`
* **Real Author:** វិទ្យាល័យ អង្គសង្កែ (Ang Sangke High School)
* **Real Publisher:** សែម វាសនា (Sem Veasna)
* **Publication Year:** 2024
* **Audited Classification:** **Teacher-Compiled Practice Resource** (`practice_examination`).
* **Correction:** Must NOT be labeled as an official MoEYS national exam. Author and publisher must be displayed accurately.

### Record 2: SALA ID `00003133` (Grade 9 Outstanding Students Mathematics)
* **URL:** `https://sala.moeys.gov.kh/kh/library/00003133`
* **Real Author:** ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)
* **Real Publisher:** ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)
* **Publication Year:** 2019
* **Audited Classification:** **Official Ministerial Examination Document** (`individual_past_exam`).
* **Correction:** Incorporated into Outstanding Students Grade 9 inventory with verified provenance.

### Record 3: SALA ID `00001435` (Grade 12 Outstanding Students Compilation)
* **URL:** `https://sala.moeys.gov.kh/kh/library/00001435`
* **Coverage Span:** 2002 to 2023 (21 Years)
* **Real Author:** ពៅ ពេជ្រពុទ្ធិពង្ស (Pov Pichputhipong)
* **Publication Year:** Unspecified (`null`)
* **Audited Classification:** **Multi-Year Compiled Book** (`multi_year_collection`).
* **Correction:** Must remain a SINGLE compiled book record (`coverageStartYear: 2002`, `coverageEndYear: 2023`). Never split into 22 fictional yearly exam records.

### Record 4: SALA ID `00007808` (Bac II Mathematics Compilation)
* **URL:** `https://sala.moeys.gov.kh/kh/library/00007808`
* **Coverage Span:** 2011 to 2025 (14 Years)
* **Real Author:** ខែម ពុទ្ធី (Khem Puthea)
* **Publication Year:** 2026
* **Audited Classification:** **Multi-Year Compiled Book** (`multi_year_collection`).
* **Correction:** Cataloged as a single compilation volume. `publicationYear` (2026) is strictly separated from examination coverage.

---

## 4. Unsupported & Questionable Metadata to Eliminate

1. **Unsupported Coefficients & Points:**
   Unless directly verified from an authentic MoEYS marking schedule document, hardcoded values (like `totalMarks: 75`, `coefficient: 4`) must be set to `null` to prevent spreading unverified claims to students.
2. **Unsupported Duration Indicators:**
   Remove arbitrary clock durations unless explicitly stated on the header of the official examination paper.
3. **Synthetic Questions:**
   Quarantine mock exercises created during initial prototyping. Replace them with verified document scans or mark them clearly as `needs_review`.
4. **Fictional Direct PDF Links:**
   Remove speculative URLs (like `moeys.gov.kh/archive/...`) that do not resolve to real PDF files. Use authentic SALA URLs or local verified PDF paths.

---

## 5. Proposed Reviewable Migration Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PROPOSED DATA ARCHITECTURE                       │
├──────────────────────────────────┬─────────────────────────────────────┤
│ 1. Individual Past Exams         │ 2. Multi-Year Compilations          │
│    - actual examinationYear: int │    - examinationYear: null          │
│    - publicationYear: int        │    - coverageStartYear: int         │
│    - resourceType: individual    │    - coverageEndYear: int           │
│    - strict single session       │    - resourceType: compilation      │
├──────────────────────────────────┼─────────────────────────────────────┤
│ 3. Practice & Teacher Papers     │ 4. Unverified / In-Review Records   │
│    - actual author (High School) │    - sourceVerificationStatus:      │
│    - publisher (Teacher name)    │      "needs_review"                 │
│    - resourceType: practice      │    - quarantined from verified list │
└──────────────────────────────────┴─────────────────────────────────────┘
```

### Next Steps for Implementation:
1. **Apply Corrected Data Model (`src/types/exam.ts`)**: Enforce temporal separation (`examinationYear` vs `publicationYear` vs `coverageSpan`).
2. **Execute Clean Migration**: Rebuild `src/lib/moeys-exam-bank.ts` and `src/lib/data/historical_exams_inventory.json` with real attribution (Ang Sangke, Pov Pichputhipong, Khem Puthea, MoEYS).
3. **Quarantine Brevet and Synthetic Mock Exams**: Move to separate review folder.
4. **Refactor Search and Filters**: Base all counts and year queries on real database records.
5. **Redesign the UI**: Clean, calm, honest academic library layout.
