import { ApiClient } from "./client";
import type { StudentProfile } from "@/types/gamification";
import type { QuizSubmissionPayload, QuizEvaluationResult } from "@/types/quiz";

export class QuizApiService {
  /**
   * Fetch real-time student gamification state (XP, streak, hearts, coins)
   */
  static async getGamificationStatus() {
    return ApiClient.get<StudentProfile>("/api/quiz/gamification-status");
  }

  /**
   * Refill 1 heart using coins
   */
  static async refillHearts(coinsCost = 20) {
    return ApiClient.post<{ hearts: number; coins: number }>("/api/quiz/refill-hearts", {
      coinsCost,
    });
  }

  /**
   * Submit quiz answers for scoring and gamification rewards
   */
  static async submitQuiz(payload: QuizSubmissionPayload) {
    return ApiClient.post<QuizEvaluationResult>("/api/quiz/submit", payload);
  }
}

