// ==============================================================================
// ScienceKH — Unified Reactive App Store (@tanstack/store + @tanstack/react-store)
// High-performance reactive state management for preferences, study sessions,
// offline exam downloads, and STEM fundamentals warehouse mastery.
// Features zero-rerender selective subscriptions and multi-tab storage sync.
// ==============================================================================

import { Store } from "@tanstack/store";
import { useStore } from "@tanstack/react-store";
import { sounds } from "@/lib/sound-effects";

export interface AppState {
  // 1. User Preferences
  lang: "km" | "en";
  soundEnabled: boolean;
  selectedGrade: number; // Grade 7 to 12
  theme: "light" | "dark" | "system";

  // 2. Study Session & Gamification
  activeSubject: string;
  streakDays: number;
  todayXp: number;
  dailyGoalXp: number;

  // 3. Exam Archive & Offline Storage
  offlineExamIds: string[];

  // 4. STEM Fundamentals Warehouse Mastery
  warehouseMastery: Record<string, number>; // { [itemId]: 0..3 }
}

const STORAGE_KEYS = {
  LANG: "sciencekh_lang",
  SOUND: "sciencekh_sound",
  GRADE: "sciencekh_grade",
  THEME: "sciencekh_theme",
  OFFLINE_EXAMS: "sciencekh_offline_exam_ids",
  WAREHOUSE_MASTERY: "sciencekh_warehouse_mastery",
  LAST_STUDY: "sciencekh_last_study_date",
} as const;

// Safe localStorage helper
const safeGetItem = (key: string): string | null => {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const safeSetItem = (key: string, value: string) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, value);
  } catch {}
};

// Initial state hydrated from local storage
const getInitialState = (): AppState => {
  let lang: "km" | "en" = "km";
  const storedLang = safeGetItem(STORAGE_KEYS.LANG);
  if (storedLang === "km" || storedLang === "en") lang = storedLang;

  const storedSound = safeGetItem(STORAGE_KEYS.SOUND);
  const soundEnabled = storedSound !== "0";

  let selectedGrade = 12; // Default to Bac II Grade 12
  const storedGrade = safeGetItem(STORAGE_KEYS.GRADE);
  if (storedGrade) {
    const parsed = parseInt(storedGrade, 10);
    if (!isNaN(parsed) && parsed >= 7 && parsed <= 12) selectedGrade = parsed;
  }

  let theme: "light" | "dark" | "system" = "light";
  const storedTheme = safeGetItem(STORAGE_KEYS.THEME);
  if (storedTheme === "light" || storedTheme === "dark" || storedTheme === "system") {
    theme = storedTheme;
  }

  let offlineExamIds: string[] = [];
  const storedOffline = safeGetItem(STORAGE_KEYS.OFFLINE_EXAMS);
  if (storedOffline) {
    try {
      offlineExamIds = JSON.parse(storedOffline);
    } catch {}
  }

  let warehouseMastery: Record<string, number> = {};
  const storedMastery = safeGetItem(STORAGE_KEYS.WAREHOUSE_MASTERY);
  if (storedMastery) {
    try {
      warehouseMastery = JSON.parse(storedMastery);
    } catch {}
  }

  return {
    lang,
    soundEnabled,
    selectedGrade,
    theme,
    activeSubject: "mathematics",
    streakDays: 1,
    todayXp: 0,
    dailyGoalXp: 50,
    offlineExamIds,
    warehouseMastery,
  };
};

/**
 * Global TanStack App Store Instance
 */
export const appStore = new Store<AppState>(getInitialState());

// Multi-tab sync & storage listener
if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (!event.key) return;

    if (event.key === STORAGE_KEYS.LANG && event.newValue) {
      const nextLang = event.newValue === "en" ? "en" : "km";
      appStore.setState((s) => ({ ...s, lang: nextLang }));
    } else if (event.key === STORAGE_KEYS.SOUND) {
      const nextSound = event.newValue !== "0";
      appStore.setState((s) => ({ ...s, soundEnabled: nextSound }));
      sounds.setEnabled(nextSound);
    } else if (event.key === STORAGE_KEYS.GRADE && event.newValue) {
      const nextGrade = parseInt(event.newValue, 10);
      if (!isNaN(nextGrade)) {
        appStore.setState((s) => ({ ...s, selectedGrade: nextGrade }));
      }
    } else if (event.key === STORAGE_KEYS.OFFLINE_EXAMS && event.newValue) {
      try {
        const nextIds = JSON.parse(event.newValue);
        appStore.setState((s) => ({ ...s, offlineExamIds: nextIds }));
      } catch {}
    } else if (event.key === STORAGE_KEYS.WAREHOUSE_MASTERY && event.newValue) {
      try {
        const nextMastery = JSON.parse(event.newValue);
        appStore.setState((s) => ({ ...s, warehouseMastery: nextMastery }));
      } catch {}
    }
  });
}

// ==============================================================================
// Store Action Mutators
// ==============================================================================

export const appActions = {
  setLang: (lang: "km" | "en") => {
    safeSetItem(STORAGE_KEYS.LANG, lang);
    appStore.setState((s) => ({ ...s, lang }));
  },

  toggleSound: () => {
    const currentState = appStore.state.soundEnabled;
    const nextVal = !currentState;
    safeSetItem(STORAGE_KEYS.SOUND, nextVal ? "1" : "0");
    sounds.setEnabled(nextVal);
    appStore.setState((s) => ({ ...s, soundEnabled: nextVal }));
    return nextVal;
  },

  setSoundEnabled: (enabled: boolean) => {
    safeSetItem(STORAGE_KEYS.SOUND, enabled ? "1" : "0");
    sounds.setEnabled(enabled);
    appStore.setState((s) => ({ ...s, soundEnabled: enabled }));
  },

  setSelectedGrade: (grade: number) => {
    if (grade >= 7 && grade <= 12) {
      safeSetItem(STORAGE_KEYS.GRADE, grade.toString());
      appStore.setState((s) => ({ ...s, selectedGrade: grade }));
    }
  },

  setActiveSubject: (subject: string) => {
    appStore.setState((s) => ({ ...s, activeSubject: subject }));
  },

  addXp: (amount: number) => {
    appStore.setState((s) => ({ ...s, todayXp: s.todayXp + amount }));
  },

  toggleOfflineExam: (examId: string): boolean => {
    const currentIds = appStore.state.offlineExamIds;
    let nextIds: string[];
    let isSaved: boolean;

    if (currentIds.includes(examId)) {
      nextIds = currentIds.filter((id) => id !== examId);
      isSaved = false;
      if (typeof window !== "undefined") {
        try {
          localStorage.removeItem(`sciencekh_offline_exam_${examId}`);
        } catch {}
      }
    } else {
      nextIds = [...currentIds, examId];
      isSaved = true;
    }

    safeSetItem(STORAGE_KEYS.OFFLINE_EXAMS, JSON.stringify(nextIds));
    appStore.setState((s) => ({ ...s, offlineExamIds: nextIds }));
    return isSaved;
  },

  updateWarehouseMastery: (itemId: string, levelIncrement = 1): number => {
    const current = appStore.state.warehouseMastery[itemId] ?? 0;
    const nextLvl = Math.min(3, current + levelIncrement);
    const updated = {
      ...appStore.state.warehouseMastery,
      [itemId]: nextLvl,
    };
    safeSetItem(STORAGE_KEYS.WAREHOUSE_MASTERY, JSON.stringify(updated));
    appStore.setState((s) => ({ ...s, warehouseMastery: updated }));
    return nextLvl;
  },
};

// ==============================================================================
// Fine-Grained Reactive Custom Hooks
// ==============================================================================

/**
 * 1. Global Reactive App Store Hook with Selective Selector
 */
export function useAppStore<T>(selector: (state: AppState) => T): T {
  return useStore(appStore, selector);
}

/**
 * 2. User Preferences (Language, Sound, Grade, Theme)
 */
export function usePreferences() {
  const lang = useStore(appStore, (s) => s.lang);
  const soundEnabled = useStore(appStore, (s) => s.soundEnabled);
  const selectedGrade = useStore(appStore, (s) => s.selectedGrade);
  const theme = useStore(appStore, (s) => s.theme);

  return {
    lang,
    isKhmer: lang === "km",
    soundEnabled,
    selectedGrade,
    theme,
    setLang: appActions.setLang,
    toggleSound: appActions.toggleSound,
    setSoundEnabled: appActions.setSoundEnabled,
    setSelectedGrade: appActions.setSelectedGrade,
  };
}

/**
 * 3. Offline Exams Store Hook
 */
export function useOfflineExams() {
  const offlineExamIds = useStore(appStore, (s) => s.offlineExamIds);

  return {
    offlineExamIds,
    isExamOffline: (id: string) => offlineExamIds.includes(id),
    toggleOfflineExam: appActions.toggleOfflineExam,
    totalOfflineCount: offlineExamIds.length,
  };
}

/**
 * 4. Warehouse Mastery Store Hook
 */
export function useWarehouseMastery() {
  const masteryDict = useStore(appStore, (s) => s.warehouseMastery);

  return {
    masteryDict,
    getItemMastery: (id: string) => masteryDict[id] ?? 0,
    updateMastery: appActions.updateWarehouseMastery,
  };
}
