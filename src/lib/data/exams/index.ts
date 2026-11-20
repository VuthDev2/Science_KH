// ==============================================================================
// ScienceKH — Unified Historical National Examination Archive (2011–2024)
// Complete Database of MoEYS Examination Papers & Questions Across All Subjects
// ==============================================================================

import type { HistoricalExamPaper } from "@/types/exam";
import { BACII_SCIENCE_PAPERS } from "./bacii-science-archive";
import { BACII_SOCIAL_PAPERS } from "./bacii-social-archive";
import { BREVET_PAPERS } from "./brevet-archive";
import { OLYMPIAD_PAPERS } from "./olympiad-archive";

export { MOEYS_BACII_SESSIONS } from "./session-dates";

/**
 * All verified historical exam papers from 2011 to 2024 across all subjects
 */
export const UNIFIED_HISTORICAL_EXAM_ARCHIVE: HistoricalExamPaper[] = [
  ...BACII_SCIENCE_PAPERS,
  ...BACII_SOCIAL_PAPERS,
  ...BREVET_PAPERS,
  ...OLYMPIAD_PAPERS,
];

/**
 * Timeline of completed national exam sessions (2011 to 2024)
 */
export const HISTORICAL_YEARS_TIMELINE = [
  2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011,
] as const;

/**
 * Lookup helper to retrieve a paper by ID
 */
export function getExamPaperById(id: string): HistoricalExamPaper | undefined {
  return UNIFIED_HISTORICAL_EXAM_ARCHIVE.find((p) => p.id === id);
}

/**
 * Filter helper by year, category, and stream
 */
export function getExamPapersByYear(
  year: number,
  category: "bacii" | "brevet" | "outstanding_student" = "bacii",
  stream?: "science" | "social",
): HistoricalExamPaper[] {
  return UNIFIED_HISTORICAL_EXAM_ARCHIVE.filter((p) => {
    if (p.examinationYear !== year && p.examYear !== year) return false;
    if (p.examinationCategory !== category) return false;
    if (stream && p.stream !== stream && p.stream !== "both") return false;
    return true;
  });
}
