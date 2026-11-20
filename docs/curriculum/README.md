# ScienceKH — Cambodian National Curriculum Master Catalog (Grades 7–12)
## កាតាឡុកកម្មវិធីសិក្សាជាតិ និងមាតិកាសៀវភៅពុម្ពផ្លូវការ ថ្នាក់ទី ៧ ដល់ ទី ១២ ក្រសួងអប់រំ យុវជន និងកីឡា

> [!IMPORTANT]
> **ScienceKH** is a comprehensive educational platform engineered to empower Cambodian secondary school students across **Grades 7 through 12**. Every subject, unit, and lesson is grounded directly in the official textbooks, teacher guides, and assessment directives of the **Ministry of Education, Youth and Sport (MoEYS / ក្រសួងអប់រំ យុវជន និងកីឡា)** of the Kingdom of Cambodia.

---

## 1. Master Curriculum Directory Structure

```
docs/curriculum/
├── README.md                              <- [Current File] Master Catalog & Architecture Guide
├── source-verification-report.md          <- Official MoEYS source verification report & bibliography
├── missing-content-report.md              <- Gaps, pending review items & MoEYS alignment audit
├── progression-maps/
│   ├── mathematics-progression.md         <- Grade 7 to 12 Math Progression Map
│   ├── science-progression.md             <- Physics, Chemistry, Biology, Earth Sci Progression Map
│   ├── languages-progression.md           <- Khmer Literature & English Progression Map
│   └── social-sciences-progression.md     <- History, Geography, Moral & Civics Progression Map
├── grade-7/
│   ├── overview.md                        <- Grade 7 Overview & Subject Matrix
│   ├── mathematics.md                     <- 6 Units, 26 Lessons (Signed Numbers to Statistics)
│   ├── science.md                         <- Physics, Chemistry, Biology, Earth Science
│   └── humanities-languages.md            <- Khmer, English, History, Geography, Moral/Civics, ICT
├── grade-8/
│   ├── overview.md                        <- Grade 8 Overview & Scaffolding
│   ├── mathematics.md                     <- 4 Units, 10 Lessons (Polynomials to 3D Solids)
│   ├── science.md                         <- Forces, Periodic Elements, Digestion, Geology
│   └── humanities-languages.md            <- Tum Teav, Jayavarman II 802 AD, Paddy Agronomy, Spreadsheets
├── grade-9/
│   ├── overview.md                        <- Brevet (ឌីប្លូម) National Examination Framework
│   ├── mathematics.md                     <- Linear Systems, Quadratics, Thales, Right-Trig, Probability
│   ├── science.md                         <- Ohm's Law, Mole Stoichiometry, Neurons, Ozone Layer
│   └── humanities-languages.md            <- Kulap Pailin, 1953 Independence Crusade, Road Safety, UDHR
├── grade-10/
│   ├── overview.md                        <- Core Upper Secondary Foundation & Diagnostic Gateway
│   ├── mathematics.md                     <- Polynomials, Quadratic Trinomial Signs, Unit Circle, Vectors
│   ├── science.md                         <- Newton's 3 Laws, Atomic Orbitals, Mitosis, Tectonics
│   └── humanities-languages.md            <- Reamker Epic, Longvek-Oudong, Protected Reserves, Algorithms
├── grade-11/
│   ├── overview.md                        <- Stream Branching (Science vs Social Science)
│   ├── science-stream.md                  <- Advanced Calculus (Limits, Derivatives), Organic Chemistry
│   └── social-science-stream.md           <- Sim the Driver, Mealea Doung Chett, Anticolonial Uprisings, SEZs
└── grade-12/
    ├── overview.md                        <- Baccalaureate II (បាក់ឌុប) 500-Point Architecture
    ├── science-stream.md                  <- 125-pt Math Calculus/3D, Physics, Chemistry, Biology Majors
    └── social-science-stream.md           <- 125-pt Khmer Literature, History, Geography, Civics Majors
```

---

## 2. Complete Grade-by-Grade Subject Matrix

| Subject | Khmer Name | Grade 7 | Grade 8 | Grade 9 (ឌីប្លូម) | Grade 10 | Grade 11 (Sci/Soc) | Grade 12 (បាក់ឌុប) |
|---|---|:---:|:---:|:---:|:---:|:---:|:---:|
| **Mathematics** | គណិតវិទ្យា | Core (6h) | Core (6h) | Brevet (6h, 100pts) | Core (6h) | Major (6h) / Sub (5h) | Major (125pts) / Sub (75pts) |
| **Khmer Literature** | ភាសាខ្មែរ | Core (6h) | Core (6h) | Brevet (6h, 100pts) | Core (5h) | Sub (5h) / Major (6h) | Sub (75pts) / Major (125pts) |
| **Physics** | រូបវិទ្យា | Core (2h) | Core (2h) | Brevet (2h, 50pts) | Core (3h) | Major (4h) / Sub (2h) | Major (75pts) |
| **Chemistry** | គីមីវិទ្យា | Core (2h) | Core (2h) | Brevet (2h, 50pts) | Core (3h) | Major (4h) / Sub (2h) | Major (75pts) |
| **Biology** | ជីវវិទ្យា | Core (2h) | Core (2h) | Brevet (2h, 50pts) | Core (3h) | Major (4h) / Sub (2h) | Major (75pts) |
| **Earth Science** | ផែនដីវិទ្យា | Core (2h) | Core (2h) | Brevet (2h, 50pts) | Core (2h) | Sub (2h) / Core (2h) | Major (75pts) in Social |
| **History** | ប្រវត្តិវិទ្យា | Core (2h) | Core (2h) | Brevet (2h, 50pts) | Core (2h) | Sub (2h) / Major (4h) | Sub (50pts) / Major (75pts) |
| **Geography** | ភូមិវិទ្យា | Core (2h) | Core (2h) | Brevet (2h, 50pts) | Core (2h) | Sub (2h) / Major (4h) | Major (75pts) in Social |
| **Moral & Civics** | សីលធម៌-ពលរដ្ឋ | Core (1.5h) | Core (1.5h) | Brevet (1.5h, 50pts) | Core (1.5h) | Elective / Major (2h) | Major (75pts) in Social |
| **Foreign Language (English)** | ភាសាអង់គ្លេស | Core (3.5h) | Core (3.5h) | Brevet (3.5h, 50pts) | Core (3.5h) | Core (4h / 5h) | Core (50pts) |
| **ICT & Computing** | ព័ត៌មានវិទ្យា | Core (1h) | Core (1h) | Core (1h) | Core (1h) | Core (1h) | Core (1h) |
| **Physical Education & Health** | អប់រំកាយ | Core (2h) | Core (2h) | Core (2h) | Core (2h) | Core (2h) | Core (2h) |

---

## 3. Machine-Readable JSON Datasets for System Integration

All structured curriculum entities (Grades, Subjects, Streams, Units, Lessons, Subtopics, Learning Objectives, Vocabulary, and Formative Assessments) are exported into `data/curriculum/`:
- `data/curriculum/curriculum-catalog.json`: Master schema and subject catalogue.
- `data/curriculum/grade-7-curriculum.json`: Complete Grade 7 curriculum tree.
- `data/curriculum/grade-8-curriculum.json`: Complete Grade 8 curriculum tree.
- `data/curriculum/grade-9-curriculum.json`: Complete Grade 9 Brevet curriculum tree.
- `data/curriculum/grade-10-curriculum.json`: Complete Grade 10 curriculum tree.
- `data/curriculum/grade-11-curriculum.json`: Complete Grade 11 Science & Social Science trees.
- `data/curriculum/grade-12-curriculum.json`: Complete Grade 12 Bac II 500-point curriculum tree.
