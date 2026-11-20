// ==============================================================================
// ScienceKH — Streak Guardian (Local Retention & Reminder Engine)
// Duolingo-style retention mechanism that costs $0 in server fees.
// Schedules and triggers daily 7:00 PM notifications to protect student streaks.
// ==============================================================================

export interface StreakGuardianStatus {
  hasStudiedToday: boolean;
  currentStreak: number;
  permission: NotificationPermission | "unsupported";
  lastStudyDate: string | null;
}

const STORAGE_LAST_STUDY = "sciencekh_last_study_date";
const STORAGE_LAST_NOTIFIED = "sciencekh_last_streak_notified";
const STORAGE_NOTIFICATION_ENABLED = "sciencekh_notifications_enabled";

/**
 * Format current date in YYYY-MM-DD
 */
export const getTodayKey = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

/**
 * Check if the student has already studied today
 */
export const hasStudiedToday = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    const lastDate = localStorage.getItem(STORAGE_LAST_STUDY);
    return lastDate === getTodayKey();
  } catch {
    return false;
  }
};

/**
 * Mark today as studied (called upon finishing a quiz, lesson, or exam)
 */
export const recordStudyActivity = () => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_LAST_STUDY, getTodayKey());
  } catch {}
};

/**
 * Request notification permissions from the device / browser
 */
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return false;
  }
  try {
    const perm = await Notification.requestPermission();
    if (perm === "granted") {
      localStorage.setItem(STORAGE_NOTIFICATION_ENABLED, "true");
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

/**
 * Check notification permission status
 */
export const getNotificationPermission = (): NotificationPermission | "unsupported" => {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return "unsupported";
  }
  return Notification.permission;
};

/**
 * Streak Guardian: Check whether the student is at risk of losing their streak today.
 * If current time >= 19:00 (7 PM) and student hasn't studied, dispatch reminder.
 */
export const checkAndTriggerStreakGuardian = (
  studentName = "សិស្ស",
  currentStreak = 1,
  isKhmer = true
): boolean => {
  if (typeof window === "undefined" || !("Notification" in window)) return false;
  if (Notification.permission !== "granted") return false;

  const today = getTodayKey();
  // If user already studied today, streak is safe!
  if (hasStudiedToday()) return false;

  // Check if we already notified today to prevent spam
  const lastNotified = localStorage.getItem(STORAGE_LAST_NOTIFIED);
  if (lastNotified === today) return false;

  const now = new Date();
  const currentHour = now.getHours();

  // Trigger between 19:00 (7 PM) and 23:59 (midnight)
  if (currentHour >= 19) {
    try {
      const title = isKhmer
        ? `🔥 ការពារ Streak ${currentStreak} ថ្ងៃរបស់អ្នក, ${studentName}!`
        : `🔥 Keep your ${currentStreak}-day streak alive, ${studentName}!`;

      const body = isKhmer
        ? "ចូលរៀនវិទ្យាសាស្ត្រ ឬធ្វើ Quiz ៥ នាទី មុនពាក់កណ្តាលអធ្រាត្រ ដើម្បីកុំឱ្យដាច់ Streak!"
        : "Practice 5 minutes of STEM lessons or quizzes before midnight so you don't lose your streak!";

      new Notification(title, {
        body,
        icon: "/favicon.ico",
        badge: "/favicon.ico",
        tag: `streak-guardian-${today}`,
      });

      localStorage.setItem(STORAGE_LAST_NOTIFIED, today);
      return true;
    } catch (e) {
      console.warn("[Streak Guardian] Notification dispatch notice:", e);
      return false;
    }
  }

  return false;
};
