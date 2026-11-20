// ==============================================================================
// ScienceKH — RAG AI Tutor Domain Types & Schemas
// MoEYS National Curriculum Framework for Grades 7 to 12
// ==============================================================================

export type TutorPedagogicalMode =
  | "ask_sciencekh"       // Open questions about lessons and concepts
  | "explain_my_answer"   // Diagnostic analysis of student's attempted answer
  | "explain_lesson"      // Intuitive, simplified lesson concept explanation
  | "give_hint"           // Socratic hint without giving away the full answer
  | "show_example"        // Grade-level worked example with step-by-step reasoning
  | "practice_with_me";   // Interactive drill exercise matched to the lesson

export interface StudentLearningContext {
  grade: number; // 7 to 12
  subjectSlug: string; // "mathematics", "physics", "chemistry", etc.
  stream?: "all" | "science" | "social_science";
  lessonId?: string;
  lessonTitle?: string;
  unitTitle?: string;
  language: "km" | "en";
}

export type KnowledgeSourceType =
  | "moeys_textbook"
  | "reference_library"
  | "exam_archive"
  | "worked_example"
  | "sciencekh_supplementary"
  | "teacher_rubric";

export interface SourceCitation {
  id: string;
  documentTitle: string;
  grade: number;
  subjectSlug: string;
  chapterOrLesson?: string;
  pageNumber?: number;
  organization: string;
  url?: string;
  isOfficial: boolean;
  verificationStatus: "verified" | "pending_review" | "supplementary";
  relevanceSnippet: string;
}

export interface KnowledgeChunk {
  id: string;
  grade: number;
  subjectSlug: string;
  stream: "all" | "science" | "social_science";
  sourceTitle: string;
  sourcePage?: number;
  sourceType: KnowledgeSourceType;
  verificationStatus: "verified" | "pending_review" | "supplementary";
  language: "km" | "en" | "mixed";
  sectionHeading?: string;
  content: string;
  plainTextSummary?: string;
  formulas: string[];
  symbols: string[];
  keyTerms: string[];
  metadata?: Record<string, unknown>;
  relevanceScore?: number;
}

export interface RetrievedContext {
  chunks: KnowledgeChunk[];
  citations: SourceCitation[];
  highestRelevance: number;
  matchedCategories: string[];
}

export interface ExplainAnswerInput {
  question: string;
  studentAnswer: string;
  subjectSlug: string;
  grade: number;
  lessonTitle?: string;
  language: "km" | "en";
}

export interface TutorChatRequest {
  conversationId: string;
  userMessage: string;
  mode?: TutorPedagogicalMode;
  context: StudentLearningContext;
  attemptedAnswer?: string; // If mode is "explain_my_answer"
}

export interface RAGResponse {
  reply: string;
  sources: SourceCitation[];
  suggestedQuestions: string[];
  mode: TutorPedagogicalMode;
  isGroundedInCurriculum: boolean;
}

export interface TutorFeedbackRequest {
  conversationId: string;
  messageId: string;
  isHelpful: boolean;
  ratingScore?: number;
  feedbackCategory?: "inaccurate" | "confusing" | "unsupported_grade" | "great_explanation" | "too_complex" | "other";
  feedbackComment?: string;
}

export const PEDAGOGICAL_MODE_LABELS: Record<
  TutorPedagogicalMode,
  { labelKm: string; labelEn: string; icon: string; descriptionKm: string; descriptionEn: string }
> = {
  ask_sciencekh: {
    labelKm: "សួរសំណួរមេរៀន",
    labelEn: "Ask ScienceKH",
    icon: "💬",
    descriptionKm: "សួរចម្ងល់មេរៀន និងស្វែងយល់គោលគំនិតវិទ្យាសាស្ត្រ",
    descriptionEn: "Ask open questions about your lessons and science concepts",
  },
  explain_my_answer: {
    labelKm: "ពន្យល់ចម្លើយខ្ញុំ",
    labelEn: "Explain My Answer",
    icon: "🔍",
    descriptionKm: "ពិនិត្យចម្លើយដែលអ្នកបានធ្វើ និងរកចំណុចខ្វះខាត",
    descriptionEn: "Check your attempted answer to pinpoint mistakes and learn",
  },
  explain_lesson: {
    labelKm: "ពន្យល់មេរៀនសង្ខេប",
    labelEn: "Explain This Lesson",
    icon: "📖",
    descriptionKm: "ការពន្យល់បែបងាយយល់ ជាមួយឧទាហរណ៍ជាក់ស្តែង",
    descriptionEn: "Get simple, intuitive explanations of difficult topics",
  },
  give_hint: {
    labelKm: "សុំគន្លឹះដោះស្រាយ",
    labelEn: "Give Me a Hint",
    icon: "💡",
    descriptionKm: "ទទួលបានការណែនាំជាជំហានៗ ដោយមិនប្រាប់ចម្លើយស្រេច",
    descriptionEn: "Get step-by-step Socratic hints without spoiling the answer",
  },
  show_example: {
    labelKm: "បង្ហាញឧទាហរណ៍",
    labelEn: "Show Me an Example",
    icon: "📐",
    descriptionKm: "លំហាត់គំរូជាមួយដំណោះស្រាយលម្អិតតាមកម្រិតថ្នាក់",
    descriptionEn: "See grade-appropriate worked examples with steps",
  },
  practice_with_me: {
    labelKm: "ហាត់សមជាមួយគ្រូ",
    labelEn: "Practice With Me",
    icon: "✍️",
    descriptionKm: "ទទួលលំហាត់ហាត់សមថ្មីៗ ស្របតាមមេរៀនដែលកំពុងរៀន",
    descriptionEn: "Receive custom practice drills matched to your lesson",
  },
};
