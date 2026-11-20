// ==============================================================================
// ScienceKH — Profile Repository (Parameterized & Injection-Guarded)
// Enforces UUID validation and parameterized PostgREST operations
// ==============================================================================

import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { assertValidUuid } from "@/lib/security/parameterized-query";

type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];

export class ProfileRepository {
  /**
   * Fetch user profile by ID using parameterized query
   */
  static async getProfile(userId: string) {
    const safeUserId = assertValidUuid(userId, "userId");

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", safeUserId)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  /**
   * Update student profile fields with parameterized user ID
   */
  static async updateProfile(userId: string, updates: ProfileUpdate) {
    const safeUserId = assertValidUuid(userId, "userId");

    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", safeUserId);

    if (error) throw error;
    return data;
  }

  /**
   * Increment student streak and XP
   */
  static async awardXpAndStreak(userId: string, earnedXp: number) {
    const safeUserId = assertValidUuid(userId, "userId");
    const profile = await this.getProfile(safeUserId);
    if (!profile) return null;

    const newXp = (profile.xp ?? 0) + earnedXp;
    const newStreak = Math.max(1, (profile.streak_days ?? 0) + 1);

    return this.updateProfile(safeUserId, {
      xp: newXp,
      streak_days: newStreak,
    });
  }
}
