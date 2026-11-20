// ==============================================================================
// ScienceKH — Saved Educational Resources Manager
// Unified local and authenticated persistence for bookmarks across Lessons,
// Study References, and Offline Examination Papers.
// ==============================================================================

const LESSON_BOOKMARKS_KEY = "sciencekh_lesson_bookmarks_v1";

export function getSavedLessonIds(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(LESSON_BOOKMARKS_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

export function isLessonSaved(lessonId: string): boolean {
  return getSavedLessonIds().has(lessonId);
}

export function toggleSavedLesson(lessonId: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const ids = getSavedLessonIds();
    let nextState = false;
    if (ids.has(lessonId)) {
      ids.delete(lessonId);
      nextState = false;
    } else {
      ids.add(lessonId);
      nextState = true;
    }
    localStorage.setItem(LESSON_BOOKMARKS_KEY, JSON.stringify(Array.from(ids)));
    return nextState;
  } catch {
    return false;
  }
}
