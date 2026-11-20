import { ApiClient } from "./client";
import type { CurriculumUnit } from "@/types/curriculum";

export interface GradeCatalogItem {
  grade: number;
  titleKm: string;
  titleEn: string;
  subjectsCount: number;
  examFocus: string;
}

export class CurriculumApiService {
  /**
   * Fetch all supported grades and available STEM subjects
   */
  static async getGrades() {
    return ApiClient.get<GradeCatalogItem[]>("/api/curriculum/grades");
  }

  /**
   * Fetch specific grade details
   */
  static async getGradeById(grade: number) {
    return ApiClient.get<GradeCatalogItem>(`/api/curriculum/grade/${grade}`);
  }

  /**
   * Fetch units and lessons for a grade and subject
   */
  static async getLessonsByGradeAndSubject(grade: number, subject: string) {
    return ApiClient.get<CurriculumUnit[]>(`/api/curriculum/lessons/${grade}/${subject}`);
  }
}

