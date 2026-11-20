# ScienceKH — Data Quality, Deduplication & Integrity Audit

**Audit Date:** November 9, 2026  
**Dataset:** `cambodia_historical_exams_2012_2026.json` / `.csv`  
**Total Records Audited:** 33 unique items  

---

## 1. Audit Summary

| Check Category | Criteria | Result | Notes |
| :--- | :--- | :---: | :--- |
| **Unique Identifiers** | All `record_id` values unique | **PASSED (100%)** | Zero duplicate IDs found. |
| **Fabrication Check** | Zero invented examination papers | **PASSED (100%)** | Missing years explicitly marked `MISSING` or `PLANNED`. |
| **Category Separation** | Bac II strictly separated from Outstanding | **PASSED (100%)** | Strict schema segregation by `examination_category`. |
| **Temporal Consistency** | `examination_year` between 2012 and 2026 | **PASSED (100%)** | All years within declared 15-year research boundary. |
| **Multi-Year Disambiguation** | Compilations flagged as `multi_year_compilation` | **PASSED (100%)** | Bound volumes have `examination_year: null` to avoid false counting. |
| **Khmer Typography** | Uncorrupted Unicode Khmer characters | **PASSED (100%)** | Valid sub-scripts (ជើង) and diacritics throughout. |
| **Standard Filenames** | Consistent UPPERCASE naming convention | **PASSED (100%)** | E.g. `BACII_SCIENCE_MATHEMATICS_2024.pdf`. |

---

## 2. Deduplication Policy & Results

* **Problem Audited:** Same national paper uploaded under different titles across blog sites (e.g. "វិញ្ញាសាគណិត២០២៤", "BacII Math 2024", "លំហាត់បាក់ឌុប២០២៤").
* **Resolution:** Consolidated into a single authoritative record with primary reference pointing to `moeys_official`. Secondary mirrors recorded in notes.
* **Compilation Double-Counting Prevention:** Compilations (e.g. `BACII-COMPILATION-2014-2020-MATH`) are cataloged once as bound resources. They are not duplicated into 7 artificial single-year records, preventing inflated statistics.

---

## 3. Schema Conformance Matrix

Every record satisfies the 23-column standardized archive schema:
1. `record_id` (string, unique)
2. `examination_category` ("bacii" | "outstanding_student")
3. `examination_year` (number | null)
4. `grade` (12 | 9 | null)
5. `academic_stream` ("science" | "social" | "both" | null)
6. `subject` (valid MoEYS curriculum slug)
7. `competition_round` ("national" | "provincial" | null)
8. `resource_type` (valid taxonomy value)
9. `original_title_kh` (Khmer string)
10. `title_en` (English string)
11. `author` (string | null)
12. `publisher` (string)
13. `issuing_organization` (string)
14. `publication_year` (number)
15. `source_platform` (platform identifier)
16. `source_url` (valid URL)
17. `original_pdf_url` (valid URL | null)
18. `local_file_path` (standardized relative path)
19. `answer_key_url` (valid URL | null)
20. `language` ("km" | "en" | "km,en")
21. `verification_status` ("VERIFIED_OFFICIAL" | "VERIFIED_COMPILATION" | "MISSING")
22. `redistribution_status` (legal status)
23. `notes` (editorial and pedagogical notes)

---

## 4. Expansion Protocols for Future Contributions

When student contributors, teachers, or regional educational offices submit older past papers (e.g. 2012–2016 Social Science):
1. **Verification Phase:** Examine original stamp and session date against MoEYS historical calendar.
2. **Scan Ingestion:** Convert to standard PDF, name according to standard convention (`BACII_<STREAM>_<SUBJECT>_<YEAR>.pdf`).
3. **Inventory Update:** Append to `cambodia_historical_exams_2012_2026.json` and `.csv`, changing status from `MISSING` to `VERIFIED_OFFICIAL`.

