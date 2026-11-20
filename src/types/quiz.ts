export type QuestionType =
  | "mcq"
  | "fill_blank"
  | "order_steps"
  | "formula_drag"
  | "matching";

export interface QuizQuestionOption {
  id: string;
  label_km: string;
  label_en: string;
}

export interface QuizQuestion {
  id: string;
  lesson_id: string;
  question_type: QuestionType;
  prompt_km: string;
  prompt_en: string;
  options: QuizQuestionOption[];
  explanation_km?: string;
  explanation_en?: string;
  formula_badge?: string;
  hint_km?: string;
  hint_en?: string;
}

export interface QuizAnswerSubmission {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
}

export interface QuizSubmissionPayload {
  lessonId: string;
  gradeLevel?: number;
  subject?: string;
  answers: QuizAnswerSubmission[];
}

export interface QuizEvaluationResult {
  passed: boolean;
  accuracy: number;
  correctCount: number;
  totalQuestions: number;
  xpEarned: number;
  coinsEarned: number;
  heartsRemaining: number;
  streak: {
    current: number;
    longest: number;
    incremented: boolean;
  };
}

