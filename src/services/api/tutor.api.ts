import { ApiClient } from "./client";

export class TutorApiService {
  /**
   * Send question to AI tutor (Socratic dialogue)
   */
  static async askTutor(params: {
    message: string;
    gradeLevel?: number;
    subject?: string;
    language?: "km" | "en";
  }) {
    return ApiClient.post<{ reply: string }>("/api/tutor/chat", params);
  }
}

