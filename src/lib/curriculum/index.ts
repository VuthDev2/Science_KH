import { CuratedLesson } from "./types";
import { GRADE_7_LESSONS } from "./grade7";
import { GRADE_8_LESSONS } from "./grade8";
import { GRADE_9_LESSONS } from "./grade9";
import { GRADE_10_LESSONS } from "./grade10";
import { GRADE_11_LESSONS } from "./grade11";
import { GRADE_12_LESSONS } from "./grade12";
import { HUMANITIES_LESSONS } from "./humanities";

export * from "./types";
export { GRADE_7_LESSONS } from "./grade7";
export { GRADE_8_LESSONS } from "./grade8";
export { GRADE_9_LESSONS } from "./grade9";
export { GRADE_10_LESSONS } from "./grade10";
export { GRADE_11_LESSONS } from "./grade11";
export { GRADE_12_LESSONS } from "./grade12";
export { HUMANITIES_LESSONS } from "./humanities";

/**
 * ScienceKH — Master MoEYS National Curriculum Bank (Grades 7–12)
 * Complete coverage across Sciences, Languages, Social Sciences & Technology:
 * Mathematics, Physics, Chemistry, Biology, Earth Science, Khmer Literature,
 * English, History, Geography, ICT, and Moral/Civics.
 */
export const ALL_CURATED_LESSONS: CuratedLesson[] = [
  ...GRADE_7_LESSONS,
  ...GRADE_8_LESSONS,
  ...GRADE_9_LESSONS,
  ...GRADE_10_LESSONS,
  ...GRADE_11_LESSONS,
  ...GRADE_12_LESSONS,
  ...HUMANITIES_LESSONS,
];

export const isUUID = (str: string): boolean => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);
};

export const getCuratedLesson = (id: string): CuratedLesson | undefined => {
  return ALL_CURATED_LESSONS.find((l) => l.id === id);
};

export const getNextCuratedLesson = (currentId: string): CuratedLesson | undefined => {
  const current = getCuratedLesson(currentId);
  if (!current) return undefined;

  // 1. Next lesson in the same grade and subject
  const sameSubjectLessons = ALL_CURATED_LESSONS.filter(
    (l) => l.grade === current.grade && l.subject.slug === current.subject.slug,
  );
  const subjectIndex = sameSubjectLessons.findIndex((l) => l.id === currentId);
  if (subjectIndex >= 0 && subjectIndex < sameSubjectLessons.length - 1) {
    return sameSubjectLessons[subjectIndex + 1];
  }

  // 2. Next subject in the same grade
  const gradeLessons = ALL_CURATED_LESSONS.filter((l) => l.grade === current.grade);
  const gradeIndex = gradeLessons.findIndex((l) => l.id === currentId);
  if (gradeIndex >= 0 && gradeIndex < gradeLessons.length - 1) {
    return gradeLessons[gradeIndex + 1];
  }

  // 3. Next lesson in the master bank
  const masterIndex = ALL_CURATED_LESSONS.findIndex((l) => l.id === currentId);
  if (masterIndex >= 0 && masterIndex < ALL_CURATED_LESSONS.length - 1) {
    return ALL_CURATED_LESSONS[masterIndex + 1];
  }

  return undefined;
};
