// ==============================================================================
// ScienceKH — Historical National Examination Types & Schema
// Covers Centralized Cambodian Historical Examination Archive (2012 to Present)
// ==============================================================================

export type ExamCategory = "bacii" | "outstanding_student";

export type ExamStream = "science" | "social" | "both";

export type ExamSubject =
  | "mathematics"
  | "physics"
  | "chemistry"
  | "biology"
  | "khmer"
  | "history"
  | "geography"
  | "english"
  | "earth";

export type CompetitionStage = "national" | "provincial" | "school_selection";

export type ExamResourceType =
  | "single_exam"               // វិញ្ញាសាប្រឡងទោលប្រចាំឆ្នាំ (Single Year Exam)
  | "multi_year_compilation"    // កម្រងវិញ្ញាសាច្រើនឆ្នាំ (Multi-Year Compilation Book)
  | "official_solution_book";   // សៀវភៅអត្រាកំណែផ្លូវការ (Official Marking Book)

export type SourcePlatform =
  | "moeys_official"            // ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS Official Archive)
  | "sala_moeys"                // ថ្នាលសាលាឌីជីថល MoEYS (sala.moeys.gov.kh)
  | "open_edu";                 // ការអប់រំបើកទូលាយ

export interface ExamQuestion {
  questionNumber: number;
  points: number | null;
  titleKm: string;
  titleEn: string;
  problemTextKm: string;
  problemTextEn: string;
  officialSolutionKm: string | null;
  officialSolutionEn: string | null;
  scoringCriteriaKm: string[];
  keyFormulas: string[];
}

export interface HistoricalExamPaper {
  id: string;
  examCategory: ExamCategory;             // "bacii" | "outstanding_student"
  examYear: number | null;                // Actual exam session year (e.g. 2024, 2017)
  coverageStartYear: number | null;       // For multi-year books (e.g. 2014)
  coverageEndYear: number | null;         // For multi-year books (e.g. 2020)
  grade: 9 | 12 | null;                   // 12 for Bac II, 9 or 12 for Outstanding Students
  stream: ExamStream | null;              // "science" | "social" for Bac II, null for Outstanding
  subject: ExamSubject;
  competitionStage: CompetitionStage | null; // "national" | "provincial" for Outstanding Students
  resourceType: ExamResourceType;
  originalTitleKh: string;
  titleEn: string;
  author: string | null;
  publisher: string | null;
  issuingOrganization: string | null;
  sourcePlatform: SourcePlatform;
  publicationYear: number | null;
  language: "km" | "en" | "bilingual";
  pdfUrl: string | null;
  answerKeyUrl: string | null;
  sourceUrl: string | null;
  hasOfficialAnswerKey: boolean;
  durationMinutes: number | null;
  totalMarks: number | null;
  coefficient: number | null;
  topicsKm: string[];
  topicsEn: string[];
  overviewKm: string;
  overviewEn: string;
  essentialFormulaSheet: {
    nameKm: string;
    nameEn: string;
    formula: string;
    noteKm?: string;
  }[];
  questions: ExamQuestion[];
}

// Backward-compatible interface for any legacy references
export interface ExamPaper {
  id: string;
  examType: "brevet_grade_9" | "bacii_grade_12";
  year: number;
  subject: "physics" | "chemistry" | "biology" | "mathematics";
  titleKm: string;
  titleEn: string;
  difficulty: "normal" | "hard" | "olympiad";
  questionsCount: number;
  durationMinutes: number;
  hasOfficialSolution: boolean;
  sampleQuestionKm: string;
  solutionSummaryKm: string;
}

export interface ExamFilter {
  category?: ExamCategory;
  stream?: ExamStream;
  grade?: 9 | 12;
  subject?: ExamSubject;
  year?: number;
  stage?: CompetitionStage;
  search?: string;
}
