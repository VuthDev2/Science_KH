import { ApiClient } from "./client";
import type { ExamPaper, ExamFilter } from "@/types/exam";

export class ExamApiService {
  /**
   * List past BacII & Brevet exams with optional filters
   */
  static async getExams(filters?: ExamFilter) {
    return ApiClient.get<ExamPaper[]>("/api/exams", filters as Record<string, string | number>);
  }

  /**
   * Fetch specific exam details
   */
  static async getExamById(id: string) {
    return ApiClient.get<ExamPaper>(`/api/exams/${id}`);
  }
}

