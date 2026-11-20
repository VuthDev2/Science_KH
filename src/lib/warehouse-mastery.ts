// ==============================================================================
// ScienceKH — STEM Warehouse Mastery Storage Engine
// Duolingo-style spaced mastery tracker: tracks student familiarity with
// symbols, chemical formulas, Greek notations, and SI units without stress.
// ==============================================================================

const STORAGE_KEY = "sciencekh_warehouse_mastery";

export interface MasterySummary {
  totalItems: number;
  unseenCount: number;
  practicedCount: number;
  masteredCount: number;
  overallPercentage: number;
}

/**
 * Read student's mastery dictionary from localStorage: { [itemId: string]: level (0-3) }
 */
export const getMasteryDictionary = (): Record<string, number> => {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

/**
 * Get mastery level of a single item (0: Unseen, 1: Practiced, 2: Familiar, 3: Mastered)
 */
export const getItemMasteryLevel = (itemId: string): number => {
  const dict = getMasteryDictionary();
  return dict[itemId] ?? 0;
};

/**
 * Increment or set mastery level of an item
 */
export const updateItemMastery = (itemId: string, increment = 1): number => {
  if (typeof window === "undefined") return 0;
  try {
    const dict = getMasteryDictionary();
    const current = dict[itemId] ?? 0;
    const nextLevel = Math.min(3, current + increment);
    dict[itemId] = nextLevel;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dict));
    return nextLevel;
  } catch {
    return 0;
  }
};

/**
 * Compute overall mastery summary stats across warehouse
 */
export const computeMasterySummary = (totalItemsCount: number): MasterySummary => {
  const dict = getMasteryDictionary();
  let practiced = 0;
  let mastered = 0;

  Object.values(dict).forEach((lvl) => {
    if (lvl >= 3) {
      mastered += 1;
    } else if (lvl >= 1) {
      practiced += 1;
    }
  });

  const unseen = Math.max(0, totalItemsCount - (practiced + mastered));
  const overallPercentage =
    totalItemsCount > 0 ? Math.round(((practiced * 0.5 + mastered) / totalItemsCount) * 100) : 0;

  return {
    totalItems: totalItemsCount,
    unseenCount: unseen,
    practicedCount: practiced,
    masteredCount: mastered,
    overallPercentage: Math.min(100, overallPercentage),
  };
};

/**
 * Compute grade & subject-specific mastery summary stats strictly for the filtered items
 */
export const computeGradeMasterySummary = (
  relevantItemIds: string[],
  masteryDict?: Record<string, number>
): MasterySummary => {
  const dict = masteryDict ?? getMasteryDictionary();
  let practiced = 0;
  let mastered = 0;

  relevantItemIds.forEach((id) => {
    const lvl = dict[id] ?? 0;
    if (lvl >= 3) {
      mastered += 1;
    } else if (lvl >= 1) {
      practiced += 1;
    }
  });

  const totalCount = relevantItemIds.length;
  const unseen = Math.max(0, totalCount - (practiced + mastered));
  const overallPercentage =
    totalCount > 0 ? Math.round(((practiced * 0.5 + mastered) / totalCount) * 100) : 0;

  return {
    totalItems: totalCount,
    unseenCount: unseen,
    practicedCount: practiced,
    masteredCount: mastered,
    overallPercentage: Math.min(100, overallPercentage),
  };
};

/**
 * Speak phonetic pronunciation using Web Speech API with fallback
 */
export const speakPronunciation = (text: string, lang = "km-KH"): boolean => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return false;
  }
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9; // Slightly slower for clear educational listening
    window.speechSynthesis.speak(utterance);
    return true;
  } catch {
    return false;
  }
};
