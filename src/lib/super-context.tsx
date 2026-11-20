// ==============================================================================
// ScienceKH — Super ScienceKH Subscription & Hearts Context
// Modeled after Super Duolingo's iconic gamification & learning mechanics:
//   1. Unlimited Hearts (❤️ ∞)
//   2. AI Smart Mistake Vault (ធនាគារកែកំហុស)
//   3. Unlimited Bac II Timed Exam Simulators
//   4. Priority Kru Vuth Socratic AI Tutor
//   5. Holographic VIP Leaderboard Aura
// ==============================================================================

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { launchConfetti } from "@/lib/confetti";
import { sounds } from "@/lib/sound-effects";
import { toast } from "sonner";

export interface MistakeItem {
  id: string;
  lessonId: string;
  subject: string;
  grade: number;
  promptKm: string;
  promptEn: string;
  correctAnswerKm: string;
  correctAnswerEn: string;
  explanationKm: string;
  explanationEn: string;
  timestamp: number;
}

export interface SuperContextValue {
  isSuper: boolean;
  plan: "monthly" | "annual" | null;
  hearts: number;
  maxHearts: number;
  isPaywallOpen: boolean;
  isMistakesDrawerOpen: boolean;
  mistakes: MistakeItem[];
  openPaywall: (source?: string) => void;
  closePaywall: () => void;
  openMistakesDrawer: () => void;
  closeMistakesDrawer: () => void;
  activateSuper: (plan?: "monthly" | "annual") => void;
  cancelSuper: () => void;
  loseHeart: () => boolean;
  refillHearts: () => void;
  recordMistake: (mistake: Omit<MistakeItem, "timestamp">) => void;
  resolveMistake: (id: string) => void;
}

const SuperContext = createContext<SuperContextValue | undefined>(undefined);

const STORAGE_KEYS = {
  IS_SUPER: "sciencekh_is_super",
  PLAN: "sciencekh_super_plan",
  HEARTS: "sciencekh_hearts",
  MISTAKES: "sciencekh_mistake_vault",
  LAST_REFILL: "sciencekh_last_heart_refill",
};

export function SuperProvider({ children }: { children: ReactNode }) {
  // 1. Subscription State (default to standard learning mode)
  const [isSuper, setIsSuper] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      return localStorage.getItem(STORAGE_KEYS.IS_SUPER) === "true";
    } catch {
      return false;
    }
  });

  const [plan, setPlan] = useState<"monthly" | "annual" | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      return (localStorage.getItem(STORAGE_KEYS.PLAN) as "monthly" | "annual") || null;
    } catch {
      return null;
    }
  });

  // 2. Finite Hearts State (Standard 5 Hearts Gamification)
  const maxHearts = 5;
  const [hearts, setHearts] = useState<number>(() => {
    if (typeof window === "undefined") return 5;
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HEARTS);
      if (!saved || saved === "Infinity" || saved === "NaN") return 5;
      const parsed = parseInt(saved, 10);
      return isNaN(parsed) ? 5 : Math.min(maxHearts, Math.max(0, parsed));
    } catch {
      return 5;
    }
  });

  // 3. Modals & Drawers State
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [isMistakesDrawerOpen, setIsMistakesDrawerOpen] = useState(false);

  // 4. Smart Mistake Vault
  const [mistakes, setMistakes] = useState<MistakeItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MISTAKES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.IS_SUPER, isSuper ? "true" : "false");
      if (plan) localStorage.setItem(STORAGE_KEYS.PLAN, plan);
      else localStorage.removeItem(STORAGE_KEYS.PLAN);
      localStorage.setItem(STORAGE_KEYS.HEARTS, hearts.toString());
      localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(mistakes));
    } catch {
      // ignore storage write errors
    }
  }, [isSuper, plan, hearts, mistakes]);

  const openPaywall = useCallback((_source?: string) => {
    sounds.playPop();
    setIsPaywallOpen(true);
  }, []);

  const closePaywall = useCallback(() => {
    setIsPaywallOpen(false);
  }, []);

  const openMistakesDrawer = useCallback(() => {
    sounds.playPop();
    setIsMistakesDrawerOpen(true);
  }, []);

  const closeMistakesDrawer = useCallback(() => {
    setIsMistakesDrawerOpen(false);
  }, []);

  const activateSuper = useCallback((selectedPlan: "monthly" | "annual" = "annual") => {
    setIsSuper(true);
    setPlan(selectedPlan);
    setHearts(5);
    setIsPaywallOpen(false);
    launchConfetti();
    sounds.playVictory();
    toast.success("សូមស្វាគមន៍មកកាន់ Super ScienceKH! 💎", {
      description: "អ្នកទទួលបានមុខងារ VIP និងធនាគារកែកំហុសឆ្លាតវៃ។",
      duration: 6000,
    });
  }, []);

  const cancelSuper = useCallback(() => {
    setIsSuper(false);
    setPlan(null);
    setHearts(5);
    toast.info("បានបោះបង់ការជាវ Super ScienceKH", {
      description: "គណនីរបស់អ្នកបានត្រឡប់មកកម្រិតធម្មតាវិញ។",
    });
  }, []);

  const loseHeart = useCallback((): boolean => {
    let currentHearts = 5;
    setHearts((prev) => {
      currentHearts = Math.max(0, prev - 1);
      return currentHearts;
    });
    sounds.playHeartLost();
    return currentHearts > 0;
  }, []);

  const refillHearts = useCallback(() => {
    setHearts(5);
    sounds.playCorrect(3);
    toast.success("បេះដូងត្រូវបានបំពេញពេញ 5/5 ឡើងវិញ! ❤️");
  }, []);

  const recordMistake = useCallback((item: Omit<MistakeItem, "timestamp">) => {
    setMistakes((prev) => {
      // Avoid duplicates
      if (prev.some((m) => m.id === item.id)) return prev;
      const updated = [{ ...item, timestamp: Date.now() }, ...prev];
      return updated.slice(0, 50); // Keep last 50 mistakes
    });
  }, []);

  const resolveMistake = useCallback((id: string) => {
    setMistakes((prev) => prev.filter((m) => m.id !== id));
    // Reward student with 1 heart when resolving a mistake!
    setHearts((prev) => (prev === Infinity ? Infinity : Math.min(5, prev + 1)));
    sounds.playCorrect(4);
  }, []);

  return (
    <SuperContext.Provider
      value={{
        isSuper,
        plan,
        hearts,
        maxHearts,
        isPaywallOpen,
        isMistakesDrawerOpen,
        mistakes,
        openPaywall,
        closePaywall,
        openMistakesDrawer,
        closeMistakesDrawer,
        activateSuper,
        cancelSuper,
        loseHeart,
        refillHearts,
        recordMistake,
        resolveMistake,
      }}
    >
      {children}
    </SuperContext.Provider>
  );
}

export function useSuper() {
  const context = useContext(SuperContext);
  if (!context) {
    throw new Error("useSuper must be used within a SuperProvider");
  }
  return context;
}
