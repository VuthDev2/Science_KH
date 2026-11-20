export type GradeLevel = 7 | 8 | 9 | 10 | 11 | 12;

export type StemSubjectSlug =
  | "mathematics"
  | "physics"
  | "chemistry"
  | "biology"
  | "earth"
  | "khmer"
  | "english"
  | "ict"
  | "history"
  | "geography";

export interface SubjectMeta {
  slug: StemSubjectSlug;
  name_km: string;
  name_en: string;
  icon: string;
  color?: string;
}

export interface CurriculumLesson {
  id: string;
  grade: GradeLevel;
  subject: StemSubjectSlug;
  lesson_number: number;
  title_km: string;
  title_en: string;
  summary_km: string;
  summary_en: string;
  body_km: string;
  body_en: string;
  estimated_minutes: number;
  xp_reward: number;
  is_published: boolean;
  unit_title_km?: string;
  unit_title_en?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CurriculumUnit {
  unitId: string;
  unitNumber: number;
  titleKm: string;
  titleEn: string;
  lessons: {
    id: string;
    lessonNumber: number;
    titleKm: string;
    titleEn: string;
    xpReward: number;
    completed: boolean;
    exerciseCount: number;
  }[];
}

