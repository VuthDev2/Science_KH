import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import type { Lang } from "@/lib/i18n";

export interface StudentProfile {
  display_name: string | null;
  full_name: string | null;
  language: "km" | "en";
  grade: number | null;
  xp: number;
  streak_days: number;
  coins?: number;
  league_tier?: string;
  avatar_url?: string | null;
}

export function useProfile() {
  const { user } = useAuth();

  const q = useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("display_name, full_name, language, grade, xp, streak_days, coins, avatar_url")
        .eq("id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const fallbackProfile: StudentProfile | null = user
    ? {
        display_name:
          (user.user_metadata?.display_name as string) ||
          (user.user_metadata?.full_name as string) ||
          user.email?.split("@")[0] ||
          "Student",
        full_name: (user.user_metadata?.full_name as string) || null,
        language: ((user.user_metadata?.language as string) === "en" ? "en" : "km") as "km" | "en",
        grade: (user.user_metadata?.grade as number) || 12,
        xp: 0,
        streak_days: 1,
        coins: 50,
        avatar_url: "angkor",
      }
    : null;

  const profileData: StudentProfile | null = (q.data as StudentProfile | null) ?? fallbackProfile;
  const lang: Lang = (profileData?.language as Lang) ?? "km";

  return { ...q, data: profileData, lang };
}

export function useRoles() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["roles", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user!.id);
      if (error) throw error;
      return (data ?? []).map((r) => r.role as "admin" | "editor" | "student");
    },
  });
}
