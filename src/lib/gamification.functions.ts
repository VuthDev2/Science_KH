import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { assertValidUuid, assertValidInteger } from "@/lib/security/parameterized-query";

/**
 * Records lesson completion, awards XP/coins, and maintains daily streak.
 * Guards against double-awarding by checking if the lesson was already completed.
 */
export const recordLessonCompletion = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator(
    (d: {
      lessonId: string;
      quizId: string;
      score: number;
      total: number;
      passed: boolean;
      answers: Record<string, number>;
      earnedXp: number;
    }) => d,
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { lessonId, quizId, score, total, passed, answers, earnedXp } = data;

    // Parameterized security: ensure userId and metrics are strictly validated
    const safeUserId = assertValidUuid(userId, "userId");
    const safeScore = assertValidInteger(score, 0, 100, "score");
    const safeTotal = assertValidInteger(total, 1, 100, "total");

    // Academic Integrity check: score cannot exceed total question count
    if (safeScore > safeTotal) {
      throw new Error("Academic integrity violation: score cannot exceed total question count.");
    }

    // Verify passing threshold (70% minimum per MoEYS standard)
    const calculatedPassed = safeScore / safeTotal >= 0.7;
    const verifiedPassed = passed && calculatedPassed;

    // Hard-cap XP reward per lesson to prevent XP inflation (max 50 XP per standard node)
    const safeEarnedXp = Math.min(assertValidInteger(earnedXp, 0, 100, "earnedXp"), 50);

    const isUUID = (str: string) =>
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);

    let isFirstCompletion = verifiedPassed;

    // 1. If lessonId is a valid UUID, interact with DB lesson_progress table
    if (isUUID(lessonId)) {
      try {
        const { data: existingProgress } = await supabase
          .from("lesson_progress")
          .select("id, status")
          .eq("user_id", safeUserId)
          .eq("lesson_id", lessonId)
          .maybeSingle();

        isFirstCompletion =
          verifiedPassed && (!existingProgress || existingProgress.status !== "completed");

        await supabase.from("lesson_progress").upsert(
          {
            user_id: safeUserId,
            lesson_id: lessonId,
            status: verifiedPassed ? "completed" : "in_progress",
            completed_at: verifiedPassed ? new Date().toISOString() : null,
          },
          { onConflict: "user_id,lesson_id" },
        );
      } catch (err) {
        console.warn("lesson_progress upsert skipped or errored:", err);
      }
    }

    // 2. Insert quiz attempt if quizId is a valid UUID
    if (isUUID(quizId)) {
      try {
        await supabase.from("quiz_attempts").insert({
          user_id: safeUserId,
          quiz_id: quizId,
          score: safeScore,
          total: safeTotal,
          passed: verifiedPassed,
          answers,
        });
      } catch (err) {
        console.warn("quiz_attempts insert skipped or errored:", err);
      }
    }

    // 4. Award XP, coins, and update streak only on first-time completion
    let newXp = 0;
    let newStreak = 0;
    let earnedCoins = 0;

    if (isFirstCompletion) {
      // Load current profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("xp, coins, streak_days, streak_last_updated_at")
        .eq("id", userId)
        .maybeSingle();

      const currentXp = profile?.xp ?? 0;
      const currentCoins = profile?.coins ?? 0;
      const currentStreakDays = profile?.streak_days ?? 0;
      const lastUpdatedAt = profile?.streak_last_updated_at ?? null;

      newXp = currentXp + earnedXp;
      earnedCoins = Math.floor(earnedXp / 4);
      const newCoins = currentCoins + earnedCoins;

      // Calculate streak using Cambodia time (UTC+7)
      const nowCambodiaMs = Date.now() + 7 * 3600 * 1000;
      const todayCambodia = new Date(nowCambodiaMs).toISOString().slice(0, 10);

      let newStreakDays: number;

      if (!lastUpdatedAt) {
        // First ever streak update
        newStreakDays = 1;
      } else {
        const lastDateMs = new Date(lastUpdatedAt).getTime() + 7 * 3600 * 1000;
        const lastDateCambodia = new Date(lastDateMs).toISOString().slice(0, 10);

        if (lastDateCambodia === todayCambodia) {
          // Already counted today — keep streak
          newStreakDays = currentStreakDays;
        } else {
          // Check if lastDate was yesterday
          const yesterdayMs = nowCambodiaMs - 24 * 3600 * 1000;
          const yesterdayCambodia = new Date(yesterdayMs).toISOString().slice(0, 10);

          if (lastDateCambodia === yesterdayCambodia) {
            // Consecutive day — increment
            newStreakDays = currentStreakDays + 1;
          } else {
            // Gap of more than 1 day — reset
            newStreakDays = 1;
          }
        }
      }

      newStreak = newStreakDays;

      // Update profile
      await supabase
        .from("profiles")
        .update({
          xp: newXp,
          coins: newCoins,
          streak_days: newStreak,
          streak_last_updated_at: new Date().toISOString(),
        })
        .eq("id", userId);
    }

    return {
      earnedXp: isFirstCompletion ? earnedXp : 0,
      earnedCoins,
      newXp,
      newStreak,
      isFirstCompletion,
      lessonId,
    };
  });

/**
 * Returns the authenticated user's lesson progress (completed + in_progress lesson IDs).
 */
export const getStudentProgress = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;

    const { data, error } = await supabase
      .from("lesson_progress")
      .select("lesson_id, status")
      .eq("user_id", userId);

    if (error || !data) {
      return { completedIds: [] as string[], inProgressIds: [] as string[] };
    }

    const completedIds = data.filter((r) => r.status === "completed").map((r) => r.lesson_id);

    const inProgressIds = data.filter((r) => r.status === "in_progress").map((r) => r.lesson_id);

    return { completedIds, inProgressIds };
  });
