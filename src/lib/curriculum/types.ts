// ==============================================================================
// ScienceKH — Official Cambodian MoEYS STEM Curriculum Types
// Aligned with the National Ministry of Education, Youth and Sport Standards
// ==============================================================================

export interface PracticeExerciseOption {
  labelKm: string;
  labelEn: string;
  isCorrect: boolean;
}

export interface PracticeExercise {
  id: string;
  titleKm?: string;
  titleEn?: string;
  questionKm: string;
  questionEn: string;
  formulaOrContext?: string;
  options: PracticeExerciseOption[];
  stepByStepSolutionKm: string;
  stepByStepSolutionEn: string;
  tipKm?: string;
}

export interface CuratedLesson {
  id: string;
  grade: number;
  sort_order: number;
  title_km: string;
  title_en: string;
  summary_km: string;
  summary_en: string;
  body_km: string;
  body_en: string;
  xp_reward: number;
  estimated_minutes: number;
  cover_image_url?: string | null;
  lessonType?: "concept" | "practice" | "checkpoint" | "exam_prep";
  subject: {
    slug: string;
    name_km: string;
    name_en: string;
  };
  quiz?: {
    id: string;
  };
  practiceExercises?: PracticeExercise[];
}

export const SUBJECT_METADATA = {
  mathematics: { slug: "mathematics", name_km: "គណិតវិទ្យា", name_en: "Mathematics" },
  physics: { slug: "physics", name_km: "រូបវិទ្យា", name_en: "Physics" },
  chemistry: { slug: "chemistry", name_km: "គីមីវិទ្យា", name_en: "Chemistry" },
  biology: { slug: "biology", name_km: "ជីវវិទ្យា", name_en: "Biology" },
  earth: { slug: "earth", name_km: "ផែនដី និងបរិស្ថានវិទ្យា", name_en: "Earth Science" },
  khmer: { slug: "khmer", name_km: "ភាសាខ្មែរ", name_en: "Khmer Literature" },
  english: { slug: "english", name_km: "ភាសាអង់គ្លេស", name_en: "English" },
  history: { slug: "history", name_km: "ប្រវត្តិវិទ្យា", name_en: "History" },
  geography: { slug: "geography", name_km: "ភូមិវិទ្យា", name_en: "Geography" },
  ict: { slug: "ict", name_km: "ព័ត៌មានវិទ្យា", name_en: "ICT & Computing" },
  morality: { slug: "morality", name_km: "សីលធម៌ និងពលរដ្ឋវិជ្ជា", name_en: "Moral & Civics" },
} as const;
