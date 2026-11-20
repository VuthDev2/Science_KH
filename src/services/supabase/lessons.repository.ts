// ==============================================================================
// ScienceKH — Lessons Repository (Parameterized & Injection-Guarded)
// Enforces strict parameter validation before executing PostgREST parameterized calls
// ==============================================================================

import { supabase } from "@/integrations/supabase/client";
import {
  assertValidInteger,
  assertValidSlug,
  assertValidUuid,
} from "@/lib/security/parameterized-query";

export class LessonsRepository {
  /**
   * Fetch subjects list from Supabase
   */
  static async getSubjects() {
    const { data, error } = await supabase
      .from("subjects")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) throw error;
    return data ?? [];
  }

  /**
   * Fetch published lessons by subject slug and grade using safe parameterized filters
   */
  static async getLessonsByGradeAndSubject(grade: number, subjectSlug?: string) {
    const safeGrade = assertValidInteger(grade, 7, 12, "grade");
    let subjectId: string | undefined;

    if (subjectSlug && subjectSlug !== "all") {
      const safeSlug = assertValidSlug(subjectSlug, "subjectSlug");
      const { data: subObj, error: subErr } = await supabase
        .from("subjects")
        .select("id")
        .eq("slug", safeSlug)
        .maybeSingle();

      if (subErr) throw subErr;
      subjectId = subObj?.id;
    }

    let query = supabase
      .from("lessons")
      .select("*, subjects(name_en, name_km, slug)")
      .eq("grade", safeGrade)
      .eq("is_published", true)
      .order("sort_order", { ascending: true });

    if (subjectId) {
      const safeSubId = assertValidUuid(subjectId, "subjectId");
      query = query.eq("subject_id", safeSubId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  }

  /**
   * Fetch completed lesson IDs for a student using parameterized user_id
   */
  static async getUserCompletedLessonIds(userId: string): Promise<string[]> {
    const safeUserId = assertValidUuid(userId, "userId");

    const { data, error } = await supabase
      .from("lesson_progress")
      .select("lesson_id")
      .eq("user_id", safeUserId)
      .eq("status", "completed");

    if (error) throw error;
    return (data ?? []).map((row) => row.lesson_id);
  }

  /**
   * Mark lesson completed for user with parameterized upsert
   */
  static async markLessonCompleted(userId: string, lessonId: string) {
    const safeUserId = assertValidUuid(userId, "userId");
    if (!lessonId || typeof lessonId !== "string") {
      throw new Error("Security validation failed: lessonId must be a non-empty string.");
    }

    const trimmedId = lessonId.trim();
    const isUuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(trimmedId);

    // Only persist directly to lesson_progress table if lessonId is a valid UUID
    if (!isUuidPattern) {
      return null;
    }

    const { data, error } = await supabase
      .from("lesson_progress")
      .upsert({
        user_id: safeUserId,
        lesson_id: trimmedId,
        status: "completed",
        completed_at: new Date().toISOString(),
      });

    if (error) throw error;
    return data;
  }
}
