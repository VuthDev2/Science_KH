import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, GUEST_USER_ID } from "@/lib/auth-context";
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
  const qc = useQueryClient();
  const isGuest = user?.app_metadata?.provider === "guest" || user?.id === GUEST_USER_ID;

  const [localLang, setLocalLang] = useState<Lang>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sciencekh_lang");
      if (saved === "en" || saved === "km") return saved as Lang;
    }
    return "km";
  });

  // Listen to cross-window or local storage events
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "sciencekh_lang" && (e.newValue === "en" || e.newValue === "km")) {
        setLocalLang(e.newValue as Lang);
      }
    };
    const handleCustomChange = () => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("sciencekh_lang");
        if (saved === "en" || saved === "km") {
          setLocalLang(saved as Lang);
        }
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("sciencekh_lang_change", handleCustomChange);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("sciencekh_lang_change", handleCustomChange);
    };
  }, []);

  const q = useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user && !isGuest,
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

  const guestSaved = isGuest && typeof window !== "undefined" ? localStorage.getItem("sciencekh_guest_user") : null;
  const guestParsed = guestSaved ? JSON.parse(guestSaved) : null;
  const guestAvatar = isGuest && typeof window !== "undefined" ? (localStorage.getItem(`sciencekh_avatar_${user?.id}`) || localStorage.getItem("sciencekh_avatar_guest")) : null;

  const fallbackProfile: StudentProfile | null = user
    ? {
        display_name:
          (guestParsed?.user_metadata?.display_name as string) ||
          (user.user_metadata?.display_name as string) ||
          (user.user_metadata?.full_name as string) ||
          user.email?.split("@")[0] ||
          "Student",
        full_name: (guestParsed?.user_metadata?.full_name as string) || (user.user_metadata?.full_name as string) || null,
        language: (((guestParsed?.user_metadata?.language || user.user_metadata?.language) as string) === "en" ? "en" : "km") as "km" | "en",
        grade: (guestParsed?.user_metadata?.grade as number) || (user.user_metadata?.grade as number) || 12,
        xp: (guestParsed?.user_metadata?.xp as number) ?? 0,
        streak_days: (guestParsed?.user_metadata?.streak_days as number) ?? 1,
        coins: (guestParsed?.user_metadata?.coins as number) ?? 50,
        avatar_url: guestAvatar || (guestParsed?.user_metadata?.avatar_url as string) || "angkor",
      }
    : null;

  const profileData: StudentProfile | null = (q.data as StudentProfile | null) ?? fallbackProfile;
  const dbLang = (profileData?.language as Lang) ?? "km";
  // localLang takes precedence for instant switching, then database, default "km"
  const lang: Lang = localLang || dbLang;

  const setLanguage = async (newLang: Lang) => {
    setLocalLang(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("sciencekh_lang", newLang);
      window.dispatchEvent(new Event("sciencekh_lang_change"));
    }
    if (user) {
      if (isGuest) {
        try {
          const saved = localStorage.getItem("sciencekh_guest_user");
          const current = saved ? JSON.parse(saved) : user;
          current.user_metadata = { ...(current.user_metadata || {}), language: newLang };
          localStorage.setItem("sciencekh_guest_user", JSON.stringify(current));
        } catch {}
      } else {
        try {
          await supabase.from("profiles").update({ language: newLang }).eq("id", user.id);
        } catch {
          // silent
        }
      }
    }
    qc.invalidateQueries({ queryKey: ["profile"] });
  };

  return { ...q, data: profileData, lang, setLanguage };
}

export function useRoles() {
  const { user } = useAuth();
  const isGuest = user?.app_metadata?.provider === "guest" || user?.id === GUEST_USER_ID;

  return useQuery({
    queryKey: ["roles", user?.id],
    enabled: !!user && !isGuest,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user!.id);
      if (error) throw error;
      return (data ?? []).map((r) => r.role as "admin" | "editor" | "student");
    },
    initialData: isGuest ? (["student"] as ("admin" | "editor" | "student")[]) : undefined,
  });
}
