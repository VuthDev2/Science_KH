export type SupportedGrade = 7 | 8 | 9 | 10 | 11 | 12;

export type SupportedSubject = "physics" | "chemistry" | "biology" | "mathematics";

export interface StudentProfile {
  id: string;
  fullName: string;
  gradeLevel: SupportedGrade;
  preferredLang: "km" | "en";
  xp: number;
  coins: number;
  hearts: number;
  lastHeartLostAt: string | null;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
  leagueTier: "bronze" | "silver" | "gold" | "sapphire" | "ruby" | "emerald" | "diamond";
  isPremium: boolean;
}

export interface QuizSubmission {
  lessonId: string;
  gradeLevel: SupportedGrade;
  subject: SupportedSubject;
  answers: {
    questionId: string;
    selectedOptionId: string;
    isCorrect: boolean;
  }[];
}

export interface ExamFilter {
  examType?: "brevet_grade_9" | "bacii_grade_12";
  subject?: SupportedSubject;
  year?: number;
}

