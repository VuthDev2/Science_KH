// ==============================================================================
// ScienceKH — Historical National Examination Archive Schema
// Strict Architectural Standards:
//   1. Separation of Actual Examination Year vs Publication Year vs Multi-Year Coverage
//   2. Separation of Source Platform vs Author vs Publisher vs Issuing Organization
//   3. Separation of Individual Past Exams vs Multi-Year Compilations vs Practice Papers
//   4. Elimination of Unsupported / Fabricated Coefficients, Marks, & Durations
// ==============================================================================

export type ExamCategory = "bacii" | "brevet" | "outstanding_student";

export type ExamStream = "science" | "social" | "both";

export type ExamSubject =
  | "mathematics"
  | "physics"
  | "chemistry"
  | "biology"
  | "earth"
  | "khmer"
  | "english"
  | "history"
  | "geography"
  | "moral_civics"
  | "french";

export type CompetitionRound = "national" | "provincial" | "school_selection";
export type CompetitionStage = CompetitionRound;

export type ResourceType =
  | "individual_past_exam" // វិញ្ញាសាប្រឡងទោលប្រចាំឆ្នាំ (Single Year Actual Past Exam)
  | "multi_year_collection" // កម្រងវិញ្ញាសាច្រើនឆ្នាំ (Compiled collection across multiple years)
  | "practice_examination" // វិញ្ញាសាត្រៀម ឬសាកល្បង (Practice exam by teachers/schools)
  | "answer_key_solution" // អត្រាកំណែ ឬដំណោះស្រាយ (Marking scheme or solution guide)
  | "curriculum_study_material"; // ឯកសារជំនួយស្មារតីសិក្សា (Curriculum study/reference material)

export type SourcePlatform =
  | "moeys_official" // ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS Official Archive)
  | "sala_moeys" // ថ្នាលសាលាឌីជីថល MoEYS (sala.moeys.gov.kh)
  | "ptec_library" // បណ្ណាល័យវិទ្យាស្ថានគរុកោសល្យ PTEC
  | "khmer_bac_ii_archive" // បណ្ណាសារប្រវត្តិសាស្ត្រ Khmer Bac II
  | "community_archive"; // បណ្ណាសារសហគមន៍អប់រំ

export type SourceVerificationStatus =
  | "verified_official" // Official MoEYS exam verified by gazetted circular
  | "verified_compilation" // Authentic bound multi-year compilation
  | "verified_teacher" // Authentic teacher/school practice collection
  | "needs_review" // Incomplete or questionable metadata requiring review
  | "planned"; // Future session (2025, 2026)

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
  examinationCategory: ExamCategory; // "bacii" | "outstanding_student"
  grade: 9 | 12 | null; // 12 for Bac II, 9 or 12 for Outstanding
  stream: ExamStream | null; // "science" | "social" for Bac II, null for Outstanding
  subject: ExamSubject;
  competitionRound: CompetitionRound | null; // For Outstanding Students only
  resourceType: ResourceType;

  // Temporal Separation (CRITICAL)
  examinationYear: number | null; // Actual year exam was conducted (null if unknown/compilation)
  publicationYear: number | null; // Year document/book was published
  coverageStartYear: number | null; // Beginning of compiled collection
  coverageEndYear: number | null; // End of compiled collection

  // Titles & Linguistic Metadata
  originalTitleKh: string;
  titleEn: string;

  // Source Attribution & Provenance Separation (CRITICAL)
  sourcePlatform: SourcePlatform;
  originalSourceUrl: string;
  actualAuthor: string | null; // e.g. "វិទ្យាល័យ អង្គសង្កែ" or "ខែម ពុទ្ធី" or null
  publisher: string | null; // e.g. "សែម វាសនា" or "MoEYS"
  issuingOrganization: string | null; // e.g. "MoEYS Cambodia" or null
  sourceVerificationStatus: SourceVerificationStatus;

  // Verified Content & Storage
  pdfUrl: string | null; // Verified active download/view URL
  localFilePath: string | null; // Local stored path
  hasOfficialAnswerKey: boolean;
  answerKeyUrl: string | null;

  // Document-verified metadata only (null if unverified on physical paper)
  sessionDateKm: string | null;
  durationMinutes: number | null; // Only if verified on physical document, else null
  totalMarks: number | null; // Only if verified on physical document, else null
  coefficient: number | null; // Only if verified on physical document, else null

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
  notes?: string | null;

  // Compatibility getters/aliases for smooth migration
  examCategory?: ExamCategory;
  examYear?: number | null;
  competitionStage?: CompetitionRound | null;
  author?: string | null;
  sourceUrl?: string | null;
}

// Backward-compatible interface for any external references
export type OfficialExamPaper = HistoricalExamPaper;
export type ExamPaper = HistoricalExamPaper;
export type ExamFilter = {
  category?: ExamCategory;
  stream?: ExamStream;
  grade?: 9 | 12;
  subject?: ExamSubject;
  year?: number;
};
