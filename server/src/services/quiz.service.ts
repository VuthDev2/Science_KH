import { config } from "../config/env.js";

export interface StudentGamificationState {
  id: string;
  fullName: string;
  gradeLevel: number;
  xp: number;
  coins: number;
  hearts: number;
  lastHeartLostAt: string | null;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  leagueTier: "bronze" | "silver" | "gold" | "sapphire" | "ruby" | "emerald" | "diamond";
  isPremium: boolean;
}

// In-memory demo student state for local testing & fallback
let demoStudentState: StudentGamificationState = {
  id: "00000000-0000-0000-0000-000000000001",
  fullName: "សិស្សគំរូ ScienceKH (Demo Student)",
  gradeLevel: 12,
  xp: 450,
  coins: 120,
  hearts: 5,
  lastHeartLostAt: null,
  currentStreak: 7,
  longestStreak: 14,
  lastActiveDate: "2026-11-04",
  leagueTier: "diamond",
  isPremium: false,
};

export class QuizService {
  /**
   * Lazily check and restore hearts (1 heart every 30 minutes up to max 5)
   */
  private static checkHeartRegeneration() {
    if (demoStudentState.hearts < 5 && demoStudentState.lastHeartLostAt) {
      const elapsedMinutes =
        (Date.now() - new Date(demoStudentState.lastHeartLostAt).getTime()) / (1000 * 60);
      const restoredHearts = Math.floor(elapsedMinutes / 30);
      if (restoredHearts > 0) {
        demoStudentState.hearts = Math.min(5, demoStudentState.hearts + restoredHearts);
        demoStudentState.lastHeartLostAt =
          demoStudentState.hearts < 5 ? new Date().toISOString() : null;
      }
    }
  }

  /**
   * Get student's current gamification status
   */
  static getGamificationStatus() {
    this.checkHeartRegeneration();
    return {
      student: demoStudentState,
      timezone: config.cambodiaTimezone,
    };
  }

  /**
   * Purchase 1 heart with coins
   */
  static refillHeartsWithCoins(coinsCost = 20) {
    if (demoStudentState.hearts >= 5) {
      return { success: false, message: "Hearts are already at maximum (5)." };
    }
    if (demoStudentState.coins < coinsCost) {
      return { success: false, message: "Not enough coins to refill hearts." };
    }

    demoStudentState.coins -= coinsCost;
    demoStudentState.hearts = Math.min(5, demoStudentState.hearts + 1);
    if (demoStudentState.hearts === 5) {
      demoStudentState.lastHeartLostAt = null;
    }

    return {
      success: true,
      data: {
        hearts: demoStudentState.hearts,
        coins: demoStudentState.coins,
      },
    };
  }

  /**
   * Process a quiz submission
   */
  static processSubmission(submission: {
    lessonId: string;
    gradeLevel?: number;
    subject?: string;
    answers: { questionId: string; selectedOptionId: string; isCorrect: boolean }[];
  }) {
    this.checkHeartRegeneration();

    const { answers } = submission;
    const totalQuestions = answers.length;
    const correctCount = answers.filter((a) => a.isCorrect).length;
    const incorrectCount = totalQuestions - correctCount;
    const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 100;
    const passed = accuracy >= 60;

    // Deduct hearts for mistakes if not premium
    if (!demoStudentState.isPremium && incorrectCount > 0) {
      demoStudentState.hearts = Math.max(0, demoStudentState.hearts - incorrectCount);
      if (!demoStudentState.lastHeartLostAt) {
        demoStudentState.lastHeartLostAt = new Date().toISOString();
      }
    }

    // Calculate Cambodia date
    const cambodiaNow = new Date(
      new Date().toLocaleString("en-US", { timeZone: config.cambodiaTimezone })
    );
    const todayCambodiaStr = cambodiaNow.toISOString().slice(0, 10);

    // Calculate XP reward
    const xpEarned = passed ? 10 + correctCount * 5 : correctCount * 2;
    const coinsEarned = passed ? 5 : 1;

    demoStudentState.xp += xpEarned;
    demoStudentState.coins += coinsEarned;

    // Calculate Streak based on Cambodia timezone
    let streakIncremented = false;
    if (demoStudentState.lastActiveDate !== todayCambodiaStr) {
      const lastActive = new Date(demoStudentState.lastActiveDate);
      const today = new Date(todayCambodiaStr);
      const diffDays = Math.floor(
        (today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (diffDays === 1) {
        // Consecutive day
        demoStudentState.currentStreak += 1;
        streakIncremented = true;
      } else if (diffDays > 1) {
        // Streak broken
        demoStudentState.currentStreak = 1;
        streakIncremented = true;
      }

      if (demoStudentState.currentStreak > demoStudentState.longestStreak) {
        demoStudentState.longestStreak = demoStudentState.currentStreak;
      }
      demoStudentState.lastActiveDate = todayCambodiaStr;
    }

    return {
      passed,
      accuracy,
      correctCount,
      totalQuestions,
      xpEarned,
      coinsEarned,
      heartsRemaining: demoStudentState.hearts,
      streak: {
        current: demoStudentState.currentStreak,
        longest: demoStudentState.longestStreak,
        incremented: streakIncremented,
      },
      updatedStudent: demoStudentState,
    };
  }
}

