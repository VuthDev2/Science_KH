# ScienceKH — MoEYS Curriculum Gap & Missing-Content Audit Report
## របាយការណ៍សវនកម្មមាតិកា ចន្លោះខ្វះខាត និងផែនការធ្វើសមកាលកម្មកម្មវិធីសិក្សាជាតិ

> [!NOTE]
> This audit systematically examines the completeness, historical gaps, and future development frontiers of the **ScienceKH** digital curriculum across Grades 7–12. Following strict Ministry standards, this document identifies areas that require ongoing review, distinctions between published textbooks and syllabuses, and guidelines for educational content maintenance.

---

## 1. Audit of Historical ScienceKH Curriculum Gaps & Resolutions

| Curriculum Domain | Pre-Audit Condition | Diagnostic Root Cause | Corrective Action Implemented in ScienceKH | Current Status |
|---|---|---|---|---|
| **Grade 7 Mathematics** | 5 total lessons; Unit 3 displayed "0/1 Lessons". | Curriculum registry mapped only 1 lesson to Unit 3; textbook chapters were collapsed. | Expanded to **26 authentic MoEYS lessons** structured into 6 sequential textbook units (Integers, Fractions/Decimals, Powers, Linear Equations, Planar Geometry, Solids & Statistics). | **Resolved & Verified (26 Lessons)** |
| **Grade 8, 9, 12 Mathematics** | 5 lessons each; lacking major national exam topics. | Upper-tier algebraic, trigonometric, and analytical chapters were unpopulated. | Expanded Grade 8, Grade 9 (Brevet), and Grade 12 (Bac II) to **10 comprehensive lessons each** across 4 units. | **Resolved & Verified (10 Lessons each)** |
| **Single-Lesson Units (Platform-Wide)** | 35 units had `lessonIds: ["..."]` containing only 1 lonely lesson node. | Generic subject chunking sliced unevenly; humanities subjects only had 1 sample lesson. | Restructured units across all 11 disciplines into multi-lesson modules (2 to 5 lessons per unit); added 24 new authentic lessons in Khmer, History, Geography, English, ICT, and Civics. | **Resolved & Verified (0 Single-Lesson Units)** |
| **Upper Secondary Streams (Grades 11–12)** | Streams were not clearly differentiated in subject coefficients. | Early prototypes treated Grade 11–12 as homogeneous without stream tracking. | Embedded official **500-point Bac II weightings** for both **Science Stream** (Math 125, Sciences 225, Khmer 75, Hist 50, Eng 50) and **Social Science Stream** (Khmer 125, Social Studies 225, Math 75, Earth 75, Eng 50). | **Resolved & Verified** |
| **Interactive Question Decks** | Lesson quizzes varied from 3 to 5 questions; lacked auto-progression. | Initial quiz arrays had minimal questions without pedagogical reinforcement. | Implemented `ensureDuolingoQuestionCount()` in `quiz-curriculum-labs.ts` to guarantee **10–12 questions** per lesson with 5 pedagogical stages. | **Resolved & Verified** |

---

## 2. Identified Curriculum Areas Requiring Ongoing Field Review

### A. Non-Textbook & Syllabus-Driven Subjects
In Cambodia's national curriculum, several subjects are taught via **Teacher Guides (*សៀវភៅណែនាំគ្រូ*)** and **Curriculum Syllabuses (*កម្មវិធីលម្អិត*)** rather than commercial student textbooks distributed to every pupil:

1. **Information and Communication Technology (ICT & Computing — Grades 7–12)**:
   - *Official Status:* Taught according to the MoEYS ICT in Education Strategic Plan and draft syllabuses. Textbooks are predominantly teacher reference manuals and pilot school modules.
   - *ScienceKH Policy:* Structured around core digital literacy competencies (Khmer Unicode typing, hardware, spreadsheets, algorithms, SQL, cybersecurity, and networking).
   - *Status:* **Pending Annual Syllabus Synchronization with DIT (Department of Information Technology, MoEYS).**

2. **Physical Education & Sports (អប់រំកាយ និងកីឡា — Grades 7–12)**:
   - *Official Status:* 2 hours/week allocated in both Lower and Upper Secondary (Table 4 & 5 of the 2016 Framework). Assessed through practical physical performance rubrics (track and field, gymnastics, volleyball, football).
   - *ScienceKH Policy:* Digital curriculum provides theoretical sports rules, health/anatomy fundamentals, and exercise physiology; does not substitute for outdoor physical practice.
   - *Status:* **Curricular Theory Mapped; Practical Drills Documented.**

3. **Arts Education (អប់រំសិល្បៈ — Grades 7–9)**:
   - *Official Status:* Includes traditional Khmer music (Pinpeat, Mohori), classical dance (*របាំព្រះរាជទ្រព្យ*), folk dance (*របាំប្រជាប្រិយ*), and visual arts (*គំនូរ និងចម្លាក់*). Allocated 1–2 hours per week in lower secondary.
   - *ScienceKH Policy:* Integrated into Khmer Literature and Cultural History modules to preserve educational continuity without creating disconnected micro-units.
   - *Status:* **Content Integrated; Dedicated Art Modules Pending National Resource Expansion.**

4. **Local Life Skills & Agriculture (បំណិនជីវិតតាមមូលដ្ឋាន / កសិកម្ម)**:
   - *Official Status:* 1–2 hours/week designed to be school-directed based on provincial geographic realities (e.g. inland aquaculture in Tonle Sap provinces, horticulture in Kandal/Battambang, ecotourism in coastal provinces).
   - *ScienceKH Policy:* Key agronomic concepts (paddy rice cultivation, irrigation, pest management, rubber and cashew agro-forestry) are systematically embedded in Geography and Biology curricula.
   - *Status:* **Core Agricultural Topics Embedded.**

---

## 3. Strict Rules for Instructional Designers & Contributors

To maintain rigorous pedagogical integrity and prevent educational hallucination:

1. **Rule of Official Grounding:** Never invent textbook chapters, unit titles, or numbering. Every unit number (*ជំពូកទី...*) must reflect an authentic MoEYS curriculum division.
2. **Rule of Explicit Attribution:** When authoring worked examples, practice problems, or conceptual summaries, clearly mark them as **[ScienceKH Didactic Exercise]** and never misrepresent them as leaked or official national examination questions (*វិញ្ញាសាផ្លូវការ*).
3. **Rule of Linguistic Precision:** Maintain official Khmer academic vocabulary as canonized in the Chuon Nath Dictionary (*វចនានុក្រមខ្មែរ សម្ដេចព្រះសង្ឃរាជ ជួន ណាត*) and the National Council for the Khmer Language (*ក្រុមប្រឹក្សាជាតិភាសាខ្មែរ - NC-KL*).
4. **Rule of Stream Neutrality:** Ensure Upper Secondary content accurately flags stream applicability so students preparing for Bac II in either the Science or Social Science track receive the exact curricular depth required for their examination.
